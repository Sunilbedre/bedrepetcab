import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    let settings = await prisma.pricingSettings.findUnique({ where: { id: 'default' } });
    if (!settings) {
      settings = await prisma.pricingSettings.create({
        data: { id: 'default' },
      });
    }
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Pricing GET Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      baseFare,
      includedKm,
      perKmRate,
      minimumFare,
      additionalPetCharge,
      roundTripMultiplier,
      airportSurcharge,
      nightSurcharge,
      vatEnabled,
      vatPercentage,
    } = body;

    const updated = await prisma.pricingSettings.upsert({
      where: { id: 'default' },
      update: {
        baseFare: parseFloat(baseFare),
        includedKm: parseFloat(includedKm),
        perKmRate: parseFloat(perKmRate),
        minimumFare: parseFloat(minimumFare),
        additionalPetCharge: parseFloat(additionalPetCharge),
        roundTripMultiplier: parseFloat(roundTripMultiplier),
        airportSurcharge: parseFloat(airportSurcharge),
        nightSurcharge: parseFloat(nightSurcharge),
        vatEnabled: Boolean(vatEnabled),
        vatPercentage: parseFloat(vatPercentage),
      },
      create: {
        id: 'default',
        baseFare: parseFloat(baseFare),
        includedKm: parseFloat(includedKm),
        perKmRate: parseFloat(perKmRate),
        minimumFare: parseFloat(minimumFare),
        additionalPetCharge: parseFloat(additionalPetCharge),
        roundTripMultiplier: parseFloat(roundTripMultiplier),
        airportSurcharge: parseFloat(airportSurcharge),
        nightSurcharge: parseFloat(nightSurcharge),
        vatEnabled: Boolean(vatEnabled),
        vatPercentage: parseFloat(vatPercentage),
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Pricing PUT Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update settings' }, { status: 500 });
  }
}
