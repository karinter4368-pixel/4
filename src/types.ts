export type CharacterId =
  | 'yu_yalan'
  | 'chen_chunchi'
  | 'liang_jinhao'
  | 'fang_jialu'
  | 'wu_luya'
  | 'commander'
  | 'announcer'
  | 'system';

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  pinyin: string;
  title: string;
  prototype: string;
  role: string;
  color: string;
  secondaryColor: string;
  quote: string;
  skillName: string;
  skillDesc: string;
  bio: string;
  portrait: string;
  tags: string[];
}

export interface DialogueLine {
  speaker: string;
  characterId?: CharacterId;
  text: string;
  emotion?: 'normal' | 'excited' | 'serious' | 'shy' | 'surprised' | 'worried';
  bg?: string;
  sfx?: 'click' | 'victory' | 'alarm' | 'shimmer';
}

export interface TacticalOption {
  id: string;
  choiceText: string;
  heroId: CharacterId;
  tpDelta: number;
  afChanges: Partial<Record<CharacterId, number>>;
  isPositive: boolean;
  tacticalTitle: string;
  rootCauseAnalysis: string;
  coachAdvice: string;
  outcomeDialogues: DialogueLine[];
}

export interface DecisionRecord {
  actId: number;
  actTitle: string;
  choiceSelectedText: string;
  heroId: CharacterId;
  tpDelta: number;
  afChanges: Partial<Record<CharacterId, number>>;
  isPositive: boolean;
  tacticalTitle: string;
  rootCauseAnalysis: string;
  coachAdvice: string;
  timestamp: string;
}

export interface ActData {
  id: number;
  title: string;
  phaseName: string;
  subtitle: string;
  summary: string;
  initialDialogues: DialogueLine[];
  tacticalPrompt: string;
  options: TacticalOption[];
  conclusionDialogues: DialogueLine[];
}

export type EndingType = 'secret_true' | 'victory_romance' | 'redemption_romance';

export interface Ending {
  id: string;
  title: string;
  type: EndingType;
  heroId?: CharacterId;
  conditionSummary: string;
  storyTitle: string;
  storyParagraphs: string[];
  cgQuote: string;
  epilogue: string;
}

export interface SaveSlot {
  slotId: number;
  name: string;
  timestamp: string;
  actId: number;
  actTitle: string;
  dialogueIndex: number;
  inTacticalPhase: boolean;
  tp: number;
  af: Record<CharacterId, number>;
  history: DecisionRecord[];
  isCompleted: boolean;
  endingId?: string;
}

export interface MvpRadar {
  macro: number;       // 大局观掌控
  synergy: number;     // 全员亲和羁绊
  crisis: number;      // 逆风高压应变
  decision: number;    // 战术决策精度
  execution: number;   // 终局决战收割
}

export interface MvpReportData {
  rank: 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C';
  score: number;
  title: string;
  mvpHeroId: CharacterId;
  mvpHeroName: string;
  zeroMistakeBonus: boolean;
  radar: MvpRadar;
  highlights: DecisionRecord[];
  mistakes: DecisionRecord[];
  coachSummary: string;
}
