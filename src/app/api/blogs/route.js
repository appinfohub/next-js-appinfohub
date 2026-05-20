import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Blog from '@/backend/models/Blog';
import { verifyAdmin } from '@/backend/middleware/auth';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const admin = verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, coverImage } = body;
    
    await connectDB();
    const blog = new Blog({ title, content, coverImage });
    await blog.save();
    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
