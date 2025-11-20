import { useState } from 'react'
import { Globe, Lock, BarChart3, Users, MessageCircle, FileText } from 'lucide-react'

const langs = {
  en: {
    title: 'Community Savings',
    subtitle: 'A platform for transparent community finance',
    member: 'Member',
    admin: 'Admin',
    login: 'Log in',
    signup: 'Sign up',
    featuresTitle: 'Key features',
    features: [
      'Multilingual interface (English, Arabic, Kiswahili, Kinyarwanda)',
      'Secure login for members and admins',
      'Financial dashboards & audit logs',
      'Deposits with file proof & admin review',
      'Loan applications with rules & limits',
      'Member-to-member live chat',
      'Annual financial reports (download/print)'
    ],
    mission: 'Our mission is to empower communities with transparent, accountable savings and lending tools.'
  },
  ar: {
    title: 'مدخرات المجتمع',
    subtitle: 'منصة للتمويل المجتمعي الشفاف',
    member: 'عضو',
    admin: 'مشرف',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    featuresTitle: 'الميزات الرئيسية',
    features: [
      'واجهة متعددة اللغات (الإنجليزية، العربية، السواحيلية، الكينيارواندية)',
      'تسجيل دخول آمن للأعضاء والمشرفين',
      'لوحات مالية وسجلات تدقيق',
      'إيداعات مع إثبات بالملفات ومراجعة المشرف',
      'طلبات قروض بقواعد وحدود',
      'دردشة مباشرة بين الأعضاء',
      'تقارير مالية سنوية (تنزيل/طباعة)'
    ],
    mission: 'نهدف إلى تمكين المجتمعات بأدوات ادخار وإقراض شفافة ومسؤولة.'
  },
  sw: {
    title: 'Akiba ya Jamii',
    subtitle: 'Jukwaa la fedha za jamii kwa uwazi',
    member: 'Mwanachama',
    admin: 'Msimamizi',
    login: 'Ingia',
    signup: 'Jisajili',
    featuresTitle: 'Vipengele Muhimu',
    features: [
      'Kiolesura cha lugha nyingi (Kiingereza, Kiarabu, Kiswahili, Kinyarwanda)',
      'Kuingia salama kwa wanachama na wasimamizi',
      'Dashibodi za kifedha na rekodi za ukaguzi',
      'Amana zenye vielelezo vya faili na uhakiki wa msimamizi',
      'Maombi ya mkopo yenye kanuni na mipaka',
      'Ujumbe wa moja kwa moja kati ya wanachama',
      'Ripoti za kifedha za kila mwaka (pakua/chapisha)'
    ],
    mission: 'Dhamira yetu ni kuwawezesha jamii kwa zana za akiba na mikopo zenye uwazi.'
  },
  rw: {
    title: 'Ubwizigame bw’Abaturage',
    subtitle: 'Urubuga rw’imari rusangiye mu mucyo',
    member: 'Umunyamuryango',
    admin: 'Umunyamabanga',
    login: 'Injira',
    signup: 'Iyandikishe',
    featuresTitle: 'Ibiranga by’ingenzi',
    features: [
      'Imikoreshereze mu ndimi nyinshi (Icyongereza, Icyarabu, Igiswayire, Ikinyarwanda)',
      'Kwinjira kwiziguye ku banyamuryango n’abayobozi',
      'Dashboard z’imari na raporo z’igenzura',
      'Kubitsa n’ibimenyetso by’amafayili no kugenzurwa n’umuyobozi',
      'Gusaba inguzanyo n’amategeko n’imipaka',
      'Ubutumwa butaziguye hagati y’abanyamuryango',
      'Raporo z’umwaka wose (gukuramo/guprinta)'
    ],
    mission: 'Intego ni uguhuza imbaraga z’abaturage dukoresheje ibikoresho by’ukwizigama no kugurizanya mu mucyo.'
  }
}

export default function Landing({ onChooseAuth }) {
  const [lang, setLang] = useState('en')
  const t = langs[lang]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-300" />
          </div>
          <span className="font-semibold">{t.title}</span>
        </div>
        <select value={lang} onChange={(e)=>setLang(e.target.value)} className="bg-slate-800/60 border border-slate-700 rounded px-3 py-1">
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="sw">Kiswahili</option>
          <option value="rw">Kinyarwanda</option>
        </select>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t.title}</h1>
          <p className="text-slate-300 mb-6">{t.subtitle}</p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <button onClick={() => onChooseAuth('member','login')} className="bg-blue-600 hover:bg-blue-500 transition rounded px-4 py-3 flex items-center gap-2">
              <Lock className="w-4 h-4" /> {t.login} ({t.member})
            </button>
            <button onClick={() => onChooseAuth('member','signup')} className="bg-slate-700 hover:bg-slate-600 transition rounded px-4 py-3">
              {t.signup} ({t.member})
            </button>
            <button onClick={() => onChooseAuth('admin','login')} className="bg-emerald-600 hover:bg-emerald-500 transition rounded px-4 py-3">
              {t.login} ({t.admin})
            </button>
            <button onClick={() => onChooseAuth('admin','signup')} className="bg-slate-700 hover:bg-slate-600 transition rounded px-4 py-3">
              {t.signup} ({t.admin})
            </button>
          </div>

          <p className="text-slate-300 mb-4">{t.mission}</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <h2 className="font-semibold flex items-center gap-2"><BarChart3 className="w-5 h-5"/> {t.featuresTitle}</h2>
          <ul className="space-y-2 text-slate-300">
            {t.features.map((f,i)=> (
              <li key={i} className="flex items-start gap-2"><span className="text-blue-400">•</span> <span>{f}</span></li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-3 gap-3 text-slate-300">
            <div className="bg-slate-800/50 p-4 rounded border border-slate-700"><Users className="w-5 h-5 mb-2"/> Users</div>
            <div className="bg-slate-800/50 p-4 rounded border border-slate-700"><MessageCircle className="w-5 h-5 mb-2"/> Chat</div>
            <div className="bg-slate-800/50 p-4 rounded border border-slate-700"><FileText className="w-5 h-5 mb-2"/> Reports</div>
          </div>
        </div>
      </main>
    </div>
  )
}
