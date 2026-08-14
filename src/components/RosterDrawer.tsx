import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Shield, Zap, BookOpen } from 'lucide-react';
import { CharacterId } from '../types';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';

interface RosterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  afMap: Record<CharacterId, number>;
}

export const RosterDrawer: React.FC<RosterDrawerProps> = ({
  isOpen,
  onClose,
  afMap,
}) => {
  const heroList: CharacterId[] = ['yu_yalan', 'chen_chunchi', 'liang_jinhao', 'fang_jialu', 'wu_luya'];
  const [selectedHeroId, setSelectedHeroId] = useState<CharacterId>('yu_yalan');

  if (!isOpen) return null;

  const currentHero = CHARACTERS[selectedHeroId];
  const currentAf = afMap[selectedHeroId] || 0;

  // Affinity tier calculation
  let afLevelTitle = '初遇相知 (Lv.1)';
  if (currentAf >= 24) afLevelTitle = '生死不渝 · 终极誓约 (Lv.5)';
  else if (currentAf >= 18) afLevelTitle = '心灵相通 · 绝对信赖 (Lv.4)';
  else if (currentAf >= 12) afLevelTitle = '并肩默契 · 战术协同 (Lv.3)';
  else if (currentAf >= 6) afLevelTitle = '互信渐生 · 战术共鸣 (Lv.2)';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#050b1a] border-2 border-[#c8a05e] rounded-3xl shadow-[0_0_50px_rgba(200,160,94,0.3)] flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8a05e]/30 bg-[#0a1e45]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c8a05e] text-black font-black flex items-center justify-center text-sm shadow">
              名
            </div>
            <div>
              <h2 className="text-lg font-black text-white">稷下战队 · 核心传承者战队名册</h2>
              <p className="text-xs text-[#c8a05e]">传承者专属档案与羁绊枢纽</p>
            </div>
          </div>

          <button
            id="btn-roster-close"
            onClick={() => {
              soundEngine.playClickSound();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Selector Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800 overflow-x-auto bg-[#07132c]/90">
          {heroList.map((hid) => {
            const h = CHARACTERS[hid];
            const isSelected = selectedHeroId === hid;
            const af = afMap[hid] || 0;
            return (
              <button
                key={hid}
                id={`btn-roster-tab-${hid}`}
                onClick={() => {
                  soundEngine.playClickSound();
                  setSelectedHeroId(hid);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex-shrink-0 border ${
                  isSelected
                    ? 'border-[#c8a05e] shadow-[0_0_12px_rgba(200,160,94,0.4)] text-white'
                    : 'border-slate-800 bg-[#0a1e45]/50 text-slate-400 hover:text-slate-200'
                }`}
                style={{
                  backgroundColor: isSelected ? `${h.color}33` : undefined,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: h.color }}
                />
                <span>{h.name}</span>
                <span className="flex items-center gap-0.5 text-rose-400 font-mono">
                  <Heart className="w-3 h-3 fill-rose-400" />
                  {af}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hero Detail View */}
        <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Portrait & Affinity Meter */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0a1e45]/40 border border-slate-800 relative overflow-hidden">
            <div
              className="absolute inset-0 blur-3xl opacity-25"
              style={{ backgroundColor: currentHero.color }}
            />

            <div className="relative w-48 sm:w-56 h-64 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/20 mb-4">
              <img
                src={currentHero.portrait}
                alt={currentHero.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 backdrop-blur-sm text-[#c8a05e] border border-[#c8a05e]/40">
                {currentHero.prototype}
              </div>
            </div>

            {/* Affinity Gauge */}
            <div className="w-full bg-[#050b1a] p-3.5 rounded-xl border border-slate-700/80">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-300 font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  亲和羁绊度 (AF)
                </span>
                <span className="font-mono font-bold text-rose-400">{currentAf} AF</span>
              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, (currentAf / 25) * 100)}%` }}
                />
              </div>

              <div className="text-[11px] text-amber-300 font-semibold text-center">
                {afLevelTitle}
              </div>
            </div>
          </div>

          {/* Right Column: Lore & Skills */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Header Titles */}
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-black text-white">{currentHero.name}</h3>
                <span className="text-xs text-slate-400 font-serif italic">{currentHero.pinyin}</span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: `${currentHero.color}33`, color: currentHero.color }}
                >
                  {currentHero.role}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#c8a05e] mb-3">
                {currentHero.title}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {currentHero.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] bg-slate-800/80 text-slate-300 border border-slate-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Quote */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0a1e45] to-[#050b1a] border-l-4 border-[#c8a05e] mb-4 text-xs sm:text-sm text-slate-200 italic">
                “{currentHero.quote}”
              </div>

              {/* Biography */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#c8a05e]" />
                  传承者背景纪实
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentHero.bio}
                </p>
              </div>

              {/* Exclusive Skill */}
              <div className="p-3.5 rounded-xl bg-[#0a1e45]/80 border border-slate-700/80">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300">
                    专属传承绝技 · 【{currentHero.skillName}】
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  {currentHero.skillDesc}
                </p>
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              JIXIA ACADEMY ESPORTS ARCHIVE · CONFIDENTIAL
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
