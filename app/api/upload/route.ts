// import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// // Configure Cloudinary (server-side only)
// cloudinary.config({
//     cloud_name: 'dyubkqdp2',
//     api_key: '952277343697162',
//     api_secret: process.env.NEXT_CLOUDINARY_SECRET_KEY,
// });

// const bufferToBase64 = (buffer: Buffer): string => {
//   return `data:image/png;base64,${buffer.toString('base64')}`;
// };
// Define the server-side route handler
export async function POST(req: Request) {
  try {
    // const body = await req.json(); // Parse incoming JSON data
    // const file = body.file; // Expecting base64 or a public URL
    // console.log(body)

  //   const formData = await req.formData(); // Use formData() instead of json()
  //   const file = formData.get('file') as File | null;
  //   const userId = formData.get('userId') as string | null;
  //   const randomId = formData.get('randomId') as string | null;
  //   const _fileRef = formData.get('_fileRef') as string | null;

  //   if (!file) {
  //     return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  //   }

  // //  Convert file to a Buffer for Cloudinary upload
  //   const arrayBuffer = await file.arrayBuffer();
  //   const buffer = Buffer.from(arrayBuffer);
  //   console.log(buffer, "buffer")

  //   const base64File = bufferToBase64(buffer);


  //   const result = await cloudinary.uploader.upload(base64File, { folder: 'hm-finance', resource_type: 'image', public_id: `${_fileRef}/${userId}_${randomId}_${new Date().getTime()}`});
  //   console.log(result)

    // return NextResponse.json({ url: (result as any).secure_url }, { status: 200 });

    // Upload to Cloudinary
    
    return NextResponse.json({ url: "" }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}