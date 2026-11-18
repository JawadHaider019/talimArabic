import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Volume2,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CurriculumUnit, VocabItem, getQuizForUnit } from '../data/curriculum';

interface VocabQuizModalProps {
  isOpen: boolean;
  isMobileView: boolean;
  unit: CurriculumUnit;
  onComplete: (unitId: string, correctCount: number) => void;
  onClose: () => void;
}

export function VocabQuizModal({
  isOpen,
  isMobileView,
  unit,
  onComplete,
  onClose,
}: VocabQuizModalProps) {
  const [queue, setQueue] = useState<VocabItem[]>([]);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctIds, setCorrectIds] = useState<Set<string>>(new Set());
  const [repeatedCount, setRepeatedCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQueue(getQuizForUnit(unit));
      setStep(0);
      setPicked(null);
      setCorrectIds(new Set());
      setRepeatedCount(0);
    }
  }, [isOpen, unit]);

  const isFinished = queue.length > 0 && step >= queue.length;
  const current =
    queue.length > 0 ? queue[Math.min(step, queue.length - 1)] : null;

  const speakArabic = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore if speech synthesis is unavailable
    }
  };

  const handleChoose = (opt: string) => {
    if (picked !== null || !current) return;
    setPicked(opt);
    if (opt === current.english) {
      setCorrectIds((prev) => new Set(prev).add(current.id));
    } else {
      setQueue((prev) => [...prev, current]);
      setRepeatedCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (step + 1 >= queue.length) {
      setStep(queue.length);
    } else {
      setStep((s) => s + 1);
      setPicked(null);
    }
  };

  const handleFinish = () => {
    onComplete(unit.id, correctIds.size);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quiz-modal-title"
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
              isMobileView ? 'rounded-t-3xl' : 'max-w-md rounded-3xl'
            }`}
          >
            <div className="px-6 py-4 border-b border-[#EEF2F6] flex items-center justify-between">
              <div>
                <h2
                  id="quiz-modal-title"
                  className="text-base font-bold text-[#0B192C]"
                >
                  Vocabulary Quiz · Unit {unit.unitNumber}
                </h2>
                <p className="text-xs text-[#64748B]">{unit.title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quiz"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F3F5F8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {!isFinished ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${current.id}-${step}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center justify-between text-xs text-[#64748B] mb-4 tabular-nums">
                      <span>
                        Card {step + 1} of {queue.length}
                      </span>
                      <span>Mastered: {correctIds.size}</span>
                    </div>

                    <div className="rounded-2xl bg-[#0B192C] text-white p-6 text-center relative">
                      <button
                        type="button"
                        onClick={() => speakArabic(current.arabic)}
                        aria-label="Hear Arabic pronunciation"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#E4B85C] cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <p className="font-arabic text-3xl font-bold text-white">
                        {current.arabic}
                      </p>
                      <p className="text-xs text-[#E4B85C] mt-2">
                        {current.transliteration}
                      </p>
                    </div>

                    <div className="mt-4 space-y-2.5">
                      {current.options.map((opt) => {
                        const isCorrect = opt === current.english;
                        const isSelected = picked === opt;
                        let btnStyle =
                          'bg-white border-[#E2E7EF] text-[#0B192C] hover:border-[#0B192C]';
                        if (picked !== null) {
                          if (isCorrect) {
                            btnStyle =
                              'bg-[#ECFDF5] border-[#059669] text-[#065F46] font-semibold';
                          } else if (isSelected) {
                            btnStyle =
                              'bg-[#FEF2F2] border-[#DC2626] text-[#991B1B]';
                          } else {
                            btnStyle =
                              'bg-[#F8FAFC] border-[#E2E7EF] text-[#94A3B8]';
                          }
                        }

                        return (
                          <motion.button
                            key={opt}
                            type="button"
                            whileTap={picked === null ? { scale: 0.985 } : undefined}
                            onClick={() => handleChoose(opt)}
                            className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {picked !== null && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                            )}
                            {picked !== null && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-[#DC2626]" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {picked !== null && picked !== current.english && (
                      <p className="mt-3 text-xs text-[#B45309] flex items-center gap-1.5">
                        <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          We’ll bring this word back again before you finish.
                        </span>
                      </p>
                    )}

                    {picked !== null && (
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={handleNext}
                        className="mt-4 w-full min-h-[46px] rounded-xl bg-[#C8922B] hover:bg-[#D6A038] text-[#0B192C] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>
                          {step + 1 >= queue.length
                            ? 'See results'
                            : 'Next word'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.24 }}
                  className="text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                    className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-[#0B192C] mt-3">
                    Quiz complete!
                  </h3>
                  <p className="text-sm text-[#64748B] mt-1 tabular-nums">
                    You mastered {correctIds.size} words in Unit {unit.unitNumber}
                    {repeatedCount > 0
                      ? ` (${repeatedCount} missed word${
                          repeatedCount > 1 ? 's' : ''
                        } reviewed again).`
                      : '.'}
                  </p>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFinish}
                    className="mt-6 w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] text-sm font-bold shadow-md shadow-[#DFB76C]/25 border border-[#FFF0C8]/40 transition-all cursor-pointer"
                  >
                    Save progress &amp; return
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
