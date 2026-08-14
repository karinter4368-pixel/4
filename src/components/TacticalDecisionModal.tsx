import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Crosshair, Sparkles, HelpCircle } from 'lucide-react';
import { TacticalOption } from '../types';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';

interface TacticalDecisionModalProps {
  tacticalPrompt: string;
  options: TacticalOption[];
  onSelectOption: (option: TacticalOption) => void;
}

export const TacticalDecisionModal: React.FC<TacticalDecisionModalProps> = ({
  tacticalPrompt,
  options,
  onSelectOption,
}) => {
  return (
    <div className="absolute inset-0 z-40 bg-[#050b1a]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-3xl bg-[#050b1a] border-2 border-[#c8a05e] rounded-xl p-4 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Holographic Header Deco */}
        <div className="flex items-center justify-between border-b border-[#c8a05e]/30 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0a1e45] border border-[#c8a05e] flex items-center justify-center flex-shrink-0">
              <Crosshair className="w-4 h-4 text-[#c8a05e] animate-spin-slow" />
            </div>
            <div>
              <div className="text-[10px] font-black text-[#c8a05e] tracking-widest uppercase">
                战术指挥协议 · 战术决策终端
              </div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-wide">
                实时临场战术决策 (盲测决断)
              </h2>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0a1e45] border border-[#c8a05e]/50 text-xs font-bold text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#42f59e]" />
            <span>全息实战演练</span>
          </div>
        </div>

        {/* Prompt Card */}
        <div className="mb-4 p-3.5 rounded-lg bg-[#0a1e45]/90 border border-slate-700/80 shadow-inner">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#c8a05e] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#c8a05e] mb-0.5">
                主教练全息战况研判
              </div>
              <p className="text-slate-100 text-xs sm:text-sm font-medium leading-relaxed">
                {tacticalPrompt}
              </p>
            </div>
          </div>
        </div>

        {/* Blind Choices List (Strictly NO numeric results/percentages revealed!) */}
        <div className="space-y-2.5">
          {options.map((option, index) => {
            const hero = CHARACTERS[option.heroId];
            return (
              <motion.button
                key={option.id}
                id={`btn-tactical-option-${index}`}
                whileHover={{ scale: 1.01, x: 3 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  soundEngine.playTacticalOptionSound();
                  onSelectOption(option);
                }}
                className="w-full text-left p-3.5 sm:p-4 rounded-lg bg-[#0a1e45]/90 hover:bg-[#122e66] border border-[#c8a05e]/40 hover:border-[#c8a05e] text-slate-100 shadow-md hover:shadow-[0_0_20px_rgba(200,160,94,0.3)] transition-all duration-150 cursor-pointer group relative overflow-hidden"
              >
                {/* Left Colored Accent Bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: hero ? hero.color : '#c8a05e' }}
                />

                <div className="flex items-start justify-between gap-3 pl-2">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded bg-[#050b1a] border border-[#c8a05e]/60 text-[#c8a05e] text-xs font-black flex items-center justify-center group-hover:bg-[#c8a05e] group-hover:text-black transition-colors font-mono">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-white leading-snug">
                        {option.choiceText}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity text-xs font-bold text-[#c8a05e]">
                    <span className="hidden sm:inline">下达指令</span>
                    <Crosshair className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2.5">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-[#c8a05e]" />
            <span>每个战术指令都将直接影响全队战术领先度与核心执行者的亲和羁绊。</span>
          </span>
          <span className="hidden sm:inline text-slate-400 font-mono text-[10px]">临场决策</span>
        </div>
      </motion.div>
    </div>
  );
};
