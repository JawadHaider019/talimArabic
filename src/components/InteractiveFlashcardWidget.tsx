import React, { useState } from 'react';
import { Volume2, RotateCw, Check, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FLASHCARD_DRILLS, FlashcardWord } from '../data/curriculum';

interface FlashcardWidgetProps {
  isMobileView: boolean;
  onOpenFullQuiz: () => void;
}

export function InteractiveFlashcardWidget({
  isMobileView,
  onOpenFullQuiz,
}: FlashcardWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const card = FLASHCARD_DRILLS[currentIndex % FLASHCARD_DRILLS.length];

  const speakArabic = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ar-SA';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARD_DRILLS.length);
  };

  return (
    <div className="luxury-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[#FDF8EC] text-[#A07020] border border-[#DFB76C]/35 flex items-center justify-center shrink-0 shadow-xs">
            <Layers className="w-4 h-4 text-[#DFB76C]" />
          </span>
          <div>
            <h3 className="text-base font-bold text-[#07111E]">
              Interactive Flashcard Drill
            </h3>
            <p className="text-xs text-[#64748B] font-medium">
              Daily spaced repetition with audio articulation
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#0B192C] bg-[#F1F4F8] border border-[#E2E8F0] px-2.5 py-0.5 rounded-full tabular-nums">
          Card {currentIndex + 1} of {FLASHCARD_DRILLS.length}
        </span>
      </div>

      {/* Interactive Card Canvas */}
      <div className="my-3">
        <motion.div
          onClick={() => setIsFlipped((f) => !f)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="min-h-[175px] rounded-2xl p-6 cursor-pointer border transition-all flex flex-col justify-between relative overflow-hidden shadow-sm bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] border-[#DFB76C]/40 hover:border-[#DFB76C]"
        >
          {/* Subtle watermark */}
          <div className="absolute -bottom-6 -right-6 font-arabic text-7xl font-extrabold text-[#DFB76C]/10 select-none pointer-events-none">
            {card.arabic}
          </div>

          <div className="flex items-center justify-between text-xs text-[#A07020]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              {card.partOfSpeech}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white px-2 py-0.5 rounded-full border border-[#DFB76C]/30 shadow-2xs">
              <RotateCw className="w-3 h-3 text-[#A07020]" />
              <span>Tap to flip</span>
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!isFlipped ? (
              /* Front of Card: Arabic & Transliteration */
              <motion.div
                key="front"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-center my-3"
              >
                <p className="font-arabic text-4xl font-extrabold text-[#0B192C] leading-normal drop-shadow-sm">
                  {card.arabic}
                </p>
                <p className="text-xs font-semibold text-[#8B651B] mt-1 tracking-wide">
                  {card.transliteration}
                </p>
              </motion.div>
            ) : (
              /* Back of Card: English & Example Sentence */
              <motion.div
                key="back"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-center my-3"
              >
                <p className="text-xl font-extrabold text-[#0B192C]">
                  {card.english}
                </p>
                {card.plural && (
                  <p className="text-xs text-[#8B651B] font-arabic font-semibold mt-0.5">
                    جمع: {card.plural}
                  </p>
                )}
                <p className="text-xs text-[#475569] font-arabic font-bold mt-2 text-right dir-rtl">
                  &ldquo;{card.exampleArabic}&rdquo;
                </p>
                <p className="text-[11px] text-[#64748B] italic mt-0.5">
                  {card.exampleEnglish}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Card Bar: Audio + Mastery */}
          <div className="flex items-center justify-between pt-2 border-t border-[#DFB76C]/25 text-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                speakArabic(card.arabic);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-[#FDF8EC] text-[#0B192C] border border-[#DFB76C]/40 font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#DFB76C]" />
              <span>Pronounce</span>
            </button>

            <span className="text-[11px] font-bold text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full tabular-nums">
              {card.masteryPercent}% Mastery
            </span>
          </div>
        </motion.div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 min-h-[42px] rounded-xl bg-white hover:bg-[#F8FAFC] text-[#07111E] border border-[#E2E8F0] font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
        >
          <span>Next Card</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onOpenFullQuiz}
          className="min-h-[42px] px-4 rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] font-extrabold text-xs inline-flex items-center gap-1.5 shadow-sm shadow-[#DFB76C]/25 border border-[#FFF0C8]/40 transition-all cursor-pointer active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Launch Quiz</span>
        </button>
      </div>
    </div>
  );
}
