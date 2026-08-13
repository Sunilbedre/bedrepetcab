import { NextResponse } from 'next/server';
import { calculateFare } from '@/lib/pricing';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pickupLocation, dropLocation, tripType, numPets, pickupTime, travelDate } = body;

    if (!pickupLocation || !dropLocation) {
      return NextResponse.json(
        { success: false, message: 'Pickup and drop locations are required.' },
        { status: 400 }
      );
    }

    const fare = await calculateFare({
      pickupLocation,
      dropLocation,
      tripType: tripType || 'one_way',
      numPets: numPets ? parseInt(numPets, 10) : 1,
      pickupTime,
      travelDate,
    });

    return NextResponse.json({ success: true, fare });
  } catch (error) {
    console.error('API Error in /api/taxi/calculate:', error);
    return NextResponse.json(
      { success: false, message: 'Server calculation error' },
      { status: 500 }
    );
  }
}
