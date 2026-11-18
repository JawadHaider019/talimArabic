import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  CircleDashed,
  Lock,
  Volume2,
  Trophy,
  Crown,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CurriculumUnit } from '../data/curriculum';

interface CurriculumRoadmapProps {
  units: CurriculumUnit[];
  activeBook: 1 | 2;
  activeUnitId: string;
  onSelectUnit: (unit: CurriculumUnit) => void;
  onOpenUpgradeForUnit: (unit: CurriculumUnit) => void;
  isEnrolledInFull?: boolean;
}

const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
function toEasternArabic(num: number): string {
  return String(num)
    .split('')
    .map((d) => EASTERN_ARABIC_DIGITS[parseInt(d, 10)] ?? d)
    .join('');
}

export function CurriculumRoadmap({
  units,
  activeBook,
  activeUnitId,
  onSelectUnit,
  onOpenUpgradeForUnit,
  isEnrolledInFull = false,
}: CurriculumRoadmapProps) {
  const bookUnits = units.filter((u) => u.book === activeBook);

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

  // Group units into 4 stages with checkpoint gates
  const stages = [
    {
      stageNum: 1,
      title: 'Foundation & Family',
      arabicTitle: 'التَّعَارُفُ وَالأُسْرَةُ',
      units: bookUnits.slice(0, 4),
      checkpointTitle: 'Milestone Gate 1: Everyday Foundations Certified',
    },
    {
      stageNum: 2,
      title: 'Living & Environment',
      arabicTitle: 'السَّكَنُ وَالحَيَاةُ اليَوْمِيَّةُ',
      units: bookUnits.slice(4, 8),
      checkpointTitle: 'Milestone Gate 2: Home & Daily Fluency Certified',
    },
    {
      stageNum: 3,
      title: 'Society, Food & Work',
      arabicTitle: 'الطَّعَامُ وَالشَّرَابُ وَالعَمَلُ',
      units: bookUnits.slice(8, 12),
      checkpointTitle: 'Milestone Gate 3: Conversational Exchange Certified',
    },
    {
      stageNum: 4,
      title: 'Travel, Health & Culture',
      arabicTitle: 'السَّفَرُ وَالصِّحَّةُ وَالثَّقَافَةُ',
      units: bookUnits.slice(12, 16),
      checkpointTitle: `Milestone Gate 4: Book ${activeBook} Fluency Graduation`,
    },
  ];

  return (
    <div className="luxury-card rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-white via-[#FCFDFE] to-[#F8FAFC]">
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(223,183,108,0.06),transparent_65%)] pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-12 relative z-10">
        {stages.map((stage, stageIdx) => {
          const isFinal = stageIdx === stages.length - 1;

          return (
            <div key={stage.stageNum} className="space-y-6">
              {/* Stage Header Banner */}
              <div className="flex items-center justify-between border-b border-[#E8ECF2] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0B192C] to-[#142A4A] text-[#DFB76C] font-bold text-xs flex items-center justify-center shadow-xs">
                    {stage.stageNum}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#07111E]">
                      Stage {stage.stageNum}: {stage.title}
                    </h3>
                    <p className="font-arabic text-xs font-semibold text-[#A07020]">
                      {stage.arabicTitle}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDF8EC] text-[#A07020] border border-[#DFB76C]/30">
                  4 Units
                </span>
              </div>

              {/* Units Winding Path */}
              <div className="space-y-4">
                {stage.units.map((unit, idx) => {
                  const isSelected = unit.id === activeUnitId;
                  const isLocked = !isEnrolledInFull && (unit.book === 2 || unit.unitNumber > 3);
                  const isPassed = unit.status === 'passed';
                  const isNeedsReview = unit.status === 'needs_review';

                  // Winding indentation calculation (creates serpentine zig-zag path)
                  const offsets = ['translate-x-0', 'translate-x-4 sm:translate-x-8', 'translate-x-0 sm:translate-x-12', 'translate-x-2 sm:translate-x-4'];
                  const offsetClass = offsets[idx % offsets.length];

                  return (
                    <div
                      key={unit.id}
                      className={`flex items-center transition-all ${offsetClass}`}
                    >
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          isLocked
                            ? onOpenUpgradeForUnit(unit)
                            : onSelectUnit(unit)
                        }
                        className={`w-full max-w-lg p-4 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all cursor-pointer shadow-xs ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#FFFDF9] via-[#FAF6EE] to-white border-[#DFB76C] ring-2 ring-[#DFB76C]/30 shadow-md shadow-[#DFB76C]/10'
                            : isLocked
                            ? 'bg-[#FAFBFD] border-[#E8ECF2] opacity-85 hover:opacity-100 hover:border-[#DFB76C]/40'
                            : 'bg-white border-[#E8ECF2] hover:border-[#DFB76C]/50 hover:shadow-md'
                        }`}
                      >
                        {/* Left: Medallion Node */}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-arabic text-xl font-bold shrink-0 shadow-sm border transition-all ${
                              isPassed
                                ? 'bg-gradient-to-br from-[#10B981] to-[#047857] text-white border-[#A7F3D0]'
                                : isNeedsReview
                                ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white border-[#FDE68A]'
                                : isLocked
                                ? 'bg-[#F1F5F9] text-[#94A3B8] border-[#E2E8F0]'
                                : 'bg-gradient-to-br from-[#0B192C] to-[#142A4A] text-[#DFB76C] border-[#DFB76C]/30'
                            }`}
                          >
                            {isLocked ? (
                              <Lock className="w-5 h-5 text-[#94A3B8]" />
                            ) : (
                              <span>{toEasternArabic(unit.unitNumber)}</span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#64748B] tabular-nums">
                                Unit {unit.unitNumber}
                              </span>
                              {isPassed && (
                                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                                  Passed · {unit.speakingScore}%
                                </span>
                              )}
                              {isNeedsReview && (
                                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                                  Review · {unit.speakingScore}%
                                </span>
                              )}
                            </div>

                            <p className="font-bold text-sm text-[#07111E] truncate group-hover:text-[#A07020] transition-colors mt-0.5">
                              {unit.title}
                            </p>
                          </div>
                        </div>

                        {/* Right: Arabic Script + Audio Button */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-arabic text-base font-bold text-[#A07020]">
                            {unit.arabicTitle}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakArabic(unit.arabicTitle);
                            }}
                            title={`Pronounce ${unit.title}`}
                            className="p-1 rounded-md hover:bg-[#FDF8EC] text-[#DFB76C] transition-colors cursor-pointer"
                          >
                            <Volume2 className="w-4 h-4 text-[#C59B4B]" />
                          </button>
                          <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
              </div>

              {/* Checkpoint Milestone Gate Node */}
              <div className="pt-2 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="w-full max-w-md p-3.5 rounded-2xl bg-gradient-to-r from-[#FDF8EC] via-[#FFFDF9] to-[#FDF8EC] border-2 border-dashed border-[#DFB76C]/60 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] text-[#07111E] flex items-center justify-center shrink-0 shadow-sm">
                      {isFinal ? (
                        <Crown className="w-5 h-5 text-[#07111E] stroke-[2.4]" />
                      ) : (
                        <Trophy className="w-5 h-5 text-[#07111E] stroke-[2.4]" />
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-extrabold text-[#07111E]">
                        {stage.checkpointTitle}
                      </p>
                      <p className="text-[11px] text-[#A07020] font-medium">
                        Complete all 4 units above with $\ge 40\%$ speaking score
                      </p>
                    </div>
                  </div>

                  <Sparkles className="w-4 h-4 text-[#DFB76C] shrink-0" />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
