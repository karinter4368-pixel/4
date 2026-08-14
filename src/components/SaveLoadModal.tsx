import React from 'react';
import { motion } from 'motion/react';
import { X, Save, Upload, Trash2, Clock, Trophy, Heart } from 'lucide-react';
import { SaveSlot } from '../types';
import { CHARACTERS } from '../data/characters';
import { soundEngine } from '../utils/audio';

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  slots: (SaveSlot | null)[];
  onSaveToSlot: (slotIndex: number) => void;
  onLoadFromSlot: (slot: SaveSlot) => void;
  onDeleteSlot: (slotIndex: number) => void;
}

export const SaveLoadModal: React.FC<SaveLoadModalProps> = ({
  isOpen,
  onClose,
  slots,
  onSaveToSlot,
  onLoadFromSlot,
  onDeleteSlot,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-[#050b1a] border-2 border-[#c8a05e] rounded-3xl shadow-[0_0_50px_rgba(200,160,94,0.3)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8a05e]/30 bg-[#0a1e45]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0a1e45] border border-[#c8a05e] text-[#c8a05e] font-black flex items-center justify-center text-sm shadow">
              <Save className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">战况档案 · 3大本地存档槽位</h2>
              <p className="text-xs text-[#c8a05e]">战术存取与进度还原系统</p>
            </div>
          </div>

          <button
            id="btn-saveload-close"
            onClick={() => {
              soundEngine.playClickSound();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Save Slots Grid */}
        <div className="p-6 space-y-4">
          {[0, 1, 2].map((slotIdx) => {
            const slot = slots[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`p-4 rounded-2xl border transition-all ${
                  slot
                    ? 'bg-[#0a1e45]/80 border-[#c8a05e]/50 hover:border-[#c8a05e]'
                    : 'bg-[#050b1a] border-dashed border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left Slot Info */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-[#c8a05e] font-black flex items-center justify-center text-sm flex-shrink-0">
                      #{slotIdx + 1}
                    </div>

                    <div>
                      {slot ? (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-black text-white">{slot.actTitle}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                              TP: {slot.tp}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {slot.timestamp}
                            </span>
                            <span>已执行决策: {slot.history?.length || 0} 轮</span>
                          </div>

                          {/* Mini AF Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {Object.entries(slot.af || {}).map(([hid, val]) => {
                              const hero = CHARACTERS[hid as keyof typeof CHARACTERS];
                              if (!hero || !val) return null;
                              return (
                                <span
                                  key={hid}
                                  className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900/80 text-slate-300 flex items-center gap-1 border border-slate-700"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hero.color }} />
                                  <span>{hero.name}</span>
                                  <span className="text-rose-400 font-bold font-mono">+{val}</span>
                                </span>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="text-slate-400 text-sm font-medium py-2">
                          【空置存档位 · 点击右侧保存当前战况】
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-save-slot-${slotIdx}`}
                      onClick={() => {
                        soundEngine.playClickSound();
                        onSaveToSlot(slotIdx);
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-[#c8a05e] hover:text-black text-slate-200 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                      title="覆盖保存"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>保存</span>
                    </button>

                    {slot && (
                      <>
                        <button
                          id={`btn-load-slot-${slotIdx}`}
                          onClick={() => {
                            soundEngine.playClickSound();
                            onLoadFromSlot(slot);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#c8a05e] to-[#99732e] text-black text-xs font-black shadow transition-all flex items-center gap-1 cursor-pointer"
                          title="读取档案"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>读取</span>
                        </button>

                        <button
                          id={`btn-delete-slot-${slotIdx}`}
                          onClick={() => {
                            soundEngine.playClickSound();
                            onDeleteSlot(slotIdx);
                          }}
                          className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-700/50 text-xs transition-colors cursor-pointer"
                          title="清空此栏"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
