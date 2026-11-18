import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, CircleDashed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CurriculumUnit } from '../data/curriculum';

interface UnitPickerModalProps {
  isOpen: boolean;
  isMobileView: boolean;
  units: CurriculumUnit[];
  activeUnitId: string;
  onSelect: (unit: CurriculumUnit) => void;
  onClose: () => void;
}

export function UnitPickerModal({
  isOpen,
  isMobileView,
  units,
  activeUnitId,
  onSelect,
  onClose,
}: UnitPickerModalProps) {
  const [bookTab, setBookTab] = useState<1 | 2>(1);
  const visibleUnits = units.filter((u) => u.book === bookTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="unit-picker-title"
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
            className={`bg-white w-full border border-[#DFB76C]/30 shadow-2xl overflow-hidden flex flex-col ${
              isMobileView
                ? 'rounded-t-3xl max-h-[82%]'
                : 'max-w-xl rounded-3xl max-h-[80vh]'
            }`}
          >
            <div className="px-5 py-4 border-b border-[#EEF2F6] flex items-center justify-between gap-3">
              <div>
                <h2
                  id="unit-picker-title"
                  className="text-base font-bold text-[#0B192C]"
                >
                  Choose a unit for your session
                </h2>
                <p className="text-xs text-[#64748B]">
                  Switch to any lesson across Books 1 &amp; 2
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close unit picker"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F3F5F8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 pt-3 pb-2">
              <div className="inline-flex w-full p-1 rounded-xl bg-[#EFF3F8]">
                {[1, 2].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBookTab(b as 1 | 2)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      bookTab === b
                        ? 'bg-white text-[#0B192C] shadow-sm'
                        : 'text-[#64748B] hover:text-[#0B192C]'
                    }`}
                  >
                    Book {b} (16 units)
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 py-3 overflow-y-auto space-y-2">
              {visibleUnits.map((u) => {
                const active = u.id === activeUnitId;
                return (
                  <motion.button
                    key={u.id}
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      onSelect(u);
                      onClose();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl border flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#F8FAFC] border-[#0B192C] ring-1 ring-[#0B192C]/15'
                        : 'bg-white border-[#E5E9F0] hover:border-[#B8C4D4]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#64748B] tabular-nums">
                          Unit {u.unitNumber}
                        </span>
                        <span className="text-sm font-bold text-[#0B192C] truncate">
                          {u.title}
                        </span>
                      </div>
                      <p className="font-arabic text-xs font-medium text-[#C8922B] text-left mt-0.5">
                        {u.arabicTitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {u.status === 'passed' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#059669] tabular-nums">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {u.speakingScore}%
                        </span>
                      )}
                      {u.status === 'needs_review' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D97706] tabular-nums">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {u.speakingScore}%
                        </span>
                      )}
                      {u.status === 'not_started' && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#94A3B8]">
                          <CircleDashed className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
