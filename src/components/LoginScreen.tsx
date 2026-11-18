import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { TalimLogo, IslamicGeometricPattern } from './GeometricPattern';
import { STUDENT_PROFILE } from '../data/curriculum';

interface LoginScreenProps {
  onSignIn: (email: string, openOnboarding: boolean) => void;
}

export function LoginScreen({ onSignIn }: LoginScreenProps) {
  const [email, setEmail] = useState(STUDENT_PROFILE.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email.trim() || STUDENT_PROFILE.email, false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] relative overflow-hidden flex items-center justify-center p-4 selection:bg-[#DFB76C]/30">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 w-[500px] h-[500px] bg-gradient-to-b from-[#DFB76C]/15 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-t from-[#0B192C]/10 to-transparent rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md bg-white rounded-3xl border border-[#DFB76C]/30 shadow-2xl shadow-[#0B192C]/12 overflow-hidden relative z-10">
        {/* Top Navy Accent Banner */}
        <div className="relative bg-gradient-to-br from-[#0F2038] via-[#091424] to-[#040A13] text-white px-8 py-9 overflow-hidden border-b border-[#DFB76C]/30">
          <IslamicGeometricPattern className="absolute inset-0 opacity-80" />
          <div className="relative z-10 flex items-center gap-3.5">
            <TalimLogo size={44} />
            <div>
              <p className="font-arabic text-sm font-semibold text-[#DFB76C] text-left tracking-wide">
                تَعْلِيمُ العَرَبِيَّةِ
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight">TalimArabic</h1>
            </div>
          </div>
          <p className="relative z-10 text-xs text-[#CBD5E1] mt-4 leading-relaxed font-medium">
            Sign in to continue your spoken Arabic masterclass and curriculum progress.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-1.5"
            >
              Student email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl bg-[#F8FAFC] border border-[#DCE3EC] text-sm font-semibold text-[#07111E] focus:outline-none focus:ring-2 focus:ring-[#DFB76C] hover:border-[#DFB76C]/50 transition-all"
              placeholder="m@m.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[50px] rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] text-sm font-bold shadow-lg shadow-[#DFB76C]/25 border border-[#FFF0C8]/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Sign in to dashboard</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="pt-2 border-t border-[#EEF2F6]">
            <button
              type="button"
              onClick={() => onSignIn(email.trim() || STUDENT_PROFILE.email, true)}
              className="w-full min-h-[44px] rounded-xl bg-[#F8FAFC] hover:bg-[#EEF2F7] text-[#07111E] text-xs font-semibold flex items-center justify-center gap-2 border border-[#E2E8F0] transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#A07020]" />
              <span>New student? Start with onboarding</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
