import { ReactNode } from 'react';

export type OptionLetter = 'A' | 'B' | 'C';

export interface QuestionData {
  id: number;
  sceneLabel: string;
  sceneText: string;
  question: string;
  format: 'stacked-cards' | 'horizontal-radio' | 'split-card' | 'chat-bubble' | 'mock-feed' | 'badges' | 'timeline' | 'forked-path' | 'reaction-spectrum' | 'speech-bubble' | 'brief-card' | 'polaroid';
  options: {
    letter: OptionLetter;
    icon?: string;
    text?: string;
    headline?: string;
    subtext?: string;
    style?: any;
    vibe?: string;
  }[];
}

export const questions: QuestionData[] = [
  {
    id: 1,
    sceneLabel: 'SCENE 01 ☕',
    sceneText: 'Senin pagi. Kamu baru duduk, kopi belum habis, tiba-tiba ada rapat kilat.',
    question: 'Tim lagi bahas dua project besar minggu ini. Kamu lebih excited yang mana?',
    format: 'stacked-cards',
    options: [
      { letter: 'A', icon: '🎯', text: 'Bikin sesuatu yang bisa langsung diluncurkan dan diukur hasilnya dalam hitungan hari' },
      { letter: 'B', icon: '🌱', text: 'Bangun sesuatu pelan-pelan yang hasilnya baru keliatan beberapa bulan ke depan' },
      { letter: 'C', icon: '🤷', text: 'Dua-duanya kedengeran oke sih... boleh dipikir dulu?' }
    ]
  },
  {
    id: 2,
    sceneLabel: 'SCENE 02 💸',
    sceneText: 'Manager kamu taruh amplop di meja. "Ini budget eksperimen minggu ini. Bebas kamu pakai buat apa."',
    question: 'Uang itu bakal kamu pakai buat apa duluan?',
    format: 'horizontal-radio',
    options: [
      { letter: 'A', icon: '🚀', text: 'Langsung coba sesuatu yang hasilnya bisa keliatan minggu ini juga' },
      { letter: 'B', icon: '🌿', text: 'Bangun fondasi dulu — hasilnya nggak instant, tapi bisa bertahan lama' },
      { letter: 'C', icon: '🔀', text: 'Bagi dua aja — coba keduanya sekalian' }
    ]
  },
  {
    id: 3,
    sceneLabel: 'SCENE 03 📱',
    sceneText: 'WA masuk dari klien: "Gimana progressnya minggu ini?"',
    question: 'Laporan mana yang lebih nyaman kamu kasih ke klien?',
    format: 'split-card',
    options: [
      { letter: 'A', headline: '📊 "Kita udah reach 50.000 orang. Konversinya naik 2x dari minggu lalu. Besok kita bisa gas lebih jauh."', subtext: 'Progres cepat, angka konkret hari ini' },
      { letter: 'B', headline: '📈 "Kita udah di posisi yang bagus. Masih butuh 2-3 minggu lagi, tapi arah dan tren-nya positif banget."', subtext: 'Proses panjang, tapi arahnya jelas' },
      { letter: 'C', text: '🤔 Jujur, dua-duanya masih bikin gue deg-degan' }
    ]
  },
  {
    id: 4,
    sceneLabel: 'SCENE 04 😱',
    sceneText: 'Tiba-tiba senior kamu teriak dari seberang ruangan: "Eh, angkanya kenapa tiba-tiba turun???"',
    question: 'Kamu yang disuruh investigasi. Reaksi pertama kamu?',
    format: 'chat-bubble',
    options: [
      { letter: 'A', text: 'Langsung buka datanya, bandingin sama kemarin, coba ubah sesuatu sekarang juga' },
      { letter: 'B', text: 'Tenang dulu, lihat polanya beberapa hari ke belakang, baru ambil kesimpulan' },
      { letter: 'C', text: '...Cari senior dulu. Minta tolong dulu. Paniknya nanti aja.' }
    ]
  },
  {
    id: 5,
    sceneLabel: 'SCENE 05 🍜',
    sceneText: 'Jam makan siang, tim lagi scrolling bareng sambil nunggu pesanan dateng.',
    question: 'Dua konten muncul berurutan di feed. Kamu instingtif lebih tertarik yang mana?',
    format: 'mock-feed',
    options: [
      { letter: 'A', headline: 'Promo Cuma Hari Ini!', subtext: 'Visual ajakan langsung bertindak' },
      { letter: 'B', headline: '5 Hal yang Perlu Kamu Tahu Sebelum Mulai Berkebun', subtext: 'Estimasi baca 5 menit' },
      { letter: 'C', text: 'Gue instinct-nya malah langsung cari yang bikin ketawa dulu 😭' }
    ]
  },
  {
    id: 6,
    sceneLabel: 'SCENE 06 🌇',
    sceneText: 'Sore menjelang pulang. Kamu ngebayangin: kalau kerja keras ini berhasil, seperti apa rasanya?',
    question: 'Skenario mana yang paling bikin kamu puas banget?',
    format: 'badges',
    options: [
      { letter: 'A', text: '🏆 "Klien nelepon langsung. Bilang hasil kerja kamu minggu ini bikin angkanya meledak. Mereka minta dilanjut lebih besar besok."' },
      { letter: 'B', text: '🌳 "Tiga bulan kemudian, sesuatu yang kamu bangun minggu ini masih terus mendatangkan orang baru — tanpa perlu effort tambahan."' },
      { letter: 'C', text: '✨ "Dua-duanya kedengeran epic. Boleh pilih dua nggak?"' }
    ]
  },
  {
    id: 7,
    sceneLabel: 'SCENE 07 ⏰',
    sceneText: 'Rabu siang. Manager minta update. Kamu sadar progress butuh waktu lebih dari yang diperkirakan.',
    question: 'Kamu lebih nyaman kerja di ritme yang mana?',
    format: 'timeline',
    options: [
      { letter: 'A', headline: 'Hari 1 ──── Hari 3 ──── Hari 7', text: 'Siapkan → Jalankan → Perbaiki', subtext: '🟢 Hasilnya bisa keliatan mulai hari ke-3' },
      { letter: 'B', headline: 'Minggu 1 ─── Bulan 1 ─── Bulan 3', text: 'Riset → Bangun → Tumbuh', subtext: '🌱 Hasilnya makin kuat seiring waktu' },
      { letter: 'C', text: 'Gue belum pernah kerja di kedua ritme ini, jadi susah bandinginnya' }
    ]
  },
  {
    id: 8,
    sceneLabel: 'SCENE 08 🚨',
    sceneText: 'Tiba-tiba ada masalah kecil di project. Semua nunggu kamu bereaksi.',
    question: 'Cara kamu biasanya handle situasi kayak gini?',
    format: 'forked-path',
    options: [
      { letter: 'A', icon: '⚡', headline: 'Langsung coba satu solusi. Kalau nggak works, coba yang lain.', text: 'Gerak dulu, pikir sambil jalan' },
      { letter: 'B', icon: '🔍', headline: 'Pelajari dulu dari berbagai sisi. Gerak setelah cukup yakin.', text: 'Pahami dulu, baru eksekusi' },
      { letter: 'C', text: '🔀 Tergantung situasinya — kadang impulsif, kadang overthink' }
    ]
  },
  {
    id: 9,
    sceneLabel: 'SCENE 09 💰',
    sceneText: 'Manager kasih kamu tanggung jawab baru yang jauh lebih besar dari biasanya — semua keputusannya ada di tangan kamu.',
    question: 'Reaksi jujur kamu?',
    format: 'reaction-spectrum',
    options: [
      { letter: 'B', icon: '😰', headline: 'Deg-degan', subtext: 'Takut salah langkah' },
      { letter: 'C', icon: '😄', headline: 'Campur aduk', subtext: 'Nervous tapi pengen coba' },
      { letter: 'A', icon: '🚀', headline: 'Excited!', subtext: 'Ini yang gue tunggu, gas!' },
      { letter: 'C', text: '😶 Jujur, belum kebayang rasanya, jadi belum tahu reaksi gue' } 
    ]
  },
  {
    id: 10,
    sceneLabel: 'SCENE 10 ☕',
    sceneText: 'Break sore. Ngobrol santai sama teman kantor yang baru kenal.',
    question: 'Dia nanya: "Lo orangnya tipe apa sih?" Kamu jawab jujur:',
    format: 'speech-bubble',
    options: [
      { letter: 'A', text: 'Gue orangnya cepet ambil keputusan. Kalau ada masalah, gue langsung gerak — nanti dipikirin sambil jalan.' },
      { letter: 'B', text: 'Gue orangnya teliti. Gue mau ngerti dulu konteksnya sebelum gerak — kalau udah yakin, baru eksekusi.' },
      { letter: 'C', text: 'Hmm, tergantung situasinya sih. Gue adaptif — kadang satu, kadang yang lain.' }
    ]
  },
  {
    id: 11,
    sceneLabel: 'SCENE 11 🌙',
    sceneText: 'Menjelang akhir minggu. Manager bilang: "Minggu depan kamu boleh pilih sendiri mau ngerjain apa."',
    question: 'Project mana yang paling bikin kamu langsung kebayang mau ngapain aja?',
    format: 'brief-card',
    options: [
      { letter: 'A', headline: '🎯 Bantu brand baru dikenal orang banyak secepat mungkin', text: '"Tentuin siapa yang mau dijangkau, buat pesannya, jalankan, ukur hasilnya setiap hari, perbaiki terus"', vibe: 'Cepat, terukur, iteratif' },
      { letter: 'B', headline: '🌐 Bantu website brand baru ramai pengunjung secara organik', text: '"Pahami apa yang orang cari, buat konten yang menjawabnya, pantau perkembangannya dari minggu ke minggu"', vibe: 'Sabar, strategis, tumbuh sendiri' },
      { letter: 'C', text: '🔀 Dua-duanya kedengeran seru, susah milihnya' }
    ]
  },
  {
    id: 12,
    sceneLabel: 'SCENE 12 🎉',
    sceneText: 'Jumat sore. Minggu magang selesai. Manager nanya: "Momen mana yang paling berkesan buat kamu?"',
    question: 'Kamu jawab jujur — situasi mana yang paling bikin kamu merasa "ini gue banget":',
    format: 'polaroid',
    options: [
      { letter: 'A', text: '"Waktu ngeliat sesuatu yang gue jalankan langsung berdampak — dan gue bisa lihat hasilnya hari itu juga."', icon: '📈' },
      { letter: 'B', text: '"Waktu nyadar sesuatu yang gue bangun pelan-pelan mulai jalan sendiri — dan makin lama makin kuat."', icon: '🌱' },
      { letter: 'C', text: '"Jujur, dua momen itu sama-sama bikin gue excited. Minbel, tolong bantu gue milih!"', icon: '🤔' }
    ]
  }
];
