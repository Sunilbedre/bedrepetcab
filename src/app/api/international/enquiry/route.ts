import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateReference } from '@/lib/pricing';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      direction,
      originCountry,
      originCity,
      destCountry,
      destCity,
      travelDate,
      petType,
      petName,
      breed,
      age,
      gender,
      weightKg,
      dimensions,
      crateStatus,
      microchipStatus,
      vaccinationStatus,
      rabiesStatus,
      servicesJson,
      customerName,
      phone,
      whatsapp,
      email,
      notes,
    } = body;

    if (!originCountry || !destCountry || !customerName || !phone) {
      return NextResponse.json(
        { success: false, message: 'Missing required international relocation fields.' },
        { status: 400 }
      );
    }

    const referenceId = generateReference('INT');

    const enquiry = await prisma.internationalEnquiry.create({
      data: {
        referenceId,
        direction: direction || 'from_dubai',
        originCountry,
        originCity: originCity || '',
        destCountry,
        destCity: destCity || '',
        travelDate: travelDate || '',
        petType: petType || 'Dog',
        petName: petName || 'Pet',
        breed: breed || '',
        age: age || '',
        gender: gender || '',
        weightKg: weightKg || '',
        dimensions: dimensions || '',
        crateStatus: crateStatus || 'Not Sure',
        microchipStatus: microchipStatus || 'Not Sure',
        vaccinationStatus: vaccinationStatus || 'Not Sure',
        rabiesStatus: rabiesStatus || 'Not Sure',
        servicesJson: typeof servicesJson === 'string' ? servicesJson : JSON.stringify(servicesJson || []),
        customerName,
        phone,
        whatsapp: whatsapp || phone,
        email: email || '',
        notes: notes || '',
        status: 'New',
      },
    });

    return NextResponse.json({
      success: true,
      referenceId,
      enquiryId: enquiry.id,
    });
  } catch (error) {
    console.error('API Error in /api/international/enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Server database error' },
      { status: 500 }
    );
  }
}
