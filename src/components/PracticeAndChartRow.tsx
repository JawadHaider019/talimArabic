import React, { useState } from 'react';
import { Layers, Play, TrendingUp, ChevronDown, Volume2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { CurriculumUnit, SpeakingSessionPoint, SAMPLE_SCORE_HISTORY } from '../data/curriculum';

interface PracticeAndChartRowProps {
  isMobileView: boolean;
  units: CurriculumUnit[];
  selectedQuizUnitId: string;
  onChangeQuizUnitId: (id: string) => void;
  onStartQuiz: (unitId: string) => void;
  scoreHistory: SpeakingSessionPoint[];
  showEmptyChart: boolean;
  onStartSpeakingFromEmpty: () => void;
}

export function PracticeAndChartRow({
  isMobileView,
  units,
  selectedQuizUnitId,
  onChangeQuizUnitId,
  onStartQuiz,
  scoreHistory,
  showEmptyChart,
  onStartSpeakingFromEmpty,
}: PracticeAndChartRowProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [chartMode, setChartMode] = useState<'current' | 'projected'>('current');
  const selectedUnit =
    units.find((u) => u.id === selectedQuizUnitId) ?? units[2];

  const speakWord = (word: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'ar-SA';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const activeHistory =
    chartMode === 'projected'
      ? SAMPLE_SCORE_HISTORY
      : !showEmptyChart && scoreHistory.length > 0
      ? scoreHistory
      : [];

  const isEmpty = activeHistory.length === 0;

  // SVG Chart Geometry
  const chartW = 520;
  const chartH = 176;
  const padL = 36;
  const padR = 18;
  const padT = 16;
  const padB = 28;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const points = activeHistory.map((item, idx) => {
    const x =
      activeHistory.length <= 1
        ? padL + plotW / 2
        : padL + (idx / (activeHistory.length - 1)) * plotW;
    const y = padT + (1 - item.score / 100) * plotH;
    return { ...item, x, y };
  });

  const linePath = points
    .map((pt, i) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      const prev = points[i - 1];
      const cx = (prev.x + pt.x) / 2;
      return `C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
    })
    .join(' ');

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${
          padT + plotH
        } L ${points[0].x} ${padT + plotH} Z`
      : '';

  return (
    <section
      aria-label="Vocabulary quiz and speaking score progress"
      className={`grid gap-4 ${
        isMobileView ? 'grid-cols-1' : 'grid-cols-12 items-stretch'
      }`}
    >
      {/* Practice: Vocabulary Quiz Card */}
      <div
        className={`luxury-card rounded-2xl p-6 flex flex-col justify-between ${
          isMobileView ? '' : 'col-span-5'
        }`}
      >
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#FDF8EC] text-[#A07020] border border-[#DFB76C]/30 flex items-center justify-center shrink-0 shadow-xs">
                <Layers className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-[#07111E]">
                  Vocabulary Quiz
                </h3>
                <p className="font-arabic text-xs font-semibold text-[#A07020] text-left">
                  اخْتِبَارُ الْمُفْرَدَاتِ
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0]/60 px-2.5 py-1 rounded-full tabular-nums">
              {selectedUnit.vocabCorrect}/{selectedUnit.vocabTotal} mastered
            </span>
          </div>

          <p className="text-xs text-[#5A6B82] mt-3.5 leading-relaxed font-medium">
            Spaced repetition quiz with pronunciation audio and instant feedback.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="relative">
            <label
              htmlFor="vocab-unit-picker"
              className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5"
            >
              Select unit to practice
            </label>
            <div className="relative">
              <select
                id="vocab-unit-picker"
                value={selectedQuizUnitId}
                onChange={(e) => onChangeQuizUnitId(e.target.value)}
                className="w-full appearance-none min-h-[46px] pl-4 pr-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-sm font-semibold text-[#07111E] focus:outline-none focus:ring-2 focus:ring-[#DFB76C] cursor-pointer transition-all hover:border-[#DFB76C]/60"
              >
                <optgroup label="Book 1 — Beginner">
                  {units
                    .filter((u) => u.book === 1)
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        Book 1, Unit {u.unitNumber}: {u.title}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Book 2 — Intermediate">
                  {units
                    .filter((u) => u.book === 2)
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        Book 2, Unit {u.unitNumber}: {u.title}
                      </option>
                    ))}
                </optgroup>
              </select>
              <ChevronDown className="pointer-events-none w-4 h-4 text-[#64748B] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Quick Word Preview with Pronunciation */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E8ECF2] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-arabic text-base font-bold text-[#A07020]">
                  {selectedUnit.arabicTitle}
                </span>
                <span className="text-[#64748B] font-medium text-[11px]">
                  ({selectedUnit.title})
                </span>
              </div>
              <button
                type="button"
                onClick={() => speakWord(selectedUnit.arabicTitle)}
                title="Pronounce Arabic title"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-[#FDF8EC] text-[#A07020] border border-[#DFB76C]/40 text-[11px] font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <Volume2 className="w-3 h-3 text-[#DFB76C]" />
                <span>Hear</span>
              </button>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => onStartQuiz(selectedQuizUnitId)}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#07111E] hover:bg-[#13243F] text-white text-sm font-bold shadow-md shadow-[#07111E]/15 border border-white/10 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-[#DFB76C]" />
            <span>Start Vocabulary Quiz</span>
          </motion.button>
        </div>
      </div>

      {/* Speaking Score Chart Card */}
      <div
        className={`luxury-card rounded-2xl p-6 flex flex-col justify-between ${
          isMobileView ? '' : 'col-span-7'
        }`}
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#FDF8EC] text-[#C8922B] flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#0B192C]">
                Speaking Score Progress
              </h3>
              <p className="text-xs text-[#64748B]">
                {isEmpty
                  ? 'Fluency & pronunciation over time'
                  : 'Recent speaking evaluations'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Segmented Curve Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-lg bg-[#F1F4F8] border border-[#E2E8F0] text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setChartMode('current')}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  chartMode === 'current'
                    ? 'bg-white shadow-xs text-[#07111E] font-bold'
                    : 'text-[#64748B] hover:text-[#07111E]'
                }`}
              >
                Current State
              </button>
              <button
                type="button"
                onClick={() => setChartMode('projected')}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  chartMode === 'projected'
                    ? 'bg-gradient-to-r from-[#DFB76C] to-[#C59B4B] text-[#07111E] font-extrabold shadow-xs'
                    : 'text-[#64748B] hover:text-[#07111E]'
                }`}
              >
                Projected Curve ↗
              </button>
            </div>

            {!isEmpty && (
              <span className="text-xs font-semibold text-[#059669] tabular-nums hidden sm:inline">
                Peak {Math.max(...activeHistory.map((s) => s.score))}%
              </span>
            )}
          </div>
        </div>

        {isEmpty ? (
          /* Friendly Empty State with subtle animated curve */
          <div className="mt-4 flex-1 min-h-[168px] rounded-xl bg-[#F8FAFC] border border-dashed border-[#DCE3EC] p-5 flex flex-col items-center justify-center text-center">
            <svg
              width="120"
              height="44"
              viewBox="0 0 120 44"
              fill="none"
              aria-hidden="true"
              className="mb-3"
            >
              <motion.path
                d="M6 34 C 24 34, 32 20, 50 22 C 68 24, 78 10, 114 8"
                stroke="#CBD5E1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <circle cx="50" cy="22" r="3.5" fill="#CBD5E1" />
              <motion.circle
                cx="114"
                cy="8"
                r="4"
                fill="#C8922B"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
            <p className="text-sm font-medium text-[#334155] max-w-xs">
              Complete your first session to see your progress here
            </p>
            <button
              type="button"
              onClick={onStartSpeakingFromEmpty}
              className="mt-2.5 text-xs font-semibold text-[#C8922B] hover:text-[#A9781D] underline underline-offset-4 cursor-pointer"
            >
              Start speaking session →
            </button>
          </div>
        ) : (
          /* Clean Modern Line Chart with Path Draw */
          <div className="mt-4 relative">
            <svg
              viewBox={`0 0 ${chartW} ${chartH}`}
              className="w-full h-auto overflow-visible"
              role="img"
              aria-label="Speaking score line chart"
            >
              <defs>
                <linearGradient id="scoreAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C8922B" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#C8922B" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines (0%, 50%, 100%) */}
              {[0, 50, 100].map((tick) => {
                const y = padT + (1 - tick / 100) * plotH;
                return (
                  <g key={tick}>
                    <line
                      x1={padL}
                      y1={y}
                      x2={chartW - padR}
                      y2={y}
                      stroke="#EEF2F6"
                      strokeWidth="1"
                    />
                    <text
                      x={padL - 8}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-[#94A3B8] text-[10px] tabular-nums"
                    >
                      {tick}%
                    </text>
                  </g>
                );
              })}

              {/* Area Fill */}
              <motion.path
                d={areaPath}
                fill="url(#scoreAreaGrad)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Smooth Curve */}
              <motion.path
                d={linePath}
                fill="none"
                stroke="#0B192C"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Data Points + Date Labels */}
              {points.map((pt, i) => {
                const isHovered = hoveredIdx === i;
                return (
                  <g
                    key={pt.id}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="cursor-pointer"
                  >
                    <motion.circle
                      cx={pt.x}
                      cy={pt.y}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.08, duration: 0.25 }}
                      r={isHovered ? 6 : 4.5}
                      fill={pt.score < 40 ? '#D97706' : '#059669'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <text
                      x={pt.x}
                      y={chartH - 6}
                      textAnchor="middle"
                      className="fill-[#64748B] text-[10px] tabular-nums"
                    >
                      {pt.dateLabel}
                    </text>

                    {/* Hover Tooltip */}
                    {isHovered && (
                      <g
                        transform={`translate(${Math.min(
                          Math.max(pt.x, 70),
                          chartW - 70
                        )}, ${Math.max(pt.y - 34, 18)})`}
                      >
                        <rect
                          x="-66"
                          y="-18"
                          width="132"
                          height="28"
                          rx="8"
                          fill="#0B192C"
                        />
                        <text
                          x="0"
                          y="-1"
                          textAnchor="middle"
                          className="fill-white text-[10px] font-semibold tabular-nums"
                        >
                          {pt.unitLabel} · {pt.score}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
