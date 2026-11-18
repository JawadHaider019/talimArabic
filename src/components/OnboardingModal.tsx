import React, { useState, useEffect } from 'react';
import { X, Compass, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CurriculumUnit } from '../data/curriculum';
import { TalimLogo } from './GeometricPattern';

interface OnboardingModalProps {
  isOpen: boolean;
  isMobileView: boolean;
  units: CurriculumUnit[];
  currentUnitId: string;
  onConfirm: (unitId: string) => void;
  onClose: () => void;
}

const QUICK_STARTS = [
  {
    id: 'b1-u1',
    badge: 'Complete beginner',
    title: 'Book 1, Unit 1 · Introductions',
    arabic: 'التَّحِيَّةُ وَالتَّعَارُفُ',
    desc: 'Start from the very first greetings and foundational phrases.',
  },
  {
    id: 'b1-u3',
    badge: 'Know the basics',
    title: 'Book 1, Unit 3 · The Home',
    arabic: 'البَيْتُ',
    desc: 'Jump straight into describing rooms, household items, and daily speech.',
  },
  {
    id: 'b2-u1',
    badge: 'Intermediate',
    title: 'Book 2, Unit 1 · Healthcare',
    arabic: 'العِنَايَةُ بِالصِّحَّةِ',
    desc: 'Skip Book 1 and practice extended Book 2 conversational topics.',
  },
];

export function OnboardingModal({
  isOpen,
  isMobileView,
  units,
  currentUnitId,
  onConfirm,
  onClose,
}: OnboardingModalProps) {
  const [selectedId, setSelectedId] = useState(currentUnitId);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(currentUnitId);
    }
  }, [isOpen, currentUnitId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className={`fixed inset-0 z-50 flex ${
            isMobileView ? 'items-end' : 'items-center justify-center p-4'
          } bg-[#07111E]/70 backdrop-blur-sm`}
        >
          <motion.div
            initial={
              isMobileView
                ? { y: 48, opacity: 0 }
                : { scale: 0.96, y: 12, opacity: 0 }
            }
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={
              isMobileView
                ? { y: 48, opacity: 0 }
                : { scale: 0.96, y: 12, opacity: 0 }
            }
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-white w-full border border-[#DFB76C]/30 shadow-2xl overflow-hidden ${
              isMobileView
                ? 'rounded-t-3xl max-h-[88%] flex flex-col'
                : 'max-w-lg rounded-3xl'
            }`}
          >
            {isMobileView && (
              <div className="pt-2.5 pb-1 flex justify-center">
                <span className="w-10 h-1.5 rounded-full bg-[#CBD5E1]" />
              </div>
            )}

            {/* Header */}
            <div className="px-6 pt-5 pb-4 border-b border-[#EEF2F6] flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <TalimLogo size={36} />
                <div>
                  <h2
                    id="onboarding-title"
                    className="text-lg font-bold text-[#0B192C]"
                  >
                    Select your starting unit
                  </h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Welcome to TalimArabic ·{' '}
                    <span className="font-arabic text-[#C8922B]">
                      أَهْلاً بِكَ فِي تَعْلِيم
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close onboarding"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F3F5F8] hover:text-[#0B192C] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 overflow-y-auto">
              <p className="text-sm text-[#475569] leading-relaxed">
                New here? Pick a recommended starting point based on your Arabic
                experience, or choose any unit from Books 1 &amp; 2.
              </p>

              {/* 3 Guided Presets */}
              <div className="space-y-2.5">
                {QUICK_STARTS.map((preset) => {
                  const active = selectedId === preset.id;
                  return (
                    <motion.button
                      key={preset.id}
                      type="button"
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedId(preset.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        active
                          ? 'bg-[#F8FAFC] border-[#0B192C] ring-1 ring-[#0B192C]/15'
                          : 'bg-white border-[#E5E9F0] hover:border-[#B8C4D4]'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold text-[#C8922B]">
                          {preset.badge}
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                          <span className="text-sm font-bold text-[#0B192C]">
                            {preset.title}
                          </span>
                          <span className="font-arabic text-xs font-medium text-[#64748B]">
                            {preset.arabic}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                          {preset.desc}
                        </p>
                      </div>

                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1 border transition-colors ${
                          active
                            ? 'bg-[#0B192C] border-[#0B192C] text-white'
                            : 'border-[#CBD5E1] bg-white'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[2.8]" />}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Direct Unit Dropdown */}
              <div className="pt-1">
                <label
                  htmlFor="onboarding-unit-select"
                  className="flex items-center gap-1.5 text-xs font-medium text-[#64748B] mb-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Or pick any specific unit</span>
                </label>
                <div className="relative">
                  <select
                    id="onboarding-unit-select"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full appearance-none min-h-[44px] pl-3.5 pr-9 rounded-xl bg-[#F8FAFC] border border-[#DCE3EC] text-sm font-medium text-[#0B192C] focus:outline-none focus:ring-2 focus:ring-[#0B192C] cursor-pointer"
                  >
                    <optgroup label="Book 1 — Beginner (16 Units)">
                      {units
                        .filter((u) => u.book === 1)
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            Book 1, Unit {u.unitNumber}: {u.title}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Book 2 — Intermediate (16 Units)">
                      {units
                        .filter((u) => u.book === 2)
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            Book 2, Unit {u.unitNumber}: {u.title}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                  <ChevronDown className="pointer-events-none w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#EEF2F6] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-4 text-sm font-medium text-[#64748B] hover:text-[#0B192C] cursor-pointer"
              >
                Skip for now
              </button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => onConfirm(selectedId)}
                className="min-h-[46px] px-6 rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] text-sm font-bold shadow-md shadow-[#DFB76C]/25 border border-[#FFF0C8]/40 transition-all cursor-pointer"
              >
                Set starting unit
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
