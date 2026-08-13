'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@globalpetcab.com');
  const [password, setPassword] = useState('Admin123!');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setErrorMsg(data.message || 'Invalid admin credentials');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Login server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-dark text-white flex items-center justify-center mx-auto shadow-md">
            <Car className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-dark">Global Pet Cab Admin Portal</h1>
          <p className="text-xs text-slate-500">Sign in to manage lead requests & pricing engine</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-dark hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md transition-all"
          >
            {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="text-[11px] text-center text-slate-400">
          Default seed credentials: <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded">admin@globalpetcab.com</code> / <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded">Admin123!</code>
        </div>

      </div>
    </div>
  );
}
