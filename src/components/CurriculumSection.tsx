import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  CircleDashed,
  ChevronRight,
  Lock,
  Volume2,
  LayoutGrid,
  Map,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CurriculumUnit } from '../data/curriculum';
import { CurriculumRoadmap } from './CurriculumRoadmap';

const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
function toEasternArabic(num: number): string {
  return String(num)
    .split('')
    .map((d) => EASTERN_ARABIC_DIGITS[parseInt(d, 10)] ?? d)
    .join('');
}

interface CurriculumSectionProps {
  isMobileView: boolean;
  units: CurriculumUnit[];
  activeBook: 1 | 2;
  activeUnitId: string;
  onChangeBook: (book: 1 | 2) => void;
  onSelectUnit: (unit: CurriculumUnit) => void;
  onOpenUpgradeForUnit: (unit: CurriculumUnit) => void;
  isEnrolledInFull?: boolean;
}

export function CurriculumSection({
  isMobileView,
  units,
  activeBook,
  activeUnitId,
  onChangeBook,
  onSelectUnit,
  onOpenUpgradeForUnit,
  isEnrolledInFull = false,
}: CurriculumSectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'roadmap'>('grid');
  const bookUnits = units.filter((u) => u.book === activeBook);
  const book1Passed = units.filter((u) => u.book === 1 && u.status === 'passed').length;
  const book2Passed = units.filter((u) => u.book === 2 && u.status === 'passed').length;

  const speakArabic = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ar-SA';
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    } catch {}
  };

  return (
    <section aria-label="Curriculum progress">
      {/* Section Header + Book 1 / Book 2 Segmented Tabs */}
      <div
        className={`flex gap-4 mb-5 ${
          isMobileView
            ? 'flex-col items-start'
            : 'items-end justify-between'
        }`}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold tracking-tight text-[#07111E]">
              Curriculum
            </h2>
            <span className="font-arabic text-xs font-semibold text-[#A07020] bg-[#FDF8EC] border border-[#DFB76C]/35 px-2 py-0.5 rounded-md">
              المَنْهَجُ الدِّرَاسِيُّ
            </span>
          </div>
          <p className="text-xs font-medium text-[#64748B] mt-1">
            Al-Arabiyyah Bayna Yadayk · 2 books, 16 units each
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* View Mode Switcher: Grid vs Learning Path */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#E8ECF2] border border-[#DCE3EC] shadow-inner text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`min-h-[34px] px-3 py-1 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-[#07111E] shadow-sm'
                  : 'text-[#5A6B82] hover:text-[#07111E]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('roadmap')}
              className={`min-h-[34px] px-3 py-1 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                viewMode === 'roadmap'
                  ? 'bg-gradient-to-r from-[#DFB76C] to-[#C59B4B] text-[#07111E] font-extrabold shadow-sm'
                  : 'text-[#5A6B82] hover:text-[#07111E]'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Learning Path 🗺️</span>
            </button>
          </div>

          {/* Book 1 / Book 2 Switcher with Sliding Pill */}
          <div
            role="tablist"
            aria-label="Select curriculum book"
            className={`inline-flex items-center p-1 rounded-xl bg-[#E8ECF2] border border-[#DCE3EC] shadow-inner ${
              isMobileView ? 'w-full' : ''
            }`}
          >
            {[
              { book: 1 as const, passed: book1Passed },
              { book: 2 as const, passed: book2Passed },
            ].map(({ book, passed }) => {
              const active = activeBook === book;
              return (
                <button
                  key={book}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onChangeBook(book)}
                  className={`relative min-h-[38px] px-4 py-1.5 rounded-lg text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isMobileView ? 'flex-1' : ''
                  } ${
                    active ? 'text-[#07111E]' : 'text-[#5A6B82] hover:text-[#07111E]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="curriculum-book-tab"
                      transition={{ type: 'spring', stiffness: 440, damping: 34 }}
                      className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    />
                  )}
                  <span className="relative z-10">
                    Book {book}{' '}
                    <span className="text-xs font-semibold opacity-75 ml-1 tabular-nums">
                      ({passed}/16)
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {viewMode === 'roadmap' ? (
        <CurriculumRoadmap
          units={units}
          activeBook={activeBook}
          activeUnitId={activeUnitId}
          onSelectUnit={onSelectUnit}
          onOpenUpgradeForUnit={onOpenUpgradeForUnit}
          isEnrolledInFull={isEnrolledInFull}
        />
      ) : (
        <AnimatePresence mode="wait">
        <motion.div
          key={`book-${activeBook}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`grid ${
            isMobileView
              ? 'grid-cols-1 gap-3'
              : 'grid-cols-2 lg:grid-cols-4 gap-4'
          }`}
        >
          {bookUnits.map((unit, idx) => {
            const isSelected = unit.id === activeUnitId;
            const isLocked = !isEnrolledInFull && (unit.book === 2 || unit.unitNumber > 3);
            const isFreePreview = unit.book === 1 && unit.unitNumber <= 3;

            const vocabPercent = Math.round(
              (unit.vocabCorrect / Math.max(1, unit.vocabTotal)) * 100
            );

            const statusMeta =
              unit.status === 'passed'
                ? {
                    label: 'Passed',
                    chipClass: 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]',
                    barClass: 'bg-[#059669]',
                    icon: (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                    ),
                  }
                : unit.status === 'needs_review'
                ? {
                    label: 'Needs review',
                    chipClass: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
                    barClass: 'bg-[#D97706]',
                    icon: (
                      <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                    ),
                  }
                : {
                    label: 'Not started',
                    chipClass: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
                    barClass: 'bg-[#CBD5E1]',
                    icon: (
                      <CircleDashed className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                    ),
                  };

            return (
              <motion.button
                key={unit.id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: Math.min(idx * 0.018, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.988 }}
                onClick={() => (isLocked ? onOpenUpgradeForUnit(unit) : onSelectUnit(unit))}
                className={`group text-left rounded-2xl border p-4 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] border-[#DFB76C] ring-2 ring-[#DFB76C]/30 shadow-lg shadow-[#DFB76C]/10'
                    : isLocked
                    ? 'bg-[#FAFBFD] border-[#E8ECF2] hover:border-[#DFB76C]/50 hover:shadow-md'
                    : 'bg-white border-[#E8ECF2] hover:border-[#DFB76C]/50 hover:shadow-md hover:shadow-[#0B192C]/5'
                }`}
              >
                {/* Top Row: Unit # + Status Chip */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-[#0B192C]/[0.04] text-[#A07020] font-arabic font-bold text-xs flex items-center justify-center shrink-0">
                      {toEasternArabic(unit.unitNumber)}
                    </span>
                    <span className="text-xs font-semibold text-[#64748B] tabular-nums">
                      Unit {unit.unitNumber}
                    </span>
                    {isFreePreview && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                        Free
                      </span>
                    )}
                  </div>

                  {isLocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-bold whitespace-nowrap bg-[#FDF8EC] text-[#92400E] border-[#DFB76C]/40 shadow-2xs">
                      <Lock className="w-3 h-3 text-[#A07020]" />
                      <span>Unlock</span>
                    </span>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold whitespace-nowrap ${statusMeta.chipClass}`}
                    >
                      {statusMeta.icon}
                      <span>{statusMeta.label}</span>
                    </span>
                  )}
                </div>

                {/* Unit Title (English + Arabic with Pronounce Button) */}
                <div className="mt-2.5 flex items-baseline justify-between gap-2">
                  <h3 className="text-[15px] font-bold text-[#07111E] leading-snug group-hover:text-[#A07020] transition-colors">
                    {unit.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="font-arabic text-sm font-bold text-[#A07020]">
                      {unit.arabicTitle}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakArabic(unit.arabicTitle);
                      }}
                      title={`Listen to ${unit.title}`}
                      className="opacity-60 hover:opacity-100 p-0.5 rounded hover:bg-[#FDF8EC] text-[#DFB76C] transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3 text-[#C59B4B]" />
                    </button>
                  </div>
                </div>

                {/* Metrics: Speaking Score + Vocab Progress Bar */}
                <div className="mt-4 pt-3 border-t border-[#F1F4F8] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">
                      Speaking:{' '}
                      <strong className="font-semibold text-[#0B192C] tabular-nums">
                        {unit.speakingScore !== null ? `${unit.speakingScore}%` : '—'}
                      </strong>
                    </span>
                    <span className="text-[#64748B] tabular-nums flex items-center gap-1">
                      <span>
                        Vocab {unit.vocabCorrect}/{unit.vocabTotal}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#EEF2F7] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${vocabPercent}%` }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${statusMeta.barClass}`}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
      )}
    </section>
  );
}
