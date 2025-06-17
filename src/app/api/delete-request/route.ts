import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, userEmail, timestamp } = await request.json();

    // For MVP: Just log the request (you can add email service later)
    console.log("Account deletion requested:", {
      userId,
      userEmail,
      timestamp,
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    });

    // TODO: Add email service integration here
    // Example with a service like Resend, SendGrid, or Nodemailer:
    /*
    await sendEmail({
      to: 'admin@yourapp.com',
      subject: 'Account Deletion Request - KYM',
      html: `
        <h2>Account Deletion Request</h2>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <p><strong>User ID:</strong> ${userId}</p>
        <p><strong>Requested At:</strong> ${timestamp}</p>
        <p><strong>IP Address:</strong> ${request.headers.get('x-forwarded-for')}</p>
        
        <p>Please process this deletion request within 24 hours.</p>
      `
    });
    */

    return NextResponse.json({
      success: true,
      message: "Deletion request received",
    });
  } catch (error) {
    console.error("Error processing deletion request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
