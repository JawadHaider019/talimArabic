export type UnitStatus = 'passed' | 'needs_review' | 'not_started';

export interface VocabItem {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  options: string[];
}

export interface DialogueTurn {
  tutorArabic: string;
  tutorEnglish: string;
  suggestedReplies: {
    arabic: string;
    transliteration: string;
    english: string;
    fluencyBoost: number;
  }[];
}

export interface CurriculumUnit {
  id: string;
  book: 1 | 2;
  unitNumber: number;
  title: string;
  arabicTitle: string;
  status: UnitStatus;
  speakingScore: number | null;
  vocabCorrect: number;
  vocabTotal: number;
  conversationPromptArabic: string;
  conversationPromptEnglish: string;
  dialogue: DialogueTurn[];
  lastPracticed?: string;
}

export interface SpeakingSessionPoint {
  id: string;
  dateLabel: string;
  unitLabel: string;
  score: number;
}

export const REAL_BUBBLE_PROFILE = {
  firstName: 'Yusuf',
  fullName: 'Yusuf Mansoor',
  email: 'm@m.com',
  avatarUrl: '/src/assets/images/avatar_student_yusuf_1794996163146.jpg',
  planName: 'Weekly Speaking Plan',
  weeklyGoalTarget: 5,
  weeklyGoalCompleted: 0,
  weeklyStreakCount: 0,
  weeklyResetLabel: 'Resets Mon 23 Nov',
  timeStudiedMinutes: 10,
  sessionRemainingSeconds: 560, // 9 min 20 sec remaining for current session
};

export const STUDENT_PROFILE = {
  firstName: 'Yusuf',
  fullName: 'Yusuf Mansoor',
  email: 'm@m.com',
  avatarUrl: '/src/assets/images/avatar_student_yusuf_1794996163146.jpg',
  planName: 'VIP Speaking Masterclass',
  weeklyGoalTarget: 5,
  weeklyGoalCompleted: 3,
  weeklyStreakCount: 4,
  weeklyResetLabel: 'Resets Mon 23 Nov',
  timeStudiedMinutes: 185,
  sessionRemainingSeconds: 560, // 9 min 20 sec remaining for current session
};

export const SAMPLE_SCORE_HISTORY: SpeakingSessionPoint[] = [
  { id: 's1', dateLabel: '02 Nov', unitLabel: 'Book 1 · Unit 1: Introductions', score: 68 },
  { id: 's2', dateLabel: '06 Nov', unitLabel: 'Book 1 · Unit 1: Introductions', score: 79 },
  { id: 's3', dateLabel: '10 Nov', unitLabel: 'Book 1 · Unit 2: The Family', score: 74 },
  { id: 's4', dateLabel: '13 Nov', unitLabel: 'Book 1 · Unit 2: The Family', score: 86 },
  { id: 's5', dateLabel: '16 Nov', unitLabel: 'Book 1 · Unit 3: The Home', score: 82 },
  { id: 's6', dateLabel: '18 Nov', unitLabel: 'Book 1 · Unit 4: Daily Life', score: 92 },
];

function makeDefaultDialogue(
  arabicTopic: string,
  englishTopic: string
): DialogueTurn[] {
  return [
    {
      tutorArabic: `السَّلَامُ عَلَيْكُمْ! هَلْ أَنْتَ مُسْتَعِدٌّ لِلتَّحَدُّثِ عَنْ ${arabicTopic}؟`,
      tutorEnglish: `Assalamu Alaikum! Are you ready to talk about ${englishTopic}?`,
      suggestedReplies: [
        {
          arabic: 'نَعَمْ، أَنَا مُسْتَعِدٌّ إِنْ شَاءَ اللَّهُ',
          transliteration: "Na'am, ana musta'iddun in sha'a Allah",
          english: 'Yes, I am ready, God willing',
          fluencyBoost: 24,
        },
        {
          arabic: 'وَعَلَيْكُمُ السَّلَامُ، أُحِبُّ هَذَا المَوْضُوعَ',
          transliteration: "Wa 'alaykum as-salam, uhibbu hadha al-mawdu'",
          english: 'And peace be upon you, I like this topic',
          fluencyBoost: 28,
        },
      ],
    },
    {
      tutorArabic: `مُمْتَازٌ! أَخْبِرْنِي جُمْلَةً قَصِيرَةً عَنْ ${arabicTopic}.`,
      tutorEnglish: `Excellent! Tell me a short sentence about ${englishTopic}.`,
      suggestedReplies: [
        {
          arabic: `أَتَعَلَّمُ مُفْرَدَاتٍ جَدِيدَةً عَنْ ${arabicTopic} كُلَّ يَوْمٍ`,
          transliteration: "Ata'allamu mufradatin jadidatan kulla yawm",
          english: `I learn new vocabulary about ${englishTopic} every day`,
          fluencyBoost: 30,
        },
        {
          arabic: 'هَذَا مَوْضُوعٌ مُهِمٌّ جِدًّا فِي حَيَاتِنَا',
          transliteration: "Hadha mawdu'un muhimmun jiddan fi hayatina",
          english: 'This is a very important topic in our lives',
          fluencyBoost: 26,
        },
      ],
    },
  ];
}

export const INITIAL_UNITS: CurriculumUnit[] = [
  // BOOK 1 (16 Units) — Exact unit names & student progress from TalimArabic
  {
    id: 'b1-u1',
    book: 1,
    unitNumber: 1,
    title: 'Introductions & Greetings',
    arabicTitle: 'التَّحِيَّةُ وَالتَّعَارُفُ',
    status: 'passed',
    speakingScore: 92,
    vocabCorrect: 20,
    vocabTotal: 20,
    conversationPromptArabic: 'عَرِّفْ بِنَفْسِكَ وَاسْأَلْ عَنْ حَالِ صَدِيقِكَ',
    conversationPromptEnglish: 'Introduce yourself and ask how your friend is doing.',
    lastPracticed: '06 Nov',
    dialogue: [
      {
        tutorArabic: 'السَّلَامُ عَلَيْكُمْ! مَا اسْمُكَ وَمِنْ أَيْنَ أَنْتَ؟',
        tutorEnglish: 'Assalamu Alaikum! What is your name and where are you from?',
        suggestedReplies: [
          {
            arabic: 'وَعَلَيْكُمُ السَّلَامُ، اسْمِي يُوسُفُ وَأَنَا مِنْ بَرِيطَانْيَا',
            transliteration: "Wa 'alaykum as-salam, ismi Yusuf wa ana min Britanya",
            english: 'Peace be upon you, my name is Yusuf and I am from Britain',
            fluencyBoost: 28,
          },
          {
            arabic: 'أَهْلاً بِكَ، أَنَا طَالِبٌ جَدِيدٌ',
            transliteration: 'Ahlan bika, ana talibun jadid',
            english: 'Welcome, I am a new student',
            fluencyBoost: 22,
          },
        ],
      },
      {
        tutorArabic: 'أَهْلاً وَسَهْلاً يَا يُوسُفُ! كَيْفَ حَالُكَ اليَوْمَ؟',
        tutorEnglish: 'Welcome Yusuf! How are you today?',
        suggestedReplies: [
          {
            arabic: 'بِخَيْرٍ وَالحَمْدُ لِلَّهِ، وَأَنْتَ كَيْفَ حَالُكَ؟',
            transliteration: 'Bi-khayrin wal-hamdu lillah, wa anta kayfa haluk?',
            english: 'I am well, praise be to God, and how are you?',
            fluencyBoost: 30,
          },
          {
            arabic: 'أَنَا بِخَيْرٍ شُكْرًا لَكَ',
            transliteration: 'Ana bi-khayrin shukran laka',
            english: 'I am fine, thank you',
            fluencyBoost: 24,
          },
        ],
      },
    ],
  },
  {
    id: 'b1-u2',
    book: 1,
    unitNumber: 2,
    title: 'The Family',
    arabicTitle: 'الأُسْرَةُ',
    status: 'passed',
    speakingScore: 88,
    vocabCorrect: 19,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ أَفْرَادِ أُسْرَتِكَ',
    conversationPromptEnglish: 'Talk about the members of your family.',
    lastPracticed: '11 Nov',
    dialogue: makeDefaultDialogue('أُسْرَتِكَ', 'your family'),
  },
  {
    id: 'b1-u3',
    book: 1,
    unitNumber: 3,
    title: 'The Home',
    arabicTitle: 'البَيْتُ',
    status: 'passed',
    speakingScore: 84,
    vocabCorrect: 18,
    vocabTotal: 20,
    conversationPromptArabic: 'صِفْ بَيْتَكَ وَغُرَفَهُ لِمُعَلِّمِكَ',
    conversationPromptEnglish: 'Describe your home and its rooms to your tutor.',
    lastPracticed: '14 Nov',
    dialogue: [
      {
        tutorArabic: 'أَيْنَ تَسْكُنُ يَا يُوسُفُ؟ هَلْ تَسْكُنُ فِي بَيْتٍ أَمْ فِي شَقَّةٍ؟',
        tutorEnglish: 'Where do you live, Yusuf? Do you live in a house or an apartment?',
        suggestedReplies: [
          {
            arabic: 'أَسْكُنُ فِي بَيْتٍ جَمِيلٍ مَعَ أُسْرَتِي',
            transliteration: 'Askunu fi baytin jamilin ma‘a usrati',
            english: 'I live in a nice house with my family',
            fluencyBoost: 28,
          },
          {
            arabic: 'أَسْكُنُ فِي شَقَّةٍ فِي الطَّابِقِ الثَّانِي',
            transliteration: 'Askunu fi shaqqatin fi at-tabiq ath-thani',
            english: 'I live in an apartment on the second floor',
            fluencyBoost: 26,
          },
        ],
      },
      {
        tutorArabic: 'مَا شَاءَ اللَّهُ! كَمْ غُرْفَةً فِي بَيْتِكَ؟',
        tutorEnglish: 'MashaAllah! How many rooms are in your house?',
        suggestedReplies: [
          {
            arabic: 'فِي البَيْتِ ثَلَاثُ غُرَفِ نَوْمٍ وَمَطْبَخٌ وَغُرْفَةُ جُلُوسٍ',
            transliteration: 'Fi al-bayti thalathu ghurafi nawmin wa matbakhun wa ghurfat julus',
            english: 'In the house there are three bedrooms, a kitchen, and a living room',
            fluencyBoost: 34,
          },
          {
            arabic: 'فِي بَيْتِي أَرْبَعُ غُرَفٍ وَحَدِيقَةٌ صَغِيرَةٌ',
            transliteration: "Fi bayti arba'u ghurafin wa hadiqatun saghirah",
            english: 'In my house there are four rooms and a small garden',
            fluencyBoost: 30,
          },
        ],
      },
    ],
  },
  {
    id: 'b1-u4',
    book: 1,
    unitNumber: 4,
    title: 'Daily Life',
    arabicTitle: 'الحَيَاةُ اليَوْمِيَّةُ',
    status: 'passed',
    speakingScore: 91,
    vocabCorrect: 20,
    vocabTotal: 20,
    conversationPromptArabic: 'مَاذَا تَفْعَلُ فِي الصَّبَاحِ وَالمَسَاءِ؟',
    conversationPromptEnglish: 'Describe your morning and evening routine.',
    lastPracticed: '16 Nov',
    dialogue: makeDefaultDialogue('حَيَاتِكَ اليَوْمِيَّةِ', 'your daily routine'),
  },
  {
    id: 'b1-u5',
    book: 1,
    unitNumber: 5,
    title: 'Food & Drink',
    arabicTitle: 'الطَّعَامُ وَالشَّرَابُ',
    status: 'passed',
    speakingScore: 78,
    vocabCorrect: 15,
    vocabTotal: 20,
    conversationPromptArabic: 'اطْلُبْ طَعَامَكَ المُفَضَّلَ فِي المَطْعَمِ',
    conversationPromptEnglish: 'Order your favorite meal at a restaurant.',
    lastPracticed: '17 Nov',
    dialogue: makeDefaultDialogue('الطَّعَامِ وَالشَّرَابِ', 'food and drink'),
  },
  {
    id: 'b1-u6',
    book: 1,
    unitNumber: 6,
    title: 'The Prayer',
    arabicTitle: 'الصَّلَاةُ',
    status: 'needs_review',
    speakingScore: 68,
    vocabCorrect: 12,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ أَوْقَاتِ الصَّلَاةِ وَالمَسْجِدِ',
    conversationPromptEnglish: 'Discuss prayer times and visiting the masjid.',
    lastPracticed: '18 Nov',
    dialogue: makeDefaultDialogue('الصَّلَاةِ وَالمَسْجِدِ', 'prayer and the masjid'),
  },
  {
    id: 'b1-u7',
    book: 1,
    unitNumber: 7,
    title: 'Studies',
    arabicTitle: 'الدِّرَاسَةُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 6,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ مَدْرَسَتِكَ وَمَوَادِّكَ الدِّرَاسِيَّةِ',
    conversationPromptEnglish: 'Talk about your school subjects and schedule.',
    dialogue: makeDefaultDialogue('الدِّرَاسَةِ', 'your studies'),
  },
  {
    id: 'b1-u8',
    book: 1,
    unitNumber: 8,
    title: 'Work',
    arabicTitle: 'العَمَلُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'مَا مِهْنَتُكَ وَمَاذَا تَعْمَلُ كُلَّ يَوْمٍ؟',
    conversationPromptEnglish: 'Discuss your occupation and daily responsibilities.',
    dialogue: makeDefaultDialogue('العَمَلِ', 'work'),
  },
  {
    id: 'b1-u9',
    book: 1,
    unitNumber: 9,
    title: 'Shopping',
    arabicTitle: 'التَّسَوُّقُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'اسْأَلْ عَنِ الأَسْعَارِ فِي السُّوقِ',
    conversationPromptEnglish: 'Ask about prices and shop at the market.',
    dialogue: makeDefaultDialogue('التَّسَوُّقِ', 'shopping'),
  },
  {
    id: 'b1-u10',
    book: 1,
    unitNumber: 10,
    title: 'Weather',
    arabicTitle: 'الجَوُّ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'كَيْفَ الجَوُّ اليَوْمَ وَفِي فُصُولِ السَّنَةِ؟',
    conversationPromptEnglish: 'Describe today’s weather and the four seasons.',
    dialogue: makeDefaultDialogue('الجَوِّ وَالفُصُولِ', 'the weather'),
  },
  {
    id: 'b1-u11',
    book: 1,
    unitNumber: 11,
    title: 'People & Places',
    arabicTitle: 'النَّاسُ وَالأَمَاكِنُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنِ المَدِينَةِ الَّتِي تَسْكُنُ فِيهَا',
    conversationPromptEnglish: 'Describe the city and neighborhood where you live.',
    dialogue: makeDefaultDialogue('النَّاسِ وَالأَمَاكِنِ', 'people and places'),
  },
  {
    id: 'b1-u12',
    book: 1,
    unitNumber: 12,
    title: 'Hobbies',
    arabicTitle: 'الهِوَايَاتُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'مَا هِوَايَتُكَ المُفَضَّلَةُ فِي وَقْتِ الفَرَاغِ؟',
    conversationPromptEnglish: 'Share your favorite hobbies and pastimes.',
    dialogue: makeDefaultDialogue('الهِوَايَاتِ', 'your hobbies'),
  },
  {
    id: 'b1-u13',
    book: 1,
    unitNumber: 13,
    title: 'Travel',
    arabicTitle: 'السَّفَرُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ رِحْلَةٍ فِي المَطَارِ وَالفُنْدُقِ',
    conversationPromptEnglish: 'Practice airport check-in and hotel booking.',
    dialogue: makeDefaultDialogue('السَّفَرِ', 'travel'),
  },
  {
    id: 'b1-u14',
    book: 1,
    unitNumber: 14,
    title: 'Hajj & Umrah',
    arabicTitle: 'الحَجُّ وَالعُمْرَةُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ رِحْلَةِ العُمْرَةِ إِلَى مَكَّةَ',
    conversationPromptEnglish: 'Discuss the journey and steps of Umrah.',
    dialogue: makeDefaultDialogue('الحَجِّ وَالعُمْرَةِ', 'Hajj and Umrah'),
  },
  {
    id: 'b1-u15',
    book: 1,
    unitNumber: 15,
    title: 'Health',
    arabicTitle: 'الصِّحَّةُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'صِفْ أَعْرَاضَكَ لِلطَّبِيبِ فِي العِيَادَةِ',
    conversationPromptEnglish: 'Describe how you feel at a doctor’s clinic.',
    dialogue: makeDefaultDialogue('الصِّحَّةِ', 'health'),
  },
  {
    id: 'b1-u16',
    book: 1,
    unitNumber: 16,
    title: 'Holidays',
    arabicTitle: 'العُطْلَاتُ وَالأَعْيَادُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'كَيْفَ تَقْضِي أَيَّامَ العُطْلَةِ مَعَ أُسْرَتِكَ؟',
    conversationPromptEnglish: 'Talk about how you spend holidays with family.',
    dialogue: makeDefaultDialogue('العُطْلَاتِ', 'holidays'),
  },

  // BOOK 2 (16 Units) — Exact unit names from TalimArabic
  {
    id: 'b2-u1',
    book: 2,
    unitNumber: 1,
    title: 'Healthcare',
    arabicTitle: 'العِنَايَةُ بِالصِّحَّةِ',
    status: 'passed',
    speakingScore: 84,
    vocabCorrect: 17,
    vocabTotal: 20,
    conversationPromptArabic: 'نَاقِشْ عَادَاتِ الغِذَاءِ الصِّحِّيِّ وَالرِّيَاضَةِ',
    conversationPromptEnglish: 'Discuss healthy habits, nutrition, and fitness.',
    lastPracticed: '15 Nov',
    dialogue: makeDefaultDialogue('العِنَايَةِ بِالصِّحَّةِ', 'healthcare'),
  },
  {
    id: 'b2-u2',
    book: 2,
    unitNumber: 2,
    title: 'Recreation',
    arabicTitle: 'التَّرْوِيحُ عَنِ النَّفْسِ',
    status: 'needs_review',
    speakingScore: 62,
    vocabCorrect: 9,
    vocabTotal: 20,
    conversationPromptArabic: 'مَا أَهَمِّيَّةُ التَّرْوِيحِ فِي حَيَاةِ الإِنْسَانِ؟',
    conversationPromptEnglish: 'Talk about balanced rest and leisure activities.',
    lastPracticed: '17 Nov',
    dialogue: makeDefaultDialogue('التَّرْوِيحِ', 'recreation'),
  },
  {
    id: 'b2-u3',
    book: 2,
    unitNumber: 3,
    title: 'Married Life',
    arabicTitle: 'الحَيَاةُ الزَّوْجِيَّةُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنِ التَّعَاوُنِ وَالمَوَدَّةِ فِي الأُسْرَةِ',
    conversationPromptEnglish: 'Discuss cooperation and harmony in family life.',
    dialogue: makeDefaultDialogue('الحَيَاةِ الزَّوْجِيَّةِ', 'married life'),
  },
  {
    id: 'b2-u4',
    book: 2,
    unitNumber: 4,
    title: 'City Life',
    arabicTitle: 'الحَيَاةُ فِي المَدِينَةِ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'قَارِنْ بَيْنَ السَّكَنِ فِي المَدِينَةِ وَالقَرْيَةِ',
    conversationPromptEnglish: 'Compare living in a busy city versus the countryside.',
    dialogue: makeDefaultDialogue('الحَيَاةِ فِي المَدِينَةِ', 'city life'),
  },
  {
    id: 'b2-u5',
    book: 2,
    unitNumber: 5,
    title: 'Teaching & Learning',
    arabicTitle: 'العِلْمُ وَالتَّعَلُّمُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ فَضْلِ طَلَبِ العِلْمِ وَالقِرَاءَةِ',
    conversationPromptEnglish: 'Discuss the value of seeking knowledge and reading.',
    dialogue: makeDefaultDialogue('العِلْمِ وَالتَّعَلُّمِ', 'teaching and learning'),
  },
  {
    id: 'b2-u6',
    book: 2,
    unitNumber: 6,
    title: 'Professions',
    arabicTitle: 'المِهَنُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'نَاقِشْ أَهَمِّيَّةَ إِتْقَانِ العَمَلِ وَالمِهَنِ الحَرَفِيَّةِ',
    conversationPromptEnglish: 'Discuss craftsmanship and excellence in work.',
    dialogue: makeDefaultDialogue('المِهَنِ', 'professions'),
  },
  {
    id: 'b2-u7',
    book: 2,
    unitNumber: 7,
    title: 'The Arabic Language',
    arabicTitle: 'اللُّغَةُ العَرَبِيَّةُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'لِمَاذَا تَتَعَلَّمُ اللُّغَةَ العَرَبِيَّةَ الفُصْحَى؟',
    conversationPromptEnglish: 'Explain your journey learning Classical Arabic.',
    dialogue: makeDefaultDialogue('اللُّغَةِ العَرَبِيَّةِ', 'the Arabic language'),
  },
  {
    id: 'b2-u8',
    book: 2,
    unitNumber: 8,
    title: 'Gifts',
    arabicTitle: 'الجَوَائِزُ وَالهَدَايَا',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ آدَابِ الهَدَايَا وَمُنَاسَبَاتِهَا',
    conversationPromptEnglish: 'Talk about the etiquette and meaning of gifts.',
    dialogue: makeDefaultDialogue('الهَدَايَا', 'gifts'),
  },
  {
    id: 'b2-u9',
    book: 2,
    unitNumber: 9,
    title: 'The World is a Small Village',
    arabicTitle: 'العَالَمُ قَرْيَةٌ صَغِيرَةٌ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'كَيْفَ غَيَّرَتْ وَسَائِلُ الِاتِّصَالِ حَيَاتَنَا؟',
    conversationPromptEnglish: 'Discuss how modern communication connects the world.',
    dialogue: makeDefaultDialogue('الِاتِّصَالَاتِ الحَدِيثَةِ', 'global communication'),
  },
  {
    id: 'b2-u10',
    book: 2,
    unitNumber: 10,
    title: 'Cleanliness',
    arabicTitle: 'النَّظَافَةُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ دَوْرِ النَّظَافَةِ فِي المُجْتَمَعِ',
    conversationPromptEnglish: 'Discuss personal and civic cleanliness.',
    dialogue: makeDefaultDialogue('النَّظَافَةِ', 'cleanliness'),
  },
  {
    id: 'b2-u11',
    book: 2,
    unitNumber: 11,
    title: 'Islam',
    arabicTitle: 'الإِسْلَامُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ قِيَمِ التَّسَامُحِ وَالرَّحْمَةِ',
    conversationPromptEnglish: 'Discuss core Islamic values of mercy and character.',
    dialogue: makeDefaultDialogue('قِيَمِ الإِسْلَامِ', 'Islamic values'),
  },
  {
    id: 'b2-u12',
    book: 2,
    unitNumber: 12,
    title: 'The Youth',
    arabicTitle: 'الشَّبَابُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'مَا مَسْؤُولِيَّةُ الشَّبَابِ فِي بِنَاءِ المُسْتَقْبَلِ؟',
    conversationPromptEnglish: 'Discuss the role of youth in shaping society.',
    dialogue: makeDefaultDialogue('دَوْرِ الشَّبَابِ', 'the youth'),
  },
  {
    id: 'b2-u13',
    book: 2,
    unitNumber: 13,
    title: 'The Islamic World',
    arabicTitle: 'العَالَمُ الإِسْلَامِيُّ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنِ التَّنَوُّعِ الثَّقَافِيِّ فِي العَالَمِ الإِسْلَامِيِّ',
    conversationPromptEnglish: 'Explore cultural diversity across the Islamic world.',
    dialogue: makeDefaultDialogue('العَالَمِ الإِسْلَامِيِّ', 'the Islamic world'),
  },
  {
    id: 'b2-u14',
    book: 2,
    unitNumber: 14,
    title: 'Security',
    arabicTitle: 'الأَمْنُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'نَاقِشْ نِعْمَةَ الأَمْنِ وَالِاسْتِقْرَارِ',
    conversationPromptEnglish: 'Discuss the blessing of safety and community peace.',
    dialogue: makeDefaultDialogue('الأَمْنِ', 'security'),
  },
  {
    id: 'b2-u15',
    book: 2,
    unitNumber: 15,
    title: 'Pollution',
    arabicTitle: 'التَّلَوُّثُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'كَيْفَ نَحْمِي البِيئَةَ مِنَ التَّلَوُّثِ؟',
    conversationPromptEnglish: 'Discuss ways to protect the environment from pollution.',
    dialogue: makeDefaultDialogue('حِمَايَةِ البِيئَةِ', 'pollution and environment'),
  },
  {
    id: 'b2-u16',
    book: 2,
    unitNumber: 16,
    title: 'Energy',
    arabicTitle: 'الطَّاقَةُ',
    status: 'not_started',
    speakingScore: null,
    vocabCorrect: 0,
    vocabTotal: 20,
    conversationPromptArabic: 'تَحَدَّثْ عَنْ مَصَادِرِ الطَّاقَةِ المُتَجَدِّدَةِ',
    conversationPromptEnglish: 'Discuss solar and renewable energy sources.',
    dialogue: makeDefaultDialogue('الطَّاقَةِ', 'energy'),
  },
];

export const UNIT_VOCAB_QUIZ: Record<string, VocabItem[]> = {
  'b1-u1': [
    {
      id: 'u1-1',
      arabic: 'كَيْفَ حَالُكَ؟',
      transliteration: 'Kayfa haluka?',
      english: 'How are you?',
      options: ['What is your name?', 'How are you?', 'Where are you from?', 'Nice to meet you'],
    },
    {
      id: 'u1-2',
      arabic: 'أَهْلاً وَسَهْلاً',
      transliteration: 'Ahlan wa sahlan',
      english: 'Welcome',
      options: ['Goodbye', 'Excuse me', 'Welcome', 'Thank you'],
    },
    {
      id: 'u1-3',
      arabic: 'مِنْ أَيْنَ أَنْتَ؟',
      transliteration: 'Min ayna anta?',
      english: 'Where are you from?',
      options: ['Where are you from?', 'How old are you?', 'Where do you live?', 'What do you study?'],
    },
    {
      id: 'u1-4',
      arabic: 'مَا اسْمُكَ؟',
      transliteration: 'Ma ismuka?',
      english: 'What is your name?',
      options: ['Where is your home?', 'What is your name?', 'Who is this?', 'Good morning'],
    },
  ],
  'b1-u2': [
    {
      id: 'u2-1',
      arabic: 'الأُسْرَةُ',
      transliteration: 'Al-Usrah',
      english: 'The family',
      options: ['The family', 'The friend', 'The neighbor', 'The teacher'],
    },
    {
      id: 'u2-2',
      arabic: 'الوَالِدُ وَالوَالِدَةُ',
      transliteration: 'Al-Walid wal-Walidah',
      english: 'Father and mother',
      options: ['Brother and sister', 'Father and mother', 'Uncle and aunt', 'Son and daughter'],
    },
    {
      id: 'u2-3',
      arabic: 'الأَخُ وَالأُخْتُ',
      transliteration: 'Al-Akhu wal-Ukht',
      english: 'Brother and sister',
      options: ['Grandfather and grandmother', 'Brother and sister', 'Cousins', 'Parents'],
    },
  ],
  'b1-u3': [
    {
      id: 'u3-1',
      arabic: 'البَيْتُ',
      transliteration: 'Al-Bayt',
      english: 'The house / home',
      options: ['The house / home', 'The kitchen', 'The garden', 'The street'],
    },
    {
      id: 'u3-2',
      arabic: 'غُرْفَةُ الجُلُوسِ',
      transliteration: 'Ghurfat al-Julus',
      english: 'Living room',
      options: ['Bedroom', 'Living room', 'Dining hall', 'Balcony'],
    },
    {
      id: 'u3-3',
      arabic: 'المَطْبَخُ',
      transliteration: 'Al-Matbakh',
      english: 'The kitchen',
      options: ['The door', 'The bathroom', 'The kitchen', 'The roof'],
    },
    {
      id: 'u3-4',
      arabic: 'النَّافِذَةُ',
      transliteration: 'An-Nafidhah',
      english: 'The window',
      options: ['The carpet', 'The key', 'The window', 'The lamp'],
    },
  ],
  'b1-u4': [
    {
      id: 'u4-1',
      arabic: 'أَسْتَيْقِظُ مُبَكِّرًا',
      transliteration: 'Astayqizu mubakkiran',
      english: 'I wake up early',
      options: ['I wake up early', 'I go to sleep', 'I eat breakfast', 'I read a book'],
    },
    {
      id: 'u4-2',
      arabic: 'الفُطُورُ',
      transliteration: 'Al-Futur',
      english: 'Breakfast',
      options: ['Dinner', 'Breakfast', 'Lunch', 'Tea'],
    },
    {
      id: 'u4-3',
      arabic: 'أَذْهَبُ إِلَى العَمَلِ',
      transliteration: 'Adhhabu ila al-amal',
      english: 'I go to work',
      options: ['I return home', 'I go to work', 'I watch the news', 'I study Arabic'],
    },
  ],
  'b1-u5': [
    {
      id: 'u5-1',
      arabic: 'الطَّعَامُ وَالشَّرَابُ',
      transliteration: 'At-Ta‘am wash-Sharab',
      english: 'Food and drink',
      options: ['Food and drink', 'Bread and water', 'Fruit and milk', 'Plate and cup'],
    },
    {
      id: 'u5-2',
      arabic: 'مَاءٌ بَارِدٌ',
      transliteration: 'Ma’un barid',
      english: 'Cold water',
      options: ['Hot tea', 'Cold water', 'Fresh juice', 'Warm milk'],
    },
    {
      id: 'u5-3',
      arabic: 'قَائِمَةُ الطَّعَامِ',
      transliteration: 'Qa’imat at-Ta‘am',
      english: 'The menu',
      options: ['The bill', 'The table', 'The menu', 'The waiter'],
    },
  ],
  'b1-u6': [
    {
      id: 'u6-1',
      arabic: 'الصَّلَاةُ',
      transliteration: 'As-Salah',
      english: 'The prayer',
      options: ['The prayer', 'The fasting', 'The charity', 'The mosque'],
    },
    {
      id: 'u6-2',
      arabic: 'الأَذَانُ',
      transliteration: 'Al-Adhan',
      english: 'Call to prayer',
      options: ['Friday sermon', 'Call to prayer', 'Ablution', 'Prayer mat'],
    },
    {
      id: 'u6-3',
      arabic: 'الوُضُوءُ',
      transliteration: 'Al-Wudu',
      english: 'Ablution',
      options: ['Ablution', 'Dawn prayer', 'Sunset', 'Congregation'],
    },
  ],
  'b2-u1': [
    {
      id: 'b2u1-1',
      arabic: 'العِنَايَةُ بِالصِّحَّةِ',
      transliteration: 'Al-‘Inayah bis-Sihhah',
      english: 'Healthcare',
      options: ['Healthcare', 'Medicine', 'Hospital', 'Exercise'],
    },
    {
      id: 'b2u1-2',
      arabic: 'الغِذَاءُ الصِّحِّيُّ',
      transliteration: 'Al-Ghidha’ as-Sihhi',
      english: 'Healthy nutrition',
      options: ['Fast food', 'Healthy nutrition', 'Physical rest', 'Daily checkup'],
    },
    {
      id: 'b2u1-3',
      arabic: 'المُسْتَشْفَى',
      transliteration: 'Al-Mustashfa',
      english: 'The hospital',
      options: ['The pharmacy', 'The clinic', 'The hospital', 'The ambulance'],
    },
  ],
};

export function getQuizForUnit(unit: CurriculumUnit): VocabItem[] {
  if (UNIT_VOCAB_QUIZ[unit.id]) {
    return UNIT_VOCAB_QUIZ[unit.id];
  }
  return [
    {
      id: `${unit.id}-title`,
      arabic: unit.arabicTitle,
      transliteration: `Unit ${unit.unitNumber} Theme`,
      english: unit.title,
      options: [
        unit.title,
        'Daily Introductions',
        'Morning Routine',
        'Marketplace Goods',
      ],
    },
    {
      id: `${unit.id}-vocab`,
      arabic: 'المُفْرَدَاتُ الجَدِيدَةُ',
      transliteration: 'Al-Mufradat al-Jadidah',
      english: 'New vocabulary',
      options: [
        'New vocabulary',
        'Grammar rules',
        'Written exam',
        'Listening audio',
      ],
    },
    {
      id: `${unit.id}-practice`,
      arabic: 'تَدْرِيبُ المُحَادَثَةِ',
      transliteration: 'Tadrib al-Muhadathah',
      english: 'Conversation practice',
      options: [
        'Reading comprehension',
        'Conversation practice',
        'Homework assignment',
        'Unit summary',
      ],
    },
  ];
}

export function formatSecondsToClock(totalSeconds: number): string {
  const mins = Math.floor(Math.max(0, totalSeconds) / 60);
  const secs = Math.max(0, totalSeconds) % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const REAL_BUBBLE_UNITS: CurriculumUnit[] = INITIAL_UNITS.map((u) => {
  if (u.id === 'b1-u1') {
    return { ...u, status: 'passed', speakingScore: 42, vocabCorrect: 0, lastPracticed: '15 Nov' };
  }
  if (u.id === 'b1-u2') {
    return { ...u, status: 'not_started', speakingScore: null, vocabCorrect: 18 };
  }
  if (u.id === 'b1-u3') {
    return { ...u, status: 'needs_review', speakingScore: 15, vocabCorrect: 0, lastPracticed: '17 Nov' };
  }
  if (u.id === 'b1-u5') {
    return { ...u, status: 'not_started', speakingScore: null, vocabCorrect: 7 };
  }
  return { ...u, status: 'not_started', speakingScore: null, vocabCorrect: 0 };
});
