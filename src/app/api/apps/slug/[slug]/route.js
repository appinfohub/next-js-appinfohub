import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import App from '@/backend/models/App';

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    await connectDB();
    const parts = decodedSlug.split(/-+/).filter(Boolean).map(escapeRegex);
    const namePattern = parts.join('[\\s\\-]+');
    
    const app = await App.findOne({ name: { $regex: new RegExp(`^${namePattern}$`, 'i') } });

    if (!app) {
      return NextResponse.json({ message: 'App not found' }, { status: 404 });
    }

    return NextResponse.json(app);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
