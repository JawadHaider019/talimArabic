import React from 'react';
import {
  X,
  Award,
  CheckCircle2,
  Sparkles,
  Volume2,
  TrendingUp,
  Download,
  Share2,
  Clock,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TalimLogo } from './GeometricPattern';

interface SessionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitTitle: string;
  arabicTitle: string;
  score: number;
  durationMinutes: number;
  wordsAcquired: number;
  isMobileView: boolean;
}

export function SessionReportModal({
  isOpen,
  onClose,
  unitTitle,
  arabicTitle,
  score,
  durationMinutes,
  wordsAcquired,
  isMobileView,
}: SessionReportModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-white rounded-3xl border border-[#DFB76C]/40 shadow-2xl overflow-hidden relative text-[#07111E]"
      >
        {/* Top Decorative Gold Foil Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#0F2038] via-[#0B192C] to-[#07111E] text-white flex items-center justify-between border-b border-[#DFB76C]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle,rgba(223,183,108,0.2),transparent_70%)] pointer-events-none" />

          <div className="flex items-center gap-3">
            <TalimLogo size={36} />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#DFB76C] block">
                Official AI Speaking Evaluation
              </span>
              <h2 id="report-modal-title" className="text-lg font-bold text-white">
                Session Performance Certificate
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Score Hero Card */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-white to-[#FDF8EC] border border-[#DFB76C]/40 shadow-sm text-center relative">
            <span className="font-arabic text-xs font-bold text-[#A07020] bg-white px-3 py-1 rounded-full border border-[#DFB76C]/30 inline-block mb-2 shadow-2xs">
              تَقْرِيرُ الأَدَاءِ الشَّفَهِيِّ
            </span>

            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-extrabold text-[#07111E] tabular-nums tracking-tight">
                {score}%
              </span>
              <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-full">
                {score >= 40 ? 'Passed & Certified' : 'Needs Review'}
              </span>
            </div>

            <p className="text-sm font-bold text-[#07111E] mt-2">
              {unitTitle} · <span className="font-arabic text-base text-[#A07020]">{arabicTitle}</span>
            </p>
            <p className="text-xs text-[#64748B] mt-1 font-medium">
              Evaluated on 18 Nov 2026 via TalimArabic Vapi Speech Engine
            </p>
          </div>

          {/* Breakdown 3 Metric Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-[#E8ECF2] text-center shadow-2xs">
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">
                Pronunciation
              </span>
              <p className="text-xl font-bold text-[#059669] mt-1 tabular-nums">
                {Math.min(98, score + 4)}%
              </p>
              <span className="text-[10px] text-[#059669] font-medium">A1.1 Level</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E8ECF2] text-center shadow-2xs">
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">
                Grammar Flow
              </span>
              <p className="text-xl font-bold text-[#0B192C] mt-1 tabular-nums">
                {Math.max(50, score - 2)}%
              </p>
              <span className="text-[10px] text-[#64748B] font-medium">Agreement ✓</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E8ECF2] text-center shadow-2xs">
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">
                Words Added
              </span>
              <p className="text-xl font-bold text-[#A07020] mt-1 tabular-nums">
                +{wordsAcquired}
              </p>
              <span className="text-[10px] text-[#A07020] font-medium">Vocab Memory</span>
            </div>
          </div>

          {/* AI Tutor Aisha's Evaluation Note */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <p className="text-xs font-bold text-[#07111E]">
                Official Feedback from Tutor Aisha Al-Husseini:
              </p>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed italic">
              &ldquo;Masha&rsquo;Allah Yusuf! You demonstrated strong vocal resonance when describing the rooms in the apartment. Your articulation of the pharyngeal letters (Ha &amp; Ayn) was clear and confident. Continue practicing the dual noun endings.&rdquo;
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] font-bold text-xs transition-all shadow-md shadow-[#DFB76C]/20 border border-[#FFF0C8]/40 cursor-pointer"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
