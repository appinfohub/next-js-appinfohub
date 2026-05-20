import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Topic from '@/backend/models/Topic';
import { verifyAdmin } from '@/backend/middleware/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const topic = await Topic.findById(id);
    if (!topic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json(topic);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const admin = verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, content, coverImage } = body;

    await connectDB();
    const update = { title, content };
    if (coverImage) update.coverImage = coverImage;

    const topic = await Topic.findByIdAndUpdate(id, update, { new: true });
    if (!topic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json(topic);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const admin = verifyAdmin(req);
    if (!admin) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const topic = await Topic.findByIdAndDelete(id);
    if (!topic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Topic deleted' });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
