import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Trophy, Heart, Sparkles, ShieldCheck, AlertTriangle, ArrowRight, RotateCcw, BookOpen, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Ending, MvpReportData, CharacterId } from '../types';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';

interface TacticalMvpReportProps {
  ending: Ending;
  mvpData: MvpReportData;
  afMap: Record<CharacterId, number>;
  onRestartGame: () => void;
  onOpenGallery: () => void;
}

export const TacticalMvpReport: React.FC<TacticalMvpReportProps> = ({
  ending,
  mvpData,
  afMap,
  onRestartGame,
  onOpenGallery,
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'report'>('story');
  const mvpHero = CHARACTERS[mvpData.mvpHeroId];

  useEffect(() => {
    soundEngine.playVictoryFanfare();
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#c8a05e', '#f59e0b', '#38bdf8', '#ec4899', '#10b981']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  // SVG Radar coordinates computation (5 vertices)
  const renderRadarSvg = () => {
    const size = 260;
    const center = size / 2;
    const radius = 95;
    const dimensions = [
      { key: 'macro', label: '大局观掌控', val: mvpData.radar.macro },
      { key: 'synergy', label: '全员羁绊协同', val: mvpData.radar.synergy },
      { key: 'crisis', label: '逆风应变掌控', val: mvpData.radar.crisis },
      { key: 'decision', label: '决策执行精度', val: mvpData.radar.decision },
      { key: 'execution', label: '决战收割力', val: mvpData.radar.execution },
    ];

    const getCoordinates = (angleIndex: number, valueRatio: number) => {
      const angle = (Math.PI * 2 / 5) * angleIndex - Math.PI / 2;
      const r = radius * valueRatio;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y };
    };

    // Calculate path for user values
    const polygonPoints = dimensions
      .map((d, i) => {
        const { x, y } = getCoordinates(i, Math.max(0.1, d.val / 100));
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-[#050b1a] rounded-2xl border border-slate-800 relative">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background Grid Rings */}
          {[0.25, 0.5, 0.75, 1.0].map((level, lvlIdx) => {
            const ringPoints = [0, 1, 2, 3, 4]
              .map((i) => {
                const { x, y } = getCoordinates(i, level);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polygon
                key={lvlIdx}
                points={ringPoints}
                fill="none"
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray={level === 1 ? 'none' : '2,2'}
              />
            );
          })}

          {/* Axes Lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const { x, y } = getCoordinates(i, 1.0);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#334155"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled User Polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(200, 160, 94, 0.3)"
            stroke="#c8a05e"
            strokeWidth="2.5"
          />

          {/* Value Points */}
          {dimensions.map((d, i) => {
            const { x, y } = getCoordinates(i, Math.max(0.1, d.val / 100));
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4.5"
                fill="#ffd700"
                stroke="#050b1a"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>

        {/* Dimension Labels & Values */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mt-3 text-xs">
          {dimensions.map((d) => (
            <div key={d.key} className="p-1.5 rounded-lg bg-[#0a1e45]/60 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400 truncate">{d.label.split(' ')[0]}</span>
              <span className="font-mono font-bold text-[#c8a05e]">{d.val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative z-30 w-full min-h-screen bg-[#050b1a] text-slate-100 flex flex-col items-center p-3 sm:p-6 overflow-y-auto">
      {/* Top Banner / Tab Switcher */}
      <div className="w-full max-w-5xl bg-[#0a1e45]/90 border-2 border-[#c8a05e] rounded-3xl p-4 sm:p-6 mb-6 shadow-[0_0_40px_rgba(200,160,94,0.3)] backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#c8a05e]/30 pb-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8a05e] to-[#78571c] p-0.5 shadow-lg flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-[#050b1a] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#c8a05e]" />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-[#c8a05e] tracking-widest uppercase">
                稷下战术复盘报告与结局终章
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white">{ending.title}</h1>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 bg-[#050b1a] p-1 rounded-2xl border border-slate-700">
            <button
              id="tab-btn-story"
              onClick={() => {
                soundEngine.playClickSound();
                setActiveTab('story');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'bg-gradient-to-r from-[#c8a05e] to-[#99732e] text-black shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>剧情画卷 · 誓约独白</span>
            </button>

            <button
              id="tab-btn-report"
              onClick={() => {
                soundEngine.playClickSound();
                setActiveTab('report');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'report'
                  ? 'bg-gradient-to-r from-[#c8a05e] to-[#99732e] text-black shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>战术 MVP 评价报告</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Story Ending & Romance CG */}
        {activeTab === 'story' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Left: Ending Hero Illustration */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#050b1a]/60 border border-slate-800 relative">
              <div
                className="absolute inset-0 blur-3xl opacity-20"
                style={{ backgroundColor: mvpHero?.color || '#c8a05e' }}
              />
              <div className="relative w-full max-w-[280px] h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 mb-3">
                {mvpHero?.portrait ? (
                  <img
                    src={mvpHero.portrait}
                    alt={mvpHero.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500">
                    稷下战队全员
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-black/70 backdrop-blur-sm text-center text-xs font-bold text-[#c8a05e] border border-[#c8a05e]/30">
                  {ending.storyTitle}
                </div>
              </div>

              <div className="text-center text-xs text-slate-400">
                达成条件：<span className="text-slate-200 font-medium">{ending.conditionSummary}</span>
              </div>
            </div>

            {/* Right: Romance Prose & Epilogue */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                {/* CG Quote */}
                <div className="p-4 rounded-2xl bg-[#050b1a] border-l-4 border-[#c8a05e] text-amber-200 text-sm sm:text-base italic leading-relaxed shadow-inner">
                  {ending.cgQuote}
                </div>

                {/* Paragraphs */}
                <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                  {ending.storyParagraphs.map((p, idx) => (
                    <p key={idx} className="indent-6 sm:indent-8">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Epilogue */}
                <div className="p-3.5 rounded-xl bg-[#07132c] border border-slate-700/80 text-xs sm:text-sm text-slate-300">
                  <span className="font-bold text-[#c8a05e]">【终局回响与羁绊缔结】</span>
                  <p className="mt-1">{ending.epilogue}</p>
                </div>
              </div>

              {/* Bottom Quick Jump to Report */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  id="btn-goto-report"
                  onClick={() => {
                    soundEngine.playClickSound();
                    setActiveTab('report');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0a1e45] hover:bg-[#132c66] border border-[#c8a05e] text-[#c8a05e] text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>查阅战术复盘报告与五维雷达</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Tactical MVP Report Engine */}
        {activeTab === 'report' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-6 space-y-6"
          >
            {/* Top Score & Rank Hero Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Overall Rank Box */}
              <div className="md:col-span-4 p-5 rounded-2xl bg-[#050b1a] border border-[#c8a05e]/50 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  指挥官综合战术段位
                </span>
                <div className="text-5xl sm:text-6xl font-black font-mono text-[#c8a05e] tracking-tight drop-shadow-[0_0_15px_rgba(200,160,94,0.6)] my-1">
                  {mvpData.rank}
                </div>
                <div className="text-sm sm:text-base font-bold text-white mb-2">
                  {mvpData.title}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  战术评估综合总分: <span className="text-amber-300 font-bold text-base">{mvpData.score}</span> / 100
                </div>

                {mvpData.zeroMistakeBonus && (
                  <div className="mt-3 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>【全场零失误神级掌控】勋章</span>
                  </div>
                )}
              </div>

              {/* MVP Hero Box */}
              <div className="md:col-span-4 p-5 rounded-2xl bg-[#050b1a] border border-slate-800 flex items-center gap-4">
                <div className="w-20 h-24 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 shadow-lg">
                  <img
                    src={mvpHero?.portrait}
                    alt={mvpHero?.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 mb-1">
                    全场战术 MVP 英雄
                  </div>
                  <div className="text-lg font-black text-white">{mvpHero?.name}</div>
                  <div className="text-xs text-[#c8a05e] font-semibold mb-2">{mvpHero?.title}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    亲和度总分: <span className="text-rose-400 font-bold font-mono">{afMap[mvpData.mvpHeroId]} AF</span>
                  </div>
                </div>
              </div>

              {/* 5-D Radar Box */}
              <div className="md:col-span-4">
                {renderRadarSvg()}
              </div>
            </div>

            {/* Coach Executive Summary */}
            <div className="p-4 rounded-2xl bg-[#050b1a] border-l-4 border-[#c8a05e] text-xs sm:text-sm text-slate-200">
              <span className="font-bold text-[#c8a05e]">【稷下战术导师总评】</span>
              <p className="mt-1 leading-relaxed">{mvpData.coachSummary}</p>
            </div>

            {/* Highlights & Mistakes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Positive Highlights */}
              <div className="p-4 rounded-2xl bg-[#050b1a] border border-emerald-500/40">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    全场最优高光操作分析 ({mvpData.highlights.length})
                  </h3>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {mvpData.highlights.map((h, i) => {
                    const hero = CHARACTERS[h.heroId];
                    return (
                      <div key={i} className="p-3 rounded-xl bg-[#0a1e45]/80 border border-slate-700/80 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                              第 {h.actId} 幕
                            </span>
                            {h.tacticalTitle}
                          </span>
                          <span className="font-mono font-bold text-emerald-400">+{h.tpDelta} TP</span>
                        </div>
                        <div className="text-slate-300 mb-1">{h.choiceSelectedText}</div>
                        <div className="text-slate-400 text-[11px]">
                          <span className="text-[#c8a05e]">成因分析:</span> {h.rootCauseAnalysis}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Critical Mistakes / Flawless */}
              <div className="p-4 rounded-2xl bg-[#050b1a] border border-rose-500/40">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">
                    关键失误点剖析与教练建议 ({mvpData.mistakes.length})
                  </h3>
                </div>

                {mvpData.mistakes.length > 0 ? (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {mvpData.mistakes.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-rose-950/20 border border-rose-700/40 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-rose-300 flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-mono">
                              第 {m.actId} 幕
                            </span>
                            {m.tacticalTitle}
                          </span>
                          <span className="font-mono font-bold text-rose-400">{m.tpDelta} TP</span>
                        </div>
                        <div className="text-slate-300 mb-1">{m.choiceSelectedText}</div>
                        <div className="text-slate-400 text-[11px]">
                          <span className="text-rose-400 font-bold">改进建议:</span> {m.coachAdvice}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-center p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/30">
                    <Sparkles className="w-8 h-8 text-emerald-400 mb-2 animate-bounce" />
                    <div className="text-sm font-bold text-emerald-300">零失误神级掌控记录！</div>
                    <p className="text-xs text-slate-400 mt-1">
                      你在全场7个战役节点均做出了最优解战术决策，无任何负向TP损失。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Actions Footer */}
        <div className="mt-8 pt-4 border-t border-[#c8a05e]/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              id="btn-report-gallery"
              onClick={() => {
                soundEngine.playClickSound();
                onOpenGallery();
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>查看11大全结局图鉴</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-report-restart"
              onClick={() => {
                soundEngine.playClickSound();
                onRestartGame();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c8a05e] to-[#99732e] hover:from-[#d8b06e] hover:to-[#a9833e] text-black font-black text-xs sm:text-sm flex items-center gap-2 shadow cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>开启新赛季征程</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
