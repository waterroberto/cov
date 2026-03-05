export default function DepositEmail({ name, amount, transactionId, date }:{name: string, amount: number, transactionId: string, date: string | number }) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
          .container { background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: center; }
          .heading { color: #222; font-size: 24px; margin-bottom: 20px; }
          .text { font-size: 16px; color: #444; line-height: 1.5; }
          .footer { font-size: 14px; color: #888; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 class="heading">Deposit Successful</h2>
          <p class="text">Hello ${name},</p>
          <p class="text">We have successfully received your deposit of <strong>$${amount}</strong> on <strong>${date}</strong>.</p>
          <p class="text"><strong>Transaction ID:</strong> ${transactionId}</p>
          <p class="text">Your funds are now available in your account for investment or withdrawal.</p>
          <hr />
          <p class="footer">If you have any questions, please contact our support team.</p>
          <p class="footer">Best regards,<br />The CapVentures Team</p>
        </div>
      </body>
    </html>
  `;
}