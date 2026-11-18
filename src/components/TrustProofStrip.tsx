import React from 'react';
import { Star, ShieldCheck, GraduationCap, PhoneCall, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TrustProofStripProps {
  onOpenPlacement: () => void;
  onOpenUpgrade: () => void;
  isMobileView: boolean;
}

export function TrustProofStrip({
  onOpenPlacement,
  onOpenUpgrade,
  isMobileView,
}: TrustProofStripProps) {
  return (
    <motion.section
      aria-label="Trust, accreditation, and student outcomes"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="luxury-card rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-white via-[#FCFDFE] to-[#FAF8F5] border border-[#DFB76C]/30 relative overflow-hidden shadow-xs"
    >
      {/* Subtle gold ambient watermark */}
      <div className="absolute top-0 right-0 w-64 h-full bg-[radial-gradient(circle_at_right,rgba(223,183,108,0.08),transparent_70%)] pointer-events-none" />

      <div
        className={`flex ${
          isMobileView
            ? 'flex-col gap-4'
            : 'items-center justify-between gap-6'
        }`}
      >
        {/* Left: Authority & Proof Points */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Star Rating Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-[#DFB76C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-extrabold text-[#07111E]">4.9/5</span>{' '}
              <span className="text-[#64748B] font-medium">(1,420+ graduates)</span>
            </div>
          </div>

          <span aria-hidden="true" className="hidden sm:inline text-[#DFB76C]/40">·</span>

          {/* Curriculum Authority Badge */}
          <div className="flex items-center gap-2 text-xs">
            <GraduationCap className="w-4 h-4 text-[#A07020] shrink-0" />
            <span className="text-[#475569] font-medium">
              Curriculum Standard:{' '}
              <strong className="text-[#07111E] font-semibold">Al-Arabiyyah Bayna Yadayk</strong>
            </span>
          </div>

          <span aria-hidden="true" className="hidden lg:inline text-[#DFB76C]/40">·</span>

          {/* Money Back Guarantee */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#059669] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>14-Day 100% Fluency Guarantee</span>
          </div>
        </div>

        {/* Right: Conversion CTAs */}
        <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto">
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenPlacement}
            className="flex-1 sm:flex-initial min-h-[38px] px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#DFB76C]/50 text-[#07111E] text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#A07020]" />
            <span>Free 15-Min Assessment</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenUpgrade}
            className="flex-1 sm:flex-initial min-h-[38px] px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] text-xs font-extrabold inline-flex items-center justify-center gap-1.5 shadow-sm shadow-[#DFB76C]/25 border border-[#FFF0C8]/40 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Unlock All 32 Units</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
