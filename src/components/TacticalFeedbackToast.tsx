import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Heart, ShieldCheck, ArrowRight, Award, AlertTriangle, Users, Flame, HeartCrack } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TacticalOption, CharacterId } from '../types';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';

interface TacticalFeedbackToastProps {
  decision: TacticalOption;
  onContinue: () => void;
}

export const TacticalFeedbackToast: React.FC<TacticalFeedbackToastProps> = ({
  decision,
  onContinue,
}) => {
  const isPositive = decision.isPositive;
  const afEntries = Object.entries(decision.afChanges || {}) as [CharacterId, number][];

  // Analyze affinity changes pattern
  const positiveCount = afEntries.filter(([, val]) => val > 0).length;
  const negativeCount = afEntries.filter(([, val]) => val < 0).length;

  let patternTag = '【战术执行结算】';
  let patternColor = 'text-[#c8a05e] border-[#c8a05e]/40';

  if (positiveCount > 0 && negativeCount > 0) {
    patternTag = '【战术割舍 · 核心得利与边路抗压】';
    patternColor = 'text-amber-300 border-amber-400/50 bg-amber-950/30';
  } else if (positiveCount > 1 && negativeCount === 0) {
    patternTag = '【全队默契共鸣 · 多人好感提升】';
    patternColor = 'text-emerald-300 border-emerald-400/50 bg-emerald-950/30';
  } else if (positiveCount === 1 && negativeCount === 0) {
    patternTag = '【核心执行高光 · 单人好感提升】';
    patternColor = 'text-cyan-300 border-cyan-400/50 bg-cyan-950/30';
  } else if (negativeCount > 1 && positiveCount === 0) {
    patternTag = '【严重指挥失误 · 全员士气受挫】';
    patternColor = 'text-rose-300 border-rose-500/50 bg-rose-950/30';
  } else if (negativeCount === 1 && positiveCount === 0) {
    patternTag = '【单兵冒进掉点 · 选手好感下降】';
    patternColor = 'text-rose-400 border-rose-500/50 bg-rose-950/30';
  }

  useEffect(() => {
    if (isPositive) {
      soundEngine.playVictoryFanfare();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#c8a05e', '#42f59e', '#38bdf8', '#f472b6']
        });
      } catch {
        // Confetti fallback
      }
    } else {
      soundEngine.playAlarmSound();
    }
  }, [isPositive]);

  return (
    <div className="absolute inset-0 z-50 bg-[#050b1a]/85 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-[#050b1a] border-2 border-[#c8a05e] rounded-2xl p-5 sm:p-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden text-center"
      >
        {/* Glow backdrop */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: isPositive ? '#42f59e' : '#ef4444' }}
        />

        {/* Top Status Icon */}
        <div className="flex justify-center mb-2.5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xl ${
              isPositive
                ? 'bg-[#0a1e45] border-[#42f59e] text-[#42f59e] shadow-[0_0_15px_rgba(66,245,158,0.3)]'
                : 'bg-[#0a1e45] border-[#ef4444] text-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.3)]'
            }`}
          >
            {isPositive ? (
              <Award className="w-6 h-6 animate-bounce" />
            ) : (
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            )}
          </div>
        </div>

        {/* Dynamic Pattern Badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase mb-2 border ${patternColor}`}>
          {patternTag}
        </div>

        <h3 className="text-lg sm:text-xl font-black text-white mb-3 tracking-wide">
          {decision.tacticalTitle}
        </h3>

        {/* Dual Top Metric & Affinity Impact Breakdown */}
        <div className="space-y-2.5 mb-4">
          {/* TP Delta Bar */}
          <div
            className={`p-2.5 rounded-xl border flex items-center justify-between px-4 ${
              isPositive
                ? 'bg-[#0a1e45]/90 border-[#42f59e]/60 text-[#42f59e]'
                : 'bg-[#0a1e45]/90 border-[#ef4444]/60 text-[#ef4444]'
            }`}
          >
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              {isPositive ? <TrendingUp className="w-4 h-4 text-[#42f59e]" /> : <TrendingDown className="w-4 h-4 text-[#ef4444]" />}
              战术领先度 (Tactical Points)
            </span>
            <span className="text-xl font-black font-mono tracking-tight">
              {decision.tpDelta > 0 ? `+${decision.tpDelta}` : decision.tpDelta} <span className="text-xs font-normal">TP</span>
            </span>
          </div>

          {/* Granular Character Affinity Changes Cards */}
          <div className="p-3 rounded-xl bg-[#0a1e45]/90 border border-[#c8a05e]/40 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#c8a05e] flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                全队成员好感度实时变动 (Affinity Impact)
              </span>
              <span className="text-[10px] text-slate-400">
                受影响成员: {afEntries.length} 人
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {afEntries.map(([charId, delta]) => {
                const char = CHARACTERS[charId];
                const isCharPositive = delta > 0;
                return (
                  <div
                    key={charId}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs ${
                      isCharPositive
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-600 flex-shrink-0 bg-slate-800">
                        {char?.portrait ? (
                          <img src={char.portrait} alt={char.name} className="w-full h-full object-cover" />
                        ) : (
                          <Heart className="w-4 h-4 m-1 text-slate-400" />
                        )}
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-white leading-none truncate">
                          {char?.name || charId}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono leading-tight">
                          {char?.role || '队员'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 font-mono font-black text-sm flex-shrink-0">
                      {isCharPositive ? (
                        <>
                          <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                          <span className="text-emerald-400">+{delta}</span>
                        </>
                      ) : (
                        <>
                          <HeartCrack className="w-3 h-3 text-rose-400" />
                          <span className="text-rose-400">{delta}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tactical Cause & Coach Advice */}
        <div className="text-left space-y-2 p-3 rounded-xl bg-[#0a1e45]/90 border border-slate-700/80 mb-5 text-xs">
          <div>
            <span className="font-bold text-[#c8a05e]">【战术成因剖析】</span>
            <span className="text-slate-200 ml-1 leading-relaxed">{decision.rootCauseAnalysis}</span>
          </div>
          <div>
            <span className="font-bold text-[#42f59e]">【导师战术建议】</span>
            <span className="text-slate-300 ml-1 leading-relaxed">{decision.coachAdvice}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          id="btn-feedback-continue"
          onClick={() => {
            soundEngine.playClickSound();
            onContinue();
          }}
          className="w-full py-3 px-5 rounded-xl bg-[#c8a05e] hover:bg-[#d8b06e] text-black font-black text-sm shadow-[0_0_20px_rgba(200,160,94,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#c8a05e]"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>确认并进入下一战术阶段</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
