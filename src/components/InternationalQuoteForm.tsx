'use client';

import React, { useState } from 'react';
import { Globe, Plane, Dog, CheckSquare, ShieldCheck, CheckCircle2, ArrowRight, MessageCircle, Phone, AlertCircle } from 'lucide-react';

const SERVICES_LIST = [
  'Doorstep Pickup in Origin City',
  'Veterinary Documentation & Health Certificate',
  'Export Permit Clearance',
  'Import Permit Clearance',
  'IATA-Certified Custom Travel Crate',
  'Approved Airline Freight / In-Cabin Booking',
  'Airport Ground Handling & Manifest Processing',
  'Customs Clearance at Destination',
  'Destination Delivery to New Home',
  'Complete Door-to-Door End-to-End Relocation',
];

export default function InternationalQuoteForm() {
  const [step, setStep] = useState(1);

  const [direction, setDirection] = useState<'from_dubai' | 'to_dubai'>('from_dubai');
  const [originCountry, setOriginCountry] = useState('United Arab Emirates');
  const [originCity, setOriginCity] = useState('Dubai');
  const [destCountry, setDestCountry] = useState('United Kingdom');
  const [destCity, setDestCity] = useState('London');
  const [travelDate, setTravelDate] = useState('');

  const [petType, setPetType] = useState('Dog');
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [weightKg, setWeightKg] = useState('');
  const [dimensions, setDimensions] = useState('');

  const [crateStatus, setCrateStatus] = useState('Not Sure');
  const [microchipStatus, setMicrochipStatus] = useState('Yes');
  const [vaccinationStatus, setVaccinationStatus] = useState('Yes');
  const [rabiesStatus, setRabiesStatus] = useState('Yes');

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Doorstep Pickup in Origin City',
    'Veterinary Documentation & Health Certificate',
    'Export Permit Clearance',
    'Import Permit Clearance',
    'IATA-Certified Custom Travel Crate',
    'Approved Airline Freight / In-Cabin Booking',
  ]);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please enter your name, phone number, and email.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/international/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          servicesJson: JSON.stringify(selectedServices),
          customerName,
          phone,
          whatsapp: phone,
          email,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedRef(data.referenceId);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to submit quote request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="international-quote-form" className="bg-white rounded-3xl shadow-fj-card border border-teal-border overflow-hidden">
      {/* Header Banner */}
      <div className="bg-navy text-white p-6 sm:p-8">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 bg-teal-bright/20 border border-teal-bright/30 rounded-2xl">
            <Globe className="w-7 h-7 text-teal-light" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-bright/20 text-teal-light text-xs px-3 py-1 rounded-full font-bold mb-1">
              <Plane className="w-3.5 h-3.5 text-amber-300" />
              Dubai ↔ Worldwide Relocation
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              International Pet Relocation — Request Expert Quote
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

        {submittedRef ? (
          <div className="py-8 px-4 text-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black font-heading text-navy">Quote Request Received!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Our relocation team will review the route regulations and prepare your customized proposal.
              </p>
              <div className="pt-2">
                <span className="text-sm text-slate-400 font-bold block">Your Reference ID:</span>
                <span className="inline-block bg-teal-soft text-teal-deep font-mono font-black text-xl px-5 py-2.5 rounded-2xl border border-teal-border mt-1">
                  {submittedRef}
                </span>
              </div>
            </div>

            <div className="bg-teal-soft p-6 rounded-2xl text-left max-w-lg mx-auto text-sm space-y-3 text-slate-700 border border-teal-border">
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Route:</span>
                <span className="font-bold text-navy">{originCity}, {originCountry} → {destCity}, {destCountry}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Pet:</span>
                <span className="font-bold text-navy">{petName || petType} ({breed || petType})</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-500">Tentative Date:</span>
                <span>{travelDate || 'Flexible'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/971501234567?text=Hello%20Global%20Pet%20Cab%20Dubai%2C%20I%20submitted%20relocation%20quote%20reference%20${submittedRef}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-heading px-8 py-4 rounded-2xl shadow-md text-base transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Continue on WhatsApp
              </a>

              <a
                href="tel:+971501234567"
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-dark text-white font-extrabold font-heading px-8 py-4 rounded-2xl text-base transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Relocation Team
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-teal-border pb-4">
              <div className="flex space-x-3 text-sm font-extrabold font-heading">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    step === 1 ? 'bg-teal-deep text-white shadow-sm' : 'bg-teal-soft text-slate-600 hover:text-navy'
                  }`}
                >
                  1. Route
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    step === 2 ? 'bg-teal-deep text-white shadow-sm' : 'bg-teal-soft text-slate-600 hover:text-navy'
                  }`}
                >
                  2. Pet & Services
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    step === 3 ? 'bg-teal-deep text-white shadow-sm' : 'bg-teal-soft text-slate-600 hover:text-navy'
                  }`}
                >
                  3. Contact Info
                </button>
              </div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="space-y-3">
                  <label className="fj-label">Relocation Direction</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setDirection('from_dubai');
                        setOriginCountry('United Arab Emirates');
                        setOriginCity('Dubai');
                        setDestCountry('United Kingdom');
                        setDestCity('London');
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        direction === 'from_dubai'
                          ? 'border-teal-deep bg-teal-soft text-navy font-bold ring-2 ring-teal-deep/20 shadow-sm'
                          : 'border-teal-border hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="font-extrabold font-heading text-base flex items-center gap-2">
                        <Plane className="w-5 h-5 text-teal-deep" />
                        Moving FROM Dubai / UAE
                      </div>
                      <div className="text-sm text-slate-500 mt-1 font-normal">Exporting pet to another country</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDirection('to_dubai');
                        setOriginCountry('India');
                        setOriginCity('Mumbai');
                        setDestCountry('United Arab Emirates');
                        setDestCity('Dubai');
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        direction === 'to_dubai'
                          ? 'border-teal-deep bg-teal-soft text-navy font-bold ring-2 ring-teal-deep/20 shadow-sm'
                          : 'border-teal-border hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className="font-extrabold font-heading text-base flex items-center gap-2">
                        <Plane className="w-5 h-5 text-teal-deep rotate-90" />
                        Moving INTO Dubai / UAE
                      </div>
                      <div className="text-sm text-slate-500 mt-1 font-normal">Importing pet into Dubai</div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="fj-label">Origin Country *</label>
                    <input
                      type="text"
                      value={originCountry}
                      onChange={(e) => setOriginCountry(e.target.value)}
                      className="fj-input"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="fj-label">Origin City *</label>
                    <input
                      type="text"
                      value={originCity}
                      onChange={(e) => setOriginCity(e.target.value)}
                      className="fj-input"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="fj-label">Destination Country *</label>
                    <input
                      type="text"
                      value={destCountry}
                      onChange={(e) => setDestCountry(e.target.value)}
                      className="fj-input"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="fj-label">Destination City *</label>
                    <input
                      type="text"
                      value={destCity}
                      onChange={(e) => setDestCity(e.target.value)}
                      className="fj-input"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="fj-label">Tentative Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="fj-input max-w-md"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-teal-deep hover:bg-teal-bright text-white font-extrabold font-heading py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 text-base transition-all"
                >
                  <span>Continue to Pet Details & Services</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="fj-label">Pet Type</label>
                    <select
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
                      className="fj-select"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="fj-label">Pet Name</label>
                    <input
                      type="text"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="e.g. Bruno"
                      className="fj-input"
                    />
                  </div>

                  <div>
                    <label className="fj-label">Breed</label>
                    <input
                      type="text"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      placeholder="e.g. Frenchie"
                      className="fj-input"
                    />
                  </div>

                  <div>
                    <label className="fj-label">Weight (kg)</label>
                    <input
                      type="text"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="e.g. 12 kg"
                      className="fj-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-teal-soft p-5 rounded-2xl border border-teal-border text-sm">
                  <div>
                    <label className="fj-label">Microchipped?</label>
                    <select
                      value={microchipStatus}
                      onChange={(e) => setMicrochipStatus(e.target.value)}
                      className="fj-select"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label className="fj-label">Vaccinations Up-to-date?</label>
                    <select
                      value={vaccinationStatus}
                      onChange={(e) => setVaccinationStatus(e.target.value)}
                      className="fj-select"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label className="fj-label">Rabies & Titer (RNATT)?</label>
                    <select
                      value={rabiesStatus}
                      onChange={(e) => setRabiesStatus(e.target.value)}
                      className="fj-select"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label className="fj-label">IATA Crate Status</label>
                    <select
                      value={crateStatus}
                      onChange={(e) => setCrateStatus(e.target.value)}
                      className="fj-select"
                    >
                      <option value="Yes">Yes, have Crate</option>
                      <option value="No">No (Supply needed)</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="fj-label">Select Services Required</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SERVICES_LIST.map((service) => {
                      const isChecked = selectedServices.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between text-left transition-all ${
                            isChecked
                              ? 'bg-teal-soft border-teal-deep text-teal-deep font-bold shadow-sm'
                              : 'bg-white border-teal-border text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span>{service}</span>
                          <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${isChecked ? 'bg-teal-deep border-teal-deep text-white' : 'border-slate-300'}`}>
                            {isChecked && <CheckSquare className="w-4 h-4" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-slate-100 text-slate-700 font-extrabold font-heading py-4 rounded-2xl text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 bg-teal-deep hover:bg-teal-bright text-white font-extrabold font-heading py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 text-base"
                  >
                    <span>Proceed to Contact Info</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="fj-label">Full Name *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="fj-input"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="fj-label">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 52 987 6543"
                      className="fj-input"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="fj-label">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcus@example.com"
                      className="fj-input"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="fj-label">Additional Requirements / Flight Preferences</label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share any special flight preferences, airline choices, or veterinary history..."
                      className="fj-input"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 bg-slate-100 text-slate-700 font-extrabold font-heading py-4 rounded-2xl text-sm"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 bg-coral hover:bg-coral-hover text-white font-extrabold font-heading py-4 rounded-2xl shadow-fj-coral flex items-center justify-center gap-2 text-base transition-all transform active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Preparing Quote...</span>
                    ) : (
                      <>
                        <Globe className="w-5 h-5" />
                        <span>Get My Pet Relocation Quote</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}
