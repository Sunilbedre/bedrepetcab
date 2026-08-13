import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const taxiRequests = await prisma.taxiEnquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    const intlRequests = await prisma.internationalEnquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      taxiRequests,
      intlRequests,
    });
  } catch (error) {
    console.error('Enquiries GET Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { type, id, status } = await request.json();

    if (type === 'taxi') {
      const updated = await prisma.taxiEnquiry.update({
        where: { id },
        data: { status },
      });
      return NextResponse.json({ success: true, item: updated });
    } else if (type === 'international') {
      const updated = await prisma.internationalEnquiry.update({
        where: { id },
        data: { status },
      });
      return NextResponse.json({ success: true, item: updated });
    }

    return NextResponse.json({ success: false, message: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Enquiries PUT Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update status' }, { status: 500 });
  }
}
