import { ActData } from '../types';

export const ACTS_DATA: ActData[] = [
  {
    id: 1,
    title: 'Act 1 · 破晓试炼',
    phaseName: '前期对线、空间之灵与红隼争夺',
    subtitle: 'River & Jungle Skirmish · 中路抢线分流，对抗路空间之灵与发育路红隼博弈',
    summary: '总决赛首局开打，全场数万名观众的呐喊声响彻场馆。中路第一波兵线迅速交汇，双方战术交锋焦点全面聚焦在1分钟刷新的对抗路「空间之灵」与发育路边线小野「红隼」的归属上。',
    initialDialogues: [
      {
        speaker: '官方解说席',
        characterId: 'announcer',
        text: '欢迎来到世界冠军杯总决赛现场！决胜局开局，双方中路迅速清线！第一波节奏的胜负手完全在于1分钟对抗路空间之灵与发育路红隼的争夺！',
        sfx: 'click'
      },
      {
        speaker: '虞亚岚',
        characterId: 'yu_yalan',
        emotion: 'serious',
        text: '指挥官！中路兵线已经被我挥动半人高的大折扇迅速清空！敌方中野辅正在往对抗路靠拢，他们想要强吃1分钟刷新的空间之灵！'
      },
      {
        speaker: '陈春池',
        characterId: 'chen_chunchi',
        emotion: 'normal',
        text: '唔……我在对抗路传送阵附近的草丛里看到了空间之灵的虚影。如果对面三人压过来，我一个人守会有点吃力哦。'
      },
      {
        speaker: '吴露亚',
        characterId: 'wu_luya',
        emotion: 'excited',
        text: '指挥官！发育路这边的红隼野怪也刷了！敌方射手正在偷偷打红隼，只要我们包过去，不仅能抢下红隼，还能直接拿下一血！'
      },
      {
        speaker: '梁锦浩',
        characterId: 'liang_jinhao',
        emotion: 'serious',
        text: '世事如棋，开局两难。转线对抗路控空间之灵可保全员升四级，转线下路包夹抢红隼可直接打崩敌方核心射手。指挥官，请落子！'
      }
    ],
    tacticalPrompt: '【战术决策指令】1分钟关键节点，中路兵线已清空，请下达前期第一波资源争夺指令：',
    options: [
      {
        id: 'act1_opt1',
        choiceText: '指令梁锦浩与虞亚岚转线支援对抗路，配合陈春池争夺1分钟空间之灵。',
        heroId: 'liang_jinhao',
        tpDelta: 15,
        afChanges: {
          liang_jinhao: 6,
          chen_chunchi: 7,
          yu_yalan: 4
        },
        isPositive: true,
        tacticalTitle: '天元控灵 · 抢占空间之灵',
        rootCauseAnalysis: '中路清线后第一时间驰援对抗路，利用弈星棋子减速封路与庄周免控，成功斩获1分钟空间之灵，全队经验领先升四级。',
        coachAdvice: '前期掌控空间之灵能为全队提供极其珍贵的群体经验与金币，帮助边路稳固对线优势。',
        outcomeDialogues: [
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'serious',
            text: '落子天元！黑白弈子在对抗路草丛相吸，敌方中野被强行逼退！'
          },
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'excited',
            text: '梦蝶扑扇……空间之灵被我们稳稳收下了，全员经验条大幅上涨！'
          },
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '折扇清风拂过，敌方打野残血交闪回城！前期节奏掌握在我们手里啦！'
          }
        ]
      },
      {
        id: 'act1_opt2',
        choiceText: '指令陈春池对抗路单人防守，其余四人集结发育路争夺红隼并越塔强抓敌方射手。',
        heroId: 'wu_luya',
        tpDelta: 13,
        afChanges: {
          chen_chunchi: -3,
          wu_luya: 7,
          fang_jialu: 6,
          yu_yalan: 5
        },
        isPositive: true,
        tacticalTitle: '弃边保核 · 控红隼斩一血',
        rootCauseAnalysis: '果断执行战术割舍，对抗路战略性放弃空间之灵承受压制，四人集结发育路瞬间抢下红隼并越塔击杀敌方射手。',
        coachAdvice: '牺牲单人路换取核心发育路巨大优势是常见电竞战术，虽然抗压位压力巨大，但为全队赢得了关键突破口。',
        outcomeDialogues: [
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'normal',
            text: '唔……虽然我被对面三个人越塔打残只能缩在二塔，但为了队伍，我抗住了。'
          },
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'excited',
            text: '哇哈哈！红隼是本小姐的了！敌方射手交出闪现也被我的火球精准轰死！一血到手！'
          },
          {
            speaker: '方佳璐',
            characterId: 'fang_jialu',
            emotion: 'excited',
            text: '人鱼潮汐护盾给上！发育路一塔血量直接被我们打掉半血！'
          }
        ]
      },
      {
        id: 'act1_opt3',
        choiceText: '指令全员在中路两侧河道草丛保持隐蔽蹲守，放弃游走并等待敌方走位失误。',
        heroId: 'commander',
        tpDelta: -14,
        afChanges: {
          wu_luya: -5,
          yu_yalan: -4,
          liang_jinhao: -4,
          chen_chunchi: -3
        },
        isPositive: false,
        tacticalTitle: '战术误判 · 错失双边中立资源',
        rootCauseAnalysis: '中路清线后原地死蹲草丛未分流支援，导致对抗路空间之灵与发育路红隼全被敌方收入囊中。',
        coachAdvice: '前期清线后必须立刻分流支援双边争夺空间之灵或红隼，原地盲目蹲伏只会白白丧失对线优势与抢4节奏。',
        outcomeDialogues: [
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'surprised',
            text: '搞什么啊指挥官？！在中路死蹲根本蹲不到人，敌方不仅拿了红隼还拿了空间之灵！'
          },
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'worried',
            text: '敌方全员提前到达4级，兵线推过来了……我们开局陷入了严重的数据劣势。'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '稷下战队开局这波中路蹲守明显出现了战术失误，白白让掉了两路中立生物！'
          }
        ]
      }
    ],
    conclusionDialogues: [
      {
        speaker: '战术指挥官',
        characterId: 'commander',
        text: '首波交锋尘埃落定，全员立刻按照预定兵线节拍回防，准备迎接4分钟首条暴君决战！'
      }
    ]
  },
  {
    id: 2,
    title: 'Act 2 · 龙坑博弈',
    phaseName: '四分钟首条暴君争夺战',
    subtitle: 'Abyssal Dragon Contest · 高压龙坑视野盲区排查与拼惩戒博弈',
    summary: '游戏进行到第4分钟，第一条躯干暴君在深渊龙坑破土而出。全场经济差极小，双方十人在龙坑狭窄隘口展开致命视野拉扯。',
    initialDialogues: [
      {
        speaker: '官方解说席',
        characterId: 'announcer',
        text: '4分钟关键节点！第一条暴君提供的全队额外属性将决定接下来的防御塔推进节奏！'
      },
      {
        speaker: '方佳璐',
        characterId: 'fang_jialu',
        emotion: 'normal',
        text: '指挥官！我听到龙坑后方的水流声有杂音，敌方的刺客很可能潜伏在龙坑背后的红区草丛！'
      },
      {
        speaker: '吴露亚',
        characterId: 'wu_luya',
        emotion: 'serious',
        text: '我的魔法书已经翻到毁灭篇章了！只要指挥官一声令下，我就能朝龙坑盲打一波火线！'
      },
      {
        speaker: '虞亚岚',
        characterId: 'yu_yalan',
        emotion: 'worried',
        text: '但如果盲目开龙，敌方双前排一旦从侧面卡住龙坑入口，我们可能会被关门打狗……'
      }
    ],
    tacticalPrompt: '【战术决策指令】暴君血量正在下降，敌方全员在暗处虎视眈眈，请下达龙坑决胜决策：',
    options: [
      {
        id: 'act2_opt1',
        choiceText: '指令方佳璐释放水幕探查敌方红区视野，全员保持阵型后手接团争夺暴君。',
        heroId: 'fang_jialu',
        tpDelta: 16,
        afChanges: {
          fang_jialu: 8,
          wu_luya: 5,
          yu_yalan: 4,
          liang_jinhao: 4,
          chen_chunchi: 4
        },
        isPositive: true,
        tacticalTitle: '潮汐探照 · 全员默契后手制胜',
        rootCauseAnalysis: '人鱼潮汐提供关键红区全景视野，识破敌方伏击，全员各司其职打出完美团战，五人默契度全线提升。',
        coachAdvice: '龙坑争夺视野为王，先探清敌方蹲坑站位再打反手，是高水平电竞的黄金准则。',
        outcomeDialogues: [
          {
            speaker: '方佳璐',
            characterId: 'fang_jialu',
            emotion: 'excited',
            text: '聆听人鱼的潮汐回响吧！水幕照亮了——敌方打野果然就蹲在红Buff草丛后！'
          },
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '抓到你了！巨扇旋风直接击飞敌方打野，抢下暴君！'
          },
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'excited',
            text: '炽热光辉火线扫射！敌方阵型瞬间溃散，打野直接被蒸发！'
          }
        ]
      },
      {
        id: 'act2_opt2',
        choiceText: '指令陈春池单人突入敌方红区卡住隘口断后，双C进龙坑全力输出并抢下暴君。',
        heroId: 'chen_chunchi',
        tpDelta: 11,
        afChanges: {
          chen_chunchi: 7,
          yu_yalan: 5,
          wu_luya: -3
        },
        isPositive: true,
        tacticalTitle: '孤身断后 · 险中拼下暴君',
        rootCauseAnalysis: '虽然凭借庄周单人抗下全队集火抢下暴君，但庄周被敌方重创打残，吴露亚也因缺少保护被迫交闪逃生。',
        coachAdvice: '让前排孤立无援地肉身断后属于高风险搏命战术，虽然拿到资源但极易造成前后排信任撕裂。',
        outcomeDialogues: [
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'worried',
            text: '咳……五个人的技能全砸在我的梦蝶上了，血量见底……好痛啊指挥官。'
          },
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'surprised',
            text: '指挥官你怎么不让前排保我啊！本小姐差点被对面刺客切死了，闪现都交了！'
          },
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '春池辛苦了！暴君虽然抢下来了，但大家状态很危险，快撤！'
          }
        ]
      },
      {
        id: 'act2_opt3',
        choiceText: '指令全员保留关键大招与惩戒技能，在龙坑正面利用普通攻击持续拉扯试探。',
        heroId: 'commander',
        tpDelta: -15,
        afChanges: {
          liang_jinhao: -5,
          fang_jialu: -5,
          yu_yalan: -4,
          wu_luya: -4,
          chen_chunchi: -3
        },
        isPositive: false,
        tacticalTitle: '犹豫拉扯 · 惨遭抢龙包夹',
        rootCauseAnalysis: '在龙坑正面过度迟疑，导致暴君被敌方远程大招抢夺，且被敌方打野绕后包抄打残三人。',
        coachAdvice: '龙坑战机转瞬即逝，犹豫不决只会将主动权双手奉送给对手。',
        outcomeDialogues: [
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'worried',
            text: '迟疑太久了！敌方刺客从上路河道利用位移强行抢到了暴君最后一击！'
          },
          {
            speaker: '方佳璐',
            characterId: 'fang_jialu',
            emotion: 'worried',
            text: '呀！我们被暴君的击飞和敌方的前排夹在龙坑里了，快撤！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '这波稷下战队决策拖泥带水，被黑曜之翼抢下暴君并丢掉下一塔！全队陷入被动！'
          }
        ]
      }
    ],
    conclusionDialogues: [
      {
        speaker: '战术指挥官',
        characterId: 'commander',
        text: '龙坑战告一段落，全员立刻转入中期换线发育期，注意边路兵线推挤！'
      }
    ]
  },
  {
    id: 3,
    title: 'Act 3 · 边路风暴',
    phaseName: '中期转线与四一分推应对',
    subtitle: 'Split Push & Collapse · 中期转线期抓单、反推与包夹抉择',
    summary: '第7分钟，敌方单挑强势的边路战神在下路进行单人深入带线，而敌方其余四人在中路疯狂施压，试图牵制稷下战队主力。',
    initialDialogues: [
      {
        speaker: '官方解说席',
        characterId: 'announcer',
        text: '黑曜之翼拿出了招牌的四一分推体系！敌方边路已经将兵线推到了稷下战队下路二塔下！'
      },
      {
        speaker: '吴露亚',
        characterId: 'wu_luya',
        emotion: 'serious',
        text: '气死我了！那个带线的家伙仗着自己单挑厉害，在塔前疯狂亮牌子嘲讽本小姐！'
      },
      {
        speaker: '梁锦浩',
        characterId: 'liang_jinhao',
        emotion: 'serious',
        text: '敌方四人在中路只是虚张声势，他们的站位极度分散。如果分兵防守，我们可能会被逐个击破；如果集体包夹下路，中路一塔可能失守。'
      },
      {
        speaker: '方佳璐',
        characterId: 'fang_jialu',
        emotion: 'normal',
        text: '指挥官，我的天籁之音已经准备好了！可以随时为核心队友提供第二轮大招支持！'
      }
    ],
    tacticalPrompt: '【战术决策指令】面对敌方高压四一分推，请下达破局战术指令：',
    options: [
      {
        id: 'act3_opt1',
        choiceText: '指令梁锦浩在中路施放大招棋盘牵制敌方主力，吴露亚与方佳璐绕后包抄下路单带英雄。',
        heroId: 'wu_luya',
        tpDelta: 18,
        afChanges: {
          wu_luya: 8,
          fang_jialu: 7,
          liang_jinhao: 6
        },
        isPositive: true,
        tacticalTitle: '声东击西 · 瞬杀单带战神',
        rootCauseAnalysis: '利用中路弈星大范围棋阵拖延敌方主力，双人突袭下路，方佳璐刷新吴露亚大招实现两轮毁灭光束瞬秒敌方单带核心。',
        coachAdvice: '处理单带最有效的方式是利用高爆发快速形成局部多打少，不给对方回援时间。',
        outcomeDialogues: [
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'serious',
            text: '万变之局，落定中路！敌方四人被我的棋盘结界强行阻隔在中路河道之外！'
          },
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'excited',
            text: '尝尝本小姐的炽热极光吧！呀——方佳璐的人鱼歌声让我大招立刻刷新了，再来一束！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '瞬间融化！敌方单带边路连技能都没交出来直接暴毙！稷下战队顺势拔掉下路二塔！'
          }
        ]
      },
      {
        id: 'act3_opt2',
        choiceText: '指令陈春池放掉边路二塔回撤，虞亚岚带领主力强推敌方中路一塔。',
        heroId: 'yu_yalan',
        tpDelta: 12,
        afChanges: {
          yu_yalan: 8,
          chen_chunchi: 6,
          liang_jinhao: 3
        },
        isPositive: true,
        tacticalTitle: '围魏救赵 · 中路强推外塔',
        rootCauseAnalysis: '果断以边换中撕开敌方中路门户，虞亚岚战术地位确立极为兴奋，陈春池也得到指挥官及时回防赞许。',
        coachAdvice: '以中换边战略价值极高，战术执行果断才能抢占视野主导权。',
        outcomeDialogues: [
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '大折扇吹起敌方双C！中路一塔告破，他们不得不交出回城！'
          },
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'worried',
            text: '下路二塔被推掉了……我的防线没能守住，抱歉指挥官。'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '极其果断的以攻代守！稷下战队用下二塔的代价撕开了黑曜之翼的中路大门！'
          }
        ]
      },
      {
        id: 'act3_opt3',
        choiceText: '指令全员分流至三条兵线，各自单人清兵延缓敌方推进节奏。',
        heroId: 'commander',
        tpDelta: -15,
        afChanges: {
          chen_chunchi: -5,
          wu_luya: -5,
          liang_jinhao: -4
        },
        isPositive: false,
        tacticalTitle: '兵力分散 · 被逐个击破',
        rootCauseAnalysis: '面对四一分推采取平庸的全面分散防守，导致单兵作战能力不足被敌方集结连破两塔。',
        coachAdvice: '四一分推最忌讳全员被动分流，必须集中绝对优势力量打其中一路。',
        outcomeDialogues: [
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'worried',
            text: '敌方突然在中路全员加速突进，我们防守人数不够，中路二塔被强拔了……'
          },
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'surprised',
            text: '可恶！我一个人在下路根本清不完炮车兵线！被抓了！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '稷下战队阵型完全被割裂开来，场上局势开始变得严峻了！'
          }
        ]
      }
    ],
    conclusionDialogues: [
      {
        speaker: '战术指挥官',
        characterId: 'commander',
        text: '全员收拢阵型，不要被对手的牵制扰乱心智，接下来的主宰刷新将是转折点！'
      }
    ]
  },
  {
    id: 4,
    title: 'Act 4 · 绝境裂痕',
    phaseName: '中路掉点与高地防守反击',
    subtitle: 'High-Ground Defense · 突发掉点中二塔破，高地防御战中的人员士气安抚与防守反击',
    summary: '比赛进入第10分钟前夕，野区遭遇突发埋伏，队伍出现走位脱节。黑曜之翼带着强化兵线兵临高地塔下，局势万分危急。',
    initialDialogues: [
      {
        speaker: '官方解说席',
        characterId: 'announcer',
        text: '危险了！黑曜之翼抓住一波视野盲区造成了稷下战队的残血脱节！五人抱团直扑中路高地！'
      },
      {
        speaker: '虞亚岚',
        characterId: 'yu_yalan',
        emotion: 'worried',
        text: '都怪我……刚才为了探野区被敌方技能擦伤了血量……指挥官，我们高地要守不住了吗……'
      },
      {
        speaker: '陈春池',
        characterId: 'chen_chunchi',
        emotion: 'serious',
        text: '亚岚别慌，只要高地水晶还在，我们就能翻盘！指挥官，我的免伤大招还在，让我顶在最前面！'
      },
      {
        speaker: '梁锦浩',
        characterId: 'liang_jinhao',
        emotion: 'serious',
        text: '高地狭窄地形是对弈星大招最完美的舞台。只要指挥官下令，我就能在塔下画地为牢！'
      }
    ],
    tacticalPrompt: '【战术决策指令】敌方五人正护送先锋主宰兵逼近高地防御塔，请下达绝境防守反击指令：',
    options: [
      {
        id: 'act4_opt1',
        choiceText: '指令梁锦浩在高地塔下开启全域棋阵封锁敌方，陈春池开大解控配合防御塔反打。',
        heroId: 'liang_jinhao',
        tpDelta: 22,
        afChanges: {
          liang_jinhao: 9,
          chen_chunchi: 7,
          yu_yalan: 5,
          wu_luya: 5,
          fang_jialu: 5
        },
        isPositive: true,
        tacticalTitle: '高地弈界 · 全员羁绊绝地反杀',
        rootCauseAnalysis: '弈星高地狭窄地形大招封锁全员，庄周免除敌方强开控制，防御塔与双C爆发完成0换3惊天逆转，全员羁绊大幅飙升。',
        coachAdvice: '高地地形狭窄，控制链重叠效果成倍放大，抓住对手越塔急躁心态防守反击乃顶级指挥艺术。',
        outcomeDialogues: [
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'excited',
            text: '以高地为盘，以敌众为子！天元棋局，全域封锁！'
          },
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'excited',
            text: '天人合一！全员免疫控制，护盾全开！反击时刻到了！'
          },
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '星华缭乱配合吴露亚火线轰击！敌方三名核心全被防御塔和流星雨融化了！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '我的天啊！神级高地防守反击！稷下战队在绝境中打出了载入史册的0换3！'
          }
        ]
      },
      {
        id: 'act4_opt2',
        choiceText: '指令方佳璐走位向前吸引敌方火力并开启大招刷新技能，保全虞亚岚在后排清空高地兵线。',
        heroId: 'fang_jialu',
        tpDelta: 15,
        afChanges: {
          fang_jialu: 7,
          yu_yalan: 7,
          wu_luya: 4
        },
        isPositive: true,
        tacticalTitle: '天籁舍身 · 牺牲保塔清兵',
        rootCauseAnalysis: '方佳璐主动献祭肉身引开敌方刺客并刷新小乔大招，虞亚岚星华缭乱强行清空兵线守住高地，方佳璐虽阵亡但立下首功。',
        coachAdvice: '在高地保卫战中，兵线高于一切，断尾求生清空兵线是绝境中最理智的选择。',
        outcomeDialogues: [
          {
            speaker: '方佳璐',
            characterId: 'fang_jialu',
            emotion: 'worried',
            text: '人鱼不会退缩！亚岚姐姐，接收我的天籁之音……唔，我被刺客切死了，一定要守住啊！'
          },
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '佳璐你放心！第二轮星华缭乱狂风暴雨！高地兵线全部清空，塔守住了！呜呜……佳璐太棒了！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '太顽强了！稷下战队用辅助阵亡的代价守住了最后一座高地防御塔！'
          }
        ]
      },
      {
        id: 'act4_opt3',
        choiceText: '指令吴露亚脱离防御塔范围，前置埋伏在塔外草丛尝试单人爆发伏击敌方射手。',
        heroId: 'wu_luya',
        tpDelta: -18,
        afChanges: {
          wu_luya: -6,
          liang_jinhao: -5,
          yu_yalan: -4,
          chen_chunchi: -3,
          fang_jialu: -3
        },
        isPositive: false,
        tacticalTitle: '盲目出塔 · 掉点导致高地告破',
        rootCauseAnalysis: '在高地防守时冒失离开防御塔保护范围，被敌方前排直接先手集火秒杀，导致中路高地塔失守。',
        coachAdvice: '高地防守严禁脱离防御塔庇护，冒进出击只会给敌方越塔突破口。',
        outcomeDialogues: [
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'surprised',
            text: '唔啊！对方前排带了魔女斗篷，我没能秒掉射手被反杀了……对不起大家！呜……'
          },
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'worried',
            text: '减员一人，中路高地防御塔被推平了……指挥官，这波太冲动了。'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '致命掉点！吴露亚冒进被秒，黑曜之翼推掉了稷下战队的中路高地！'
          }
        ]
      }
    ],
    conclusionDialogues: [
      {
        speaker: '战术指挥官',
        characterId: 'commander',
        text: '擦干冷汗！我们从绝境中挺过来了，立刻稳住野区视野，准备争夺暗影主宰！'
      }
    ]
  },
  {
    id: 5,
    title: 'Act 5 · 暗影主宰',
    phaseName: '十分钟暗影主宰决战与草丛拉扯',
    subtitle: 'Shadow Overlord Ambush · 10分钟暗影主宰决战，真假打龙、草丛伏击与拉扯分割战场',
    summary: '第12分钟，暗影主宰发出震耳欲聋的咆哮。谁能拿下这条暗影主宰，谁就能召唤三路暗影先锋直逼敌方老巢。',
    initialDialogues: [
      {
        speaker: '官方解说席',
        characterId: 'announcer',
        text: '暗影主宰降临！这绝对是决定胜负归属的终极兵权！黑曜之翼五人已经在龙坑周围排空了所有眼位！'
      },
      {
        speaker: '虞亚岚',
        characterId: 'yu_yalan',
        emotion: 'serious',
        text: '指挥官，我的折扇已经握紧了。只要你一句话，我随时可以作为先锋闪现开团！'
      },
      {
        speaker: '吴露亚',
        characterId: 'wu_luya',
        emotion: 'serious',
        text: '对面的双C站位非常靠近主宰龙坑内侧，那里是个死胡同，如果我们在外面架起火线……'
      },
      {
        speaker: '陈春池',
        characterId: 'chen_chunchi',
        emotion: 'normal',
        text: '我感觉到了敌方打野的杀气。指挥官，我们要打真龙还是打假龙诱敌？'
      }
    ],
    tacticalPrompt: '【战术决策指令】暗影主宰龙坑杀机四伏，请下达决胜主宰团战指令：',
    options: [
      {
        id: 'act5_opt1',
        choiceText: '指令全员拉扯佯攻暗影主宰引敌进坑，吴露亚在侧翼草丛架设炽热光辉进行远程火力覆盖。',
        heroId: 'wu_luya',
        tpDelta: 19,
        afChanges: {
          wu_luya: 9,
          yu_yalan: 5,
          liang_jinhao: 5,
          fang_jialu: 5
        },
        isPositive: true,
        tacticalTitle: '假打诱敌 · 极光毁灭轰击',
        rootCauseAnalysis: '完美的假打龙拉扯战术，诱骗敌方五人挤入龙坑狭窄空间，吴露亚超远距离火线贯穿全场，成为全场焦点。',
        coachAdvice: '主宰逼团是高端局最核心的控盘技巧，逼迫敌方在狭窄地形迎击高爆发阵容。',
        outcomeDialogues: [
          {
            speaker: '战术指挥官',
            characterId: 'commander',
            text: '停止打龙，全员回拉！放敌方进坑！'
          },
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'excited',
            text: '上当了吧笨蛋们！魔法典籍终极解放——炽热光辉！！'
          },
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '亚岚跟上星华暴风！主宰坑直接变成了敌方的火海墓地！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '不可思议的伤害！吴露亚一发极光火线扫中四人！暗影主宰与敌方三人被一波带走！'
          }
        ]
      },
      {
        id: 'act5_opt2',
        choiceText: '指令陈春池与方佳璐顶前排承受主宰攻击与敌方骚扰，梁锦浩与虞亚岚在后排全力输出拿龙。',
        heroId: 'liang_jinhao',
        tpDelta: 14,
        afChanges: {
          chen_chunchi: 7,
          fang_jialu: 6,
          liang_jinhao: 6,
          yu_yalan: 5
        },
        isPositive: true,
        tacticalTitle: '双游抗压 · 稳夺暗影龙权',
        rootCauseAnalysis: '双游走承受了主宰的高额拍击与敌方全部POKE消耗，血量见底，为后排双C创造出绝对安全的控龙环境。',
        coachAdvice: '辅助承担主要伤害保护C位吃龙是标准打法，战后指挥官对双游走的高度认可让全队充满温情。',
        outcomeDialogues: [
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'worried',
            text: '主宰的拍击把我的护盾打碎了……快拿龙，我和佳璐快顶不住了！'
          },
          {
            speaker: '方佳璐',
            characterId: 'fang_jialu',
            emotion: 'worried',
            text: '潮汐护盾全部给后排了……主宰倒下了，先锋召唤成功，但我们要快点回城补状态！'
          },
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'normal',
            text: '全局攻守之势彻底逆转，我军已执黑子先行。'
          }
        ]
      },
      {
        id: 'act5_opt3',
        choiceText: '指令全员无视敌方站位动向，全技能集火主宰强行快速斩杀。',
        heroId: 'commander',
        tpDelta: -20,
        afChanges: {
          yu_yalan: -6,
          liang_jinhao: -6,
          chen_chunchi: -5,
          wu_luya: -5,
          fang_jialu: -5
        },
        isPositive: false,
        tacticalTitle: '硬吃减益 · 惨遭接盘全员团灭',
        rootCauseAnalysis: '未注意暗影主宰造成的全员魔抗减益与高额击飞，被敌方以逸待劳包夹团灭并丢掉主宰，全队信任跌入谷底。',
        coachAdvice: '主宰会对攻击者施加重度减益Debuff，切忌在敌方全员健在时无脑强行打龙。',
        outcomeDialogues: [
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'worried',
            text: '呀！主宰的拍击把我们全队击飞了，身上全都是减抗Debuff！'
          },
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'worried',
            text: '敌方全员进场收割了……我们状态太差，主宰被抢，四人阵亡……'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '致命失误！稷下战队强打主宰付出惨痛代价，黑曜之翼抢下主宰反推！'
          }
        ]
      }
    ],
    conclusionDialogues: [
      {
        speaker: '战术指挥官',
        characterId: 'commander',
        text: '全员重整旗鼓，暗影先锋已经出击，准备向敌方高地发起全面总攻！'
      }
    ]
  },
  {
    id: 6,
    title: 'Act 6 · 破阵之锋',
    phaseName: '三路兵线压制与敌方高地攻坚',
    subtitle: 'Inhibitor Siege & Flanking · 三路超级兵进逼敌方高地，寻找敌方双C走位失误强行破阵',
    summary: '第16分钟，三路暗影先锋与强化兵线浩浩荡荡涌向黑曜之翼的高地防御塔。面对敌方顽强的铁桶阵防守，必须找到一击破阵的死穴。',
    initialDialogues: [
      {
        speaker: '官方解说席',
        characterId: 'announcer',
        text: '三路大军压境！黑曜之翼已经全员退守高地塔下，死死守住最后的三道防线！'
      },
      {
        speaker: '梁锦浩',
        characterId: 'liang_jinhao',
        emotion: 'serious',
        text: '敌方阵型如龟缩铁桶，但他们的站位过于依赖高地塔的光环。根据算力分析，当上路兵线入塔的瞬间，他们的核心射手会出现0.5秒的走位偏离。'
      },
      {
        speaker: '虞亚岚',
        characterId: 'yu_yalan',
        emotion: 'serious',
        text: '指挥官，我的折扇已经蓄满狂风！只要能打开哪怕一丝缺口，亚岚就能卷起胜利的风暴！'
      },
      {
        speaker: '方佳璐',
        characterId: 'fang_jialu',
        emotion: 'excited',
        text: '佳璐的人鱼歌声会为所有人提供加速与刷新，指挥官，下达攻坚命令吧！'
      }
    ],
    tacticalPrompt: '【战术决策指令】敌方高地铁桶防守极其严密，请下达高地破阵终极攻坚指令：',
    options: [
      {
        id: 'act6_opt1',
        choiceText: '指令梁锦浩大招棋盘封锁敌方高地塔范围，虞亚岚闪现进场开启大招突袭敌方后排双C。',
        heroId: 'yu_yalan',
        tpDelta: 19,
        afChanges: {
          yu_yalan: 9,
          liang_jinhao: 8,
          fang_jialu: 5
        },
        isPositive: true,
        tacticalTitle: '天元封城 · 闪现狂风破阵',
        rootCauseAnalysis: '弈星巨型棋阵直接封死敌方所有撤退回泉水的路径，小乔闪现进场星华缭乱瞬秒敌方核心双C。',
        coachAdvice: '高地攻坚需要绝对的勇气与控制衔接，大范围地形封锁能让防守方的塔下优势化为乌有。',
        outcomeDialogues: [
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'excited',
            text: '整座高地，皆为我盘！万变之局——落！'
          },
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '折扇所向，无坚不摧！闪现进场——星华缭乱！！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '秒杀了！敌方核心双C在高地塔下被瞬间融化！三路高地防御塔接连崩塌！'
          }
        ]
      },
      {
        id: 'act6_opt2',
        choiceText: '指令陈春池与方佳璐轮流进塔扛伤，吴露亚在射程边缘持续点塔推进。',
        heroId: 'wu_luya',
        tpDelta: 15,
        afChanges: {
          wu_luya: 6,
          chen_chunchi: 6,
          fang_jialu: 6,
          yu_yalan: 3
        },
        isPositive: true,
        tacticalTitle: '肉身抗塔 · 稳步蚕食三路',
        rootCauseAnalysis: '庄周与朵莉亚轮流抗塔伤害，吴露亚高效推平建筑，全队前后排各司其职稳健破三路。',
        coachAdvice: '在面对高爆发防守阵容时，利用超级兵和前排轮流抗塔拆建筑是最稳妥的胜势扩大法。',
        outcomeDialogues: [
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'normal',
            text: '防御塔的攻击落在梦境里就像雨滴一样……大家放心拆，我还能再抗五发！'
          },
          {
            speaker: '方佳璐',
            characterId: 'fang_jialu',
            emotion: 'worried',
            text: '呜……防御塔打我好痛呀，但是三座高地塔全被我们拆光啦！'
          },
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'excited',
            text: '哼！三路全破，超级兵进城！看你们还能躲到哪里去！'
          }
        ]
      },
      {
        id: 'act6_opt3',
        choiceText: '指令全员不等小兵进塔，直接越过高地防御塔强冲敌方泉水前截杀残血英雄。',
        heroId: 'commander',
        tpDelta: -18,
        afChanges: {
          wu_luya: -7,
          liang_jinhao: -6,
          yu_yalan: -5,
          chen_chunchi: -5,
          fang_jialu: -5
        },
        isPositive: false,
        tacticalTitle: '无兵越塔 · 惨遭泉水反杀',
        rootCauseAnalysis: '在缺乏兵线庇护的情况下盲目越塔冲泉，防御塔真实伤害迅速累加导致全队暴毙。',
        coachAdvice: '推塔游戏永远要以兵线为核心，没有小兵进塔的防御塔拥有极高防御加成与致命真伤。',
        outcomeDialogues: [
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'surprised',
            text: '痛痛痛！防御塔的伤害怎么这么高？！我的护盾瞬间就碎了！'
          },
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'worried',
            text: '兵线还没进塔，防御塔减伤太高了……快后撤！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '太冲动了！稷下战队越塔过深被黑曜之翼泉水反打换掉三人，攻势被迫暂停！'
          }
        ]
      }
    ],
    conclusionDialogues: [
      {
        speaker: '战术指挥官',
        characterId: 'commander',
        text: '敌方水晶血量已经暴露！最后的总攻时刻到了，全员——随我剑指总冠军！'
      }
    ]
  },
  {
    id: 7,
    title: 'Act 7 · 巅峰王座',
    phaseName: '总决赛水晶决战与终极协同',
    subtitle: 'Grand Final Base Nexus · 总决赛水晶终极一波，全员五位一体合体爆发',
    summary: '决胜时刻来临！黑曜之翼的主水晶仅剩最后防线。全场十万观众起立欢呼，金色的冠军雨即将从穹顶倾泻而下！',
    initialDialogues: [
      {
        speaker: '官方解说席',
        characterId: 'announcer',
        text: '这是世界冠军杯历史上最震撼的决胜时刻！稷下战队全员集合在敌方水晶之前！'
      },
      {
        speaker: '虞亚岚',
        characterId: 'yu_yalan',
        emotion: 'excited',
        text: '指挥官！看啊，那是我们梦寐以求的冠军水晶！只要打碎它，我们就是世界第一！'
      },
      {
        speaker: '陈春池',
        characterId: 'chen_chunchi',
        emotion: 'excited',
        text: '我的睡意已经完全消散了……指挥官，这一路上多亏了你的陪伴与信任。'
      },
      {
        speaker: '梁锦浩',
        characterId: 'liang_jinhao',
        emotion: 'excited',
        text: '此局弈至终局，胜负已定。但这一手最华丽的天元收官，交由指挥官你来定夺。'
      },
      {
        speaker: '方佳璐',
        characterId: 'fang_jialu',
        emotion: 'excited',
        text: '大海的赞歌将在这一刻化作永恒的奇迹！指挥官，我们准备好了！'
      },
      {
        speaker: '吴露亚',
        characterId: 'wu_luya',
        emotion: 'excited',
        text: '哼！终于到了这一步了……指挥官，等赢了比赛，你可必须答应我一个愿望哦！'
      }
    ],
    tacticalPrompt: '【战术决策指令】全员大招全开，主水晶近在咫尺，请下达总决赛最后终极一波指令：',
    options: [
      {
        id: 'act7_opt1',
        choiceText: '指令梁锦浩封锁泉水、方佳璐群体刷新技能，全员合力交织大招直接锁定敌方水晶。',
        heroId: 'yu_yalan',
        tpDelta: 22,
        afChanges: {
          yu_yalan: 8,
          chen_chunchi: 8,
          liang_jinhao: 8,
          fang_jialu: 8,
          wu_luya: 8
        },
        isPositive: true,
        tacticalTitle: '五位一体 · 传奇天元共鸣夺冠',
        rootCauseAnalysis: '完美的团队协作与羁绊共鸣，五位传承者将各自特质发挥至登峰造极，全员好感度达到巅峰，创造电竞历史奇迹。',
        coachAdvice: '团队的终极力量源于全员对指挥官的无限信任与彼此之间坚不可摧的羁绊连接。',
        outcomeDialogues: [
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'excited',
            text: '弈界锁定敌方复活泉水！'
          },
          {
            speaker: '方佳璐',
            characterId: 'fang_jialu',
            emotion: 'excited',
            text: '天籁之音全员共鸣！所有大招极限刷新！'
          },
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'excited',
            text: '天人合一护体，无人可阻！'
          },
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'excited',
            text: '炽热极光与亚岚姐姐的荷风星华合体轰击——爆吧！！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '水晶碎裂！让我们恭喜——稷下战队！他们是新的世界总冠军！！'
          }
        ]
      },
      {
        id: 'act7_opt2',
        choiceText: '指令陈春池单人前压封堵敌方泉水门口阻挡防守，其余四人全神贯注强拆水晶。',
        heroId: 'chen_chunchi',
        tpDelta: 18,
        afChanges: {
          chen_chunchi: 8,
          yu_yalan: 6,
          wu_luya: 6,
          liang_jinhao: 5,
          fang_jialu: 5
        },
        isPositive: true,
        tacticalTitle: '坚如磐石 · 肉身封泉点塔绝杀',
        rootCauseAnalysis: '陈春池用生命在敌方泉水前挡住所有反扑伤害并在胜利瞬间阵亡，其余四人成功点爆水晶捧杯。',
        coachAdvice: '在水晶残血时果断执行点塔指令，杜绝任何不必要的贪人头节外生枝。',
        outcomeDialogues: [
          {
            speaker: '陈春池',
            characterId: 'chen_chunchi',
            emotion: 'excited',
            text: '所有人站在我身后，我用生命为你们争取点水晶的最后三秒……唔，我倒下了，快点！'
          },
          {
            speaker: '虞亚岚',
            characterId: 'yu_yalan',
            emotion: 'excited',
            text: '最后一击！折扇破空砸向水晶核心！春池我们赢了！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '点掉了！纯粹的执行力！稷下战队顶着五个人的攻击强行点碎了水晶！！'
          }
        ]
      },
      {
        id: 'act7_opt3',
        choiceText: '指令全员在敌方水晶前优先追击敌方复活英雄刷取击杀，延后点塔动作。',
        heroId: 'commander',
        tpDelta: -22,
        afChanges: {
          wu_luya: -8,
          liang_jinhao: -7,
          yu_yalan: -7,
          chen_chunchi: -6,
          fang_jialu: -6
        },
        isPositive: false,
        tacticalTitle: '贪功冒进 · 险遭偷家反杀',
        rootCauseAnalysis: '在胜利前夕出现严重纪律性涣散，贪恋人头导致被敌方泉水反击陷入残酷拉锯苦战，全员士气暴跌。',
        coachAdvice: '无论何时都不能在水晶前轻敌狂妄，电竞比赛的终极目标永远是推倒敌方基地。',
        outcomeDialogues: [
          {
            speaker: '吴露亚',
            characterId: 'wu_luya',
            emotion: 'surprised',
            text: '等等！敌方复活后全员出了名刀，我们没秒掉，反而被泉水轰残了！'
          },
          {
            speaker: '梁锦浩',
            characterId: 'liang_jinhao',
            emotion: 'worried',
            text: '敌方超级兵已经摸到我们家水晶了！快点回防！！'
          },
          {
            speaker: '官方解说席',
            characterId: 'announcer',
            text: '惊天大反转？！稷下战队贪人头险些被偷家，虽然最终极限击碎水晶，但场面惊险万分！'
          }
        ]
      }
    ],
    conclusionDialogues: [
      {
        speaker: '战术指挥官',
        characterId: 'commander',
        text: '我们做到了！七场血战，终登王座！全员——准备迎接属于我们的荣耀与誓约！'
      }
    ]
  }
];
