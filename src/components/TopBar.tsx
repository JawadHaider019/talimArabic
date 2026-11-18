import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  LogOut,
  RotateCcw,
  Compass,
  User,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TalimLogo } from './GeometricPattern';
import { STUDENT_PROFILE } from '../data/curriculum';

interface TopBarProps {
  isMobileView: boolean;
  studentEmail: string;
  onOpenOnboarding: () => void;
  onOpenUpgrade: () => void;
  onOpenPlacement: () => void;
  onResetDemo: () => void;
  onLogout: () => void;
}

export function TopBar({
  isMobileView,
  studentEmail,
  onOpenOnboarding,
  onOpenUpgrade,
  onOpenPlacement,
  onResetDemo,
  onLogout,
}: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  return (
    <header
      className={`relative z-30 w-full bg-white/90 backdrop-blur-md border-b border-[#E8ECF2] shadow-[0_1px_8px_rgba(11,25,44,0.03)] ${
        isMobileView ? 'px-4 py-3' : 'px-6 lg:px-8 py-3.5'
      }`}
    >
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: App Name / Logo */}
        <motion.a
          href="#top"
          onClick={(e) => e.preventDefault()}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] rounded-xl"
        >
          <TalimLogo size={isMobileView ? 34 : 38} />
          <div className="flex items-center gap-2.5">
            <span className="text-[18px] font-bold tracking-tight text-[#07111E]">
              TalimArabic
            </span>
            {!isMobileView && (
              <span className="font-arabic text-xs font-semibold text-[#A07020] bg-[#FDF8EC] border border-[#DFB76C]/40 px-2 py-0.5 rounded-md tracking-wide">
                تَعْلِيمُ العَرَبِيَّةِ
              </span>
            )}
          </div>
        </motion.a>

        {/* Right Conversion Actions & Account */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Free Placement CTA */}
          {!isMobileView && (
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenPlacement}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#DFB76C]/40 text-[#07111E] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#A07020]" />
              <span>Book Placement</span>
            </motion.button>
          )}

          {/* Primary Upgrade CTA */}
          <motion.button
            type="button"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenUpgrade}
            className="min-h-[38px] px-3.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] text-xs font-extrabold inline-flex items-center gap-1.5 shadow-sm shadow-[#DFB76C]/25 border border-[#FFF0C8]/40 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{isMobileView ? 'Upgrade' : 'Get Full Access'}</span>
          </motion.button>

          {/* Profile Avatar + Dropdown Menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-label="Account menu"
              className="flex items-center gap-2.5 min-h-[40px] pl-1 pr-2 sm:pr-2.5 py-1 rounded-full bg-white/60 hover:bg-[#F3F5F9] border border-[#E8ECF2] transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#DFB76C]/40 ring-offset-2 ring-offset-white bg-[#0B192C] flex items-center justify-center shrink-0">
                {!imgError ? (
                  <img
                    src={STUDENT_PROFILE.avatarUrl}
                    alt={STUDENT_PROFILE.fullName}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-white">YM</span>
                )}
              </div>
              {!isMobileView && (
                <span className="text-xs font-bold text-[#0B192C] whitespace-nowrap">
                  {STUDENT_PROFILE.firstName}
                </span>
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#5A6B82] transition-transform duration-200 ${
                  menuOpen ? 'rotate-180' : ''
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-2xl border border-[#E2E7EF] shadow-xl shadow-[#0B192C]/10 py-2 z-50"
                >
                  <div className="px-4 py-2.5 border-b border-[#EEF1F6]">
                    <p className="text-sm font-semibold text-[#0B192C]">
                      {STUDENT_PROFILE.fullName}
                    </p>
                    <p className="text-xs text-[#64748B] truncate mt-0.5">
                      {studentEmail}
                    </p>
                  </div>

                  <div className="py-1.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenUpgrade();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#A07020] bg-[#FFFDF9] hover:bg-[#FDF8EC] transition-colors text-left cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#DFB76C]" />
                      <span>Upgrade to VIP Masterclass</span>
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenPlacement();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#1E293B] hover:bg-[#F6F8FB] transition-colors text-left cursor-pointer font-medium"
                    >
                      <PhoneCall className="w-4 h-4 text-[#5A6B82]" />
                      <span>Book Free Placement Call</span>
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onOpenOnboarding();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#1E293B] hover:bg-[#F6F8FB] transition-colors text-left cursor-pointer font-medium"
                    >
                      <Compass className="w-4 h-4 text-[#5A6B82]" />
                      <span>Change starting unit</span>
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onResetDemo();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#1E293B] hover:bg-[#F6F8FB] transition-colors text-left cursor-pointer font-medium"
                    >
                      <RotateCcw className="w-4 h-4 text-[#5A6B82]" />
                      <span>Reset dashboard state</span>
                    </button>
                    <div className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#64748B]">
                      <User className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span>{STUDENT_PROFILE.planName}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-[#EEF1F6]">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

