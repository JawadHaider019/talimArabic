import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  PhoneOff,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRightLeft,
  Volume2,
  Loader2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IslamicGeometricPattern } from './GeometricPattern';
import { CurriculumUnit, formatSecondsToClock, TUTOR_PERSONAS, TutorPersona } from '../data/curriculum';

export type HeroMode = 'default' | 'live' | 'updating';

interface HeroCardProps {
  unit: CurriculumUnit;
  mode: HeroMode;
  isMobileView: boolean;
  remainingSeconds: number;
  isMuted: boolean;
  speakerTurn: 'tutor' | 'student';
  updatingStep: number;
  onStartSession: () => void;
  onChooseUnit: () => void;
  onToggleMute: () => void;
  onToggleSpeakerTurn: () => void;
  onRecordTurn: (fluencyBoost: number) => void;
  onEndSession: () => void;
  onFinishUpdating: () => void;
}

const WAVE_HEIGHTS_TUTOR = [34, 62, 88, 48, 96, 70, 40, 82, 56, 92, 46, 68, 36];
const WAVE_HEIGHTS_STUDENT = [24, 42, 65, 92, 54, 78, 95, 60, 44, 72, 38, 52, 28];

export function HeroCard({
  unit,
  mode,
  isMobileView,
  remainingSeconds,
  isMuted,
  speakerTurn,
  updatingStep,
  onStartSession,
  onChooseUnit,
  onToggleMute,
  onToggleSpeakerTurn,
  onRecordTurn,
  onEndSession,
  onFinishUpdating,
}: HeroCardProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [lastUserReply, setLastUserReply] = useState<string | null>(null);
  const [isSpeakingTurn, setIsSpeakingTurn] = useState(false);
  const [selectedTutorId, setSelectedTutorId] = useState<string>('aisha');
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const currentTutor =
    TUTOR_PERSONAS.find((t) => t.id === selectedTutorId) ?? TUTOR_PERSONAS[0];

  useEffect(() => {
    if (mode !== 'live') {
      setDialogueIndex(0);
      setLastUserReply(null);
      setIsSpeakingTurn(false);
    }
  }, [mode, unit.id]);

  const speakArabic = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = speechSpeed;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore if speech synthesis is unavailable
    }
  };

  const currentDialogue =
    unit.dialogue[dialogueIndex % Math.max(1, unit.dialogue.length)];

  const handleSimulatedSpeak = (reply: {
    arabic: string;
    transliteration: string;
    english: string;
    fluencyBoost: number;
  }) => {
    if (isMuted || isSpeakingTurn) return;
    setIsSpeakingTurn(true);
    setLastUserReply(reply.arabic);
    onRecordTurn(reply.fluencyBoost);

    window.setTimeout(() => {
      setIsSpeakingTurn(false);
      setDialogueIndex((prev) => (prev + 1) % unit.dialogue.length);
    }, 1100);
  };

  const statusChip = (() => {
    if (unit.status === 'passed') {
      return {
        label: `Passed · ${unit.speakingScore ?? 0}%`,
        bg: 'bg-[#10B981]/16 border-[#34D399]/35 text-[#A7F3D0]',
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />,
      };
    }
    if (unit.status === 'needs_review') {
      return {
        label: `Needs review, ${unit.speakingScore ?? 0}%`,
        bg: 'bg-[#F59E0B]/18 border-[#FBBF24]/40 text-[#FDE68A]',
        icon: <AlertCircle className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />,
      };
    }
    return {
      label: 'Not started',
      bg: 'bg-white/10 border-white/20 text-[#CBD5E1]',
      icon: <Clock className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />,
    };
  })();

  const activeSpeaker = isSpeakingTurn ? 'student' : speakerTurn;

  return (
    <section
      aria-label="Current speaking lesson"
      className={`relative overflow-hidden bg-gradient-to-br from-[#0F2038] via-[#091424] to-[#040A13] text-white shadow-2xl shadow-[#0B192C]/25 border border-[#DFB76C]/30 ${
        isMobileView ? 'rounded-2xl p-6' : 'rounded-3xl p-8 lg:p-10'
      }`}
    >
      {/* Subtle ambient gold & sapphire glow with Islamic geometric lattice */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(223,183,108,0.22),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(20,40,70,0.5),transparent_70%)]"
      />
      <IslamicGeometricPattern className="absolute inset-0 opacity-80" />

      <AnimatePresence mode="wait">
        {/* MODE 1: DEFAULT HERO CARD */}
        {mode === 'default' && (
          <motion.div
            key={`default-${unit.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 ${
              isMobileView
                ? 'flex flex-col gap-6'
                : 'grid grid-cols-12 gap-8 items-center'
            }`}
          >
            {/* Left / Main Lesson Column */}
            <div className={isMobileView ? '' : 'col-span-7'}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.08] border border-[#DFB76C]/35 text-xs font-semibold text-[#F5DEB3] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFB76C] animate-pulse" />
                  <span>Continue your lesson</span>
                  <span aria-hidden="true" className="text-white/30">
                    ·
                  </span>
                  <span className="font-arabic text-xs font-semibold text-[#DFB76C]">
                    أَكْمِلْ دَرْسَكَ
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tabular-nums whitespace-nowrap shadow-xs ${statusChip.bg}`}
                >
                  {statusChip.icon}
                  <span>{statusChip.label}</span>
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold tracking-widest uppercase text-[#DFB76C]">
                  Book {unit.book} · Unit {unit.unitNumber}
                </p>
                <div
                  className={`mt-2 flex items-center gap-3.5 flex-wrap`}
                >
                  <h2
                    className={`font-extrabold tracking-tight text-white leading-tight ${
                      isMobileView ? 'text-2xl' : 'text-4xl'
                    }`}
                  >
                    {unit.title}
                  </h2>
                  <span
                    className={`font-arabic font-bold text-[#F5DEB3] drop-shadow-[0_2px_12px_rgba(223,183,108,0.3)] ${
                      isMobileView ? 'text-2xl' : 'text-3xl'
                    }`}
                  >
                    {unit.arabicTitle}
                  </span>

                  <button
                    type="button"
                    onClick={() => speakArabic(unit.arabicTitle)}
                    title="Listen to authentic pronunciation"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-[#DFB76C]/20 border border-[#DFB76C]/40 text-xs font-semibold text-[#F5DEB3] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#DFB76C] shrink-0" />
                    <span>Listen · اسْتَمِعْ</span>
                  </button>
                </div>
              </div>

              {/* Primary CTA + Session Time + Choose Unit */}
              <div
                className={`mt-7 flex ${
                  isMobileView
                    ? 'flex-col items-stretch gap-3'
                    : 'flex-wrap items-center gap-5'
                }`}
              >
                <motion.button
                  type="button"
                  onClick={onStartSession}
                  whileHover={{ y: -1, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] font-bold shadow-lg shadow-[#DFB76C]/25 border border-[#FFF0C8]/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] whitespace-nowrap ${
                    isMobileView
                      ? 'w-full min-h-[52px] px-5 text-[15px]'
                      : 'min-h-[52px] px-7 text-[15px]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  />
                  <Mic className="w-5 h-5 shrink-0 stroke-[2.4]" />
                  <span>Start speaking session</span>
                </motion.button>

                <div
                  className={`flex items-center ${
                    isMobileView ? 'justify-between px-1' : 'gap-4'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#CBD5E1] tabular-nums">
                    {formatSecondsToClock(remainingSeconds)} left in this session
                  </span>
                  {!isMobileView && (
                    <span aria-hidden="true" className="text-white/25">
                      ·
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={onChooseUnit}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F3D99B] hover:text-white underline underline-offset-4 decoration-[#DFB76C]/50 hover:decoration-white transition-colors cursor-pointer whitespace-nowrap min-h-[32px]"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Choose a different unit</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Voice Orb & Persona Hub */}
            {!isMobileView && (
              <div className="col-span-5">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl bg-white/[0.05] border border-[#DFB76C]/30 p-5 backdrop-blur-md shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,rgba(223,183,108,0.18),transparent_70%)] pointer-events-none" />

                  {/* Persona Switcher & Live Voice Indicator */}
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center -space-x-1">
                        {TUTOR_PERSONAS.map((p) => {
                          const active = p.id === selectedTutorId;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setSelectedTutorId(p.id)}
                              title={`${p.name} (${p.dialect})`}
                              className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                                active
                                  ? 'border-[#DFB76C] scale-110 z-10 shadow-xs'
                                  : 'border-white/20 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={p.avatarUrl}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white text-[11px] leading-tight">
                          {currentTutor.name}
                        </p>
                        <p className="text-[10px] text-[#DFB76C] font-arabic font-semibold">
                          {currentTutor.arabicName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/10 text-[10px] font-semibold text-[#34D399]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                      <span>Vapi Voice Active</span>
                    </div>
                  </div>

                  {/* 3D Pulsing Voice Orb & Animated Sound Rings */}
                  <div className="py-4 flex flex-col items-center justify-center relative">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Outer Breathing Halo */}
                      <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.45, 0.2] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#DFB76C]/30 via-[#10B981]/25 to-[#DFB76C]/30 blur-md pointer-events-none"
                      />

                      {/* Rotating Dashed Audio Ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-1.5 rounded-full border border-dashed border-[#DFB76C]/40 pointer-events-none"
                      />

                      {/* 3D Holographic Core Sphere */}
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => speakArabic(unit.conversationPromptArabic)}
                        title="Click to hear AI Tutor prompt"
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E6C27A] via-[#142A4A] to-[#081322] border-2 border-[#F5DEB3]/70 shadow-lg shadow-[#DFB76C]/30 flex items-center justify-center cursor-pointer relative overflow-hidden"
                      >
                        <Volume2 className="w-6 h-6 text-[#F5DEB3] drop-shadow-md z-10" />
                        <div className="absolute inset-0 bg-radial from-white/30 to-transparent pointer-events-none" />
                      </motion.div>
                    </div>

                    {/* Speech Speed Controller */}
                    <div className="mt-2.5 inline-flex items-center gap-1 p-0.5 rounded-lg bg-black/30 border border-white/10 text-[10px] font-bold">
                      {[0.8, 1.0, 1.2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => setSpeechSpeed(spd)}
                          className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                            speechSpeed === spd
                              ? 'bg-gradient-to-r from-[#DFB76C] to-[#C59B4B] text-[#07111E] shadow-2xs font-extrabold'
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Conversation Starter Prompt */}
                  <div className="pt-2 border-t border-white/10">
                    <p className="font-arabic text-xl font-bold text-white leading-relaxed text-right drop-shadow-sm">
                      {unit.conversationPromptArabic}
                    </p>
                    <p className="text-[11px] text-[#CBD5E1] mt-1 text-right font-medium">
                      {unit.conversationPromptEnglish}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* LIVE SESSION STATE */}
        {mode === 'live' && (
          <motion.div
            key="live-session"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/18 border border-[#34D399]/35 text-xs font-semibold text-[#A7F3D0]">
                  <Volume2 className="w-3.5 h-3.5 text-[#34D399]" />
                  <span>Live Speaking Session</span>
                </span>
                <span className="text-xs text-[#CBD5E1]">
                  Book {unit.book} · Unit {unit.unitNumber}: {unit.title}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white tabular-nums">
                <Clock className="w-3.5 h-3.5 text-[#E4B85C]" />
                <span>{formatSecondsToClock(remainingSeconds)} remaining</span>
              </div>
            </div>

            <div
              className={`${
                isMobileView
                  ? 'flex flex-col gap-4'
                  : 'grid grid-cols-12 gap-6 items-stretch'
              }`}
            >
              {/* Soundwave & Live Tutor Prompt */}
              <div
                className={`flex flex-col justify-between rounded-2xl bg-white/[0.06] border border-white/12 p-5 ${
                  isMobileView ? 'w-full' : 'col-span-6'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={onToggleSpeakerTurn}
                    className="text-xs font-medium text-[#E4B85C] hover:text-[#F3CE7B] transition-colors cursor-pointer"
                  >
                    {isMuted
                      ? 'Microphone muted — unmute to respond'
                      : isSpeakingTurn || activeSpeaker === 'student'
                      ? 'Listening to your Arabic response...'
                      : 'Tutor is speaking Arabic'}
                  </button>
                  <button
                    type="button"
                    onClick={() => speakArabic(currentDialogue.tutorArabic)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#CBD5E1] hover:text-white cursor-pointer"
                    title="Play Arabic tutor voice"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#E4B85C]" />
                    <span>Listen</span>
                  </button>
                </div>

                {/* Organic Animated Waveform */}
                <div
                  aria-label="Live audio waveform"
                  className="flex items-center justify-center gap-1.5 h-14 my-4"
                >
                  {(activeSpeaker === 'tutor'
                    ? WAVE_HEIGHTS_TUTOR
                    : WAVE_HEIGHTS_STUDENT
                  ).map((h, i) => (
                    <motion.span
                      key={i}
                      animate={
                        isMuted
                          ? { scaleY: 0.25, opacity: 0.3 }
                          : {
                              scaleY: [0.32, 1, 0.45, 0.9, 0.32],
                              opacity: [0.55, 1, 0.7, 0.95, 0.55],
                            }
                      }
                      transition={
                        isMuted
                          ? { duration: 0.2 }
                          : {
                              duration: 1.2 + (i % 3) * 0.2,
                              repeat: Infinity,
                              delay: i * 0.07,
                              ease: 'easeInOut',
                            }
                      }
                      style={{ height: `${Math.round(h * 0.56)}px` }}
                      className={`w-1.5 rounded-full origin-center transition-all ${
                        isMuted
                          ? 'bg-white/20'
                          : activeSpeaker === 'tutor'
                          ? 'bg-gradient-to-t from-[#B38634] to-[#F5DEB3] shadow-[0_0_8px_rgba(223,183,108,0.4)]'
                          : 'bg-gradient-to-t from-[#059669] to-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.4)]'
                      }`}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`turn-${dialogueIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl bg-[#0B192C]/65 border border-white/10 p-3.5"
                  >
                    <p className="font-arabic text-lg font-semibold text-white text-right leading-relaxed">
                      {currentDialogue.tutorArabic}
                    </p>
                    <p className="text-xs text-[#CBD5E1] mt-1">
                      {currentDialogue.tutorEnglish}
                    </p>
                    {lastUserReply && (
                      <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 text-xs text-[#A7F3D0]">
                        <span>Your last reply:</span>
                        <span className="font-arabic font-medium">
                          {lastUserReply}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Interactive Spoken Reply Simulator + Controls */}
              <div
                className={`flex flex-col justify-between gap-4 ${
                  isMobileView ? 'w-full' : 'col-span-6'
                }`}
              >
                <div className="rounded-2xl bg-white/[0.05] border border-white/12 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#CBD5E1]">
                    <MessageSquare className="w-3.5 h-3.5 text-[#E4B85C]" />
                    <span>Tap a response to practice speaking aloud:</span>
                  </div>

                  {currentDialogue.suggestedReplies.map((reply) => (
                    <motion.button
                      key={reply.arabic}
                      type="button"
                      disabled={isMuted || isSpeakingTurn}
                      whileHover={isMuted ? undefined : { x: -2 }}
                      whileTap={isMuted ? undefined : { scale: 0.985 }}
                      onClick={() => handleSimulatedSpeak(reply)}
                      className="w-full text-right p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-45 border border-white/10 hover:border-[#E4B85C]/50 transition-colors cursor-pointer"
                    >
                      <p className="font-arabic text-base font-semibold text-white">
                        {reply.arabic}
                      </p>
                      <p className="text-xs text-[#E4B85C] text-left mt-1">
                        {reply.transliteration}
                      </p>
                      <p className="text-xs text-[#94A3B8] text-left">
                        {reply.english}
                      </p>
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={onToggleMute}
                    className={`inline-flex items-center justify-center gap-2 min-h-[46px] px-4 rounded-xl border text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isMuted
                        ? 'bg-[#F59E0B]/20 border-[#FBBF24]/50 text-[#FDE68A]'
                        : 'bg-white/10 hover:bg-white/15 border-white/18 text-white'
                    }`}
                  >
                    {isMuted ? (
                      <>
                        <MicOff className="w-4 h-4 shrink-0" />
                        <span>Unmute mic</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 shrink-0" />
                        <span>Mute mic</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={onEndSession}
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] px-4 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-sm font-semibold shadow-lg shadow-[#DC2626]/25 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <PhoneOff className="w-4 h-4 shrink-0" />
                    <span>End session</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* UPDATING YOUR RESULTS STATE */}
        {mode === 'updating' && (
          <motion.div
            key="updating-results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#E4B85C]">
                <Sparkles className="w-4 h-4" />
                <span>
                  Session completed · Book {unit.book}, Unit {unit.unitNumber}
                </span>
              </div>
              <span className="font-arabic text-sm font-medium text-[#E4B85C]">
                جَارِي تَحْدِيثُ النَّتَائِجِ
              </span>
            </div>

            <div
              className={`${
                isMobileView
                  ? 'flex flex-col gap-5'
                  : 'grid grid-cols-12 gap-8 items-center'
              }`}
            >
              <div className={isMobileView ? '' : 'col-span-6'}>
                <div className="flex items-center gap-3.5">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-12 h-12 rounded-2xl bg-[#C8922B]/20 border border-[#E4B85C]/40 flex items-center justify-center shrink-0"
                  >
                    <Loader2 className="w-6 h-6 text-[#E4B85C] animate-spin" />
                  </motion.div>
                  <div>
                    <h2
                      className={`font-bold text-white tracking-tight ${
                        isMobileView ? 'text-xl' : 'text-2xl'
                      }`}
                    >
                      Updating your results...
                    </h2>
                    <p className="text-sm text-[#CBD5E1] mt-0.5">
                      Reviewing your Arabic speaking session for “{unit.title}”
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-[#B8C4D4] mb-2">
                    <span>Analyzing pronunciation &amp; vocabulary usage</span>
                    <span className="tabular-nums font-semibold text-[#E4B85C]">
                      {updatingStep === 1 ? '38%' : updatingStep === 2 ? '76%' : '100%'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: '15%' }}
                      animate={{
                        width:
                          updatingStep === 1
                            ? '38%'
                            : updatingStep === 2
                            ? '76%'
                            : '100%',
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-[#C8922B]"
                    />
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-2.5">
                    Your weekly goal, score chart, and unit progress refresh
                    automatically.
                  </p>
                </div>
              </div>

              <div
                className={`rounded-2xl bg-white/[0.06] border border-white/12 p-4 space-y-3 ${
                  isMobileView ? '' : 'col-span-6'
                }`}
              >
                {[
                  { label: 'Voice recording & transcript saved', doneAt: 1 },
                  { label: 'Scoring spoken Arabic clarity & grammar', doneAt: 2 },
                  { label: 'Updating unit status & weekly goal', doneAt: 3 },
                ].map((step, idx) => {
                  const stepNum = idx + 1;
                  const isDone = updatingStep > stepNum;
                  const isActive = updatingStep === stepNum;
                  return (
                    <div
                      key={step.label}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        {isDone ? (
                          <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                          </motion.span>
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-[#E4B85C] animate-spin shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-white/25 shrink-0" />
                        )}
                        <span
                          className={
                            isDone
                              ? 'text-white font-medium'
                              : isActive
                              ? 'text-[#FDE68A] font-medium'
                              : 'text-[#94A3B8]'
                          }
                        >
                          {step.label}
                        </span>
                      </div>
                      <span className="text-xs text-[#94A3B8] shrink-0">
                        {isDone ? 'Done' : isActive ? 'In progress' : 'Queued'}
                      </span>
                    </div>
                  );
                })}

                <div className="pt-2 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={onFinishUpdating}
                    className="text-xs font-medium text-[#E4B85C] hover:text-[#F3CE7B] cursor-pointer"
                  >
                    Apply updated score now →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
