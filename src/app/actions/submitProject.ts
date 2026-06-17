'use server'

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitProjectAction(formData: FormData) {
  try {
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      businessName: formData.get("businessName") as string,
      requirements: formData.get("requirements") as string,
      serviceNeeded: formData.get("serviceNeeded") as string,
      digitalSignature: formData.get("digitalSignature") as string,
      agreedToTerms: formData.get("agreedToTerms") === "on",
    }

    if (!data.fullName || !data.email || !data.phone || !data.serviceNeeded || !data.digitalSignature || !data.agreedToTerms) {
      return { success: false, error: "Missing required fields or terms not agreed." };
    }

    const { error: dbError } = await supabase
      .from('client_requests')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        business_name: data.businessName,
        requirements: data.requirements,
        service_needed: data.serviceNeeded,
        digital_signature: data.digitalSignature,
        agreed_to_terms: true,
        status: 'new',
        submitted_at: new Date().toISOString()
      }])

    if (dbError) {
      console.error('Supabase error:', dbError)
      throw new Error(`Database error: ${dbError.message}`)
    }

    const timestamp = new Date().toLocaleString();

    // Send Emails via Resend
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
          <li><strong>Service Requested:</strong> ${data.serviceNeeded}</li>
          <li><strong>Requirements:</strong> ${data.requirements || "None"}</li>
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
          <li><strong>Service:</strong> ${data.serviceNeeded}</li>
          <li><strong>Requirements:</strong> ${data.requirements || "None"}</li>
          <li><strong>Signature:</strong> ${data.digitalSignature}</li>
          <li><strong>Submitted:</strong> ${timestamp}</li>
        </ul>
      `
    })

    return { success: true }
  } catch (error) {
    console.error('Full error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
