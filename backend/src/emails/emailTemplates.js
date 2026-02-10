export function createWelcomeEmailTemplate(name, clientURL) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to ChatConnect</title>
</head>
<body style="margin:0; padding:0; background:#f4f7fb; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg, #4f46e5, #6366f1); padding:24px 20px; text-align:center; color:#ffffff;">
      <h1 style="margin:0; font-size:26px; letter-spacing:0.5px;">
        💬 ChatConnect
      </h1>
      <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
        Real-time conversations, simplified
      </p>
    </div>

    <!-- Body -->
    <div style="padding:32px 28px; color:#1f2933;">
      <h2 style="margin-top:0; font-size:22px; color:#111827;">
        Welcome aboard, ${name}! 🎉
      </h2>

      <p style="font-size:15px; line-height:1.7; color:#374151;">
        We’re super excited to have you on <strong>ChatConnect</strong>!  
        Your account is now ready and you can start chatting with your friends and teams instantly.
      </p>

      <div style="margin:24px 0; padding:18px; background:#f8fafc; border-radius:8px; border:1px solid #e5e7eb;">
        <p style="margin:0 0 8px; font-weight:600;">Here’s what you can do:</p>
        <ul style="padding-left:18px; margin:0; font-size:14px; color:#4b5563; line-height:1.6;">
          <li>⚡ Real-time messaging</li>
          <li>🔒 Secure authentication</li>
          <li>🌐 Access from anywhere</li>
        </ul>
      </div>

      <!-- CTA Button -->
      <div style="text-align:center; margin:32px 0;">
        <a href="${clientURL}" 
           style="display:inline-block; background:linear-gradient(135deg, #4f46e5, #6366f1); color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:999px; font-size:15px; font-weight:600; box-shadow:0 6px 18px rgba(79,70,229,0.35);">
          🚀 Open ChatConnect
        </a>
      </div>

      <p style="font-size:14px; line-height:1.6; color:#6b7280;">
        If you didn’t sign up for ChatConnect, you can safely ignore this email.
      </p>

      <p style="margin-top:28px; font-size:14px; color:#374151;">
        Cheers, <br/>
        <strong>Team ChatConnect</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f1f5f9; text-align:center; padding:14px; font-size:12px; color:#6b7280;">
      © ${new Date().getFullYear()} ChatConnect. All rights reserved.
    </div>

  </div>

</body>
</html>
  `;
}
