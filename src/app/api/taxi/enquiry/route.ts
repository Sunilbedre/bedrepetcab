import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateReference } from '@/lib/pricing';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      pickupLocation,
      dropLocation,
      tripType,
      petType,
      numPets,
      travelDate,
      pickupTime,
      estimatedFare,
      breakdownJson,
      customerName,
      phone,
      whatsapp,
      email,
      petName,
      breed,
      crateAvailable,
      notes,
      distanceKm,
    } = body;

    if (!pickupLocation || !dropLocation || !customerName || !phone) {
      return NextResponse.json(
        { success: false, message: 'Missing required booking fields.' },
        { status: 400 }
      );
    }

    const referenceId = generateReference('DXB');

    const enquiry = await prisma.taxiEnquiry.create({
      data: {
        referenceId,
        pickupLocation,
        dropLocation,
        distanceKm: distanceKm || 0,
        tripType: tripType || 'one_way',
        petType: petType || 'Dog',
        numPets: numPets || 1,
        travelDate: travelDate || new Date().toISOString().split('T')[0],
        pickupTime: pickupTime || '10:00',
        estimatedFare: estimatedFare || 0,
        breakdownJson: typeof breakdownJson === 'string' ? breakdownJson : JSON.stringify(breakdownJson || {}),
        customerName,
        phone,
        whatsapp: whatsapp || phone,
        email: email || '',
        petName: petName || '',
        breed: breed || '',
        crateAvailable: crateAvailable || 'No',
        notes: notes || '',
        status: 'New',
      },
    });

    // Generate pre-populated structured WhatsApp Message
    const messageText = `Hello Global Pet Cab Dubai,

I'd like to arrange a Dubai Pet Taxi.

Booking Reference: ${referenceId}

Pickup: ${pickupLocation}
Drop: ${dropLocation}
Travel Date: ${travelDate || 'Not specified'}
Pickup Time: ${pickupTime || 'Not specified'}
Pet: ${petName || petType} (${breed || petType})
Trip Type: ${tripType === 'round_trip' ? 'Round Trip' : 'One Way'}
Distance: ${distanceKm || 0} km
Estimated Fare: AED ${estimatedFare}

Name: ${customerName}
Phone: ${phone}

Please confirm driver availability.`;

    const encodedMsg = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/971501234567?text=${encodedMsg}`;

    return NextResponse.json({
      success: true,
      referenceId,
      enquiryId: enquiry.id,
      whatsappUrl,
    });
  } catch (error) {
    console.error('API Error in /api/taxi/enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Server database error' },
      { status: 500 }
    );
  }
}
