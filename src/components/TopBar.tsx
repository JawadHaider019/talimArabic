import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, RotateCcw, Compass, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TalimLogo } from './GeometricPattern';
import { STUDENT_PROFILE } from '../data/curriculum';

interface TopBarProps {
  isMobileView: boolean;
  studentEmail: string;
  onOpenOnboarding: () => void;
  onResetDemo: () => void;
  onLogout: () => void;
}

export function TopBar({
  isMobileView,
  studentEmail,
  onOpenOnboarding,
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

        {/* Right: Profile Avatar + Dropdown Menu (Log out inside) */}
        <div className="relative shrink-0" ref={menuRef}>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            aria-label="Account menu"
            className="flex items-center gap-3 min-h-[44px] pl-1.5 pr-3 py-1 rounded-full bg-white/60 hover:bg-[#F3F5F9] border border-[#E8ECF2] transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] cursor-pointer"
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
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#0B192C] whitespace-nowrap">
                  {STUDENT_PROFILE.fullName}
                </span>
                <span className="text-[11px] font-medium text-[#A07020] bg-[#FDF8EC] border border-[#DFB76C]/30 px-1.5 py-0.5 rounded">
                  Pro
                </span>
              </div>
            )}
            <ChevronDown
              className={`w-4 h-4 text-[#5A6B82] transition-transform duration-200 ${
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
                      onOpenOnboarding();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1E293B] hover:bg-[#F6F8FB] transition-colors text-left cursor-pointer"
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
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1E293B] hover:bg-[#F6F8FB] transition-colors text-left cursor-pointer"
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
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors text-left cursor-pointer"
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
    </header>
  );
}
