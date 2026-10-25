'use client';

import React, { useState, useEffect } from 'react';
import { Car, Globe, Settings, RefreshCw, CheckCircle2, AlertCircle, Save, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'taxi' | 'international' | 'pricing'>('taxi');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Data states
  const [taxiRequests, setTaxiRequests] = useState<any[]>([]);
  const [intlRequests, setIntlRequests] = useState<any[]>([]);
  const [pricing, setPricing] = useState({
    baseFare: 60,
    includedKm: 5,
    perKmRate: 4.5,
    minimumFare: 80,
    additionalPetCharge: 30,
    roundTripMultiplier: 1.8,
    airportSurcharge: 35,
    nightSurcharge: 25,
    vatEnabled: true,
    vatPercentage: 5,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Fetch enquiries
      const enqRes = await fetch('/api/admin/enquiries');
      const enqData = await enqRes.json();
      if (enqData.success) {
        setTaxiRequests(enqData.taxiRequests || []);
        setIntlRequests(enqData.intlRequests || []);
      }

      // Fetch pricing
      const priceRes = await fetch('/api/admin/pricing');
      const priceData = await priceRes.json();
      if (priceData.success && priceData.settings) {
        setPricing(priceData.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (type: 'taxi' | 'international', id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Status updated to "${newStatus}"`);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricing),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Pricing rules saved successfully! Future taxi estimates will use these rates.');
      } else {
        setMessage('Error saving pricing rules');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating settings');
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Dashboard Header */}
        <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="text-xs text-brand-400 font-bold uppercase tracking-wider">GLOBAL PET CAB DUBAI</div>
            <h1 className="text-2xl sm:text-3xl font-black">Management Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/10"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>

            <button
              onClick={() => router.push('/admin/login')}
              className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1.5 border border-rose-400/30"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {message && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{message}</span>
          </div>
        )}

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs text-slate-500 font-bold">Total Taxi Bookings</div>
            <div className="text-2xl font-black text-brand-dark">{taxiRequests.length}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs text-slate-500 font-bold">International Quotes</div>
            <div className="text-2xl font-black text-brand-dark">{intlRequests.length}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs text-slate-500 font-bold">Base Taxi Fare (AED)</div>
            <div className="text-2xl font-black text-emerald-600">AED {pricing.baseFare}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs text-slate-500 font-bold">Rate Per KM (AED)</div>
            <div className="text-2xl font-black text-brand-600">AED {pricing.perKmRate}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 space-x-4">
          <button
            onClick={() => setActiveTab('taxi')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'taxi'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Car className="w-4 h-4" />
            Dubai Taxi Enquiries ({taxiRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('international')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'international'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            International Relocation ({intlRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'pricing'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            Dynamic Pricing Engine Settings
          </button>
        </div>

        {/* TAB 1: DUBAI TAXI REQUESTS TABLE */}
        {activeTab === 'taxi' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
              Recent Dubai Pet Taxi Ride Requests
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Route (Pickup → Drop)</th>
                    <th className="p-3">Distance & Fare</th>
                    <th className="p-3">Travel Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {taxiRequests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-slate-400">No taxi requests found.</td>
                    </tr>
                  ) : (
                    taxiRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-brand-700">{req.referenceId}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{req.customerName}</div>
                          <div className="text-slate-500">{req.phone}</div>
                        </td>
                        <td className="p-3 max-w-xs truncate">
                          <div className="text-emerald-700 font-semibold">{req.pickupLocation}</div>
                          <div className="text-rose-700 font-semibold">↓ {req.dropLocation}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">AED {req.estimatedFare}</div>
                          <div className="text-slate-400">{req.distanceKm} km ({req.tripType})</div>
                        </td>
                        <td className="p-3 text-slate-700">{req.travelDate} at {req.pickupTime}</td>
                        <td className="p-3">
                          <select
                            value={req.status}
                            onChange={(e) => handleUpdateStatus('taxi', req.id, e.target.value)}
                            className="px-2 py-1 rounded-lg border border-slate-200 bg-white font-semibold text-[11px]"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Driver Assigned">Driver Assigned</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INTERNATIONAL RELOCATION REQUESTS TABLE */}
        {activeTab === 'international' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
              International Relocation Quote Requests
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Route</th>
                    <th className="p-3">Pet Info</th>
                    <th className="p-3">Travel Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {intlRequests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-slate-400">No international quote requests found.</td>
                    </tr>
                  ) : (
                    intlRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-brand-dark">{req.referenceId}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{req.customerName}</div>
                          <div className="text-slate-500">{req.email}</div>
                          <div className="text-slate-500">{req.phone}</div>
                        </td>
                        <td className="p-3 font-semibold text-slate-800">
                          {req.originCity}, {req.originCountry} → {req.destCity}, {req.destCountry}
                        </td>
                        <td className="p-3">
                          <div className="font-bold">{req.petName} ({req.petType})</div>
                          <div className="text-slate-400">{req.breed || 'Standard'} • {req.weightKg || 'N/A'}</div>
                        </td>
                        <td className="p-3 text-slate-700">{req.travelDate || 'Flexible'}</td>
                        <td className="p-3">
                          <select
                            value={req.status}
                            onChange={(e) => handleUpdateStatus('international', req.id, e.target.value)}
                            className="px-2 py-1 rounded-lg border border-slate-200 bg-white font-semibold text-[11px]"
                          >
                            <option value="New">New</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Quote Preparing">Quote Preparing</option>
                            <option value="Quote Sent">Quote Sent</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DYNAMIC PRICING ENGINE SETTINGS */}
        {activeTab === 'pricing' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 max-w-4xl">
            <div>
              <h2 className="text-xl font-extrabold text-brand-dark">Dubai Pet Taxi Pricing Settings</h2>
              <p className="text-xs text-slate-500">
                All pricing changes take effect immediately for new fare calculations without editing code.
              </p>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-6 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Base Fare (AED)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pricing.baseFare}
                    onChange={(e) => setPricing({ ...pricing, baseFare: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Included Distance (KM)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pricing.includedKm}
                    onChange={(e) => setPricing({ ...pricing, includedKm: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Rate Per Additional KM (AED)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={pricing.perKmRate}
                    onChange={(e) => setPricing({ ...pricing, perKmRate: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Minimum Trip Fare (AED)</label>
                  <input
                    type="number"
                    step="1"
                    value={pricing.minimumFare}
                    onChange={(e) => setPricing({ ...pricing, minimumFare: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Additional Pet Charge (AED)</label>
                  <input
                    type="number"
                    step="1"
                    value={pricing.additionalPetCharge}
                    onChange={(e) => setPricing({ ...pricing, additionalPetCharge: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Round Trip Multiplier (e.g. 1.8)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={pricing.roundTripMultiplier}
                    onChange={(e) => setPricing({ ...pricing, roundTripMultiplier: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Airport Surcharge (AED)</label>
                  <input
                    type="number"
                    step="1"
                    value={pricing.airportSurcharge}
                    onChange={(e) => setPricing({ ...pricing, airportSurcharge: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Night Surcharge 10PM-6AM (AED)</label>
                  <input
                    type="number"
                    step="1"
                    value={pricing.nightSurcharge}
                    onChange={(e) => setPricing({ ...pricing, nightSurcharge: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">UAE VAT Percentage (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={pricing.vatPercentage}
                    onChange={(e) => setPricing({ ...pricing, vatPercentage: parseFloat(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-600 text-white font-extrabold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 text-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Dynamic Pricing Settings
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
