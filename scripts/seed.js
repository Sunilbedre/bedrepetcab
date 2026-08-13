const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Global Pet Cab Dubai database...');

  // 1. Seed Pricing Settings
  await prisma.pricingSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      baseFare: 60.0,
      includedKm: 5.0,
      perKmRate: 4.5,
      minimumFare: 80.0,
      additionalPetCharge: 30.0,
      roundTripMultiplier: 1.8,
      airportSurcharge: 35.0,
      nightSurcharge: 25.0,
      weekendSurcharge: 15.0,
      vatEnabled: true,
      vatPercentage: 5.0,
    },
  });

  // 2. Seed Admin User (admin@globalpetcab.com / Admin123!)
  const passwordHash = await bcrypt.hash('Admin123!', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@globalpetcab.com' },
    update: { passwordHash },
    create: {
      email: 'admin@globalpetcab.com',
      passwordHash,
      name: 'Global Pet Cab Admin',
    },
  });

  // 3. Seed Verified Reviews
  const reviewModel = prisma.review;
  if (reviewModel) {
    const reviewsCount = await reviewModel.count();
    if (reviewsCount === 0) {
      await reviewModel.createMany({
        data: [
          {
            customerName: 'Sarah Jenkins',
            petName: 'Milo (Golden Retriever)',
            routeLabel: 'DUBAI MARINA → DXB AIRPORT',
            rating: 5,
            comment: 'Outstanding pet taxi service! The vehicle was immaculate, air-conditioned, and Milo was safely secured in a spacious travel crate. Arrived at DXB with zero stress.',
            source: 'Google Review',
            verified: true,
          },
          {
            customerName: 'Tariq Al-Maktoum',
            petName: 'Bella (Persian Cat)',
            routeLabel: 'JUMEIRAH → VET CLINIC (ROUND TRIP)',
            rating: 5,
            comment: 'We use Global Pet Cab for all of Bella\'s grooming and vet visits across Dubai. The driver was punctual, incredibly gentle with her, and waited right outside.',
            source: 'Google Review',
            verified: true,
          },
          {
            customerName: 'Marcus & Elena Vance',
            petName: 'Bruno (French Bulldog)',
            routeLabel: 'DUBAI → LONDON (LHR)',
            rating: 5,
            comment: 'Relocating our Frenchie to Heathrow felt overwhelming until Global Pet Cab took over. They handled export permits, IATA crate sizing, airline approval, and door-to-door delivery perfectly.',
            source: 'Google Review',
            verified: true,
          },
          {
            customerName: 'Ananya Sharma',
            petName: 'Coco & Leo (Indie Dogs)',
            routeLabel: 'MUMBAI → DUBAI (DXB)',
            rating: 5,
            comment: 'Brought both our dogs into Dubai smoothly! Global Pet Cab managed the UAE import permit, rabies titer verification, customs clearance, and home delivery.',
            source: 'Google Review',
            verified: true,
          },
        ],
      });
    }
  }

  // 4. Seed FAQs
  const faqModel = prisma.fAQ || prisma.faq;
  if (faqModel) {
    const faqCount = await faqModel.count();
    if (faqCount === 0) {
      await faqModel.createMany({
        data: [
          {
            category: 'taxi',
            question: 'How is my Dubai Pet Taxi fare calculated?',
            answer: 'Your fare is calculated dynamically based on actual driving road distance (via live mapping), trip type (one-way or round-trip), number of pets, pickup time, and optional airport surcharges, plus 5% UAE VAT. You see the exact estimate before requesting!',
            order: 1,
          },
          {
            category: 'taxi',
            question: 'Are your vehicles climate-controlled and sanitized?',
            answer: 'Yes! Every Global Pet Cab vehicle features dedicated climate control suitable for Dubai temperatures, anti-slip safety matting, sanitization between every journey, and approved IATA safety crates or harnesses.',
            order: 2,
          },
          {
            category: 'taxi',
            question: 'Can I accompany my pet in the Pet Taxi?',
            answer: 'Absolutely. Up to 2 pet parents can ride alongside their pets at no extra charge, provided seating capacity permits.',
            order: 3,
          },
          {
            category: 'international',
            question: 'How early should I start planning an international pet relocation to/from Dubai?',
            answer: 'We recommend starting 2 to 4 months prior to travel, especially for countries requiring rabies blood titer tests (RNATT), export/import permits, or specific airline health certificates.',
            order: 4,
          },
          {
            category: 'international',
            question: 'Do you provide IATA-compliant travel crates?',
            answer: 'Yes, we supply custom and standard IATA-certified travel crates fitted with proper ventilation, absorbent bedding, water bowls, and live animal labels tailored to your pet\'s exact measurements.',
            order: 5,
          },
          {
            category: 'international',
            question: 'Can you handle complete door-to-door relocation?',
            answer: 'Yes! Our full-service package covers home pickup in Dubai, veterinary inspection, export permit clearance, airline booking, customs processing, destination airport clearance, and doorstep delivery.',
            order: 6,
          },
        ],
      });
    }
  }

  // 5. Seed sample enquiries if empty
  const taxiCount = await prisma.taxiEnquiry.count();
  if (taxiCount === 0) {
    await prisma.taxiEnquiry.create({
      data: {
        referenceId: 'GPC-DXB-260812-1048',
        pickupLocation: 'Dubai Marina Walk, Dubai',
        dropLocation: 'Dubai International Airport (DXB) Terminal 3',
        distanceKm: 34.5,
        tripType: 'one_way',
        petType: 'Dog',
        numPets: 1,
        travelDate: '2026-08-20',
        pickupTime: '08:00',
        estimatedFare: 228.0,
        breakdownJson: JSON.stringify({
          baseFare: 60,
          distanceCharge: 132.75,
          additionalPetCharge: 0,
          airportSurcharge: 35,
          vat: 11.38,
          total: 228,
        }),
        customerName: 'Sarah Jenkins',
        phone: '+971 50 123 4567',
        whatsapp: '+971 50 123 4567',
        email: 'sarah.j@example.com',
        petName: 'Milo',
        breed: 'Golden Retriever',
        crateAvailable: 'Yes',
        notes: 'Needs airport drop-off at Terminal 3 departures',
        status: 'Confirmed',
      },
    });
  }

  const intlCount = await prisma.internationalEnquiry.count();
  if (intlCount === 0) {
    await prisma.internationalEnquiry.create({
      data: {
        referenceId: 'GPC-INT-260812-1050',
        direction: 'from_dubai',
        originCountry: 'United Arab Emirates',
        originCity: 'Dubai',
        destCountry: 'United Kingdom',
        destCity: 'London',
        travelDate: '2026-09-15',
        petType: 'Dog',
        petName: 'Bruno',
        breed: 'French Bulldog',
        age: '3 years',
        gender: 'Male',
        weightKg: '12 kg',
        dimensions: 'Length 55cm, Height 40cm',
        crateStatus: 'No',
        microchipStatus: 'Yes',
        vaccinationStatus: 'Yes',
        rabiesStatus: 'Yes',
        servicesJson: JSON.stringify(['Doorstep Pickup', 'Veterinary Documentation Assistance', 'Export Permit', 'IATA Travel Crate', 'Airline Booking', 'Customs Clearance', 'Complete Door-to-Door Relocation']),
        customerName: 'Marcus Vance',
        phone: '+971 52 987 6543',
        whatsapp: '+971 52 987 6543',
        email: 'marcus.vance@example.com',
        notes: 'Relocating for work transfer to London in September',
        status: 'Quote Preparing',
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
