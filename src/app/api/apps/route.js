import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import App from '@/backend/models/App';
import { verifyAdmin } from '@/backend/middleware/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limit = parseInt(searchParams.get('limit'), 10) || 20;
    const skip = (page - 1) * limit;

    if (search) {
      const searchTerm = search.toLowerCase();
      const searchRegex = new RegExp(searchTerm, 'i');

      const pipeline = [
        {
          $match: {
            $or: [
              { name: searchRegex },
              { category: searchRegex },
              { description1: searchRegex },
              { description2: searchRegex },
              { description3: searchRegex }
            ]
          }
        },
        {
          $addFields: {
            searchScore: {
              $add: [
                {
                  $cond: [
                    { $eq: [{ $toLower: '$name' }, searchTerm] },
                    100,
                    0
                  ]
                },
                {
                  $cond: [
                    { $regexMatch: { input: '$name', regex: searchRegex } },
                    50,
                    0
                  ]
                },
                {
                  $cond: [
                    { $regexMatch: { input: '$category', regex: searchRegex } },
                    30,
                    0
                  ]
                },
                {
                  $cond: [
                    {
                      $or: [
                        { $regexMatch: { input: '$description1', regex: searchRegex } },
                        { $regexMatch: { input: '$description2', regex: searchRegex } },
                        { $regexMatch: { input: '$description3', regex: searchRegex } }
                      ]
                    },
                    10,
                    0
                  ]
                }
              ]
            }
          }
        },
        {
          $sort: {
            searchScore: -1,
            rating: -1,
            createdAt: -1
          }
        }
      ];

      if (category) {
        pipeline[0].$match.category = { $regex: category, $options: 'i' };
      }

      const apps = await App.aggregate([
        ...pipeline,
        { $skip: skip },
        { $limit: limit }
      ]);

      const countPipeline = [
        {
          $match: {
            $or: [
              { name: searchRegex },
              { category: searchRegex },
              { description1: searchRegex },
              { description2: searchRegex },
              { description3: searchRegex }
            ],
            ...(category && { category: { $regex: category, $options: 'i' } })
          }
        },
        {
          $count: "total"
        }
      ];
      
      const countResult = await App.aggregate(countPipeline);
      const total = countResult[0]?.total || 0;

      return NextResponse.json({
        apps,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      });
    }

    // No search - just category filter
    let filter = {};
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    const [apps, total] = await Promise.all([
      App.find(filter)
        .sort({ rating: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      App.countDocuments(filter)
    ]);

    return NextResponse.json({
      apps,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
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

    await connectDB();
    const body = await req.json();
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

    const app = new App({
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
    });

    await app.save();
    return NextResponse.json(app, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
