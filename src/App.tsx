import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions, OptionLetter } from './questions';

type AppState = 'landing' | 'intro' | 'quiz' | 'loading' | 'lead' | 'result';
type ResultType = 'pm' | 'seo' | 'balanced' | null;

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } }
};

export default function App() {
  const [step, setStep] = useState<AppState>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<OptionLetter[]>([]);
  const [lead, setLead] = useState({ name: '', email: '', whatsapp: '' });
  const [result, setResult] = useState<ResultType>(null);
  
  // Scoring
  const calculateResult = () => {
    let pm = 0, seo = 0;
    answers.forEach(a => {
      if (a === 'A') pm++;
      if (a === 'B') seo++;
    });
    if (pm >= 7 && seo < 5) setResult('pm');
    else if (seo >= 7 && pm < 5) setResult('seo');
    else setResult('balanced');
  };

  const submitLead = async () => {
    // Analytics
    console.log('lead_submitted');
    
    // Calculate before payload
    let pm = 0, seo = 0;
    answers.forEach(a => {
      if (a === 'A') pm++;
      if (a === 'B') seo++;
    });
    
    let calcRes = 'balanced';
    if (pm >= 7 && seo < 5) calcRes = 'pm';
    else if (seo >= 7 && pm < 5) calcRes = 'seo';
    
    const payload = {
      timestamp: new Date().toISOString(),
      name: lead.name,
      email: lead.email,
      whatsapp: lead.whatsapp,
      answers,
      pm_score: pm,
      seo_score: seo,
      result: calcRes
    };
    
    // Simulate App Script POST
    try {
      // await fetch('GOOGLE_APPS_SCRIPT_URL', { method: 'POST', body: JSON.stringify(payload) });
      console.log('Payload Submitted:', payload);
    } catch (e) { }
    setStep('result');
  };

  return (
    <>
      <div className="aurora"></div>
      <div className="grain"></div>
      <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-transparent">
        <div className="font-sans font-bold text-lg tracking-tighter text-white/90">BOLEH<span className="text-magenta-glow">BELAJAR</span></div>
        <div className="font-mono text-xs tracking-widest text-white/50 uppercase">QUIZ • 3 MENIT • TANPA LOGIN</div>
      </header>
      
      <main className="page relative z-10 flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden pt-20 pb-20">
        <AnimatePresence mode="wait">
          {step === 'landing' && <LandingScreen key="landing" onStart={() => setStep('intro')} />}
          {step === 'intro' && <IntroScreen key="intro" onNext={() => setStep('quiz')} />}
          {step === 'quiz' && <QuizScreen 
            key={`q-${currentQuestion}`} 
            qIndex={currentQuestion} 
            onAnswer={(l) => {
              const nextAns = [...answers, l];
              setAnswers(nextAns);
              if (currentQuestion < questions.length - 1) {
                setTimeout(() => setCurrentQuestion(c => c + 1), 600);
              } else {
                setTimeout(() => {
                  calculateResult();
                  setStep('loading');
                  setTimeout(() => setStep('lead'), 3000);
                }, 600);
              }
            }} 
          />}
          {step === 'loading' && <LoadingScreen key="loading" />}
          {step === 'lead' && <LeadScreen key="lead" data={lead} setData={setLead} onSubmit={submitLead} />}
          {step === 'result' && <ResultScreen key="result" result={result} answers={answers} />}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 z-50 flex justify-between items-center text-xs text-white/40 font-sans pointer-events-none">
        <div>#SEMUABOLEHBELAJAR</div>
        <div>BOLEHBELAJAR.COM</div>
      </footer>
    </>
  );
}

// ---------------- SCREENS ---------------- //

function LandingScreen({ onStart }: { onStart: () => void }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit="exit" className="text-center max-w-3xl flex flex-col items-center">
      <motion.div variants={item} className="mb-4">
        <span className="font-mono text-xs opacity-70 tracking-widest text-[var(--cream)] uppercase">
          Quiz • 3 Menit • Tanpa Login
        </span>
      </motion.div>
      <motion.h1 variants={item} className="font-sans font-extrabold text-5xl md:text-7xl lg:text-[80px] leading-tight tracking-[-0.035em] mb-6">
        Performance Marketing <br />
        <span className="italic font-semibold text-gradient text-gradient-magenta-coral">atau</span> SEO?
      </motion.h1>
      <motion.p variants={item} className="text-lg md:text-xl text-[var(--text-secondary)] max-w-[580px] mx-auto mb-12">
        Quiz gratis ini bantu kamu nemuin <strong className="text-white">jalur belajar yang paling cocok</strong> sama kepribadian, gaya kerja, dan tujuan kariermu — biar waktu dan uangmu nggak terbuang sia-sia.
      </motion.p>
      <motion.button variants={item} className="btn-primary mb-12 text-lg" onClick={onStart}>
        Mulai Quiz Gratis &rarr;
      </motion.button>
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        {['12 pertanyaan ringan', 'Hasil personal langsung', 'Bebassss, tanpa download'].map((beni, i) => (
          <div key={i} className="glass-card px-4 py-2 text-sm text-[var(--text-secondary)] border-white/10 rounded-full flex items-center gap-2">
            <span className="text-[var(--magenta-glow)]">✓</span> {beni}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-[600px] w-full">
      <div className="glass-card p-8 md:p-12 border-t-pink-500/20 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">✨ Hei, Learners!</h2>
        <div className="space-y-4 text-[var(--text-secondary)] text-lg mb-8 leading-relaxed text-left">
          <p>Minbel mau ajak kamu ke sebuah simulasi kecil.</p>
          <p>Bayangin: kamu baru aja dapet kesempatan magang <strong className="text-white">1 minggu</strong> di sebuah digital agency di Jakarta. Seru, kan?</p>
          <p>Selama 12 pertanyaan berikutnya, kamu bakal ngadepin situasi-situasi nyata di kantor itu.</p>
          <p>Nggak ada jawaban yang salah — yang ada cuma jawaban yang <strong className="text-white">paling kamu banget</strong>.</p>
          <p>Siap masuk kantor? 🚀</p>
        </div>
        <button className="btn-primary w-full" onClick={onNext}>
          Oke, Minbel masuk dulu! &rarr;
        </button>
      </div>
    </motion.div>
  );
}

function QuizScreen({ qIndex, onAnswer }: { qIndex: number, onAnswer: (l: OptionLetter) => void }) {
  const q = questions[qIndex];
  const [selected, setSelected] = useState<OptionLetter | null>(null);

  const handleSelect = (l: OptionLetter, e: React.MouseEvent<HTMLElement>) => {
    if (selected) return;
    const el = e.currentTarget;
    
    // Ripple Effect Logic
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ripple);
    
    setTimeout(() => {
      try {
        ripple.remove();
      } catch (err) {}
    }, 600);

    setSelected(l);
    onAnswer(l);
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-[720px] w-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="font-mono text-xs tracking-widest text-white/60 uppercase">
          Question <span className="text-white font-bold">{(qIndex + 1).toString().padStart(2, '0')}</span> / 12
        </div>
        <div className="flex gap-[4px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === qIndex ? 'bg-[var(--magenta-glow)] scale-125' : i < qIndex ? 'bg-white/40' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <div className="scene-context mb-8">
        <span className="scene-label">{q.sceneLabel}</span>
        <span className="scene-text">{q.sceneText}</span>
      </div>

      <h1 className="text-3xl md:text-[44px] font-bold leading-tight tracking-[-0.02em] mb-10 text-white line-clamp-3">
        {q.question}
      </h1>

      <div className="w-full">
        <QuizUXFormat format={q.format} options={q.options} selected={selected} onSelect={handleSelect} />
      </div>
      {(['split-card', 'mock-feed', 'timeline', 'forked-path', 'reaction-spectrum', 'brief-card'].includes(q.format)) && q.options.find(o => !o.headline && !o.icon && o.letter === 'C') && (
        <OptionFallback option={q.options.find(o => !o.headline && !o.icon && o.letter === 'C')!} selected={selected} onSelect={handleSelect} />
      )}
    </motion.div>
  );
}

function LoadingScreen() {
  const texts = [
    "✨ Minbel lagi analisis jawaban kamu...",
    "🔍 Ngebandingin profil kamu sama ribuan learner lainnya...",
    "🧠 Ini bukan tebak-tebakan — ini beneran diperhitungkan...",
    "🎯 Hampir selesai... hasil kamu udah mau keluar nih!"
  ];
  const [textIdx, setTextIdx] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      setTextIdx(i => (i + 1) % texts.length);
    }, 1500);
    return () => clearInterval(int);
  }, []);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="text-center flex flex-col items-center">
      <div className="flex gap-4 mb-8">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="w-4 h-4 rounded-full bg-[var(--magenta-glow)] shadow-[var(--glow-magenta)]"
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={textIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-medium text-white max-w-md"
        >
          {texts[textIdx]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function LeadScreen({ data, setData, onSubmit }: any) {
  const [err, setErr] = useState('');
  const submit = (e: any) => {
    e.preventDefault();
    if (!data.name || !data.email) {
      setErr('Nama dan Email wajib diisi ya!');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setErr('Format emailnya kayaknya kurang pas nih.');
      return;
    }
    onSubmit();
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-[480px]">
      <div className="glass-card p-8 md:p-10 border-t-[var(--magenta-glow)]/30">
        <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">Hasil kamu udah siap nih! ✨</h2>
        <p className="text-[var(--text-secondary)] mb-8">Tinggal masukin nama + email/WA kamu, terus langsung Minbel kasih tau rekomendasinya~</p>
        
        <form onSubmit={submit} className="flex flex-col gap-5">
          <input 
            type="text" 
            placeholder="Nama lengkap" 
            className="input-field" 
            value={data.name} 
            onChange={e => setData({ ...data, name: e.target.value })} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="input-field" 
            value={data.email} 
            onChange={e => setData({ ...data, email: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="WhatsApp (opsional)" 
            className="input-field" 
            value={data.whatsapp} 
            onChange={e => setData({ ...data, whatsapp: e.target.value })} 
          />
          {err && <div className="text-red-400 text-sm mt-1">{err}</div>}
          <button type="submit" className="btn-primary w-full mt-2">Lihat Hasil Saya &rarr;</button>
          
          <div className="text-center mt-4">
            <span className="text-xs text-[var(--text-tertiary)] bg-black/20 p-2 rounded-md inline-block">
              🔒 Datamu cuma buat kirim hasil. Nggak bakal kami spam, promise!
            </span>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

function ResultScreen({ result, answers }: { result: ResultType, answers: any[] }) {
  const isPM = result === 'pm';
  const isSEO = result === 'seo';
  const isBalanced = result === 'balanced' || result === null;

  const gradientCls = isPM ? 'bg-gradient-to-br from-[#BD214C]/40 to-transparent' : isSEO ? 'bg-gradient-to-br from-[#EA5543]/40 to-transparent' : 'bg-gradient-to-br from-[#FF3D7A]/40 via-[#BD214C]/20 to-transparent';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 w-full min-h-screen overflow-y-auto">
      <div className={`fixed inset-0 pointer-events-none ${gradientCls} z-0 opacity-80 mix-blend-screen`}></div>
      <div className="relative z-10 max-w-4xl mx-auto pt-32 pb-32 px-6">
        <div className="text-center mb-12">
          <span className="font-mono text-sm tracking-widest text-white/50 uppercase mb-6 inline-block">★ HASIL QUIZ KAMU</span>
          <p className="italic text-[var(--text-secondary)] text-lg mb-6">"Minggu magang selesai. Manager senyum sambil bilang..."</p>
          
          {isPM && (
            <h1 className="font-sans font-extrabold text-5xl md:text-[80px] leading-none tracking-tight text-white mb-8">
              🚀 Kamu Tipe <br /><span className="text-gradient text-gradient-magenta-coral">Performance Marketer!</span>
            </h1>
          )}
          {isSEO && (
            <h1 className="font-sans font-extrabold text-5xl md:text-[80px] leading-none tracking-tight text-white mb-8">
              🌱 Kamu Tipe <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA5543] to-orange-400">SEO Specialist!</span>
            </h1>
          )}
          {isBalanced && (
            <h1 className="font-sans font-extrabold text-5xl md:text-[70px] leading-tight tracking-tight text-white mb-8">
              🌟 Kamu Punya <br /><span className="text-gradient text-gradient-magenta-coral">Potensi Keduanya!</span>
            </h1>
          )}
        </div>

        <div className="glass-card p-8 md:p-12 mb-10 max-w-3xl mx-auto text-lg text-white/90 leading-relaxed border-t-white/10">
          {isPM && (
            <>
              <p className="italic mb-6 text-[var(--text-secondary)]">"Selama seminggu ini, kamu yang paling antusias waktu ngelihat sesuatu langsung berdampak. Kamu nggak terlalu sabar kalau hasilnya nggak keliatan hari ini — dan itu bukan kelemahan, itu kekuatan. Orang kayak gitu yang biasanya paling cepat berkembang di dunia yang bergerak cepat."</p>
              <p>Dari jawaban kamu, keliatan banget kalau kamu suka ngelihat hasil langsung, nggak takut eksperimen, dan excited banget kalau bisa ngukur dampak kerja kamu dalam angka. Itu mindset yang bener-bener dibutuhin di dunia iklan digital.</p>
            </>
          )}
          {isSEO && (
            <>
              <p className="italic mb-6 text-[var(--text-secondary)]">"Selama seminggu ini, kamu yang paling nyaman bangun sesuatu yang bertahan lama. Kamu sabar, teliti, dan nggak gampang panik kalau hasilnya nggak instan. Justru itu yang bikin orang kayak kamu jadi aset berharga — karena yang kamu bangun biasanya tahan lama."</p>
              <p>Kamu lebih suka kerja mendalam, sabar dengan proses, dan puas banget kalau sesuatu yang kamu bangun bisa tumbuh secara organik. Itu persis mindset yang bikin seseorang jago di SEO.</p>
            </>
          )}
          {isBalanced && (
            <>
              <p className="italic mb-6 text-[var(--text-secondary)]">"Selama seminggu ini, kamu nunjukin kamu punya flexibility yang nggak semua orang punya. Kamu bisa masuk ke dua dunia yang berbeda — dan itu nilai lebih. Tantangannya sekarang: pilih satu dulu buat dikuasain, baru explore yang lain."</p>
              <p>Jawaban kamu nunjukin kamu belum condong kuat ke satu arah — dan itu bukan hal yang buruk sama sekali. Kamu punya fleksibilitas yang jadi nilai plus. Sekarang tinggal cari tahu mana yang bikin kamu makin semangat.</p>
            </>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {isPM && (
            <>
              <div className="glass-card p-8 border-t-[var(--magenta)]/30">
                <span className="font-mono text-xs tracking-widest text-[#FF3D7A] uppercase mb-4 block">SKILL YANG DIPELAJARI</span>
                <ul className="space-y-3 text-white/80">
                  <li>• Setup & optimasi Meta Ads + Google Ads</li>
                  <li>• A/B testing & creative iteration</li>
                  <li>• ROAS analysis & budget scaling</li>
                  <li>• Funnel marketing end-to-end</li>
                  <li>• Membaca data campaign</li>
                </ul>
              </div>
              <div className="glass-card p-8 border-t-[var(--magenta)]/30">
                <span className="font-mono text-xs tracking-widest text-[#FF3D7A] uppercase mb-4 block">CAREER PATH</span>
                <ul className="space-y-3 text-white/80">
                  <li>• Performance Marketing Specialist</li>
                  <li>• Paid Ads Strategist di agency</li>
                  <li>• Growth Marketer di startup</li>
                  <li>• Freelance media buyer (cuan!)</li>
                </ul>
              </div>
            </>
          )}
          {isSEO && (
            <>
              <div className="glass-card p-8 border-t-[#EA5543]/30">
                <span className="font-mono text-xs tracking-widest text-[#EA5543] uppercase mb-4 block">SKILL YANG DIPELAJARI</span>
                <ul className="space-y-3 text-white/80">
                  <li>• Keyword research & content strategy</li>
                  <li>• On-page & off-page SEO</li>
                  <li>• Technical SEO dasar</li>
                  <li>• Google Search Console & Analytics</li>
                  <li>• Link building & outreach</li>
                </ul>
              </div>
              <div className="glass-card p-8 border-t-[#EA5543]/30">
                <span className="font-mono text-xs tracking-widest text-[#EA5543] uppercase mb-4 block">CAREER PATH</span>
                <ul className="space-y-3 text-white/80">
                  <li>• SEO Specialist (in-house atau agency)</li>
                  <li>• Content Strategist</li>
                  <li>• Freelance SEO consultant</li>
                  <li>• Digital Marketing Manager</li>
                </ul>
              </div>
            </>
          )}
          {isBalanced && (
            <>
               <div className="glass-card p-8 border-t-[var(--magenta)]/30">
                <span className="font-mono text-xs tracking-widest text-white/50 uppercase mb-4 block">Performance Marketing cocok kalau kamu...</span>
                <ul className="space-y-3 text-white/80">
                  <li>• Suka hasil yang cepat keliatan</li>
                  <li>• Nyaman dengan angka & data harian</li>
                  <li>• Excited eksperimen iteratif</li>
                  <li>• Goal: dampak terukur jangka pendek</li>
                </ul>
              </div>
              <div className="glass-card p-8 border-t-[#EA5543]/30">
                <span className="font-mono text-xs tracking-widest text-white/50 uppercase mb-4 block">SEO cocok kalau kamu...</span>
                <ul className="space-y-3 text-white/80">
                  <li>• Sabar dengan proses panjang</li>
                  <li>• Suka riset mendalam</li>
                  <li>• Nyaman bangun aset jangka panjang</li>
                  <li>• Goal: trafik organik berkelanjutan</li>
                </ul>
              </div>
            </>
          )}
        </div>

        <div className="glass-card p-10 text-center mb-12 bg-white/[0.02]">
          <h3 className="text-2xl font-bold mb-2">
            Rekomendasi: {isPM ? 'Performance Marketing Bootcamp' : isSEO ? 'SEO Bootcamp' : 'Ngobrol Dulu Aja'} — Boleh Belajar
          </h3>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            {isPM && 'Kurikulum berbasis real case dari agency. Kamu bakal langsung praktek kelola campaign nyata, bukan cuma teori.'}
            {isSEO && 'Pelajari SEO dari dasar sampai bisa praktek mandiri dengan panduan mentor yang aktif di industri.'}
            {isBalanced && 'Kalau bingung harus mulai dari mana, Performance Marketing biasanya lebih cepat memberikan hasil yang terukur. SEO cocok buat yang sabar. Ngobrol sama tim Minbel — gratis!'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://bolehbelajar.com" target="_blank" rel="noreferrer" className="btn-primary">
              {isPM ? 'Yuk gas Bootcamp PM 🚀' : isSEO ? 'Yuk gas Bootcamp SEO 🌱' : 'Ngobrol Sama Tim — Gratis!'}
            </a>
            <a href="https://bolehbelajar.com/konsultasi" target="_blank" rel="noreferrer" className="btn-secondary">
              {isBalanced ? 'Lihat Semua Program Bootcamp' : 'Konsultasi gratis dulu~'}
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ---------------- EXTRAS ---------------- //

function OptionFallback({ option, selected, onSelect }: any) {
  return (
    <div 
      className={`glass-card p-4 mt-4 cursor-pointer transition-all duration-300 transform relative overflow-hidden ${selected === option.letter ? 'border-[var(--magenta)] shadow-[var(--glow-magenta)] bg-[var(--surface-glass-active)]' : 'hover:-translate-y-1 hover:border-white/20 hover:bg-[var(--surface-glass-hover)]'} ${selected && selected !== option.letter ? 'opacity-40 scale-[0.98]' : ''}`}
      onClick={(e) => onSelect(option.letter, e)}
    >
      <div className="text-[var(--text-secondary)] text-sm text-center">{option.text}</div>
    </div>
  )
}

function QuizUXFormat({ format, options, selected, onSelect }: any) {
  // Shared props logic for selected / disabled
  const cardClass = (opt: any) => `glass-card p-5 cursor-pointer flex items-center transition-all duration-300 relative overflow-hidden ${selected === opt.letter ? 'border-[var(--magenta)] shadow-[var(--glow-magenta)] bg-[var(--surface-glass-active)]' : 'hover:-translate-y-1 hover:border-white/20 hover:bg-[var(--surface-glass-hover)]'} ${selected && selected !== opt.letter ? 'opacity-40 scale-[0.98]' : ''}`;
  
  if (format === 'stacked-cards') {
    return (
      <div className="flex flex-col gap-4">
        {options.map((o: any) => (
          <div key={o.letter} className={cardClass(o)} onClick={(e) => onSelect(o.letter, e)}>
            <div className="text-4xl mr-5">{o.icon}</div>
            <div className="flex-1 text-[var(--text-primary)] font-medium md:text-lg">{o.text}</div>
            <div className="font-mono text-sm opacity-30 text-right">{o.letter}</div>
          </div>
        ))}
      </div>
    );
  }

  if (format === 'horizontal-radio') {
    return (
      <div className="flex flex-col gap-3">
        {options.map((o: any) => (
          <div key={o.letter} className={`${cardClass(o)} py-4 pl-6 ${selected === o.letter ? 'border-l-4 border-l-[var(--magenta)]' : 'border-l-0'}`} onClick={(e) => onSelect(o.letter, e)}>
            <div className="text-3xl mr-4">{o.icon}</div>
            <div className="flex-1 font-medium">{o.text}</div>
          </div>
        ))}
      </div>
    );
  }

  if (format === 'split-card') {
    return (
      <div className="flex flex-col md:flex-row gap-4">
        {options.filter((o:any) => o.headline).map((o: any) => (
          <div key={o.letter} className={`flex-1 ${cardClass(o)} flex flex-col justify-center text-center p-8 md:p-10`} onClick={(e) => onSelect(o.letter, e)}>
            <div className="text-xl md:text-2xl font-bold mb-4 leading-snug">{o.headline}</div>
            <div className="text-sm text-[var(--text-secondary)] italic">{o.subtext}</div>
          </div>
        ))}
      </div>
    );
  }

  if (format === 'chat-bubble') {
    const aligns = ['self-start', 'self-end', 'self-center text-sm opacity-80 max-w-[80%]'];
    return (
      <div className="flex flex-col gap-6 p-4">
        {options.map((o: any, i: number) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            key={o.letter} 
            className={`${aligns[i]} ${selected === o.letter ? 'border-[var(--magenta)] shadow-[var(--glow-magenta)] bg-[var(--surface-glass-active)]' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'} p-4 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 ${selected && selected !== o.letter ? 'opacity-30 scale-95' : ''}`}
            onClick={(e: any) => onSelect(o.letter, e)}
            style={{ borderRadius: i === 0 ? '16px 16px 16px 2px' : i === 1 ? '16px 16px 2px 16px' : '16px' }}
          >
            {o.text}
          </motion.div>
        ))}
      </div>
    );
  }
  
  if (format === 'mock-feed') {
    return (
      <div className="flex flex-col md:flex-row gap-6">
        {options.filter((o:any) => o.headline).map((o: any, i: number) => (
          <div key={o.letter} className={`flex-1 aspect-[4/5] p-6 rounded-2xl cursor-pointer overflow-hidden relative flex flex-col transition-all duration-300 ${selected === o.letter ? 'shadow-[var(--glow-magenta)] scale-100 ring-2 ring-[var(--magenta)]' : 'hover:scale-[1.03] hover:ring-1 ring-white/20'} ${selected && selected !== o.letter ? 'opacity-30 scale-95' : ''}`} onClick={(e) => onSelect(o.letter, e)}>
            {i === 0 ? (
               <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D7A] to-[#EA5543] opacity-90 z-0"></div>
            ) : (
               <div className="absolute inset-0 bg-[var(--surface-warm)] border border-[var(--cream)]/10 z-0 backdrop-blur-xl"></div>
            )}
            <div className="relative z-10 flex flex-col h-full justify-center text-center">
              {i === 0 && <span className="text-[10px] uppercase font-mono tracking-widest mb-4 bg-black/20 self-center px-2 py-1 rounded">Sponsored</span>}
              <div className={`text-2xl font-bold mb-4 leading-tight ${i === 0 ? 'text-white' : 'text-[#F9EDDE]'}`}>{o.headline}</div>
              <div className={`text-sm italic mt-auto ${i === 0 ? 'text-white/80' : 'text-[var(--cream)]/60'}`}>{o.subtext}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (format === 'badges') {
    return (
      <div className="flex flex-col gap-4">
        {options.map((o: any, i: number) => (
          <div key={o.letter} className={`${cardClass(o)} py-5 relative`} onClick={(e) => onSelect(o.letter, e)}>
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-20 pointer-events-none ${i === 0 ? 'bg-orange-500' : i === 1 ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
            <div className="relative z-10 font-medium md:text-lg">{o.text}</div>
          </div>
        ))}
      </div>
    );
  }

  if (format === 'timeline') {
    return (
      <div className="flex flex-col gap-4">
        {options.filter((o:any) => o.headline).map((o: any) => (
          <div key={o.letter} className={`${cardClass(o)} flex flex-col gap-2 group`} onClick={(e) => onSelect(o.letter, e)}>
             <div className="font-mono text-sm tracking-[0.2em] text-[var(--magenta-glow)]">{o.headline}</div>
             <div className="text-xl font-bold">{o.text}</div>
             <div className="text-sm text-[var(--text-secondary)] italic group-hover:text-white transition-colors">{o.subtext}</div>
          </div>
        ))}
      </div>
    );
  }

  if (format === 'forked-path') {
    return (
      <div className="flex flex-col md:flex-row gap-4 relative">
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/5 hidden md:block"></div>
        {options.filter((o:any) => o.headline).map((o: any) => (
          <div key={o.letter} className={`flex-1 ${cardClass(o)} flex flex-col gap-3 p-6 group`} onClick={(e) => onSelect(o.letter, e)}>
             <div className="text-4xl group-hover:scale-125 transition-transform origin-left">{o.icon}</div>
             <div className="text-lg font-bold">{o.headline}</div>
             <div className="text-sm text-[var(--text-secondary)] italic">{o.text}</div>
          </div>
        ))}
      </div>
    );
  }

  if (format === 'reaction-spectrum') {
    return (
      <div className="flex flex-col md:flex-row gap-4 items-stretch mb-4 -mx-10 md:mx-0 justify-center">
         {options.filter((o:any) => o.icon).map((o: any) => (
          <div key={o.headline} className={`flex-1 ${cardClass(o)} flex flex-col items-center flex-wrap text-center py-6 px-2 hover:-translate-y-2`} onClick={(e) => onSelect(o.letter, e)}>
             <div className={`text-4xl md:text-6xl mb-4 transition-transform duration-300 ${selected === o.letter ? 'scale-125' : ''} ${o.headline === 'Excited!' ? 'group-hover:animate-bounce' : ''}`}>{o.icon}</div>
             <div className="font-bold text-sm md:text-base leading-tight mb-2">{o.headline}</div>
             <div className="text-xs text-[var(--text-tertiary)] italic hidden md:block">{o.subtext}</div>
          </div>
        ))}
      </div>
    );
  }

  if (format === 'speech-bubble') {
    return (
      <div className="flex flex-col gap-4">
        {options.map((o: any) => (
          <div key={o.letter} className={`${cardClass(o)} font-mono text-sm md:text-base tracking-tight`} onClick={(e) => onSelect(o.letter, e)}>
            &gt; {o.text}
            {selected === o.letter && <span className="animate-pulse bg-white/70 w-2 h-4 inline-block ml-1 align-middle"></span>}
          </div>
        ))}
      </div>
    );
  }

  if (format === 'brief-card') {
    return (
      <div className="flex flex-col md:flex-row gap-4">
        {options.filter((o:any) => o.headline).map((o: any) => (
          <div key={o.letter} className={`flex-1 ${cardClass(o)} flex flex-col p-8 group`} style={{ perspective: '1000px' }} onClick={(e) => onSelect(o.letter, e)}>
             <div className="text-xl md:text-2xl font-bold mb-4">{o.headline}</div>
             <div className="text-sm text-[var(--text-tertiary)] italic font-mono mb-6 pb-6 border-b border-white/10 opacity-60">Brief Spec</div>
             <div className="text-[var(--text-secondary)] italic mb-6 leading-relaxed group-hover:text-white transition-colors">{o.text}</div>
             <div className="mt-auto pt-4 flex gap-2 overflow-hidden flex-wrap">
               <span className="text-[10px] font-mono tracking-widest uppercase bg-white/10 px-2 py-1 rounded">{o.vibe}</span>
             </div>
             {selected === o.letter && (
                <motion.div initial={{ scale: 2, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: -15 }} className="absolute -top-4 -right-4 px-3 py-1 bg-[var(--magenta)] text-white font-black tracking-widest text-xl border-4 border-white/20 z-20">
                  CHOSEN
                </motion.div>
             )}
          </div>
        ))}
      </div>
    );
  }

  if (format === 'polaroid') {
    const rots = ['-rotate-3', 'rotate-2', '-rotate-1'];
    return (
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch pl-10 md:pl-0 pr-10 md:pr-0">
        {options.map((o: any, i: number) => (
          <motion.div 
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.15 }}
            key={o.letter} className={`flex-1 w-full bg-[#f9f9fa] p-4 pb-8 shadow-xl cursor-pointer transition-all duration-300 relative ${selected === o.letter ? 'scale-105 z-20 shadow-[var(--glow-magenta)]' : `hover:scale-105 z-10 hover:z-20 shadow-gray-900/50 ${rots[i]}`} ${selected && selected !== o.letter ? 'opacity-40 grayscale' : ''}`}
            onClick={(e: any) => onSelect(o.letter, e)}
          >
             <div className="bg-gray-100 aspect-square mb-6 flex items-center justify-center text-5xl md:text-7xl shadow-inner border border-black/5">
                {o.icon}
             </div>
             <div className="font-sans text-gray-800 text-sm md:text-base font-semibold italic text-center px-2">
               {o.text}
             </div>
             {selected === o.letter && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md animate-bounce border-2 border-white/80"></div>}
          </motion.div>
        ))}
      </div>
    );
  }

  // fallback
  return (
    <div className="flex flex-col gap-4">
      {options.map((o: any) => (
        <div key={o.letter} className={cardClass(o)} onClick={(e) => onSelect(o.letter, e)}>
          {o.text}
        </div>
      ))}
    </div>
  )
}
