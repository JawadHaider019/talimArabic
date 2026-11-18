import React, { useState, useRef, useEffect } from 'react';
import { Check, Flame, BookOpen, Clock, RotateCcw, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WeeklyGoalAndStatsProps {
  isMobileView: boolean;
  weeklyCompleted: number;
  weeklyTarget: number;
  consecutiveWeeksStreak: number;
  weeklyResetLabel: string;
  unitsPassed: number;
  book1Passed: number;
  book2Passed: number;
  totalUnits: number;
  timeStudiedMinutes: number;
  unitsToRevisit: number;
  latestScore: number | null;
  latestUnitLabel: string;
}

export function WeeklyGoalAndStats({
  isMobileView,
  weeklyCompleted,
  weeklyTarget,
  consecutiveWeeksStreak,
  weeklyResetLabel,
  unitsPassed,
  book1Passed,
  book2Passed,
  totalUnits,
  timeStudiedMinutes,
  unitsToRevisit,
  latestScore,
  latestUnitLabel,
}: WeeklyGoalAndStatsProps) {
  const [streakTooltipOpen, setStreakTooltipOpen] = useState(false);
  const streakWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!streakTooltipOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        streakWrapperRef.current &&
        !streakWrapperRef.current.contains(e.target as Node)
      ) {
        setStreakTooltipOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStreakTooltipOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [streakTooltipOpen]);

  const ratio = Math.min(1, weeklyCompleted / Math.max(1, weeklyTarget));
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - ratio);

  const stats = [
    {
      label: 'Units passed',
      value: `${unitsPassed}/${totalUnits}`,
      subtext: `Book 1: ${book1Passed}/16 · Book 2: ${book2Passed}/16`,
      icon: BookOpen,
      tone: 'text-[#059669] bg-[#ECFDF5]',
    },
    {
      label: 'Time studied',
      value: `${timeStudiedMinutes} min`,
      subtext: 'Total speaking time',
      icon: Clock,
      tone: 'text-[#0B192C] bg-[#EEF2F7]',
    },
    {
      label: 'Units to revisit',
      value: `${unitsToRevisit}`,
      subtext: unitsToRevisit === 1 ? 'Book 1 · Unit 3' : 'Needs review',
      icon: RotateCcw,
      tone: 'text-[#D97706] bg-[#FFFBEB]',
    },
    {
      label: 'Latest speaking score',
      value: latestScore !== null ? `${latestScore}%` : '—',
      subtext: latestUnitLabel,
      icon: Award,
      tone: 'text-[#C8922B] bg-[#FDF8EC]',
    },
  ];

  return (
    <section
      aria-label="Weekly goal and quick statistics"
      className={`grid gap-4 ${
        isMobileView ? 'grid-cols-1' : 'grid-cols-12 items-stretch'
      }`}
    >
      {/* Weekly Goal Card */}
      <div
        className={`luxury-card rounded-2xl p-6 flex flex-col justify-between ${
          isMobileView ? '' : 'col-span-4'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DFB76C]" />
            <h3 className="text-sm font-bold text-[#07111E] tracking-tight">Weekly goal</h3>
          </div>

          {/* Dynamic Streak Count Badge + Hover/Click Tooltip */}
          <div
            ref={streakWrapperRef}
            className="relative shrink-0"
            onMouseEnter={() => setStreakTooltipOpen(true)}
            onMouseLeave={() => setStreakTooltipOpen(false)}
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setStreakTooltipOpen((prev) => !prev)}
              aria-expanded={streakTooltipOpen}
              aria-describedby="weekly-streak-tooltip"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tabular-nums whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFB76C] shadow-xs ${
                weeklyCompleted >= weeklyTarget
                  ? 'bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] border-[#A7F3D0] text-[#047857]'
                  : consecutiveWeeksStreak > 0
                  ? 'bg-gradient-to-r from-[#FDF8EC] to-[#FEF3C7] border-[#DFB76C]/60 text-[#92400E]'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:border-[#CBD5E1]'
              }`}
            >
              <Flame
                className={`w-3.5 h-3.5 shrink-0 ${
                  weeklyCompleted >= weeklyTarget
                    ? 'text-[#059669]'
                    : consecutiveWeeksStreak > 0
                    ? 'text-[#C8922B]'
                    : 'text-[#94A3B8]'
                }`}
              />
              <span>
                {consecutiveWeeksStreak}{' '}
                {consecutiveWeeksStreak === 1 ? 'wk' : 'wks'} streak
              </span>
            </motion.button>

            <AnimatePresence>
              {streakTooltipOpen && (
                <motion.div
                  id="weekly-streak-tooltip"
                  role="tooltip"
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-xl bg-[#0B192C] text-white p-3.5 shadow-xl shadow-[#0B192C]/20 border border-white/10 z-30 text-left"
                >
                  <p className="text-xs font-semibold text-[#E4B85C]">
                    Weekly Goal Streak
                  </p>
                  <p className="text-xs text-[#E2E8F0] mt-1 leading-relaxed">
                    Complete all{' '}
                    <strong className="font-semibold text-white">
                      {weeklyTarget} speaking sessions
                    </strong>{' '}
                    in a week to grow your streak by 1 week (currently{' '}
                    <span className="tabular-nums font-semibold text-white">
                      {weeklyCompleted}/{weeklyTarget}
                    </span>
                    ).
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-2 pt-2 border-t border-white/10 leading-relaxed">
                    Sessions reset every Monday ({weeklyResetLabel}). Missing a
                    weekly target resets the streak to 0.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4 my-2">
          {/* Animated Progress Ring */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 -rotate-90"
              viewBox="0 0 68 68"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="progress-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFB76C" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <circle
                cx="34"
                cy="34"
                r={radius}
                fill="none"
                stroke="#F1F4F8"
                strokeWidth="6"
              />
              <motion.circle
                cx="34"
                cy="34"
                r={radius}
                fill="none"
                stroke={weeklyCompleted > 0 ? 'url(#progress-gold-grad)' : '#DFB76C'}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: strokeOffset }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-[#07111E] tabular-nums">
              {weeklyCompleted}/{weeklyTarget}
            </span>
          </div>

          <div>
            <p className="text-lg font-extrabold text-[#07111E] tabular-nums">
              {weeklyCompleted} of {weeklyTarget} sessions
            </p>
            <p className="text-xs font-medium text-[#64748B] mt-0.5">{weeklyResetLabel}</p>
          </div>
        </div>

        {/* 5 Streak-Style Session Dots */}
        <div className="mt-4 pt-3.5 border-t border-[#F1F4F8] flex items-center justify-between gap-2">
          {Array.from({ length: weeklyTarget }).map((_, idx) => {
            const done = idx < weeklyCompleted;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div
                  animate={done ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`w-full h-8 rounded-xl flex items-center justify-center border transition-all ${
                    done
                      ? 'bg-gradient-to-br from-[#059669] to-[#047857] border-[#047857] text-white shadow-xs'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8]'
                  }`}
                >
                  {done ? (
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                    </motion.span>
                  ) : (
                    <span className="text-[11px] font-semibold tabular-nums">
                      {idx + 1}
                    </span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats Row (4 Small Cards) */}
      <div
        className={`grid gap-3.5 ${
          isMobileView ? 'grid-cols-2' : 'col-span-8 grid-cols-4'
        }`}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="luxury-card rounded-2xl p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#5A6B82] leading-snug">
                  {stat.label}
                </span>
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-black/[0.04] ${stat.tone}`}
                >
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3.5">
                <p className="text-2xl font-extrabold tracking-tight text-[#07111E] tabular-nums">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-[#64748B] mt-1 truncate">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
