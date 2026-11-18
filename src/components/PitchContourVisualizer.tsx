import React, { useState } from 'react';
import { Volume2, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PitchContourProps {
  isMobileView: boolean;
}

export function PitchContourVisualizer({ isMobileView }: PitchContourProps) {
  const [isPlayingTutor, setIsPlayingTutor] = useState(false);
  const [isPlayingStudent, setIsPlayingStudent] = useState(false);

  const phraseArabic = 'أَسْكُنُ فِي شَقَّةٍ جَمِيلَةٍ';
  const phraseEnglish = 'I live in a beautiful apartment';

  const speakPhrase = (forWho: 'tutor' | 'student') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      if (forWho === 'tutor') setIsPlayingTutor(true);
      else setIsPlayingStudent(true);

      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(phraseArabic);
      u.lang = 'ar-SA';
      u.rate = forWho === 'tutor' ? 0.95 : 0.88;
      u.pitch = forWho === 'tutor' ? 1.05 : 0.98;

      u.onend = () => {
        setIsPlayingTutor(false);
        setIsPlayingStudent(false);
      };
      u.onerror = () => {
        setIsPlayingTutor(false);
        setIsPlayingStudent(false);
      };

      window.speechSynthesis.speak(u);
    } catch {
      setIsPlayingTutor(false);
      setIsPlayingStudent(false);
    }
  };

  return (
    <div className="luxury-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[#FDF8EC] text-[#A07020] border border-[#DFB76C]/35 flex items-center justify-center shrink-0 shadow-xs">
            <Activity className="w-4 h-4 text-[#DFB76C]" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#07111E]">
                Speech Pitch &amp; Intonation Contour
              </h3>
              <span className="font-arabic text-xs font-semibold text-[#A07020] bg-[#FDF8EC] border border-[#DFB76C]/40 px-2 py-0.5 rounded-md">
                نَبْرَةُ الصَّوْتِ
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">
              Phonetic acoustic matching: Student vs. Native Tutor Aisha
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-bold text-[#047857]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>94% Harmony Match</span>
        </div>
      </div>

      {/* Target Phrase Badge */}
      <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E8ECF2] flex items-center justify-between gap-3 text-xs mb-4">
        <div>
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
            Evaluated Phrase
          </span>
          <p className="font-arabic text-base font-bold text-[#0B192C] mt-0.5">
            {phraseArabic}
          </p>
          <span className="text-[11px] text-[#64748B]">{phraseEnglish}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => speakPhrase('tutor')}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#FDF8EC] text-[#A07020] border border-[#DFB76C]/40 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span>Target</span>
          </button>
          <button
            type="button"
            onClick={() => speakPhrase('student')}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0B192C] hover:bg-[#13243F] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span>You</span>
          </button>
        </div>
      </div>

      {/* Dual Waveform Graph Canvas */}
      <div className="my-2 p-4 rounded-xl bg-gradient-to-b from-[#0F2038] to-[#07111E] text-white border border-[#DFB76C]/25 shadow-md relative overflow-hidden">
        {/* Graph Legend */}
        <div className="flex items-center justify-between text-[11px] mb-3 border-b border-white/10 pb-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#DFB76C]">
              <span className="w-2.5 h-1 rounded-full bg-[#DFB76C]" />
              Tutor Target Pitch
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-[#34D399]">
              <span className="w-2.5 h-1 rounded-full bg-[#10B981]" />
              Your Voice Contour
            </span>
          </div>

          <span className="text-white/40 font-mono text-[10px]">
            Sampling: 44.1kHz · 1.8s
          </span>
        </div>

        {/* SVG Dual Waveforms */}
        <svg
          viewBox="0 0 480 100"
          className="w-full h-24 overflow-visible"
          aria-label="Pitch contour waveform comparison"
        >
          {/* Subtle Grid guides */}
          <line x1="0" y1="25" x2="480" y2="25" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="0" y1="50" x2="480" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="0" y1="75" x2="480" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* Tutor Golden Contour Wave */}
          <motion.path
            d="M 10 65 Q 60 18 120 45 T 240 32 T 360 58 T 470 28"
            fill="none"
            stroke="#DFB76C"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Student Emerald Contour Wave */}
          <motion.path
            d="M 10 68 Q 60 22 120 48 T 240 36 T 360 62 T 470 31"
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeDasharray="5 3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
          />

          {/* Phoneme Markers */}
          <circle cx="120" cy="45" r="4" fill="#DFB76C" />
          <text x="120" y="24" fill="#F5DEB3" fontSize="9" textAnchor="middle" fontFamily="IBM Plex Sans Arabic">
            شَقَّةٍ
          </text>

          <circle cx="240" cy="32" r="4" fill="#DFB76C" />
          <text x="240" y="16" fill="#F5DEB3" fontSize="9" textAnchor="middle" fontFamily="IBM Plex Sans Arabic">
            جَمِيلَةٍ
          </text>

          <circle cx="360" cy="58" r="4" fill="#DFB76C" />
        </svg>

        {/* Footer Metrics */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-[#CBD5E1]">
          <span>Phoneme Vowel Duration: <strong>96% match</strong></span>
          <span>Stress Syllables: <strong>Accurate (شَقْ-قَة)</strong></span>
        </div>
      </div>
    </div>
  );
}
