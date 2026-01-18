import { LiteratureInfo, LearningModule, TimelineEvent, LiteratureWork } from '@/types';

export const literatureInfoData: LiteratureInfo[] = [
    {
        type: 'puisi',
        name: 'Puisi',
        description: 'Puisi adalah bentuk karya sastra yang mengungkapkan pikiran dan perasaan penyair secara imajinatif, disusun dengan mengkonsentrasikan kekuatan bahasa melalui struktur fisik dan struktur batinnya.',
        icon: '',
        characteristics: [
            'Menggunakan bahasa konotatif dan figuratif (majas)',
            'Memiliki tipografi atau pengaturan bait dan larik yang khas',
            'Mengandung citraan (imaji) untuk membangkitkan pengalaman indrawi',
            'Memiliki rima (persamaan bunyi) dan irama (alunan bunyi)',
            'Padat makna dengan pemilihan diksi (kata) yang cermat',
        ],
        structure: 'Puisi terdiri dari unsur fisik (tipografi, diksi, pengimajian, kata konkret, majas, rima/ritma) dan unsur batin (tema, perasaan, nada/suasana, amanat).',
        examples: [
            {
                title: 'Aku',
                author: 'Chairil Anwar (1943)',
                content: `Kalau sampai waktuku
Ku mau tak seorang kan merayu
Tidak juga kau

Tak perlu sedu sedan itu

Aku ini binatang jalang
Dari kumpulannya terbuang

Biar peluru menembus kulitku
Aku tetap meradang menerjang

Luka dan bisa kubawa berlari
Berlari
Hingga hilang pedih peri

Dan aku akan lebih tidak perduli

Aku mau hidup seribu tahun lagi`,
            },
            {
                title: 'Hujan Bulan Juni',
                author: 'Sapardi Djoko Damono (1994)',
                content: `tak ada yang lebih tabah
tak ada yang lebih tabah
dari hujan bulan juni
dirahasiakannya rintik rindunya
kepada pohon berbunga itu.

tak ada yang lebih bijak
dari hujan bulan juni
dihapusnya jejak-jejak kakinya
yang ragu-ragu di jalan itu.

tak ada yang lebih arif
dari hujan bulan juni
dibiarkannya yang tak terucapkan
diserap akar pohon bunga itu.
`,
            },
        ],
    },
    {
        type: 'pantun',
        name: 'Pantun',
        description: 'Pantun adalah puisi lama asli Melayu yang terdiri atas empat baris dalam satu bait, bersajak a-b-a-b. Pantun merupakan salah satu warisan budaya Nusantara yang telah diakui UNESCO.',
        icon: '',
        characteristics: [
            'Satu bait terdiri dari 4 baris',
            'Setiap baris terdiri dari 8-12 suku kata',
            'Bersajak a-b-a-b',
            'Baris 1-2 disebut sampiran',
            'Baris 3-4 disebut isi',
        ],
        structure: 'Sampiran berfungsi sebagai pembayang bunyi. Isi memuat pesan utama. Ada berbagai jenis: nasihat, jenaka, teka-teki, percintaan.',
        examples: [
            {
                title: 'Pantun Nasihat',
                author: 'Tradisional Melayu',
                content: `Berakit-rakit ke hulu
Berenang-renang ke tepian
Bersakit-sakit dahulu
Bersenang-senang kemudian`,
            },
        ],
    },
    {
        type: 'cerpen',
        name: 'Cerpen',
        description: 'Cerpen (cerita pendek) adalah karya fiksi prosa yang dapat dibaca dalam sekali duduk, memiliki satu konflik tunggal dan jumlah tokoh terbatas.',
        icon: '',
        characteristics: [
            'Cerita pendek (1.000-10.000 kata)',
            'Satu konflik utama',
            'Tokoh terbatas',
            'Latar terbatas',
            'Kesan tunggal mendalam',
        ],
        structure: 'Eksposisi, Komplikasi, Klimaks, Resolusi, Koda.',
        examples: [
            {
                title: 'Robohnya Surau Kami',
                author: 'A.A. Navis (1956)',
                content: 'Cerpen klasik tentang keseimbangan ibadah dan kerja.',
            },
        ],
    },
    {
        type: 'gurindam',
        name: 'Gurindam',
        description: 'Gurindam adalah puisi lama yang terdiri atas dua baris dalam satu bait, bersajak a-a, dan berisi nasihat atau ajaran moral.',
        icon: '',
        characteristics: [
            'Setiap bait 2 baris',
            'Bersajak a-a',
            'Baris 1: syarat/sebab',
            'Baris 2: akibat/jawaban',
            'Berisi nasihat moral',
        ],
        structure: 'Hubungan sebab-akibat antara baris pertama dan kedua.',
        examples: [
            {
                title: 'Gurindam Dua Belas',
                author: 'Raja Ali Haji (1846)',
                content: `Barang siapa tiada memegang agama
Sekali-kali tiada boleh dibilangkan nama`,
            },
        ],
    },
    {
        type: 'syair',
        name: 'Syair',
        description: 'Syair adalah puisi lama dari tradisi Arab-Persia. Berbeda dengan pantun, seluruh baris adalah isi yang membentuk narasi.',
        icon: '',
        characteristics: [
            'Setiap bait 4 baris',
            'Bersajak a-a-a-a',
            'Semua baris adalah isi',
            'Membentuk narasi panjang',
            'Berisi kisah/nasihat',
        ],
        structure: 'Syair naratif, satu karya bisa ratusan bait.',
        examples: [
            {
                title: 'Syair Perahu',
                author: 'Hamzah Fansuri',
                content: `Inilah gerangan suatu madah
Mengarangkan syair terlalu indah
Membetuli jalan tempat berpindah
Di sanalah iktikat diperbetuli sudah`,
            },
        ],
    },
    {
        type: 'prosa',
        name: 'Prosa',
        description: 'Prosa adalah bentuk karangan bebas yang tidak terikat aturan puisi. Mengalir dalam paragraf dan kalimat.',
        icon: '',
        characteristics: [
            'Tidak terikat rima/irama',
            'Bentuk paragraf',
            'Bahasa sehari-hari',
            'Fiksi atau non-fiksi',
            'Bebas pengembangan ide',
        ],
        structure: 'Prosa fiksi: naratif. Prosa non-fiksi: argumentatif.',
        examples: [
            {
                title: 'Catatan Pinggir',
                author: 'Goenawan Mohamad',
                content: 'Kita hidup dalam kata. Kata membentuk pikiran, pikiran membentuk tindakan.',
            },
        ],
    },
];

export const learningModulesData: LearningModule[] = [
    {
        id: 'puisi-dasar',
        title: 'Memahami Puisi Indonesia',
        description: 'Pelajari unsur-unsur puisi, jenis-jenis puisi, dan cara mengapresiasi karya puisi Indonesia.',
        literatureType: 'puisi',
        difficulty: 'pemula',
        estimatedMinutes: 30,
        content: {
            introduction: `Puisi merupakan salah satu genre sastra tertua di dunia. Di Indonesia, puisi berkembang dari bentuk tradisional seperti mantra dan pantun hingga puisi modern.

Perkembangan puisi Indonesia modern dimulai oleh gerakan Pujangga Baru (1933) dengan tokoh seperti Amir Hamzah dan Sanusi Pane. Puisi Indonesia mencapai puncaknya pada masa Angkatan 45 dengan tokoh utama Chairil Anwar yang membawa semangat individualisme, kebebasan, dan eksistensialisme.

Setelah itu, lahir Angkatan 66 dengan W.S. Rendra, Taufiq Ismail, dan Sapardi Djoko Damono yang masing-masing memiliki gaya khas. Hingga kini, puisi Indonesia terus berkembang dengan berbagai eksperimen bentuk dan tema.`,
            characteristics: [
                'DIKSI: Pemilihan kata yang tepat, cermat, dan bermakna ganda (konotatif). Penyair memilih kata bukan hanya berdasarkan makna denotatif tetapi juga bunyi, rasa, dan asosiasi yang ditimbulkan.',
                'IMAJI/CITRAAN: Gambaran angan yang tercipta melalui kata-kata. Jenis imaji: visual (penglihatan), auditif (pendengaran), taktil (perabaan), olfaktori (penciuman), dan gustatori (pengecapan).',
                'MAJAS: Gaya bahasa kiasan untuk memperkuat efek puisi. Contoh: metafora (perbandingan langsung), simile (perbandingan dengan kata seperti/bagai), personifikasi (benda hidup seperti manusia), hiperbola (berlebihan).',
                'RIMA: Persamaan bunyi pada akhir baris (rima akhir) atau dalam baris (rima dalam). Rima menciptakan keindahan bunyi dan membantu mengingat puisi.',
                'RITMA/IRAMA: Alunan bunyi yang teratur, naik-turun tekanan, dan pergantian bunyi. Ritma memberikan "musik" pada puisi.',
                'TIPOGRAFI: Tata letak visual puisi di atas kertas. Puisi modern sering bereksperimen dengan tipografi untuk memperkuat makna.',
            ],
            structure: `UNSUR FISIK (BENTUK):
• Tipografi: pengaturan baris, bait, dan ruang kosong
• Diksi: pilihan kata
• Imaji: citraan indrawi
• Kata konkret: kata yang dapat ditangkap indra
• Majas: bahasa figuratif
• Rima dan ritma: pola bunyi

UNSUR BATIN (ISI):
• Tema: pokok pikiran utama
• Perasaan/feeling: emosi penyair
• Nada/tone: sikap penyair terhadap pembaca
• Suasana/atmosphere: keadaan jiwa pembaca setelah membaca
• Amanat: pesan yang ingin disampaikan

Puisi Indonesia modern tidak terikat aturan baku. Penyair bebas menentukan jumlah bait, larik, dan tipografi. Yang penting adalah kepaduan antara bentuk dan makna.`,
            examples: [
                {
                    id: 'ex1',
                    title: 'Aku',
                    author: 'Chairil Anwar',
                    content: `Kalau sampai waktuku
Ku mau tak seorang kan merayu
Tidak juga kau

Tak perlu sedu sedan itu

Aku ini binatang jalang
Dari kumpulannya terbuang

Biar peluru menembus kulitku
Aku tetap meradang menerjang

Luka dan bisa kubawa berlari
Berlari
Hingga hilang pedih peri

Dan aku akan lebih tidak perduli

Aku mau hidup seribu tahun lagi`,
                    year: 1943,
                    notes: 'Puisi manifesto Chairil Anwar yang menunjukkan semangat individualisme, pemberontakan, dan keinginan untuk hidup bebas. Menjadi ikon Angkatan 45.',
                },
                {
                    id: 'ex2',
                    title: 'Hujan Bulan Juni',
                    author: 'Sapardi Djoko Damono',
                    content: `tak ada yang lebih tabah
dari hujan bulan Juni
dirahasiakannya rintik rindunya
kepada pohon berbunga itu

tak ada yang lebih bijak
dari hujan bulan Juni
dihapusnya jejak-jejak kakinya
yang ragu-ragu di jalan itu

tak ada yang lebih arif
dari hujan bulan Juni
ditelonya ke dalam tanah
pergi perjalanan yang tak kunjung selesai`,
                    year: 1994,
                    notes: 'Puisi liris tentang cinta yang diam dan tabah. Sapardi dikenal dengan puisinya yang sederhana namun dalam maknanya.',
                },
                {
                    id: 'ex3',
                    title: 'Sajak Sebatang Lisong',
                    author: 'W.S. Rendra',
                    content: `Menghisap sebatang lisong
adalah perbuatan yang serakah?
Sebab kenikmatan yang di dapat
separuh dibuang sia-sia.

Tapi ada juga di antara kita
yang berhemat dalam kenikmatan:
karena takut miskin esok hari
dan akhirnya tak merasakan kenikmatan...`,
                    year: 1978,
                    notes: 'Puisi reflektif tentang cara menikmati hidup. Rendra dikenal sebagai "Si Burung Merak" dengan puisi-puisinya yang penuh kritik sosial.',
                },
            ],
            tips: [
                'Baca puisi berulang kali, pertama dalam hati, lalu dengan suara keras untuk merasakan irama dan bunyinya.',
                'Identifikasi kata-kata kunci dan cari makna denotatif maupun konotatifnya dalam konteks puisi.',
                'Perhatikan imaji yang digunakan - bayangkan dengan indra Anda apa yang digambarkan penyair.',
                'Kenali majas yang digunakan dan pahami mengapa penyair menggunakannya.',
                'Hubungkan puisi dengan konteks zaman penulisannya - siapa penyairnya, apa yang terjadi saat itu.',
                'Rasakan emosi yang ingin disampaikan penyair - apa yang Anda rasakan setelah membaca?',
                'Diskusikan dengan orang lain - interpretasi puisi bisa berbeda dan itu wajar.',
            ],
        },
        quizQuestions: [
            {
                id: 'q1',
                question: 'Apa yang dimaksud dengan diksi dalam puisi?',
                options: ['Jumlah baris dalam puisi', 'Pemilihan kata yang tepat dan cermat', 'Irama puisi', 'Pesan moral puisi'],
                correctAnswer: 1,
                explanation: 'Diksi adalah pemilihan kata yang tepat dan cermat untuk mengungkapkan gagasan. Dalam puisi, diksi sangat penting karena setiap kata memiliki bobot makna yang besar.',
            },
            {
                id: 'q2',
                question: 'Chairil Anwar adalah tokoh utama dari angkatan sastra mana?',
                options: ['Pujangga Baru', 'Angkatan 45', 'Angkatan 66', 'Sastra Kontemporer'],
                correctAnswer: 1,
                explanation: 'Chairil Anwar (1922-1949) adalah pelopor Angkatan 45 dengan gaya puisinya yang individualis, penuh semangat, dan berbeda dari Pujangga Baru yang romantis.',
            },
            {
                id: 'q3',
                question: 'Apa fungsi imaji/citraan dalam puisi?',
                options: ['Menentukan jumlah bait', 'Membangkitkan pengalaman indrawi pembaca', 'Membuat judul puisi', 'Menentukan rima'],
                correctAnswer: 1,
                explanation: 'Imaji berfungsi untuk membangkitkan pengalaman indrawi pembaca melalui kata-kata, seperti imaji visual, auditif, taktil, dst.',
            },
            {
                id: 'q4',
                question: 'Majas "hidupnya bagai air mengalir" termasuk jenis majas apa?',
                options: ['Metafora', 'Simile/Perumpamaan', 'Personifikasi', 'Hiperbola'],
                correctAnswer: 1,
                explanation: 'Simile adalah majas perbandingan yang menggunakan kata seperti, bagai, laksana, bak. Berbeda dengan metafora yang langsung menyamakan.',
            },
            {
                id: 'q5',
                question: 'Siapa penyair yang dijuluki "Si Burung Merak"?',
                options: ['Chairil Anwar', 'Sapardi Djoko Damono', 'W.S. Rendra', 'Taufiq Ismail'],
                correctAnswer: 2,
                explanation: 'W.S. Rendra dijuluki Si Burung Merak karena penampilannya yang flamboyan dan puisi-puisinya yang penuh kritik sosial.',
            },
        ],
    },
    {
        id: 'pantun-lengkap',
        title: 'Seni Berpantun',
        description: 'Pelajari struktur, jenis-jenis pantun, dan teknik menulis pantun yang baik dan benar.',
        literatureType: 'pantun',
        difficulty: 'pemula',
        estimatedMinutes: 25,
        content: {
            introduction: `Pantun adalah warisan budaya Melayu Nusantara yang telah diakui UNESCO sebagai Warisan Budaya Takbenda Kemanusiaan pada 17 Desember 2020. Pantun tidak hanya sebagai hiburan, tetapi juga media pendidikan, diplomasi, dan ekspresi budaya.

Kata "pantun" berasal dari bahasa Minangkabau "patuntun" yang berarti penuntun. Pantun berfungsi sebagai penuntun dalam menyampaikan nasihat, perasaan, atau kritik secara halus dan santun.

Di zaman dahulu, pantun digunakan dalam berbagai acara adat seperti pernikahan, upacara pelamaran, dan pertemuan resmi. Berbalas pantun adalah tradisi yang menunjukkan kepandaian berbahasa dan kecerdasan seseorang.`,
            characteristics: [
                'JUMLAH BARIS: Terdiri dari 4 baris dalam 1 bait (bentuk baku). Ada juga pantun kilat (2 baris) dan talibun (lebih dari 4 baris).',
                'RIMA/SAJAK: Bersajak a-b-a-b (baris 1 berima dengan baris 3, baris 2 berima dengan baris 4).',
                'SUKU KATA: Setiap baris memiliki 8-12 suku kata untuk menjaga irama yang seimbang.',
                'SAMPIRAN: Baris 1-2 disebut sampiran, biasanya tentang alam, benda, atau aktivitas. Berfungsi sebagai pembayang bunyi.',
                'ISI: Baris 3-4 disebut isi yang memuat pesan utama, nasihat, atau maksud sebenarnya.',
            ],
            structure: `STRUKTUR PANTUN:

Baris 1: Sampiran (a) - biasanya tentang alam/benda
Baris 2: Sampiran (b) - melanjutkan gambaran
Baris 3: Isi (a) - mulai menyampaikan pesan
Baris 4: Isi (b) - pesan utama/kesimpulan

HUBUNGAN SAMPIRAN DAN ISI:
Sampiran dan isi tidak harus berhubungan secara logis atau makna, tetapi dihubungkan oleh BUNYI (rima). Sampiran berfungsi membangun suasana dan "mengantarkan" isi dengan bunyi yang selaras.

JENIS-JENIS PANTUN:
1. Pantun Nasihat: berisi ajaran dan bimbingan
2. Pantun Jenaka: berisi humor dan lelucon
3. Pantun Teka-teki: berisi teka-teki
4. Pantun Cinta/Percintaan: tentang kasih sayang
5. Pantun Adat: untuk upacara tradisional
6. Pantun Agama: berisi ajaran keagamaan`,
            examples: [
                {
                    id: 'ex1',
                    title: 'Pantun Nasihat Klasik',
                    author: 'Tradisional Melayu',
                    content: `Berakit-rakit ke hulu
Berenang-renang ke tepian
Bersakit-sakit dahulu
Bersenang-senang kemudian`,
                    notes: 'Pantun paling terkenal tentang perjuangan dan kerja keras. Sampiran menggambarkan perjalanan sungai, isi berisi nasihat tentang kehidupan.',
                },
                {
                    id: 'ex2',
                    title: 'Pantun Budi',
                    author: 'Tradisional Melayu',
                    content: `Kalau ada jarum yang patah
Jangan simpan di dalam peti
Kalau ada kata yang salah
Jangan simpan di dalam hati`,
                    notes: 'Pantun tentang memaafkan. Sampiran tentang jarum patah, isi tentang memaafkan kesalahan orang lain.',
                },
                {
                    id: 'ex3',
                    title: 'Pantun Percintaan',
                    author: 'Tradisional Melayu',
                    content: `Dari mana datangnya lintah
Dari sawah turun ke kali
Dari mana datangnya cinta
Dari mata turun ke hati`,
                    notes: 'Pantun percintaan yang menggambarkan proses jatuh cinta. Sangat populer dan sering dikutip.',
                },
            ],
            tips: [
                'MULAI DARI ISI: Tentukan dulu pesan apa yang ingin disampaikan (baris 3-4), baru cari sampiran yang cocok bunyinya.',
                'PERHATIKAN RIMA: Pastikan bunyi akhir baris 1=3 dan baris 2=4. Gunakan kamus rima jika perlu.',
                'HITUNG SUKU KATA: Usahakan setiap baris memiliki 8-12 suku kata agar irama seimbang.',
                'SAMPIRAN NATURAL: Pilih sampiran tentang alam, benda, atau aktivitas yang umum dikenal.',
                'LATIHAN RUTIN: Semakin sering membuat pantun, semakin mudah menemukan rima yang tepat.',
                'BACA PANTUN KLASIK: Pelajari pantun-pantun tradisional untuk memahami pola dan gaya yang baik.',
            ],
        },
        quizQuestions: [
            {
                id: 'q1',
                question: 'Berapa jumlah baris dalam satu bait pantun yang baku?',
                options: ['2 baris', '4 baris', '6 baris', '8 baris'],
                correctAnswer: 1,
                explanation: 'Pantun baku terdiri dari 4 baris dalam satu bait dengan pola rima a-b-a-b.',
            },
            {
                id: 'q2',
                question: 'Apa yang dimaksud dengan sampiran dalam pantun?',
                options: ['Baris yang berisi pesan utama', 'Baris 1-2 yang berfungsi sebagai pembayang bunyi', 'Judul pantun', 'Penulis pantun'],
                correctAnswer: 1,
                explanation: 'Sampiran adalah baris 1-2 dalam pantun yang berfungsi sebagai pembayang bunyi. Biasanya tentang alam atau benda.',
            },
            {
                id: 'q3',
                question: 'Bagaimana pola rima/sajak dalam pantun?',
                options: ['a-a-a-a', 'a-b-a-b', 'a-a-b-b', 'a-b-b-a'],
                correctAnswer: 1,
                explanation: 'Pantun bersajak a-b-a-b, artinya baris 1 berima dengan baris 3, dan baris 2 berima dengan baris 4.',
            },
            {
                id: 'q4',
                question: 'Kapan UNESCO mengakui pantun sebagai Warisan Budaya Takbenda?',
                options: ['2018', '2019', '2020', '2021'],
                correctAnswer: 2,
                explanation: 'UNESCO mengakui pantun sebagai Warisan Budaya Takbenda Kemanusiaan pada 17 Desember 2020.',
            },
        ],
    },
    {
        id: 'cerpen-menulis',
        title: 'Menulis Cerpen',
        description: 'Pelajari unsur-unsur cerpen dan teknik menulis cerita pendek yang menarik.',
        literatureType: 'cerpen',
        difficulty: 'menengah',
        estimatedMinutes: 40,
        content: {
            introduction: `Cerpen (cerita pendek) adalah karya fiksi prosa yang dapat dibaca dalam sekali duduk, biasanya 15-60 menit. Panjangnya berkisar 1.000-10.000 kata.

Cerpen Indonesia berkembang sejak era Balai Pustaka (1920-an). Tokoh-tokoh penting: Muhammad Kasim dengan "Si Cebol Rindukan Bulan", dilanjutkan oleh Sutan Takdir Alisjahbana, Armijn Pane, dan lainnya.

Era Angkatan 45 melahirkan Idrus dengan gaya realis dan Pramoedya Ananta Toer. Era modern menghadirkan Seno Gumira Ajidarma, Eka Kurniawan, dan Dee Lestari yang masing-masing membawa warna unik.`,
            characteristics: [
                'PANJANG TERBATAS: 1.000-10.000 kata, dapat dibaca sekali duduk.',
                'SATU KONFLIK: Fokus pada satu konflik atau peristiwa utama.',
                'TOKOH TERBATAS: Biasanya 2-5 tokoh dengan satu tokoh utama.',
                'LATAR TERBATAS: Tempat dan waktu yang terfokus.',
                'KESAN TUNGGAL: Meninggalkan satu kesan mendalam pada pembaca.',
            ],
            structure: `UNSUR INTRINSIK CERPEN:

1. TEMA: Ide pokok/gagasan utama cerita

2. ALUR/PLOT:
   • Eksposisi: pengenalan tokoh dan latar
   • Komplikasi: konflik mulai muncul
   • Klimaks: puncak konflik
   • Resolusi: penyelesaian konflik
   • Koda: penutup/pesan

3. TOKOH/PENOKOHAN:
   • Protagonis: tokoh utama
   • Antagonis: tokoh penentang
   • Tritagonis: tokoh pendukung
   Teknik: dialog, deskripsi, tindakan

4. LATAR:
   • Tempat: di mana cerita terjadi
   • Waktu: kapan cerita terjadi
   • Suasana: kondisi psikologis

5. SUDUT PANDANG:
   • Orang pertama (aku)
   • Orang ketiga terbatas
   • Orang ketiga mahatahu

6. GAYA BAHASA: Cara penulis mengungkapkan cerita

7. AMANAT: Pesan moral`,
            examples: [
                {
                    id: 'ex1',
                    title: 'Robohnya Surau Kami',
                    author: 'A.A. Navis',
                    content: `Cerpen ini berkisah tentang Kakek Garin, seorang penjaga surau yang sangat taat beribadah. Hidupnya dihabiskan untuk menjaga surau dan beribadah.

Suatu hari, Ajo Sidi bercerita tentang Haji Saleh yang ditolak masuk surga karena selama hidupnya hanya beribadah tanpa bekerja mencari nafkah.

Cerita ini mengguncang Kakek Garin hingga ia bunuh diri dengan menabrakkan diri ke kereta api.

Cerpen ini mempertanyakan keseimbangan antara ibadah dan kerja, antara kehidupan spiritual dan duniawi.`,
                    year: 1956,
                    notes: 'Salah satu cerpen terbaik Indonesia. Memenangkan hadiah majalah Kisah 1955. Tema: keseimbangan ibadah dan kerja.',
                },
            ],
            tips: [
                'MULAI DENGAN HOOK: Kalimat pembuka yang menarik perhatian pembaca.',
                'KONFLIK JELAS: Tentukan konflik utama sebelum menulis.',
                'SHOW DONT TELL: Tunjukkan melalui aksi dan dialog, bukan narasi.',
                'DIALOG NATURAL: Buat dialog seperti percakapan nyata.',
                'ENDING MEMORABLE: Akhiri dengan ending yang berkesan.',
                'EDIT KETAT: Cerpen harus padat, buang yang tidak perlu.',
            ],
        },
        quizQuestions: [
            {
                id: 'q1',
                question: 'Apa yang dimaksud dengan klimaks dalam cerpen?',
                options: ['Pengenalan tokoh', 'Puncak konflik', 'Penyelesaian masalah', 'Pesan moral'],
                correctAnswer: 1,
                explanation: 'Klimaks adalah puncak konflik dalam cerita, momen paling menegangkan sebelum penyelesaian.',
            },
            {
                id: 'q2',
                question: 'Siapa penulis cerpen "Robohnya Surau Kami"?',
                options: ['Pramoedya Ananta Toer', 'A.A. Navis', 'Idrus', 'Seno Gumira Ajidarma'],
                correctAnswer: 1,
                explanation: 'A.A. Navis menulis Robohnya Surau Kami pada 1956, salah satu cerpen terbaik Indonesia.',
            },
        ],
    },
    {
        id: 'gurindam-klasik',
        title: 'Memahami Gurindam',
        description: 'Kenali karakteristik gurindam dan karya-karya klasik Raja Ali Haji.',
        literatureType: 'gurindam',
        difficulty: 'menengah',
        estimatedMinutes: 25,
        content: {
            introduction: `Gurindam adalah bentuk puisi lama Melayu yang berkembang di lingkungan kerajaan Melayu-Riau. Berbeda dengan pantun, gurindam langsung menyampaikan pesan tanpa sampiran.

Karya gurindam paling terkenal adalah Gurindam Dua Belas karya Raja Ali Haji (1809-1873) yang ditulis pada 1846. Raja Ali Haji adalah sastrawan dari Kesultanan Riau-Lingga yang juga menulis Tuhfat al-Nafis (sejarah Melayu).

Gurindam Dua Belas terdiri dari 12 pasal yang berisi nasihat keagamaan dan moral. Setiap pasal membahas topik berbeda seperti agama, raja, menteri, rakyat, dan sebagainya.`,
            characteristics: [
                'JUMLAH BARIS: Setiap bait terdiri dari 2 baris',
                'RIMA: Bersajak sama (a-a)',
                'STRUKTUR LOGIS: Baris 1 berisi syarat/sebab, baris 2 berisi akibat/jawaban',
                'ISI: Berisi nasihat, ajaran moral, atau keagamaan',
                'BAHASA: Lugas namun penuh makna dan kebijaksanaan',
            ],
            structure: `STRUKTUR GURINDAM:

Baris 1: Syarat, sebab, atau kondisi
Baris 2: Akibat, jawaban, atau konsekuensi

Contoh:
"Barang siapa tiada memegang agama" (syarat)
"Sekali-kali tiada boleh dibilangkan nama" (akibat)

PERBEDAAN DENGAN PANTUN:
• Pantun: 4 baris, ada sampiran, a-b-a-b
• Gurindam: 2 baris, tanpa sampiran, a-a

Gurindam langsung menyampaikan pesan moral tanpa kiasan. Bentuknya mirip peribahasa tetapi dalam format puisi bersajak.`,
            examples: [
                {
                    id: 'ex1',
                    title: 'Gurindam Dua Belas - Pasal Pertama',
                    author: 'Raja Ali Haji',
                    content: `Barang siapa tiada memegang agama
Sekali-kali tiada boleh dibilangkan nama

Barang siapa mengenal yang empat
Maka ia itulah orang yang makrifat

Barang siapa mengenal Allah
Suruh dan tegahnya tiada ia menyalah

Barang siapa mengenal diri
Maka telah mengenal akan Tuhan yang bahari

Barang siapa mengenal dunia
Tahulah ia barang yang terpedaya

Barang siapa mengenal akhirat
Tahulah ia dunia mudarat`,
                    year: 1846,
                    notes: 'Pasal pertama tentang agama dan pengenalan diri. Yang empat: syariat, tarikat, hakikat, makrifat.',
                },
            ],
            tips: [
                'Pahami hubungan sebab-akibat antara kedua baris',
                'Fokus pada satu pesan moral per gurindam',
                'Gunakan bahasa yang lugas tetapi bermakna',
                'Pastikan bunyi akhir kedua baris berima sama',
            ],
        },
        quizQuestions: [
            {
                id: 'q1',
                question: 'Siapa penulis Gurindam Dua Belas?',
                options: ['Hamzah Fansuri', 'Raja Ali Haji', 'Tun Sri Lanang', 'Abdullah bin Abdul Kadir'],
                correctAnswer: 1,
                explanation: 'Raja Ali Haji (1809-1873) menulis Gurindam Dua Belas pada 1846.',
            },
            {
                id: 'q2',
                question: 'Berapa jumlah baris dalam satu bait gurindam?',
                options: ['2 baris', '4 baris', '6 baris', '8 baris'],
                correctAnswer: 0,
                explanation: 'Gurindam terdiri dari 2 baris per bait, berbeda dengan pantun yang 4 baris.',
            },
        ],
    },
    {
        id: 'syair-tradisional',
        title: 'Syair dalam Tradisi Melayu',
        description: 'Pelajari syair sebagai media bercerita dalam tradisi sastra Melayu klasik.',
        literatureType: 'syair',
        difficulty: 'menengah',
        estimatedMinutes: 30,
        content: {
            introduction: `Syair adalah bentuk puisi yang masuk ke Nusantara melalui pengaruh Arab-Persia dan berkembang di kesultanan-kesultanan Melayu. Berbeda dengan pantun yang asli Melayu, syair diadaptasi dari tradisi sastra Arab.

Tokoh syair Melayu yang paling penting adalah Hamzah Fansuri (wafat sekitar 1590) dari Aceh. Ia menulis syair-syair sufi seperti Syair Perahu, Syair Burung Pingai, dan Syair Sidang Fakir.

Syair berkembang untuk menyampaikan kisah panjang, sejarah, ajaran agama, atau nasihat. Berbeda dengan pantun yang pendek, satu karya syair bisa terdiri dari ratusan hingga ribuan bait.`,
            characteristics: [
                'JUMLAH BARIS: 4 baris per bait',
                'RIMA: Bersajak a-a-a-a (keempat baris berima sama)',
                'ISI: Semua baris adalah isi (tidak ada sampiran seperti pantun)',
                'NARATIF: Antar bait berhubungan membentuk cerita panjang',
                'TEMA: Kisah, sejarah, ajaran agama, atau nasihat kehidupan',
            ],
            structure: `STRUKTUR SYAIR:

Setiap bait: 4 baris dengan rima a-a-a-a
Semua baris adalah isi cerita (berbeda dengan pantun)
Antar bait saling bersambung membentuk narasi

JENIS-JENIS SYAIR:
1. Syair Keagamaan: ajaran Islam, kisah Nabi
2. Syair Sejarah: kisah raja, perang
3. Syair Romantis: kisah percintaan
4. Syair Nasihat: ajaran moral
5. Syair Kiasan: kritik sosial terselubung

PERBEDAAN DENGAN PANTUN:
• Pantun: sampiran + isi, a-b-a-b
• Syair: semua isi, a-a-a-a`,
            examples: [
                {
                    id: 'ex1',
                    title: 'Syair Perahu',
                    author: 'Hamzah Fansuri',
                    content: `Inilah gerangan suatu madah
Mengarangkan syair terlalu indah
Membetuli jalan tempat berpindah
Di sanalah iktikat diperbetuli sudah

Wahai muda kenali dirimu
Ialah perahu tamsil tubuhmu
Tiada berapa lama hidupmu
Ke akhirat jua kekal diammu

Hai muda arif budiman
Hasilkan kemudi dengan pedoman
Alat perahumu jua kerjakan
Dayung pengayuh taruk haluan`,
                    notes: 'Syair sufi tentang perjalanan hidup manusia menuju akhirat. Perahu adalah simbol tubuh, laut adalah dunia.',
                },
            ],
            tips: [
                'Rencanakan alur cerita sebelum menulis',
                'Jaga konsistensi rima a-a-a-a di setiap bait',
                'Pastikan transisi antar bait mengalir natural',
                'Syair biasanya dibacakan dengan irama tertentu',
            ],
        },
        quizQuestions: [
            {
                id: 'q1',
                question: 'Bagaimana pola rima syair?',
                options: ['a-b-a-b', 'a-a-a-a', 'a-a-b-b', 'a-b-b-a'],
                correctAnswer: 1,
                explanation: 'Syair bersajak a-a-a-a, artinya keempat baris berima sama.',
            },
            {
                id: 'q2',
                question: 'Siapa penyair yang menulis Syair Perahu?',
                options: ['Raja Ali Haji', 'Hamzah Fansuri', 'Nuruddin ar-Raniri', 'Tun Sri Lanang'],
                correctAnswer: 1,
                explanation: 'Hamzah Fansuri dari Aceh menulis Syair Perahu, sebuah syair sufi tentang perjalanan hidup.',
            },
        ],
    },
];

export const timelineData: TimelineEvent[] = [
    {
        id: 'era-1',
        era: 'Sastra Melayu Klasik',
        year: 'Abad 7-19',
        title: 'Era Naskah dan Kesusastraan Istana',
        description: 'Sastra berkembang di istana-istana kerajaan dalam bentuk naskah yang ditulis dengan huruf Arab-Melayu.',
        literatureTypes: ['syair', 'gurindam', 'pantun'],
        keyFigures: ['Hamzah Fansuri', 'Raja Ali Haji', 'Nuruddin ar-Raniri'],
    },
    {
        id: 'era-2',
        era: 'Balai Pustaka',
        year: '1920-1942',
        title: 'Lahirnya Sastra Indonesia Modern',
        description: 'Penerbitan Balai Pustaka menandai awal sastra Indonesia modern. Tema: adat, kawin paksa.',
        literatureTypes: ['cerpen', 'prosa'],
        keyFigures: ['Marah Rusli', 'Abdul Muis', 'Merari Siregar'],
    },
    {
        id: 'era-3',
        era: 'Pujangga Baru',
        year: '1933-1942',
        title: 'Romantisme dan Nasionalisme',
        description: 'Majalah Pujangga Baru membebaskan sastra dari kungkungan Balai Pustaka.',
        literatureTypes: ['puisi', 'cerpen', 'prosa'],
        keyFigures: ['Sutan Takdir Alisjahbana', 'Amir Hamzah', 'Sanusi Pane'],
    },
    {
        id: 'era-4',
        era: 'Angkatan 45',
        year: '1942-1955',
        title: 'Semangat Kemerdekaan',
        description: 'Gaya penulisan lugas, individualis, eksistensialis. Puisi menjadi media perjuangan.',
        literatureTypes: ['puisi', 'cerpen'],
        keyFigures: ['Chairil Anwar', 'Idrus', 'Pramoedya Ananta Toer'],
    },
    {
        id: 'era-5',
        era: 'Angkatan 66',
        year: '1961-1970',
        title: 'Humanisme Universal',
        description: 'Kembali ke tema kemanusiaan universal setelah pergolakan politik.',
        literatureTypes: ['puisi', 'cerpen', 'prosa'],
        keyFigures: ['W.S. Rendra', 'Taufiq Ismail', 'Sapardi Djoko Damono'],
    },
    {
        id: 'era-6',
        era: 'Kontemporer',
        year: '1980-sekarang',
        title: 'Keberagaman',
        description: 'Berbagai aliran dan eksperimen bentuk. Tema sosial, feminisme, postmodern.',
        literatureTypes: ['puisi', 'cerpen', 'prosa'],
        keyFigures: ['Ayu Utami', 'Eka Kurniawan', 'Dee Lestari'],
    },
];

export const sampleWorks: LiteratureWork[] = [
    {
        id: 'work-1',
        userId: 'user-1',
        title: 'Rindu di Senja Kala',
        content: `Di tepi pantai aku berdiri
Menyaksikan mentari tenggelam
Membawa serta kenangan ini
Yang tersimpan rapat dalam

Angin berbisik namamu lembut
Ombak membawa pesan rindu
Hatiku yang sudah lama terluka
Kembali bermimpi tentangmu`,
        excerpt: 'Di tepi pantai aku berdiri...',
        literatureType: 'puisi',
        theme: 'Kerinduan',
        style: 'modern',
        mood: 'melankolis',
        tags: ['cinta', 'rindu'],
        viewCount: 245,
        bookmarkCount: 32,
        commentCount: 8,
        averageRating: 4.5,
        isPublic: true,
        isFeatured: true,
        createdAt: new Date('2026-01-10'),
        updatedAt: new Date('2026-01-10'),
        author: { username: 'penyair_senja' },
    },
    {
        id: 'work-2',
        userId: 'user-2',
        title: 'Pantun Nasihat',
        content: `Pergi ke pasar membeli roti
Roti manis dimakan bersama
Ilmu itu pelita hati
Tanpanya hidup terasa gelap gulita`,
        excerpt: 'Pergi ke pasar membeli roti...',
        literatureType: 'pantun',
        theme: 'Nasihat',
        style: 'klasik',
        mood: 'inspiratif',
        tags: ['nasihat'],
        viewCount: 189,
        bookmarkCount: 45,
        commentCount: 12,
        averageRating: 4.8,
        isPublic: true,
        isFeatured: true,
        createdAt: new Date('2026-01-08'),
        updatedAt: new Date('2026-01-08'),
        author: { username: 'budayawan' },
    },
];
