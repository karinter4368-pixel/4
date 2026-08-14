import { CharacterId, DecisionRecord, MvpReportData, MvpRadar } from '../types';
import { CHARACTERS } from '../data/characters';

export function calculateMvpReport(
  finalTp: number,
  afMap: Record<CharacterId, number>,
  history: DecisionRecord[]
): MvpReportData {
  // 1. Identify MVP Hero (highest AF among 5 heroes)
  const heroIds: CharacterId[] = ['yu_yalan', 'chen_chunchi', 'liang_jinhao', 'fang_jialu', 'wu_luya'];
  let maxAf = -1;
  let mvpHeroId: CharacterId = 'yu_yalan';

  heroIds.forEach((hid) => {
    const score = afMap[hid] || 0;
    if (score > maxAf) {
      maxAf = score;
      mvpHeroId = hid;
    }
  });

  const mvpHeroName = CHARACTERS[mvpHeroId]?.name || '未知英雄';

  // 2. Separate Highlights & Mistakes
  const highlights = history.filter((h) => h.isPositive);
  const mistakes = history.filter((h) => !h.isPositive);
  const zeroMistakeBonus = mistakes.length === 0 && finalTp >= 85;

  // 3. Compute 5-Dimension Radar (0 - 100)
  // Macro: Based on final TP
  const macro = Math.min(100, Math.max(30, Math.round(finalTp * 0.95 + (zeroMistakeBonus ? 10 : 0))));

  // Synergy: Sum & balance of all AF
  const totalAf = heroIds.reduce((sum, id) => sum + (afMap[id] || 0), 0);
  const avgAf = totalAf / 5;
  const synergy = Math.min(100, Math.max(30, Math.round(avgAf * 4.2 + (totalAf >= 60 ? 15 : 0))));

  // Crisis: Check Act 4 and Act 5 decisions
  const act4Decision = history.find((h) => h.actId === 4);
  const act5Decision = history.find((h) => h.actId === 5);
  let crisisScore = 50;
  if (act4Decision?.isPositive) crisisScore += 25;
  if (act5Decision?.isPositive) crisisScore += 25;
  if (!act4Decision?.isPositive && !act5Decision?.isPositive) crisisScore = 35;
  const crisis = Math.min(100, Math.max(30, crisisScore));

  // Decision Accuracy: positive vs mistakes
  const accuracyRatio = history.length > 0 ? highlights.length / history.length : 0.5;
  const decision = Math.min(100, Math.max(30, Math.round(accuracyRatio * 90 + 10)));

  // Execution: Check Act 6 and Act 7
  const act6Decision = history.find((h) => h.actId === 6);
  const act7Decision = history.find((h) => h.actId === 7);
  let execScore = 50;
  if (act6Decision?.isPositive) execScore += 25;
  if (act7Decision?.isPositive) execScore += 25;
  const execution = Math.min(100, Math.max(30, execScore));

  const radar: MvpRadar = {
    macro,
    synergy,
    crisis,
    decision,
    execution
  };

  // 4. Overall Score & Rank
  const weightedScore = Math.round(
    macro * 0.3 + synergy * 0.2 + crisis * 0.15 + decision * 0.2 + execution * 0.15
  );

  let rank: 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C' = 'B';
  let title = '进取指挥官';

  if (finalTp >= 90 && (maxAf >= 25 || totalAf >= 55)) {
    rank = 'SSS';
    title = '传世神级战术大师 (Godlike Tactician)';
  } else if (finalTp >= 80) {
    rank = 'SS';
    title = '巅峰天花板战略家 (Apex Strategist)';
  } else if (finalTp >= 65) {
    rank = 'S';
    title = '卓绝战术统帅 (Grand Commander)';
  } else if (finalTp >= 50) {
    rank = 'A';
    title = '坚韧破局先锋 (Resilient Vanguard)';
  } else if (finalTp >= 35) {
    rank = 'B';
    title = '进取指挥官 (Developing Leader)';
  } else {
    rank = 'C';
    title = '绝地砥砺指挥官 (Regrouping Strategist)';
  }

  // 5. Coach Summary
  let coachSummary = '';
  if (rank === 'SSS') {
    coachSummary = '无可挑剔的执教艺术！全场无论是前期控龙、中期转线还是绝境攻坚，指令如同精密手术刀般剖开敌方阵型。你与五位传承者缔造了电竞赛场最耀眼的永恒篇章！';
  } else if (rank === 'SS' || rank === 'S') {
    coachSummary = '极其卓越的赛场大局观！在中后期关键主宰团与高地拉扯中展现了顶级教练的大心脏，战队执行力高度凝练，成功斩获巅峰荣耀。';
  } else if (rank === 'A') {
    coachSummary = '充满韧性的破局指挥！虽然在个别节点出现了视野脱节，但凭借坚定的调整能力迅速重整旗鼓，展现了成熟战队的抗压底蕴。';
  } else {
    coachSummary = '逆风鏖战，砥砺前行。虽然最终总决战陷入焦灼苦战，但你在高压下的坚守赢得了队员们由衷的信赖。下个赛季定能重整旗鼓！';
  }

  return {
    rank,
    score: Math.min(100, Math.max(30, weightedScore)),
    title,
    mvpHeroId,
    mvpHeroName,
    zeroMistakeBonus,
    radar,
    highlights,
    mistakes,
    coachSummary
  };
}

export function determineEndingId(finalTp: number, afMap: Record<CharacterId, number>): string {
  const heroIds: CharacterId[] = ['yu_yalan', 'chen_chunchi', 'liang_jinhao', 'fang_jialu', 'wu_luya'];
  
  // 1. Secret Legendary True Ending: All 5 AF >= 15 & TP >= 85
  const allAfHigh = heroIds.every((hid) => (afMap[hid] || 0) >= 15);
  if (allAfHigh && finalTp >= 85) {
    return 'legendary_true';
  }

  // Find top AF hero
  let highestHero: CharacterId = 'yu_yalan';
  let highestScore = -1;
  heroIds.forEach((hid) => {
    const val = afMap[hid] || 0;
    if (val > highestScore) {
      highestScore = val;
      highestHero = hid;
    }
  });

  // 2. Victory Romance Endings (TP >= 65 & Top AF >= 15)
  if (finalTp >= 65) {
    if (highestHero === 'yu_yalan') return 'victory_yu';
    if (highestHero === 'chen_chunchi') return 'victory_chen';
    if (highestHero === 'liang_jinhao') return 'victory_liang';
    if (highestHero === 'fang_jialu') return 'victory_fang';
    if (highestHero === 'wu_luya') return 'victory_wu';
    return 'victory_yu';
  }

  // 3. Redemption Romance Endings (TP < 65)
  if (highestHero === 'yu_yalan') return 'redemption_yu';
  if (highestHero === 'chen_chunchi') return 'redemption_chen';
  if (highestHero === 'liang_jinhao') return 'redemption_liang';
  if (highestHero === 'fang_jialu') return 'redemption_fang';
  if (highestHero === 'wu_luya') return 'redemption_wu';

  return 'redemption_yu';
}
