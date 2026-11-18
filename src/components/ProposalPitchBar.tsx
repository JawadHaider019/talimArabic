import React, { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Maximize2,
  Camera,
  Sparkles,
  Layers,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Info,
  Download,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';

export type DeviceMode = 'responsive' | 'desktop' | 'mobile';
export type PresetDataMode = 'bubble' | 'advanced';

interface ProposalPitchBarProps {
  deviceMode: DeviceMode;
  onChangeDeviceMode: (mode: DeviceMode) => void;
  presetDataMode: PresetDataMode;
  onTogglePresetData: (mode: PresetDataMode) => void;
  // Frame Triggers
  onShowHome: () => void;
  onShowLiveSession: () => void;
  onShowUpdatingResults: () => void;
  onShowOnboarding: () => void;
  onShowUpgrade: () => void;
  onShowPlacement: () => void;
  activeFrameName: string;
  captureContainerId: string;
}

export function ProposalPitchBar({
  deviceMode,
  onChangeDeviceMode,
  presetDataMode,
  onTogglePresetData,
  onShowHome,
  onShowLiveSession,
  onShowUpdatingResults,
  onShowOnboarding,
  onShowUpgrade,
  onShowPlacement,
  activeFrameName,
  captureContainerId,
}: ProposalPitchBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showPitchDoc, setShowPitchDoc] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPng = async () => {
    const el = document.getElementById(captureContainerId);
    if (!el) return;

    try {
      setIsExporting(true);
      // Wait for any animations to settle
      await new Promise((r) => setTimeout(r, 250));

      const dataUrl = await toPng(el, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#F8F9FB',
      });

      const fileName = `talimarabic-${activeFrameName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${deviceMode}-${Date.now()}.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export PNG:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Floating Presentation Control Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl select-none">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0B192C]/95 backdrop-blur-md text-white rounded-2xl border border-[#DFB76C]/40 shadow-2xl shadow-[#0B192C]/40 overflow-hidden"
        >
          {/* Top Bar Header Strip */}
          <div className="px-4 py-2 bg-gradient-to-r from-[#0F2038] to-[#0B192C] border-b border-white/10 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DFB76C] animate-pulse" />
              <span className="font-extrabold tracking-tight text-[#DFB76C] uppercase text-[11px]">
                Client Pitch &amp; Proposal Controller
              </span>
              <span className="hidden sm:inline text-white/40">·</span>
              <span className="hidden sm:inline text-[#CBD5E1]">
                Active: <strong className="text-white font-semibold">{activeFrameName}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPitchDoc(true)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#F5DEB3] font-semibold text-[11px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                title="View proposal comparison breakdown"
              >
                <Info className="w-3.5 h-3.5 text-[#DFB76C]" />
                <span className="hidden sm:inline">8 Flaws Fixed</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded((v) => !v)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#CBD5E1] transition-colors cursor-pointer"
                aria-label={isExpanded ? 'Collapse controls' : 'Expand controls'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expandable Controls Panel */}
          {isExpanded && (
            <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* 1. Device Viewport Mode */}
              <div className="md:col-span-3 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Viewport Preview
                </span>
                <div className="grid grid-cols-3 gap-1 bg-white/[0.08] p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => onChangeDeviceMode('desktop')}
                    className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      deviceMode === 'desktop'
                        ? 'bg-[#DFB76C] text-[#07111E] shadow-sm'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                    title="1440px Desktop Viewport"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>1440px</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeDeviceMode('mobile')}
                    className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      deviceMode === 'mobile'
                        ? 'bg-[#DFB76C] text-[#07111E] shadow-sm'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                    title="390px iPhone Viewport"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>390px</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onChangeDeviceMode('responsive')}
                    className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      deviceMode === 'responsive'
                        ? 'bg-[#DFB76C] text-[#07111E] shadow-sm'
                        : 'text-[#CBD5E1] hover:text-white'
                    }`}
                    title="Full Width Responsive"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Full</span>
                  </button>
                </div>
              </div>

              {/* 2. Bonus Frame Switcher */}
              <div className="md:col-span-5 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Client Proposal Deliverables
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={onShowHome}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeFrameName === 'Home'
                        ? 'bg-[#DFB76C] text-[#07111E]'
                        : 'bg-white/10 hover:bg-white/15 text-[#CBD5E1]'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    type="button"
                    onClick={onShowLiveSession}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeFrameName === 'Live Voice Session (Frame A)'
                        ? 'bg-[#DFB76C] text-[#07111E]'
                        : 'bg-white/10 hover:bg-white/15 text-[#CBD5E1]'
                    }`}
                  >
                    Frame A (Live Voice)
                  </button>
                  <button
                    type="button"
                    onClick={onShowUpdatingResults}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeFrameName === 'Updating Results (Frame B)'
                        ? 'bg-[#DFB76C] text-[#07111E]'
                        : 'bg-white/10 hover:bg-white/15 text-[#CBD5E1]'
                    }`}
                  >
                    Frame B (Updating)
                  </button>
                  <button
                    type="button"
                    onClick={onShowOnboarding}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeFrameName === 'Onboarding Modal (Frame C)'
                        ? 'bg-[#DFB76C] text-[#07111E]'
                        : 'bg-white/10 hover:bg-white/15 text-[#CBD5E1]'
                    }`}
                  >
                    Frame C (Onboarding)
                  </button>
                </div>
              </div>

              {/* 3. Data Persona + 1-Click PNG Exporter */}
              <div className="md:col-span-4 flex items-center justify-end gap-2.5 pt-1 md:pt-0">
                {/* Data Persona Toggle */}
                <button
                  type="button"
                  onClick={() =>
                    onTogglePresetData(presetDataMode === 'bubble' ? 'advanced' : 'bubble')
                  }
                  className="flex-1 md:flex-initial min-h-[40px] px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  title="Toggle between Client's Real Bubble state vs. Advanced progress state"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#DFB76C]" />
                  <span className="truncate">
                    {presetDataMode === 'bubble' ? 'Data: Client Real' : 'Data: Advanced'}
                  </span>
                </button>

                {/* 1-Click High-Res PNG Exporter */}
                <button
                  type="button"
                  onClick={handleExportPng}
                  disabled={isExporting}
                  className="flex-1 md:flex-initial min-h-[40px] px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#DFB76C] via-[#F3D99B] to-[#C59B4B] hover:from-[#F3D99B] hover:to-[#DFB76C] text-[#07111E] text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-[#DFB76C]/30 border border-[#FFF0C8]/40 transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                  title="Export high-resolution PNG of the current frame to send to client"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Exporting PNG...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 stroke-[2.2]" />
                      <span>Export PNG</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* "Why This Beats Bubble" Pitch Sheet Modal */}
      <AnimatePresence>
        {showPitchDoc && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pitch-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111E]/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="bg-white w-full max-w-2xl rounded-3xl border border-[#DFB76C]/40 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0F2038] to-[#0B192C] text-white p-6 border-b border-[#DFB76C]/30 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/[0.08] text-[#F5DEB3] border border-[#DFB76C]/40">
                    Client Proposal Cheat-Sheet
                  </span>
                  <h3 id="pitch-title" className="text-xl font-extrabold text-white mt-2">
                    How This Custom Rebuild Solves Every Bubble Flaw
                  </h3>
                  <p className="text-xs text-[#CBD5E1] mt-1 font-medium">
                    Send these exact talking points to your client to demonstrate why migrating to Next.js is essential.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPitchDoc(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Flaws Comparison Grid */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                {[
                  {
                    num: '1',
                    bubble: 'Everything stacked on one long page with no clear visual hierarchy.',
                    custom: 'Strict information hierarchy: Hero First, Goal Progress, Practice, and 4-column Curriculum cards.',
                  },
                  {
                    num: '2',
                    bubble: '“Log out” is the most prominent button on screen; “Start Conversation” is buried.',
                    custom: '“Log out” neatly tucked into avatar menu; “Start speaking session” is the unmissable gold primary action.',
                  },
                  {
                    num: '3',
                    bubble: '3 identical “Choose Unit” dropdowns creating extreme user confusion.',
                    custom: 'Unified single-modal unit picker + instant switch from anywhere on the page.',
                  },
                  {
                    num: '4',
                    bubble: '“New students: select your starting unit” shows on the dashboard forever.',
                    custom: 'Moved to a polished, first-time student onboarding modal triggered only when relevant.',
                  },
                  {
                    num: '5',
                    bubble: 'Weekly goal is 5 empty grey circles and progress is plain unstyled text.',
                    custom: 'Dual-tone radial progress ring + interactive streak flame badge + animated checkmark milestone dots.',
                  },
                  {
                    num: '6',
                    bubble: 'Speaking score chart is completely empty and looks broken.',
                    custom: 'Smooth curved gradient area chart with date tooltips and high-fluency evaluations.',
                  },
                  {
                    num: '7',
                    bubble: '32-cell spreadsheet table with empty placeholders; unusable on mobile.',
                    custom: 'Clean 4-column card grid (2-column/card list on mobile) with status chips and vocabulary progress meters.',
                  },
                  {
                    num: '8',
                    bubble: 'No Arabic typography or cultural warmth anywhere in an Arabic learning app.',
                    custom: 'Authentic 8-fold Islamic Girih lattice, Arabic calligraphy, and native diacritics for all units.',
                  },
                ].map((item) => (
                  <div key={item.num} className="p-3.5 rounded-xl border border-[#E5E9F0] bg-[#FAFBFD] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#0B192C] text-[#DFB76C] text-[11px] font-bold flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <strong className="text-red-700 font-bold">Bubble Problem:</strong>{' '}
                      <span className="text-[#64748B]">{item.bubble}</span>
                    </div>
                    <div className="pl-7 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                      <strong className="text-[#059669] font-bold">Our Solution:</strong>{' '}
                      <span className="text-[#07111E] font-medium">{item.custom}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#F8FAFC] border-t border-[#EEF2F6] flex items-center justify-between">
                <span className="text-xs text-[#64748B] font-medium">Ready to showcase to your client</span>
                <button
                  type="button"
                  onClick={() => setShowPitchDoc(false)}
                  className="px-4 py-2 rounded-xl bg-[#07111E] text-white text-xs font-bold hover:bg-[#13243F] cursor-pointer"
                >
                  Close &amp; Continue Presenting
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
