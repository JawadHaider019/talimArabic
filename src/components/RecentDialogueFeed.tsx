import React, { useState } from 'react';
import { MessageSquare, Volume2, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { RECENT_FEEDBACK_SNIPPETS, SpokenSessionSnippet } from '../data/curriculum';

interface RecentDialogueFeedProps {
  isMobileView: boolean;
}

export function RecentDialogueFeed({ isMobileView }: RecentDialogueFeedProps) {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const speakText = (id: string, arabic: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      setActiveAudioId(id);
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(arabic);
      u.lang = 'ar-SA';
      u.rate = 0.9;
      u.onend = () => setActiveAudioId(null);
      u.onerror = () => setActiveAudioId(null);
      window.speechSynthesis.speak(u);
    } catch {
      setActiveAudioId(null);
    }
  };

  return (
    <div className="luxury-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[#FDF8EC] text-[#A07020] border border-[#DFB76C]/35 flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="w-4 h-4 text-[#DFB76C]" />
          </span>
          <div>
            <h3 className="text-base font-bold text-[#07111E]">
              Recent Spoken Feed &amp; Feedback
            </h3>
            <p className="text-xs text-[#64748B] font-medium">
              Live feedback from AI Tutor Aisha with phonetic &amp; grammar scoring
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-1 rounded-full tabular-nums">
          3 Recorded Turns
        </span>
      </div>

      {/* Snippets Stack */}
      <div className="space-y-3 my-2">
        {RECENT_FEEDBACK_SNIPPETS.map((item) => {
          const isPlaying = activeAudioId === item.id;
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -1 }}
              className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E8ECF2] hover:border-[#DFB76C]/40 transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2 text-xs mb-2">
                <span className="font-semibold text-[#64748B] text-[11px]">
                  {item.unitTitle} · <span className="text-[#94A3B8]">{item.date}</span>
                </span>
                <span className="font-bold text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0]/60 px-2 py-0.2 rounded-full tabular-nums text-[11px]">
                  {item.accuracyScore}% Fluency
                </span>
              </div>

              {/* Spoken Arabic dialogue */}
              <div className="flex items-start justify-between gap-3 bg-white p-2.5 rounded-lg border border-[#F1F4F8]">
                <p className="font-arabic text-base font-bold text-[#0B192C] leading-relaxed text-right flex-1">
                  &ldquo;{item.studentSpoken}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => speakText(item.id, item.studentSpoken)}
                  title="Listen to student recording"
                  className="p-1.5 rounded-md hover:bg-[#FDF8EC] text-[#DFB76C] transition-colors cursor-pointer shrink-0"
                >
                  <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#059669] animate-pulse' : 'text-[#DFB76C]'}`} />
                </button>
              </div>

              {/* Tutor feedback line */}
              <div className="mt-2.5 flex items-center gap-2 text-xs text-[#475569]">
                <Sparkles className="w-3.5 h-3.5 text-[#DFB76C] shrink-0" />
                <p className="text-[11px] leading-snug">
                  <strong className="text-[#07111E] font-semibold">Tutor Aisha:</strong> {item.tutorFeedback}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
