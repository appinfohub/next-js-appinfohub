import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return NextResponse.json({ token });
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
