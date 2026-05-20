import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Topic from '@/backend/models/Topic';
import { verifyAdmin } from '@/backend/middleware/auth';

export async function GET() {
  try {
    await connectDB();
    const topics = await Topic.find().sort({ createdAt: -1 });
    return NextResponse.json(topics);
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
    const topic = new Topic({ title, content, coverImage });
    await topic.save();
    return NextResponse.json(topic, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
