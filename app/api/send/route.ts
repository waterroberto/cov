// import { Resend } from 'resend';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(req: Request) {
  try {
  // const body = await req.json()
  // // const body: {to: string , from: string | undefined, subject: string, html: string} = {
  // //   to: "",
  // //   from: "",
  // //   subject: "",
  // //   html: ""
  // // }

  // // body.to = formData.get('to') as string 
  // // body.from = formData.get('from') as string | undefined
  // // body.subject = formData.get("subject") as string
  // // body.html = formData.get('html') as string

  //  const {to, from = "support@capitalonlineventures.com", subject, html} = body
  // console.log(body, "from route")
  //   const { data, error } = await resend.emails.send({
  //     from: from,
  //     to: [to],
  //     bcc: ["support@capitalonlineventures.com"],
  //     subject: subject,
  //     html: html,
  //     // react: Component,
  //   });

  //   if (error) {
  //     console.log(error)
  //     return Response.json({ error }, { status: 500 });
  //   }

  //   console.log(data)
    // put data back in the response object
    return Response.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return Response.json({ error }, { status: 500 });
  }
}



