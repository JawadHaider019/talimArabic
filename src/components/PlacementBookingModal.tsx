import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MessageCircle,
  CheckCircle2,
  PhoneCall,
  User,
  Mail,
  GraduationCap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IslamicGeometricPattern } from './GeometricPattern';

interface PlacementBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMobileView: boolean;
  studentEmail: string;
  onBookConfirmed?: (details: { name: string; email: string; slot: string }) => void;
}

const AVAILABLE_DAYS = [
  { day: 'Thu', date: '19 Nov', slots: ['10:00 AM', '02:30 PM', '06:00 PM'] },
  { day: 'Fri', date: '20 Nov', slots: ['09:30 AM', '11:00 AM', '04:30 PM'] },
  { day: 'Sat', date: '21 Nov', slots: ['11:30 AM', '03:00 PM', '07:30 PM'] },
  { day: 'Sun', date: '22 Nov', slots: ['10:00 AM', '01:00 PM', '05:00 PM'] },
];

export function PlacementBookingModal({
  isOpen,
  onClose,
  isMobileView,
  studentEmail,
  onBookConfirmed,
}: PlacementBookingModalProps) {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(AVAILABLE_DAYS[0].slots[0]);
  const [name, setName] = useState('Yusuf Mansoor');
  const [email, setEmail] = useState(studentEmail || 'm@m.com');
  const [level, setLevel] = useState<'beginner' | 'elementary' | 'intermediate'>('elementary');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    if (onBookConfirmed) {
      onBookConfirmed({
        name,
        email,
        slot: `${AVAILABLE_DAYS[selectedDayIdx].day} ${AVAILABLE_DAYS[selectedDayIdx].date} at ${selectedSlot}`,
      });
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Assalamu Alaikum! I would like to schedule a free 15-minute spoken Arabic placement assessment with TalimArabic.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#07111E]/75 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white w-full max-w-xl rounded-3xl border border-[#DFB76C]/35 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#0F2038] via-[#091424] to-[#040A13] text-white p-6 sm:p-7 overflow-hidden border-b border-[#DFB76C]/30">
            <IslamicGeometricPattern className="absolute inset-0 opacity-80" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-[#DFB76C]/40 text-[11px] font-bold text-[#F5DEB3] mb-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#DFB76C]" />
                  <span>Free 1-on-1 Oral Evaluation</span>
                </div>
                <h2 id="booking-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Book 15-Min Placement Call
                </h2>
                <p className="text-xs text-[#CBD5E1] mt-1 font-medium">
                  Meet a native Arabic instructor via Google Meet or WhatsApp to evaluate your spoken fluency and curate your personal study roadmap.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking modal"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Current Level Pill Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">
                    Your Current Arabic Comfort
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'beginner', label: 'Complete Beginner', sub: 'Know alphabet or zero' },
                      { id: 'elementary', label: 'Elementary', sub: 'Simple words & phrases' },
                      { id: 'intermediate', label: 'Intermediate', sub: 'Know grammar, need speaking' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setLevel(item.id as typeof level)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          level === item.id
                            ? 'bg-[#FDF8EC] border-[#DFB76C] text-[#07111E] shadow-xs'
                            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                        }`}
                      >
                        <p className="text-xs font-bold leading-snug">{item.label}</p>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5 leading-tight">{item.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day & Date Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">
                    Select Available Day
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {AVAILABLE_DAYS.map((d, idx) => (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => {
                          setSelectedDayIdx(idx);
                          setSelectedSlot(d.slots[0]);
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedDayIdx === idx
                            ? 'bg-[#07111E] text-white border-[#07111E] shadow-sm'
                            : 'bg-white border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <span className="block text-xs font-bold">{d.day}</span>
                        <span className="block text-[11px] opacity-80 mt-0.5">{d.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slot Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">
                    Select Time (Your Local Timezone)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {AVAILABLE_DAYS[selectedDayIdx].slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`min-h-[38px] px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-[#DFB76C] border-[#DFB76C] text-[#07111E] font-bold shadow-xs'
                            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:border-[#CBD5E1]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Student Info Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full min-h-[44px] pl-9 pr-3 rounded-xl bg-[#F8FAFC] border border-[#DCE3EC] text-xs font-semibold text-[#07111E] focus:outline-none focus:ring-2 focus:ring-[#DFB76C]"
                      />
                      <User className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#475569] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full min-h-[44px] pl-9 pr-3 rounded-xl bg-[#F8FAFC] border border-[#DCE3EC] text-xs font-semibold text-[#07111E] focus:outline-none focus:ring-2 focus:ring-[#DFB76C]"
                      />
                      <Mail className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Submit & WhatsApp Alternative */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full min-h-[48px] rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] text-xs font-extrabold shadow-md shadow-[#DFB76C]/25 border border-[#FFF0C8]/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 stroke-[2.2]" />
                    <span>Confirm Free Placement Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full min-h-[42px] rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] text-xs font-bold border border-[#BBF7D0] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#16a34a]" />
                    <span>Or Chat Directly on WhatsApp with an Instructor</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#07111E]">
                    Your Free Assessment is Confirmed!
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1.5 max-w-sm mx-auto">
                    We sent a calendar invitation and meeting link to <strong className="text-[#07111E]">{email}</strong> for <strong>{AVAILABLE_DAYS[selectedDayIdx].day} {AVAILABLE_DAYS[selectedDayIdx].date} at {selectedSlot}</strong>.
                  </p>
                </div>

                <div className="bg-[#FAFBFD] rounded-2xl border border-[#E5E9F0] p-4 text-xs text-left max-w-sm mx-auto space-y-2">
                  <p className="font-bold text-[#07111E] flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#A07020]" />
                    <span>What to expect in your 15 minutes:</span>
                  </p>
                  <ul className="space-y-1 text-[#475569] text-[11px] list-disc list-inside">
                    <li>3-minute friendly Arabic conversational warm-up</li>
                    <li>Pronunciation &amp; vocabulary diagnostic score</li>
                    <li>Tailored recommendation across Book 1 &amp; Book 2</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full min-h-[44px] rounded-xl bg-[#07111E] text-white text-xs font-bold hover:bg-[#13243F] transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
