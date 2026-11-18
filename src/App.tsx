import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  INITIAL_UNITS,
  STUDENT_PROFILE,
  SAMPLE_SCORE_HISTORY,
  CurriculumUnit,
  SpeakingSessionPoint,
} from './data/curriculum';
import { TopBar } from './components/TopBar';
import { HeroCard, HeroMode } from './components/HeroCard';
import { WeeklyGoalAndStats } from './components/WeeklyGoalAndStats';
import { PracticeAndChartRow } from './components/PracticeAndChartRow';
import { CurriculumSection } from './components/CurriculumSection';
import { OnboardingModal } from './components/OnboardingModal';
import { UnitPickerModal } from './components/UnitPickerModal';
import { VocabQuizModal } from './components/VocabQuizModal';
import { LoginScreen } from './components/LoginScreen';

const STORAGE_KEY = 'talimarabic_app_v2';

interface PersistedState {
  isLoggedIn: boolean;
  studentEmail: string;
  units: CurriculumUnit[];
  activeUnitId: string;
  activeBook: 1 | 2;
  quizUnitId: string;
  weeklyCompleted: number;
  consecutiveWeeksStreak: number;
  streakAwardedThisWeek: boolean;
  timeStudiedMinutes: number;
  remainingSeconds: number;
  scoreHistory: SpeakingSessionPoint[];
  latestUnitId: string;
}

function loadInitialState(): PersistedState {
  const fallback: PersistedState = {
    isLoggedIn: true,
    studentEmail: STUDENT_PROFILE.email,
    units: INITIAL_UNITS,
    activeUnitId: 'b1-u4',
    activeBook: 1,
    quizUnitId: 'b1-u4',
    weeklyCompleted: STUDENT_PROFILE.weeklyGoalCompleted,
    consecutiveWeeksStreak: STUDENT_PROFILE.weeklyStreakCount,
    streakAwardedThisWeek: false,
    timeStudiedMinutes: STUDENT_PROFILE.timeStudiedMinutes,
    remainingSeconds: STUDENT_PROFILE.sessionRemainingSeconds,
    scoreHistory: SAMPLE_SCORE_HISTORY,
    latestUnitId: 'b1-u4',
  };

  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (!Array.isArray(parsed.units) || parsed.units.length !== 32) {
      return fallback;
    }
    return {
      ...fallback,
      ...parsed,
    };
  } catch {
    return fallback;
  }
}

export default function App() {
  const [initial] = useState<PersistedState>(() => loadInitialState());

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initial.isLoggedIn);
  const [studentEmail, setStudentEmail] = useState<string>(initial.studentEmail);
  const [units, setUnits] = useState<CurriculumUnit[]>(initial.units);
  const [activeUnitId, setActiveUnitId] = useState<string>(initial.activeUnitId);
  const [activeBook, setActiveBook] = useState<1 | 2>(initial.activeBook);
  const [quizUnitId, setQuizUnitId] = useState<string>(initial.quizUnitId);
  const [latestUnitId, setLatestUnitId] = useState<string>(initial.latestUnitId);

  // Weekly & Session state
  const [weeklyCompleted, setWeeklyCompleted] = useState<number>(
    initial.weeklyCompleted
  );
  const [consecutiveWeeksStreak, setConsecutiveWeeksStreak] = useState<number>(
    initial.consecutiveWeeksStreak
  );
  const [streakAwardedThisWeek, setStreakAwardedThisWeek] = useState<boolean>(
    initial.streakAwardedThisWeek
  );
  const [timeStudiedMinutes, setTimeStudiedMinutes] = useState<number>(
    initial.timeStudiedMinutes
  );
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    initial.remainingSeconds
  );
  const [scoreHistory, setScoreHistory] = useState<SpeakingSessionPoint[]>(
    initial.scoreHistory
  );

  // Hero & Live Session state
  const [heroMode, setHeroMode] = useState<HeroMode>('default');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speakerTurn, setSpeakerTurn] = useState<'tutor' | 'student'>('tutor');
  const [updatingStep, setUpdatingStep] = useState<number>(1);
  const [sessionFluencyAccumulator, setSessionFluencyAccumulator] = useState<number>(0);
  const [sessionTurnsCount, setSessionTurnsCount] = useState<number>(0);
  const [sessionElapsedSeconds, setSessionElapsedSeconds] = useState<number>(0);

  // Modals & Notices
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(false);
  const [unitPickerOpen, setUnitPickerOpen] = useState<boolean>(false);
  const [vocabQuizOpen, setVocabQuizOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    try {
      const payload: PersistedState = {
        isLoggedIn,
        studentEmail,
        units,
        activeUnitId,
        activeBook,
        quizUnitId,
        weeklyCompleted,
        consecutiveWeeksStreak,
        streakAwardedThisWeek,
        timeStudiedMinutes,
        remainingSeconds,
        scoreHistory,
        latestUnitId,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [
    isLoggedIn,
    studentEmail,
    units,
    activeUnitId,
    activeBook,
    quizUnitId,
    weeklyCompleted,
    consecutiveWeeksStreak,
    streakAwardedThisWeek,
    timeStudiedMinutes,
    remainingSeconds,
    scoreHistory,
    latestUnitId,
  ]);

  const isMobileView = windowWidth < 768;

  const activeUnit =
    units.find((u) => u.id === activeUnitId) ?? units[2];
  const quizUnit =
    units.find((u) => u.id === quizUnitId) ?? activeUnit;

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  }, []);

  // Live session timer countdown when heroMode === 'live'
  useEffect(() => {
    if (heroMode !== 'live') return;
    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setSessionElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [heroMode]);

  const completeUpdatingSession = useCallback(() => {
    const baseScore = activeUnit.speakingScore ?? 28;
    const calculatedScore =
      sessionTurnsCount > 0
        ? Math.min(96, Math.max(45, Math.round(35 + sessionFluencyAccumulator)))
        : Math.min(92, Math.max(58, baseScore + 44));

    const addedMinutes = Math.max(1, Math.round(sessionElapsedSeconds / 60));
    const passed = calculatedScore >= 40;

    setUnits((prev) =>
      prev.map((u) =>
        u.id === activeUnit.id
          ? {
              ...u,
              status: passed ? 'passed' : 'needs_review',
              speakingScore: calculatedScore,
              vocabCorrect: Math.min(u.vocabTotal, u.vocabCorrect + Math.max(2, sessionTurnsCount * 2)),
              lastPracticed: '18 Nov',
            }
          : u
      )
    );
    setLatestUnitId(activeUnit.id);
    const nextWeekly = Math.min(
      STUDENT_PROFILE.weeklyGoalTarget,
      weeklyCompleted + 1
    );
    setWeeklyCompleted(nextWeekly);
    if (
      nextWeekly >= STUDENT_PROFILE.weeklyGoalTarget &&
      !streakAwardedThisWeek
    ) {
      setConsecutiveWeeksStreak((s) => s + 1);
      setStreakAwardedThisWeek(true);
    }
    setTimeStudiedMinutes((m) => m + addedMinutes);
    setScoreHistory((prev) => [
      ...prev,
      {
        id: `s-${Date.now()}`,
        dateLabel: prev.length === 0 ? '18 Nov' : `Session ${prev.length + 1}`,
        unitLabel: `Unit ${activeUnit.unitNumber} · ${activeUnit.title}`,
        score: calculatedScore,
      },
    ]);
    setSessionFluencyAccumulator(0);
    setSessionTurnsCount(0);
    setSessionElapsedSeconds(0);
    setHeroMode('default');
    showToast(
      `Session scored ${calculatedScore}% — ${activeUnit.title} ${
        passed ? 'marked Passed' : 'updated'
      }.`
    );
  }, [
    activeUnit,
    weeklyCompleted,
    streakAwardedThisWeek,
    sessionFluencyAccumulator,
    sessionTurnsCount,
    sessionElapsedSeconds,
    showToast,
  ]);

  // Auto-advance Updating Results steps and finish cleanly
  useEffect(() => {
    if (heroMode !== 'updating') return;
    setUpdatingStep(1);
    const t1 = window.setTimeout(() => setUpdatingStep(2), 1100);
    const t2 = window.setTimeout(() => setUpdatingStep(3), 2400);
    const t3 = window.setTimeout(() => completeUpdatingSession(), 3900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [heroMode, completeUpdatingSession]);

  const handleStartSession = () => {
    setSessionFluencyAccumulator(0);
    setSessionTurnsCount(0);
    setSessionElapsedSeconds(0);
    setIsMuted(false);
    setSpeakerTurn('tutor');
    setHeroMode('live');
  };

  const handleRecordTurn = (fluencyBoost: number) => {
    setSessionTurnsCount((c) => c + 1);
    setSessionFluencyAccumulator((acc) => Math.min(60, acc + fluencyBoost));
  };

  const handleResetDemo = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUnits(INITIAL_UNITS);
    setActiveUnitId('b1-u4');
    setActiveBook(1);
    setQuizUnitId('b1-u4');
    setLatestUnitId('b1-u4');
    setStudentEmail(STUDENT_PROFILE.email);
    setWeeklyCompleted(STUDENT_PROFILE.weeklyGoalCompleted);
    setConsecutiveWeeksStreak(STUDENT_PROFILE.weeklyStreakCount);
    setStreakAwardedThisWeek(false);
    setTimeStudiedMinutes(STUDENT_PROFILE.timeStudiedMinutes);
    setRemainingSeconds(STUDENT_PROFILE.sessionRemainingSeconds);
    setHeroMode('default');
    setIsMuted(false);
    setOnboardingOpen(false);
    setUnitPickerOpen(false);
    setVocabQuizOpen(false);
    setScoreHistory(SAMPLE_SCORE_HISTORY);
    showToast('Dashboard reset to starting state.');
  };

  const handleSelectUnitFromCurriculum = (unit: CurriculumUnit) => {
    setActiveUnitId(unit.id);
    setQuizUnitId(unit.id);
    setHeroMode('default');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Selected Book ${unit.book}, Unit ${unit.unitNumber}: ${unit.title}`);
  };

  if (!isLoggedIn) {
    return (
      <MotionConfig reducedMotion="user">
        <LoginScreen
          onSignIn={(email, openOnboarding) => {
            setStudentEmail(email);
            setIsLoggedIn(true);
            if (openOnboarding) {
              setOnboardingOpen(true);
            }
          }}
        />
      </MotionConfig>
    );
  }

  // Computed summary metrics from real units state
  const book1Passed = units.filter((u) => u.book === 1 && u.status === 'passed').length;
  const book2Passed = units.filter((u) => u.book === 2 && u.status === 'passed').length;
  const unitsPassed = book1Passed + book2Passed;
  const unitsToRevisit = units.filter((u) => u.status === 'needs_review').length;
  const latestUnit = units.find((u) => u.id === latestUnitId) ?? activeUnit;
  const latestScore = latestUnit.speakingScore;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F8F9FB] text-[#07111E] relative selection:bg-[#DFB76C]/30 selection:text-[#07111E]">
        {/* Subtle Luxury Ambient Background Glows */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="absolute -top-32 right-[15%] w-[580px] h-[580px] bg-gradient-to-b from-[#DFB76C]/10 via-[#DFB76C]/4 to-transparent rounded-full blur-3xl opacity-80" />
          <div className="absolute top-[480px] -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-[#0B192C]/5 to-transparent rounded-full blur-3xl opacity-60" />
        </div>

        {/* 1. Top Bar */}
        <TopBar
          isMobileView={isMobileView}
          studentEmail={studentEmail}
          onOpenOnboarding={() => setOnboardingOpen(true)}
          onResetDemo={handleResetDemo}
          onLogout={() => {
            setHeroMode('default');
            setIsLoggedIn(false);
          }}
        />

        {/* Main Content Container */}
        <main
          className={`relative z-10 w-full ${
            isMobileView ? 'px-4 py-5 space-y-6' : 'px-6 lg:px-8 py-8 space-y-8'
          }`}
        >
          {/* 2. Greeting */}
          <motion.section
            aria-label="Student greeting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
          <div
            className={`flex ${
              isMobileView
                ? 'flex-col gap-2'
                : 'items-end justify-between gap-4'
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B38634]" />
                <p className="font-arabic text-base font-semibold text-[#A07020] text-left">
                  السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ، يُوسُف
                </p>
              </div>
              <h1
                className={`font-bold tracking-tight text-[#07111E] ${
                  isMobileView ? 'text-2xl' : 'text-[32px]'
                }`}
              >
                Assalamu Alaikum 👋, {STUDENT_PROFILE.firstName}
              </h1>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E8ECF2] shadow-xs text-xs font-semibold text-[#5A6B82] tabular-nums self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Wednesday, 18 Nov 2026</span>
            </div>
          </div>
          </motion.section>

          {/* 3. Hero Card ("Continue your lesson" + Live Session + Updating Results) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroCard
              unit={activeUnit}
              mode={heroMode}
              isMobileView={isMobileView}
              remainingSeconds={remainingSeconds}
              isMuted={isMuted}
              speakerTurn={speakerTurn}
              updatingStep={updatingStep}
              onStartSession={handleStartSession}
              onChooseUnit={() => setUnitPickerOpen(true)}
              onToggleMute={() => setIsMuted((m) => !m)}
              onToggleSpeakerTurn={() =>
                setSpeakerTurn((t) => (t === 'tutor' ? 'student' : 'tutor'))
              }
              onRecordTurn={handleRecordTurn}
              onEndSession={() => setHeroMode('updating')}
              onFinishUpdating={completeUpdatingSession}
            />
          </motion.div>

          {/* 4 & 5. Weekly Goal + Quick Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <WeeklyGoalAndStats
              isMobileView={isMobileView}
              weeklyCompleted={weeklyCompleted}
              weeklyTarget={STUDENT_PROFILE.weeklyGoalTarget}
              consecutiveWeeksStreak={consecutiveWeeksStreak}
              weeklyResetLabel={STUDENT_PROFILE.weeklyResetLabel}
              unitsPassed={unitsPassed}
              book1Passed={book1Passed}
              book2Passed={book2Passed}
              totalUnits={units.length}
              timeStudiedMinutes={timeStudiedMinutes}
              unitsToRevisit={unitsToRevisit}
              latestScore={latestScore}
              latestUnitLabel={`Book ${latestUnit.book}, Unit ${latestUnit.unitNumber} · ${latestUnit.title}`}
            />
          </motion.div>

          {/* 6 & 7. Practice (Vocabulary Quiz) + Speaking Score Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <PracticeAndChartRow
              isMobileView={isMobileView}
              units={units}
              selectedQuizUnitId={quizUnitId}
              onChangeQuizUnitId={setQuizUnitId}
              onStartQuiz={() => setVocabQuizOpen(true)}
              scoreHistory={scoreHistory}
              showEmptyChart={scoreHistory.length === 0}
              onStartSpeakingFromEmpty={handleStartSession}
            />
          </motion.div>

          {/* 8. Curriculum (Book 1 / Book 2 Tabs + 4-col Desktop / Card List Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <CurriculumSection
              isMobileView={isMobileView}
              units={units}
              activeBook={activeBook}
              activeUnitId={activeUnitId}
              onChangeBook={setActiveBook}
              onSelectUnit={handleSelectUnitFromCurriculum}
            />
          </motion.div>
        </main>

      {/* First-Time Student Onboarding Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        isMobileView={isMobileView}
        units={units}
        currentUnitId={activeUnitId}
        onConfirm={(unitId) => {
          const chosen = units.find((u) => u.id === unitId);
          if (chosen) {
            setActiveUnitId(chosen.id);
            setQuizUnitId(chosen.id);
            setActiveBook(chosen.book);
            showToast(
              `Starting unit set to Book ${chosen.book}, Unit ${chosen.unitNumber}: ${chosen.title}`
            );
          }
          setOnboardingOpen(false);
        }}
        onClose={() => setOnboardingOpen(false)}
      />

      {/* Unit Picker Modal ("Choose a different unit") */}
      <UnitPickerModal
        isOpen={unitPickerOpen}
        isMobileView={isMobileView}
        units={units}
        activeUnitId={activeUnitId}
        onSelect={(u) => {
          setActiveUnitId(u.id);
          setQuizUnitId(u.id);
          setActiveBook(u.book);
          showToast(`Lesson switched to Book ${u.book}, Unit ${u.unitNumber}: ${u.title}`);
        }}
        onClose={() => setUnitPickerOpen(false)}
      />

      {/* Interactive Vocabulary Quiz Modal */}
      <VocabQuizModal
        isOpen={vocabQuizOpen}
        isMobileView={isMobileView}
        unit={quizUnit}
        onComplete={(uId, correctCount) => {
          if (correctCount > 0) {
            setUnits((prev) =>
              prev.map((u) =>
                u.id === uId
                  ? {
                      ...u,
                      vocabCorrect: Math.min(
                        u.vocabTotal,
                        u.vocabCorrect + correctCount
                      ),
                    }
                  : u
              )
            );
          }
          showToast(`Vocabulary quiz saved (+${correctCount} words mastered).`);
        }}
        onClose={() => setVocabQuizOpen(false)}
      />

      {/* Subtle Non-Intrusive Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key={toastMessage}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 left-5 sm:left-auto sm:top-20 sm:bottom-auto z-50 bg-[#0B192C] text-white text-xs font-medium px-4 py-3 rounded-xl shadow-lg border border-white/15"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
