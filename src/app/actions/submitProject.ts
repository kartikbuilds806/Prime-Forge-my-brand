'use server'

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { z } from 'zod'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

// Upstash Rate Limiter (3 requests per hour per IP)
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"),
})

// Zod Schema mapping user instructions to existing form fields
const formSchema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().min(1),
  businessName: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().max(2000).trim().optional().or(z.literal('')),
  digitalSignature: z.string().min(1),
  agreedToTerms: z.literal("on").transform(() => true),
})

export async function submitProjectAction(formData: FormData) {
  try {
    // 1. Rate Limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";
    
    const { success: rateLimitSuccess } = await ratelimit.limit(ip);
    if (!rateLimitSuccess) {
      return { success: false, error: "Too many submissions. Please try again later." };
    }

    // 2. Extract Data and map to requested Zod schema fields
    const rawData = {
      fullName: formData.get("fullName") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      businessName: formData.get("businessName") || "",
      projectType: formData.get("serviceNeeded") || "", // Map serviceNeeded to projectType
      budget: formData.get("budget") || "Not specified", // Fallback if budget input is missing
      message: formData.get("requirements") || "", // Map requirements to message
      digitalSignature: formData.get("digitalSignature") || "",
      agreedToTerms: formData.get("agreedToTerms"),
    }

    // 3. Validate with Zod
    const validatedFields = formSchema.safeParse(rawData);
    
    if (!validatedFields.success) {
      const errorMsg = validatedFields.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ');
      return { success: false, error: `Invalid form data: ${errorMsg}` };
    }

    const data = validatedFields.data; // The sanitized, parsed data

    // 4. Insert to Supabase (using mapped values back to DB columns)
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
      }])

    if (dbError) {
      console.error('Supabase error:', dbError)
      throw new Error(`Database error: ${dbError.message}`)
    }

    const timestamp = new Date().toLocaleString();

    // 5. Send Emails via Resend (using sanitized data)
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: data.email,
        subject: '✅ PrimeForge — Your Project Request is Confirmed',
        html: `
          <p>Hello ${data.fullName},</p>
          <p>Thank you for choosing PrimeForge! This email confirms that we have received your project request and serves as your official record.</p>
          <h3>📋 Project Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${data.fullName}</li>
            <li><strong>Business:</strong> ${data.businessName || "N/A"}</li>
            <li><strong>Service Requested:</strong> ${data.projectType}</li>
            <li><strong>Budget:</strong> ${data.budget}</li>
            <li><strong>Requirements:</strong> ${data.message || "None"}</li>
            <li><strong>Digital Signature:</strong> ${data.digitalSignature}</li>
            <li><strong>Submitted On:</strong> ${timestamp}</li>
          </ul>
          <p>You agreed to the PrimeForge 5-step process terms. The mockup phase is free, and payment is only processed after your design approval.</p>
          <p>We will contact you within 24 hours at ${data.phone}.</p>
          <p>— Kartik Sharma, Director<br>PrimeForge Agency<br>WhatsApp: +91 8533925291</p>
        `
      })

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'primeforge7@gmail.com',
        subject: `🔔 New Client Request — ${data.businessName || data.fullName}`,
        html: `
          <h3>New project request received!</h3>
          <ul>
            <li><strong>Client:</strong> ${data.fullName}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
            <li><strong>Business:</strong> ${data.businessName || "N/A"}</li>
            <li><strong>Service:</strong> ${data.projectType}</li>
            <li><strong>Budget:</strong> ${data.budget}</li>
            <li><strong>Requirements:</strong> ${data.message || "None"}</li>
            <li><strong>Signature:</strong> ${data.digitalSignature}</li>
            <li><strong>Submitted:</strong> ${timestamp}</li>
          </ul>
        `
      })
    } catch (emailError) {
      console.error('Resend error (logged but not failing the request):', emailError)
    }

    return { success: true }
  } catch (error) {
    console.error('Full error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
