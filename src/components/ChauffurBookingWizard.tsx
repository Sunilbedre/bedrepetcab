'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, Globe, Plane, MapPin, Calendar, Clock, Dog, Users, Luggage, 
  CheckCircle2, ArrowRight, ArrowLeft, MessageCircle, AlertCircle, Sparkles, Phone, Mail, ChevronRight, ShieldCheck, Heart, Building, Check
} from 'lucide-react';

interface CalculationResult {
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
  subtotalBeforeVat: number;
  vatPercentage: number;
  vatAmount: number;
  totalFare: number;
  isAirport: boolean;
  isNight: boolean;
}

export default function ChauffurBookingWizard() {
  const [step, setStep] = useState(0);

  // Step 0: Ride Type
  const [rideCategory, setRideCategory] = useState<'dubai' | 'airport' | 'intercity' | 'international'>('dubai');

  // Step 1: Locations & Ride Details
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDetail, setPickupDetail] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [dropDetail, setDropDetail] = useState('');
  
  // Airport Specifics
  const [airportName, setAirportName] = useState('DXB');
  const [airportDir, setAirportDir] = useState<'TO' | 'FROM'>('TO');

  // Intercity Specifics
  const [intercityRoute, setIntercityRoute] = useState('dubai-abudhabi');

  // International Specifics
  const [originCountry, setOriginCountry] = useState('United Arab Emirates');
  const [originCity, setOriginCity] = useState('Dubai');
  const [destCountry, setDestCountry] = useState('United Kingdom');
  const [destCity, setDestCity] = useState('London');

  // Trip Options
  const [tripType, setTripType] = useState<'ONE_WAY' | 'TWO_WAY'>('ONE_WAY');
  const [accompanied, setAccompanied] = useState<'yes' | 'no'>('yes');
  const [crateSize, setCrateSize] = useState('Medium (M)');
  const [passengers, setPassengers] = useState(1);
  const [luggageInfo, setLuggageInfo] = useState('');

  // Date & Time
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('10:00');

  // Calculated Quote State
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null);
  const [estimatedFare, setEstimatedFare] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Step 2: Customer & Pet Specs
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Step 3: Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<{
    referenceId: string;
    whatsappUrl: string;
  } | null>(null);

  // Quick Select Location Chips
  const DUBAI_LOCATIONS = [
    'Dubai Marina', 'DXB Airport T3', 'Downtown Dubai', 
    'Palm Jumeirah', 'Business Bay', 'Jumeirah Beach Residence (JBR)', 
    'Dubai Hills Estate', 'Mirdif', 'Silicon Oasis', 'Al Barsha'
  ];

  // Perform Calculation for Step 1 -> Step 2
  const handleProceedToQuote = async () => {
    setErrorMsg('');

    if (rideCategory === 'international') {
      if (!originCity || !destCity) {
        setErrorMsg('Please specify origin and destination cities.');
        return;
      }
      setEstimatedFare(0);
      setStep(2);
      return;
    }

    if (rideCategory === 'dubai' && (!pickupLocation.trim() || !dropLocation.trim())) {
      setErrorMsg('Please enter both pickup and drop-off locations in Dubai.');
      return;
    }

    if (rideCategory === 'airport' && !pickupLocation.trim()) {
      setErrorMsg('Please enter your home/hotel address for airport transport.');
      return;
    }

    setIsCalculating(true);

    try {
      let calcPickup = pickupLocation;
      let calcDrop = dropLocation;

      if (rideCategory === 'airport') {
        const airportLabel = airportName === 'DXB' ? 'Dubai Airport DXB' : airportName === 'DWC' ? 'Al Maktoum Airport DWC' : 'Abu Dhabi Airport AUH';
        if (airportDir === 'TO') {
          calcDrop = airportLabel;
        } else {
          calcPickup = airportLabel;
          calcDrop = pickupLocation;
        }
      } else if (rideCategory === 'intercity') {
        calcPickup = pickupLocation || 'Dubai Marina';
        calcDrop = intercityRoute.includes('abudhabi') ? 'Abu Dhabi' : intercityRoute.includes('sharjah') ? 'Sharjah' : 'Ras Al Khaimah';
      }

      const res = await fetch('/api/taxi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupLocation: calcPickup,
          dropLocation: calcDrop,
          tripType: tripType === 'TWO_WAY' ? 'round_trip' : 'one_way',
          numPets: 1,
          pickupTime,
          travelDate,
        }),
      });

      if (!res.ok) throw new Error('Calculation error');

      const data = await res.json();
      setCalcResult(data.fare);
      setEstimatedFare(data.fare.totalFare);
      setStep(2);
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not calculate fare. Please check locations.');
    } finally {
      setIsCalculating(false);
    }
  };

  // Submit Final Booking Request for Step 2 -> Step 3
  const handleFinalBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and WhatsApp / mobile number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (rideCategory === 'international') {
        const res = await fetch('/api/international/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            direction: 'from_dubai',
            originCountry,
            originCity,
            destCountry,
            destCity,
            travelDate,
            petType: species,
            petName,
            breed,
            weightKg,
            crateStatus: crateSize,
            customerName,
            phone,
            whatsapp: phone,
            email,
            notes: specialNotes,
          }),
        });

        const data = await res.json();
        if (data.success) {
          const waMsg = `Hello Global Pet Cab Dubai, I submitted an International Pet Relocation request.%0A%0ARef: ${data.referenceId}%0AOwner: ${customerName}%0ARoute: ${originCity} to ${destCity}%0APet: ${petName || species} (${breed || species})`;
          setBookingConfirmed({
            referenceId: data.referenceId,
            whatsappUrl: `https://wa.me/971501234567?text=${waMsg}`,
          });
          setStep(3);
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } else {
        const fullPickup = pickupDetail ? `${pickupLocation} (${pickupDetail})` : pickupLocation;
        const fullDrop = dropDetail ? `${dropLocation} (${dropDetail})` : dropLocation;

        const res = await fetch('/api/taxi/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pickupLocation: fullPickup,
            dropLocation: fullDrop,
            tripType: tripType === 'TWO_WAY' ? 'round_trip' : 'one_way',
            petType: species,
            numPets: 1,
            travelDate,
            pickupTime,
            estimatedFare,
            breakdownJson: JSON.stringify(calcResult),
            customerName,
            phone,
            whatsapp: phone,
            email,
            petName,
            breed,
            crateAvailable: crateSize,
            notes: `Accompanied: ${accompanied}, Passengers: ${passengers}, Luggage: ${luggageInfo}. ${specialNotes}`,
            distanceKm: calcResult?.distanceKm || 0,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setBookingConfirmed({
            referenceId: data.referenceId,
            whatsappUrl: data.whatsappUrl,
          });
          setStep(3);
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 font-body">
      
      {/* Top Luxury Header Card */}
      <div className="bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white p-8 sm:p-10 rounded-3xl shadow-2xl mb-10 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-bright/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-bold shadow-lg border border-teal-light/20">
              <Car className="w-7 h-7 text-teal-light" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-bright/20 text-teal-light text-xs px-3 py-0.5 rounded-full font-black tracking-widest uppercase font-heading">
                <Sparkles className="w-3 h-3 text-amber-300" />
                GLOBAL PET CAB DUBAI
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-white mt-1">
                Pet Transport & Relocation Booking
              </h1>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-teal-light hover:text-white border border-teal-light/30 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md transition-all hover:bg-white/20"
          >
            <span>← Return Home</span>
          </Link>
        </div>
      </div>

      {/* Elegant Progress Wizard Bar */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-teal-border mb-10">
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: '01', title: 'Service Category' },
            { num: '02', title: 'Ride & Locations' },
            { num: '03', title: 'Quote & Details' },
            { num: '04', title: 'Confirmed' },
          ].map((item, idx) => {
            const isActive = step === idx;
            const isDone = step > idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => isDone && setStep(idx)}
                disabled={!isDone && !isActive}
                className={`p-3 rounded-2xl transition-all text-left flex flex-col justify-between ${
                  isActive
                    ? 'bg-navy text-white shadow-md ring-2 ring-teal-deep/30'
                    : isDone
                    ? 'bg-teal-soft text-teal-deep hover:bg-teal-soft/80'
                    : 'bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-black font-mono">
                  <span>{item.num}</span>
                  {isDone && <Check className="w-4 h-4 text-teal-deep" />}
                </div>
                <div className={`text-xs sm:text-sm font-extrabold font-heading mt-2 ${
                  isActive ? 'text-white' : isDone ? 'text-navy' : 'text-slate-400'
                }`}>
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Card Container */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-fj-card border border-teal-border relative">

        {errorMsg && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3 font-medium animate-fade-in-up">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 0: Select Service / Ride Type */}
        {step === 0 && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">
                STEP 1 OF 4
              </span>
              <h2 className="text-2xl sm:text-[27px] font-black font-heading text-navy">Choose Your Pet Transport or Relocation Service</h2>
              <p className="text-base text-slate-600 font-body">Select local pet transport in Dubai, an airport transfer, UAE intercity travel, or international pet relocation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Option 1: Within Dubai */}
              <button
                type="button"
                onClick={() => setRideCategory('dubai')}
                className={`p-7 rounded-3xl border-2 text-left transition-all space-y-4 relative group ${
                  rideCategory === 'dubai'
                    ? 'border-teal-deep bg-teal-soft/70 ring-4 ring-teal-deep/10 shadow-fj-card'
                    : 'border-teal-border hover:border-slate-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-teal-deep text-white flex items-center justify-center text-3xl shadow-sm border border-teal-light/20">
                    🏙️
                  </div>
                  {rideCategory === 'dubai' && (
                    <span className="bg-teal-deep text-white font-extrabold text-xs px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-black font-heading text-xl text-navy">Within Dubai</h3>
                  <p className="text-sm text-slate-600 font-body mt-1.5 leading-relaxed">
                    Pet Transport in Dubai — Vet visits, grooming drop-offs, boarding and DXB airport transfers across Dubai.
                  </p>
                </div>
              </button>

              {/* Option 2: Airport Transfer */}
              <button
                type="button"
                onClick={() => setRideCategory('airport')}
                className={`p-7 rounded-3xl border-2 text-left transition-all space-y-4 relative group ${
                  rideCategory === 'airport'
                    ? 'border-teal-deep bg-teal-soft/70 ring-4 ring-teal-deep/10 shadow-fj-card'
                    : 'border-teal-border hover:border-slate-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-teal-deep text-white flex items-center justify-center text-3xl shadow-sm border border-teal-light/20">
                    ✈️
                  </div>
                  {rideCategory === 'airport' && (
                    <span className="bg-teal-deep text-white font-extrabold text-xs px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-black font-heading text-xl text-navy">Airport Transfer</h3>
                  <p className="text-sm text-slate-600 font-body mt-1.5 leading-relaxed">
                    Pet Airport Transfers — DXB, DWC Al Maktoum and Abu Dhabi AUH pickups and drop-offs.
                  </p>
                </div>
              </button>

              {/* Option 3: City to City UAE */}
              <button
                type="button"
                onClick={() => setRideCategory('intercity')}
                className={`p-7 rounded-3xl border-2 text-left transition-all space-y-4 relative group ${
                  rideCategory === 'intercity'
                    ? 'border-teal-deep bg-teal-soft/70 ring-4 ring-teal-deep/10 shadow-fj-card'
                    : 'border-teal-border hover:border-slate-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-teal-deep text-white flex items-center justify-center text-3xl shadow-sm border border-teal-light/20">
                    🗺️
                  </div>
                  {rideCategory === 'intercity' && (
                    <span className="bg-teal-deep text-white font-extrabold text-xs px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-black font-heading text-xl text-navy">UAE Intercity</h3>
                  <p className="text-sm text-slate-600 font-body mt-1.5 leading-relaxed">
                    UAE Pet Transport — Dubai to Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah and Fujairah.
                  </p>
                </div>
              </button>

              {/* Option 4: International Flight Relocation */}
              <button
                type="button"
                onClick={() => setRideCategory('international')}
                className={`p-7 rounded-3xl border-2 text-left transition-all space-y-4 relative group ${
                  rideCategory === 'international'
                    ? 'border-navy bg-navy text-white ring-4 ring-navy/10 shadow-fj-card'
                    : 'border-teal-border hover:border-slate-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-teal-bright text-navy flex items-center justify-center text-3xl shadow-sm font-bold">
                    🌍
                  </div>
                  {rideCategory === 'international' && (
                    <span className="bg-teal-bright text-navy font-black text-xs px-3 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div>
                  <h3 className={`font-black font-heading text-xl ${rideCategory === 'international' ? 'text-white' : 'text-navy'}`}>
                    International Relocation
                  </h3>
                  <p className={`text-sm font-body mt-1.5 leading-relaxed ${rideCategory === 'international' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Dubai to and from the UK, India, USA, Canada, Australia and Europe.
                  </p>
                </div>
              </button>

            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4.5 rounded-2xl shadow-fj-coral flex items-center justify-center gap-3 text-lg transition-all transform active:scale-98 mt-8"
            >
              <span>Continue to Step 2 — Ride Details</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 1: Ride & Location Details */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in-up">
            
            <div className="space-y-2">
              <span className="text-xs font-black font-heading uppercase tracking-widest text-teal-deep bg-teal-soft px-3.5 py-1.5 rounded-full border border-teal-border">
                Step 2 of 4
              </span>
              <h2 className="text-3xl font-black font-heading text-navy">
                {rideCategory === 'dubai' ? 'Dubai City Ride Details' : rideCategory === 'airport' ? 'Airport Transfer Details' : rideCategory === 'intercity' ? 'Intercity UAE Details' : 'International Relocation Details'}
              </h2>
              <p className="text-base text-slate-600 font-body">Provide exact travel locations, pickup time, and pet preferences.</p>
            </div>

            {/* A. WITHIN DUBAI FIELDS */}
            {rideCategory === 'dubai' && (
              <div className="space-y-6">
                
                {/* Pickup Location */}
                <div className="space-y-2">
                  <label className="fj-label flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    Pickup Location in Dubai *
                  </label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Start typing location (e.g. Dubai Marina, Business Bay)..."
                    className="fj-input text-base"
                    required
                  />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-xs text-slate-400 font-semibold py-1">Quick select:</span>
                    {DUBAI_LOCATIONS.slice(0, 4).map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setPickupLocation(loc)}
                        className="text-xs bg-teal-soft hover:bg-slate-200 text-teal-deep font-bold px-3 py-1 rounded-full border border-teal-border transition-colors"
                      >
                        + {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="fj-label flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" />
                    Building / Villa / Apt Number
                  </label>
                  <input
                    type="text"
                    value={pickupDetail}
                    onChange={(e) => setPickupDetail(e.target.value)}
                    placeholder="e.g. Zenith A2 Tower, Apt 1405"
                    className="fj-input text-base"
                  />
                </div>

                {/* Dropoff Location */}
                <div className="space-y-2">
                  <label className="fj-label flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    Drop-off Location in Dubai *
                  </label>
                  <input
                    type="text"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="Start typing location (e.g. Vet Clinic, Grooming, DXB)..."
                    className="fj-input text-base"
                    required
                  />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-xs text-slate-400 font-semibold py-1">Quick select:</span>
                    {DUBAI_LOCATIONS.slice(4, 8).map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setDropLocation(loc)}
                        className="text-xs bg-teal-soft hover:bg-slate-200 text-teal-deep font-bold px-3 py-1 rounded-full border border-teal-border transition-colors"
                      >
                        + {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="fj-label flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" />
                    Building / Villa / Apt Number
                  </label>
                  <input
                    type="text"
                    value={dropDetail}
                    onChange={(e) => setDropDetail(e.target.value)}
                    placeholder="e.g. Bahar 1, Apt 1701"
                    className="fj-input text-base"
                  />
                </div>

                {/* Trip Type Toggle */}
                <div className="space-y-3">
                  <label className="fj-label">Select Trip Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-teal-soft/70 rounded-2xl border border-teal-border">
                    <button
                      type="button"
                      onClick={() => setTripType('ONE_WAY')}
                      className={`py-3.5 px-4 text-sm font-extrabold rounded-xl transition-all ${
                        tripType === 'ONE_WAY' ? 'bg-white text-navy shadow-md' : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      One Way Ride
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType('TWO_WAY')}
                      className={`py-3.5 px-4 text-sm font-extrabold rounded-xl transition-all ${
                        tripType === 'TWO_WAY' ? 'bg-white text-navy shadow-md' : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      Return Ride (+ 30 min waiting included)
                    </button>
                  </div>

                  {tripType === 'ONE_WAY' ? (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-1">
                      ⏱ <strong>One-way waiting time:</strong> Driver waits free for first 5 mins. After that, AED 52.50 per 30 mins applies.
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-teal-soft border border-teal-border text-xs sm:text-sm text-teal-deep space-y-1 font-medium">
                      ⏱ <strong>Return trip includes 30 mins waiting time:</strong> Ideal for vet clinic & grooming drop-offs.
                    </div>
                  )}
                </div>

                {/* Accompanied Toggle */}
                <div className="space-y-3">
                  <label className="fj-label">Travelling with your pet?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-teal-soft/70 rounded-2xl border border-teal-border">
                    <button
                      type="button"
                      onClick={() => setAccompanied('yes')}
                      className={`py-3.5 px-4 text-sm font-extrabold rounded-xl transition-all ${
                        accompanied === 'yes' ? 'bg-white text-navy shadow-md' : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      ✅ Accompanied (Pet Parent rides free)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccompanied('no')}
                      className={`py-3.5 px-4 text-sm font-extrabold rounded-xl transition-all ${
                        accompanied === 'no' ? 'bg-white text-navy shadow-md' : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      🐾 Unaccompanied (Pet Transport Only)
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* B. AIRPORT TRANSFER FIELDS */}
            {rideCategory === 'airport' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="fj-label">Select Airport</label>
                    <select
                      value={airportName}
                      onChange={(e) => setAirportName(e.target.value)}
                      className="fj-select text-base"
                    >
                      <option value="DXB">Dubai International Airport — DXB (Main)</option>
                      <option value="DWC">Dubai World Central — DWC (Al Maktoum)</option>
                      <option value="AUH">Abu Dhabi International Airport — AUH</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="fj-label">Direction</label>
                    <select
                      value={airportDir}
                      onChange={(e) => setAirportDir(e.target.value as 'TO' | 'FROM')}
                      className="fj-select text-base"
                    >
                      <option value="TO">To Airport (Drop-off)</option>
                      <option value="FROM">From Airport (Pick-up)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="fj-label">Your Home / Hotel Address *</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. Marina Pinnacle Tower, Dubai Marina"
                    className="fj-input text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="fj-label">Travel Crate Size</label>
                    <select
                      value={crateSize}
                      onChange={(e) => setCrateSize(e.target.value)}
                      className="fj-select text-base"
                    >
                      <option value="Small (S)">Small (S) — under 45cm</option>
                      <option value="Medium (M)">Medium (M) — 45–76cm</option>
                      <option value="Large (L)">Large (L) — 76–100cm</option>
                      <option value="XL">Extra Large (XL) — 100cm+</option>
                      <option value="Supply Needed">Supply Crate Needed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="fj-label">Passengers</label>
                    <input
                      type="number"
                      min={0}
                      max={4}
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value, 10) || 0)}
                      className="fj-input text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="fj-label">Luggage Info</label>
                    <input
                      type="text"
                      value={luggageInfo}
                      onChange={(e) => setLuggageInfo(e.target.value)}
                      placeholder="e.g. 2 large suitcases"
                      className="fj-input text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* C. INTERCITY UAE FIELDS */}
            {rideCategory === 'intercity' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="fj-label">Select Intercity Route</label>
                  <select
                    value={intercityRoute}
                    onChange={(e) => setIntercityRoute(e.target.value)}
                    className="fj-select text-base"
                  >
                    <option value="dubai-abudhabi">Dubai ↔ Abu Dhabi / Al Ain</option>
                    <option value="dubai-sharjah">Dubai ↔ Sharjah</option>
                    <option value="dubai-ajman">Dubai ↔ Ajman / UAQ</option>
                    <option value="dubai-rak">Dubai ↔ Ras Al Khaimah / Fujairah</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="fj-label">Pickup Address *</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup address..."
                    className="fj-input text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="fj-label">Drop-off Address *</label>
                  <input
                    type="text"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="Enter destination address..."
                    className="fj-input text-base"
                    required
                  />
                </div>
              </div>
            )}

            {/* D. INTERNATIONAL FLIGHT RELOCATION FIELDS */}
            {rideCategory === 'international' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="fj-label">Origin Country & City *</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={originCountry}
                        onChange={(e) => setOriginCountry(e.target.value)}
                        placeholder="UAE"
                        className="fj-input text-base"
                        required
                      />
                      <input
                        type="text"
                        value={originCity}
                        onChange={(e) => setOriginCity(e.target.value)}
                        placeholder="Dubai"
                        className="fj-input text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="fj-label">Destination Country & City *</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={destCountry}
                        onChange={(e) => setDestCountry(e.target.value)}
                        placeholder="UK"
                        className="fj-input text-base"
                        required
                      />
                      <input
                        type="text"
                        value={destCity}
                        onChange={(e) => setDestCity(e.target.value)}
                        placeholder="London"
                        className="fj-input text-base"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DATE & TIME SELECTOR FOR ALL LOCAL RIDES */}
            {rideCategory !== 'international' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-teal-border">
                <div className="space-y-2">
                  <label className="fj-label flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-deep" />
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="fj-input text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="fj-label flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-deep" />
                    Pickup Time Slot *
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="fj-select text-base"
                  >
                    <option value="08:00">08:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="23:00">11:00 PM (Night Surcharge)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-teal-border">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-1/3 bg-slate-100 text-slate-700 font-extrabold font-heading py-4 rounded-2xl text-base"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleProceedToQuote}
                disabled={isCalculating}
                className="w-2/3 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4.5 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-lg transition-all transform active:scale-98"
              >
                {isCalculating ? (
                  <span>Calculating Driving Fare...</span>
                ) : (
                  <>
                    <span>Book Now →</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: Quote Breakdown & Customer / Pet Details */}
        {step === 2 && (
          <div className="space-y-10 animate-fade-in-up">
            
            {/* Live Quote Breakdown Card (Chauf-Fur Style) */}
            <div className="bg-gradient-to-br from-navy-dark via-navy to-[#063B60] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-xs text-teal-light font-black uppercase tracking-widest font-heading">
                  VAT-INCLUSIVE FARE ESTIMATE
                </div>
                <div className="bg-teal-bright/20 text-teal-light text-xs font-bold px-3 py-1 rounded-full border border-teal-bright/30">
                  UAE Compliant
                </div>
              </div>

              {rideCategory === 'international' ? (
                <div>
                  <div className="text-3xl font-black font-heading text-white">Custom Flight Quote</div>
                  <div className="text-base text-slate-300 mt-2">
                    Route: <span className="font-bold text-white">{originCity}, {originCountry}</span> → <span className="font-bold text-white">{destCity}, {destCountry}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight flex items-baseline gap-3">
                    <span>AED {calcResult?.totalFare || estimatedFare}</span>
                    <span className="text-sm text-slate-400 font-normal">(Incl. 5% UAE VAT)</span>
                  </div>
                  <div className="text-base text-slate-300 mt-3 font-medium">
                    Estimated Road Distance: <span className="font-bold text-white">{calcResult?.distanceKm || 0} km</span>
                  </div>

                  {calcResult && (
                    <div className="mt-6 pt-6 border-t border-white/15 text-sm space-y-3 text-slate-300">
                      <div className="flex justify-between">
                        <span>Base Fare (incl. first 5 km):</span>
                        <span className="font-semibold text-white">AED {calcResult.baseFare.toFixed(2)}</span>
                      </div>
                      {calcResult.billableKm > 0 && (
                        <div className="flex justify-between">
                          <span>Distance Charge ({calcResult.billableKm} km @ AED 4.5/km):</span>
                          <span className="font-semibold text-white">AED {calcResult.distanceCharge.toFixed(2)}</span>
                        </div>
                      )}
                      {calcResult.airportSurcharge > 0 && (
                        <div className="flex justify-between text-amber-300 font-medium">
                          <span>Airport Location Surcharge:</span>
                          <span>AED {calcResult.airportSurcharge.toFixed(2)}</span>
                        </div>
                      )}
                      {calcResult.roundTripDiscount > 0 && (
                        <div className="flex justify-between text-teal-bright font-bold">
                          <span>Round Trip Special Discount:</span>
                          <span>- AED {calcResult.roundTripDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 border-t border-white/15 font-black text-white text-base">
                        <span>UAE 5% VAT:</span>
                        <span>AED {calcResult.vatAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Customer & Pet Details Form */}
            <form onSubmit={handleFinalBooking} className="space-y-8">
              
              <div className="space-y-1 border-b border-teal-border pb-4">
                <h3 className="text-xl font-black font-heading text-navy">Your Contact Details</h3>
                <p className="text-sm text-slate-600 font-body">Required to confirm your booking and send driver dispatch notifications.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="fj-label">Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sarah Ahmed"
                    className="fj-input text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="fj-label">WhatsApp / Mobile *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="fj-input text-base"
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="fj-label">Email Address (optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="fj-input text-base"
                  />
                </div>
              </div>

              <div className="space-y-1 border-b border-teal-border pb-4 pt-4">
                <h3 className="text-xl font-black font-heading text-navy">🐾 Pet Details</h3>
                <p className="text-sm text-slate-600 font-body">So our handler can prepare the proper safety crate and matting.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="fj-label">Pet Name</label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Max"
                    className="fj-input text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="fj-label">Species</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="fj-select text-base"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="fj-label">Breed</label>
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="e.g. Golden Retriever"
                    className="fj-input text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="fj-label">Special Notes / Medical History</label>
                <textarea
                  rows={3}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Share any behavioral notes or vet appointment instructions..."
                  className="fj-input text-base"
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-teal-border">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-slate-100 text-slate-700 font-extrabold font-heading py-4 rounded-2xl text-base"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4.5 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-lg transition-all transform active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Confirming Booking...</span>
                  ) : (
                    <>
                      <MessageCircle className="w-6 h-6" />
                      <span>Confirm & Open WhatsApp Dispatch</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        )}

        {/* STEP 3: Booking Confirmation & WhatsApp Button */}
        {step === 3 && bookingConfirmed && (
          <div className="py-12 px-4 text-center space-y-8 animate-fade-in-up">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-14 h-14" />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-navy">Booking Request Confirmed!</h2>
              <p className="text-base text-slate-600 max-w-md mx-auto">
                Your reference ID has been generated:
              </p>
              <div className="inline-block bg-teal-soft text-teal-deep font-mono font-black text-3xl px-8 py-4 rounded-3xl border border-teal-border shadow-sm">
                {bookingConfirmed.referenceId}
              </div>
            </div>

            <div className="bg-teal-soft/80 p-8 rounded-3xl text-left max-w-lg mx-auto text-base space-y-4 text-slate-700 border border-teal-border">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-navy uppercase">{rideCategory}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-navy">{customerName} ({phone})</span>
              </div>
              <div className="flex justify-between font-medium border-t border-teal-border pt-3 text-lg font-extrabold">
                <span>Estimated Price:</span>
                <span className="text-teal-deep">AED {estimatedFare || 'Custom Quote'}</span>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <a
                href={bookingConfirmed.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-10 py-5 rounded-2xl shadow-xl text-lg transition-all transform active:scale-95"
              >
                <MessageCircle className="w-7 h-7" />
                <span>Confirm Instantly on WhatsApp</span>
              </a>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setBookingConfirmed(null);
                    setStep(0);
                  }}
                  className="text-base text-slate-500 hover:text-navy underline pt-2 font-medium"
                >
                  Book another ride
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
