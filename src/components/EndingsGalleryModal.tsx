import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Award, Lock, Sparkles, Heart, ShieldCheck, BookOpen, ChevronRight } from 'lucide-react';
import { Ending, EndingType } from '../types';
import { ALL_ENDINGS_LIST } from '../data/endings';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';

interface EndingsGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedEndingIds: string[];
}

export const EndingsGalleryModal: React.FC<EndingsGalleryModalProps> = ({
  isOpen,
  onClose,
  unlockedEndingIds,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | EndingType>('all');
  const [readingEnding, setReadingEnding] = useState<Ending | null>(null);

  if (!isOpen) return null;

  const filteredEndings = ALL_ENDINGS_LIST.filter((e) => {
    if (selectedFilter === 'all') return true;
    return e.type === selectedFilter;
  });

  const unlockedCount = ALL_ENDINGS_LIST.filter((e) => unlockedEndingIds.includes(e.id)).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#050b1a] border-2 border-[#c8a05e] rounded-3xl shadow-[0_0_50px_rgba(200,160,94,0.3)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8a05e]/30 bg-[#0a1e45]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c8a05e] text-black font-black flex items-center justify-center text-sm shadow">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">11大结局图鉴 · 羁绊与王座画卷</h2>
              <p className="text-xs text-[#c8a05e]">
                全 11 支线结局图鉴 ({unlockedCount} / 11 已解锁)
              </p>
            </div>
          </div>

          <button
            id="btn-gallery-close"
            onClick={() => {
              soundEngine.playClickSound();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800 bg-[#07132c]/90 text-xs overflow-x-auto">
          <button
            id="btn-filter-all"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#c8a05e] text-black shadow'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            全部 11 种结局
          </button>
          <button
            id="btn-filter-secret"
            onClick={() => setSelectedFilter('secret_true')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedFilter === 'secret_true'
                ? 'bg-amber-400 text-black shadow'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            🌟 隐藏终极传奇 (1)
          </button>
          <button
            id="btn-filter-victory"
            onClick={() => setSelectedFilter('victory_romance')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedFilter === 'victory_romance'
                ? 'bg-rose-500 text-white shadow'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            🏆 荣耀胜利专属 (5)
          </button>
          <button
            id="btn-filter-redemption"
            onClick={() => setSelectedFilter('redemption_romance')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedFilter === 'redemption_romance'
                ? 'bg-sky-500 text-white shadow'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            🌅 逆境救赎誓约 (5)
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEndings.map((ending) => {
            const isUnlocked = unlockedEndingIds.includes(ending.id);
            const hero = ending.heroId ? CHARACTERS[ending.heroId] : undefined;

            return (
              <div
                key={ending.id}
                onClick={() => {
                  if (isUnlocked) {
                    soundEngine.playClickSound();
                    setReadingEnding(ending);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                  isUnlocked
                    ? 'bg-[#0a1e45]/90 border-[#c8a05e]/60 hover:border-[#c8a05e] shadow-md hover:shadow-[0_0_20px_rgba(200,160,94,0.3)] cursor-pointer'
                    : 'bg-[#050b1a] border-slate-800 opacity-60'
                }`}
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ending.type === 'secret_true'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : ending.type === 'victory_romance'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      }`}
                    >
                      {ending.type === 'secret_true' ? '隐藏传奇' : ending.type === 'victory_romance' ? '荣耀胜利' : '逆境救赎'}
                    </span>

                    {isUnlocked ? (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> 已解锁
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> 未解锁
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-white mb-2 leading-snug">
                    {isUnlocked ? ending.title : '？？？？？？（未达成）'}
                  </h3>

                  {isUnlocked && (
                    <p className="text-xs text-slate-300 italic line-clamp-2 mb-3 bg-[#050b1a]/60 p-2 rounded-lg border border-slate-800">
                      {ending.cgQuote}
                    </p>
                  )}
                </div>

                {/* Bottom Unlock Condition / Action */}
                <div className="pt-2 border-t border-slate-800 mt-2 text-xs">
                  <div className="text-[11px] text-slate-400 mb-1">达成条件：</div>
                  <div className="text-slate-300 font-medium text-[11px] leading-tight mb-2">
                    {ending.conditionSummary}
                  </div>

                  {isUnlocked && (
                    <div className="text-right text-[#c8a05e] font-bold text-xs flex items-center justify-end gap-1">
                      <span>重温誓约</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ending Reader Sub-Modal */}
        {readingEnding && (
          <div className="absolute inset-0 z-50 bg-[#050b1a]/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#c8a05e]/30 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold text-[#c8a05e] uppercase">ENDING STORY RECALL</span>
                <h2 className="text-xl font-black text-white">{readingEnding.title}</h2>
              </div>
              <button
                id="btn-reader-close"
                onClick={() => setReadingEnding(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 max-w-3xl mx-auto w-full space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#0a1e45] border-l-4 border-[#c8a05e] text-amber-200 italic">
                {readingEnding.cgQuote}
              </div>

              {readingEnding.storyParagraphs.map((para, i) => (
                <p key={i} className="indent-6 sm:indent-8">
                  {para}
                </p>
              ))}

              <div className="mt-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-[#c8a05e]">【终局回响】</span> {readingEnding.epilogue}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
