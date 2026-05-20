import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import App from '@/backend/models/App';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const categories = searchParams.get('categories');
    const limit = parseInt(searchParams.get('limit'), 10) || 9;

    if (!categories) {
      return NextResponse.json({ message: 'categories query param required' }, { status: 400 });
    }

    await connectDB();
    const catList = categories.split(',').map(c => c.trim()).filter(Boolean);
    const limitNum = Math.min(limit, 20);

    const results = await Promise.all(
      catList.map(async (category) => {
        const apps = await App.find({ category: { $regex: category, $options: 'i' } })
          .sort({ rating: -1, createdAt: -1 })
          .limit(limitNum)
          .lean();
        return { category, apps };
      })
    );

    const data = {};
    for (const { category, apps } of results) {
      data[category] = apps;
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
