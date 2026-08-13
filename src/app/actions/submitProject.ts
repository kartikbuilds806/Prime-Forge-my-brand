'use server'

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { z } from 'zod'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

// Initialize Supabase Client safely
const isSupabaseConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const supabase = isSupabaseConfigured
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  : null;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Safe Upstash Rate Limiter initialization
const isRedisConfigured = !!(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_URL.startsWith('http') &&
  process.env.UPSTASH_REDIS_REST_TOKEN
);

let ratelimit: Ratelimit | null = null;
if (isRedisConfigured) {
  try {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
    });
  } catch (e) {
    console.error("Failed to initialize Upstash Ratelimit:", e);
  }
}

// Zod Schema mapping user instructions to existing form fields
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100).trim(),
  email: z.string().email("Invalid email address").toLowerCase(),
  phone: z.string().min(5, "Valid phone number is required"),
  businessName: z.string().optional(),
  projectType: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Budget is required"),
  message: z.string().max(2000).trim().optional().or(z.literal('')),
  digitalSignature: z.string().min(2, "Digital signature is required"),
  agreedToTerms: z.literal("on", { message: "You must agree to the terms" }).transform(() => true),
})

export async function submitProjectAction(formData: FormData) {
  try {
    // 1. Rate Limiting
    if (ratelimit) {
      const headersList = await headers();
      const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";
      
      const { success: rateLimitSuccess } = await ratelimit.limit(ip);
      if (!rateLimitSuccess) {
        return { success: false, error: "Too many project submissions from your connection. Please try again in an hour or contact us on WhatsApp." };
      }
    }

    // 2. Extract Data and map to Zod schema fields
    const rawData = {
      fullName: formData.get("fullName") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      businessName: formData.get("businessName") || "",
      projectType: formData.get("serviceNeeded") || "",
      budget: formData.get("budget") || "Not specified",
      message: formData.get("requirements") || "",
      digitalSignature: formData.get("digitalSignature") || "",
      agreedToTerms: formData.get("agreedToTerms"),
    }

    // 3. Validate with Zod
    const validatedFields = formSchema.safeParse(rawData);
    
    if (!validatedFields.success) {
      const errorMsg = validatedFields.error.issues.map(issue => `${issue.message}`).join('. ');
      return { success: false, error: errorMsg };
    }

    const data = validatedFields.data;
    const timestamp = new Date().toLocaleString();

    // 4. Insert to Supabase (if database configured)
    let dbSuccess = false;
    if (supabase) {
      const { error: dbError } = await supabase
        .from('client_requests')
        .insert([{
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          business_name: data.businessName,
          requirements: data.message || null,
          service_needed: data.projectType,
          digital_signature: data.digitalSignature,
          agreed_to_terms: data.agreedToTerms,
          status: 'new',
          submitted_at: new Date().toISOString()
        }]);

      if (dbError) {
        console.error('Supabase Error (Logged Server-Side):', dbError);
      } else {
        dbSuccess = true;
      }
    } else {
      console.warn('Supabase credentials not configured in environment variables.');
    }

    // 5. Automation Webhook Trigger (Make.com / n8n / Zapier)
    const webhookUrl = process.env.AUTOMATION_WEBHOOK_URL || process.env.MAKE_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'new_lead',
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            businessName: data.businessName || "N/A",
            projectType: data.projectType,
            budget: data.budget,
            message: data.message || "None",
            signature: data.digitalSignature,
            timestamp,
          }),
        }).catch(err => console.error('Automation Webhook Error:', err));
      } catch (webhookErr) {
        console.error('Webhook execution failed:', webhookErr);
      }
    }

    // 6. Send Emails via Resend
    if (resend) {
      try {
        // Confirmation email to Client
        await resend.emails.send({
          from: 'PrimeForge Agency <onboarding@resend.dev>',
          to: data.email,
          subject: '✅ PrimeForge — Your Project Request is Confirmed',
          html: `
            <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Your Project Request is Confirmed</h2>
              <p>Hello ${data.fullName},</p>
              <p>Thank you for choosing PrimeForge! We have received your project request and will begin reviewing your requirements immediately.</p>
              
              <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">📋 Project Overview:</h3>
                <ul>
                  <li><strong>Name:</strong> ${data.fullName}</li>
                  <li><strong>Business:</strong> ${data.businessName || "N/A"}</li>
                  <li><strong>Service Requested:</strong> ${data.projectType}</li>
                  <li><strong>Budget:</strong> ${data.budget}</li>
                  <li><strong>Digital Signature:</strong> ${data.digitalSignature}</li>
                  <li><strong>Submitted:</strong> ${timestamp}</li>
                </ul>
              </div>

              <p><strong>Next Step:</strong> Kartik Sharma will reach out within 24 hours to schedule your strategy preview call.</p>
              <p style="margin-top: 30px; font-size: 14px; color: #666;">
                — <strong>Kartik Sharma</strong>, Founder & Director<br>
                PrimeForge Agency | WhatsApp: +91 8630070729
              </p>
            </div>
          `
        });

        // Notification to Agency Founder
        await resend.emails.send({
          from: 'PrimeForge System <onboarding@resend.dev>',
          to: 'primeforge7@gmail.com',
          subject: `🔔 NEW LEAD: ${data.businessName || data.fullName} (${data.budget})`,
          html: `
            <h3>🔥 New Lead Received on PrimeForge</h3>
            <ul>
              <li><strong>Name:</strong> ${data.fullName}</li>
              <li><strong>Email:</strong> ${data.email}</li>
              <li><strong>Phone:</strong> ${data.phone}</li>
              <li><strong>Business:</strong> ${data.businessName || "N/A"}</li>
              <li><strong>Service:</strong> ${data.projectType}</li>
              <li><strong>Budget:</strong> ${data.budget}</li>
              <li><strong>Message:</strong> ${data.message || "None"}</li>
              <li><strong>Signature:</strong> ${data.digitalSignature}</li>
            </ul>
          `
        });
      } catch (emailError) {
        console.error('Resend email error (Logged server-side):', emailError);
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Full server action error:', error)
    return { 
      success: false, 
      error: 'An unexpected issue occurred while processing your request. Please try again or reach us directly on WhatsApp (+91 8630070729).'
    }
  }
}

