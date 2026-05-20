import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import App from '@/backend/models/App';
import { verifyAdmin } from '@/backend/middleware/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const app = await App.findById(id);
    if (!app) {
      return NextResponse.json({ message: 'App not found' }, { status: 404 });
    }
    return NextResponse.json(app);
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
    await connectDB();

    const {
      name,
      category,
      icon,
      images = [],
      rating,
      votes,
      downloads,
      description1,
      description2,
      description3,
      playStoreUrl,
      appStoreUrl
    } = body;

    const update = {
      name,
      category,
      icon,
      images,
      rating,
      votes,
      downloads,
      description1,
      description2,
      description3,
      playStoreUrl,
      appStoreUrl
    };

    const app = await App.findByIdAndUpdate(id, update, { new: true });
    if (!app) {
      return NextResponse.json({ message: 'App not found' }, { status: 404 });
    }
    return NextResponse.json(app);
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
    const app = await App.findByIdAndDelete(id);
    if (!app) {
      return NextResponse.json({ message: 'App not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'App deleted' });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
