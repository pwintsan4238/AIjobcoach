/**
 * Job positions inside each field, each with its own skills and practice
 * questions in Myanmar (my) and English (en). Keys match TARGET_ROLES ids.
 */

export interface PositionQuestion {
  my: string;
  en: string;
}

export interface JobPosition {
  id: string;
  name: string;
  myanmarName: string;
  keySkills: string[];
  questions: PositionQuestion[];
}

export const ROLE_POSITIONS: Record<string, JobPosition[]> = {
  hr: [
    {
      id: 'hr_officer', name: 'HR Officer / Executive', myanmarName: 'HR အရာရှိ',
      keySkills: ['Employee Relations', 'HR Policies', 'Labor Law', 'Onboarding'],
      questions: [
        { my: 'HR Officer တစ်ယောက်၏ နေ့စဉ် အဓိက တာဝန်များကို သင်ဘယ်လို နားလည်ထားပါသလဲ?', en: 'How do you understand the main daily responsibilities of an HR Officer?' },
        { my: 'ဝန်ထမ်းတစ်ယောက်က မန်နေဂျာအကြောင်း တိုင်ကြားလာပါက မည်သို့ ကိုင်တွယ်ဖြေရှင်းမည်နည်း?', en: 'If an employee complains to you about their manager, how would you handle it?' },
        { my: 'ဝန်ထမ်းအသစ်များ Onboarding လုပ်ငန်းစဉ်ကို ပိုမိုကောင်းမွန်အောင် မည်သို့ ပြုလုပ်မည်နည်း?', en: 'How would you improve the onboarding process for new employees?' },
      ],
    },
    {
      id: 'recruiter', name: 'Recruiter / Talent Acquisition', myanmarName: 'ဝန်ထမ်းရှာဖွေခန့်အပ်သူ',
      keySkills: ['Sourcing', 'Screening', 'Interviewing', 'Employer Branding'],
      questions: [
        { my: 'ရှာရခက်သော ရာထူးတစ်ခုအတွက် သင့်တော်သည့် ကိုယ်စားလှယ်လောင်းကို မည်သည့်နည်းလမ်းများဖြင့် ရှာဖွေမည်နည်း?', en: 'How would you find a suitable candidate for a hard-to-fill position?' },
        { my: 'CV များကို Screening လုပ်ရာတွင် အဓိက ဘာတွေကို ကြည့်ပါသလဲ?', en: 'What do you mainly look for when screening CVs?' },
        { my: 'ရွေးချယ်ထားသော ကိုယ်စားလှယ်လောင်းက နောက်ဆုံးမှ Job Offer ကို ငြင်းပယ်ပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'What would you do if your chosen candidate rejects the job offer at the last minute?' },
      ],
    },
    {
      id: 'payroll', name: 'Payroll & Compensation Officer', myanmarName: 'လစာနှင့် ခံစားခွင့်ဆိုင်ရာ အရာရှိ',
      keySkills: ['Payroll Processing', 'SSB', 'Income Tax', 'Excel'],
      questions: [
        { my: 'လစာတွက်ချက်ရာတွင် အမှားမဖြစ်စေရန် မည်သို့ စစ်ဆေးပါသလဲ?', en: 'How do you check payroll to make sure there are no mistakes?' },
        { my: 'လူမှုဖူလုံရေး (SSB) နှင့် ဝင်ငွေခွန် နှုတ်ယူခြင်းဆိုင်ရာ အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about your experience with Social Security (SSB) contributions and income tax deductions.' },
        { my: 'ဝန်ထမ်းတစ်ယောက်က သူ့လစာ မှားနေသည်ဟု စိတ်ဆိုးပြီး လာပြောပါက မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'An employee angrily tells you their salary is wrong. How would you handle it?' },
      ],
    },
    {
      id: 'training', name: 'Training & Development Officer', myanmarName: 'သင်တန်းနှင့် ဖွံ့ဖြိုးရေး အရာရှိ',
      keySkills: ['Training Needs Analysis', 'Facilitation', 'Career Development', 'Evaluation'],
      questions: [
        { my: 'ဝန်ထမ်းများ ဘယ်သင်တန်း လိုအပ်သည်ကို (Training Needs) မည်သို့ ဆန်းစစ်ပါသလဲ?', en: 'How do you identify which training employees need?' },
        { my: 'သင်တန်းတစ်ခု အောင်မြင်မှု ရှိ၊ မရှိကို မည်သို့ တိုင်းတာမည်နည်း?', en: 'How would you measure whether a training programme was successful?' },
        { my: 'စိတ်မဝင်စားသော ဝန်ထမ်းများကို သင်တန်းတွင် တက်ကြွစွာ ပါဝင်လာအောင် မည်သို့ ပြုလုပ်မည်နည်း?', en: 'How would you get uninterested employees to participate actively in training?' },
      ],
    },
    {
      id: 'hr_manager', name: 'HR Manager', myanmarName: 'HR မန်နေဂျာ',
      keySkills: ['HR Strategy', 'Leadership', 'Performance Management', 'Retention'],
      questions: [
        { my: 'ဝန်ထမ်း အလုပ်ထွက်နှုန်း (Turnover) မြင့်မားနေပါက မည်သည့် အစီအစဉ်များ ချမှတ်မည်နည်း?', en: 'If employee turnover is high, what plans would you put in place?' },
        { my: 'Performance Appraisal စနစ်ကို တရားမျှတပြီး ထိရောက်အောင် မည်သို့ စီမံမည်နည်း?', en: 'How would you make the performance appraisal system fair and effective?' },
        { my: 'အကြီးတန်း စီမံခန့်ခွဲမှုအဖွဲ့နှင့် ဝန်ထမ်းများ၏ အကျိုးစီးပွား ကွဲလွဲပါက မည်သို့ ညှိနှိုင်းမည်နည်း?', en: 'How would you balance things when senior management and employees have conflicting interests?' },
      ],
    },
  ],

  admin: [
    {
      id: 'admin_assistant', name: 'Admin Assistant', myanmarName: 'ရုံးလက်ထောက်',
      keySkills: ['Filing', 'MS Office', 'Scheduling', 'Office Supplies'],
      questions: [
        { my: 'ရုံးစာရွက်စာတမ်းများနှင့် ဖိုင်များကို ရှာရလွယ်အောင် မည်သို့ စနစ်တကျ စီမံပါသလဲ?', en: 'How do you organise office documents and files so they are easy to find?' },
        { my: 'တစ်ချိန်တည်းမှာ အလုပ်များစွာ ရောက်လာပါက ဦးစားပေး အစီအစဉ်ကို မည်သို့ သတ်မှတ်ပါသလဲ?', en: 'When many tasks arrive at the same time, how do you decide what to do first?' },
        { my: 'Microsoft Word နှင့် Excel တွင် မည်သည့် လုပ်ဆောင်ချက်များကို ကျွမ်းကျင်စွာ အသုံးပြုနိုင်ပါသလဲ?', en: 'Which Microsoft Word and Excel features can you use confidently?' },
      ],
    },
    {
      id: 'office_manager', name: 'Office Manager', myanmarName: 'ရုံးမန်နေဂျာ',
      keySkills: ['Office Operations', 'Budgeting', 'Vendor Management', 'Team Coordination'],
      questions: [
        { my: 'ရုံးအသုံးစရိတ်များကို လျှော့ချရန် မည်သည့် နည်းလမ်းများ အသုံးပြုခဲ့ဖူးပါသလဲ?', en: 'What methods have you used to reduce office expenses?' },
        { my: 'Supplier သို့မဟုတ် ဝန်ဆောင်မှုပေးသူ တစ်ဦးက အချိန်မှန် မပို့ဆောင်ပါက မည်သို့ ဖြေရှင်းမည်နည်း?', en: 'If a supplier or service provider fails to deliver on time, how would you resolve it?' },
        { my: 'ရုံးတွင်း ဌာနများအကြား ပူးပေါင်းဆောင်ရွက်မှု ပိုကောင်းလာစေရန် မည်သို့ စီစဉ်မည်နည်း?', en: 'How would you improve coordination between departments in the office?' },
      ],
    },
    {
      id: 'executive_assistant', name: 'Executive Assistant / Secretary', myanmarName: 'အမှုဆောင် လက်ထောက် / အတွင်းရေးမှူး',
      keySkills: ['Calendar Management', 'Confidentiality', 'Meeting Minutes', 'Communication'],
      questions: [
        { my: 'Director တစ်ဦး၏ အချိန်ဇယားနှင့် အစည်းအဝေးများကို မည်သို့ စီမံခန့်ခွဲပါသလဲ?', en: 'How do you manage a director\'s schedule and meetings?' },
        { my: 'လျှို့ဝှက်ထားရမည့် သတင်းအချက်အလက်များကို မည်သို့ ကိုင်တွယ်ပါသလဲ?', en: 'How do you handle confidential information?' },
        { my: 'အရေးကြီး အစည်းအဝေးတစ်ခု နောက်ဆုံးမိနစ်တွင် အချိန်ပြောင်းရပါက မည်သို့ စီစဉ်မည်နည်း?', en: 'How would you handle an important meeting that has to be rescheduled at the last minute?' },
      ],
    },
    {
      id: 'data_entry', name: 'Data Entry Clerk', myanmarName: 'ဒေတာ ထည့်သွင်းသူ',
      keySkills: ['Typing Speed', 'Accuracy', 'Excel', 'Data Checking'],
      questions: [
        { my: 'ဒေတာများစွာကို မြန်မြန်ဆန်ဆန် ထည့်သွင်းရင်း အမှားမဖြစ်အောင် မည်သို့ ဂရုစိုက်ပါသလဲ?', en: 'How do you avoid mistakes while entering large amounts of data quickly?' },
        { my: 'Excel တွင် ထပ်နေသော ဒေတာ (Duplicate) များကို မည်သို့ ရှာဖွေ ဖယ်ရှားပါသလဲ?', en: 'How do you find and remove duplicate data in Excel?' },
        { my: 'ထပ်ခါထပ်ခါ လုပ်ရသော အလုပ်ကို နေ့စဉ် အာရုံစိုက်ပြီး လုပ်နိုင်ရန် ဘာတွေ လုပ်ပါသလဲ?', en: 'What do you do to stay focused on repetitive work every day?' },
      ],
    },
    {
      id: 'procurement', name: 'Procurement / Purchasing Officer', myanmarName: 'ဝယ်ယူရေး အရာရှိ',
      keySkills: ['Supplier Sourcing', 'Negotiation', 'Quotations', 'Cost Control'],
      questions: [
        { my: 'ပစ္စည်းဝယ်ယူရာတွင် Supplier များကို မည်သည့် အချက်များဖြင့် ရွေးချယ်ပါသလဲ?', en: 'What criteria do you use to choose suppliers?' },
        { my: 'ဈေးနှုန်းလျှော့ရန် Supplier နှင့် မည်သို့ ညှိနှိုင်းခဲ့ဖူးပါသလဲ? ဥပမာ ပြောပြပါ။', en: 'Give an example of how you negotiated a lower price with a supplier.' },
        { my: 'ဝယ်ယူရေးလုပ်ငန်းစဉ်တွင် ပွင့်လင်းမြင်သာမှုနှင့် လာဘ်စားမှု ကင်းရှင်းစေရန် မည်သို့ ထိန်းသိမ်းမည်နည်း?', en: 'How would you keep the purchasing process transparent and free from corruption?' },
      ],
    },
  ],

  sales: [
    {
      id: 'sales_executive', name: 'Sales Executive', myanmarName: 'အရောင်း အမှုဆောင်',
      keySkills: ['Lead Generation', 'Closing Deals', 'Negotiation', 'CRM'],
      questions: [
        { my: 'ဖောက်သည်အသစ်များ (New Leads) ကို မည်သည့် နည်းလမ်းများဖြင့် ရှာဖွေပါသလဲ?', en: 'How do you find new leads and customers?' },
        { my: 'ဖောက်သည်က "ဈေးကြီးတယ်" ဟု ပြောပါက မည်သို့ ပြန်လည် ဖြေကြားမည်နည်း?', en: 'If a customer says "it\'s too expensive", how would you respond?' },
        { my: 'သင် အရောင်းပစ်မှတ် (Target) ကို ပြည့်မီအောင် လုပ်ခဲ့ဖူးသည့် အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about a time you achieved your sales target.' },
      ],
    },
    {
      id: 'field_sales', name: 'Field Sales Representative', myanmarName: 'ကွင်းဆင်း အရောင်းကိုယ်စားလှယ်',
      keySkills: ['Route Planning', 'Shop Visits', 'Distribution', 'Relationship Building'],
      questions: [
        { my: 'တစ်နေ့တာ ဆိုင်များစွာ သွားရောက်ရန် ခရီးစဉ်ကို မည်သို့ စီစဉ်ပါသလဲ?', en: 'How do you plan your route to visit many shops in one day?' },
        { my: 'ဆိုင်ရှင်တစ်ဦးက ပြိုင်ဘက် ကုန်ပစ္စည်းကိုသာ ရောင်းချင်ပါက မည်သို့ စည်းရုံးမည်နည်း?', en: 'If a shop owner only wants to sell a competitor\'s product, how would you persuade them?' },
        { my: 'နေပူ၊ မိုးရွာထဲ ကွင်းဆင်းရသော အလုပ်တွင် စိတ်ဓာတ်ကို မည်သို့ ထိန်းထားပါသလဲ?', en: 'How do you stay motivated in field work, in hot sun or heavy rain?' },
      ],
    },
    {
      id: 'key_account', name: 'Key Account Manager', myanmarName: 'အဓိက ဖောက်သည် စီမံခန့်ခွဲသူ',
      keySkills: ['Account Planning', 'Upselling', 'Client Retention', 'Reporting'],
      questions: [
        { my: 'အဓိက ဖောက်သည်ကြီးများနှင့် ရေရှည် ဆက်ဆံရေးကို မည်သို့ တည်ဆောက်ပါသလဲ?', en: 'How do you build long-term relationships with key clients?' },
        { my: 'အရေးကြီး ဖောက်သည်တစ်ဦးက ပြိုင်ဘက်ဆီ ပြောင်းရွှေ့ရန် စဉ်းစားနေပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'If an important client is thinking of moving to a competitor, what would you do?' },
        { my: 'ရှိပြီးသား ဖောက်သည်ထံမှ ရောင်းအား တိုးလာအောင် (Upselling) မည်သို့ ပြုလုပ်ခဲ့ဖူးပါသလဲ?', en: 'How have you increased sales from an existing client (upselling)?' },
      ],
    },
    {
      id: 'business_development', name: 'Business Development (B2B)', myanmarName: 'လုပ်ငန်း ဖွံ့ဖြိုးရေး',
      keySkills: ['Market Research', 'Partnerships', 'Proposals', 'Presentations'],
      questions: [
        { my: 'ကုမ္ပဏီအသစ်တစ်ခုနှင့် စီးပွားရေး ပူးပေါင်းဆောင်ရွက်မှု (Partnership) ကို မည်သို့ စတင်ချိတ်ဆက်မည်နည်း?', en: 'How would you start a new business partnership with another company?' },
        { my: 'ဈေးကွက်သစ်တစ်ခုသို့ ဝင်ရောက်ရန် အခွင့်အလမ်းကို မည်သို့ လေ့လာဆန်းစစ်မည်နည်း?', en: 'How would you research whether a new market is a good opportunity?' },
        { my: 'ကုမ္ပဏီ ဆုံးဖြတ်ချက်ချသူများရှေ့တွင် Business Proposal ကို မည်သို့ တင်ပြမည်နည်း?', en: 'How would you present a business proposal to a company\'s decision-makers?' },
      ],
    },
    {
      id: 'retail_sales', name: 'Retail Sales / Shop Assistant', myanmarName: 'ဆိုင် အရောင်းဝန်ထမ်း',
      keySkills: ['Customer Service', 'Product Knowledge', 'Cash Handling', 'Merchandising'],
      questions: [
        { my: 'ဆိုင်ထဲ ဝင်လာသော ဖောက်သည်ကို မည်သို့ နှုတ်ဆက်ပြီး ဝယ်ယူလိုစိတ် ရှိလာအောင် လုပ်မည်နည်း?', en: 'How would you greet a customer who walks into the shop and encourage them to buy?' },
        { my: 'ဝယ်ပြီးသား ပစ္စည်းကို ပြန်လဲချင်သော စိတ်ဆိုးနေသည့် ဖောက်သည်ကို မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'How would you handle an angry customer who wants to return an item?' },
        { my: 'ဆိုင်တွင် လူများပြီး အလုပ်ရှုပ်နေချိန် ဖောက်သည်များကို မည်သို့ ဝန်ဆောင်မှုပေးမည်နည်း?', en: 'How would you serve customers when the shop is crowded and busy?' },
      ],
    },
    {
      id: 'sales_manager', name: 'Sales Manager', myanmarName: 'အရောင်း မန်နေဂျာ',
      keySkills: ['Team Leadership', 'Sales Forecasting', 'Coaching', 'KPI Tracking'],
      questions: [
        { my: 'အရောင်းအဖွဲ့ Target မပြည့်ပါက မည်သို့ ပြန်လည် တွန်းအားပေးမည်နည်း?', en: 'If your sales team is missing its target, how would you get them back on track?' },
        { my: 'အရောင်းဝန်ထမ်းများ၏ စွမ်းဆောင်ရည်ကို မည်သည့် KPI များဖြင့် တိုင်းတာပါသလဲ?', en: 'Which KPIs do you use to measure your sales team\'s performance?' },
        { my: 'နောက်လ ရောင်းအား ခန့်မှန်းချက် (Sales Forecast) ကို မည်သို့ ပြင်ဆင်ပါသလဲ?', en: 'How do you prepare next month\'s sales forecast?' },
      ],
    },
  ],

  marketing: [
    {
      id: 'digital_marketing', name: 'Digital Marketing Executive', myanmarName: 'ဒစ်ဂျစ်တယ် စျေးကွက်ရှာဖွေရေး',
      keySkills: ['Facebook Ads', 'Google Ads', 'Analytics', 'Campaign Planning'],
      questions: [
        { my: 'Facebook Ads Campaign တစ်ခုကို အစမှအဆုံး မည်သို့ စီစဉ်ပြီး Run ပါသလဲ?', en: 'How do you plan and run a Facebook Ads campaign from start to finish?' },
        { my: 'ကြော်ငြာ ရလဒ်ကောင်း၊ မကောင်းကို မည်သည့် Metrics များဖြင့် တိုင်းတာပါသလဲ?', en: 'Which metrics do you use to judge whether an ad campaign is working?' },
        { my: 'ကြော်ငြာ ဘတ်ဂျက်နည်းနည်းဖြင့် ရလဒ်အကောင်းဆုံး ရအောင် မည်သို့ လုပ်မည်နည်း?', en: 'How would you get the best results from a small advertising budget?' },
      ],
    },
    {
      id: 'social_media', name: 'Social Media / Content Creator', myanmarName: 'ဆိုရှယ်မီဒီယာ နှင့် Content ဖန်တီးသူ',
      keySkills: ['Content Planning', 'Copywriting', 'Video Content', 'Community Management'],
      questions: [
        { my: 'Page တစ်ခုအတွက် တစ်လစာ Content Plan ကို မည်သို့ ရေးဆွဲပါသလဲ?', en: 'How do you create a one-month content plan for a page?' },
        { my: 'Engagement မြင့်မားခဲ့သော Post တစ်ခုအကြောင်းနှင့် ဘာကြောင့် အောင်မြင်ခဲ့သည်ကို ပြောပြပါ။', en: 'Tell me about a post that got high engagement and why it worked.' },
        { my: 'Page ပေါ်တွင် အနုတ်လက္ခဏာဆောင်သော Comment များ များလာပါက မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'How would you handle a wave of negative comments on the page?' },
      ],
    },
    {
      id: 'seo_specialist', name: 'SEO / SEM Specialist', myanmarName: 'SEO / SEM ကျွမ်းကျင်သူ',
      keySkills: ['Keyword Research', 'On-page SEO', 'Google Search Console', 'Link Building'],
      questions: [
        { my: 'Website တစ်ခု Google တွင် ရှာဖွေမှု အဆင့် (Ranking) တက်လာအောင် မည်သို့ လုပ်ဆောင်မည်နည်း?', en: 'How would you improve a website\'s Google search ranking?' },
        { my: 'Keyword Research ကို မည်သည့် Tools များဖြင့် မည်သို့ ပြုလုပ်ပါသလဲ?', en: 'How do you do keyword research, and which tools do you use?' },
        { my: 'Website Traffic ရုတ်တရက် ကျဆင်းသွားပါက အကြောင်းရင်းကို မည်သို့ ရှာဖွေမည်နည်း?', en: 'If website traffic suddenly drops, how would you find the cause?' },
      ],
    },
    {
      id: 'brand_manager', name: 'Brand Manager', myanmarName: 'အမှတ်တံဆိပ် မန်နေဂျာ',
      keySkills: ['Brand Strategy', 'Market Research', 'Positioning', 'Product Launch'],
      questions: [
        { my: 'ကုန်ပစ္စည်းအသစ်တစ်ခု ဈေးကွက်တင်ရန် (Product Launch) မည်သို့ စီစဉ်မည်နည်း?', en: 'How would you plan the launch of a new product?' },
        { my: 'ပြိုင်ဘက်များနှင့် ကွဲပြားအောင် Brand Positioning ကို မည်သို့ သတ်မှတ်မည်နည်း?', en: 'How would you position a brand so it stands out from competitors?' },
        { my: 'Brand ပုံရိပ်ကို ထိခိုက်စေသော ပြဿနာတစ်ခု ပေါ်လာပါက မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'How would you handle a problem that is damaging the brand\'s image?' },
      ],
    },
    {
      id: 'copywriter', name: 'Content Writer / Copywriter', myanmarName: 'စာရေးသူ / Copywriter',
      keySkills: ['Copywriting', 'Storytelling', 'Editing', 'Bilingual Writing'],
      questions: [
        { my: 'ကြော်ငြာစာသား ရေးရာတွင် ဖတ်သူ၏ စိတ်ဝင်စားမှုကို မည်သို့ ဖမ်းစားပါသလဲ?', en: 'How do you grab the reader\'s attention when writing ad copy?' },
        { my: 'မြန်မာ နှင့် အင်္ဂလိပ် နှစ်ဘာသာဖြင့် Content ရေးသားရာတွင် ဘာတွေကို ဂရုစိုက်ပါသလဲ?', en: 'What do you pay attention to when writing content in both Myanmar and English?' },
        { my: 'Client က သင့်ရေးသားချက်ကို မကြိုက်ဘဲ ပြင်ခိုင်းပါက မည်သို့ တုံ့ပြန်မည်နည်း?', en: 'If a client doesn\'t like your writing and asks for changes, how would you respond?' },
      ],
    },
    {
      id: 'marketing_manager', name: 'Marketing Manager', myanmarName: 'စျေးကွက်ရှာဖွေရေး မန်နေဂျာ',
      keySkills: ['Marketing Strategy', 'Budget Planning', 'Team Leadership', 'ROI'],
      questions: [
        { my: 'နှစ်စဉ် Marketing Plan နှင့် ဘတ်ဂျက်ကို မည်သို့ ရေးဆွဲပါသလဲ?', en: 'How do you prepare an annual marketing plan and budget?' },
        { my: 'Marketing လုပ်ငန်းများ၏ ROI (ရင်းနှီးမှုအပေါ် ပြန်ရငွေ) ကို မည်သို့ တိုင်းတာပါသလဲ?', en: 'How do you measure the ROI of marketing activities?' },
        { my: 'ရောင်းအား ကျဆင်းနေချိန် Marketing ဗျူဟာကို မည်သို့ ပြောင်းလဲမည်နည်း?', en: 'How would you change the marketing strategy when sales are falling?' },
      ],
    },
  ],

  accounting: [
    {
      id: 'accountant', name: 'Accountant', myanmarName: 'စာရင်းကိုင်',
      keySkills: ['Bookkeeping', 'Financial Statements', 'Reconciliation', 'Accounting Software'],
      questions: [
        { my: 'လစဉ် စာရင်းပိတ်ခြင်း (Month-end Closing) လုပ်ငန်းစဉ်ကို ရှင်းပြပါ။', en: 'Walk me through your month-end closing process.' },
        { my: 'ဘဏ်စာရင်း ညှိနှိုင်းခြင်း (Bank Reconciliation) တွင် ကွာဟချက် တွေ့ပါက မည်သို့ ရှာဖွေဖြေရှင်းမည်နည်း?', en: 'If you find a difference during bank reconciliation, how would you track it down?' },
        { my: 'မည်သည့် စာရင်းကိုင် Software များကို အသုံးပြုဖူးပါသလဲ?', en: 'Which accounting software have you used?' },
      ],
    },
    {
      id: 'junior_accountant', name: 'Junior Accountant / Accounts Assistant', myanmarName: 'လက်ထောက် စာရင်းကိုင်',
      keySkills: ['Data Entry', 'Invoices', 'Petty Cash', 'Excel'],
      questions: [
        { my: 'Debit နှင့် Credit ကွာခြားချက်ကို ဥပမာဖြင့် ရှင်းပြပါ။', en: 'Explain the difference between debit and credit with an example.' },
        { my: 'Petty Cash (အသေးသုံး ငွေ) ကို မည်သို့ စနစ်တကျ ထိန်းသိမ်းပါသလဲ?', en: 'How do you manage petty cash properly?' },
        { my: 'ငွေတောင်းခံလွှာ (Invoice) တွင် အမှားတွေ့ပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'What would you do if you found a mistake on an invoice?' },
      ],
    },
    {
      id: 'cashier', name: 'Cashier', myanmarName: 'ငွေကိုင်',
      keySkills: ['Cash Handling', 'POS', 'Accuracy', 'Honesty'],
      questions: [
        { my: 'နေ့ကုန်တွင် ငွေစာရင်း မကိုက်ညီပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'What would you do if the cash doesn\'t balance at the end of the day?' },
        { my: 'ငွေအတုများ သို့မဟုတ် လိမ်လည်မှုများကို မည်သို့ သတိထား စစ်ဆေးပါသလဲ?', en: 'How do you watch out for fake notes or fraud?' },
        { my: 'ဖောက်သည်များ တန်းစီစောင့်နေချိန် မြန်ဆန်ပြီး တိကျစွာ မည်သို့ ဝန်ဆောင်မှု ပေးမည်နည်း?', en: 'How would you serve customers quickly and accurately when there is a long queue?' },
      ],
    },
    {
      id: 'auditor', name: 'Auditor', myanmarName: 'စာရင်းစစ်',
      keySkills: ['Internal Audit', 'Risk Assessment', 'Compliance', 'Audit Reports'],
      questions: [
        { my: 'Internal Audit တစ်ခုကို မည်သို့ စီစဉ်ပြီး လုပ်ဆောင်ပါသလဲ?', en: 'How do you plan and carry out an internal audit?' },
        { my: 'စာရင်းစစ်ရာတွင် လိမ်လည်မှု လက္ခဏာများ တွေ့ရှိပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'What would you do if you found signs of fraud during an audit?' },
        { my: 'ဌာနမန်နေဂျာက သင့် စာရင်းစစ်တွေ့ရှိချက်ကို လက်မခံပါက မည်သို့ ရှင်းပြမည်နည်း?', en: 'How would you respond if a department manager doesn\'t accept your audit findings?' },
      ],
    },
    {
      id: 'tax_officer', name: 'Tax Officer', myanmarName: 'အခွန်ဆိုင်ရာ အရာရှိ',
      keySkills: ['Commercial Tax', 'Income Tax', 'Tax Filing', 'Regulations'],
      questions: [
        { my: 'မြန်မာနိုင်ငံ၏ ကုန်သွယ်လုပ်ငန်းခွန် (Commercial Tax) နှင့် ဝင်ငွေခွန် တင်သွင်းခြင်း အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about your experience filing commercial tax and income tax in Myanmar.' },
        { my: 'အခွန်ဥပဒေ ပြောင်းလဲမှုများကို မည်သို့ နောက်ဆုံးရ သိရှိအောင် လေ့လာပါသလဲ?', en: 'How do you keep up to date with changes in tax law?' },
        { my: 'အခွန်စစ်ဆေးမှု (Tax Audit) အတွက် စာရွက်စာတမ်းများကို မည်သို့ ပြင်ဆင်မည်နည်း?', en: 'How would you prepare documents for a tax audit?' },
      ],
    },
    {
      id: 'finance_manager', name: 'Finance Manager', myanmarName: 'ဘဏ္ဍာရေး မန်နေဂျာ',
      keySkills: ['Budgeting', 'Cash Flow', 'Financial Analysis', 'Reporting'],
      questions: [
        { my: 'ကုမ္ပဏီ၏ ငွေသားစီးဆင်းမှု (Cash Flow) ပြဿနာကို မည်သို့ စီမံမည်နည်း?', en: 'How would you manage a company cash flow problem?' },
        { my: 'နှစ်စဉ် ဘတ်ဂျက်ကို ဌာနများနှင့် ညှိနှိုင်းပြီး မည်သို့ ရေးဆွဲပါသလဲ?', en: 'How do you prepare the annual budget together with other departments?' },
        { my: 'ငွေကြေးလဲလှယ်နှုန်း အတက်အကျ များသော အခြေအနေတွင် ဘဏ္ဍာရေး အန္တရာယ်ကို မည်သို့ လျှော့ချမည်နည်း?', en: 'How would you reduce financial risk when exchange rates change a lot?' },
      ],
    },
  ],

  customer_service: [
    {
      id: 'csr', name: 'Customer Service Representative', myanmarName: 'ဖောက်သည် ဝန်ဆောင်မှု ကိုယ်စားလှယ်',
      keySkills: ['Communication', 'Problem Solving', 'Patience', 'Product Knowledge'],
      questions: [
        { my: 'အလွန် စိတ်ဆိုးနေသော ဖောက်သည်တစ်ဦးကို မည်သို့ ကိုင်တွယ်ဖြေရှင်းမည်နည်း?', en: 'How would you handle a very angry customer?' },
        { my: 'ဖောက်သည်၏ မေးခွန်းကို အဖြေမသိပါက မည်သို့ တုံ့ပြန်မည်နည်း?', en: 'What would you do if you didn\'t know the answer to a customer\'s question?' },
        { my: 'ဖောက်သည်ကို မျှော်လင့်ထားသည်ထက် ပိုကောင်းသော ဝန်ဆောင်မှု ပေးခဲ့ဖူးသည့် အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about a time you gave a customer better service than they expected.' },
      ],
    },
    {
      id: 'call_center', name: 'Call Center Agent', myanmarName: 'ဖုန်းဝန်ဆောင်မှု ဝန်ထမ်း',
      keySkills: ['Phone Etiquette', 'Active Listening', 'Call Handling', 'Typing'],
      questions: [
        { my: 'တစ်နေ့ ဖုန်းခေါ်ဆိုမှု အများအပြားကို ကိုင်တွယ်ရင်း အရည်အသွေး မကျအောင် မည်သို့ ထိန်းထားမည်နည်း?', en: 'How would you keep quality high while handling many calls a day?' },
        { my: 'ဖုန်းထဲတွင် ဖောက်သည်က ရိုင်းစိုင်းစွာ ပြောဆိုပါက မည်သို့ တုံ့ပြန်မည်နည်း?', en: 'How would you respond if a caller is rude to you?' },
        { my: 'ဖုန်းဖြင့် ပြဿနာ ဖြေရှင်းပေးရာတွင် ဖောက်သည်ကို ရှင်းလင်းစွာ နားလည်အောင် မည်သို့ ရှင်းပြပါသလဲ?', en: 'How do you explain a solution clearly to a customer over the phone?' },
      ],
    },
    {
      id: 'online_support', name: 'Online / Live Chat Support', myanmarName: 'အွန်လိုင်း Chat ဝန်ဆောင်မှု',
      keySkills: ['Written Communication', 'Multitasking', 'Messenger / Viber', 'Response Time'],
      questions: [
        { my: 'Messenger နှင့် Chat တွင် ဖောက်သည်များစွာကို တစ်ပြိုင်နက် မည်သို့ ပြန်ကြားပါသလဲ?', en: 'How do you reply to many customers at the same time on Messenger and chat?' },
        { my: 'စာဖြင့် ဆက်သွယ်ရာတွင် ယဉ်ကျေးပြီး ရှင်းလင်းစေရန် ဘာတွေကို ဂရုစိုက်ပါသလဲ?', en: 'What do you pay attention to so your written replies are polite and clear?' },
        { my: 'Online တွင် ဖောက်သည်က အများမြင်အောင် မကောင်းသော Review ရေးလိုက်ပါက မည်သို့ တုံ့ပြန်မည်နည်း?', en: 'How would you respond if a customer posts a bad public review online?' },
      ],
    },
    {
      id: 'customer_success', name: 'Customer Success Executive', myanmarName: 'ဖောက်သည် အောင်မြင်ရေး အမှုဆောင်',
      keySkills: ['Onboarding Clients', 'Retention', 'Product Training', 'Feedback'],
      questions: [
        { my: 'ဖောက်သည်အသစ်များ ကုန်ပစ္စည်း/ဝန်ဆောင်မှုကို ကောင်းစွာ အသုံးပြုနိုင်အောင် မည်သို့ ကူညီမည်နည်း?', en: 'How would you help new customers get the most out of a product or service?' },
        { my: 'ဖောက်သည်တစ်ဦး ဝန်ဆောင်မှု ရပ်ဆိုင်းတော့မည့် လက္ခဏာများကို မည်သို့ သိရှိနိုင်မည်နည်း?', en: 'How can you tell that a customer is about to cancel the service?' },
        { my: 'ဖောက်သည်များ၏ အကြံပြုချက်ကို ကုမ္ပဏီအတွင်း မည်သို့ ပြန်လည် တင်ပြမည်နည်း?', en: 'How would you pass customer feedback on to the rest of the company?' },
      ],
    },
    {
      id: 'cs_team_lead', name: 'Customer Service Team Leader', myanmarName: 'ဖောက်သည်ဝန်ဆောင်မှု အဖွဲ့ခေါင်းဆောင်',
      keySkills: ['Team Leadership', 'Quality Monitoring', 'Escalations', 'Scheduling'],
      questions: [
        { my: 'အဖွဲ့ဝင်များ၏ ဝန်ဆောင်မှု အရည်အသွေးကို မည်သို့ စောင့်ကြည့် တိုးတက်စေမည်နည်း?', en: 'How would you monitor and improve your team\'s service quality?' },
        { my: 'အဖွဲ့ဝင်က ဖြေရှင်းမပေးနိုင်သော ပြဿနာကြီး (Escalation) ကို မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'How would you handle a serious issue that a team member couldn\'t resolve?' },
        { my: 'ဖိအားများသော အလုပ်တွင် အဖွဲ့ဝင်များ၏ စိတ်ဓာတ်ကို မည်သို့ မြှင့်တင်ထားမည်နည်း?', en: 'How would you keep your team motivated in a high-pressure job?' },
      ],
    },
  ],

  it_support: [
    {
      id: 'helpdesk', name: 'IT Support / Helpdesk', myanmarName: 'IT ပံ့ပိုးမှု ဝန်ထမ်း',
      keySkills: ['Troubleshooting', 'Windows / Office', 'Printers', 'User Support'],
      questions: [
        { my: 'ရုံးတွင်း အင်တာနက်လိုင်းကျခြင်း သို့မဟုတ် Printer/PC ချိတ်ဆက်မရခြင်းများကို မည်သို့ အဆင့်ဆင့် ရှာဖွေစစ်ဆေးသလဲ?', en: 'How do you troubleshoot step by step when the office internet goes down or a printer/PC won\'t connect?' },
        { my: 'နည်းပညာ မကျွမ်းကျင်သော User များကို ပြဿနာဖြေရှင်းနည်း မည်သို့ ရှင်းပြပါသလဲ?', en: 'How do you explain a technical fix to users who are not good with technology?' },
        { my: 'IT ပြဿနာ များစွာ တစ်ပြိုင်နက် ရောက်လာပါက မည်သို့ ဦးစားပေး ဖြေရှင်းမည်နည်း?', en: 'If many IT problems come in at once, how do you decide which to fix first?' },
      ],
    },
    {
      id: 'network_engineer', name: 'Network Engineer / Administrator', myanmarName: 'ကွန်ရက် အင်ဂျင်နီယာ',
      keySkills: ['LAN/WAN', 'Routers & Switches', 'VPN', 'Firewall'],
      questions: [
        { my: 'ရုံးခွဲအသစ်တစ်ခုအတွက် ကွန်ရက် (Network) ကို မည်သို့ ဒီဇိုင်းဆွဲ တပ်ဆင်မည်နည်း?', en: 'How would you design and set up the network for a new branch office?' },
        { my: 'ကွန်ရက် နှေးကွေးနေပါက အကြောင်းရင်းကို မည်သည့် Tools များဖြင့် ရှာဖွေမည်နည်း?', en: 'If the network is slow, which tools would you use to find the cause?' },
        { my: 'VLAN နှင့် VPN ကို အသုံးပြုခဲ့ဖူးသည့် အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about your experience working with VLANs and VPNs.' },
      ],
    },
    {
      id: 'system_admin', name: 'System Administrator', myanmarName: 'စနစ် စီမံခန့်ခွဲသူ',
      keySkills: ['Windows Server', 'Linux', 'Active Directory', 'Backup & Recovery'],
      questions: [
        { my: 'Server များ၏ Backup နှင့် Recovery စနစ်ကို မည်သို့ စီစဉ်ထားပါသလဲ?', en: 'How do you set up backup and recovery for servers?' },
        { my: 'Active Directory တွင် User အကောင့်များနှင့် ခွင့်ပြုချက် (Permissions) များကို မည်သို့ စီမံပါသလဲ?', en: 'How do you manage user accounts and permissions in Active Directory?' },
        { my: 'Server တစ်ခု ရုတ်တရက် ရပ်သွားပါက ပထမဆုံး ဘာတွေ လုပ်မည်နည်း?', en: 'If a server suddenly goes down, what are the first things you do?' },
      ],
    },
    {
      id: 'cloud_specialist', name: 'Cloud Specialist / Engineer', myanmarName: 'Cloud ကျွမ်းကျင်သူ',
      keySkills: ['AWS / Azure / GCP', 'Migration', 'Cost Optimisation', 'Infrastructure as Code'],
      questions: [
        { my: 'ရုံးတွင်း Server များကို Cloud သို့ ပြောင်းရွှေ့ရန် (Cloud Migration) မည်သို့ စီစဉ်မည်နည်း?', en: 'How would you plan migrating on-premise servers to the cloud?' },
        { my: 'Cloud အသုံးစရိတ် မြင့်တက်နေပါက မည်သို့ လျှော့ချမည်နည်း?', en: 'If cloud costs keep rising, how would you reduce them?' },
        { my: 'AWS, Azure သို့မဟုတ် Google Cloud တွင် ဘယ်ဝန်ဆောင်မှုများကို အသုံးပြုဖူးပါသလဲ?', en: 'Which services on AWS, Azure or Google Cloud have you used?' },
      ],
    },
    {
      id: 'cloud_security', name: 'Cloud Security / Cybersecurity Officer', myanmarName: 'Cloud နှင့် ဆိုက်ဘာ လုံခြုံရေး အရာရှိ',
      keySkills: ['Identity & Access', 'Threat Detection', 'Incident Response', 'Data Security'],
      questions: [
        { my: 'Cloud ပေါ်ရှိ ကုမ္ပဏီ ဒေတာများကို မည်သို့ လုံခြုံအောင် ကာကွယ်မည်နည်း?', en: 'How would you protect company data stored in the cloud?' },
        { my: 'ဝန်ထမ်းတစ်ဦးက Phishing Email ကို နှိပ်မိသွားပါက မည်သို့ တုံ့ပြန်ဆောင်ရွက်မည်နည်း?', en: 'If an employee clicks a phishing email, how would you respond?' },
        { my: 'Least Privilege နှင့် Multi-Factor Authentication ကို အဘယ်ကြောင့် အရေးကြီးသည်ကို ရှင်းပြပါ။', en: 'Explain why least privilege and multi-factor authentication are important.' },
      ],
    },
    {
      id: 'dba', name: 'Database Administrator', myanmarName: 'ဒေတာဘေ့စ် စီမံခန့်ခွဲသူ',
      keySkills: ['SQL', 'Performance Tuning', 'Backups', 'Replication'],
      questions: [
        { my: 'Database Query နှေးနေပါက မည်သို့ ရှာဖွေ မြန်ဆန်အောင် ပြုပြင်မည်နည်း?', en: 'If a database query is slow, how would you find the problem and speed it up?' },
        { my: 'Database ကို အချိန်နှင့်တပြေးညီ Backup လုပ်ပြီး ပြန်လည် Restore လုပ်ရန် မည်သို့ စီစဉ်ပါသလဲ?', en: 'How do you plan regular database backups and make sure they can be restored?' },
        { my: 'Database ကို ခွင့်ပြုချက်မရှိသူများ ဝင်ရောက်ခြင်းမှ မည်သို့ ကာကွယ်မည်နည်း?', en: 'How would you protect a database from unauthorised access?' },
      ],
    },
  ],

  software_dev: [
    {
      id: 'web_developer', name: 'Website Developer', myanmarName: 'ဝက်ဘ်ဆိုက် ရေးသားသူ',
      keySkills: ['HTML / CSS / JavaScript', 'WordPress', 'Responsive Design', 'Hosting'],
      questions: [
        { my: 'Client တစ်ဦးအတွက် ဝက်ဘ်ဆိုက်တစ်ခုကို အစမှ Launch အထိ မည်သို့ တည်ဆောက်မည်နည်း?', en: 'How would you build a website for a client from start to launch?' },
        { my: 'ဝက်ဘ်ဆိုက်ကို ဖုန်းနှင့် ကွန်ပျူတာ နှစ်မျိုးလုံးတွင် ကောင်းစွာ ပြသနိုင်အောင် မည်သို့ ပြုလုပ်ပါသလဲ?', en: 'How do you make a website work well on both phones and computers?' },
        { my: 'ဝက်ဘ်ဆိုက် Loading နှေးနေပါက မည်သို့ မြန်ဆန်အောင် ပြုပြင်မည်နည်း?', en: 'If a website loads slowly, how would you make it faster?' },
      ],
    },
    {
      id: 'software_developer', name: 'Software Developer', myanmarName: 'ဆော့ဖ်ဝဲ ရေးသားသူ',
      keySkills: ['Programming', 'Problem Solving', 'Git', 'Testing'],
      questions: [
        { my: 'သင် ရေးသားခဲ့ဖူးသော Project တစ်ခု၏ နည်းပညာဆိုင်ရာ စိန်ခေါ်မှုနှင့် ဖြေရှင်းပုံကို ပြောပြပါ။', en: 'Tell me about a technical challenge in one of your projects and how you solved it.' },
        { my: 'Bug တစ်ခုကို ရှာဖွေ ပြင်ဆင်ရာတွင် မည်သည့် အဆင့်များ လုပ်ဆောင်ပါသလဲ?', en: 'What steps do you take to find and fix a bug?' },
        { my: 'အဖွဲ့လိုက် Code ရေးရာတွင် Git နှင့် Code Review ကို မည်သို့ အသုံးပြုပါသလဲ?', en: 'How do you use Git and code reviews when working in a team?' },
      ],
    },
    {
      id: 'frontend_developer', name: 'Frontend Developer', myanmarName: 'Frontend ရေးသားသူ',
      keySkills: ['React / Vue', 'TypeScript', 'CSS', 'Accessibility'],
      questions: [
        { my: 'React (သို့မဟုတ် Vue) တွင် State Management ကို မည်သို့ စီမံပါသလဲ?', en: 'How do you manage state in React (or Vue)?' },
        { my: 'Designer ပေးသော Figma Design ကို တိကျစွာ Code ပြောင်းရာတွင် ဘာတွေကို ဂရုစိုက်ပါသလဲ?', en: 'What do you pay attention to when turning a designer\'s Figma design into code?' },
        { my: 'Web App တစ်ခု၏ Performance နှင့် Accessibility ကို မည်သို့ တိုးတက်အောင် လုပ်မည်နည်း?', en: 'How would you improve the performance and accessibility of a web app?' },
      ],
    },
    {
      id: 'backend_developer', name: 'Backend Developer', myanmarName: 'Backend ရေးသားသူ',
      keySkills: ['APIs', 'Databases', 'Node.js / Python / PHP', 'Security'],
      questions: [
        { my: 'REST API တစ်ခုကို ဒီဇိုင်းဆွဲရာတွင် ဘာတွေကို ထည့်သွင်း စဉ်းစားပါသလဲ?', en: 'What do you consider when designing a REST API?' },
        { my: 'User များ အများအပြား တစ်ပြိုင်နက် သုံးလာပါက System ကို မည်သို့ Scale လုပ်မည်နည်း?', en: 'How would you scale a system when many users start using it at once?' },
        { my: 'SQL Injection ကဲ့သို့ လုံခြုံရေး အန္တရာယ်များမှ Backend ကို မည်သို့ ကာကွယ်ပါသလဲ?', en: 'How do you protect a backend from security risks like SQL injection?' },
      ],
    },
    {
      id: 'fullstack_developer', name: 'Full-Stack Developer', myanmarName: 'Full-Stack ရေးသားသူ',
      keySkills: ['Frontend', 'Backend', 'Databases', 'Deployment'],
      questions: [
        { my: 'Frontend မှ Database အထိ Feature အသစ်တစ်ခုကို မည်သို့ တည်ဆောက်မည်နည်း? ဥပမာဖြင့် ပြောပြပါ။', en: 'Walk me through building a new feature from the frontend down to the database.' },
        { my: 'Project တစ်ခုအတွက် နည်းပညာ (Tech Stack) ကို မည်သည့် အချက်များဖြင့် ရွေးချယ်ပါသလဲ?', en: 'How do you choose the tech stack for a project?' },
        { my: 'App ကို Server ပေါ်သို့ Deploy လုပ်ခြင်း အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about your experience deploying an app to a server.' },
      ],
    },
    {
      id: 'mobile_developer', name: 'Mobile App Developer', myanmarName: 'မိုဘိုင်း App ရေးသားသူ',
      keySkills: ['Flutter / React Native', 'Android / iOS', 'App Store Release', 'Offline Support'],
      questions: [
        { my: 'Flutter, React Native သို့မဟုတ် Native (Android/iOS) ထဲမှ ဘယ်ဟာကို ဘာကြောင့် ရွေးချယ်မည်နည်း?', en: 'Would you choose Flutter, React Native or native Android/iOS, and why?' },
        { my: 'အင်တာနက် မငြိမ်သော နေရာများတွင်လည်း App ကောင်းစွာ အလုပ်လုပ်အောင် မည်သို့ ပြုလုပ်မည်နည်း?', en: 'How would you make an app work well where the internet connection is unstable?' },
        { my: 'App ကို Play Store / App Store သို့ တင်ခဲ့ဖူးသည့် အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about publishing an app on the Play Store or App Store.' },
      ],
    },
    {
      id: 'web_designer', name: 'Website Designer (UI/UX)', myanmarName: 'ဝက်ဘ်ဆိုက် ဒီဇိုင်နာ',
      keySkills: ['Figma', 'UI Design', 'User Research', 'Prototyping'],
      questions: [
        { my: 'User အသုံးပြုရ လွယ်ကူသော ဝက်ဘ်ဆိုက် ဒီဇိုင်းကို မည်သို့ စတင် ရေးဆွဲပါသလဲ?', en: 'How do you start designing a website that is easy for users?' },
        { my: 'Client ၏ အကြိုက်နှင့် User အတွက် အကောင်းဆုံး ဒီဇိုင်း ကွဲလွဲနေပါက မည်သို့ ညှိနှိုင်းမည်နည်း?', en: 'What would you do if the client\'s taste conflicts with what is best for users?' },
        { my: 'သင့် Portfolio ထဲမှ အကြိုက်ဆုံး ဒီဇိုင်းတစ်ခုနှင့် ဒီဇိုင်း ဆုံးဖြတ်ချက်များကို ရှင်းပြပါ။', en: 'Show me your favourite design in your portfolio and explain your design decisions.' },
      ],
    },
    {
      id: 'qa_tester', name: 'QA / Software Tester', myanmarName: 'ဆော့ဖ်ဝဲ စမ်းသပ်သူ',
      keySkills: ['Test Cases', 'Manual Testing', 'Automation', 'Bug Reporting'],
      questions: [
        { my: 'Login Page တစ်ခုအတွက် Test Case များကို မည်သို့ ရေးဆွဲမည်နည်း?', en: 'How would you write test cases for a login page?' },
        { my: 'Developer က သင်တွေ့ရှိသော Bug ကို "Bug မဟုတ်ပါ" ဟု ငြင်းပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'What would you do if a developer says the bug you found is "not a bug"?' },
        { my: 'Manual Testing နှင့် Automation Testing ကို ဘယ်အချိန်မှာ ဘယ်ဟာ သုံးသင့်သည်ကို ရှင်းပြပါ။', en: 'Explain when to use manual testing and when to use automated testing.' },
      ],
    },
    {
      id: 'devops_engineer', name: 'DevOps Engineer', myanmarName: 'DevOps အင်ဂျင်နီယာ',
      keySkills: ['CI/CD', 'Docker / Kubernetes', 'Monitoring', 'Linux'],
      questions: [
        { my: 'CI/CD Pipeline တစ်ခုကို မည်သို့ တည်ဆောက်မည်နည်း? ဘယ် Tools များ သုံးမည်နည်း?', en: 'How would you build a CI/CD pipeline, and which tools would you use?' },
        { my: 'Docker နှင့် Kubernetes ကို အသုံးပြုခဲ့ဖူးသည့် အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about your experience with Docker and Kubernetes.' },
        { my: 'Production System ပြဿနာ ဖြစ်နေကြောင်း မည်သို့ စောစီးစွာ သိရှိနိုင်အောင် စောင့်ကြည့်ပါသလဲ?', en: 'How do you monitor production systems so you find problems early?' },
      ],
    },
  ],

  logistics: [
    {
      id: 'warehouse_supervisor', name: 'Warehouse Supervisor', myanmarName: 'ဂိုဒေါင် ကြီးကြပ်ရေးမှူး',
      keySkills: ['Warehouse Operations', 'Team Supervision', 'Safety', 'Stock Control'],
      questions: [
        { my: 'ဂိုဒေါင်ထဲ ပစ္စည်းများကို ရှာရလွယ်ပြီး နေရာ ချွေတာအောင် မည်သို့ စီစဉ်မည်နည်း?', en: 'How would you organise a warehouse so items are easy to find and space is used well?' },
        { my: 'ဂိုဒေါင်အတွင်း လုပ်ငန်းခွင် ဘေးအန္တရာယ် ကင်းရှင်းရေးကို မည်သို့ ထိန်းသိမ်းမည်နည်း?', en: 'How would you keep the warehouse a safe place to work?' },
        { my: 'ပစ္စည်း ပျောက်ဆုံးခြင်း သို့မဟုတ် ပျက်စီးခြင်းကို မည်သို့ ကာကွယ်မည်နည်း?', en: 'How would you prevent stock from being lost or damaged?' },
      ],
    },
    {
      id: 'store_keeper', name: 'Inventory Controller / Store Keeper', myanmarName: 'ကုန်လှောင်ရုံ ထိန်းသိမ်းသူ',
      keySkills: ['Stock Counting', 'FIFO', 'Inventory Software', 'Record Keeping'],
      questions: [
        { my: 'Stock စာရင်းနှင့် အမှန်တကယ်ရှိသော ပစ္စည်း မကိုက်ညီပါက မည်သို့ ရှာဖွေမည်နည်း?', en: 'If the stock records don\'t match the actual stock, how would you find out why?' },
        { my: 'FIFO (First In, First Out) စနစ်ကို အဘယ်ကြောင့် အသုံးပြုသည်ကို ရှင်းပြပါ။', en: 'Explain why the FIFO (first in, first out) method is used.' },
        { my: 'ပစ္စည်း ပြတ်လပ်ခြင်း မဖြစ်စေရန် Reorder Level ကို မည်သို့ သတ်မှတ်ပါသလဲ?', en: 'How do you set reorder levels so you never run out of stock?' },
      ],
    },
    {
      id: 'logistics_coordinator', name: 'Logistics Coordinator', myanmarName: 'ထောက်ပံ့ပို့ဆောင်ရေး ညှိနှိုင်းသူ',
      keySkills: ['Delivery Planning', 'Transport Coordination', 'Documentation', 'Communication'],
      questions: [
        { my: 'ရန်ကုန်မှ နယ်မြို့များသို့ ကုန်ပစ္စည်း ပို့ဆောင်မှုကို မည်သို့ စီစဉ်ညှိနှိုင်းမည်နည်း?', en: 'How would you coordinate deliveries from Yangon to towns across the country?' },
        { my: 'ကုန်ပစ္စည်း ပို့ဆောင်မှု နောက်ကျနေပါက ဖောက်သည်ကို မည်သို့ အသိပေး ဖြေရှင်းမည်နည်း?', en: 'If a delivery is delayed, how would you inform the customer and fix the problem?' },
        { my: 'ပို့ဆောင်ရေး ကုန်ကျစရိတ်ကို လျှော့ချရန် မည်သည့် နည်းလမ်းများ သုံးမည်နည်း?', en: 'What would you do to reduce transport costs?' },
      ],
    },
    {
      id: 'import_export', name: 'Import / Export Officer', myanmarName: 'သွင်းကုန် / ပို့ကုန် အရာရှိ',
      keySkills: ['Customs Clearance', 'Shipping Documents', 'Licences', 'Incoterms'],
      questions: [
        { my: 'သွင်းကုန်တစ်ခုအတွက် အကောက်ခွန် ရှင်းလင်းခြင်း (Customs Clearance) လုပ်ငန်းစဉ်ကို ရှင်းပြပါ။', en: 'Explain the customs clearance process for an import.' },
        { my: 'Invoice, Packing List, Bill of Lading ကဲ့သို့ စာရွက်စာတမ်းများ မှားယွင်းပါက မည်သို့ ဖြေရှင်းမည်နည်း?', en: 'How would you fix a mistake in shipping documents like the invoice, packing list or bill of lading?' },
        { my: 'FOB နှင့် CIF ကဲ့သို့ Incoterms များ၏ ကွာခြားချက်ကို ရှင်းပြပါ။', en: 'Explain the difference between Incoterms such as FOB and CIF.' },
      ],
    },
    {
      id: 'delivery_driver', name: 'Delivery Driver', myanmarName: 'ပစ္စည်းပို့ ယာဉ်မောင်း',
      keySkills: ['Safe Driving', 'Route Knowledge', 'Customer Handover', 'Vehicle Care'],
      questions: [
        { my: 'တစ်နေ့ ပို့ရမည့် နေရာများစွာအတွက် လမ်းကြောင်းကို မည်သို့ စီစဉ်ပါသလဲ?', en: 'How do you plan your route when you have many deliveries in one day?' },
        { my: 'ဖောက်သည်လိပ်စာ ရှာမတွေ့ပါက သို့မဟုတ် ဖောက်သည် မရှိပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'What would you do if you can\'t find the address or the customer isn\'t there?' },
        { my: 'ယာဉ်နှင့် ကုန်ပစ္စည်းများ လုံခြုံစိတ်ချရစေရန် ဘာတွေကို ဂရုစိုက်ပါသလဲ?', en: 'What do you do to keep the vehicle and the goods safe?' },
      ],
    },
    {
      id: 'supply_chain', name: 'Supply Chain Analyst', myanmarName: 'ထောက်ပံ့ရေးကွင်းဆက် ခွဲခြမ်းစိတ်ဖြာသူ',
      keySkills: ['Demand Forecasting', 'Data Analysis', 'Excel / ERP', 'Process Improvement'],
      questions: [
        { my: 'ကုန်ပစ္စည်း ဝယ်လိုအား (Demand) ကို မည်သည့် ဒေတာများဖြင့် ခန့်မှန်းမည်နည်း?', en: 'Which data would you use to forecast product demand?' },
        { my: 'Supply Chain တစ်ခုလုံးတွင် နှောင့်နှေးမှုဖြစ်စေသော နေရာကို မည်သို့ ရှာဖွေမည်နည်း?', en: 'How would you find what is causing delays across the supply chain?' },
        { my: 'နိုင်ငံတကာ ပို့ဆောင်ရေး ပြဿနာကြောင့် ကုန်ပစ္စည်း ပြတ်လပ်လာပါက မည်သို့ ကြိုတင်ပြင်ဆင်မည်နည်း?', en: 'How would you prepare for shortages caused by international shipping problems?' },
      ],
    },
  ],

  receptionist: [
    {
      id: 'receptionist', name: 'Receptionist', myanmarName: 'ဧည့်ကြို',
      keySkills: ['Greeting Visitors', 'Phone Handling', 'Appointment Booking', 'Professional Image'],
      questions: [
        { my: 'ရုံးသို့ ရောက်လာသော ဧည့်သည်ကို မည်သို့ ကြိုဆို လက်ခံမည်နည်း?', en: 'How would you welcome a visitor arriving at the office?' },
        { my: 'ဧည့်သည်များနှင့် ဖုန်းခေါ်ဆိုမှုများ တစ်ပြိုင်နက် ရောက်လာပါက မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'How would you handle visitors and phone calls arriving at the same time?' },
        { my: 'ချိန်းဆိုထားခြင်း မရှိဘဲ မန်နေဂျာကို တွေ့ချင်သော ဧည့်သည်ကို မည်သို့ ယဉ်ကျေးစွာ ကိုင်တွယ်မည်နည်း?', en: 'How would you politely handle a visitor who wants to see the manager without an appointment?' },
      ],
    },
    {
      id: 'hotel_front_desk', name: 'Hotel Front Desk Officer', myanmarName: 'ဟိုတယ် ရှေ့တန်း ဝန်ထမ်း',
      keySkills: ['Check-in / Check-out', 'Reservation System', 'Guest Relations', 'English'],
      questions: [
        { my: 'ဧည့်သည် Check-in လုပ်ချိန် အခန်း မအားသေးပါက မည်သို့ ဖြေရှင်းမည်နည်း?', en: 'What would you do if a guest arrives to check in and their room isn\'t ready?' },
        { my: 'နိုင်ငံခြားသား ဧည့်သည်တစ်ဦး၏ တိုင်ကြားချက်ကို အင်္ဂလိပ်လို မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'How would you handle a complaint from a foreign guest in English?' },
        { my: 'Booking System တွင် အခန်းနှစ်ခါ Booking ဖြစ်နေပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'What would you do if a room has been double-booked in the system?' },
      ],
    },
    {
      id: 'office_assistant', name: 'Office Assistant', myanmarName: 'ရုံးအကူ',
      keySkills: ['Office Support', 'Errands', 'Photocopying / Filing', 'Teamwork'],
      questions: [
        { my: 'ရုံးအကူ ရာထူးအတွက် သင့်အား ဘာကြောင့် ရွေးချယ်သင့်သည်ဟု ထင်ပါသလဲ?', en: 'Why do you think we should choose you for this office assistant role?' },
        { my: 'ဝန်ထမ်းများစွာက တစ်ချိန်တည်း အကူအညီ တောင်းပါက မည်သို့ စီစဉ်လုပ်ဆောင်မည်နည်း?', en: 'If several staff ask for your help at the same time, how would you manage it?' },
        { my: 'ရုံးတွင် သင် ကိုယ်တိုင် စတင်ပြီး ပိုကောင်းအောင် ပြုလုပ်ခဲ့ဖူးသည့် အရာတစ်ခုကို ပြောပြပါ။', en: 'Tell me about something you improved at work on your own initiative.' },
      ],
    },
    {
      id: 'guest_relations', name: 'Guest Relations Officer', myanmarName: 'ဧည့်သည် ဆက်ဆံရေး အရာရှိ',
      keySkills: ['Hospitality', 'Complaint Handling', 'VIP Service', 'Communication'],
      questions: [
        { my: 'VIP ဧည့်သည်တစ်ဦးကို အထူး ဝန်ဆောင်မှု မည်သို့ ပေးမည်နည်း?', en: 'How would you give special service to a VIP guest?' },
        { my: 'ဧည့်သည် ကျေနပ်မှု မရှိခဲ့သော အခြေအနေကို ကျေနပ်မှု ရှိလာအောင် ပြောင်းလဲခဲ့ဖူးပါသလား? ပြောပြပါ။', en: 'Tell me about a time you turned an unhappy guest into a satisfied one.' },
        { my: 'ယဉ်ကျေးမှု မတူညီသော ဧည့်သည်များကို ဝန်ဆောင်မှုပေးရာတွင် ဘာတွေကို သတိထားပါသလဲ?', en: 'What do you keep in mind when serving guests from different cultures?' },
      ],
    },
  ],

  graphic_design: [
    {
      id: 'graphic_designer', name: 'Graphic Designer', myanmarName: 'ဂရပ်ဖစ် ဒီဇိုင်နာ',
      keySkills: ['Photoshop / Illustrator', 'Typography', 'Branding', 'Print Design'],
      questions: [
        { my: 'Brief တစ်ခု ရရှိပြီးနောက် ဒီဇိုင်း စတင်ရေးဆွဲသည်အထိ သင့်လုပ်ငန်းစဉ်ကို ရှင်းပြပါ။', en: 'Walk me through your process from receiving a brief to starting the design.' },
        { my: 'Client က ဒီဇိုင်းကို အကြိမ်ကြိမ် ပြင်ခိုင်းနေပါက မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'How would you handle a client who keeps asking for more changes?' },
        { my: 'မြန်မာစာ Typography ဖြင့် ဒီဇိုင်းလုပ်ရာတွင် ဘာတွေကို ဂရုစိုက်ရပါသလဲ?', en: 'What do you need to watch out for when designing with Myanmar typography?' },
      ],
    },
    {
      id: 'ui_ux_designer', name: 'UI/UX Designer', myanmarName: 'UI/UX ဒီဇိုင်နာ',
      keySkills: ['Figma', 'Wireframes', 'User Testing', 'Design Systems'],
      questions: [
        { my: 'App တစ်ခု၏ User Experience ကို ပိုကောင်းအောင် မည်သို့ သုတေသန ပြုလုပ်မည်နည်း?', en: 'How would you research ways to improve an app\'s user experience?' },
        { my: 'Wireframe မှ Final Design အထိ သင့်လုပ်ငန်းစဉ်ကို ရှင်းပြပါ။', en: 'Explain your process from wireframe to final design.' },
        { my: 'User Testing ရလဒ်က သင့်ဒီဇိုင်း အလုပ်မဖြစ်ကြောင်း ပြသပါက မည်သို့ ဆောင်ရွက်မည်နည်း?', en: 'What would you do if user testing showed your design wasn\'t working?' },
      ],
    },
    {
      id: 'video_editor', name: 'Video Editor', myanmarName: 'ဗီဒီယို တည်းဖြတ်သူ',
      keySkills: ['Premiere Pro / CapCut', 'Storytelling', 'Color Grading', 'Sound'],
      questions: [
        { my: 'ဗီဒီယိုတစ်ခုကို တည်းဖြတ်ရာတွင် ကြည့်ရှုသူ အဆုံးထိ ကြည့်ချင်အောင် မည်သို့ ပြုလုပ်ပါသလဲ?', en: 'How do you edit a video so viewers want to watch to the end?' },
        { my: 'Facebook / TikTok အတွက် ဗီဒီယိုတိုများနှင့် YouTube ဗီဒီယိုရှည်များ တည်းဖြတ်ပုံ ကွာခြားချက်ကို ပြောပြပါ။', en: 'How does editing short videos for Facebook/TikTok differ from long YouTube videos?' },
        { my: 'Deadline နီးကပ်နေချိန် Client က ပြင်ဆင်ချက်များစွာ တောင်းဆိုပါက မည်သို့ စီမံမည်နည်း?', en: 'How would you manage many change requests from a client close to the deadline?' },
      ],
    },
    {
      id: 'motion_designer', name: 'Motion Graphics Designer', myanmarName: 'Motion Graphics ဒီဇိုင်နာ',
      keySkills: ['After Effects', 'Animation', 'Storyboarding', '2D / 3D'],
      questions: [
        { my: 'Motion Graphics Project တစ်ခုကို Storyboard မှ စတင်ပြီး မည်သို့ လုပ်ဆောင်ပါသလဲ?', en: 'How do you work on a motion graphics project, starting from the storyboard?' },
        { my: 'Animation ကို သဘာဝကျပြီး ချောမွေ့အောင် ဘာတွေကို ဂရုစိုက်ပါသလဲ?', en: 'What do you pay attention to so animation feels natural and smooth?' },
        { my: 'သင် ဖန်တီးခဲ့ဖူးသော Animation တစ်ခုနှင့် ၎င်း၏ ရည်ရွယ်ချက်ကို ရှင်းပြပါ။', en: 'Describe an animation you created and what it was meant to achieve.' },
      ],
    },
    {
      id: 'photographer', name: 'Photographer', myanmarName: 'ဓာတ်ပုံဆရာ',
      keySkills: ['Camera & Lighting', 'Photo Editing', 'Product Photography', 'Composition'],
      questions: [
        { my: 'Product ဓာတ်ပုံများကို ရောင်းအားတက်စေမည့်ပုံစံ မည်သို့ ရိုက်ကူးပါသလဲ?', en: 'How do you shoot product photos that help increase sales?' },
        { my: 'အလင်းရောင် မကောင်းသော နေရာတွင် ဓာတ်ပုံကောင်းရအောင် မည်သို့ ပြုလုပ်မည်နည်း?', en: 'How would you get good photos in a place with poor lighting?' },
        { my: 'Lightroom သို့မဟုတ် Photoshop ဖြင့် ဓာတ်ပုံ ပြင်ဆင်ရာတွင် သင့် လုပ်ငန်းစဉ်ကို ပြောပြပါ။', en: 'Tell me about your photo editing process in Lightroom or Photoshop.' },
      ],
    },
  ],

  general_hr: [
    {
      id: 'fresh_graduate', name: 'Fresh Graduate (Entry Level)', myanmarName: 'ကျောင်းပြီးခါစ (အလုပ်အတွေ့အကြုံ မရှိသေးသူ)',
      keySkills: ['Willingness to Learn', 'Communication', 'Teamwork', 'Adaptability'],
      questions: [
        { my: 'အလုပ်အတွေ့အကြုံ မရှိသေးသော်လည်း ဤရာထူးအတွက် သင့်တော်သည်ဟု ဘာကြောင့် ထင်ပါသလဲ?', en: 'You don\'t have work experience yet. Why do you think you are suitable for this job?' },
        { my: 'ကျောင်းတွင် အဖွဲ့လိုက် Project လုပ်ခဲ့ဖူးသည့် အတွေ့အကြုံနှင့် သင့်အခန်းကဏ္ဍကို ပြောပြပါ။', en: 'Tell me about a group project at school or university and the role you played.' },
        { my: 'နောက် ၅ နှစ်အတွင်း သင့်ကိုယ်သင် ဘယ်နေရာမှာ မြင်ချင်ပါသလဲ?', en: 'Where do you see yourself in five years?' },
      ],
    },
    {
      id: 'internship', name: 'Internship', myanmarName: 'အလုပ်သင်',
      keySkills: ['Eagerness', 'Time Management', 'Learning Ability', 'Attitude'],
      questions: [
        { my: 'ဤ Internship မှ ဘာတွေ သင်ယူချင်ပါသလဲ?', en: 'What do you want to learn from this internship?' },
        { my: 'ကျောင်းစာနှင့် Internship ကို တစ်ပြိုင်နက် မည်သို့ စီမံခန့်ခွဲမည်နည်း?', en: 'How will you manage your studies and the internship at the same time?' },
        { my: 'အမှားတစ်ခု ပြုလုပ်မိခဲ့ပြီး ၎င်းမှ သင်ခန်းစာ ယူခဲ့ဖူးသည့် အတွေ့အကြုံကို ပြောပြပါ။', en: 'Tell me about a mistake you made and what you learned from it.' },
      ],
    },
    {
      id: 'career_change', name: 'Career Change', myanmarName: 'အလုပ်အကိုင် နယ်ပယ်ပြောင်းသူ',
      keySkills: ['Transferable Skills', 'Motivation', 'Self-learning', 'Adaptability'],
      questions: [
        { my: 'ယခင် အလုပ်နယ်ပယ်မှ ဘာကြောင့် ပြောင်းလဲလိုပါသလဲ?', en: 'Why do you want to change from your previous field?' },
        { my: 'ယခင်အလုပ်မှ ရရှိခဲ့သော ကျွမ်းကျင်မှုများကို ဤအလုပ်တွင် မည်သို့ အသုံးချမည်နည်း?', en: 'How will you use the skills from your previous job in this role?' },
        { my: 'နယ်ပယ်အသစ်အတွက် ကိုယ်တိုင် ဘာတွေ လေ့လာ ပြင်ဆင်ထားပြီးပါပြီလဲ?', en: 'What have you already done to learn and prepare for this new field?' },
      ],
    },
    {
      id: 'team_leader', name: 'Team Leader / Supervisor', myanmarName: 'အဖွဲ့ခေါင်းဆောင် / ကြီးကြပ်ရေးမှူး',
      keySkills: ['Leadership', 'Delegation', 'Conflict Resolution', 'Coaching'],
      questions: [
        { my: 'သင့်ခေါင်းဆောင်မှုပုံစံကို ဥပမာတစ်ခုဖြင့် ရှင်းပြပါ။', en: 'Describe your leadership style with an example.' },
        { my: 'စွမ်းဆောင်ရည် နိမ့်နေသော အဖွဲ့ဝင်တစ်ဦးကို မည်သို့ ကိုင်တွယ်မည်နည်း?', en: 'How would you deal with a team member who is underperforming?' },
        { my: 'အဖွဲ့ဝင်နှစ်ဦးကြား အငြင်းပွားမှု ဖြစ်ပါက မည်သို့ ဖြေရှင်းမည်နည်း?', en: 'How would you resolve a conflict between two team members?' },
      ],
    },
    {
      id: 'overseas_job', name: 'Overseas Job', myanmarName: 'နိုင်ငံခြား အလုပ်အကိုင်',
      keySkills: ['Adaptability', 'Language Skills', 'Independence', 'Cultural Awareness'],
      questions: [
        { my: 'နိုင်ငံခြားတွင် ဘာကြောင့် အလုပ်လုပ်ချင်ပါသလဲ?', en: 'Why do you want to work abroad?' },
        { my: 'မိသားစုနှင့် ဝေးကွာပြီး ယဉ်ကျေးမှု မတူညီသော ပတ်ဝန်းကျင်တွင် မည်သို့ နေထိုင် လိုက်လျောညီထွေ ဖြစ်အောင် လုပ်မည်နည်း?', en: 'How will you adapt to living far from your family in a different culture?' },
        { my: 'နိုင်ငံခြားသား လုပ်ဖော်ကိုင်ဖက်များနှင့် ဘာသာစကား အခက်အခဲ ရှိပါက မည်သို့ ဖြေရှင်းမည်နည်း?', en: 'How will you deal with language difficulties when working with foreign colleagues?' },
      ],
    },
  ],
};
