import React, { useState, useRef, useEffect } from 'react';
import { InterviewSession } from './services/geminiService.ts';
import { Message, ConnectionStatus, UserStats, User } from './types.ts';
import { Waveform } from './components/Waveform.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { QuestionPopup } from './components/QuestionPopup.tsx';
import { auth } from './services/firebase.ts';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const FREE_TRIAL_LIMIT_MS = 5 * 60 * 1000; 

export interface RoleConfig {
  id: string;
  name: string;
  myanmarName: string;
  icon: string;
  color: string;
  badgeColor: string;
  description: string;
  keySkills: string[];
  sampleQuestions: string[];
}

export const TARGET_ROLES: RoleConfig[] = [
  {
    id: 'hr',
    name: 'HR (Human Resources)',
    myanmarName: 'လူ့စွမ်းအားအရင်းအမြစ်',
    icon: '👥',
    color: 'hover:border-rose-300 hover:bg-rose-50/50',
    badgeColor: 'bg-rose-100 text-rose-800',
    description: 'ဝန်ထမ်းခေါ်ယူခြင်း၊ အလုပ်သမားဥပဒေ၊ ဝန်ထမ်းရေးရာ စီမံခန့်ခွဲမှု',
    keySkills: ['Recruitment', 'Labor Law', 'Payroll', 'Performance Evaluation'],
    sampleQuestions: [
      'HR အနေဖြင့် ဝန်ထမ်းအသစ်ခေါ်ယူရာတွင် (Recruitment) အဓိကကြည့်ရှုသည့် အရည်အချင်းများက ဘာတွေလဲ?',
      'ဝန်ထမ်းအချင်းချင်း သို့မဟုတ် မန်နေဂျာနှင့် ပဋိပက္ခဖြစ်ပါက (Conflict Resolution) မည်သို့ ဖြေရှင်းမည်နည်း?',
      'မြန်မာနိုင်ငံ၏ အလုပ်သမားဥပဒေများနှင့်အညီ HR Policy များ ချမှတ်ကျင့်သုံးခဲ့ဖူးသည့် အတွေ့အကြုံကို ပြောပြပါ။',
    ]
  },
  {
    id: 'admin',
    name: 'Admin (Administration)',
    myanmarName: 'ရုံးစီမံခန့်ခွဲရေး',
    icon: '📁',
    color: 'hover:border-amber-300 hover:bg-amber-50/50',
    badgeColor: 'bg-amber-100 text-amber-800',
    description: 'ရုံးသုံးပစ္စည်း၊ စာရွက်စာတမ်း၊ ရုံးတွင်း Facility နှင့် စီမံခန့်ခွဲရေး',
    keySkills: ['Office Management', 'Documentation', 'Vendor Coordination', 'Inventory'],
    sampleQuestions: [
      'ရုံးသုံးပစ္စည်းများ (Office Supplies/Inventory) စနစ်တကျ မပျောက်ပျက်စေရန် မည်သို့ စီမံခန့်ခွဲပါသလဲ?',
      'တစ်ပြိုင်နက်တည်း လုပ်ဆောင်ရမည့် Tasks များပြားလာပါက Prioritization ကို မည်သို့ သတ်မှတ်ပါသလဲ?',
      'Vendor များ၊ ဝန်ဆောင်မှုပေးသူများနှင့် ဆက်သွယ်ဆောင်ရွက်ရာတွင် ကုန်ကျစရိတ် ချွေတာခဲ့ဖူးသည့် အတွေ့အကြုံ။',
    ]
  },
  {
    id: 'sales',
    name: 'Sales (Sales Executive)',
    myanmarName: 'အရောင်းဌာန',
    icon: '🎯',
    color: 'hover:border-emerald-300 hover:bg-emerald-50/50',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    description: 'အရောင်းပစ်မှတ်၊ ဖောက်သည်ရှာဖွေခြင်း၊ ဆွေးနွေးညှိနှိုင်းခြင်း',
    keySkills: ['Lead Generation', 'Closing Deals', 'Negotiation', 'Client Relationship'],
    sampleQuestions: [
      'သတ်မှတ်ထားသော Sales Target ကို ပြည့်မီအောင် မည်သို့ အစီအစဉ်ဆွဲပြီး အရောင်းမြှင့်တင်ခဲ့သလဲ?',
      'ဝယ်ယူသူက ဈေးကြီးသည်ဟု ငြင်းဆန်သည့်အခါ (Handling Objections) မည်သို့ ဆွဲဆောင်ရှင်းပြသလဲ?',
      'ဖောက်သည်အသစ်များ (Cold Calling / Field Visit) ရှာဖွေရာတွင် သင့်ရဲ့ ထိရောက်သော နည်းဗျူဟာက ဘာလဲ?',
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing (Digital Marketing)',
    myanmarName: 'စျေးကွက်မြှင့်တင်ရေး',
    icon: '📣',
    color: 'hover:border-blue-300 hover:bg-blue-50/50',
    badgeColor: 'bg-blue-100 text-blue-800',
    description: 'Social Media၊ Campaign၊ Branding နှင့် Content Strategy',
    keySkills: ['Social Media', 'Content Creation', 'SEO/Ads', 'Analytics'],
    sampleQuestions: [
      'Facebook / TikTok / LinkedIn တွင် အောင်မြင်အောင် လုပ်ဆောင်ခဲ့ဖူးသော Marketing Campaign ကို မျှဝေပါ။',
      'Marketing ROI နှင့် Conversion Rate များကို မည်သည့် Tools များဖြင့် တိုင်းတာသုံးသပ်သလဲ?',
      'Brand Awareness တိုးတက်စေရန်နှင့် Engagement ကောင်းမွန်စေရန် သင့်ရဲ့ Content Strategy က ဘာလဲ?',
    ]
  },
  {
    id: 'accounting',
    name: 'Accountant (Finance & Accounts)',
    myanmarName: 'စာရင်းကိုင်နှင့် ဘဏ္ဍာရေး',
    icon: '📊',
    color: 'hover:border-indigo-300 hover:bg-indigo-50/50',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    description: 'စာရင်းစစ်ဆေးခြင်း၊ Month-end Closing၊ Tax နှင့် ငွေကြေးစီမံမှု',
    keySkills: ['Financial Reporting', 'QuickBooks/Excel', 'Taxation', 'Auditing'],
    sampleQuestions: [
      'Month-end Closing နှင့် Balance Sheet ရေးဆွဲရာတွင် အသုံးပြုဖူးသော စာရင်းကိုင် Software များကို ပြောပြပါ။',
      'အခွန် (Tax compliance) နှင့် ဘဏ်စာရင်းတိုက်ဆိုင်စစ်ဆေးခြင်း (Bank Reconciliation) အတွေ့အကြုံ။',
      'စာရင်းဇယားများတွင် ကိန်းဂဏန်းအမှားအယွင်းမရှိစေရန် မည်သို့ စစ်ဆေးကြပ်မတ်လေ့ရှိသလဲ?',
    ]
  },
  {
    id: 'customer_service',
    name: 'Customer Service (Support / Care)',
    myanmarName: 'ဖောက်သည်ဝန်ဆောင်မှု',
    icon: '🎧',
    color: 'hover:border-cyan-300 hover:bg-cyan-50/50',
    badgeColor: 'bg-cyan-100 text-cyan-800',
    description: 'ဖောက်သည်စိတ်ကျေနပ်မှု၊ ပြဿနာဖြေရှင်းခြင်း၊ Complaint Handling',
    keySkills: ['Empathy', 'Communication', 'Conflict Resolution', 'CRM'],
    sampleQuestions: [
      'ဒေါသထွက်နေသော သို့မဟုတ် မကျေနပ်သော ဖောက်သည်တစ်ဦးကို မည်သို့ စိတ်အေးစေပြီး ပြဿနာဖြေရှင်းပေးခဲ့သလဲ?',
      'ဖုန်း သို့မဟုတ် Chat ဖြင့် ဝန်ဆောင်မှုပေးရာတွင် ပထမဆုံးအကြိမ်တွင်ပင် ပြဿနာပြီးပြတ်အောင် (FCR) မည်သို့ဆောင်ရွက်သလဲ?',
      'သင့်အတွက် ခက်ခဲခဲ့သော Customer Case တစ်ခုနှင့် ၎င်းမှ ရရှိခဲ့သည့် အတွေ့အကြုံကို ပြောပြပါ။',
    ]
  },
  {
    id: 'it_support',
    name: 'IT Support (Hardware & Network)',
    myanmarName: 'အိုင်တီ ပံ့ပိုးမှုနှင့် ကွန်ရက်',
    icon: '💻',
    color: 'hover:border-violet-300 hover:bg-violet-50/50',
    badgeColor: 'bg-violet-100 text-violet-800',
    description: 'Hardware/Software ပြင်ဆင်မှု၊ Network နှင့် User Support',
    keySkills: ['Troubleshooting', 'LAN/WAN', 'OS Setup', 'Data Security'],
    sampleQuestions: [
      'ရုံးတွင်း အင်တာနက်လိုင်းကျခြင်း သို့မဟုတ် Printer/PC ချိတ်ဆက်မရခြင်းများကို မည်သို့ အဆင့်ဆင့် ရှာဖွေစစ်ဆေးသလဲ?',
      'ရုံးတွင်း Data Security နှင့် Backup System များ မည်သို့ အခါအားလျော်စွာ ထိန်းသိမ်းစောင့်ရှောက်သလဲ?',
      'IT အသိပညာနည်းပါးသော User များအား ပြဿနာဖြေရှင်းနည်း လမ်းညွှန်ပေးခဲ့သည့် အတွေ့အကြုံ။',
    ]
  },
  {
    id: 'software_dev',
    name: 'Software Engineer (Developer)',
    myanmarName: 'ဆော့ဖ်ဝဲလ် အင်ဂျင်နီယာ',
    icon: '⚡',
    color: 'hover:border-purple-300 hover:bg-purple-50/50',
    badgeColor: 'bg-purple-100 text-purple-800',
    description: 'Web/Mobile App ရေးသားခြင်း၊ APIs၊ Database နှင့် Clean Code',
    keySkills: ['Frontend/Backend', 'Databases', 'Git Workflow', 'System Design'],
    sampleQuestions: [
      'သင်အသုံးပြုနေသော Tech Stack (React, Node, Python, etc.) နှင့် အခက်ခဲဆုံး ဖြေရှင်းခဲ့ရသော Bug အကြောင်း မျှဝေပါ။',
      'Database Performance optimization သို့မဟုတ် Code Refactoring လုပ်ဆောင်ခဲ့ဖူးသည့် အတွေ့အကြုံ။',
      'Agile/Scrum အဖွဲ့အစည်းအတွင်း Code Review နှင့် ပူးပေါင်းဆောင်ရွက်မှုကို မည်သို့ လုပ်ဆောင်သလဲ?',
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics (Warehouse & Supply)',
    myanmarName: 'ထောက်ပံ့ပို့ဆောင်ရေးနှင့် သိုလှောင်ရုံ',
    icon: '🚚',
    color: 'hover:border-orange-300 hover:bg-orange-50/50',
    badgeColor: 'bg-orange-100 text-orange-800',
    description: 'ကုန်ပစ္စည်းသိုလှောင်မှု၊ ပို့ဆောင်မှုစီမံခြင်း၊ Stock Control',
    keySkills: ['Warehouse Management', 'Delivery Scheduling', 'FIFO/LIFO', 'Supply Chain'],
    sampleQuestions: [
      'ကုန်ပစ္စည်း သိုလှောင်ရုံ (Warehouse) တွင် စာရင်းနှင့် လက်ကျန်ပစ္စည်း ကိုက်ညီမှုရှိစေရန် မည်သို့ စစ်ဆေးသလဲ?',
      'ပို့ဆောင်မှုနောက်ကျခြင်း သို့မဟုတ် ပို့ဆောင်နေစဉ် ပစ္စည်းထိခိုက်ပျက်စီးမှု ဖြစ်ပေါ်ပါက မည်သို့ ဖြေရှင်းပါသလဲ?',
      'သယ်ယူပို့ဆောင်ရေးစရိတ် (Logistics Cost) ချွေတာရန် လမ်းကြောင်းစီစဉ်မှုများကို မည်သို့ စီစဉ်ခဲ့သလဲ?',
    ]
  },
  {
    id: 'receptionist',
    name: 'Receptionist (Front Desk)',
    myanmarName: 'ဧည့်ကြိုနှင့် ရုံးအကူ',
    icon: '🛎️',
    color: 'hover:border-pink-300 hover:bg-pink-50/50',
    badgeColor: 'bg-pink-100 text-pink-800',
    description: 'ဧည့်သည်ကြိုဆိုမှု၊ ဖုန်းခေါ်ဆိုမှု စီမံခြင်း၊ Meeting Room ကြိုတင်ပြင်ဆင်မှု',
    keySkills: ['Professional Demeanor', 'Phone Etiquette', 'Visitor Handling', 'Scheduling'],
    sampleQuestions: [
      'ရုံးသို့ ရောက်ရှိလာသော အရေးကြီးဧည့်သည်တော်များကို ယဉ်ကျေးပျူငှာစွာ မည်သို့ ကြိုဆိုဧည့်ခံသလဲ?',
      'အရေးပေါ်ဧည့်သည် ရုတ်တရက်ရောက်လာချိန် သက်ဆိုင်ရာ မန်နေဂျာနှင့် ချိတ်ဆက်မရပါက မည်သို့ ဆောင်ရွက်မည်နည်း?',
      'ဖုန်းဆက်သွယ်မှုများ၊ စာပို့/ပါဆယ်ပို့ စာရင်းများကို စနစ်တကျ မည်သို့ မှတ်တမ်းတင်ထားသလဲ?',
    ]
  },
  {
    id: 'graphic_design',
    name: 'Graphic Designer (Creative)',
    myanmarName: 'ဒီဇိုင်းနှင့် မီဒီယာဖန်တီးမှု',
    icon: '🎨',
    color: 'hover:border-fuchsia-300 hover:bg-fuchsia-50/50',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-800',
    description: 'Visual Identity၊ Banner၊ Social Media Post၊ Figma/Photoshop',
    keySkills: ['Photoshop/Illustrator', 'Figma', 'Typography', 'Creativity'],
    sampleQuestions: [
      'သင့်ရဲ့ Design Process (Brief လက်ခံခြင်းမှ Final Export အထိ) မည်သို့ အဆင့်ဆင့် လုပ်ဆောင်သလဲ?',
      'Client သို့မဟုတ် Manager ၏ မကြာခဏ ပြင်ဆင်ခိုင်းမှု (Design Revisions) များကို စိတ်ရှည်စွာ မည်သို့ ကိုင်တွယ်သလဲ?',
      'Brand Identity တစ်ခု တည်ဆောက်ရာတွင် အရေးကြီးဆုံး ထည့်သွင်းစဉ်းစားသည့် အချက် ၃ ချက်က ဘာတွေလဲ?',
    ]
  },
  {
    id: 'general_hr',
    name: 'General Interview (အထွေထွေ)',
    myanmarName: 'အခြေခံ အင်တာဗျူးမေးခွန်းများ',
    icon: '👔',
    color: 'hover:border-slate-300 hover:bg-slate-50/50',
    badgeColor: 'bg-slate-100 text-slate-800',
    description: 'ကိုယ့်ကိုယ်ကို မိတ်ဆက်ခြင်း၊ အားသာချက်/အားနည်းချက်၊ ရည်မှန်းချက်',
    keySkills: ['Self-Introduction', 'Strengths/Weaknesses', 'Career Goals', 'Behavioral'],
    sampleQuestions: [
      'မင်္ဂလာပါ၊ သင့်အကြောင်း အကျဉ်းချုပ်နှင့် လုပ်ငန်းအတွေ့အကြုံများကို မိတ်ဆက်ပြောပြပေးပါ။',
      'သင့်ရဲ့ အဓိက အားသာချက် (Strengths) နှင့် ပြုပြင်နေဆဲ အားနည်းချက် (Weaknesses) က ဘာတွေလဲ?',
      'နောက် ၃ နှစ် သို့မဟုတ် ၅ နှစ်အတွင်း သင့်ရဲ့ Career Goal က ဘယ်အဆင့်ထိ ရောက်ရှိရန် ရည်မှန်းထားပါသလဲ?',
    ]
  }
];

interface ActiveQuestionState {
  text: string;
  index: number;
  roleName: string;
  roleIcon: string;
}

const App: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.IDLE);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('hr');
  const [showStarGuide, setShowStarGuide] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Question Popup State
  const [currentQuestion, setCurrentQuestion] = useState<ActiveQuestionState | null>(null);
  const [questionPopupKey, setQuestionPopupKey] = useState<number>(0);
  const [candidateLiveAnswer, setCandidateLiveAnswer] = useState<string>('');
  
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('thandar_user_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, currentUser: null };
      } catch (e) {
        console.error("Failed to parse user stats", e);
      }
    }
    return {
      accumulatedTimeMs: 0,
      isPaid: false,
      registrationDate: new Date().toISOString(),
      currentUser: null
    };
  });

  const sessionRef = useRef<InterviewSession | null>(null);
  const timerRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Turn accumulation refs to prevent fragmented message bubbles
  const currentUserTurnRef = useRef<string>('');
  const currentAssistantTurnRef = useRef<string>('');
  const questionIndexRef = useRef<number>(1);

  const selectedRole = TARGET_ROLES.find(r => r.id === selectedRoleId) || TARGET_ROLES[0];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setStats(prev => ({
          ...prev,
          currentUser: {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Candidate',
            isPaid: prev.isPaid
          }
        }));
      } else {
        setStats(prev => ({ ...prev, currentUser: null }));
      }
      setIsAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const { currentUser, ...rest } = stats;
    localStorage.setItem('thandar_user_stats', JSON.stringify(rest));
    
    if (!stats.isPaid && stats.accumulatedTimeMs >= FREE_TRIAL_LIMIT_MS) {
      if (status === ConnectionStatus.ACTIVE) {
        handleStop();
      }
    }
  }, [stats, status]);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (messages.length > 0) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Initial greeting question generator based on selected role
  const getOpeningQuestionForRole = (role: RoleConfig) => {
    return `မင်္ဂလာပါရှင်၊ ကျွန်မနာမည် သန္တာပါ။ ${role.name} (${role.myanmarName}) အလုပ်အကိုင်အတွက် အင်တာဗျူး စတင်ပါမယ်။ ပထမဆုံးအနေဖြင့် သင့်အကြောင်း အကျဉ်းချုပ်နှင့် ${role.myanmarName} ဆိုင်ရာ အတွေ့အကြုံများကို မိတ်ဆက်ပြောပြပေးပါရှင်။`;
  };

  const handleStart = async (customInitialQuestion?: string) => {
    if (status !== ConnectionStatus.IDLE) return;
    if (!stats.currentUser) return;
    setErrorMessage(null);

    if (!stats.isPaid && stats.accumulatedTimeMs >= FREE_TRIAL_LIMIT_MS) {
      setErrorMessage("အခမဲ့ စမ်းသပ်ချိန် ကုန်ဆုံးသွားပါပြီ။ ကျေးဇူးပြု၍ အကောင့်အဆင့်မြှင့်တင်ပေးပါ။");
      return;
    }

    const initialQ = customInitialQuestion || getOpeningQuestionForRole(selectedRole);

    // Initialize Question Popup immediately with word-by-word reveal
    questionIndexRef.current = 1;
    currentUserTurnRef.current = '';
    currentAssistantTurnRef.current = '';
    setCandidateLiveAnswer('');
    
    setCurrentQuestion({
      text: initialQ,
      index: 1,
      roleName: selectedRole.name,
      roleIcon: selectedRole.icon,
    });
    setQuestionPopupKey(k => k + 1);

    try {
      setStatus(ConnectionStatus.CONNECTING);
      sessionRef.current = new InterviewSession();
      
      const rolePromptName = `${selectedRole.name} (${selectedRole.myanmarName})`;

      await sessionRef.current.start(
        {
          onTranscription: (text, isUser) => {
            if (isUser) {
              currentUserTurnRef.current += text;
              setCandidateLiveAnswer(currentUserTurnRef.current);

              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last && last.role === 'user') {
                  return [...prev.slice(0, -1), { role: 'user', text: currentUserTurnRef.current }];
                } else {
                  return [...prev, { role: 'user', text: currentUserTurnRef.current }];
                }
              });
            } else {
              currentAssistantTurnRef.current += text;

              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last && last.role === 'assistant') {
                  return [...prev.slice(0, -1), { role: 'assistant', text: currentAssistantTurnRef.current }];
                } else {
                  return [...prev, { role: 'assistant', text: currentAssistantTurnRef.current }];
                }
              });

              // As assistant responds with substantial question/statement, update popup
              const cleanSpeech = currentAssistantTurnRef.current.trim();
              if (cleanSpeech.length > 12) {
                setCurrentQuestion({
                  text: cleanSpeech,
                  index: questionIndexRef.current,
                  roleName: selectedRole.name,
                  roleIcon: selectedRole.icon,
                });
              }
            }
          },
          onTurnComplete: () => {
            if (currentUserTurnRef.current) {
              currentUserTurnRef.current = '';
            }
            if (currentAssistantTurnRef.current) {
              questionIndexRef.current += 1;
              currentAssistantTurnRef.current = '';
              setCandidateLiveAnswer('');
            }
          },
          onError: (err) => {
            console.error("Session Error:", err);
            setStatus(ConnectionStatus.ERROR);
            setErrorMessage(err?.message || "မိုက်ခရိုဖုန်း သို့မဟုတ် အသံချိတ်ဆက်မှု အမှားအယွင်း ရှိနေပါသည်။");
            handleStop();
          },
          onClose: () => {
            setStatus(ConnectionStatus.IDLE);
            handleStop();
          },
          onSpeaking: (speaking) => {
            setIsSpeaking(speaking);
            if (!speaking) {
              // Coach finished asking question -> candidate can answer
            }
          }
        },
        rolePromptName
      );

      setStatus(ConnectionStatus.ACTIVE);
      lastTickRef.current = Date.now();
      
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;
        
        setStats(prev => ({
          ...prev,
          accumulatedTimeMs: prev.accumulatedTimeMs + delta
        }));
      }, 1000);

    } catch (err: any) {
      console.error("Failed to start session:", err);
      setStatus(ConnectionStatus.ERROR);
      if (err?.name === 'NotAllowedError') {
        setErrorMessage("မိုက်ခရိုဖုန်း အသုံးပြုခွင့်ကို Browser တွင် Allow ပြုလုပ်ပေးပါ။");
      } else {
        setErrorMessage(err?.message || "ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။ API Key သို့မဟုတ် အင်တာနက်ကို စစ်ဆေးပေးပါ။");
      }
      handleStop();
    }
  };

  const handleStop = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.stop();
      sessionRef.current = null;
    }
    setStatus(ConnectionStatus.IDLE);
    setIsSpeaking(false);
  };

  const handleRepeatQuestion = () => {
    setQuestionPopupKey(k => k + 1);
  };

  const handlePracticeQuestion = (question: string) => {
    setCurrentQuestion({
      text: question,
      index: 1,
      roleName: selectedRole.name,
      roleIcon: selectedRole.icon,
    });
    setQuestionPopupKey(k => k + 1);

    if (status === ConnectionStatus.IDLE) {
      handleStart(question);
    }
  };

  const handleAuthComplete = (user: User) => {
    setStats(prev => ({ 
      ...prev, 
      currentUser: user,
      isPaid: user.isPaid
    }));
  };

  const handleLogout = async () => {
    handleStop();
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
    setStats(prev => ({ ...prev, currentUser: null }));
  };

  const remainingMs = Math.max(0, FREE_TRIAL_LIMIT_MS - stats.accumulatedTimeMs);
  const remainingMinutes = Math.floor(remainingMs / 60000);
  const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);
  const trialProgress = Math.min(100, (stats.accumulatedTimeMs / FREE_TRIAL_LIMIT_MS) * 100);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-teal-500/20 border-t-teal-600 rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">စနစ်စစ်ဆေးနေပါသည်...</p>
        </div>
      </div>
    );
  }

  if (!stats.currentUser) {
    return (
      <AuthModal 
        isGated
        initialMode="login"
        onAuthComplete={handleAuthComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 flex flex-col">
      {/* Responsive Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-slate-200/70 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3.5">
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-2xl shadow-md shadow-teal-500/20 shrink-0">
            👸
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-black tracking-tight leading-none text-slate-900 truncate">
              THANDAR
            </h1>
            <p className="text-[9px] sm:text-[10px] font-bold text-teal-600 uppercase tracking-wider mt-0.5 sm:mt-1 truncate">
              Myanmar AI Career Coach
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Responsive Trial Indicator */}
          {!stats.isPaid && (
            <div className="flex items-center gap-2 bg-slate-100/90 py-1 px-2.5 rounded-xl border border-slate-200/60">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shrink-0" />
              <div className="text-[10px] sm:text-xs font-bold text-slate-600 whitespace-nowrap">
                <span className="hidden xs:inline">လက်ကျန် </span>
                <span>{remainingMinutes}:{remainingSeconds.toString().padStart(2, '0')}</span>
              </div>
              <div className="w-12 sm:w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                <div 
                  className="h-full bg-teal-500 transition-all duration-300"
                  style={{ width: `${100 - trialProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* User Profile Badge & Logout */}
          <div className="flex items-center gap-1.5">
            <span className="hidden md:inline-block text-xs font-bold text-slate-600 max-w-[120px] truncate">
              {stats.currentUser.name}
            </span>
            <button 
              onClick={handleLogout}
              className="px-2.5 sm:px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors"
              title="Logout"
            >
              ထွက်မည်
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Layout */}
      <main className="flex-1 pt-18 sm:pt-22 pb-12 px-3 sm:px-6 max-w-4xl w-full mx-auto flex flex-col">
        
        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-base shrink-0">⚠️</span>
              <span>{errorMessage}</span>
            </div>
            <button 
              onClick={() => setErrorMessage(null)}
              className="text-rose-500 hover:text-rose-800 text-xs font-bold shrink-0 p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Word-by-Word Question Popup (Visible when session starts or question is active) */}
        {currentQuestion && (status === ConnectionStatus.ACTIVE || status === ConnectionStatus.CONNECTING) && (
          <QuestionPopup
            key={`question-${questionPopupKey}-${currentQuestion.index}`}
            questionText={currentQuestion.text}
            roleName={currentQuestion.roleName}
            roleIcon={currentQuestion.roleIcon}
            questionIndex={currentQuestion.index}
            isCoachSpeaking={isSpeaking}
            candidateLiveAnswer={candidateLiveAnswer}
            onRepeatQuestion={handleRepeatQuestion}
          />
        )}

        {/* Coach Live Studio Hero Card */}
        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80 p-4 sm:p-6 mb-4 relative overflow-hidden">
          
          {/* Top Status Bar & STAR Guide Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                status === ConnectionStatus.ACTIVE 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : status === ConnectionStatus.CONNECTING 
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  status === ConnectionStatus.ACTIVE 
                    ? (isSpeaking ? 'bg-emerald-500 animate-ping' : 'bg-emerald-500') 
                    : status === ConnectionStatus.CONNECTING 
                    ? 'bg-amber-500 animate-spin' 
                    : 'bg-slate-400'
                }`} />
                {status === ConnectionStatus.ACTIVE 
                  ? (isSpeaking ? 'သန္တာ မေးခွန်းမေးနေပါသည်...' : 'နားထောင်နေပါသည် (Listening)...')
                  : status === ConnectionStatus.CONNECTING 
                  ? 'ချိတ်ဆက်နေပါသည်...' 
                  : 'အဆင်သင့်ဖြစ်ပါပြီ (Ready)'}
              </span>

              {/* Current Role Indicator Pill */}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200/70">
                <span>{selectedRole.icon}</span>
                <span className="hidden xs:inline">{selectedRole.name.split(' ')[0]}</span>
              </span>
            </div>

            <button 
              type="button"
              onClick={() => setShowStarGuide(!showStarGuide)}
              className="text-[11px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/70 transition-colors flex items-center gap-1"
            >
              <span>💡 STAR Method လမ်းညွှန်</span>
              <span>{showStarGuide ? '▲' : '▼'}</span>
            </button>
          </div>

          {/* STAR Method Helper Accordion */}
          {showStarGuide && (
            <div className="mb-4 p-3.5 bg-teal-50/70 border border-teal-200/80 rounded-xl text-xs text-slate-700 animate-in fade-in duration-200">
              <p className="font-bold text-teal-900 mb-2">⭐ STAR Method ဖြင့် အင်တာဗျူး အမေးအဖြေ ဖွဲ့စည်းပုံ</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white/80 p-2.5 rounded-lg border border-teal-100">
                  <span className="font-bold text-teal-700">S (Situation)</span>: သင်ကြုံတွေ့ခဲ့ရသည့် အခြေအနေ သို့မဟုတ် ပြဿနာကို တိုတိုရှင်းရှင်း မိတ်ဆက်ပါ။
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-teal-100">
                  <span className="font-bold text-teal-700">T (Task)</span>: သင့်တွင် တာဝန်ယူဖြေရှင်းရမည့် ရည်မှန်းချက် သို့မဟုတ် တာဝန်ကို ရှင်းပြပါ။
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-teal-100">
                  <span className="font-bold text-teal-700">A (Action)</span>: ပြဿနာကို မည်သို့လက်တွေ့ နည်းလမ်းကျကျ ဖြေရှင်းခဲ့ကြောင်း ပြောပြပါ။
                </div>
                <div className="bg-white/80 p-2.5 rounded-lg border border-teal-100">
                  <span className="font-bold text-teal-700">R (Result)</span>: ထွက်ပေါ်လာသော အောင်မြင်သည့် ရလဒ်များနှင့် သင်ခန်းစာများကို ဖော်ပြပါ။
                </div>
              </div>
            </div>
          )}

          {/* Audio Waveform Display */}
          <div className="py-1">
            <Waveform isActive={status === ConnectionStatus.ACTIVE && isSpeaking} />
          </div>

          {/* Coach Status Prompt */}
          <div className="text-center my-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              {status === ConnectionStatus.ACTIVE 
                ? `${selectedRole.name} အင်တာဗျူး လေ့ကျင့်နေပါသည်` 
                : `${selectedRole.name} အတွက် သန္တာနှင့် အင်တာဗျူးလေ့ကျင့်ပါ`}
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
              {status === ConnectionStatus.ACTIVE 
                ? 'မေးခွန်းကို စကားလုံးတစ်လုံးချင်း အပေါ်တွင် ကြည့်ရှုနားထောင်ပြီး သင့်အလှည့်ရောက်ပါက မိုက်ခရိုဖုန်းဖြင့် စတင်ဖြေဆိုပါ။' 
                : 'အောက်တွင် လျှောက်ထားလိုသည့် အလုပ်အကိုင်ခလုတ်ကို ရွေးချယ်ပြီး START INTERVIEW ခလုတ်ကို နှိပ်ပါ။'}
            </p>
          </div>

          {/* Start/Stop Main CTA */}
          <div className="flex justify-center mt-3 sm:mt-4">
            <button 
              type="button"
              onClick={status === ConnectionStatus.ACTIVE ? handleStop : () => handleStart()}
              disabled={status === ConnectionStatus.CONNECTING}
              className={`w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm text-white transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2.5 ${
                status === ConnectionStatus.ACTIVE 
                  ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20' 
                  : status === ConnectionStatus.CONNECTING 
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/20'
              }`}
            >
              {status === ConnectionStatus.ACTIVE ? (
                <>
                  <span className="w-2.5 h-2.5 bg-white rounded-sm animate-pulse" />
                  <span>အင်တာဗျူး ရပ်တန့်မည် (STOP SESSION) 🛑</span>
                </>
              ) : status === ConnectionStatus.CONNECTING ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>ချိတ်ဆက်နေပါသည်...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span>{selectedRole.name.split(' ')[0]} အင်တာဗျူး စတင်မည် (START) 🚀</span>
                </>
              )}
            </button>
          </div>

        </section>

        {/* Separate Job Role Selector Buttons Section */}
        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/80 p-4 sm:p-6 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <span>💼</span>
                <span>အလုပ်အကိုင် အခန်းကဏ္ဍ ရွေးချယ်ပါ (Target Job Roles)</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                ခလုတ်တစ်ခုစီကို နှိပ်၍ သက်ဆိုင်ရာ ဌာနအလိုက် မေးခွန်းများကို ရွေးချယ်လေ့ကျင့်နိုင်ပါသည်
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
              {TARGET_ROLES.length} Roles Available
            </span>
          </div>

          {/* Grid of Distinct Role Buttons */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2 sm:gap-2.5">
            {TARGET_ROLES.map((role) => {
              const isSelected = selectedRoleId === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    setSelectedRoleId(role.id);
                    if (status === ConnectionStatus.ACTIVE) {
                      setMessages(prev => [
                        ...prev,
                        { role: 'assistant', text: `✨ အင်တာဗျူး အခန်းကဏ္ဍကို "${role.name} (${role.myanmarName})" သို့ ပြောင်းလဲလိုက်ပါသည်။ ဤအခန်းကဏ္ဍဆိုင်ရာ မေးခွန်းများကို မေးမြန်းပါမည်။` }
                      ]);
                    }
                  }}
                  className={`relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left transition-all flex flex-col justify-between group active:scale-[0.98] ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20 shadow-xs'
                      : `border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/70`
                  }`}
                >
                  {/* Top Icon & Checkmark */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl sm:text-2xl">{role.icon}</span>
                    {isSelected ? (
                      <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                        ✓
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-slate-300 shrink-0" />
                    )}
                  </div>

                  {/* Role Title */}
                  <div>
                    <h4 className={`text-xs font-black leading-tight line-clamp-1 ${
                      isSelected ? 'text-teal-950 font-black' : 'text-slate-800'
                    }`}>
                      {role.name.split(' ')[0]}
                    </h4>
                    <p className="text-[10px] font-medium text-slate-500 line-clamp-1 mt-0.5">
                      {role.myanmarName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Selected Role Preview & Core Questions */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/80 rounded-xl p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedRole.icon}</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    {selectedRole.name} - {selectedRole.myanmarName}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {selectedRole.description}
                  </p>
                </div>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-1">
                {selectedRole.keySkills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200/70">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Role Sample Questions */}
            <div className="mt-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <span>🎯</span>
                <span>မေးခွန်းကို နှိပ်၍ တိုက်ရိုက် လေ့ကျင့်ပါ (Click any question to practice):</span>
              </p>
              <div className="space-y-1.5">
                {selectedRole.sampleQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={() => handlePracticeQuestion(q)}
                    className="w-full text-left bg-white hover:bg-teal-50/50 hover:border-teal-300 p-2 sm:p-2.5 rounded-lg border border-slate-200/70 text-xs text-slate-700 font-medium flex items-start gap-2 shadow-2xs transition-all group"
                  >
                    <span className="text-teal-600 font-bold shrink-0 mt-0.5">#{idx + 1}</span>
                    <span className="flex-1 group-hover:text-teal-900">{q}</span>
                    <span className="text-[10px] text-teal-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      လေ့ကျင့်မည် ➡️
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Conversation Transcript Panel */}
        <section className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>💬</span>
              <span>စကားပြောဆိုမှု မှတ်တမ်း (Transcript)</span>
              {messages.length > 0 && (
                <span className="text-[10px] text-slate-400 font-semibold">({messages.length})</span>
              )}
            </h3>

            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setMessages([])}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                ရှင်းလင်းမည် (Clear)
              </button>
            )}
          </div>

          <div className="bg-slate-100/60 rounded-2xl p-3 sm:p-4 min-h-[160px] max-h-[380px] overflow-y-auto custom-scrollbar flex flex-col gap-2.5 border border-slate-200/50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-8 text-center text-slate-400">
                <span className="text-2xl mb-1.5">🎙️</span>
                <p className="text-xs font-semibold text-slate-500">
                  စကားပြောဆိုမှု မရှိသေးပါ
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
                  {selectedRole.name} ကို ရွေးပြီး START ခလုတ်ကို နှိပ်လိုက်သည်နှင့် မေးခွန်း ပေါ်လာပြီး သန္တာနှင့် စတင်စကားပြောနိုင်ပါမည်။
                </p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] font-bold text-slate-400 mb-0.5 px-1">
                    {m.role === 'user' ? '👤 သင် (Candidate)' : '👸 သန္တာ (Coach)'}
                  </span>
                  <div className={`max-w-[88%] sm:max-w-[80%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
                    m.role === 'user' 
                      ? 'bg-teal-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))
            )}
            <div ref={chatBottomRef} />
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;
