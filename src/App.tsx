/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Play,
  Users,
  Award,
  Save,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  RotateCcw,
  Zap,
  Swords
} from 'lucide-react';

import {
  CharacterId,
  TacticalOption,
  DecisionRecord,
  DialogueLine,
  SaveSlot,
  Ending,
  MvpReportData
} from './types';
import { CHARACTERS } from './data/characters';
import { ACTS_DATA } from './data/acts';
import { ENDINGS_DATA } from './data/endings';
import { soundEngine } from './utils/audio';
import { calculateMvpReport, determineEndingId } from './utils/mvpEngine';

import { HeaderHud } from './components/HeaderHud';
import { VisualNovelDialogue } from './components/VisualNovelDialogue';
import { TacticalDecisionModal } from './components/TacticalDecisionModal';
import { TacticalFeedbackToast } from './components/TacticalFeedbackToast';
import { RosterDrawer } from './components/RosterDrawer';
import { HistoryLogModal } from './components/HistoryLogModal';
import { SaveLoadModal } from './components/SaveLoadModal';
import { EndingsGalleryModal } from './components/EndingsGalleryModal';
import { TacticalMvpReport } from './components/TacticalMvpReport';

import bgArena from './assets/images/bg_esports_arena_1786707877983.jpg';
import bgTactical from './assets/images/bg_tactical_room_1786707892878.jpg';

const LOCAL_STORAGE_SAVES_KEY = 'jixia_tactical_saves_v1';
const LOCAL_STORAGE_ENDINGS_KEY = 'jixia_tactical_unlocked_endings_v1';

export default function App() {
  // Navigation & Core Loop State
  const [gameState, setGameState] = useState<
    'menu' | 'playing' | 'decision' | 'outcome_playing' | 'outcome_toast' | 'ending'
  >('menu');

  const [currentActIndex, setCurrentActIndex] = useState<number>(0);
  const [dialoguePhase, setDialoguePhase] = useState<'initial' | 'outcome' | 'conclusion'>('initial');
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);

  // Stats
  const [tp, setTp] = useState<number>(50);
  const [afMap, setAfMap] = useState<Record<CharacterId, number>>({
    yu_yalan: 0,
    chen_chunchi: 0,
    liang_jinhao: 0,
    fang_jialu: 0,
    wu_luya: 0,
    commander: 0,
    announcer: 0,
    system: 0,
  });

  // History & Decision Records
  const [decisionsHistory, setDecisionsHistory] = useState<DecisionRecord[]>([]);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueLine[]>([]);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<TacticalOption | null>(null);

  // Ending & MVP
  const [currentEnding, setCurrentEnding] = useState<Ending | null>(null);
  const [mvpReportData, setMvpReportData] = useState<MvpReportData | null>(null);

  // Settings & Modes
  const [isAuto, setIsAuto] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals
  const [isRosterOpen, setIsRosterOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isSaveLoadOpen, setIsSaveLoadOpen] = useState<boolean>(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  // Persistent Save Slots & Endings
  const [saveSlots, setSaveSlots] = useState<(SaveSlot | null)[]>([null, null, null]);
  const [unlockedEndingIds, setUnlockedEndingIds] = useState<string[]>([]);

  // Load persistent data from localStorage
  useEffect(() => {
    try {
      const savedSaves = localStorage.getItem(LOCAL_STORAGE_SAVES_KEY);
      if (savedSaves) {
        setSaveSlots(JSON.parse(savedSaves));
      }
      const savedEndings = localStorage.getItem(LOCAL_STORAGE_ENDINGS_KEY);
      if (savedEndings) {
        setUnlockedEndingIds(JSON.parse(savedEndings));
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const saveToStorage = (newSlots: (SaveSlot | null)[]) => {
    setSaveSlots(newSlots);
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVES_KEY, JSON.stringify(newSlots));
    } catch {
      // Ignore
    }
  };

  const unlockEnding = (endingId: string) => {
    setUnlockedEndingIds((prev) => {
      if (prev.includes(endingId)) return prev;
      const updated = [...prev, endingId];
      try {
        localStorage.setItem(LOCAL_STORAGE_ENDINGS_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Current Act Reference
  const currentAct = ACTS_DATA[currentActIndex] || ACTS_DATA[0];

  // Current Dialogue Line calculation
  let currentDialogueList: DialogueLine[] = [];
  if (dialoguePhase === 'initial') {
    currentDialogueList = currentAct.initialDialogues;
  } else if (dialoguePhase === 'outcome' && currentSelectedOption) {
    currentDialogueList = currentSelectedOption.outcomeDialogues;
  } else if (dialoguePhase === 'conclusion') {
    currentDialogueList = currentAct.conclusionDialogues;
  }

  const currentDialogueLine = currentDialogueList[dialogueIndex] || currentDialogueList[0] || {
    speaker: '系统',
    characterId: 'system',
    text: '战况同步中……'
  };

  // Append line to history when read
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'outcome_playing') {
      if (currentDialogueLine && currentDialogueLine.text) {
        setDialogueHistory((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.text === currentDialogueLine.text) return prev;
          return [...prev, currentDialogueLine];
        });
      }
    }
  }, [currentDialogueLine, gameState]);

  // Start new game
  const handleStartNewGame = () => {
    soundEngine.playClickSound();
    setCurrentActIndex(0);
    setDialoguePhase('initial');
    setDialogueIndex(0);
    setTp(50);
    setAfMap({
      yu_yalan: 0,
      chen_chunchi: 0,
      liang_jinhao: 0,
      fang_jialu: 0,
      wu_luya: 0,
      commander: 0,
      announcer: 0,
      system: 0,
    });
    setDecisionsHistory([]);
    setDialogueHistory([]);
    setCurrentSelectedOption(null);
    setCurrentEnding(null);
    setMvpReportData(null);
    setGameState('playing');
  };

  // Dialogue Next Step Handler
  const handleDialogueNext = () => {
    if (dialogueIndex + 1 < currentDialogueList.length) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      // Dialogue section completed for current phase
      if (dialoguePhase === 'initial') {
        // Go to tactical choice modal
        setGameState('decision');
      } else if (dialoguePhase === 'outcome') {
        // Outcome narrative completed -> trigger Toast badge
        setGameState('outcome_toast');
      } else if (dialoguePhase === 'conclusion') {
        // Current act fully finished!
        if (currentActIndex < ACTS_DATA.length - 1) {
          // Advance to next Act
          setCurrentActIndex((prev) => prev + 1);
          setDialoguePhase('initial');
          setDialogueIndex(0);
          setGameState('playing');
        } else {
          // Act 7 finished -> Route to Endings & MVP Report!
          finishGameAndTriggerEnding();
        }
      }
    }
  };

  // Skip dialogues straight to decision or conclusion
  const handleDialogueSkip = () => {
    if (dialoguePhase === 'initial') {
      setGameState('decision');
    } else if (dialoguePhase === 'outcome') {
      setGameState('outcome_toast');
    } else if (dialoguePhase === 'conclusion') {
      if (currentActIndex < ACTS_DATA.length - 1) {
        setCurrentActIndex((prev) => prev + 1);
        setDialoguePhase('initial');
        setDialogueIndex(0);
        setGameState('playing');
      } else {
        finishGameAndTriggerEnding();
      }
    }
  };

  // Selecting a tactical option (Blind choice!)
  const handleSelectOption = (option: TacticalOption) => {
    setCurrentSelectedOption(option);

    // Apply numerical changes under the hood (revealed after outcome narrative)
    const newTp = Math.max(0, Math.min(100, tp + option.tpDelta));
    setTp(newTp);

    setAfMap((prev) => {
      const nextMap = { ...prev };
      if (option.afChanges) {
        Object.entries(option.afChanges).forEach(([charKey, delta]) => {
          const key = charKey as CharacterId;
          const currentVal = nextMap[key] || 0;
          nextMap[key] = Math.max(0, currentVal + (delta || 0));
        });
      }
      return nextMap;
    });

    // Record decision in history
    const record: DecisionRecord = {
      actId: currentAct.id,
      actTitle: currentAct.title,
      choiceSelectedText: option.choiceText,
      heroId: option.heroId,
      tpDelta: option.tpDelta,
      afChanges: option.afChanges,
      isPositive: option.isPositive,
      tacticalTitle: option.tacticalTitle,
      rootCauseAnalysis: option.rootCauseAnalysis,
      coachAdvice: option.coachAdvice,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour12: false })
    };
    setDecisionsHistory((prev) => [...prev, record]);

    // Start 3~4 play-by-play narrative lines
    setDialoguePhase('outcome');
    setDialogueIndex(0);
    setGameState('outcome_playing');
  };

  // Continuing after tactical feedback toast
  const handleContinueAfterFeedback = () => {
    setDialoguePhase('conclusion');
    setDialogueIndex(0);
    setGameState('playing');
  };

  // Final Ending & MVP Evaluation
  const finishGameAndTriggerEnding = () => {
    const endingId = determineEndingId(tp, afMap);
    const ending = ENDINGS_DATA[endingId] || ENDINGS_DATA.legendary_true;
    const mvpData = calculateMvpReport(tp, afMap, decisionsHistory);

    setCurrentEnding(ending);
    setMvpReportData(mvpData);
    unlockEnding(ending.id);
    setGameState('ending');
  };

  // Save / Load Slot Handlers
  const handleSaveToSlot = (slotIdx: number) => {
    const newSlot: SaveSlot = {
      slotId: slotIdx + 1,
      name: `战况记录 - ${currentAct.title}`,
      timestamp: new Date().toLocaleString('zh-CN', { hour12: false }),
      actId: currentAct.id,
      actTitle: currentAct.title,
      dialogueIndex,
      inTacticalPhase: gameState === 'decision',
      tp,
      af: { ...afMap },
      history: [...decisionsHistory],
      isCompleted: gameState === 'ending',
      endingId: currentEnding?.id
    };

    const newSlots = [...saveSlots];
    newSlots[slotIdx] = newSlot;
    saveToStorage(newSlots);
  };

  const handleLoadFromSlot = (slot: SaveSlot) => {
    const actIdx = Math.max(0, Math.min(ACTS_DATA.length - 1, slot.actId - 1));
    setCurrentActIndex(actIdx);
    setDialoguePhase('initial');
    setDialogueIndex(slot.dialogueIndex || 0);
    setTp(slot.tp);
    setAfMap({ ...slot.af });
    setDecisionsHistory([...slot.history]);
    setIsSaveLoadOpen(false);

    if (slot.isCompleted && slot.endingId && ENDINGS_DATA[slot.endingId]) {
      const end = ENDINGS_DATA[slot.endingId];
      setCurrentEnding(end);
      setMvpReportData(calculateMvpReport(slot.tp, slot.af, slot.history));
      setGameState('ending');
    } else if (slot.inTacticalPhase) {
      setGameState('decision');
    } else {
      setGameState('playing');
    }
  };

  const handleDeleteSlot = (slotIdx: number) => {
    const newSlots = [...saveSlots];
    newSlots[slotIdx] = null;
    saveToStorage(newSlots);
  };

  const handleToggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    soundEngine.setMuted(newMute);
  };

  return (
    <div className="relative w-full h-screen bg-[#050b1a] text-slate-100 flex flex-col font-sans overflow-hidden select-none">
      {/* Background Layer with Smooth Dynamic Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={gameState === 'menu' || gameState === 'ending' ? bgTactical : bgArena}
          alt="Jixia Arena"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-65 contrast-110 scale-105 transition-all duration-1000"
        />
        {/* Esports Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-[#050b1a]/40 to-[#050b1a]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050b1a]/50 to-[#050b1a]" />

        {/* Crisis Red Glow Overlay on edges if TP <= 35 */}
        {gameState !== 'menu' && tp <= 35 && (
          <div className="absolute inset-0 border-8 border-rose-600/30 animate-pulse pointer-events-none z-10 shadow-[inset_0_0_80px_rgba(225,29,72,0.4)]" />
        )}
      </div>

      {/* Top HUD (Rendered when in active game) */}
      {gameState !== 'menu' && gameState !== 'ending' && (
        <HeaderHud
          currentActId={currentAct.id}
          currentActTitle={currentAct.title}
          tp={tp}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenRoster={() => setIsRosterOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenSaveLoad={() => setIsSaveLoadOpen(true)}
          onOpenGallery={() => setIsGalleryOpen(true)}
          onReturnHome={() => setGameState('menu')}
        />
      )}

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full h-full overflow-hidden flex flex-col">
        {/* 1. START / MAIN MENU SCREEN */}
        {gameState === 'menu' && (
          <div className="flex-1 flex flex-col justify-between items-center p-4 sm:p-8 max-w-6xl mx-auto w-full text-center">
            {/* Top Bar on Menu */}
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a1e45] border border-[#c8a05e] text-xs font-bold text-[#c8a05e] shadow">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="tracking-wider">KPL 电竞赛事规约 · 稷下战纪</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-menu-mute"
                  onClick={handleToggleMute}
                  className="p-2 rounded-lg bg-[#0a1e45] hover:bg-[#132c66] text-[#c8a05e] border border-[#c8a05e] cursor-pointer shadow"
                  title="声音开关"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Center Hero Title & Character Avatar Lineup */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="my-auto py-6"
            >
              <div className="inline-block text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-[#c8a05e] mb-2 drop-shadow">
                稷下战术指挥官 · 竞技与心动策略
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_0_30px_rgba(200,160,94,0.4)] mb-4">
                稷下战队：心动战术指挥官
              </h1>
              <p className="max-w-2xl mx-auto text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-medium">
                集电竞赛事拟真、高压战术抉择、5位核心传承者羁绊攻略与专业赛后战术 MVP 复盘于一体。
                <br className="hidden sm:inline" />
                你的每一次口令，都将决定世界冠军王座与羁绊誓约的归属！
              </p>

              {/* 5 Heroes Lineup in High-Density Frame */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-8 flex-wrap">
                {Object.values(CHARACTERS)
                  .filter((c) => c.portrait)
                  .map((char) => (
                    <motion.div
                      key={char.id}
                      whileHover={{ scale: 1.08, y: -4 }}
                      onClick={() => {
                        soundEngine.playClickSound();
                        setIsRosterOpen(true);
                      }}
                      className="group cursor-pointer flex flex-col items-center"
                    >
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 shadow-lg transition-all bg-[#0a1e45]"
                        style={{
                          borderColor: char.color,
                          boxShadow: `0 0 16px ${char.color}44`
                        }}
                      >
                        <img
                          src={char.portrait}
                          alt={char.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-black text-slate-300 mt-1.5 group-hover:text-[#c8a05e]">
                        {char.name}
                      </span>
                    </motion.div>
                  ))}
              </div>

              {/* Action Buttons in High-Density Cyber Style */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
                <motion.button
                  id="btn-start-campaign"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartNewGame}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#c8a05e] hover:bg-[#d8b06e] text-black font-black text-base shadow-[0_0_25px_rgba(200,160,94,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#c8a05e]"
                >
                  <Swords className="w-5 h-5" />
                  <span>开启战术征程</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>

                <button
                  id="btn-menu-roster"
                  onClick={() => {
                    soundEngine.playClickSound();
                    setIsRosterOpen(true);
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-[#0a1e45] hover:bg-[#132c66] border border-[#c8a05e] text-[#c8a05e] font-bold text-sm shadow flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>战队名册</span>
                </button>

                <button
                  id="btn-menu-gallery"
                  onClick={() => {
                    soundEngine.playClickSound();
                    setIsGalleryOpen(true);
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-[#0a1e45] hover:bg-[#132c66] border border-[#c8a05e] text-[#c8a05e] font-bold text-sm shadow flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>结局图鉴</span>
                </button>

                <button
                  id="btn-menu-saveload"
                  onClick={() => {
                    soundEngine.playClickSound();
                    setIsSaveLoadOpen(true);
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-[#0a1e45] hover:bg-[#132c66] border border-[#c8a05e] text-[#c8a05e] font-bold text-sm shadow flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>存读档</span>
                </button>
              </div>
            </motion.div>

            {/* Bottom High Density Footer */}
            <div className="w-full text-xs text-slate-400 border-t border-[#0a1e45] pt-3 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="font-mono text-[11px] text-[#c8a05e]">TACTICAL VN SYSTEM // VERSION 2.4.0_RELEASE</span>
              <span className="text-slate-300">稷下学院电竞总教务署 · 战术全息指挥引擎</span>
            </div>
          </div>
        )}

        {/* 2. ACTIVE GAMEPLAY LAYOUT (HIGH DENSITY MULTI-PANEL) */}
        {gameState !== 'menu' && gameState !== 'ending' && (
          <div className="flex-1 flex w-full h-full overflow-hidden relative">
            {/* Left Hero Affinity Quick Sidebar */}
            <aside className="w-16 sm:w-20 bg-black/50 border-r border-[#0a1e45] flex flex-col items-center py-3 gap-3.5 z-20 overflow-y-auto select-none">
              <div className="text-[9px] uppercase tracking-wider text-[#c8a05e] font-black text-center px-1">
                队员羁绊
              </div>
              {Object.values(CHARACTERS)
                .filter((c) => c.portrait)
                .map((hero) => {
                  const currentAf = afMap[hero.id] || 0;
                  const isCurrentSpeaker = currentDialogueLine.characterId === hero.id;

                  return (
                    <div
                      key={hero.id}
                      onClick={() => {
                        soundEngine.playClickSound();
                        setIsRosterOpen(true);
                      }}
                      className={`relative group cursor-pointer flex flex-col items-center transition-transform hover:scale-105 ${
                        isCurrentSpeaker ? 'scale-105' : 'opacity-85 hover:opacity-100'
                      }`}
                      title={`${hero.name} · ${hero.prototype} (亲和羁绊 AF: ${currentAf})`}
                    >
                      <div
                        className={`w-11 h-11 sm:w-13 sm:h-13 rounded-lg overflow-hidden border-2 transition-all bg-[#0a1e45] ${
                          isCurrentSpeaker
                            ? 'ring-2 ring-[#c8a05e] shadow-[0_0_12px_rgba(200,160,94,0.6)]'
                            : ''
                        }`}
                        style={{ borderColor: hero.color }}
                      >
                        <img
                          src={hero.portrait}
                          alt={hero.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* AF Badge */}
                      <span
                        className="text-[8px] font-mono font-black px-1 py-0.2 rounded mt-1 text-white border border-white/20 shadow"
                        style={{ backgroundColor: hero.color }}
                      >
                        AF {currentAf}
                      </span>
                    </div>
                  );
                })}
            </aside>

            {/* Center Area: Dialogue and Decisions */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              {(gameState === 'playing' || gameState === 'outcome_playing') && (
                <VisualNovelDialogue
                  dialogue={currentDialogueLine}
                  onNext={handleDialogueNext}
                  onAutoToggle={() => setIsAuto(!isAuto)}
                  isAuto={isAuto}
                  onSkip={handleDialogueSkip}
                  onOpenHistory={() => setIsHistoryOpen(true)}
                  currentActId={currentAct.id}
                />
              )}

              {/* TACTICAL DECISION MODAL (Strictly Blind Choices) */}
              {gameState === 'decision' && (
                <TacticalDecisionModal
                  tacticalPrompt={currentAct.tacticalPrompt}
                  options={currentAct.options}
                  onSelectOption={handleSelectOption}
                />
              )}

              {/* POST-DECISION TACTICAL FEEDBACK TOAST */}
              {gameState === 'outcome_toast' && currentSelectedOption && (
                <TacticalFeedbackToast
                  decision={currentSelectedOption}
                  onContinue={handleContinueAfterFeedback}
                />
              )}
            </div>

            {/* Right Tactical Telemetry & Battle Log Sidebar (High Density) */}
            <aside className="w-64 lg:w-72 xl:w-80 bg-[#0a1e45]/85 backdrop-blur-md border-l border-[#0a1e45] p-3.5 flex flex-col gap-3.5 z-20 hidden lg:flex overflow-y-auto select-none">
              {/* Tactical Telemetry */}
              <div className="bg-[#050b1a]/90 rounded-lg p-3 border border-[#c8a05e]/40 shadow">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#c8a05e] mb-2 pb-1.5 border-b border-white/10">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#42f59e]" />
                    战术性能雷达
                  </span>
                  <span className="text-[9px] bg-[#42f59e] text-black px-1.5 py-0.5 rounded font-black">
                    实时监控
                  </span>
                </div>

                {/* Tactical Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-[#0a1e45]/70 border border-slate-700/60 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold">大局观</span>
                    <span className="text-sm font-mono font-black text-[#42f59e]">
                      {Math.min(100, Math.max(30, tp + 12))} <span className="text-[9px] text-slate-400">/ 100</span>
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#0a1e45]/70 border border-slate-700/60 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold">协同度</span>
                    <span className="text-sm font-mono font-black text-[#c8a05e]">
                      {Math.min(100, Math.max(20, (Object.values(afMap) as number[]).reduce((a: number, b: number) => a + b, 0) * 2 + 40))} <span className="text-[9px] text-slate-400">/ 100</span>
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#0a1e45]/70 border border-slate-700/60 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold">决断力</span>
                    <span className="text-sm font-mono font-black text-sky-400">
                      {Math.min(100, decisionsHistory.length * 14 + 30)} <span className="text-[9px] text-slate-400">/ 100</span>
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#0a1e45]/70 border border-slate-700/60 flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold">危机率</span>
                    <span className={`text-sm font-mono font-black ${tp <= 35 ? 'text-rose-400 animate-pulse' : 'text-slate-300'}`}>
                      {Math.max(10, 100 - tp)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Real-Time Battle Dispatch Log */}
              <div className="flex-1 bg-[#050b1a]/90 rounded-lg p-3 border border-[#c8a05e]/40 shadow flex flex-col overflow-hidden">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#c8a05e] mb-2 pb-1.5 border-b border-white/10">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c8a05e]" />
                    战术信道实录
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {decisionsHistory.length} 决策项
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 text-[11px] pr-1">
                  {decisionsHistory.length === 0 ? (
                    <div className="text-slate-400 text-center py-6 italic text-xs">
                      等待战术指令下达中……
                    </div>
                  ) : (
                    decisionsHistory.map((rec, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded bg-[#0a1e45]/70 border-l-2 ${
                          rec.isPositive ? 'border-[#42f59e]' : 'border-[#ef4444]'
                        }`}
                      >
                        <div className="flex justify-between items-center font-bold text-slate-200 mb-0.5">
                          <span className={rec.isPositive ? 'text-[#42f59e]' : 'text-rose-400'}>
                            [{rec.isPositive ? '战术成功' : '战术预警'}] 第 0{rec.actId} 幕
                          </span>
                          <span className="font-mono text-[9px] text-slate-400">{rec.timestamp}</span>
                        </div>
                        <div className="text-slate-300 text-[10px] line-clamp-2">
                          {rec.choiceSelectedText}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[9px] font-mono">
                          <span className={rec.tpDelta > 0 ? 'text-[#42f59e]' : 'text-rose-400'}>
                            TP: {rec.tpDelta > 0 ? `+${rec.tpDelta}` : rec.tpDelta}
                          </span>
                          {Object.entries(rec.afChanges || {}).map(([charKey, delta]) => {
                            const val = Number(delta) || 0;
                            return (
                              <span
                                key={charKey}
                                className={val >= 0 ? 'text-[#c8a05e]' : 'text-rose-400'}
                              >
                                {charKey.slice(0, 2)}: {val > 0 ? `+${val}` : val}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* 3. CLIMAX ENDING & TACTICAL MVP REPORT */}
        {gameState === 'ending' && currentEnding && mvpReportData && (
          <TacticalMvpReport
            ending={currentEnding}
            mvpData={mvpReportData}
            afMap={afMap}
            onRestartGame={handleStartNewGame}
            onOpenGallery={() => setIsGalleryOpen(true)}
          />
        )}
      </main>

      {/* High Density Bottom Status Bar (Active during gameplay) */}
      {gameState !== 'menu' && gameState !== 'ending' && (
        <footer className="h-10 sm:h-11 bg-black/90 border-t border-[#0a1e45] flex items-center justify-between px-3 sm:px-6 text-[10px] sm:text-xs font-bold tracking-wider text-white/70 z-20 select-none">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setIsAuto(!isAuto)}
              className={`cursor-pointer hover:text-white transition-colors flex items-center gap-1 ${
                isAuto ? 'text-[#42f59e]' : ''
              }`}
            >
              <Play className="w-3 h-3" />
              <span>{isAuto ? '自动播放中' : '自动'}</span>
            </button>

            <button
              onClick={handleDialogueSkip}
              className="cursor-pointer hover:text-white transition-colors flex items-center gap-1"
            >
              <ChevronRight className="w-3 h-3" />
              <span>快进</span>
            </button>

            <button
              onClick={() => setIsHistoryOpen(true)}
              className="cursor-pointer hover:text-white transition-colors"
            >
              履历
            </button>

            <button
              onClick={() => setIsRosterOpen(true)}
              className="cursor-pointer hover:text-white transition-colors text-[#c8a05e]"
            >
              名册
            </button>

            <button
              onClick={() => setIsGalleryOpen(true)}
              className="cursor-pointer hover:text-white transition-colors"
            >
              图鉴
            </button>

            <button
              onClick={() => setIsSaveLoadOpen(true)}
              className="cursor-pointer hover:text-white transition-colors"
            >
              存读档
            </button>
          </div>

          <div className="flex items-center gap-2 text-[#c8a05e] font-mono text-[10px] sm:text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#42f59e] animate-ping" />
            <span className="hidden sm:inline">战术指挥控制中枢 · 系统运行正常</span>
          </div>
        </footer>
      )}

      {/* Global Drawers & Modals */}
      <RosterDrawer
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        afMap={afMap}
      />

      <HistoryLogModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        dialogueHistory={dialogueHistory}
        decisions={decisionsHistory}
      />

      <SaveLoadModal
        isOpen={isSaveLoadOpen}
        onClose={() => setIsSaveLoadOpen(false)}
        slots={saveSlots}
        onSaveToSlot={handleSaveToSlot}
        onLoadFromSlot={handleLoadFromSlot}
        onDeleteSlot={handleDeleteSlot}
      />

      <EndingsGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        unlockedEndingIds={unlockedEndingIds}
      />
    </div>
  );
}
