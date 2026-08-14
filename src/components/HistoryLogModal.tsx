import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, Clock, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { DialogueLine, DecisionRecord } from '../types';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';

interface HistoryLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  dialogueHistory: DialogueLine[];
  decisions: DecisionRecord[];
}

export const HistoryLogModal: React.FC<HistoryLogModalProps> = ({
  isOpen,
  onClose,
  dialogueHistory,
  decisions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[85vh] bg-[#050b1a] border-2 border-[#c8a05e] rounded-3xl shadow-[0_0_50px_rgba(200,160,94,0.3)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8a05e]/30 bg-[#0a1e45]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0a1e45] border border-[#c8a05e] text-[#c8a05e] font-black flex items-center justify-center text-sm shadow">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">对局履历 · 剧本台词与战术记录</h2>
              <p className="text-xs text-[#c8a05e]">战术调度与对局台词实录</p>
            </div>
          </div>

          <button
            id="btn-history-close"
            onClick={() => {
              soundEngine.playClickSound();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-sm">
          {/* Tactical Decisions Summary */}
          {decisions.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-[#0a1e45]/60 border border-[#c8a05e]/30">
              <h3 className="text-xs font-bold text-[#c8a05e] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                已下达的战术决策历史 ({decisions.length})
              </h3>
              <div className="space-y-2.5">
                {decisions.map((d, i) => {
                  const hero = CHARACTERS[d.heroId];
                  return (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#050b1a] border border-slate-700 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#c8a05e]">第 {d.actId} 幕</span>
                          <span className="text-xs font-semibold text-white">{d.tacticalTitle}</span>
                        </div>
                        <p className="text-xs text-slate-300">{d.choiceSelectedText}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span
                          className={`text-xs font-black font-mono px-2 py-0.5 rounded ${
                            d.isPositive ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                          }`}
                        >
                          {d.tpDelta > 0 ? `+${d.tpDelta}` : d.tpDelta} TP
                        </span>
                        <div className="flex flex-wrap items-center justify-end gap-1 max-w-[180px]">
                          {Object.entries(d.afChanges || {}).map(([charId, deltaValue]) => {
                            const delta = Number(deltaValue) || 0;
                            const c = CHARACTERS[charId as keyof typeof CHARACTERS];
                            const isPositive = delta > 0;
                            return (
                              <span
                                key={charId}
                                className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 font-mono ${
                                  isPositive
                                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                                }`}
                              >
                                {c?.name?.slice(0, 2) || charId}: {isPositive ? `+${delta}` : delta}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dialogue Lines */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              对局台词实录
            </h3>
            {dialogueHistory.map((line, idx) => {
              const char = line.characterId ? CHARACTERS[line.characterId] : undefined;
              return (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-900/60 transition-colors">
                  <div
                    className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-bold text-white shadow-sm mt-0.5"
                    style={{ backgroundColor: char ? char.color : '#c8a05e' }}
                  >
                    {line.speaker}
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{line.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
