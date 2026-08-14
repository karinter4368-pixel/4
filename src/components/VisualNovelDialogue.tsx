import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, FastForward, Volume2, ChevronRight, MessageSquare, Sparkles } from 'lucide-react';
import { DialogueLine, CharacterProfile } from '../types';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';

interface VisualNovelDialogueProps {
  dialogue: DialogueLine;
  onNext: () => void;
  onAutoToggle: () => void;
  isAuto: boolean;
  onSkip: () => void;
  onOpenHistory: () => void;
  currentActId?: number;
}

export const VisualNovelDialogue: React.FC<VisualNovelDialogueProps> = ({
  dialogue,
  onNext,
  onAutoToggle,
  isAuto,
  onSkip,
  onOpenHistory,
  currentActId = 1
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  const character: CharacterProfile | undefined = dialogue.characterId ? CHARACTERS[dialogue.characterId] : undefined;

  // Typewriter effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let idx = 0;
    const fullText = dialogue.text;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      if (idx < fullText.length) {
        setDisplayedText(fullText.slice(0, idx + 1));
        if (idx % 3 === 0) soundEngine.playTypeBlip();
        idx++;
      } else {
        setIsTyping(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 18);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [dialogue]);

  // Handle Auto mode progression
  useEffect(() => {
    if (isAuto && !isTyping) {
      autoTimerRef.current = setTimeout(() => {
        onNext();
      }, 2000);
    }
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [isAuto, isTyping, onNext]);

  const handleBoxClick = () => {
    if (isTyping) {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setDisplayedText(dialogue.text);
      setIsTyping(false);
    } else {
      soundEngine.playClickSound();
      onNext();
    }
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClickSound();
    soundEngine.speakBroadcast(`${dialogue.speaker}: ${dialogue.text}`);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-end pointer-events-none select-none overflow-hidden">
      {/* Character Sprite Display Area */}
      <div className="absolute inset-0 flex items-end justify-center md:justify-end md:pr-16 lg:pr-28 pointer-events-none z-10">
        <AnimatePresence mode="wait">
          {character && character.portrait && (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-h-[72vh] max-w-[85vw] sm:max-w-[460px] md:max-w-[540px] flex items-end justify-center"
            >
              {/* Backlight Glow according to character color */}
              <div
                className="absolute inset-0 blur-3xl opacity-35 rounded-full scale-90 pointer-events-none"
                style={{ backgroundColor: character.color }}
              />

              {/* Character Half-Body Sprite */}
              <img
                src={character.portrait}
                alt={character.name}
                referrerPolicy="no-referrer"
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] filter contrast-105"
              />

              {/* Character Prototype Badge */}
              <div
                className="absolute top-6 left-2 sm:-left-4 z-20 px-3 py-1 rounded bg-[#0a1e45] border-2 shadow-lg backdrop-blur-md flex items-center gap-1.5 text-xs font-black tracking-wider text-white"
                style={{ borderColor: character.color }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: character.color }} />
                <span>{character.name} · {character.prototype}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* High-Density Interactive Dialogue Box Container */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-3 sm:px-6 pb-3 sm:pb-4 pointer-events-auto">
        <div
          id="dialogue-box"
          onClick={handleBoxClick}
          className="relative bg-[#0a1e45]/92 hover:bg-[#0c2452]/95 backdrop-blur-xl border-2 border-[#c8a05e] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-200 group overflow-hidden"
        >
          {/* Top High-Density Communication Header */}
          <div className="px-3.5 sm:px-5 py-2 border-b border-[#c8a05e]/30 flex justify-between items-center bg-[#c8a05e]/10 select-none">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-[#c8a05e] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                战术通讯连接 · 说话人：{dialogue.speaker}
              </span>
              {character && (
                <span className="text-[10px] text-white/80 font-bold hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                  {character.title}
                </span>
              )}
            </div>

            {/* Encrypted Channel Badge & Quick Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs" onClick={(e) => e.stopPropagation()}>
              <span className="text-[9px] font-mono text-white/50 hidden md:inline">
                战术专属信道 第 0{currentActId} 幕
              </span>

              <button
                id="btn-dialogue-tts"
                onClick={handleSpeak}
                className="px-2 py-0.5 rounded border border-[#c8a05e]/60 bg-[#050b1a]/80 text-[#c8a05e] hover:bg-[#c8a05e]/20 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="语音朗读台词"
              >
                <Volume2 className="w-3 h-3" />
                <span className="hidden sm:inline">语音</span>
              </button>

              <button
                id="btn-dialogue-auto"
                onClick={() => {
                  soundEngine.playClickSound();
                  onAutoToggle();
                }}
                className={`px-2 py-0.5 rounded border text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  isAuto
                    ? 'bg-[#42f59e]/20 text-[#42f59e] border-[#42f59e]'
                    : 'border-[#c8a05e]/60 bg-[#050b1a]/80 text-[#c8a05e] hover:bg-[#c8a05e]/20'
                }`}
                title="自动推进"
              >
                <Play className={`w-3 h-3 ${isAuto ? 'animate-pulse text-[#42f59e]' : ''}`} />
                <span>自动</span>
              </button>

              <button
                id="btn-dialogue-skip"
                onClick={() => {
                  soundEngine.playClickSound();
                  onSkip();
                }}
                className="px-2 py-0.5 rounded border border-[#c8a05e]/60 bg-[#050b1a]/80 text-[#c8a05e] hover:bg-[#c8a05e]/20 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="跳过至战术抉择"
              >
                <FastForward className="w-3 h-3" />
                <span>跳过</span>
              </button>

              <button
                id="btn-dialogue-log"
                onClick={() => {
                  soundEngine.playClickSound();
                  onOpenHistory();
                }}
                className="px-2 py-0.5 rounded border border-[#c8a05e]/60 bg-[#050b1a]/80 text-[#c8a05e] hover:bg-[#c8a05e]/20 text-[11px] font-bold transition-colors cursor-pointer"
                title="查看履历"
              >
                履历
              </button>
            </div>
          </div>

          {/* Dialogue Text Body */}
          <div className="p-4 sm:p-5">
            <div className="min-h-[58px] sm:min-h-[68px] flex items-start text-white text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose font-normal tracking-wide">
              <p className="w-full">
                {displayedText}
                {isTyping && <span className="inline-block w-1.5 h-4 bg-[#c8a05e] ml-1 animate-pulse" />}
              </p>
            </div>

            {/* Next Step Indicator */}
            <div className="flex justify-end items-center mt-1 text-xs font-bold text-[#c8a05e] group-hover:text-amber-300 transition-colors">
              <span className="flex items-center gap-1 tracking-wider text-[11px]">
                点击推进战局 <ChevronRight className="w-3.5 h-3.5 animate-bounce-x" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
