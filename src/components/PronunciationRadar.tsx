import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ARABIC_PHONEMES, PhonemeMastery } from '../data/curriculum';

interface PronunciationRadarProps {
  isMobileView: boolean;
  onOpenPracticeLetter?: (letter: string) => void;
}

export function PronunciationRadar({
  isMobileView,
  onOpenPracticeLetter,
}: PronunciationRadarProps) {
  const [selectedPhoneme, setSelectedPhoneme] = useState<PhonemeMastery>(
    ARABIC_PHONEMES[0]
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const speakSound = (letter: string, word: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      setIsPlayingAudio(true);
      window.speechSynthesis.cancel();
      const u1 = new SpeechSynthesisUtterance(letter);
      u1.lang = 'ar-SA';
      u1.rate = 0.85;

      const u2 = new SpeechSynthesisUtterance(word);
      u2.lang = 'ar-SA';
      u2.rate = 0.9;

      u2.onend = () => setIsPlayingAudio(false);
      u2.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(u1);
      window.speechSynthesis.speak(u2);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const averageAccuracy = Math.round(
    ARABIC_PHONEMES.reduce((acc, p) => acc + p.accuracy, 0) /
      ARABIC_PHONEMES.length
  );

  return (
    <div className="luxury-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle,rgba(223,183,108,0.1),transparent_70%)] pointer-events-none" />

      <div>
        {/* Header Strip */}
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B192C] to-[#142A4A] text-[#DFB76C] flex items-center justify-center font-arabic text-xl font-bold shadow-md shadow-[#0B192C]/10 border border-[#DFB76C]/30 shrink-0">
              ض
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#07111E]">
                  Arabic Phonetics &amp; Articulation
                </h3>
                <span className="font-arabic text-xs font-semibold text-[#A07020] bg-[#FDF8EC] border border-[#DFB76C]/40 px-2 py-0.5 rounded-md">
                  مَخَارِجُ الحُرُوفِ
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-medium mt-0.5">
                AI voice evaluation for guttural &amp; emphatic Arabic letters
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-bold text-[#047857]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>{averageAccuracy}% Overall Accuracy</span>
          </div>
        </div>

        {/* 8-Letter Interactive Strip */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 my-4">
          {ARABIC_PHONEMES.map((p) => {
            const isSelected = p.letter === selectedPhoneme.letter;
            const isMastered = p.status === 'mastered';
            const isNeedsWork = p.status === 'needs_work';

            return (
              <motion.button
                key={p.letter}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setSelectedPhoneme(p);
                  speakSound(p.letter, p.sampleWord);
                  onOpenPracticeLetter?.(p.letter);
                }}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer text-center relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#0F2038] to-[#07111E] text-white border-[#DFB76C] shadow-lg shadow-[#0B192C]/20 ring-2 ring-[#DFB76C]/40'
                    : 'bg-[#F8FAFC] hover:bg-white text-[#07111E] border-[#E8ECF2] hover:border-[#DFB76C]/60 hover:shadow-xs'
                }`}
              >
                <span className="font-arabic text-2xl font-bold leading-none mt-1">
                  {p.letter}
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    isSelected ? 'text-[#DFB76C]' : 'text-[#64748B]'
                  }`}
                >
                  {p.name}
                </span>
                <span
                  className={`text-[10px] font-bold tabular-nums px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white/10 text-white'
                      : isMastered
                      ? 'bg-[#ECFDF5] text-[#047857]'
                      : isNeedsWork
                      ? 'bg-[#FEF2F2] text-[#B91C1C]'
                      : 'bg-[#FFFBEB] text-[#B45309]'
                  }`}
                >
                  {p.accuracy}%
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Phoneme Deep-Dive Pill */}
      <div className="mt-3 pt-3.5 border-t border-[#F1F4F8] flex items-center justify-between gap-4 flex-wrap bg-[#FDF8EC]/40 rounded-xl p-3 border border-[#DFB76C]/25">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] text-[#07111E] font-arabic text-2xl font-extrabold flex items-center justify-center shrink-0 shadow-sm border border-white/50">
            {selectedPhoneme.letter}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#07111E]">
                Letter {selectedPhoneme.name} ({selectedPhoneme.transliteration})
              </span>
              <span className="text-xs text-[#A07020] font-semibold bg-white px-2 py-0.5 rounded-md border border-[#DFB76C]/30">
                Word: {selectedPhoneme.sampleWord} ({selectedPhoneme.sampleWordEnglish})
              </span>
            </div>
            <p className="text-xs text-[#5A6B82] mt-0.5 font-medium">
              Native sound evaluation: Your throat resonance is <strong>{selectedPhoneme.accuracy}% aligned</strong> with classical Fusha pronunciation.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => speakSound(selectedPhoneme.letter, selectedPhoneme.sampleWord)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B192C] hover:bg-[#13243F] text-white text-xs font-bold transition-all shadow-md shadow-[#0B192C]/10 border border-white/10 cursor-pointer active:scale-95 whitespace-nowrap"
        >
          <Volume2 className="w-4 h-4 text-[#DFB76C]" />
          <span>{isPlayingAudio ? 'Pronouncing...' : 'Pronounce Letter & Word'}</span>
        </button>
      </div>
    </div>
  );
}
