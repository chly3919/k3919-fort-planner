import React, { useState, useMemo, createContext, useContext } from 'react';
import { Calculator, Swords, Clock, Trophy, Home, Flame, ChevronRight, Shield, Target, Zap, Search, BookOpen, Globe } from 'lucide-react';
import * as XLSX from 'xlsx';
import LYCEUM_DATA from './lyceumData';

// Translations
const translations = {
  en: {
    // Navigation
    home: "Home",
    fortCalc: "Fort Calc",
    barbCalc: "Barb Calc",
    lyceum: "Lyceum",
    dkpCalc: "DKP Calc",
    
    // Home Page
    heroTitle: "Rise of Kingdoms Tools",
    heroSubtitle: "Your all-in-one toolkit for Rise of Kingdoms. Calculate fort rewards, plan barbarian hunts, search Lyceum answers, and track DKP.",
    exploreTools: "Explore Tools",
    
    // Feature Cards
    fortCalculator: "Fort Calculator",
    fortCalculatorDesc: "Calculate rewards and time for barbarian fort farming sessions",
    barbCalculator: "Barb Calculator",
    barbCalculatorDesc: "Plan your barbarian hunting sessions with XP and resource estimates",
    lyceumAnswers: "Lyceum Answers",
    lyceumAnswersDesc: "Search through 1,397 Lyceum of Wisdom quiz questions",
    dkpCalculator: "DKP Calculator",
    dkpCalculatorDesc: "Calculate Death & Kill Points from player statistics",
    apManagement: "AP Management",
    apManagementDesc: "Track action point regeneration and optimize farming efficiency",
    completeRewards: "Complete Rewards",
    completeRewardsDesc: "Full reward tables for all fort levels and tiers",
    comingSoon: "Coming Soon",
    
    // Fort Calculator
    fortCalcTitle: "Barbarian Fort Calculator",
    fortCalcSubtitle: "Calculate rewards and time for your fort farming sessions",
    calculationMode: "Calculation Mode",
    byNumberOfForts: "By Number of Forts",
    byHonorPoints: "By Honor Points",
    fortLevel: "Fort Level",
    rewardTier: "Reward Tier",
    apCostPerFort: "AP Cost per Fort",
    insightTalent: "Insight Talent",
    marchTime: "March Time",
    numberOfForts: "Number of Forts",
    desiredHonorPoints: "Desired Honor Points",
    simultaneousForts: "Simultaneous Forts",
    apRegeneration: "AP Regeneration",
    apRegenDesc: "During this session you'll naturally regenerate",
    timeRequired: "Time Required",
    totalTime: "Total Time",
    timePerFort: "Time per Fort",
    totalRewards: "Total Rewards",
    hoverForDetails: "Hover over cards for details",
    honorPoints: "Honor Points",
    resourcePacks: "Resource Packs",
    tomes: "Tomes of Knowledge",
    speedups: "Speedups",
    booksOfCovenant: "Books of Covenant",
    apCost: "AP Cost",
    netApCost: "Net AP Cost",
    
    // Barbarian Calculator
    barbCalcTitle: "Barbarian Calculator",
    barbCalcSubtitle: "Calculate rewards from hunting barbarians (Lvl 30-40)",
    byBarbCount: "By Barbarian Count",
    byXPGoal: "By XP Goal",
    barbLevelRange: "Barbarian Level Range",
    to: "to",
    onlyLevel: "Only Level",
    barbarians: "barbarians",
    levels: "levels",
    numberOfBarbarians: "Number of Barbarians",
    desiredXP: "Desired XP",
    simultaneousMarches: "Simultaneous Marches",
    peacekeepingTalent: "Peacekeeping Talent",
    apFirst: "first",
    apAfter: "after",
    averageRewards: "Average Rewards",
    barbarianRewards: "Barbarian Rewards",
    resources: "Resources",
    commanderXP: "Commander XP",
    baseSpeedup: "Base Speedup",
    timePerBarbarian: "Time per Barbarian",
    barbariansPerHour: "Barbarians/Hour",
    xpPerHour: "XP/Hour",
    resourcesPerHour: "Resources/Hour",
    materialDrops: "Equipment Material Drops",
    estimated: "estimated",
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
    woodFood: "Wood/Food",
    stone: "Stone",
    gold: "Gold",
    minutes: "minutes",
    hours: "hours",
    days: "days",
    estimatesNote: "Estimates based on avg drop rates",
    
    // Lyceum
    lyceumTitle: "Lyceum of Wisdom",
    lyceumSubtitle: "Search through quiz questions and answers",
    searchPlaceholder: "Search questions...",
    questionsLoaded: "questions loaded",
    question: "Question",
    answer: "Answer",
    showing: "Showing",
    of: "of",
    results: "results",
    noResults: "No results found",
    tryDifferent: "Try a different search term",
    
    // DKP Calculator
    dkpCalcTitle: "DKP Calculator",
    dkpCalcSubtitle: "Death & Kill Points Calculator",
    playersLoaded: "players loaded",
    uploadPlayerData: "Upload Player Data",
    clickToUpload: "Click to upload Excel file (.xlsx)",
    requiredColumns: "Required columns: Username, T4 Kills, T5 Kills, T4 Deaths, T5 Deaths",
    clearData: "Clear Data",
    successfullyLoaded: "Successfully loaded",
    players: "players",
    howToGetData: "How to get this data:",
    howToStep1: "Go to",
    howToStep2: "Or in-game: Open",
    noticeBoard: "Notice Board",
    viewMemberData: "View Member Data",
    howToStep3: "Download the Excel file (only T4/T5 kills and deaths data is needed)",
    howToStep4: "Upload the downloaded file above",
    pointValuesConfig: "Point Values Configuration",
    t4KillPoints: "T4 Kill Points",
    t4DeathPoints: "T4 Death Points",
    t5KillPoints: "T5 Kill Points",
    t5DeathPoints: "T5 Death Points",
    adjustPointValues: "Adjust point values above to recalculate DKP for all players",
    customStatsCalc: "Custom Stats Calculator",
    customStatsDesc: "Enter custom stats to calculate DKP without uploading a file",
    player: "Player",
    remove: "Remove",
    username: "Username",
    totalDKP: "Total DKP",
    killPoints: "Kill Points",
    deathPoints: "Death Points",
    addAnotherPlayer: "Add Another Player",
    noPlayerData: "No player data loaded",
    uploadToStart: "Upload an Excel file above to get started",
    searchByUsername: "Search by username or ID...",
    sortBy: "Sort by:",
    power: "Power",
    kills: "Kills",
    deaths: "Deaths",
    
    // Footer
    footerText: "Rise of Kingdoms Tools • Made for Kingdom 3919",
    
    // Language
    language: "Language",
    english: "English",
    arabic: "العربية",
    chinese: "中文",
    vietnamese: "Tiếng Việt",
    
    // Additional Fort Calculator
    enterTargetHonor: "Enter your target honor points below to calculate required forts",
    tierTrophyRewards: "Tier Trophy Rewards",
    tier: "Tier",
    apPerFortStandard: "AP per fort (standard)",
    apPerFortInsight: "AP per fort",
    min: "min",
    fort: "Fort",
    forts: "Forts",
    pts: "pts",
    tbd: "TBD",
    march: "March",
    marches: "Marches",
    enterHonorGoal: "Enter honor points goal...",
    pleaseEnterHonor: "Please enter your honor points goal",
    requires: "Requires",
    runningBatches: "Running",
    batchesTotal: "batches total",
    batch: "batch",
    apRegenRate: "AP Regeneration (1 AP every X seconds)",
    fast: "Fast",
    slow: "Slow",
    duringSession: "During this session you'll naturally regenerate",
    ap: "AP",
    statsBreakdown: "Stats Breakdown",
    fortsPerHour: "Forts/Hour",
    resourcesHour: "Resources/Hour",
    
    // Additional Barb Calculator  
    seconds: "seconds",
    sec: "sec",
    killTime: "Kill Time",
    withMarches: "with marches",
    
    // Additional DKP
    id: "ID",
    noPlayersFound: "No players found matching",
    
    // Lyceum
    tip: "Tip",
    tipText: "Type a few keywords from the question to quickly find the answer",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    fortCalc: "حاسبة الحصون",
    barbCalc: "حاسبة البرابرة",
    lyceum: "الليسيوم",
    dkpCalc: "حاسبة DKP",
    
    // Home Page
    heroTitle: "أدوات Rise of Kingdoms",
    heroSubtitle: "مجموعة أدواتك الشاملة للعبة Rise of Kingdoms. احسب مكافآت الحصون، خطط لصيد البرابرة، ابحث في إجابات الليسيوم، وتتبع نقاط DKP.",
    exploreTools: "استكشف الأدوات",
    
    // Feature Cards
    fortCalculator: "حاسبة الحصون",
    fortCalculatorDesc: "احسب المكافآت والوقت لجلسات زراعة حصون البرابرة",
    barbCalculator: "حاسبة البرابرة",
    barbCalculatorDesc: "خطط لجلسات صيد البرابرة مع تقديرات الخبرة والموارد",
    lyceumAnswers: "إجابات الليسيوم",
    lyceumAnswersDesc: "ابحث في 1,397 سؤال من أسئلة اختبار ليسيوم الحكمة",
    dkpCalculator: "حاسبة DKP",
    dkpCalculatorDesc: "احسب نقاط الموت والقتل من إحصائيات اللاعبين",
    apManagement: "إدارة نقاط العمل",
    apManagementDesc: "تتبع تجديد نقاط العمل وتحسين كفاءة الزراعة",
    completeRewards: "جميع المكافآت",
    completeRewardsDesc: "جداول المكافآت الكاملة لجميع مستويات وفئات الحصون",
    comingSoon: "قريباً",
    
    // Fort Calculator
    fortCalcTitle: "حاسبة حصون البرابرة",
    fortCalcSubtitle: "احسب المكافآت والوقت لجلسات زراعة الحصون",
    calculationMode: "وضع الحساب",
    byNumberOfForts: "حسب عدد الحصون",
    byHonorPoints: "حسب نقاط الشرف",
    fortLevel: "مستوى الحصن",
    rewardTier: "فئة المكافأة",
    apCostPerFort: "تكلفة AP لكل حصن",
    insightTalent: "موهبة البصيرة",
    marchTime: "وقت المسيرة",
    numberOfForts: "عدد الحصون",
    desiredHonorPoints: "نقاط الشرف المطلوبة",
    simultaneousForts: "الحصون المتزامنة",
    apRegeneration: "تجديد AP",
    apRegenDesc: "خلال هذه الجلسة ستجدد طبيعياً",
    timeRequired: "الوقت المطلوب",
    totalTime: "الوقت الإجمالي",
    timePerFort: "الوقت لكل حصن",
    totalRewards: "إجمالي المكافآت",
    hoverForDetails: "مرر الماوس للتفاصيل",
    honorPoints: "نقاط الشرف",
    resourcePacks: "حزم الموارد",
    tomes: "كتب المعرفة",
    speedups: "تسريعات",
    booksOfCovenant: "كتب العهد",
    apCost: "تكلفة AP",
    netApCost: "صافي تكلفة AP",
    
    // Barbarian Calculator
    barbCalcTitle: "حاسبة البرابرة",
    barbCalcSubtitle: "احسب المكافآت من صيد البرابرة (مستوى 30-40)",
    byBarbCount: "حسب عدد البرابرة",
    byXPGoal: "حسب هدف الخبرة",
    barbLevelRange: "نطاق مستوى البرابرة",
    to: "إلى",
    onlyLevel: "فقط مستوى",
    barbarians: "برابرة",
    levels: "مستويات",
    numberOfBarbarians: "عدد البرابرة",
    desiredXP: "الخبرة المطلوبة",
    simultaneousMarches: "المسيرات المتزامنة",
    peacekeepingTalent: "موهبة حفظ السلام",
    apFirst: "أول",
    apAfter: "بعد",
    averageRewards: "متوسط المكافآت",
    barbarianRewards: "مكافآت البربري",
    resources: "الموارد",
    commanderXP: "خبرة القائد",
    baseSpeedup: "التسريع الأساسي",
    timePerBarbarian: "الوقت لكل بربري",
    barbariansPerHour: "برابرة/ساعة",
    xpPerHour: "خبرة/ساعة",
    resourcesPerHour: "موارد/ساعة",
    materialDrops: "مواد المعدات المسقطة",
    estimated: "تقديري",
    common: "عادي",
    uncommon: "غير عادي",
    rare: "نادر",
    epic: "أسطوري",
    legendary: "خرافي",
    woodFood: "خشب/طعام",
    stone: "حجر",
    gold: "ذهب",
    minutes: "دقائق",
    hours: "ساعات",
    days: "أيام",
    estimatesNote: "تقديرات بناءً على متوسط معدلات الإسقاط",
    
    // Lyceum
    lyceumTitle: "ليسيوم الحكمة",
    lyceumSubtitle: "ابحث في أسئلة وإجابات الاختبار",
    searchPlaceholder: "ابحث في الأسئلة...",
    questionsLoaded: "سؤال محمل",
    question: "السؤال",
    answer: "الإجابة",
    showing: "عرض",
    of: "من",
    results: "نتائج",
    noResults: "لا توجد نتائج",
    tryDifferent: "جرب مصطلح بحث مختلف",
    
    // DKP Calculator
    dkpCalcTitle: "حاسبة DKP",
    dkpCalcSubtitle: "حاسبة نقاط الموت والقتل",
    playersLoaded: "لاعب محمل",
    uploadPlayerData: "تحميل بيانات اللاعبين",
    clickToUpload: "انقر لتحميل ملف Excel (.xlsx)",
    requiredColumns: "الأعمدة المطلوبة: اسم المستخدم، قتلى T4، قتلى T5، وفيات T4، وفيات T5",
    clearData: "مسح البيانات",
    successfullyLoaded: "تم التحميل بنجاح",
    players: "لاعبين",
    howToGetData: "كيفية الحصول على البيانات:",
    howToStep1: "اذهب إلى",
    howToStep2: "أو داخل اللعبة: افتح",
    noticeBoard: "لوحة الإعلانات",
    viewMemberData: "عرض بيانات الأعضاء",
    howToStep3: "حمل ملف Excel (فقط بيانات قتلى ووفيات T4/T5 مطلوبة)",
    howToStep4: "حمل الملف المحمل أعلاه",
    pointValuesConfig: "تكوين قيم النقاط",
    t4KillPoints: "نقاط قتل T4",
    t4DeathPoints: "نقاط وفاة T4",
    t5KillPoints: "نقاط قتل T5",
    t5DeathPoints: "نقاط وفاة T5",
    adjustPointValues: "عدل قيم النقاط أعلاه لإعادة حساب DKP لجميع اللاعبين",
    customStatsCalc: "حاسبة الإحصائيات المخصصة",
    customStatsDesc: "أدخل إحصائيات مخصصة لحساب DKP بدون تحميل ملف",
    player: "لاعب",
    remove: "إزالة",
    username: "اسم المستخدم",
    totalDKP: "إجمالي DKP",
    killPoints: "نقاط القتل",
    deathPoints: "نقاط الموت",
    addAnotherPlayer: "إضافة لاعب آخر",
    noPlayerData: "لا توجد بيانات لاعبين",
    uploadToStart: "حمل ملف Excel أعلاه للبدء",
    searchByUsername: "البحث باسم المستخدم أو المعرف...",
    sortBy: "ترتيب حسب:",
    power: "القوة",
    kills: "القتلى",
    deaths: "الوفيات",
    
    // Footer
    footerText: "أدوات Rise of Kingdoms • صنع لمملكة 3919",
    
    // Language
    language: "اللغة",
    english: "English",
    arabic: "العربية",
    chinese: "中文",
    vietnamese: "Tiếng Việt",
    
    // Additional Fort Calculator
    enterTargetHonor: "أدخل نقاط الشرف المستهدفة أدناه لحساب الحصون المطلوبة",
    tierTrophyRewards: "مكافآت فئة الكأس",
    tier: "فئة",
    apPerFortStandard: "AP لكل حصن (قياسي)",
    apPerFortInsight: "AP لكل حصن",
    min: "دقيقة",
    fort: "حصن",
    forts: "حصون",
    pts: "نقطة",
    tbd: "قريباً",
    march: "مسيرة",
    marches: "مسيرات",
    enterHonorGoal: "أدخل هدف نقاط الشرف...",
    pleaseEnterHonor: "الرجاء إدخال هدف نقاط الشرف",
    requires: "يتطلب",
    runningBatches: "تشغيل",
    batchesTotal: "دفعات إجمالية",
    batch: "دفعة",
    apRegenRate: "تجديد AP (1 AP كل X ثانية)",
    fast: "سريع",
    slow: "بطيء",
    duringSession: "خلال هذه الجلسة ستجدد طبيعياً",
    ap: "AP",
    statsBreakdown: "تفاصيل الإحصائيات",
    fortsPerHour: "حصون/ساعة",
    resourcesHour: "موارد/ساعة",
    
    // Additional Barb Calculator
    seconds: "ثواني",
    sec: "ث",
    killTime: "وقت القتل",
    withMarches: "مع المسيرات",
    
    // Additional DKP
    id: "المعرف",
    noPlayersFound: "لم يتم العثور على لاعبين مطابقين",
    
    // Lyceum
    tip: "نصيحة",
    tipText: "اكتب بضع كلمات من السؤال للعثور على الإجابة بسرعة",
  },
  zh: {
    // Navigation
    home: "首页",
    fortCalc: "要塞计算",
    barbCalc: "野蛮人计算",
    lyceum: "万国学堂",
    dkpCalc: "DKP计算",
    
    // Home Page
    heroTitle: "万国觉醒工具",
    heroSubtitle: "万国觉醒一站式工具包。计算要塞奖励、规划野蛮人狩猎、搜索万国学堂答案、追踪DKP。",
    exploreTools: "探索工具",
    
    // Feature Cards
    fortCalculator: "要塞计算器",
    fortCalculatorDesc: "计算野蛮人要塞刷取的奖励和时间",
    barbCalculator: "野蛮人计算器",
    barbCalculatorDesc: "规划野蛮人狩猎，估算经验和资源",
    lyceumAnswers: "万国学堂答案",
    lyceumAnswersDesc: "搜索1,397道万国学堂测验题目",
    dkpCalculator: "DKP计算器",
    dkpCalculatorDesc: "根据玩家数据计算死亡和击杀点数",
    apManagement: "行动力管理",
    apManagementDesc: "追踪行动力恢复，优化刷取效率",
    completeRewards: "完整奖励",
    completeRewardsDesc: "所有要塞等级和层级的完整奖励表",
    comingSoon: "即将推出",
    
    // Fort Calculator
    fortCalcTitle: "野蛮人要塞计算器",
    fortCalcSubtitle: "计算要塞刷取的奖励和时间",
    calculationMode: "计算模式",
    byNumberOfForts: "按要塞数量",
    byHonorPoints: "按荣誉点数",
    fortLevel: "要塞等级",
    rewardTier: "奖励层级",
    apCostPerFort: "每个要塞AP消耗",
    insightTalent: "洞察天赋",
    marchTime: "行军时间",
    numberOfForts: "要塞数量",
    desiredHonorPoints: "目标荣誉点数",
    simultaneousForts: "同时进攻要塞数",
    apRegeneration: "AP恢复",
    apRegenDesc: "本次活动期间你将自然恢复",
    timeRequired: "所需时间",
    totalTime: "总时间",
    timePerFort: "每个要塞时间",
    totalRewards: "总奖励",
    hoverForDetails: "悬停查看详情",
    honorPoints: "荣誉点数",
    resourcePacks: "资源包",
    tomes: "知识之书",
    speedups: "加速",
    booksOfCovenant: "盟约之书",
    apCost: "AP消耗",
    netApCost: "净AP消耗",
    
    // Barbarian Calculator
    barbCalcTitle: "野蛮人计算器",
    barbCalcSubtitle: "计算狩猎野蛮人的奖励（等级30-40）",
    byBarbCount: "按野蛮人数量",
    byXPGoal: "按经验目标",
    barbLevelRange: "野蛮人等级范围",
    to: "至",
    onlyLevel: "仅等级",
    barbarians: "野蛮人",
    levels: "等级",
    numberOfBarbarians: "野蛮人数量",
    desiredXP: "目标经验",
    simultaneousMarches: "同时行军数",
    peacekeepingTalent: "维和天赋",
    apFirst: "首次",
    apAfter: "之后",
    averageRewards: "平均奖励",
    barbarianRewards: "野蛮人奖励",
    resources: "资源",
    commanderXP: "统帅经验",
    baseSpeedup: "基础加速",
    timePerBarbarian: "每个野蛮人时间",
    barbariansPerHour: "野蛮人/小时",
    xpPerHour: "经验/小时",
    resourcesPerHour: "资源/小时",
    materialDrops: "装备材料掉落",
    estimated: "估计",
    common: "普通",
    uncommon: "优秀",
    rare: "稀有",
    epic: "史诗",
    legendary: "传说",
    woodFood: "木材/粮食",
    stone: "石材",
    gold: "金币",
    minutes: "分钟",
    hours: "小时",
    days: "天",
    estimatesNote: "基于平均掉落率估算",
    
    // Lyceum
    lyceumTitle: "万国学堂",
    lyceumSubtitle: "搜索测验题目和答案",
    searchPlaceholder: "搜索题目...",
    questionsLoaded: "题目已加载",
    question: "问题",
    answer: "答案",
    showing: "显示",
    of: "/",
    results: "结果",
    noResults: "未找到结果",
    tryDifferent: "尝试其他搜索词",
    
    // DKP Calculator
    dkpCalcTitle: "DKP计算器",
    dkpCalcSubtitle: "死亡和击杀点数计算器",
    playersLoaded: "玩家已加载",
    uploadPlayerData: "上传玩家数据",
    clickToUpload: "点击上传Excel文件（.xlsx）",
    requiredColumns: "必需列：用户名、T4击杀、T5击杀、T4死亡、T5死亡",
    clearData: "清除数据",
    successfullyLoaded: "成功加载",
    players: "玩家",
    howToGetData: "如何获取数据：",
    howToStep1: "访问",
    howToStep2: "或在游戏中：打开",
    noticeBoard: "公告板",
    viewMemberData: "查看成员数据",
    howToStep3: "下载Excel文件（只需T4/T5击杀和死亡数据）",
    howToStep4: "上传下载的文件",
    pointValuesConfig: "点数配置",
    t4KillPoints: "T4击杀点数",
    t4DeathPoints: "T4死亡点数",
    t5KillPoints: "T5击杀点数",
    t5DeathPoints: "T5死亡点数",
    adjustPointValues: "调整上方点数值以重新计算所有玩家的DKP",
    customStatsCalc: "自定义数据计算器",
    customStatsDesc: "输入自定义数据计算DKP，无需上传文件",
    player: "玩家",
    remove: "移除",
    username: "用户名",
    totalDKP: "总DKP",
    killPoints: "击杀点数",
    deathPoints: "死亡点数",
    addAnotherPlayer: "添加另一个玩家",
    noPlayerData: "未加载玩家数据",
    uploadToStart: "上传Excel文件开始",
    searchByUsername: "按用户名或ID搜索...",
    sortBy: "排序：",
    power: "战力",
    kills: "击杀",
    deaths: "死亡",
    
    // Footer
    footerText: "万国觉醒工具 • 为王国3919制作",
    
    // Language
    language: "语言",
    english: "English",
    arabic: "العربية",
    chinese: "中文",
    vietnamese: "Tiếng Việt",
    
    // Additional Fort Calculator
    enterTargetHonor: "在下方输入目标荣誉点数以计算所需要塞数量",
    tierTrophyRewards: "奖杯层级奖励",
    tier: "层级",
    apPerFortStandard: "每个要塞AP（标准）",
    apPerFortInsight: "每个要塞AP",
    min: "分钟",
    fort: "要塞",
    forts: "要塞",
    pts: "点",
    tbd: "待定",
    march: "行军",
    marches: "行军",
    enterHonorGoal: "输入荣誉点数目标...",
    pleaseEnterHonor: "请输入荣誉点数目标",
    requires: "需要",
    runningBatches: "运行",
    batchesTotal: "批次",
    batch: "批次",
    apRegenRate: "AP恢复（每X秒1 AP）",
    fast: "快",
    slow: "慢",
    duringSession: "本次活动期间你将自然恢复",
    ap: "AP",
    statsBreakdown: "统计详情",
    fortsPerHour: "要塞/小时",
    resourcesHour: "资源/小时",
    
    // Additional Barb Calculator
    seconds: "秒",
    sec: "秒",
    killTime: "击杀时间",
    withMarches: "使用行军",
    
    // Additional DKP
    id: "ID",
    noPlayersFound: "未找到匹配的玩家",
    
    // Lyceum
    tip: "提示",
    tipText: "输入题目中的几个关键词即可快速找到答案",
  },
  vi: {
    // Navigation
    home: "Trang chủ",
    fortCalc: "Tính Pháo đài",
    barbCalc: "Tính Man rợ",
    lyceum: "Lyceum",
    dkpCalc: "Tính DKP",
    
    // Home Page
    heroTitle: "Công cụ Rise of Kingdoms",
    heroSubtitle: "Bộ công cụ tất cả trong một cho Rise of Kingdoms. Tính phần thưởng pháo đài, lên kế hoạch săn man rợ, tìm đáp án Lyceum và theo dõi DKP.",
    exploreTools: "Khám phá công cụ",
    
    // Feature Cards
    fortCalculator: "Máy tính Pháo đài",
    fortCalculatorDesc: "Tính phần thưởng và thời gian cho các phiên farm pháo đài man rợ",
    barbCalculator: "Máy tính Man rợ",
    barbCalculatorDesc: "Lên kế hoạch săn man rợ với ước tính XP và tài nguyên",
    lyceumAnswers: "Đáp án Lyceum",
    lyceumAnswersDesc: "Tìm kiếm trong 1,397 câu hỏi quiz Lyceum of Wisdom",
    dkpCalculator: "Máy tính DKP",
    dkpCalculatorDesc: "Tính Điểm Chết & Giết từ thống kê người chơi",
    apManagement: "Quản lý AP",
    apManagementDesc: "Theo dõi hồi phục điểm hành động và tối ưu hiệu suất farm",
    completeRewards: "Phần thưởng đầy đủ",
    completeRewardsDesc: "Bảng phần thưởng đầy đủ cho tất cả cấp độ và hạng pháo đài",
    comingSoon: "Sắp ra mắt",
    
    // Fort Calculator
    fortCalcTitle: "Máy tính Pháo đài Man rợ",
    fortCalcSubtitle: "Tính phần thưởng và thời gian cho phiên farm pháo đài",
    calculationMode: "Chế độ tính",
    byNumberOfForts: "Theo số Pháo đài",
    byHonorPoints: "Theo Điểm Danh dự",
    fortLevel: "Cấp Pháo đài",
    rewardTier: "Hạng Phần thưởng",
    apCostPerFort: "AP mỗi Pháo đài",
    insightTalent: "Tài năng Insight",
    marchTime: "Thời gian hành quân",
    numberOfForts: "Số lượng Pháo đài",
    desiredHonorPoints: "Điểm Danh dự mong muốn",
    simultaneousForts: "Pháo đài đồng thời",
    apRegeneration: "Hồi phục AP",
    apRegenDesc: "Trong phiên này bạn sẽ tự nhiên hồi phục",
    timeRequired: "Thời gian cần",
    totalTime: "Tổng thời gian",
    timePerFort: "Thời gian mỗi Pháo đài",
    totalRewards: "Tổng Phần thưởng",
    hoverForDetails: "Di chuột để xem chi tiết",
    honorPoints: "Điểm Danh dự",
    resourcePacks: "Gói Tài nguyên",
    tomes: "Sách Tri thức",
    speedups: "Tăng tốc",
    booksOfCovenant: "Sách Giao ước",
    apCost: "Chi phí AP",
    netApCost: "Chi phí AP ròng",
    
    // Barbarian Calculator
    barbCalcTitle: "Máy tính Man rợ",
    barbCalcSubtitle: "Tính phần thưởng săn man rợ (Cấp 30-40)",
    byBarbCount: "Theo số Man rợ",
    byXPGoal: "Theo mục tiêu XP",
    barbLevelRange: "Phạm vi cấp Man rợ",
    to: "đến",
    onlyLevel: "Chỉ cấp",
    barbarians: "man rợ",
    levels: "cấp",
    numberOfBarbarians: "Số lượng Man rợ",
    desiredXP: "XP mong muốn",
    simultaneousMarches: "Hành quân đồng thời",
    peacekeepingTalent: "Tài năng Peacekeeping",
    apFirst: "đầu tiên",
    apAfter: "sau đó",
    averageRewards: "Phần thưởng trung bình",
    barbarianRewards: "Phần thưởng Man rợ",
    resources: "Tài nguyên",
    commanderXP: "XP Tướng",
    baseSpeedup: "Tăng tốc cơ bản",
    timePerBarbarian: "Thời gian mỗi Man rợ",
    barbariansPerHour: "Man rợ/Giờ",
    xpPerHour: "XP/Giờ",
    resourcesPerHour: "Tài nguyên/Giờ",
    materialDrops: "Vật liệu Trang bị rơi",
    estimated: "ước tính",
    common: "Thường",
    uncommon: "Không thường",
    rare: "Hiếm",
    epic: "Sử thi",
    legendary: "Huyền thoại",
    woodFood: "Gỗ/Thức ăn",
    stone: "Đá",
    gold: "Vàng",
    minutes: "phút",
    hours: "giờ",
    days: "ngày",
    estimatesNote: "Ước tính dựa trên tỷ lệ rơi trung bình",
    
    // Lyceum
    lyceumTitle: "Lyceum of Wisdom",
    lyceumSubtitle: "Tìm kiếm câu hỏi và đáp án quiz",
    searchPlaceholder: "Tìm câu hỏi...",
    questionsLoaded: "câu hỏi đã tải",
    question: "Câu hỏi",
    answer: "Đáp án",
    showing: "Hiển thị",
    of: "/",
    results: "kết quả",
    noResults: "Không tìm thấy kết quả",
    tryDifferent: "Thử từ khóa khác",
    
    // DKP Calculator
    dkpCalcTitle: "Máy tính DKP",
    dkpCalcSubtitle: "Máy tính Điểm Chết & Giết",
    playersLoaded: "người chơi đã tải",
    uploadPlayerData: "Tải lên dữ liệu người chơi",
    clickToUpload: "Nhấp để tải lên file Excel (.xlsx)",
    requiredColumns: "Cột bắt buộc: Username, T4 Kills, T5 Kills, T4 Deaths, T5 Deaths",
    clearData: "Xóa dữ liệu",
    successfullyLoaded: "Đã tải thành công",
    players: "người chơi",
    howToGetData: "Cách lấy dữ liệu:",
    howToStep1: "Truy cập",
    howToStep2: "Hoặc trong game: Mở",
    noticeBoard: "Bảng Thông báo",
    viewMemberData: "Xem Dữ liệu Thành viên",
    howToStep3: "Tải file Excel (chỉ cần dữ liệu T4/T5 kills và deaths)",
    howToStep4: "Tải lên file đã tải ở trên",
    pointValuesConfig: "Cấu hình Giá trị Điểm",
    t4KillPoints: "Điểm Giết T4",
    t4DeathPoints: "Điểm Chết T4",
    t5KillPoints: "Điểm Giết T5",
    t5DeathPoints: "Điểm Chết T5",
    adjustPointValues: "Điều chỉnh giá trị điểm ở trên để tính lại DKP cho tất cả người chơi",
    customStatsCalc: "Máy tính Thống kê Tùy chỉnh",
    customStatsDesc: "Nhập thống kê tùy chỉnh để tính DKP mà không cần tải file",
    player: "Người chơi",
    remove: "Xóa",
    username: "Tên người dùng",
    totalDKP: "Tổng DKP",
    killPoints: "Điểm Giết",
    deathPoints: "Điểm Chết",
    addAnotherPlayer: "Thêm Người chơi khác",
    noPlayerData: "Chưa tải dữ liệu người chơi",
    uploadToStart: "Tải lên file Excel để bắt đầu",
    searchByUsername: "Tìm theo tên người dùng hoặc ID...",
    sortBy: "Sắp xếp:",
    power: "Sức mạnh",
    kills: "Giết",
    deaths: "Chết",
    
    // Footer
    footerText: "Công cụ Rise of Kingdoms • Dành cho Vương quốc 3919",
    
    // Language
    language: "Ngôn ngữ",
    english: "English",
    arabic: "العربية",
    chinese: "中文",
    vietnamese: "Tiếng Việt",
    
    // Additional Fort Calculator
    enterTargetHonor: "Nhập điểm danh dự mục tiêu bên dưới để tính số pháo đài cần thiết",
    tierTrophyRewards: "Phần thưởng Hạng Cúp",
    tier: "Hạng",
    apPerFortStandard: "AP mỗi pháo đài (tiêu chuẩn)",
    apPerFortInsight: "AP mỗi pháo đài",
    min: "phút",
    fort: "Pháo đài",
    forts: "Pháo đài",
    pts: "điểm",
    tbd: "Sắp có",
    march: "Hành quân",
    marches: "Hành quân",
    enterHonorGoal: "Nhập mục tiêu điểm danh dự...",
    pleaseEnterHonor: "Vui lòng nhập mục tiêu điểm danh dự",
    requires: "Cần",
    runningBatches: "Chạy",
    batchesTotal: "đợt",
    batch: "đợt",
    apRegenRate: "Hồi phục AP (1 AP mỗi X giây)",
    fast: "Nhanh",
    slow: "Chậm",
    duringSession: "Trong phiên này bạn sẽ tự nhiên hồi phục",
    ap: "AP",
    statsBreakdown: "Chi tiết Thống kê",
    fortsPerHour: "Pháo đài/Giờ",
    resourcesHour: "Tài nguyên/Giờ",
    
    // Additional Barb Calculator
    seconds: "giây",
    sec: "giây",
    killTime: "Thời gian tiêu diệt",
    withMarches: "với hành quân",
    
    // Additional DKP
    id: "ID",
    noPlayersFound: "Không tìm thấy người chơi phù hợp",
    
    // Lyceum
    tip: "Mẹo",
    tipText: "Nhập vài từ khóa từ câu hỏi để nhanh chóng tìm câu trả lời",
  }
};

// Language Context
const LanguageContext = createContext();

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const t = (key) => translations[language][key] || key;
  const isRTL = language === 'ar';
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

const FORT_DATA = {
  1: {
    honorPoints: 0,
    tier1: { resource: 9, tome: 5, speedup: 5, covenant: 1 },
    tier2: { resource: 10, tome: 13, speedup: 5, covenant: 3 },
    tier3: { resource: 12, tome: 15, speedup: 10, covenant: 3 },
    tier4: { resource: 14, tome: 17, speedup: 10, covenant: 3 },
    tier5: { resource: 15, tome: 19, speedup: 10, covenant: 4 }
  },
  2: {
    honorPoints: 0,
    tier1: { resource: 9, tome: 5, speedup: 5, covenant: 1 },
    tier2: { resource: 18, tome: 15, speedup: 5, covenant: 3 },
    tier3: { resource: 20, tome: 17, speedup: 10, covenant: 3 },
    tier4: { resource: 22, tome: 19, speedup: 10, covenant: 3 },
    tier5: { resource: 23, tome: 21, speedup: 10, covenant: 4 }
  },
  3: {
    honorPoints: 0,
    tier1: { resource: 12, tome: 6, speedup: 10, covenant: 1 },
    tier2: { resource: 25, tome: 20, speedup: 10, covenant: 3 },
    tier3: { resource: 27, tome: 22, speedup: 20, covenant: 3 },
    tier4: { resource: 29, tome: 24, speedup: 20, covenant: 3 },
    tier5: { resource: 30, tome: 26, speedup: 20, covenant: 4 }
  },
  4: {
    honorPoints: 0,
    tier1: { resource: 15, tome: 8, speedup: 10, covenant: 1 },
    tier2: { resource: 32, tome: 24, speedup: 10, covenant: 3 },
    tier3: { resource: 34, tome: 26, speedup: 20, covenant: 3 },
    tier4: { resource: 36, tome: 28, speedup: 20, covenant: 3 },
    tier5: { resource: 37, tome: 30, speedup: 25, covenant: 4 }
  },
  5: {
    honorPoints: 0,
    tier1: { resource: 20, tome: 10, speedup: 10, covenant: 1 },
    tier2: { resource: 40, tome: 30, speedup: 10, covenant: 3 },
    tier3: { resource: 42, tome: 33, speedup: 20, covenant: 3 },
    tier4: { resource: 44, tome: 36, speedup: 20, covenant: 3 },
    tier5: { resource: 45, tome: 40, speedup: 25, covenant: 4 }
  },
  6: {
    honorPoints: 15,
    tier1: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier2: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier3: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier4: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier5: { resource: 0, tome: 0, speedup: 0, covenant: 0 }
  },
  7: {
    honorPoints: 25,
    tier1: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier2: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier3: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier4: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier5: { resource: 0, tome: 0, speedup: 0, covenant: 0 }
  },
  8: {
    honorPoints: 35,
    tier1: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier2: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier3: { resource: 0, tome: 0, speedup: 0, covenant: 0 },
    tier4: { resource: 56, tome: 45, speedup: 35, covenant: 0 },
    tier5: { resource: 0, tome: 0, speedup: 0, covenant: 0 }
  },
  9: {
    honorPoints: 45,
    tier1: { resource: 54, tome: 40, speedup: 38, covenant: 4 },
    tier2: { resource: 56, tome: 42, speedup: 38, covenant: 4 },
    tier3: { resource: 58, tome: 45, speedup: 38, covenant: 4 },
    tier4: { resource: 60, tome: 48, speedup: 38, covenant: 4 },
    tier5: { resource: 62, tome: 51, speedup: 45, covenant: 4 }
  },
  10: {
    honorPoints: 60,
    tier1: { resource: 30, tome: 15, speedup: 35, covenant: 3 },
    tier2: { resource: 60, tome: 45, speedup: 35, covenant: 4 },
    tier3: { resource: 63, tome: 49, speedup: 45, covenant: 5 },
    tier4: { resource: 66, tome: 53, speedup: 45, covenant: 5 },
    tier5: { resource: 70, tome: 57, speedup: 50, covenant: 5 }
  }
};

const BATTLE_TIME = 5;

// Barbarian data (levels 30-40)
// AP cost: First kill costs 40 (peacekeeping) or 50 (no peacekeeping), subsequent kills cost 36 or 45
// Material drops per 125 barbs: 20 common = 5 uncommon = 1.25 rare = 0.3125 epic = 0.078125 legendary
// Speedup drops per 125 barbs: 96 drops out of 125 kills (19x 5min + 77x 1min = 172 min extra)
// Resources: 100% wood/food, 75% stone, 50% gold
const BARBARIAN_DATA = {
  30: { resources: 55000, stone: 41250, gold: 27500, xp: 3000, speedupBase: 7 },
  31: { resources: 56000, stone: 42000, gold: 28000, xp: 3100, speedupBase: 7 },
  32: { resources: 57000, stone: 42750, gold: 28500, xp: 3200, speedupBase: 8 },
  33: { resources: 58000, stone: 43500, gold: 29000, xp: 3300, speedupBase: 8 },
  34: { resources: 59000, stone: 44250, gold: 29500, xp: 3400, speedupBase: 8 },
  35: { resources: 60000, stone: 45000, gold: 30000, xp: 3500, speedupBase: 9 },
  36: { resources: 62000, stone: 46500, gold: 31000, xp: 3600, speedupBase: 9 },
  37: { resources: 64000, stone: 48000, gold: 32000, xp: 3700, speedupBase: 9 },
  38: { resources: 66000, stone: 49500, gold: 33000, xp: 3800, speedupBase: 10 },
  39: { resources: 68000, stone: 51000, gold: 34000, xp: 3900, speedupBase: 10 },
  40: { resources: 70000, stone: 52500, gold: 35000, xp: 4000, speedupBase: 10 },
};

// AP costs - same for all levels
const AP_COSTS = {
  peacekeeping: { first: 40, subsequent: 36 },
  noPeacekeeping: { first: 50, subsequent: 45 },
};

// Material drop rates per barbarian (based on 125 barbs = 20 common)
const MATERIAL_RATES = {
  common: 20 / 125,      // 0.16 per barb
  uncommon: 5 / 125,     // 0.04 per barb
  rare: 1.25 / 125,      // 0.01 per barb
  epic: 0.3125 / 125,    // 0.0025 per barb
  legendary: 0.078125 / 125, // 0.000625 per barb
};

// Extra speedup drops per 125 barbs: 19x 5min + 77x 1min = 172 min (96 drops out of 125 kills)
const EXTRA_SPEEDUP_PER_BARB = ((19 * 5) + (77 * 1)) / 125; // 1.376 min per barb

// Animated Ember Background Component
function FlameBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Clean dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      
      {/* Ember particles only */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={`ember-${i}`}
            className="absolute rounded-full animate-ember"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-5%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f97316' : '#ef4444',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              opacity: 0.5 + Math.random() * 0.5,
              boxShadow: `0 0 ${4 + Math.random() * 6}px ${i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f97316' : '#ef4444'}`,
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes ember {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${30 + Math.random() * 50}px) scale(0.3);
            opacity: 0;
          }
        }
        
        .animate-ember {
          animation: ember ease-out infinite;
        }
      `}</style>
    </div>
  );
}

// Navigation Component
function Navigation({ currentPage, setCurrentPage }) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
    { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const NavButton = ({ page, icon, label }) => (
    <button
      onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
      className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm w-full md:w-auto ${
        currentPage === page
          ? 'bg-amber-600 text-white'
          : 'text-amber-200 hover:bg-stone-800'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <nav className="relative z-20 bg-stone-900/80 backdrop-blur-sm border-b border-amber-700/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>
            <Flame className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-200 via-orange-400 to-red-500 bg-clip-text text-transparent">
              <span className="hidden sm:inline">{t('heroTitle')}</span>
              <span className="sm:hidden">RoK Tools</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-2 items-center">
            <NavButton page="home" icon={<Home className="w-4 h-4" />} label={t('home')} />
            <NavButton page="calculator" icon={<Calculator className="w-4 h-4" />} label={t('fortCalc')} />
            <NavButton page="barbarian" icon={<Target className="w-4 h-4" />} label={t('barbCalc')} />
            <NavButton page="lyceum" icon={<BookOpen className="w-4 h-4" />} label={t('lyceum')} />
            <NavButton page="dkp" icon={<Swords className="w-4 h-4" />} label={t('dkpCalc')} />
            
            {/* Language Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-600/50 bg-stone-800 text-amber-200 hover:bg-stone-700 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag}</span>
                <svg className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-40 bg-stone-800 border border-amber-600 rounded-lg shadow-xl z-50 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                        className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                          language === lang.code 
                            ? 'bg-amber-600 text-white' 
                            : 'text-amber-200 hover:bg-stone-700'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language Dropdown Mobile */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-amber-600/50 bg-stone-800 text-amber-200"
              >
                <span>{currentLang.flag}</span>
                <svg className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 bg-stone-800 border border-amber-600 rounded-lg shadow-xl z-50 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                        className={`w-full px-3 py-2 text-left flex items-center gap-2 transition-all ${
                          language === lang.code 
                            ? 'bg-amber-600 text-white' 
                            : 'text-amber-200 hover:bg-stone-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-amber-200 hover:bg-stone-800 transition-all"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-amber-700/30 mt-2 pt-3">
            <div className="flex flex-col gap-2">
              <NavButton page="home" icon={<Home className="w-4 h-4" />} label={t('home')} />
              <NavButton page="calculator" icon={<Calculator className="w-4 h-4" />} label={t('fortCalc')} />
              <NavButton page="barbarian" icon={<Target className="w-4 h-4" />} label={t('barbCalc')} />
              <NavButton page="lyceum" icon={<BookOpen className="w-4 h-4" />} label={t('lyceum')} />
              <NavButton page="dkp" icon={<Swords className="w-4 h-4" />} label={t('dkpCalc')} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Home Page Component
function HomePage({ setCurrentPage }) {
  const { t } = useLanguage();
  
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-4xl">
          {/* Animated Logo */}
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-amber-600 to-orange-700 p-8 rounded-full shadow-2xl border-4 border-amber-500/50">
              <Swords className="w-24 h-24 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-amber-100/80 mb-12 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          
          {/* CTA Button */}
          <button
            onClick={() => setCurrentPage('calculator')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xl font-bold px-10 py-5 rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-orange-500/25"
          >
            <Calculator className="w-6 h-6" />
            {t('exploreTools')}
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
          </button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="relative z-10 bg-stone-900/80 backdrop-blur-sm border-t border-amber-700/30 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-200 text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calculator className="w-10 h-10" />}
              title={t('fortCalculator')}
              description={t('fortCalculatorDesc')}
              onClick={() => setCurrentPage('calculator')}
            />
            <FeatureCard
              icon={<Target className="w-10 h-10" />}
              title={t('barbCalculator')}
              description={t('barbCalculatorDesc')}
              onClick={() => setCurrentPage('barbarian')}
            />
            <FeatureCard
              icon={<BookOpen className="w-10 h-10" />}
              title={t('lyceumAnswers')}
              description={t('lyceumAnswersDesc')}
              onClick={() => setCurrentPage('lyceum')}
            />
            <FeatureCard
              icon={<Swords className="w-10 h-10" />}
              title={t('dkpCalculator')}
              description={t('dkpCalculatorDesc')}
              onClick={() => setCurrentPage('dkp')}
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title={t('apManagement')}
              description={t('apManagementDesc')}
              comingSoon={true}
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title={t('completeRewards')}
              description={t('completeRewardsDesc')}
              comingSoon={true}
            />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 bg-stone-900/90 border-t border-amber-700/30 py-6 px-4 text-center">
        <p className="text-stone-400 text-sm">
          {t('footerText')}
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, onClick, comingSoon }) {
  const { t } = useLanguage();
  
  return (
    <div 
      className={`bg-gradient-to-br from-stone-800/80 to-stone-900/80 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30 hover:border-amber-600/50 transition-all hover:transform hover:scale-105 ${onClick ? 'cursor-pointer' : ''} relative`}
      onClick={onClick}
    >
      {comingSoon && (
        <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
          {t('comingSoon')}
        </span>
      )}
      <div className="text-amber-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-amber-100 mb-2">{title}</h3>
      <p className="text-stone-400">{description}</p>
    </div>
  );
}

// Calculator Page Component
function CalculatorPage() {
  const { t } = useLanguage();
  const [fortLevel, setFortLevel] = useState(5);
  const [tier, setTier] = useState('tier3');
  const [marchTime, setMarchTime] = useState(5);
  const [fortCount, setFortCount] = useState(10);
  const [apPerFort, setApPerFort] = useState(150);
  const [apRegenSeconds, setApRegenSeconds] = useState(18);
  const [simultaneousForts, setSimultaneousForts] = useState(1);
  const [calculationMode, setCalculationMode] = useState('forts');
  const [desiredPoints, setDesiredPoints] = useState('');

  const results = useMemo(() => {
    const fortData = FORT_DATA[fortLevel];
    const rewards = fortData[tier] || { resource: 0, tome: 0, speedup: 0, covenant: 0 };
    const honorPoints = fortData.honorPoints;
    
    const actualFortCount = calculationMode === 'points' 
      ? (desiredPoints && honorPoints > 0 ? Math.ceil(Number(desiredPoints) / honorPoints) : 0)
      : fortCount;
    
    const totalBatches = Math.ceil(actualFortCount / simultaneousForts);
    const totalTime = totalBatches * (BATTLE_TIME + marchTime);
    
    const totalAP = actualFortCount * apPerFort;
    
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    
    const totalTimeSeconds = totalTime * 60;
    const apRegenerated = Math.floor(totalTimeSeconds / apRegenSeconds);
    const netAPCost = totalAP - apRegenerated;
    
    return {
      totalResource: rewards.resource * actualFortCount,
      totalTome: rewards.tome * actualFortCount,
      totalSpeedup: rewards.speedup * actualFortCount,
      totalCovenant: rewards.covenant * actualFortCount,
      totalHonorPoints: honorPoints * actualFortCount,
      honorPointsPerFort: honorPoints,
      actualFortCount,
      totalAP,
      apRegenerated,
      netAPCost: Math.max(0, netAPCost),
      timeHours: hours,
      timeMinutes: minutes,
      totalTimeMinutes: totalTime,
      totalBatches
    };
  }, [fortLevel, tier, marchTime, fortCount, apPerFort, apRegenSeconds, simultaneousForts, calculationMode, desiredPoints]);

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-amber-700/90 to-orange-600/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <Swords className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">{t('fortCalcTitle')}</h1>
          </div>
          <p className="text-amber-100 mt-2">{t('fortCalcSubtitle')}</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* Calculation Mode Toggle */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500 shadow-lg">
            <label className="block text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              {t('calculationMode')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCalculationMode('forts')}
                className={`p-4 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  calculationMode === 'forts'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-2 border-amber-300 shadow-xl'
                    : 'bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600'
                }`}
              >
                📊 {t('byNumberOfForts')}
              </button>
              <button
                onClick={() => setCalculationMode('points')}
                className={`p-4 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  calculationMode === 'points'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-2 border-amber-300 shadow-xl'
                    : 'bg-stone-700 text-stone-300 border-2 border-stone-500 hover:bg-stone-600'
                }`}
              >
                🎯 {t('byHonorPoints')}
              </button>
            </div>
            {calculationMode === 'points' && (
              <div className="mt-3 bg-amber-900/30 border border-amber-600 rounded p-3">
                <p className="text-amber-200 text-sm">
                  💡 {t('enterTargetHonor')}
                </p>
              </div>
            )}
          </div>

          {/* Input Controls */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div>
              <label className="block text-amber-300 font-semibold mb-2">{t('fortLevel')}</label>
              <select 
                value={fortLevel} 
                onChange={(e) => setFortLevel(parseInt(e.target.value))}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="1">{t('fort')} 1</option>
                <option value="2">{t('fort')} 2</option>
                <option value="3">{t('fort')} 3</option>
                <option value="4">{t('fort')} 4</option>
                <option value="5">{t('fort')} 5</option>
                <option value="6">{t('fort')} 6 (15 {t('pts')}) - {t('tbd')}</option>
                <option value="7">{t('fort')} 7 (25 {t('pts')}) - {t('tbd')}</option>
                <option value="8">{t('fort')} 8 (35 {t('pts')}) - {t('tbd')}</option>
                <option value="9">{t('fort')} 9 (45 {t('pts')})</option>
                <option value="10">{t('fort')} 10 (60 {t('pts')})</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">{t('tierTrophyRewards')}</label>
              <select 
                value={tier} 
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="tier1">{t('tier')} 1</option>
                <option value="tier2">{t('tier')} 2</option>
                <option value="tier3">{t('tier')} 3</option>
                <option value="tier4">{t('tier')} 4</option>
                <option value="tier5">{t('tier')} 5</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">{t('apCostPerFort')}</label>
              <div className="bg-stone-800/50 rounded-lg p-4 border border-amber-700/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={apPerFort === 140}
                    onChange={(e) => setApPerFort(e.target.checked ? 140 : 150)}
                    className="w-5 h-5 accent-amber-500"
                  />
                  <div>
                    <p className="text-amber-200 font-semibold">{t('insightTalent')}</p>
                    <p className="text-stone-400 text-sm">
                      {apPerFort === 140 ? `140 ${t('apPerFortInsight')}` : `150 ${t('apPerFortStandard')}`}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                {t('marchTime')}: {marchTime} {t('min')}
              </label>
              <input 
                type="range" 
                min="0" 
                max="10" 
                step="0.5"
                value={marchTime}
                onChange={(e) => setMarchTime(parseFloat(e.target.value))}
                className="w-full h-3 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>0{t('min')}</span>
                <span>10{t('min')}</span>
              </div>
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                {calculationMode === 'forts' ? `📊 ${t('numberOfForts')}` : `🎯 ${t('desiredHonorPoints')}`}
              </label>
              {calculationMode === 'forts' ? (
                <input 
                  type="number" 
                  min="1" 
                  max="200"
                  value={fortCount}
                  onChange={(e) => setFortCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              ) : (
                <>
                  <input 
                    type="number" 
                    min="1" 
                    max="100000"
                    value={desiredPoints}
                    onChange={(e) => setDesiredPoints(e.target.value)}
                    placeholder={t('enterHonorGoal')}
                    required
                    className={`w-full bg-stone-800 text-white border-2 rounded-lg p-3 focus:outline-none focus:ring-2 ${
                      desiredPoints === '' 
                        ? 'border-red-500 focus:ring-red-400 placeholder-red-400/70' 
                        : 'border-yellow-500 focus:ring-yellow-400'
                    }`}
                  />
                  {desiredPoints === '' ? (
                    <p className="text-red-400 text-sm mt-2 font-semibold bg-red-900/30 rounded px-2 py-1 border border-red-700">
                      ⚠️ {t('pleaseEnterHonor')}
                    </p>
                  ) : (
                    <p className="text-yellow-300 text-sm mt-2 font-semibold bg-yellow-900/30 rounded px-2 py-1 border border-yellow-700">
                      ⚔️ {t('requires')} {results.actualFortCount} {results.actualFortCount !== 1 ? t('forts') : t('fort')}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Simultaneous Forts and AP Regen */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-amber-300 font-semibold mb-2">{t('simultaneousForts')}</label>
              <select 
                value={simultaneousForts} 
                onChange={(e) => setSimultaneousForts(parseInt(e.target.value))}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="1">1 {t('fort')} (1 {t('march')})</option>
                <option value="2">2 {t('forts')} (2 {t('marches')})</option>
                <option value="3">3 {t('forts')} (3 {t('marches')})</option>
                <option value="4">4 {t('forts')} (4 {t('marches')})</option>
                <option value="5">5 {t('forts')} (5 {t('marches')})</option>
              </select>
              <p className="text-stone-400 text-xs mt-1">
                {t('runningBatches')} {results.totalBatches} {results.totalBatches !== 1 ? t('batchesTotal') : t('batch')}
              </p>
            </div>
            <div>
              <label className="block text-amber-300 font-semibold mb-2">
                {t('apRegenRate')}: {apRegenSeconds}s
              </label>
              <input 
                type="range" 
                min="10" 
                max="30" 
                step="1"
                value={apRegenSeconds}
                onChange={(e) => setApRegenSeconds(parseInt(e.target.value))}
                className="w-full h-3 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1">
                <span>{t('fast')} (10s)</span>
                <span>{t('slow')} (30s)</span>
              </div>
              <p className="text-stone-400 text-sm mt-2">
                {t('duringSession')} ~{results.apRegenerated} {t('ap')}
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-lg p-6 border-2 border-amber-700">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-amber-300">{t('timeRequired')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">{t('totalTime')}</p>
                <p className="text-2xl font-bold text-white">
                  {results.timeHours > 0 && `${results.timeHours}h `}
                  {results.timeMinutes}m
                </p>
              </div>
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">{t('timePerFort')}</p>
                <p className="text-2xl font-bold text-white">
                  {formatTime(BATTLE_TIME + marchTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-amber-300">{t('totalRewards')}</h2>
              </div>
              <p className="text-stone-400 text-sm italic">💡 {t('hoverForDetails')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <RewardCard
                title={t('honorPoints')}
                value={results.totalHonorPoints.toLocaleString()}
                gradient="from-yellow-900 to-yellow-950"
                border="border-yellow-600"
                textColor="text-yellow-200"
                tooltip={
                  <>
                    <p className="text-yellow-300 font-semibold text-xs mb-2">{t('honorPoints')}:</p>
                    <p className="text-white text-xs">{results.honorPointsPerFort} {t('pts')} × {results.actualFortCount} {t('forts')}</p>
                    <p className="text-white text-xs mt-1">= {results.totalHonorPoints.toLocaleString()} {t('pts')}</p>
                    <div className="border-t border-yellow-700 mt-2 pt-2">
                      <p className="text-yellow-200 text-xs">{t('fort')} {fortLevel}</p>
                    </div>
                  </>
                }
              />
              <RewardCard
                title={t('resourcePacks')}
                value={results.totalResource.toLocaleString()}
                gradient="from-green-900 to-green-950"
                border="border-green-600"
                textColor="text-green-200"
                tooltip={
                  <>
                    <p className="text-green-300 font-semibold text-xs mb-2">Random reward per pack (25% each):</p>
                    <p className="text-white text-xs">• 10,000 Food</p>
                    <p className="text-white text-xs">• 10,000 Wood</p>
                    <p className="text-white text-xs">• 7,500 Stone</p>
                    <p className="text-white text-xs">• 5,000 Gold</p>
                    <div className="border-t border-green-700 mt-2 pt-2">
                      <p className="text-green-300 font-semibold text-xs mb-1">Expected totals:</p>
                      <p className="text-white text-xs">Food: ~{((results.totalResource * 10000) / 4).toLocaleString()}</p>
                      <p className="text-white text-xs">Wood: ~{((results.totalResource * 10000) / 4).toLocaleString()}</p>
                      <p className="text-white text-xs">Stone: ~{((results.totalResource * 7500) / 4).toLocaleString()}</p>
                      <p className="text-white text-xs">Gold: ~{((results.totalResource * 5000) / 4).toLocaleString()}</p>
                    </div>
                  </>
                }
              />
              <RewardCard
                title="Lvl 3 Tome of Knowledge"
                value={results.totalTome.toLocaleString()}
                gradient="from-blue-900 to-blue-950"
                border="border-blue-600"
                textColor="text-blue-200"
                tooltip={
                  <>
                    <p className="text-blue-300 font-semibold text-xs mb-1">Commander XP:</p>
                    <p className="text-white text-xs">• 1,000 XP per tome</p>
                    <p className="text-blue-200 text-xs mt-1">Total XP: {(results.totalTome * 1000).toLocaleString()}</p>
                  </>
                }
              />
              <RewardCard
                title="Speedups Estimated"
                value={formatTime(results.totalSpeedup)}
                gradient="from-purple-900 to-purple-950"
                border="border-purple-600"
                textColor="text-purple-200"
                tooltip={
                  <>
                    <p className="text-purple-300 font-semibold text-xs mb-2">Total Speedups:</p>
                    <p className="text-white text-xs">Minutes: {results.totalSpeedup.toLocaleString()}</p>
                    <p className="text-white text-xs">Hours: {(results.totalSpeedup / 60).toFixed(1)}</p>
                    <p className="text-white text-xs">Days: {(results.totalSpeedup / 1440).toFixed(2)}</p>
                  </>
                }
              />
              <RewardCard
                title="Net AP Cost"
                value={results.netAPCost.toLocaleString()}
                gradient="from-red-900 to-red-950"
                border="border-red-600"
                textColor="text-red-200"
                tooltip={
                  <>
                    <p className="text-red-300 font-semibold text-xs mb-2">AP Breakdown:</p>
                    <p className="text-white text-xs">Total Cost: {results.totalAP.toLocaleString()} AP</p>
                    <p className="text-green-300 text-xs">Regenerated: -{results.apRegenerated.toLocaleString()} AP</p>
                    <div className="border-t border-red-700 mt-2 pt-2">
                      <p className="text-white text-xs font-semibold">Net Cost: {results.netAPCost.toLocaleString()} AP</p>
                    </div>
                    <p className="text-red-200 text-xs mt-2">{apPerFort === 140 ? 'Using Insight talent' : 'Standard AP cost'}</p>
                  </>
                }
              />
              <RewardCard
                title="Books of Covenant"
                value={results.totalCovenant.toLocaleString()}
                gradient="from-orange-900 to-orange-950"
                border="border-orange-600"
                textColor="text-orange-200"
                tooltip={
                  <>
                    <p className="text-orange-300 font-semibold text-xs mb-2">Note:</p>
                    <p className="text-white text-xs max-w-xs">~50% chance per tier. May also receive</p>
                    <p className="text-white text-xs">Silver/Gold Keys, Gems, or Starlight Sculptures</p>
                  </>
                }
              />
            </div>
          </div>

          {/* Per Fort Rewards */}
          <div className="mt-6 bg-stone-800/80 rounded-lg p-4 border border-amber-700">
            <h3 className="text-amber-300 font-semibold mb-2">Per Fort Rewards (Fort {fortLevel} - {tier.toUpperCase()})</h3>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-stone-400">Resource Packs</p>
                <p className="text-white font-semibold">{FORT_DATA[fortLevel][tier]?.resource || 0}</p>
              </div>
              <div>
                <p className="text-stone-400">Tomes</p>
                <p className="text-white font-semibold">{FORT_DATA[fortLevel][tier]?.tome || 0}</p>
              </div>
              <div>
                <p className="text-stone-400">Speedups</p>
                <p className="text-white font-semibold">{FORT_DATA[fortLevel][tier]?.speedup || 0}m</p>
              </div>
              <div>
                <p className="text-stone-400">Covenant Books</p>
                <p className="text-white font-semibold">{FORT_DATA[fortLevel][tier]?.covenant || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardCard({ title, value, gradient, border, textColor, tooltip }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg p-4 border-2 ${border} relative group cursor-help`}>
      <p className={`${textColor} text-sm font-semibold`}>{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {tooltip && (
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-stone-950 ${border} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10`}>
          {tooltip}
        </div>
      )}
    </div>
  );
}

// Lyceum Page Component
function LyceumPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return LYCEUM_DATA.slice(0, 50); // Show first 50 by default
    
    const term = searchTerm.toLowerCase();
    return LYCEUM_DATA.filter(item => 
      item.q.toLowerCase().includes(term) || 
      item.a.toLowerCase().includes(term)
    ).slice(0, 100); // Limit results to 100
  }, [searchTerm]);

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700/90 to-orange-600/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">{t('lyceumTitle')}</h1>
          </div>
          <p className="text-amber-100 mt-2">{t('lyceumSubtitle')} - {LYCEUM_DATA.length} {t('questionsLoaded')}</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* Search Box */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
              />
            </div>
            <p className="text-stone-400 text-sm mt-2">
              {searchTerm ? `${t('showing')} ${filteredQuestions.length} ${t('results')}` : `${t('showing')} 50 ${t('of')} ${LYCEUM_DATA.length} ${t('results')}`}
            </p>
          </div>

          {/* Quick Tips */}
          <div className="mb-6 bg-amber-900/30 border border-amber-600 rounded-lg p-4">
            <p className="text-amber-200 text-sm">
              💡 <strong>{t('tip')}:</strong> {t('tipText')}
            </p>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.map((item, index) => (
              <div
                key={index}
                className="bg-stone-800/80 rounded-lg border border-stone-700 hover:border-amber-500 transition-all overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded mt-0.5 shrink-0">{t('question').charAt(0)}</span>
                    <p className="text-white flex-1">{item.q}</p>
                  </div>
                  
                  <div className="flex items-start gap-3 mt-3 pt-3 border-t border-stone-700">
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded mt-0.5 shrink-0">{t('answer').charAt(0)}</span>
                    <p className="text-green-400 font-semibold flex-1">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-400 text-lg">{t('noResults')} "{searchTerm}"</p>
              <p className="text-stone-500 mt-2">{t('tryDifferent')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Barbarian Calculator Page Component
function BarbarianCalculatorPage() {
  const { t } = useLanguage();
  const [minBarbLevel, setMinBarbLevel] = useState(30);
  const [maxBarbLevel, setMaxBarbLevel] = useState(40);
  const [barbCount, setBarbCount] = useState(100);
  const [marchTime, setMarchTime] = useState(30); // in seconds
  const [apRegenSeconds, setApRegenSeconds] = useState(18);
  const [simultaneousMarches, setSimultaneousMarches] = useState(5);
  const [calculationMode, setCalculationMode] = useState('barbs');
  const [desiredXP, setDesiredXP] = useState('');
  const [hasPeacekeeping, setHasPeacekeeping] = useState(true);

  const results = useMemo(() => {
    const apCosts = hasPeacekeeping ? AP_COSTS.peacekeeping : AP_COSTS.noPeacekeeping;
    
    // Calculate average stats based on selected level range
    const levels = [];
    for (let i = minBarbLevel; i <= maxBarbLevel; i++) {
      levels.push(BARBARIAN_DATA[i]);
    }
    
    const avgResources = Math.round(levels.reduce((sum, l) => sum + l.resources, 0) / levels.length);
    const avgStone = Math.round(levels.reduce((sum, l) => sum + l.stone, 0) / levels.length);
    const avgGold = Math.round(levels.reduce((sum, l) => sum + l.gold, 0) / levels.length);
    const avgXP = Math.round(levels.reduce((sum, l) => sum + l.xp, 0) / levels.length);
    const avgSpeedupBase = Math.round(levels.reduce((sum, l) => sum + l.speedupBase, 0) / levels.length * 10) / 10;
    
    let actualBarbCount = barbCount;
    
    // If calculating by XP goal
    if (calculationMode === 'xp' && desiredXP) {
      const xpGoal = parseInt(desiredXP) || 0;
      actualBarbCount = Math.ceil(xpGoal / avgXP);
    }

    // Calculate AP cost: first kill is more expensive, subsequent kills are cheaper
    let totalAPCost = 0;
    if (actualBarbCount > 0) {
      totalAPCost = apCosts.first + (Math.max(0, actualBarbCount - 1) * apCosts.subsequent);
    }

    // Calculate rewards
    const totalResources = actualBarbCount * avgResources;
    const totalStone = actualBarbCount * avgStone;
    const totalGold = actualBarbCount * avgGold;
    const totalXP = actualBarbCount * avgXP;
    
    // Speedups: base speedup per level + extra drops (19x5min + 77x1min per 125 barbs)
    const baseSpeedups = Math.round(actualBarbCount * avgSpeedupBase);
    const extraSpeedups = Math.floor(actualBarbCount * EXTRA_SPEEDUP_PER_BARB);
    const totalSpeedups = baseSpeedups + extraSpeedups;

    // Material drops
    const materials = {
      common: Math.floor(actualBarbCount * MATERIAL_RATES.common),
      uncommon: Math.floor(actualBarbCount * MATERIAL_RATES.uncommon),
      rare: (actualBarbCount * MATERIAL_RATES.rare).toFixed(2),
      epic: (actualBarbCount * MATERIAL_RATES.epic).toFixed(3),
      legendary: (actualBarbCount * MATERIAL_RATES.legendary).toFixed(4),
    };

    // Time calculations (in seconds then converted to minutes)
    // Kill time scales with marches: 5 marches = ~9s avg, 1 march = ~15s (game scales internally)
    const killTimePerMarch = simultaneousMarches === 5 ? 9 : simultaneousMarches === 4 ? 10 : simultaneousMarches === 3 ? 12 : simultaneousMarches === 2 ? 13 : 15;
    const totalTimePerBarb = killTimePerMarch + marchTime; // marchTime is now in seconds
    const effectiveTimePerBarb = totalTimePerBarb / simultaneousMarches;
    const totalSeconds = actualBarbCount * effectiveTimePerBarb;
    const totalMinutes = totalSeconds / 60;

    // AP regeneration during farming
    const apRegenPerMinute = 60 / apRegenSeconds;
    const apRegenerated = Math.floor(totalMinutes * apRegenPerMinute);
    const netAPCost = Math.max(0, totalAPCost - apRegenerated);

    return {
      barbCount: actualBarbCount,
      totalResources,
      totalStone,
      totalGold,
      totalXP,
      totalSpeedups,
      baseSpeedups,
      extraSpeedups,
      totalAPCost,
      apRegenerated,
      netAPCost,
      totalMinutes,
      totalHours: totalMinutes / 60,
      avgResources,
      avgStone,
      avgGold,
      avgXP,
      avgSpeedupBase,
      apCosts,
      materials,
    };
  }, [minBarbLevel, maxBarbLevel, barbCount, marchTime, apRegenSeconds, simultaneousMarches, calculationMode, desiredXP, hasPeacekeeping]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700/90 to-orange-600/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">{t('barbCalcTitle')}</h1>
          </div>
          <p className="text-amber-100 mt-2">{t('barbCalcSubtitle')}</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* Calculation Mode Toggle */}
          <div className="mb-6">
            <label className="block text-amber-200 font-semibold mb-3">{t('calculationMode')}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setCalculationMode('barbs')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  calculationMode === 'barbs'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {t('byBarbCount')}
              </button>
              <button
                onClick={() => setCalculationMode('xp')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  calculationMode === 'xp'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {t('byXPGoal')}
              </button>
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-amber-200 font-semibold mb-2">{t('barbLevelRange')}</label>
                <div className="flex gap-2 items-center">
                  <select
                    value={minBarbLevel}
                    onChange={(e) => {
                      const newMin = Number(e.target.value);
                      setMinBarbLevel(newMin);
                      if (newMin > maxBarbLevel) setMaxBarbLevel(newMin);
                    }}
                    className="flex-1 bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.keys(BARBARIAN_DATA).map((level) => (
                      <option key={level} value={level}>
                        Lvl {level}
                      </option>
                    ))}
                  </select>
                  <span className="text-amber-200 font-bold">{t('to')}</span>
                  <select
                    value={maxBarbLevel}
                    onChange={(e) => {
                      const newMax = Number(e.target.value);
                      setMaxBarbLevel(newMax);
                      if (newMax < minBarbLevel) setMinBarbLevel(newMax);
                    }}
                    className="flex-1 bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {Object.keys(BARBARIAN_DATA).map((level) => (
                      <option key={level} value={level}>
                        Lvl {level}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-stone-400 text-sm mt-1">
                  {minBarbLevel === maxBarbLevel 
                    ? `${t('onlyLevel')} ${minBarbLevel} ${t('barbarians')}` 
                    : `${t('levels')} ${minBarbLevel}-${maxBarbLevel} (${maxBarbLevel - minBarbLevel + 1} ${t('levels')})`}
                </p>
              </div>

              {calculationMode === 'barbs' ? (
                <div>
                  <label className="block text-amber-200 font-semibold mb-2">{t('numberOfBarbarians')}</label>
                  <input
                    type="number"
                    value={barbCount}
                    onChange={(e) => setBarbCount(Number(e.target.value) || 0)}
                    min="1"
                    className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-amber-200 font-semibold mb-2">{t('desiredXP')}</label>
                  <input
                    type="number"
                    value={desiredXP}
                    onChange={(e) => setDesiredXP(e.target.value)}
                    placeholder="e.g. 1000000"
                    className={`w-full bg-stone-800 text-white border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      !desiredXP ? 'border-red-500' : 'border-amber-600'
                    }`}
                  />
                  {!desiredXP && (
                    <p className="text-red-400 text-sm mt-1">{t('pleaseEnterHonor').replace('honor points', 'XP')}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-amber-200 font-semibold mb-2">
                  {t('simultaneousMarches')}: {simultaneousMarches}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={simultaneousMarches}
                  onChange={(e) => setSimultaneousMarches(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-stone-400 text-sm">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>

              {/* Peacekeeping Toggle */}
              <div className="bg-stone-800/50 rounded-lg p-4 border border-amber-700/50">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPeacekeeping}
                    onChange={(e) => setHasPeacekeeping(e.target.checked)}
                    className="w-5 h-5 accent-amber-500"
                  />
                  <div>
                    <p className="text-amber-200 font-semibold">{t('peacekeepingTalent')}</p>
                    <p className="text-stone-400 text-sm">
                      {hasPeacekeeping 
                        ? `${t('ap')}: ${AP_COSTS.peacekeeping.first} ${t('apFirst')}, ${AP_COSTS.peacekeeping.subsequent} ${t('apAfter')}`
                        : `${t('ap')}: ${AP_COSTS.noPeacekeeping.first} ${t('apFirst')}, ${AP_COSTS.noPeacekeeping.subsequent} ${t('apAfter')}`
                      }
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-amber-200 font-semibold mb-2">
                  {t('marchTime')}: {Math.floor(marchTime / 60)}m {marchTime % 60}s
                </label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={marchTime}
                  onChange={(e) => setMarchTime(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-stone-400 text-sm">
                  <span>0s</span>
                  <span>1 {t('min')}</span>
                </div>
              </div>

              <div>
                <label className="block text-amber-200 font-semibold mb-2">
                  {t('apRegenRate').replace('X', apRegenSeconds.toString())}
                </label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="1"
                  value={apRegenSeconds}
                  onChange={(e) => setApRegenSeconds(Number(e.target.value))}
                  className="w-full h-3 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-stone-400 mt-1">
                  <span>{t('fast')} (10s)</span>
                  <span>{t('slow')} (30s)</span>
                </div>
                <p className="text-stone-400 text-sm mt-2">
                  {t('duringSession')} ~{results.apRegenerated} {t('ap')}
                </p>
              </div>

              {/* Per Barbarian Info */}
              <div className="bg-stone-800/50 rounded-lg p-4 border border-amber-700/50">
                <p className="text-amber-200 font-semibold mb-2">
                  {minBarbLevel === maxBarbLevel 
                    ? `Lvl ${minBarbLevel} ${t('barbarianRewards')}:` 
                    : `${t('averageRewards')} (Lvl ${minBarbLevel}-${maxBarbLevel}):`}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-stone-300">{t('resources')}: <span className="text-amber-400">{formatNumber(results.avgResources)}</span></p>
                  <p className="text-stone-300">XP: <span className="text-blue-400">{formatNumber(results.avgXP)}</span></p>
                  <p className="text-stone-300">{t('baseSpeedup')}: <span className="text-green-400">{results.avgSpeedupBase} {t('min')}</span></p>
                  <p className="text-stone-300">{t('ap')}: <span className="text-red-400">{results.apCosts.first}/{results.apCosts.subsequent}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="border-t border-amber-700/50 pt-6">
            {/* Time Required */}
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-amber-200">{t('timeRequired')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">{t('totalTime')}</p>
                <p className="text-2xl font-bold text-white">{formatTime(results.totalMinutes)}</p>
              </div>
              <div className="bg-stone-950/80 rounded-lg p-4 border border-amber-800">
                <p className="text-stone-400 text-sm">{t('timePerBarbarian')}</p>
                <p className="text-2xl font-bold text-white">
                  {results.barbCount > 0 ? Math.round((results.totalMinutes * 60) / results.barbCount) : 0}s
                </p>
              </div>
            </div>

            {/* Total Rewards */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold text-amber-200">{t('totalRewards')}</h3>
              </div>
              <p className="text-stone-400 text-sm">{results.barbCount} {t('barbarians')}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div 
                className="bg-gradient-to-br from-amber-800/50 to-amber-900/50 rounded-lg p-4 border-2 border-amber-600 cursor-help relative group"
                title={`${t('woodFood')}: ${formatNumber(results.totalResources)}\n${t('stone')}: ${formatNumber(results.totalStone)}\n${t('gold')}: ${formatNumber(results.totalGold)}`}
              >
                <p className="text-amber-300 text-sm font-semibold">{t('resources')} 🛈</p>
                <p className="text-3xl font-bold text-white">{formatNumber(results.totalResources)}</p>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 border border-amber-500 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <p className="text-amber-200">🌲 {t('woodFood')}: <span className="text-white">{formatNumber(results.totalResources)}</span></p>
                  <p className="text-stone-300">🪨 {t('stone')}: <span className="text-white">{formatNumber(results.totalStone)}</span></p>
                  <p className="text-yellow-300">🪙 {t('gold')}: <span className="text-white">{formatNumber(results.totalGold)}</span></p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-lg p-4 border-2 border-blue-600">
                <p className="text-blue-300 text-sm font-semibold">{t('commanderXP')}</p>
                <p className="text-3xl font-bold text-white">{formatNumber(results.totalXP)}</p>
              </div>
              
              <div 
                className="bg-gradient-to-br from-green-800/50 to-green-900/50 rounded-lg p-4 border-2 border-green-600 cursor-help relative group"
              >
                <p className="text-green-300 text-sm font-semibold">{t('speedups')} 🛈</p>
                <p className="text-3xl font-bold text-white">{formatNumber(results.totalSpeedups)} {t('min')}</p>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 border border-green-500 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <p className="text-green-200">⏱️ {results.totalSpeedups.toLocaleString()} {t('minutes')}</p>
                  <p className="text-green-200">⏱️ {(results.totalSpeedups / 60).toFixed(1)} {t('hours')}</p>
                  <p className="text-green-200">⏱️ {(results.totalSpeedups / 60 / 24).toFixed(2)} {t('days')}</p>
                  <p className="text-stone-400 text-xs mt-1">⚠️ {t('estimatesNote')}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-800/50 to-red-900/50 rounded-lg p-4 border-2 border-red-600">
                <p className="text-red-300 text-sm font-semibold">{t('netApCost')}</p>
                <p className="text-3xl font-bold text-white">{formatNumber(results.netAPCost)}</p>
                <p className="text-red-400 text-xs">
                  {formatNumber(results.totalAPCost)} - {formatNumber(results.apRegenerated)} regen
                </p>
              </div>
            </div>

            {/* Material Drops */}
            <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-lg p-4 border border-purple-600 mb-4">
              <p className="text-purple-200 font-semibold mb-3">🎁 {t('materialDrops')} ({t('estimated')})</p>
              <div className="grid grid-cols-5 gap-2 text-center">
                <div>
                  <p className="text-gray-300 text-xs">{t('common')}</p>
                  <p className="text-white font-bold">{results.materials.common}</p>
                </div>
                <div>
                  <p className="text-green-300 text-xs">{t('uncommon')}</p>
                  <p className="text-green-400 font-bold">{results.materials.uncommon}</p>
                </div>
                <div>
                  <p className="text-blue-300 text-xs">{t('rare')}</p>
                  <p className="text-blue-400 font-bold">{results.materials.rare}</p>
                </div>
                <div>
                  <p className="text-purple-300 text-xs">{t('epic')}</p>
                  <p className="text-purple-400 font-bold">{results.materials.epic}</p>
                </div>
                <div>
                  <p className="text-orange-300 text-xs">{t('legendary')}</p>
                  <p className="text-orange-400 font-bold">{results.materials.legendary}</p>
                </div>
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="bg-stone-800/50 rounded-lg p-4 border border-stone-700">
              <div className="flex flex-wrap gap-6 text-sm">
                <p className="text-stone-300">
                  {t('barbariansPerHour')}: <span className="text-white font-semibold">{results.totalMinutes > 0 ? Math.round(results.barbCount / (results.totalMinutes / 60)) : 0}</span>
                </p>
                <p className="text-stone-300">
                  {t('xpPerHour')}: <span className="text-blue-400 font-semibold">{results.totalHours > 0 ? formatNumber(results.totalXP / results.totalHours) : 0}</span>
                </p>
                <p className="text-stone-300">
                  {t('resourcesPerHour')}: <span className="text-amber-400 font-semibold">{results.totalHours > 0 ? formatNumber(results.totalResources / results.totalHours) : 0}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// DKP Calculator Page Component
function DKPCalculatorPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dkp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [playerData, setPlayerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Point values - customizable
  const [t4KillPoints, setT4KillPoints] = useState(1);
  const [t4DeathPoints, setT4DeathPoints] = useState(2);
  const [t5KillPoints, setT5KillPoints] = useState(10);
  const [t5DeathPoints, setT5DeathPoints] = useState(20);

  // Custom stats entries
  const [customEntries, setCustomEntries] = useState([
    { id: 1, username: '', power: '', t4Kills: '', t4Deaths: '', t5Kills: '', t5Deaths: '' }
  ]);

  const addCustomEntry = () => {
    setCustomEntries([
      ...customEntries,
      { id: Date.now(), username: '', power: '', t4Kills: '', t4Deaths: '', t5Kills: '', t5Deaths: '' }
    ]);
  };

  const removeCustomEntry = (id) => {
    if (customEntries.length > 1) {
      setCustomEntries(customEntries.filter(entry => entry.id !== id));
    }
  };

  const updateCustomEntry = (id, field, value) => {
    setCustomEntries(customEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const calculateCustomDKP = (entry) => {
    const t4K = Number(entry.t4Kills) || 0;
    const t4D = Number(entry.t4Deaths) || 0;
    const t5K = Number(entry.t5Kills) || 0;
    const t5D = Number(entry.t5Deaths) || 0;
    const killPoints = (t4K * t4KillPoints) + (t5K * t5KillPoints);
    const deathPoints = (t4D * t4DeathPoints) + (t5D * t5DeathPoints);
    return { dkp: killPoints + deathPoints, killPoints, deathPoints };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError('');

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Map the data to our expected format
        const mappedData = jsonData.map((row, index) => ({
          id: row['Character ID'] || index,
          username: row['Username'] || row['Name'] || row['Player'] || `Player ${index + 1}`,
          power: Number(row['Power']) || 0,
          t5Deaths: Number(row['T5 Deaths']) || 0,
          t4Deaths: Number(row['T4 Deaths']) || 0,
          t5Kills: Number(row['T5 Kills']) || 0,
          t4Kills: Number(row['T4 Kills']) || 0,
        }));

        setPlayerData(mappedData);
        setError('');
      } catch (err) {
        console.error('Error reading file:', err);
        setError('Error reading file. Please make sure it\'s a valid Excel file (.xlsx)');
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  const playersWithDKP = useMemo(() => {
    return playerData.map(player => {
      const killPoints = (player.t4Kills * t4KillPoints) + (player.t5Kills * t5KillPoints);
      const deathPoints = (player.t4Deaths * t4DeathPoints) + (player.t5Deaths * t5DeathPoints);
      return {
        ...player,
        dkp: killPoints + deathPoints,
        killPoints,
        deathPoints,
      };
    });
  }, [playerData, t4KillPoints, t4DeathPoints, t5KillPoints, t5DeathPoints]);

  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = playersWithDKP;
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(player => 
        player.username.toLowerCase().includes(term) ||
        String(player.id).toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return filtered;
  }, [playersWithDKP, searchTerm, sortBy, sortOrder]);

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const SortButton = ({ field, label }) => (
    <button
      onClick={() => handleSort(field)}
      className={`px-2 py-1 text-xs font-semibold rounded transition-all ${
        sortBy === field 
          ? 'bg-amber-600 text-white' 
          : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
      }`}
    >
      {label} {sortBy === field && (sortOrder === 'desc' ? '↓' : '↑')}
    </button>
  );

  return (
    <div className="relative z-10 p-4 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700/90 to-orange-600/90 backdrop-blur-sm rounded-t-lg p-6 shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-3">
            <Swords className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">{t('dkpCalcTitle')}</h1>
          </div>
          <p className="text-amber-100 mt-2">{t('dkpCalcSubtitle')}{playerData.length > 0 && ` - ${playerData.length} ${t('playersLoaded')}`}</p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-sm p-6 shadow-2xl border-x border-b border-amber-700/30 rounded-b-lg">
          {/* File Upload Section */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500">
            <h3 className="text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              📁 {t('uploadPlayerData')}
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <label className="flex-1">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="cursor-pointer bg-stone-700 hover:bg-stone-600 border-2 border-dashed border-amber-500 rounded-lg p-4 text-center transition-all">
                  <p className="text-amber-200 font-semibold">
                    {isLoading ? '⏳ Loading...' : `📤 ${t('clickToUpload')}`}
                  </p>
                  <p className="text-stone-400 text-sm mt-1">
                    {t('requiredColumns')}
                  </p>
                </div>
              </label>
              {playerData.length > 0 && (
                <button
                  onClick={() => setPlayerData([])}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-all"
                >
                  {t('clearData')}
                </button>
              )}
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-3">⚠️ {error}</p>
            )}
            {playerData.length > 0 && (
              <p className="text-green-400 text-sm mt-3">✅ {t('successfullyLoaded')} {playerData.length} {t('players')}</p>
            )}
            
            {/* How to get data guide */}
            <div className="mt-4 bg-stone-900/50 rounded-lg p-4 border border-stone-600">
              <p className="text-amber-300 font-semibold mb-2">📖 {t('howToGetData')}</p>
              <ol className="text-stone-300 text-sm space-y-2 list-decimal list-inside">
                <li>{t('howToStep1')} <a href="https://rok-game-tools-global.lilith.com/manageTools" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">rok-game-tools-global.lilith.com/manageTools</a></li>
                <li>{t('howToStep2')} <span className="text-amber-400">{t('noticeBoard')}</span> → <span className="text-amber-400">{t('viewMemberData')}</span></li>
                <li>{t('howToStep3')}</li>
                <li>{t('howToStep4')}</li>
              </ol>
            </div>
          </div>

          {/* Point Configuration */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500">
            <h3 className="text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Point Values Configuration
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-amber-300 text-sm font-semibold mb-2">T4 Kill Points</label>
                <input
                  type="number"
                  value={t4KillPoints}
                  onChange={(e) => setT4KillPoints(Number(e.target.value) || 0)}
                  className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-amber-300 text-sm font-semibold mb-2">T4 Death Points</label>
                <input
                  type="number"
                  value={t4DeathPoints}
                  onChange={(e) => setT4DeathPoints(Number(e.target.value) || 0)}
                  className="w-full bg-stone-800 text-white border-2 border-red-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-amber-300 text-sm font-semibold mb-2">T5 Kill Points</label>
                <input
                  type="number"
                  value={t5KillPoints}
                  onChange={(e) => setT5KillPoints(Number(e.target.value) || 0)}
                  className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-amber-300 text-sm font-semibold mb-2">T5 Death Points</label>
                <input
                  type="number"
                  value={t5DeathPoints}
                  onChange={(e) => setT5DeathPoints(Number(e.target.value) || 0)}
                  className="w-full bg-stone-800 text-white border-2 border-red-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <p className="text-stone-400 text-sm mt-3">
              💡 Adjust point values above to recalculate DKP for all players
            </p>
          </div>

          {/* Custom Stats Calculator */}
          <div className="mb-6 bg-gradient-to-r from-stone-800/80 to-stone-700/80 rounded-lg p-5 border-2 border-amber-500">
            <h3 className="text-amber-200 font-bold mb-4 text-lg flex items-center gap-2">
              ✏️ {t('customStatsCalc')}
            </h3>
            <p className="text-stone-400 text-sm mb-4">
              {t('customStatsDesc')}
            </p>
            
            {/* Custom entries displayed like player list */}
            <div className="space-y-2">
              {customEntries.map((entry, index) => {
                const dkpResult = calculateCustomDKP(entry);
                const hasData = entry.t4Kills || entry.t4Deaths || entry.t5Kills || entry.t5Deaths;
                
                return (
                  <div 
                    key={entry.id} 
                    className="bg-stone-800/80 rounded-lg border border-stone-700 hover:border-amber-500 transition-all p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      {/* Left side - Rank and Username */}
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-stone-700 text-stone-300'
                        }`}>
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder={t('username')}
                            value={entry.username}
                            onChange={(e) => updateCustomEntry(entry.id, 'username', e.target.value)}
                            className="bg-transparent text-white font-semibold border-b border-stone-600 focus:border-amber-500 outline-none w-full max-w-[150px] placeholder-stone-500"
                          />
                        </div>
                        {customEntries.length > 1 && (
                          <button
                            onClick={() => removeCustomEntry(entry.id)}
                            className="text-red-400 hover:text-red-300 text-xs md:hidden"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      
                      {/* Right side - Stats */}
                      <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t4KillPoints').replace(' Points', '')}</p>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.t4Kills}
                            onChange={(e) => updateCustomEntry(entry.id, 't4Kills', e.target.value)}
                            className="w-16 bg-stone-700/50 text-green-400 font-semibold text-center border border-stone-600 rounded p-1 text-sm focus:outline-none focus:border-green-500"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t5KillPoints').replace(' Points', '')}</p>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.t5Kills}
                            onChange={(e) => updateCustomEntry(entry.id, 't5Kills', e.target.value)}
                            className="w-16 bg-stone-700/50 text-green-400 font-semibold text-center border border-stone-600 rounded p-1 text-sm focus:outline-none focus:border-green-500"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t4DeathPoints').replace(' Points', '')}</p>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.t4Deaths}
                            onChange={(e) => updateCustomEntry(entry.id, 't4Deaths', e.target.value)}
                            className="w-16 bg-stone-700/50 text-red-400 font-semibold text-center border border-stone-600 rounded p-1 text-sm focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t5DeathPoints').replace(' Points', '')}</p>
                          <input
                            type="number"
                            placeholder="0"
                            value={entry.t5Deaths}
                            onChange={(e) => updateCustomEntry(entry.id, 't5Deaths', e.target.value)}
                            className="w-16 bg-stone-700/50 text-red-400 font-semibold text-center border border-stone-600 rounded p-1 text-sm focus:outline-none focus:border-red-500"
                          />
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-amber-400 text-xs font-semibold">{t('totalDKP').toUpperCase()}</p>
                          <p className={`font-bold text-lg ${hasData ? 'text-amber-300' : 'text-stone-500'}`}>
                            {hasData ? formatNumber(dkpResult.dkp) : '-'}
                          </p>
                        </div>
                        {customEntries.length > 1 && (
                          <button
                            onClick={() => removeCustomEntry(entry.id)}
                            className="hidden md:block text-red-400 hover:text-red-300 p-1"
                            title={t('remove')}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Kill/Death points breakdown */}
                    {hasData && (
                      <div className="mt-2 pt-2 border-t border-stone-700 flex gap-4 text-xs">
                        <span className="text-green-400">⚔️ {t('killPoints')}: {formatNumber(dkpResult.killPoints)}</span>
                        <span className="text-red-400">💀 {t('deathPoints')}: {formatNumber(dkpResult.deathPoints)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <button
              onClick={addCustomEntry}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <span className="text-xl">+</span> {t('addAnotherPlayer')}
            </button>
          </div>

          {playerData.length === 0 ? (
            <div className="text-center py-16 bg-stone-800/50 rounded-lg border border-stone-700">
              <Swords className="w-16 h-16 text-stone-600 mx-auto mb-4" />
              <p className="text-stone-400 text-lg">No player data loaded</p>
              <p className="text-stone-500 mt-2">Upload an Excel file above to get started</p>
            </div>
          ) : (
            <>
              {/* Search and Sort */}
              <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by username or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-stone-800 text-white border-2 border-amber-600 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-stone-400 text-sm">Sort by:</span>
                  <SortButton field="dkp" label="DKP" />
                  <SortButton field="power" label="Power" />
                  <SortButton field="killPoints" label="Kills" />
                  <SortButton field="deathPoints" label="Deaths" />
                </div>
              </div>

              {/* Player List */}
              <div className="space-y-2">
                {filteredAndSortedPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className="bg-stone-800/80 rounded-lg border border-stone-700 hover:border-amber-500 transition-all p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-stone-700 text-stone-300'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-white font-semibold">{player.username}</p>
                          <p className="text-stone-400 text-sm">{t('id')}: {player.id} • {t('power')}: {formatNumber(player.power)}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 md:gap-6">
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t4KillPoints').replace(' Points', '')}</p>
                          <p className="text-green-400 font-semibold">{formatNumber(player.t4Kills)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t5KillPoints').replace(' Points', '')}</p>
                          <p className="text-green-400 font-semibold">{formatNumber(player.t5Kills)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t4DeathPoints').replace(' Points', '')}</p>
                          <p className="text-red-400 font-semibold">{formatNumber(player.t4Deaths)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-stone-400 text-xs">{t('t5DeathPoints').replace(' Points', '')}</p>
                          <p className="text-red-400 font-semibold">{formatNumber(player.t5Deaths)}</p>
                        </div>
                        <div className="text-center min-w-[80px]">
                          <p className="text-amber-400 text-xs font-semibold">{t('totalDKP').toUpperCase()}</p>
                          <p className="text-amber-300 font-bold text-lg">{formatNumber(player.dkp)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredAndSortedPlayers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-stone-400 text-lg">{t('noPlayersFound')} "{searchTerm}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function BarbFortCalculator() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen relative ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <FlameBackground />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'calculator' && <CalculatorPage />}
      {currentPage === 'barbarian' && <BarbarianCalculatorPage />}
      {currentPage === 'lyceum' && <LyceumPage />}
      {currentPage === 'dkp' && <DKPCalculatorPage />}
    </div>
  );
}
