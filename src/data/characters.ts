import { CharacterProfile, CharacterId } from '../types';

import yuYalanImg from '../assets/images/char_xiaoqiao_1786708736129.jpg';
import chenChunchiImg from '../assets/images/char_zhuangzhou_1786708725626.jpg';
import liangJinhaoImg from '../assets/images/char_yixing_1786708747601.jpg';
import fangJialuImg from '../assets/images/char_dolia_1786708713290.jpg';
import wuLuyaImg from '../assets/images/char_angela_1786708702008.jpg';

export const CHARACTERS: Record<CharacterId, CharacterProfile> = {
  yu_yalan: {
    id: 'yu_yalan',
    name: '虞亚岚',
    pinyin: 'Yu Yalan',
    title: '折扇荷风 · 灵动法刺',
    prototype: '小乔 (中路 / 远程法刺)',
    role: '中路 / 核心爆发',
    color: '#db2777', // 樱粉 / 紫红
    secondaryColor: '#fce7f3',
    quote: '有指挥官你在身后看着，亚岚的折扇一定能吹散所有阴霾！',
    skillName: '星华缭乱',
    skillDesc: '召唤持续流星雨对范围内敌方造成毁灭性群体法术轰击，并大幅提升移动速度。',
    bio: '小巧圆脸与紫色大眼睛的元气少女。深棕黑色头发挽成双环形发髻，缀以紫色花朵发饰；身穿紫白露肩古风短裙与白色泡泡广袖，手持一柄巨大华美折扇。',
    portrait: yuYalanImg,
    tags: ['巨大折扇', '双环发髻', '古风短裙', '泡泡广袖']
  },
  chen_chunchi: {
    id: 'chen_chunchi',
    name: '陈春池',
    pinyin: 'Chen Chunchi',
    title: '梦境游龙 · 守护坚壁',
    prototype: '庄周 (游走 / 守护辅助)',
    role: '游走 / 团队解控',
    color: '#0284c7', // 天青海蓝
    secondaryColor: '#e0f2fe',
    quote: '蝴蝶是我，还是我是蝴蝶……指挥官，困了可以靠着我睡一会儿哦。',
    skillName: '天人合一',
    skillDesc: '化入天人合一梦境，瞬间为全体队友解除所有负面控制并附加免伤护盾。',
    bio: '清秀偏瘦的粉色中长发少年，总是恬静闭目；头顶金色枝状发饰，内着白衣，身披红金镶边的欧式长外袍与黑色长皮靴，悠然躺卧在蓬松绵羊云朵之上。',
    portrait: chenChunchiImg,
    tags: ['粉发闭目', '枝状发饰', '欧式长袍', '蓬松羊云']
  },
  liang_jinhao: {
    id: 'liang_jinhao',
    name: '梁锦浩',
    pinyin: 'Liang Jinhao',
    title: '弈境天元 · 阵地掌控',
    prototype: '弈星 (中路 / 阵地掌控)',
    role: '中路 / 地形封锁',
    color: '#eab308', // 水墨金黄
    secondaryColor: '#fef9c3',
    quote: '世事如棋，落子无悔。但我最信任的一手，永远是指挥官你的眼光。',
    skillName: '万变之局',
    skillDesc: '以虚空为盘投射巨型八卦棋阵，强制封锁狭窄地形，将敌方困入天元棋局。',
    bio: '清瘦冷峻的银白长发少年，束高发髻并斜插红色花枝发簪；身穿米白唐代文士宽袍，衣身缀有橙红蓝金镶边与飘带，身边环绕浮动着神秘书卷。',
    portrait: liangJinhaoImg,
    tags: ['银白长发', '唐代文士袍', '浮动书卷', '花枝发簪']
  },
  fang_jialu: {
    id: 'fang_jialu',
    name: '方佳璐',
    pinyin: 'Fang Jialu',
    title: '潮汐天籁 · 奇迹刷新',
    prototype: '朵莉亚 (游走 / 技能刷新)',
    role: '游走 / 战术战略辅助',
    color: '#06b6d4', // 人鱼荧光青蓝
    secondaryColor: '#cffafe',
    quote: '指挥官，听见大海的心跳了吗？只要你一声令下，我就为你唱响刷新奇迹！',
    skillName: '天籁之音',
    skillDesc: '吟唱人鱼神圣赞歌，瞬间刷新指定核心队友的终极技能冷却，并提供水幕视野。',
    bio: '蓝紫色眼瞳的人鱼少女，深棕紫调的长卷发编成粗大长辫；头戴金蓝西域风发饰与金色项饰，身着黑金蓝配色露肩西域舞裙，金色配饰流光溢彩。',
    portrait: fangJialuImg,
    tags: ['蓝紫眼瞳', '西域舞裙', '粗大长辫', '金色配饰']
  },
  wu_luya: {
    id: 'wu_luya',
    name: '吴露亚',
    pinyin: 'Wu Luya',
    title: '炽焰星火 · 毁灭极光',
    prototype: '安琪拉 (中路 / 极限爆发)',
    role: '中路 / 远程强攻',
    color: '#f97316', // 炽焰亮橙
    secondaryColor: '#ffedd5',
    quote: '哼！别以为指挥官长得好看本小姐就会听你的……好吧，草丛蹲好了，目标是谁？！',
    skillName: '炽热光辉',
    skillDesc: '引爆魔法典籍释放贯穿全场的超高能炽焰毁灭光束，获得霸体护盾并摧毁一切。',
    bio: '大蓝眼、粉亮粉色短发的电竞天才少女。佩戴附带机械兔耳的大型科技耳机，身着黑蓝白拼色赛博短连衣裙、黑色露指手套与不对称过膝长筒袜。',
    portrait: wuLuyaImg,
    tags: ['粉色短发', '机械兔耳耳机', '赛博短裙', '露指手套']
  },
  commander: {
    id: 'commander',
    name: '战术指挥官',
    pinyin: 'Commander',
    title: '稷下总督学兼任主教练',
    prototype: '玩家主角',
    role: '战术统帅',
    color: '#c8a05e',
    secondaryColor: '#fef3c7',
    quote: '每一个指令，都是通往王座的坐标。',
    skillName: '心流统帅',
    skillDesc: '洞察战局全局走势，精准把控战场转折点。',
    bio: '稷下战队的战术大脑，五位年轻传承者最信赖的引路人。',
    portrait: '',
    tags: ['战术大脑', '团队核心', '赛场掌控']
  },
  announcer: {
    id: 'announcer',
    name: '官方解说席',
    pinyin: 'Announcer',
    title: 'KPL 总决赛官方解说',
    prototype: '解说',
    role: '战况播报',
    color: '#38bdf8',
    secondaryColor: '#f0f9ff',
    quote: '稷下战队动了！这是载入史册的一记神级战术指令！',
    skillName: '全息转播',
    skillDesc: '向全场数万观众实时解说战况。',
    bio: '官方解说席。',
    portrait: '',
    tags: ['解说', '实时播报']
  },
  system: {
    id: 'system',
    name: '稷下战术终端',
    pinyin: 'Tactical System',
    title: '战场全息推演系统',
    prototype: '系统',
    role: '战报系统',
    color: '#94a3b8',
    secondaryColor: '#f1f5f9',
    quote: '战术领先度已刷新。',
    skillName: '战术推演',
    skillDesc: '分析全场经济与视野差。',
    bio: '战术终端系统。',
    portrait: '',
    tags: ['系统', '数据分析']
  }
};
