import { prisma } from './db';

export interface CalculationInput {
  pickupLocation: string;
  dropLocation: string;
  tripType: 'one_way' | 'round_trip';
  numPets: number;
  pickupTime?: string; // HH:mm
  travelDate?: string;
}

export interface FareBreakdown {
  distanceKm: number;
  baseFare: number;
  includedKm: number;
  billableKm: number;
  distanceCharge: number;
  minimumFare: number;
  subtotalBeforeSurcharges: number;
  additionalPetCharge: number;
  roundTripDiscount: number;
  airportSurcharge: number;
  nightSurcharge: number;
  weekendSurcharge: number;
  subtotalBeforeVat: number;
  vatPercentage: number;
  vatAmount: number;
  totalFare: number;
  isAirport: boolean;
  isNight: boolean;
}

// Known Dubai landmarks coordinates & distance mapping database for realistic local routing
const DUBAI_LOCATIONS: Record<string, { lat: number; lng: number }> = {
  'dubai marina': { lat: 25.0772, lng: 55.1332 },
  'dubai international airport': { lat: 25.2532, lng: 55.3657 },
  'dxb': { lat: 25.2532, lng: 55.3657 },
  'downtown dubai': { lat: 25.1972, lng: 55.2744 },
  'burj khalifa': { lat: 25.1972, lng: 55.2744 },
  'business bay': { lat: 25.1837, lng: 55.2666 },
  'jumeirah': { lat: 25.1888, lng: 55.2255 },
  'palm jumeirah': { lat: 25.1124, lng: 55.1390 },
  'al barsha': { lat: 25.1130, lng: 55.1970 },
  'dubai hills': { lat: 25.1180, lng: 55.2500 },
  'motor city': { lat: 25.0470, lng: 55.2370 },
  'mirdif': { lat: 25.2200, lng: 55.4200 },
  'silicon oasis': { lat: 25.1260, lng: 55.3800 },
  'deira': { lat: 25.2697, lng: 55.3095 },
  'jumeirah beach residence': { lat: 25.0770, lng: 55.1320 },
  'jbr': { lat: 25.0770, lng: 55.1320 },
  'jlt': { lat: 25.0700, lng: 55.1480 },
  'jumeirah lake towers': { lat: 25.0700, lng: 55.1480 },
  'al quoz': { lat: 25.1400, lng: 55.2300 },
  'arabian ranches': { lat: 25.0560, lng: 55.2700 },
  'damac hills': { lat: 25.0180, lng: 55.2530 },
  'international city': { lat: 25.1630, lng: 55.4070 },
  'dubai creek harbour': { lat: 25.2000, lng: 55.3300 },
  'al maktoum international airport': { lat: 24.8962, lng: 55.1614 },
  'dwc': { lat: 24.8962, lng: 55.1614 },
};

// Calculate Haversine distance in KM
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function estimateRoadDistance(pickup: string, drop: string): number {
  const pLower = pickup.toLowerCase();
  const dLower = drop.toLowerCase();

  let pCoords: { lat: number; lng: number } | null = null;
  let dCoords: { lat: number; lng: number } | null = null;

  for (const [key, coords] of Object.entries(DUBAI_LOCATIONS)) {
    if (pLower.includes(key)) pCoords = coords;
    if (dLower.includes(key)) dCoords = coords;
  }

  if (pCoords && dCoords) {
    const direct = haversineDistance(pCoords.lat, pCoords.lng, dCoords.lat, dCoords.lng);
    // Road factor in Dubai is typically 1.3x to 1.4x of straight line due to highways/interchanges
    const roadDist = Math.round(direct * 1.35 * 10) / 10;
    return Math.max(4.5, roadDist);
  }

  // Fallback heuristic based on query length/hashing if unknown specific locations in Dubai
  let hash = 0;
  const combined = pLower + dLower;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  const pseudoRandom = Math.abs(hash % 32) + 8.5; // distance between 8.5km and 40.5km
  return Math.round(pseudoRandom * 10) / 10;
}

export async function calculateFare(input: CalculationInput): Promise<FareBreakdown> {
  // Fetch pricing rules from DB
  let settings = await prisma.pricingSettings.findUnique({ where: { id: 'default' } });

  if (!settings) {
    settings = {
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
      updatedAt: new Date(),
    };
  }

  // 1. Calculate road distance
  const distanceKm = estimateRoadDistance(input.pickupLocation, input.dropLocation);

  // 2. Base & Distance charge
  const includedKm = settings.includedKm;
  const billableKm = Math.max(0, distanceKm - includedKm);
  const distanceCharge = Math.round(billableKm * settings.perKmRate * 100) / 100;
  
  let rawSubtotal = settings.baseFare + distanceCharge;

  // Additional pets
  const extraPetsCount = Math.max(0, input.numPets - 1);
  const additionalPetCharge = extraPetsCount * settings.additionalPetCharge;
  rawSubtotal += additionalPetCharge;

  // Apply Minimum Fare limit
  const subtotalBeforeSurcharges = Math.max(settings.minimumFare, rawSubtotal);

  // 3. Surcharges
  const pLower = input.pickupLocation.toLowerCase();
  const dLower = input.dropLocation.toLowerCase();
  const isAirport = pLower.includes('airport') || pLower.includes('dxb') || pLower.includes('dwc') || dLower.includes('airport') || dLower.includes('dxb') || dLower.includes('dwc');
  const airportSurcharge = isAirport ? settings.airportSurcharge : 0;

  // Night Surcharge check (10 PM to 6 AM)
  let isNight = false;
  if (input.pickupTime) {
    const hour = parseInt(input.pickupTime.split(':')[0], 10);
    if (hour >= 22 || hour < 6) {
      isNight = true;
    }
  }
  const nightSurcharge = isNight ? settings.nightSurcharge : 0;

  // Round trip multiplier (e.g. 1.8x = 20% discount on the return leg)
  let tripSubtotal = subtotalBeforeSurcharges;
  let roundTripDiscount = 0;
  if (input.tripType === 'round_trip') {
    const fullTwoWay = subtotalBeforeSurcharges * 2;
    tripSubtotal = subtotalBeforeSurcharges * settings.roundTripMultiplier;
    roundTripDiscount = Math.round((fullTwoWay - tripSubtotal) * 100) / 100;
  }

  const subtotalBeforeVat = Math.round((tripSubtotal + airportSurcharge + nightSurcharge) * 100) / 100;

  // VAT
  const vatPercentage = settings.vatEnabled ? settings.vatPercentage : 0;
  const vatAmount = settings.vatEnabled ? Math.round((subtotalBeforeVat * (vatPercentage / 100)) * 100) / 100 : 0;

  // Total Fare rounded to nearest 5 AED for clean presentation
  const exactTotal = subtotalBeforeVat + vatAmount;
  const totalFare = Math.ceil(exactTotal / 5) * 5;

  return {
    distanceKm,
    baseFare: settings.baseFare,
    includedKm,
    billableKm: Math.round(billableKm * 10) / 10,
    distanceCharge,
    minimumFare: settings.minimumFare,
    subtotalBeforeSurcharges,
    additionalPetCharge,
    roundTripDiscount,
    airportSurcharge,
    nightSurcharge,
    weekendSurcharge: 0,
    subtotalBeforeVat,
    vatPercentage,
    vatAmount,
    totalFare,
    isAirport,
    isNight,
  };
}

export function generateReference(type: 'DXB' | 'INT'): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `GPC-${type}-${dateStr}-${randNum}`;
}
