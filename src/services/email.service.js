const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify transporter
transporter.verify((error) => {
    if (error) {
        console.error("Email server error:", error);
    } else {
        console.log(" Email server is ready.");
    }
});

// Generic Send Email Function
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Backend Ledger" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Email Sent:", info.messageId);
    } catch (err) {
        console.error("Email Error:", err);
    }
};

// =======================
// Registration Email
// =======================

async function sendRegistrationEmail(userEmail, name) {
    const subject = "🎉 Welcome to Backend Ledger";

    const text = `
Hello ${name},

Your account has been successfully created.

Thank you for choosing Backend Ledger.

You can now log in and start managing your banking transactions securely.

Regards,
Backend Ledger Team
`;

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background:#22192F;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="20" cellspacing="0" border="0" style="background:#22192F;">
<tr>
<td align="center">

<table role="presentation"
       width="600"
       cellpadding="0"
       cellspacing="0"
       border="0"
       style="width:100%;max-width:600px;background:#1B1430;border:1px solid #3b3152;border-radius:16px;">

<tr>
<td align="center" style="padding:45px 30px;">

<h1 style="margin:0;color:#ffffff;font-size:34px;font-weight:bold;">
  Welcome to Backend Ledger
</h1>

<p style="margin:35px 0 15px;font-size:22px;color:#ffffff;">
Hello <strong>${name}</strong>,
</p>

<p style="margin:0;color:#d7d7e6;font-size:18px;line-height:30px;">
Your account has been successfully created.
</p>

<table role="presentation"
       cellpadding="0"
       cellspacing="0"
       border="0"
       align="center"
       style="margin:35px auto;">
<tr>
<td
style="
background:#7C3AED;
padding:18px 35px;
border-radius:10px;
font-size:22px;
font-weight:bold;
color:#ffffff;
text-align:center;">
✅ Registration Successful
</td>
</tr>
</table>

<p style="margin:0;color:#d7d7e6;font-size:18px;line-height:32px;">
Thank you for choosing <strong>Backend Ledger</strong>.<br><br>
Your account is now ready to use. You can securely manage your banking transactions anytime.
</p>

<hr style="margin:40px 0;border:none;border-top:1px solid #3b3152;">

<p style="margin:0;font-size:16px;color:#aaaaaa;">
Backend Ledger Team
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    await sendEmail(userEmail, subject, text, html);
}

// =======================
// Transaction Success
// =======================

async function sendTransactionEmail(userEmail, name, amount, toAccount) {

    const subject = " Transaction Successful";

    const text = `
Hello ${name},

Your transaction was successful.

Amount: $${amount}
To: ${toAccount}

Thank you for banking with Backend Ledger.
`;

    const html = `
<h2>Transaction Successful</h2>

<p>Hello <b>${name}</b>,</p>

<p>Your transaction has been completed successfully.</p>

<table cellpadding="8" cellspacing="0" border="1">
<tr>
<td><b>Amount</b></td>
<td>$${amount}</td>
</tr>

<tr>
<td><b>Recipient</b></td>
<td>${toAccount}</td>
</tr>
</table>

<p>Thank you for using Backend Ledger.</p>
`;

    await sendEmail(userEmail, subject, text, html);
}

// =======================
// Transaction Failed
// =======================

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {

    const subject = "❌ Transaction Failed";

    const text = `
Hello ${name},

Unfortunately your transaction failed.

Amount: $${amount}
Recipient: ${toAccount}

Please try again later.
`;

    const html = `
<h2 style="color:red;">Transaction Failed</h2>

<p>Hello <b>${name}</b>,</p>

<p>We couldn't complete your transaction.</p>

<table cellpadding="8" cellspacing="0" border="1">
<tr>
<td><b>Amount</b></td>
<td>$${amount}</td>
</tr>

<tr>
<td><b>Recipient</b></td>
<td>${toAccount}</td>
</tr>
</table>

<p>Please verify your details and try again later.</p>
`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail,
};