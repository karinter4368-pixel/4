import React from 'react';
import { Volume2, VolumeX, Users, BookOpen, Save, Award, ShieldAlert, Sparkles, Trophy, Home } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderHudProps {
  currentActId: number;
  currentActTitle: string;
  tp: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenRoster: () => void;
  onOpenHistory: () => void;
  onOpenSaveLoad: () => void;
  onOpenGallery: () => void;
  onReturnHome: () => void;
}

export const HeaderHud: React.FC<HeaderHudProps> = ({
  currentActId,
  currentActTitle,
  tp,
  isMuted,
  onToggleMute,
  onOpenRoster,
  onOpenHistory,
  onOpenSaveLoad,
  onOpenGallery,
  onReturnHome,
}) => {
  // Status check: TP >= 80 DOMINATING, TP <= 35 CRISIS, else BALANCED
  const isOverwhelming = tp >= 80;
  const isCrisis = tp <= 35;

  let tpStatusText = '势均力敌 · 战术胶着';
  if (isOverwhelming) tpStatusText = '大优压制 · 胜券在握';
  else if (isCrisis) tpStatusText = '绝境危机 · 命悬一线';

  return (
    <header className="h-16 bg-[#0a1e45] border-b-2 border-[#c8a05e] flex items-center justify-between px-3 sm:px-6 shadow-lg z-30 relative select-none">
      {/* Left: High-Density Title & Current Phase */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          id="btn-hud-home"
          onClick={() => {
            soundEngine.playClickSound();
            onReturnHome();
          }}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          title="返回主页"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#c8a05e] to-[#78571c] p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-[#050b1a] rounded-[6px] flex items-center justify-center">
              <Trophy className="w-4 h-4 text-[#c8a05e]" />
            </div>
          </div>
          <div>
            <div className="text-[#c8a05e] font-bold text-sm sm:text-lg tracking-tighter whitespace-nowrap">
              稷下战术指挥官
            </div>
            <div className="text-[10px] text-white/70 font-semibold hidden sm:block">
              稷下战队 · 战术全息指挥中枢
            </div>
          </div>
        </button>

        <div className="h-6 w-px bg-white/20 hidden md:block" />

        <div className="hidden md:flex flex-col">
          <span className="text-[10px] uppercase text-[#c8a05e] font-bold opacity-80 tracking-wider">
            当前战局阶段
          </span>
          <span className="text-xs sm:text-sm font-medium tracking-wider text-slate-100 truncate max-w-[240px]">
            第 0{currentActId} 幕: {currentActTitle.split('·')[1] || currentActTitle}
          </span>
        </div>
      </div>

      {/* Center/Right: High Density Tactical Points (TP) Meter */}
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase text-[#42f59e] font-bold tracking-wider">
              战术领先度 (TP)
            </span>
            {isOverwhelming && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#42f59e] animate-ping" />
            )}
            {isCrisis && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-ping" />
            )}
          </div>

          <div className="w-36 sm:w-56 md:w-64 h-3.5 bg-black/60 border border-[#42f59e]/30 rounded-full mt-1 overflow-hidden relative shadow-inner">
            <div
              className={`h-full transition-all duration-500 ${
                isOverwhelming
                  ? 'bg-gradient-to-r from-[#42f59e] to-[#c8a05e]'
                  : isCrisis
                  ? 'bg-gradient-to-r from-[#ef4444] to-[#f59e0b]'
                  : 'bg-gradient-to-r from-[#0284c7] to-[#c8a05e]'
              }`}
              style={{ width: `${Math.max(0, Math.min(100, tp))}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[9px] font-black font-mono tracking-tight text-white drop-shadow">
              {tp} / 100 - {tpStatusText.split('·')[0].trim()}
            </div>
          </div>
        </div>

        {/* High Density Square/Crisp Cyber Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="btn-hud-roster"
            onClick={() => {
              soundEngine.playClickSound();
              onOpenRoster();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 border border-[#c8a05e] rounded bg-[#050b1a]/80 flex items-center justify-center text-xs font-bold text-[#c8a05e] hover:bg-[#c8a05e]/20 hover:text-white transition-colors cursor-pointer shadow"
            title="战队名册"
          >
            <Users className="w-4 h-4" />
          </button>

          <button
            id="btn-hud-history"
            onClick={() => {
              soundEngine.playClickSound();
              onOpenHistory();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 border border-[#c8a05e] rounded bg-[#050b1a]/80 flex items-center justify-center text-xs font-bold text-[#c8a05e] hover:bg-[#c8a05e]/20 hover:text-white transition-colors cursor-pointer shadow"
            title="对局履历"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          <button
            id="btn-hud-gallery"
            onClick={() => {
              soundEngine.playClickSound();
              onOpenGallery();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 border border-[#c8a05e] rounded bg-[#050b1a]/80 flex items-center justify-center text-xs font-bold text-[#c8a05e] hover:bg-[#c8a05e]/20 hover:text-white transition-colors cursor-pointer shadow"
            title="结局图鉴"
          >
            <Award className="w-4 h-4" />
          </button>

          <button
            id="btn-hud-save"
            onClick={() => {
              soundEngine.playClickSound();
              onOpenSaveLoad();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 border border-[#c8a05e] rounded bg-[#050b1a]/80 flex items-center justify-center text-xs font-bold text-[#c8a05e] hover:bg-[#c8a05e]/20 hover:text-white transition-colors cursor-pointer shadow"
            title="存读档"
          >
            <Save className="w-4 h-4" />
          </button>

          <button
            id="btn-hud-mute"
            onClick={() => {
              soundEngine.playClickSound();
              onToggleMute();
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 border rounded flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shadow ${
              isMuted
                ? 'border-[#ef4444] bg-[#ef4444]/20 text-[#ef4444]'
                : 'border-[#c8a05e] bg-[#050b1a]/80 text-[#c8a05e] hover:bg-[#c8a05e]/20 hover:text-white'
            }`}
            title={isMuted ? '开启声音' : '静音'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
