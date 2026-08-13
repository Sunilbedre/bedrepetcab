'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Car, Globe, Plane, MapPin, Calendar, Clock, Dog, Users, Luggage, 
  CheckCircle2, ArrowRight, ArrowLeft, MessageCircle, AlertCircle, Sparkles, Phone, Mail, ChevronRight, ShieldCheck, Heart
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
  // Wizard Active Step (0: Service Type, 1: Details & Date, 2: Quote & Customer, 3: Confirmation)
  const [step, setStep] = useState(0);

  // Step 0: Ride Type
  const [rideCategory, setRideCategory] = useState<'dubai' | 'airport' | 'intercity' | 'international'>('dubai');

  // Step 1: Locations & Ride Details
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDetail, setPickupDetail] = useState(''); // Building / Apt / Villa
  const [dropLocation, setDropLocation] = useState('');
  const [dropDetail, setDropDetail] = useState(''); // Building / Apt / Villa
  
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
    'Dubai Marina', 'DXB Airport T3', 'Downtown Dubai / Burj Khalifa', 
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
      setEstimatedFare(0); // Custom quote for international
      setStep(2);
      return;
    }

    // Dubai / Airport / Intercity Validation
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 font-body">
      
      {/* Top Header Card */}
      <div className="bg-navy text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8 border border-slate-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-deep text-white flex items-center justify-center font-bold shadow-md">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-black tracking-widest text-teal-light uppercase font-heading">
                GLOBAL PET CAB DUBAI
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white mt-0.5">
                Pet Transport & Relocation Booking
              </h1>
            </div>
          </div>

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-light hover:text-white border border-teal-light/30 px-3.5 py-2 rounded-xl bg-white/5 transition-colors"
          >
            <span>← Home</span>
          </Link>
        </div>
      </div>

      {/* Progress Dots Bar */}
      <div className="flex items-center justify-between gap-2 mb-8 px-2">
        {['1. Service', '2. Ride Details', '3. Quote & Info', '4. Confirmed'].map((label, idx) => {
          const isActive = step === idx;
          const isDone = step > idx;
          return (
            <div key={idx} className="flex-1 space-y-1.5 text-center">
              <div className={`h-2 rounded-full transition-all ${
                isActive ? 'bg-coral shadow-sm' : isDone ? 'bg-teal-deep' : 'bg-slate-200'
              }`} />
              <span className={`text-xs font-extrabold block transition-colors ${
                isActive ? 'text-navy font-black' : isDone ? 'text-teal-deep' : 'text-slate-400'
              }`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Form Card Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-fj-card border border-teal-border">

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2 font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 0: Select Service / Ride Type */}
        {step === 0 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-1">
              <h2 className="text-2xl font-black font-heading text-navy">Book Your Ride or Relocation</h2>
              <p className="text-sm text-slate-600 font-body">Select the type of pet transport service you need in Dubai or worldwide.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Option 1: Within Dubai */}
              <button
                type="button"
                onClick={() => setRideCategory('dubai')}
                className={`p-6 rounded-3xl border-2 text-left transition-all space-y-3 ${
                  rideCategory === 'dubai'
                    ? 'border-teal-deep bg-teal-soft/70 ring-4 ring-teal-deep/10 shadow-sm'
                    : 'border-teal-border hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center text-2xl border border-teal-border">
                  🏙️
                </div>
                <div>
                  <h3 className="font-black font-heading text-lg text-navy">Within Dubai</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-body mt-1">Vet visits, grooming salons, pet hotels, DXB airport.</p>
                </div>
              </button>

              {/* Option 2: Airport Transfer */}
              <button
                type="button"
                onClick={() => setRideCategory('airport')}
                className={`p-6 rounded-3xl border-2 text-left transition-all space-y-3 ${
                  rideCategory === 'airport'
                    ? 'border-teal-deep bg-teal-soft/70 ring-4 ring-teal-deep/10 shadow-sm'
                    : 'border-teal-border hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center text-2xl border border-teal-border">
                  ✈️
                </div>
                <div>
                  <h3 className="font-black font-heading text-lg text-navy">Airport Transfer</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-body mt-1">DXB Main, DWC Al Maktoum & Abu Dhabi AUH.</p>
                </div>
              </button>

              {/* Option 3: City to City UAE */}
              <button
                type="button"
                onClick={() => setRideCategory('intercity')}
                className={`p-6 rounded-3xl border-2 text-left transition-all space-y-3 ${
                  rideCategory === 'intercity'
                    ? 'border-teal-deep bg-teal-soft/70 ring-4 ring-teal-deep/10 shadow-sm'
                    : 'border-teal-border hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center text-2xl border border-teal-border">
                  🗺️
                </div>
                <div>
                  <h3 className="font-black font-heading text-lg text-navy">UAE Intercity</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-body mt-1">Dubai ↔ Abu Dhabi, Sharjah, Ajman, RAK.</p>
                </div>
              </button>

              {/* Option 4: International Flight Relocation */}
              <button
                type="button"
                onClick={() => setRideCategory('international')}
                className={`p-6 rounded-3xl border-2 text-left transition-all space-y-3 ${
                  rideCategory === 'international'
                    ? 'border-teal-deep bg-teal-soft/70 ring-4 ring-teal-deep/10 shadow-sm'
                    : 'border-teal-border hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-navy text-teal-light flex items-center justify-center text-2xl">
                  🌍
                </div>
                <div>
                  <h3 className="font-black font-heading text-lg text-navy">International Relocation</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-body mt-1">Dubai ↔ UK, India, USA, Canada, Australia.</p>
                </div>
              </button>

            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-base transition-all transform active:scale-98 mt-6"
            >
              <span>Continue to Ride Details</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 1: Ride & Location Details */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            
            <div className="space-y-1">
              <h2 className="text-2xl font-black font-heading text-navy">
                {rideCategory === 'dubai' ? 'Dubai City Ride Details' : rideCategory === 'airport' ? 'Airport Transfer Details' : rideCategory === 'intercity' ? 'Intercity UAE Details' : 'International Relocation Details'}
              </h2>
              <p className="text-sm text-slate-600 font-body">Provide your travel locations, date, and preferences.</p>
            </div>

            {/* A. WITHIN DUBAI FIELDS */}
            {rideCategory === 'dubai' && (
              <div className="space-y-4">
                
                {/* Pickup Location */}
                <div className="space-y-1.5">
                  <label className="fj-label">Pickup Location in Dubai *</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Start typing location (e.g. Dubai Marina, Business Bay)..."
                    className="fj-input"
                    required
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-xs text-slate-400 font-medium py-0.5">Quick select:</span>
                    {DUBAI_LOCATIONS.slice(0, 4).map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setPickupLocation(loc)}
                        className="text-xs bg-teal-soft text-teal-deep font-bold px-2.5 py-0.5 rounded-full border border-teal-border"
                      >
                        + {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">Building / Villa / Apt Number</label>
                  <input
                    type="text"
                    value={pickupDetail}
                    onChange={(e) => setPickupDetail(e.target.value)}
                    placeholder="e.g. Zenith A2 Tower, Apt 1405"
                    className="fj-input"
                  />
                </div>

                {/* Dropoff Location */}
                <div className="space-y-1.5">
                  <label className="fj-label">Drop-off Location in Dubai *</label>
                  <input
                    type="text"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="Start typing location (e.g. Vet Clinic, Grooming, DXB)..."
                    className="fj-input"
                    required
                  />
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-xs text-slate-400 font-medium py-0.5">Quick select:</span>
                    {DUBAI_LOCATIONS.slice(4, 8).map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setDropLocation(loc)}
                        className="text-xs bg-teal-soft text-teal-deep font-bold px-2.5 py-0.5 rounded-full border border-teal-border"
                      >
                        + {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">Building / Villa / Apt Number</label>
                  <input
                    type="text"
                    value={dropDetail}
                    onChange={(e) => setDropDetail(e.target.value)}
                    placeholder="e.g. Bahar 1, Apt 1701"
                    className="fj-input"
                  />
                </div>

                {/* Trip Type Toggle */}
                <div className="space-y-2">
                  <label className="fj-label">Trip Type</label>
                  <div className="flex gap-2 p-1.5 bg-teal-soft rounded-2xl border border-teal-border">
                    <button
                      type="button"
                      onClick={() => setTripType('ONE_WAY')}
                      className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
                        tripType === 'ONE_WAY' ? 'bg-white text-navy shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      One Way Ride
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType('TWO_WAY')}
                      className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
                        tripType === 'TWO_WAY' ? 'bg-white text-navy shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      Return Ride (+ 30 min waiting included)
                    </button>
                  </div>

                  {tripType === 'ONE_WAY' ? (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
                      ⏱ <strong>One-way waiting time:</strong> Driver waits free for first 5 mins. After that, AED 52.50 per 30 mins applies.
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-teal-soft border border-teal-border text-xs text-teal-deep space-y-1">
                      ⏱ <strong>Return trip includes 30 mins waiting time:</strong> Ideal for vet clinic & grooming drop-offs.
                    </div>
                  )}
                </div>

                {/* Accompanied Toggle */}
                <div className="space-y-2">
                  <label className="fj-label">Travelling with your pet?</label>
                  <div className="flex gap-2 p-1.5 bg-teal-soft rounded-2xl border border-teal-border">
                    <button
                      type="button"
                      onClick={() => setAccompanied('yes')}
                      className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
                        accompanied === 'yes' ? 'bg-white text-navy shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      ✅ Accompanied (Pet Parent rides free)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccompanied('no')}
                      className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
                        accompanied === 'no' ? 'bg-white text-navy shadow-sm' : 'text-slate-500'
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
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="fj-label">Select Airport</label>
                    <select
                      value={airportName}
                      onChange={(e) => setAirportName(e.target.value)}
                      className="fj-select"
                    >
                      <option value="DXB">Dubai International Airport — DXB (Main)</option>
                      <option value="DWC">Dubai World Central — DWC (Al Maktoum)</option>
                      <option value="AUH">Abu Dhabi International Airport — AUH</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="fj-label">Direction</label>
                    <select
                      value={airportDir}
                      onChange={(e) => setAirportDir(e.target.value as 'TO' | 'FROM')}
                      className="fj-select"
                    >
                      <option value="TO">To Airport (Drop-off)</option>
                      <option value="FROM">From Airport (Pick-up)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">Your Home / Hotel Address *</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. Marina Pinnacle Tower, Dubai Marina"
                    className="fj-input"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="fj-label">Travel Crate Size</label>
                    <select
                      value={crateSize}
                      onChange={(e) => setCrateSize(e.target.value)}
                      className="fj-select"
                    >
                      <option value="Small (S)">Small (S) — under 45cm</option>
                      <option value="Medium (M)">Medium (M) — 45–76cm</option>
                      <option value="Large (L)">Large (L) — 76–100cm</option>
                      <option value="XL">Extra Large (XL) — 100cm+</option>
                      <option value="Supply Needed">Supply Crate Needed</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="fj-label">Passengers</label>
                    <input
                      type="number"
                      min={0}
                      max={4}
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value, 10) || 0)}
                      className="fj-input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="fj-label">Luggage Info</label>
                    <input
                      type="text"
                      value={luggageInfo}
                      onChange={(e) => setLuggageInfo(e.target.value)}
                      placeholder="e.g. 2 large suitcases"
                      className="fj-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* C. INTERCITY UAE FIELDS */}
            {rideCategory === 'intercity' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="fj-label">Select Intercity Route</label>
                  <select
                    value={intercityRoute}
                    onChange={(e) => setIntercityRoute(e.target.value)}
                    className="fj-select"
                  >
                    <option value="dubai-abudhabi">Dubai ↔ Abu Dhabi / Al Ain</option>
                    <option value="dubai-sharjah">Dubai ↔ Sharjah</option>
                    <option value="dubai-ajman">Dubai ↔ Ajman / UAQ</option>
                    <option value="dubai-rak">Dubai ↔ Ras Al Khaimah / Fujairah</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">Pickup Address *</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup address..."
                    className="fj-input"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">Drop-off Address *</label>
                  <input
                    type="text"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="Enter destination address..."
                    className="fj-input"
                    required
                  />
                </div>
              </div>
            )}

            {/* D. INTERNATIONAL FLIGHT RELOCATION FIELDS */}
            {rideCategory === 'international' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="fj-label">Origin Country & City *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={originCountry}
                        onChange={(e) => setOriginCountry(e.target.value)}
                        placeholder="UAE"
                        className="fj-input"
                        required
                      />
                      <input
                        type="text"
                        value={originCity}
                        onChange={(e) => setOriginCity(e.target.value)}
                        placeholder="Dubai"
                        className="fj-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="fj-label">Destination Country & City *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={destCountry}
                        onChange={(e) => setDestCountry(e.target.value)}
                        placeholder="UK"
                        className="fj-input"
                        required
                      />
                      <input
                        type="text"
                        value={destCity}
                        onChange={(e) => setDestCity(e.target.value)}
                        placeholder="London"
                        className="fj-input"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DATE & TIME SELECTOR FOR ALL LOCAL RIDES */}
            {rideCategory !== 'international' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="fj-label flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-teal-deep" />
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="fj-input"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-deep" />
                    Pickup Time Slot *
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="fj-select"
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
            <div className="flex gap-4 pt-4 border-t border-teal-border">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="w-1/3 bg-slate-100 text-slate-700 font-extrabold font-heading py-4 rounded-2xl text-sm"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleProceedToQuote}
                disabled={isCalculating}
                className="w-2/3 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-base transition-all"
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
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Live Quote Breakdown Card (Chauf-Fur Style) */}
            <div className="bg-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
              <div className="text-xs text-teal-light font-bold uppercase tracking-wider">
                VAT-INCLUSIVE FARE ESTIMATE
              </div>

              {rideCategory === 'international' ? (
                <div>
                  <div className="text-2xl font-black font-heading text-white">Custom Flight Quote</div>
                  <div className="text-sm text-slate-300 mt-1">
                    Route: <span className="font-bold text-white">{originCity}, {originCountry}</span> → <span className="font-bold text-white">{destCity}, {destCountry}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight flex items-baseline gap-2">
                    <span>AED {calcResult?.totalFare || estimatedFare}</span>
                    <span className="text-xs text-slate-400 font-normal">(Incl. 5% UAE VAT)</span>
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Estimated Road Distance: <span className="font-bold text-white">{calcResult?.distanceKm || 0} km</span>
                  </div>

                  {calcResult && (
                    <div className="mt-4 pt-4 border-t border-white/15 text-xs sm:text-sm space-y-2 text-slate-300">
                      <div className="flex justify-between">
                        <span>Base Fare (incl. first 5 km):</span>
                        <span>AED {calcResult.baseFare.toFixed(2)}</span>
                      </div>
                      {calcResult.billableKm > 0 && (
                        <div className="flex justify-between">
                          <span>Distance Charge ({calcResult.billableKm} km @ AED 4.5/km):</span>
                          <span>AED {calcResult.distanceCharge.toFixed(2)}</span>
                        </div>
                      )}
                      {calcResult.airportSurcharge > 0 && (
                        <div className="flex justify-between text-amber-300 font-medium">
                          <span>Airport Surcharge:</span>
                          <span>AED {calcResult.airportSurcharge.toFixed(2)}</span>
                        </div>
                      )}
                      {calcResult.roundTripDiscount > 0 && (
                        <div className="flex justify-between text-teal-bright font-bold">
                          <span>Round Trip Special Discount:</span>
                          <span>- AED {calcResult.roundTripDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-white/15 font-bold text-white text-sm">
                        <span>UAE 5% VAT:</span>
                        <span>AED {calcResult.vatAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Customer & Pet Details Form */}
            <form onSubmit={handleFinalBooking} className="space-y-6">
              
              <div className="space-y-1 border-b border-teal-border pb-3">
                <h3 className="text-lg font-black font-heading text-navy">Your Contact Details</h3>
                <p className="text-xs text-slate-500">Required to confirm your booking and send updates</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="fj-label">Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sarah Ahmed"
                    className="fj-input"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">WhatsApp / Mobile *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="fj-input"
                    required
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="fj-label">Email Address (optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="fj-input"
                  />
                </div>
              </div>

              <div className="space-y-1 border-b border-teal-border pb-3 pt-2">
                <h3 className="text-lg font-black font-heading text-navy">🐾 Pet Details</h3>
                <p className="text-xs text-slate-500">So our driver & handler can prepare for your pet</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="fj-label">Pet Name</label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Max"
                    className="fj-input"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">Species</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="fj-select"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">Breed</label>
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="e.g. Golden Retriever"
                    className="fj-input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="fj-label">Special Notes / Medical History</label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Share any behavioral notes or vet appointment instructions..."
                  className="fj-input"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-teal-border">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-slate-100 text-slate-700 font-extrabold font-heading py-4 rounded-2xl text-sm"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-base transition-all transform active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Confirming Booking...</span>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
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
          <div className="py-8 px-4 text-center space-y-6 animate-fade-in-up">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading text-navy">Booking Request Confirmed!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your reference ID has been generated:
              </p>
              <div className="inline-block bg-teal-soft text-teal-deep font-mono font-black text-2xl px-6 py-3 rounded-2xl border border-teal-border shadow-sm">
                {bookingConfirmed.referenceId}
              </div>
            </div>

            <div className="bg-teal-soft p-6 rounded-3xl text-left max-w-md mx-auto text-sm space-y-3 text-slate-700 border border-teal-border">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-navy uppercase">{rideCategory}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-navy">{customerName} ({phone})</span>
              </div>
              <div className="flex justify-between font-medium border-t border-teal-border pt-2 text-base font-extrabold">
                <span>Estimated Price:</span>
                <span className="text-teal-deep">AED {estimatedFare || 'Custom Quote'}</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <a
                href={bookingConfirmed.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-9 py-4 rounded-2xl shadow-lg text-base transition-all transform active:scale-95"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Confirm Instantly on WhatsApp</span>
              </a>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setBookingConfirmed(null);
                    setStep(0);
                  }}
                  className="text-sm text-slate-500 hover:text-navy underline pt-2 font-medium"
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
