import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password required' }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      admin: { email: admin.email, name: admin.name },
    });

    // Set simple secure session cookie
    response.cookies.set('gpc_admin_session', 'authenticated_admin_user', {
      httpOnly: true,
      path: '/',
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json({ success: false, message: 'Server auth error' }, { status: 500 });
  }
}
