import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyAdmin } from '@/backend/middleware/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getPublicIdFromFilename = (filename = '') => {
  return String(filename)
    .replace(/\.[^.]*$/, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const getFolderFromAppName = (appName = '') => {
  const folder = String(appName)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return folder || 'appinfohub';
};

export async function POST(req) {
  try {
    const admin = verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll('images');
    const appName = formData.get('appName') || formData.get('name') || '';
    const folderName = getFolderFromAppName(appName);

    if (!files || !files.length) {
      return NextResponse.json({ error: 'No images uploaded' }, { status: 400 });
    }

    const urls = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const publicId = getPublicIdFromFilename(file.name);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folderName,
            public_id: publicId,
            overwrite: true,
            unique_filename: false,
            use_filename: false,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      urls.push(uploadResult.secure_url);
    }

    return NextResponse.json({ urls });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
