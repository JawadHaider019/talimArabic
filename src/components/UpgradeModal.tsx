import React, { useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  School,
  UserCheck,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IslamicGeometricPattern } from './GeometricPattern';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUnitTitle?: string;
  isMobileView: boolean;
  onSelectPlan?: (planName: string) => void;
}

export function UpgradeModal({
  isOpen,
  onClose,
  targetUnitTitle,
  isMobileView,
  onSelectPlan,
}: UpgradeModalProps) {
  const [activeTab, setActiveTab] = useState<'individual' | 'institution'>('individual');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'lifetime'>('lifetime');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleEnroll = (planName: string) => {
    if (onSelectPlan) onSelectPlan(planName);
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#07111E]/75 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white w-full max-w-3xl rounded-3xl border border-[#DFB76C]/35 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-br from-[#0F2038] via-[#091424] to-[#040A13] text-white p-6 sm:p-8 overflow-hidden shrink-0 border-b border-[#DFB76C]/30">
            <IslamicGeometricPattern className="absolute inset-0 opacity-80" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-[#DFB76C]/40 text-[11px] font-bold text-[#F5DEB3] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFB76C]" />
                  <span>
                    {targetUnitTitle ? `Unlock “${targetUnitTitle}” & Complete Course` : 'TalimArabic Masterclass Enrollment'}
                  </span>
                </div>
                <h2 id="upgrade-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Unlock Fluent Spoken Arabic
                </h2>
                <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1.5 max-w-xl font-medium">
                  Gain instant access to all 32 curriculum units, unlimited speech evaluations, and 1-on-1 native tutor certification.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Audience Segment Tabs */}
            <div className="relative z-10 mt-6 inline-flex p-1 rounded-xl bg-white/[0.08] border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('individual')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'individual'
                    ? 'bg-[#DFB76C] text-[#07111E] shadow-sm'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Individual Students</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('institution')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'institution'
                    ? 'bg-[#DFB76C] text-[#07111E] shadow-sm'
                    : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                <School className="w-3.5 h-3.5" />
                <span>Schools &amp; Madrasahs</span>
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {activeTab === 'individual' ? (
              <>
                {/* Billing Cycle Toggle */}
                <div className="flex items-center justify-center gap-3">
                  <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-[#07111E]' : 'text-[#64748B]'}`}>
                    Monthly Pass
                  </span>
                  <button
                    type="button"
                    onClick={() => setBillingCycle((b) => (b === 'monthly' ? 'lifetime' : 'monthly'))}
                    className="relative w-12 h-6 rounded-full bg-[#0B192C] p-0.5 cursor-pointer transition-colors"
                  >
                    <motion.div
                      animate={{ x: billingCycle === 'lifetime' ? 24 : 0 }}
                      className="w-5 h-5 rounded-full bg-[#DFB76C] shadow-sm"
                    />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold ${billingCycle === 'lifetime' ? 'text-[#07111E]' : 'text-[#64748B]'}`}>
                      Lifetime Mastery
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                      Save 65%
                    </span>
                  </div>
                </div>

                {/* Plan Pricing Cards Grid */}
                <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {/* Standard Monthly Pass */}
                  <div
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                      billingCycle === 'monthly'
                        ? 'border-[#DFB76C] ring-2 ring-[#DFB76C]/30 bg-[#FFFDF9] shadow-md'
                        : 'border-[#E5E9F0] bg-white opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-[#07111E]">Standard Speaking Pass</h3>
                        <span className="text-xs font-semibold text-[#64748B]">Flexible</span>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#07111E]">$29</span>
                        <span className="text-xs text-[#64748B] font-medium">/ month</span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-2">
                        Ideal for self-paced learners who want full curriculum practice and monthly flexibility.
                      </p>

                      <ul className="mt-4 space-y-2.5 text-xs text-[#334155]">
                        {[
                          'Access to all 32 Book 1 & 2 Units',
                          'Unlimited live spoken dialogue turns',
                          'Vocabulary mastery quizzes & analytics',
                          'Cancel anytime with 1 click',
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 font-medium">
                            <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 stroke-[2.5]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEnroll('Standard Monthly Pass ($29/mo)')}
                      className="mt-6 w-full min-h-[44px] rounded-xl bg-white hover:bg-[#F8FAFC] text-[#07111E] text-xs font-bold border border-[#CBD5E1] transition-colors cursor-pointer"
                    >
                      Start Monthly Pass
                    </button>
                  </div>

                  {/* VIP Lifetime Mastery */}
                  <div
                    className={`rounded-2xl border p-5 flex flex-col justify-between relative transition-all ${
                      billingCycle === 'lifetime'
                        ? 'border-[#DFB76C] ring-2 ring-[#DFB76C]/40 bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] shadow-xl'
                        : 'border-[#E5E9F0] bg-white'
                    }`}
                  >
                    <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#DFB76C] to-[#C59B4B] text-[#07111E] text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
                      Most Popular
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-[#07111E]">VIP Lifetime Mastery</h3>
                        <span className="text-xs font-bold text-[#A07020]">Complete Access</span>
                      </div>
                      <div className="mt-3 flex items-baseline gap-1.5">
                        <span className="text-3xl font-extrabold text-[#07111E]">$199</span>
                        <span className="text-xs text-[#64748B] line-through">$480</span>
                        <span className="text-xs font-bold text-[#059669]">One-time payment</span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-2">
                        Everything included forever, plus 1-on-1 native instructor evaluation and certificate.
                      </p>

                      <ul className="mt-4 space-y-2.5 text-xs text-[#334155]">
                        {[
                          'Lifetime access to Books 1 & 2 (32 Units)',
                          'Unlimited live spoken conversation practice',
                          '1-on-1 Native Tutor Placement & Exit Exam',
                          'Official Verified Certificate of Completion',
                          'Priority WhatsApp Tutor Hotline',
                          '14-Day 100% Money-Back Guarantee',
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 font-semibold">
                            <Check className="w-3.5 h-3.5 text-[#A07020] shrink-0 stroke-[2.8]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEnroll('VIP Lifetime Mastery ($199)')}
                      className="mt-6 w-full min-h-[46px] rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] text-xs font-extrabold shadow-md shadow-[#DFB76C]/30 border border-[#FFF0C8]/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Enroll in Lifetime Mastery</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Institution & Madrasah Tier */
              <div className="rounded-2xl border border-[#DFB76C]/40 p-6 bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#FDF8EC] text-[#92400E] border border-[#DFB76C]/40">
                      B2B &amp; Academy Partner
                    </span>
                    <h3 className="text-xl font-bold text-[#07111E] mt-2">
                      TalimArabic for Islamic Schools &amp; Madrasahs
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1 max-w-lg">
                      Empower your entire classroom with structured spoken Arabic fluency, automated homework grading, and administrative progress tracking.
                    </p>
                  </div>
                  <School className="w-10 h-10 text-[#A07020] shrink-0" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0]">
                    <p className="text-xs font-bold text-[#07111E]">Student Multi-Seats</p>
                    <p className="text-[11px] text-[#64748B] mt-1">Discounts from 10 to 500+ active students.</p>
                  </div>
                  <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0]">
                    <p className="text-xs font-bold text-[#07111E]">Teacher Dashboard</p>
                    <p className="text-[11px] text-[#64748B] mt-1">Track classroom fluency metrics &amp; assignment completion.</p>
                  </div>
                  <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0]">
                    <p className="text-xs font-bold text-[#07111E]">Curriculum Alignment</p>
                    <p className="text-[11px] text-[#64748B] mt-1">100% matched to Bayna Yadayk semester syllabi.</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#64748B]">Starting from</span>{' '}
                    <strong className="text-xl font-extrabold text-[#07111E]">$9.50</strong>
                    <span className="text-xs text-[#64748B]"> / student / month</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEnroll('Madrasah / Academy Pilot Inquiry')}
                    className="min-h-[44px] px-6 rounded-xl bg-[#07111E] hover:bg-[#13243F] text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                  >
                    Request Institutional Proposal
                  </button>
                </div>
              </div>
            )}

            {/* Urgency & Guarantee Seal */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E8ECF2] text-xs">
              <div className="flex items-center gap-2 font-medium text-[#475569]">
                <Clock className="w-4 h-4 text-[#A07020]" />
                <span>Next live spoken cohort commences: <strong>Monday, 23 Nov</strong></span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#059669]">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span>14-Day 100% Money-Back Guarantee</span>
              </div>
            </div>

            {/* FAQ Accordion addressing objections */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Frequently Asked Questions
              </h4>
              {[
                {
                  q: 'What if I am a complete beginner?',
                  a: 'Book 1 starts from absolute zero: basic greetings, letters, and foundational phrases with transliteration and audio for every word.',
                },
                {
                  q: 'How does the 14-day guarantee work?',
                  a: 'If you are not speaking Arabic with significantly higher confidence within 14 days, email us for a prompt, 100% full refund.',
                },
                {
                  q: 'Can I switch units or books anytime?',
                  a: 'Yes, once unlocked, you have full freedom to jump between all 32 units across Book 1 and Book 2.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-[#E5E9F0] overflow-hidden text-xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-3.5 text-left font-bold text-[#07111E] flex items-center justify-between bg-white hover:bg-[#F8FAFC] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#64748B] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-3.5 bg-[#FAFBFD] border-t border-[#EEF2F6] text-[#475569] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
