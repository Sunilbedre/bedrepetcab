'use client';

import React, { useState } from 'react';
import { Car, MapPin, Calendar, Clock, Dog, ArrowRightLeft, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, MessageCircle, Sparkles } from 'lucide-react';

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

export default function DubaiFareCalculator() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [tripType, setTripType] = useState<'one_way' | 'round_trip'>('one_way');
  const [petType, setPetType] = useState('Dog');
  const [numPets, setNumPets] = useState(1);
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState('10:00');

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [crateAvailable, setCrateAvailable] = useState('No');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<{
    referenceId: string;
    whatsappUrl: string;
  } | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup.trim() || !drop.trim()) {
      setErrorMsg('Please enter both pickup and drop locations in Dubai.');
      return;
    }
    setErrorMsg('');
    setIsCalculating(true);

    try {
      const res = await fetch('/api/taxi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropLocation: drop,
          tripType,
          numPets,
          pickupTime,
          travelDate,
        }),
      });

      if (!res.ok) throw new Error('Calculation error');

      const data = await res.json();
      setResult(data.fare);
      setShowBookingForm(true);
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not calculate fare. Please check locations.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your name and UAE phone number.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/taxi/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropLocation: drop,
          tripType,
          petType,
          numPets,
          travelDate,
          pickupTime,
          estimatedFare: result?.totalFare || 0,
          breakdownJson: JSON.stringify(result),
          customerName,
          phone,
          whatsapp: phone,
          email,
          petName,
          breed,
          crateAvailable,
          notes,
          distanceKm: result?.distanceKm || 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingConfirmed({
          referenceId: data.referenceId,
          whatsappUrl: data.whatsappUrl,
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error submitting booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="dubai-taxi-calculator" className="bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="bg-navy text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 bg-teal-bright/20 border border-teal-bright/30 rounded-2xl">
            <Car className="w-7 h-7 text-teal-light" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-bright/20 text-teal-light text-xs px-3 py-1 rounded-full font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Instant Distance Fare Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Dubai Pet Taxi — Calculate My Fare
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10 space-y-8">
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2 font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {bookingConfirmed ? (
          <div className="py-8 px-4 text-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black font-heading text-navy">Ride Request Confirmed!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your Dubai Pet Taxi booking reference ID is:
              </p>
              <div className="inline-block bg-teal-soft text-teal-deep font-mono font-black text-xl px-5 py-2.5 rounded-2xl border border-teal-border">
                {bookingConfirmed.referenceId}
              </div>
            </div>

            <div className="bg-teal-soft p-6 rounded-2xl text-left max-w-lg mx-auto text-sm space-y-3 text-slate-700 border border-teal-border">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Pickup Location:</span>
                <span className="font-bold text-navy">{pickup}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Dropoff Location:</span>
                <span className="font-bold text-navy">{drop}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Date & Time:</span>
                <span>{travelDate} at {pickupTime}</span>
              </div>
              <div className="flex justify-between font-medium border-t border-teal-border pt-3 text-base font-extrabold">
                <span>Estimated Fare:</span>
                <span className="text-teal-deep">AED {result?.totalFare}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={bookingConfirmed.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-2xl shadow-md text-base transition-all transform active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Confirm Instantly on WhatsApp
              </a>
              <button
                onClick={() => {
                  setBookingConfirmed(null);
                  setResult(null);
                  setShowBookingForm(false);
                }}
                className="block text-sm text-slate-500 hover:text-navy mx-auto underline pt-2"
              >
                Calculate another ride
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Calculator Form */
          <form onSubmit={handleCalculate} className="space-y-8">
            
            {/* Trip Type Selector Toggle */}
            <div className="flex items-center p-1.5 bg-teal-soft rounded-2xl max-w-sm border border-teal-border">
              <button
                type="button"
                onClick={() => setTripType('one_way')}
                className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all ${
                  tripType === 'one_way'
                    ? 'bg-white text-navy shadow-sm'
                    : 'text-slate-500 hover:text-navy'
                }`}
              >
                One Way Ride
              </button>
              <button
                type="button"
                onClick={() => setTripType('round_trip')}
                className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  tripType === 'round_trip'
                    ? 'bg-white text-navy shadow-sm'
                    : 'text-slate-500 hover:text-navy'
                }`}
              >
                <ArrowRightLeft className="w-4 h-4 text-teal-deep" />
                Round Trip (-10%)
              </button>
            </div>

            {/* Locations Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="fj-label flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Pickup Location in Dubai *
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Dubai Marina, Business Bay, Jumeirah..."
                  className="fj-input"
                  required
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-xs text-slate-400 font-medium py-0.5">Quick select:</span>
                  {['Dubai Marina', 'DXB Airport', 'Jumeirah', 'Palm Jumeirah'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setPickup(loc)}
                      className="text-xs bg-teal-soft hover:bg-slate-200 text-teal-deep font-bold px-2.5 py-1 rounded-full border border-teal-border transition-colors"
                    >
                      + {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drop Location */}
              <div className="space-y-2">
                <label className="fj-label flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  Dropoff Location in Dubai *
                </label>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="e.g. DXB Airport T3, Vet Clinic, Grooming..."
                  className="fj-input"
                  required
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-xs text-slate-400 font-medium py-0.5">Quick select:</span>
                  {['DXB Airport', 'Business Bay', 'Downtown Dubai', 'Dubai Hills'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setDrop(loc)}
                      className="text-xs bg-teal-soft hover:bg-slate-200 text-teal-deep font-bold px-2.5 py-1 rounded-full border border-teal-border transition-colors"
                    >
                      + {loc}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Travel Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="space-y-1.5">
                <label className="fj-label flex items-center gap-1">
                  <Dog className="w-4 h-4 text-teal-deep" />
                  Pet Type
                </label>
                <select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  className="fj-select"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Other">Other Pet</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="fj-label">Number of Pets</label>
                <select
                  value={numPets}
                  onChange={(e) => setNumPets(parseInt(e.target.value, 10))}
                  className="fj-select"
                >
                  <option value={1}>1 Pet</option>
                  <option value={2}>2 Pets (+AED 30)</option>
                  <option value={3}>3 Pets (+AED 60)</option>
                  <option value={4}>4+ Pets</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="fj-label flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-teal-deep" />
                  Travel Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="fj-input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="fj-label flex items-center gap-1">
                  <Clock className="w-4 h-4 text-teal-deep" />
                  Pickup Time
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

            {!result && (
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-base transition-all transform active:scale-98"
              >
                {isCalculating ? (
                  <span>Calculating Driving Route & Fare...</span>
                ) : (
                  <>
                    <span>Calculate Estimated Fare</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}

          </form>
        )}

        {/* Fare Result Breakdown & Booking Form */}
        {result && !bookingConfirmed && (
          <div className="space-y-8 pt-6 border-t border-slate-100 animate-fade-in-up">
            
            {/* Price Result Banner */}
            <div className="bg-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs sm:text-sm text-teal-light font-bold uppercase tracking-wider mb-1">
                    Estimated Road Distance: {result.distanceKm} km
                  </div>
                  <div className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white flex items-baseline gap-3">
                    <span>AED {result.totalFare}</span>
                    <span className="text-sm text-slate-400 font-normal">(Incl. 5% VAT)</span>
                  </div>
                  <div className="text-sm text-slate-300 mt-2">
                    Route: <span className="font-bold text-white">{pickup}</span> → <span className="font-bold text-white">{drop}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-light hover:text-white bg-white/10 px-4 py-2.5 rounded-2xl border border-white/15 transition-colors"
                >
                  <span>{showBreakdown ? 'Hide Breakdown' : 'View Fare Breakdown'}</span>
                  {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {showBreakdown && (
                <div className="mt-6 pt-5 border-t border-white/15 text-sm space-y-2.5 text-slate-300">
                  <div className="flex justify-between">
                    <span>Base Fare (incl. first {result.includedKm} km):</span>
                    <span>AED {result.baseFare.toFixed(2)}</span>
                  </div>
                  {result.billableKm > 0 && (
                    <div className="flex justify-between">
                      <span>Distance Charge ({result.billableKm} km @ AED 4.5/km):</span>
                      <span>AED {result.distanceCharge.toFixed(2)}</span>
                    </div>
                  )}
                  {result.additionalPetCharge > 0 && (
                    <div className="flex justify-between">
                      <span>Additional Pet Surcharge:</span>
                      <span>AED {result.additionalPetCharge.toFixed(2)}</span>
                    </div>
                  )}
                  {result.airportSurcharge > 0 && (
                    <div className="flex justify-between text-amber-300 font-medium">
                      <span>Airport Location Surcharge:</span>
                      <span>AED {result.airportSurcharge.toFixed(2)}</span>
                    </div>
                  )}
                  {result.roundTripDiscount > 0 && (
                    <div className="flex justify-between text-teal-bright font-bold">
                      <span>Round Trip Special Discount:</span>
                      <span>- AED {result.roundTripDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/15 font-bold text-white">
                    <span>UAE 5% VAT:</span>
                    <span>AED {result.vatAmount.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="mt-4 text-xs text-slate-400 italic">
                * Final fare may vary if route, waiting time or service requirements change.
              </div>
            </div>

            {/* Customer Booking Details Form */}
            {showBookingForm && (
              <form onSubmit={handleBookingSubmit} className="space-y-6 bg-teal-soft p-6 sm:p-8 rounded-3xl border border-teal-border">
                <h3 className="font-black font-heading text-navy text-lg border-b border-teal-border pb-3">
                  Complete Your Ride Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="fj-label">Your Full Name *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="fj-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="fj-label">UAE Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="fj-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="fj-label">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="fj-input"
                    />
                  </div>

                  <div>
                    <label className="fj-label">Pet Name & Breed</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Milo"
                        className="fj-input"
                      />
                      <input
                        type="text"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        placeholder="Golden Retriever"
                        className="fj-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="fj-label">Travel crate available?</label>
                    <select
                      value={crateAvailable}
                      onChange={(e) => setCrateAvailable(e.target.value)}
                      className="fj-select"
                    >
                      <option value="Yes">Yes, I have an approved crate/harness</option>
                      <option value="No">No, please supply a safe carrier/crate</option>
                    </select>
                  </div>

                  <div>
                    <label className="fj-label">Special Instructions / Notes</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Vet appointment at 10:30 AM"
                      className="fj-input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-base transition-all transform active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Registering Ride Request...</span>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      <span>Request Ride & Open WhatsApp Confirmation</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
