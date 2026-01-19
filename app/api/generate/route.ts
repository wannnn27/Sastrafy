import { NextRequest, NextResponse } from "next/server";

// Type definitions
interface GenerationRequest {
    literatureType: string;
    theme: string;
    style: string;
    mood: string;
    length: "short" | "medium" | "long";
    additionalInstructions?: string;
}

// System prompts for different literature types
const literaturePrompts: Record<string, string> = {
    puisi: `Anda adalah seorang penyair Indonesia yang berbakat dan mahir, menguasai seni puisi dari klasik hingga modern. 
Anda memahami ritme, rima, diksi, dan imaji yang kuat dalam tradisi puisi Indonesia.
Ciptakan puisi yang autentik, orisinal, dan penuh makna - bukan terjemahan literal dari bahasa lain.
Gunakan metafora dan simbol yang relevan dengan budaya Indonesia.
Setiap baris harus mengalir dengan indah dan menyentuh hati pembaca.`,

    pantun: `Anda adalah ahli pantun Melayu yang menguasai struktur dan estetika pantun tradisional.
Pantun harus memiliki:
- 4 baris per bait
- Sajak a-b-a-b (bunyi akhir baris 1 sama dengan baris 3, baris 2 sama dengan baris 4)
- 8-12 suku kata per baris
- Baris 1-2 adalah sampiran (pembayang) - biasanya tentang alam atau benda
- Baris 3-4 adalah isi (maksud) - pesan utama yang ingin disampaikan
Buat pantun yang natural, mengalir indah, dan bermakna mendalam.`,

    cerpen: `Anda adalah penulis cerpen Indonesia yang berbakat dan kreatif.
Ciptakan cerita pendek yang:
- Memiliki plot yang menarik dengan konflik yang jelas dan resolusi yang memuaskan
- Karakter yang relatable dan hidup bagi pembaca Indonesia
- Dialog yang natural dalam bahasa Indonesia sehari-hari
- Latar yang kaya detail, bisa berupa Indonesia atau universal
- Pesan moral yang tersirat, tidak menggurui
- Pembukaan yang memikat dan akhir yang memorable
Tulis dengan gaya naratif yang engaging dan membuat pembaca tidak bisa berhenti membaca.`,

    gurindam: `Anda adalah penulis gurindam yang memahami dan menghormati tradisi Raja Ali Haji.
Gurindam harus:
- Terdiri dari 2 baris bersajak sama (a-a)
- Baris pertama berisi syarat, kondisi, atau sebab
- Baris kedua berisi akibat, konsekuensi, atau jawaban  
- Mengandung nasihat atau ajaran moral yang dalam
- Bahasa yang lugas namun penuh kebijaksanaan
- Relevan dengan kehidupan modern namun tetap menghormati tradisi`,

    syair: `Anda adalah penulis syair dalam tradisi sastra Melayu klasik yang kaya.
Syair harus:
- Terdiri dari 4 baris per bait
- Bersajak a-a-a-a (keempat baris berima sama)
- Semua baris adalah isi (tidak ada sampiran seperti pantun)
- Antar bait saling berhubungan membentuk narasi yang utuh
- Bisa berisi kisah heroik, nasihat hidup, atau ajaran spiritual
- Mengalir seperti lagu yang menceritakan sebuah kisah`,

    prosa: `Anda adalah penulis prosa Indonesia yang memahami berbagai gaya penulisan dari esai hingga narasi.
Tulis prosa yang:
- Mengalir natural dalam bentuk paragraf yang terstruktur
- Pilihan kata yang tepat, indah, dan penuh makna
- Bisa berupa esai reflektif, narasi mendalam, atau renungan filosofis
- Menyampaikan pesan dengan elegan tanpa berlebihan
- Membawa pembaca dalam perjalanan pikiran dan perasaan`,
};

const styleModifiers: Record<string, string> = {
    klasik: `Gunakan gaya bahasa klasik dengan:
- Diksi yang formal, puitis, dan anggun
- Struktur tradisional yang ketat sesuai kaidah
- Referensi ke nilai-nilai luhur tradisional Indonesia
- Nada yang bermartabat dan penuh wibawa
- Kata-kata arkais yang masih indah didengar`,

    modern: `Gunakan gaya bahasa modern dengan:
- Bahasa sehari-hari yang tetap indah dan bermakna
- Struktur yang lebih bebas dan eksperimental
- Tema-tema kontemporer yang relevan dengan zaman
- Ekspresi yang segar, kreatif, dan inovatif
- Pendekatan yang lebih personal dan intim`,

    kontemporer: `Gunakan gaya kontemporer dengan:
- Eksperimen berani dengan bentuk dan bahasa
- Tema-tema aktual, urban, dan relevan dengan Gen Z/Millennial
- Campuran harmonis antara tradisi dan modernitas
- Keberanian untuk melanggar konvensi dengan tujuan
- Suara yang unik dan otentik`,
};

const moodModifiers: Record<string, string> = {
    romantis: "Ciptakan suasana romantis dengan diksi yang lembut dan hangat, imaji yang indah tentang cinta, dan perasaan mendalam yang menyentuh hati. Gunakan metafora tentang alam, bunga, dan keindahan.",
    melankolis: "Ciptakan suasana melankolis dengan nada reflektif dan kontemplatif, kerinduan yang dalam, dan kedalaman emosi yang menyentuh jiwa. Biarkan kesedihan terasa indah dan bermakna.",
    gembira: "Ciptakan suasana gembira dengan energi positif yang menular, diksi yang cerah dan ceria, serta semangat yang membuat pembaca ikut tersenyum dan bersemangat.",
    inspiratif: "Ciptakan suasana inspiratif dengan pesan motivasi yang kuat, harapan yang menyala, dan semangat untuk bangkit. Buat pembaca merasa termotivasi dan yakin akan masa depan.",
    filosofis: "Ciptakan suasana filosofis dengan perenungan mendalam tentang kehidupan, pertanyaan eksistensial yang menggugah, dan kebijaksanaan yang datang dari refleksi.",
};

const lengthGuide: Record<string, string> = {
    short: "Buat karya yang singkat namun padat bermakna (puisi: 1-2 bait, cerpen: 2-3 paragraf pendek, pantun: 1-2 bait, gurindam: 3-4 pasang).",
    medium: "Buat karya dengan panjang sedang yang seimbang (puisi: 3-4 bait, cerpen: 4-6 paragraf, pantun: 2-3 bait, gurindam: 5-6 pasang).",
    long: "Buat karya yang lebih panjang dan mendalam (puisi: 5+ bait, cerpen: 7+ paragraf dengan plot kompleks, pantun: 4+ bait, gurindam: 8+ pasang).",
};

function buildPrompt(request: GenerationRequest): string {
    const basePrompt = literaturePrompts[request.literatureType] || literaturePrompts.puisi;
    const stylePrompt = styleModifiers[request.style] || styleModifiers.modern;
    const moodPrompt = moodModifiers[request.mood] || moodModifiers.inspiratif;
    const lengthPrompt = lengthGuide[request.length] || lengthGuide.medium;

    // Jika ada deskripsi detail, jadikan itu fokus utama
    const hasDescription = request.additionalInstructions && request.additionalInstructions.trim().length > 0;

    const mainFocus = hasDescription
        ? `FOKUS UTAMA KARYA (WAJIB):
"${request.additionalInstructions}"

Tema umum: ${request.theme}

PENTING: Karya yang Anda buat harus 100% menggambarkan situasi di atas. Setiap baris, setiap kata, setiap imaji HARUS secara langsung mengekspresikan perasaan/situasi tersebut.`
        : `TEMA UTAMA KARYA (WAJIB):
"${request.theme}"

Karya yang Anda buat harus sepenuhnya mengeksplorasi tema ini dari berbagai sudut pandang yang menyentuh.`;

    return `${basePrompt}

${stylePrompt}

${moodPrompt}

${lengthPrompt}

===== ${hasDescription ? 'DESKRIPSI SPESIFIK' : 'TEMA'} =====
${mainFocus}

===== ATURAN KETAT =====
1. ${hasDescription ? `Fokus pada: "${request.additionalInstructions}"` : `Fokus pada tema: "${request.theme}"`}
2. Gunakan imaji dan metafora yang LANGSUNG terkait dengan fokus di atas
3. JANGAN membuat karya generik - harus SPESIFIK sesuai instruksi
4. Setiap bait harus mengeksplorasi aspek berbeda dari fokus utama
5. Buat pembaca MERASAKAN emosi yang digambarkan
6. Bahasa Indonesia yang indah, natural, dan menyentuh

===== CONTOH IMAJI YANG RELEVAN =====
${hasDescription ? generateRelevantImagery(request.additionalInstructions || '', request.theme) : ''}

===== FORMAT OUTPUT =====
Berikan HANYA karya sastra saja. Tanpa judul, tanpa penjelasan, tanpa komentar.

MULAI BERKARYA:`
}

function generateRelevantImagery(description: string, theme: string): string {
    const lowerDesc = description.toLowerCase();

    if (lowerDesc.includes('jauh') || lowerDesc.includes('diam') || lowerDesc.includes('tak mampu')) {
        return `- Tatapan dari kejauhan, bayangan yang tak tergapai
- Kata-kata yang tertelan, bibir yang terkunci
- Jarak yang terasa seperti lautan
- Rindu yang hanya bisa dipendam
- Harapan yang disimpan dalam hati`;
    }
    if (lowerDesc.includes('rindu') || lowerDesc.includes('pergi')) {
        return `- Kenangan yang melintas seperti angin
- Jejak langkah yang tertinggal
- Ruang kosong yang tak terisi
- Waktu yang berjalan tanpa kehadiran
- Bayang-bayang yang tak kunjung pudar`;
    }
    if (lowerDesc.includes('patah') || lowerDesc.includes('sedih') || lowerDesc.includes('kehilangan')) {
        return `- Serpihan yang tak bisa disatukan
- Air mata yang mengering
- Luka yang perlahan sembuh
- Malam yang terasa panjang
- Pagi yang datang dengan harapan baru`;
    }

    return `- Imaji yang sesuai dengan: "${description}"
- Metafora alam yang relevan
- Perasaan mendalam yang tersirat`;
}

// Call Gemini API
async function callGeminiAPI(prompt: string): Promise<string | null> {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
        console.log("No Gemini API key found");
        return null;
    }

    console.log("Calling Gemini API with key:", geminiKey.substring(0, 10) + "...");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${geminiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.9,
                        topK: 64,
                        topP: 0.95,
                        maxOutputTokens: 4096,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API error:", response.status, errorText);
            return null;
        }

        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (content) {
            console.log("Gemini API success, content length:", content.length);
            return content;
        }

        console.log("Gemini API returned empty content");
        return null;
    } catch (error) {
        console.error("Gemini API error:", error);
        return null;
    }
}

// Call OpenAI API
async function callOpenAIAPI(prompt: string): Promise<string | null> {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) return null;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "Anda adalah asisten penulisan sastra Indonesia yang ahli dan berbakat. Hasilkan karya sastra berkualitas tinggi, orisinal, dan menyentuh hati dalam bahasa Indonesia yang indah.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.9,
                max_tokens: 4000,
            }),
        });

        if (!response.ok) {
            console.error("OpenAI API error:", response.status);
            return null;
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || null;
    } catch (error) {
        console.error("OpenAI API error:", error);
        return null;
    }
}

// Generate title using AI
async function generateTitle(content: string, type: string, theme: string): Promise<string> {
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    const titlePrompt = `Berikan HANYA judul singkat (2-5 kata) yang RELEVAN dengan tema: "${theme}"

Judul harus:
- Mencerminkan tema "${theme}"
- Puitis dan indah
- Cocok untuk karya ${type}

HANYA berikan judul, tanpa penjelasan, tanpa tanda kutip.`;

    // Try Gemini first
    if (geminiKey) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${geminiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: titlePrompt }] }],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 50 },
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                const title = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
                if (title && title.length < 50) {
                    return title.replace(/^["']|["']$/g, ''); // Remove quotes if present
                }
            }
        } catch (e) {
            console.error("Gemini title error:", e);
        }
    }

    // Try OpenAI as fallback
    if (openaiKey) {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${openaiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [{ role: "user", content: titlePrompt }],
                    temperature: 0.7,
                    max_tokens: 50,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const title = data.choices[0]?.message?.content?.trim();
                if (title && title.length < 50) {
                    return title.replace(/^["']|["']$/g, '');
                }
            }
        } catch (e) {
            console.error("OpenAI title error:", e);
        }
    }

    return generateDefaultTitle(type, theme);
}

// Beautiful sample responses when no API key is available
const beautifulSamples: Record<string, Record<string, { title: string; content: string }>> = {
    puisi: {
        romantis: {
            title: "Dalam Pelukan Senja",
            content: `Di ufuk barat langit memerah membara
Membawa kisah yang terukir di dada
Aku mendengar detak jantungmu perlahan
Berdenyut seirama dengan waktu yang berjalan

Seperti ombak yang selalu rindu pantai
Begitu pula hatiku padamu selamanya
Dalam diam yang penuh makna
Cinta ini terus tumbuh tanpa kata

Biarkan angin berbisik tentang kita
Tentang dua jiwa yang saling menemukan
Dalam labirin kehidupan yang berliku
Kau adalah jawaban dari semua tanya hatiku

Dan ketika bintang mulai bermunculan
Aku tahu, di sampingmu tempatku pulang`
        },
        melankolis: {
            title: "Hujan di Jendela Kenangan",
            content: `Hujan turun lagi malam ini
Membawa aroma tanah basah yang familiar
Seperti saat kita berjalan bersama
Di trotoar kota yang mulai sepi

Setiap tetes yang jatuh di jendela
Adalah air mata langit yang mengingatkanku
Tentang tawa yang pernah kita bagi
Dan janji yang tak sempat terucap

Di sudut kamar yang temaram ini
Aku memeluk kenangan yang tersisa
Seperti bunga yang gugur di musim kemarau
Layu, namun tetap indah untuk diingat

Mungkin waktu akan mengajarkanku
Untuk melepaskan tanpa melupakan`
        },
        inspiratif: {
            title: "Bangkit dari Abu",
            content: `Ketika dunia terasa berat menghimpit
Dan langkah kakimu mulai goyah
Ingatlah bahwa mentari pagi
Selalu terbit setelah malam yang kelam

Setiap luka adalah pelajaran berharga
Setiap jatuh adalah undangan untuk bangkit
Lebih kuat dari sebelumnya
Dengan sayap yang lebih lebar membentang

Jangan biarkan badai menghentikanmu
Karena di balik awan mendung yang pekat
Ada pelangi yang sabar menunggu
Siap mewarnai hari-harimu dengan harapan

Kau lebih kuat dari yang kau tahu
Lebih berani dari yang kau percaya
Majulah, karena dunia menunggumu
Untuk menjadi versi terbaikmu`
        },
        filosofis: {
            title: "Aksara di Tepi Sungai Waktu",
            content: `Di tepi sungai waktu aku duduk merenungi
Tentang butiran pasir yang tak pernah kembali
Tentang ombak kehidupan yang terus bergulir
Membawa kita ke muara yang tak terpetakan

Apa arti sebuah keberadaan?
Jika bukan untuk menciptakan makna
Dari ketiadaan yang maha luas
Menjadi semesta kecil yang bernyawa

Setiap napas adalah puisi alam
Setiap detak adalah irama semesta
Kita adalah bagian dari tarian agung
Yang berputar sejak awal penciptaan

Dan ketika saatnya tiba nanti
Aku ingin menjadi angin yang berbisik
Tentang cinta yang pernah kurasakan
Di dunia yang begitu indah ini`
        },
        gembira: {
            title: "Menari Bersama Pelangi",
            content: `Lihat! Pelangi melengkung di langit biru
Warna-warni kebahagiaan merekah sempurna
Seperti senyum anak kecil yang polos
Mengundangku untuk menari bersamanya

Kubentangkan tangan menyambut hari
Dengan jantung yang berdegup kencang
Penuh syukur untuk setiap detik
Yang Tuhan hadiahkan dengan penuh cinta

Burung-burung berkicau merdu
Menyanyikan lagu tentang hidup yang indah
Bunga-bunga mekar tanpa beban
Mengajarkanku untuk tumbuh dengan bahagia

Hari ini, aku memilih tersenyum
Memilih melihat keindahan di setiap sudut
Karena hidup terlalu pendek
Untuk tidak merayakannya dengan tawa`
        },
    },
    pantun: {
        romantis: {
            title: "Pantun Rindu Kasih",
            content: `Buah delima merah merona
Dipetik tangan di pagi hari
Sejak pertama mata berjumpa
Hatiku telah jatuh padamu sendiri

Perahu layar menuju pulau
Nelayan pulang membawa hasil tangkapan
Seribu kata takkan mampu
Menggambarkan dalam rasa kasih sayang

Kembang melati harum semerbak
Ditanam indah di taman hati
Semoga cinta kita tak pernah retak
Hingga rambut memutih dan usia tinggi

Ombak bergulung ke tepi pantai
Pasir putih bersih berkilauan
Di mana pun kaki ini sampai
Hanya dirimu dalam impianku`
        },
        inspiratif: {
            title: "Pantun Nasihat Bijak",
            content: `Pergi ke hutan mencari rotan
Rotan dipintal jadi keranjang
Ilmu adalah bekal kehidupan
Kejarlah sampai napas terbuang

Burung merak berbulu indah
Terbang tinggi ke angkasa luas
Jangan takut pernah jatuh dan salah
Karena kegagalan adalah jalan kelas

Pohon beringin rindang daunnya
Tempat berteduh di siang panas
Jadilah orang yang berguna
Bagi sesama tanpa pernah belas

Sawah menghijau di pagi cerah
Petani bekerja dengan tekun
Dengan kerja keras dan langkah terarah
Sukses akan datang di kemudian waktu`
        },
        gembira: {
            title: "Pantun Suka Cita",
            content: `Pisang goreng hangat dari dapur
Dimakan bersama teh manis sore
Hidup ini terlalu singkat untuk cemberut
Tersenyumlah dan bahagiakan hatimu

Anak-anak bermain di halaman
Tertawa riang berlari-lari
Kebahagiaan itu sederhana sekali
Tersedia bagi yang mau menikmati

Mangga matang jatuh ke tanah
Segera dipungut oleh sang anak
Berbagi senyum tidaklah susah
Tapi hasilnya sungguh berdampak

Kupu-kupu hinggap di bunga
Sayapnya indah berwarna-warni
Syukuri hidup penuh bahagia
Setiap hari adalah anugerah Ilahi`
        },
    },
    cerpen: {
        melankolis: {
            title: "Hujan di Bulan Desember",
            content: `Hujan turun lagi di Jakarta, seperti biasa di bulan Desember. Rina berdiri di balik jendela kantornya yang berada di lantai sepuluh, memandang butiran air yang menari-nari di permukaan kaca.

"Sudah lima tahun," gumamnya pelan, hampir seperti bisikan.

Lima tahun sejak Ardi pergi. Bukan karena tidak cinta, tapi karena takdir yang memilih jalan berbeda. Sebuah kecelakaan di jalan Sudirman di malam hujan seperti ini telah mengambilnya pergi, menyisakan Rina dengan tumpukan kenangan dan cincin tunangan yang tak pernah menjadi cincin pernikahan.

Teleponnya berdering, membuyarkan lamunan. "Bu Rina, meeting jam tiga sudah siap."

Ia menghapus setetes air mata yang sempat lolos. Di mejanya, foto mereka berdua masih berdiri tegak—pengingat tentang cinta yang pernah begitu nyata.

"Aku masih merindukanmu," ucapnya pada angin, sebelum berbalik menghadapi dunia.

Hujan masih turun. Dan Rina pun masih terus melangkah, membawa Ardi dalam setiap hembusan napasnya.`
        },
        inspiratif: {
            title: "Kopi Pahit, Impian Manis",
            content: `Warung kopi kecil itu berdiri di sudut gang sempit Malioboro. Catnya mengelupas, atapnya bocor sana-sini, tapi selalu ramai dikunjungi orang. Rahasia keramaiannya: Pak Karso, pemiliknya yang tak pernah berhenti tersenyum.

"Pak, kok bisa tetap semangat?" tanya Budi, mahasiswa yang selalu nongkrong di situ sore-sore.

Pak Karso menuangkan kopi ke cangkir dengan gerakan telateni. "Dulu, saya pernah bangkrut tiga kali, Nak. Jualan bakso bangkrut. Buka warung makan, bangkrut juga. Sempat jadi tukang parkir."

Budi terdiam.

"Tapi setiap jatuh, saya belajar satu hal baru." Pak Karso menyodorkan kopi. "Kopi ini juga, gagal berkali-kali sampai ketemu racikan yang pas."

Budi menyesap kopinya. Pahit di awal, tapi ada manis yang tersisa di lidah.

"Hidup itu seperti kopi, Nak. Nikmatnya baru terasa kalau kamu berani merasakan pahitnya dulu."

Malam itu, Budi pulang dengan langkah lebih ringan. Proposal skripsinya yang ditolak tiga kali bukan lagi beban, tapi tantangan.`
        },
        romantis: {
            title: "Senja di Stasiun Tugu",
            content: `Setiap sore, Maya duduk di bangku panjang Stasiun Tugu, berpura-pura menunggu kereta yang tak pernah ia naiki. Yang sebenarnya ia tunggu adalah sosok laki-laki berjaket biru yang selalu lewat pukul lima kurang seperempat.

Mereka tak pernah bicara—hanya bertukar senyum dan tatapan yang berbicara lebih dari seribu kata.

Suatu sore, sosok itu tidak muncul. Maya menunggu hingga stasiun mulai sepi. Kecewa menyeruak, tapi ia tetap duduk diam.

"Permisi..."

Maya menoleh. Laki-laki berjaket biru itu berdiri di sampingnya, memegang dua cangkir kopi.

"Saya Aldo. Sudah sebulan saya ingin menyapa, tapi selalu tidak berani." Ia mengulurkan satu cangkir. "Kopi?"

Maya menerima dengan tangan sedikit gemetar. "Maya."

"Aku tahu," Aldo tersenyum. "Namamu tertera di name tag yang pernah kamu pakai."

Senja itu, stasiun Tugu menjadi saksi awal dari sebuah cerita yang mereka berdua tak akan pernah lupakan.`
        },
    },
    gurindam: {
        inspiratif: {
            title: "Gurindam Nasihat Kehidupan",
            content: `Barang siapa rajin berusaha
Niscaya berhasil dengan mudahnya

Barang siapa malas membaca
Akan tertinggal sepanjang masa

Barang siapa rendah hati selalu
Akan dihormati orang di mana-mana

Barang siapa tekun berdoa
Pertolongan Tuhan pasti tiba

Barang siapa sabar menghadapi cobaan
Kebahagiaan akan jadi kenyataan

Barang siapa suka menolong sesama
Rezekinya akan ditambahkan Tuhan Yang Esa

Barang siapa jujur dalam berkata
Kepercayaan orang akan dijaga

Barang siapa pandai bersyukur
Hidupnya akan selalu makmur`
        },
        filosofis: {
            title: "Gurindam Makna Hidup",
            content: `Barang siapa mengenal dirinya
Ia telah mengenal Tuhannya

Barang siapa hidup penuh makna
Kematian bukanlah bencana

Barang siapa mengejar dunia semata
Akhiratnya akan merana

Barang siapa mencari ketenangan jiwa
Tinggalkan dengki dan dusta

Barang siapa bijak menggunakan waktu
Tak akan hidup penuh penyesalan yang merayu

Barang siapa memaafkan dengan tulus
Beban hatinya akan pupus

Barang siapa hidup untuk sesama
Kenangannya abadi sepanjang masa`
        },
    },
    syair: {
        inspiratif: {
            title: "Syair Sang Pejuang Ilmu",
            content: `Wahai pemuda harapan negeri
Dengarkanlah nasihat ini dengan sepenuh hati
Hidup ini penuh dengan ujian yang berbagai
Jangan mudah patah dan terhenti

Belajarlah dari burung yang terbang tinggi
Meski sayapnya lelah dan terasa berat sekali
Ia tetap terus mengepak dengan berani
Sampai tujuannya tercapai dengan pasti

Ilmu adalah pelita dalam kegelapan malam
Penunjuk jalan bagi mereka yang dalam kelam
Raihlah ilmu setinggi langit yang dalam
Jadikan dirimu bermanfaat dan berkalam

Jangan takut pada kegagalan yang datang
Karena setiap jatuh adalah pelajaran yang panjang
Bangkitlah dengan semangat yang tak pernah hilang
Raihlah impianmu hingga ke seberang`
        },
        romantis: {
            title: "Syair Cinta Abadi",
            content: `Dikisahkan seorang pemuda yang setia
Mencintai kekasihnya dengan penuh cita
Cintanya murni seperti embun pagi
Yang menyejukkan hati tanpa henti

Setiap hari ia menanti dengan sabar
Walaupun jarak memisahkan tanpa ganti
Cintanya tak pernah luntur oleh waktu
Tetap setia bagai bintang di langit malam

Dikala petang matahari mulai tenggelam
Ia berdoa untuk kekasih yang dicinta
Semoga cinta mereka abadi selama-lamanya
Tak terpisahkan oleh apapun yang coba

Inilah kisah cinta yang sejati
Yang bertahan melampaui segala rintangan
Mengajarkan kita arti kesetiaan
Dan makna cinta yang sesungguhnya ada`
        },
    },
    prosa: {
        filosofis: {
            title: "Renungan di Tepi Waktu",
            content: `Ada kalanya kita perlu berhenti sejenak dari hiruk-pikuk kehidupan. Menarik napas dalam-dalam, merasakan udara mengisi paru-paru, dan bertanya: apa sesungguhnya yang sedang kita kejar?

Dunia bergerak begitu cepat. Notifikasi datang silih berganti, deadline menumpuk, dan kita terus berlari tanpa sempat bertanya: ke mana sebenarnya kita menuju?

Mungkin jawabannya ada di kesunyian. Di saat-saat ketika kita berani menatap diri sendiri tanpa topeng, tanpa pretensi. Di momen ketika kita menyadari bahwa kebahagiaan bukanlah tujuan yang harus dikejar, melainkan cara kita menjalani perjalanan.

Seperti sungai yang mengalir, hidup akan terus bergerak. Tapi sungai tidak pernah terburu-buru. Ia mengalir dengan tenang, melewati bebatuan, menerima air hujan, hingga akhirnya bertemu laut.

Mungkin kita perlu belajar dari sungai. Mengalir dengan tenang, menerima setiap lekukan perjalanan, dan percaya bahwa kita akan sampai ke tempat yang seharusnya—entah kapan, entah bagaimana.`
        },
        inspiratif: {
            title: "Surat untuk Diriku Sendiri",
            content: `Kepada diriku yang sedang membaca ini,

Aku tahu kamu lelah. Aku tahu beban di bahumu terasa semakin berat setiap harinya. Aku tahu ada malam-malam ketika kamu berbaring di tempat tidur, mempertanyakan segalanya.

Tapi dengarkanlah: kamu sudah melangkah sejauh ini. Lihatlah ke belakang—berapa banyak badai yang sudah kamu lewati? Berapa banyak kali kamu pikir tidak akan kuat, tapi ternyata kamu berhasil?

Kamu lebih tangguh dari yang kamu kira. Lebih berani dari yang kamu percaya. Dan lebih berharga dari yang dunia kadang perlihatkan.

Tidak apa-apa untuk merasa lelah. Tidak apa-apa untuk menangis. Tidak apa-apa untuk butuh istirahat. Yang penting, jangan pernah menyerah pada dirimu sendiri.

Besok adalah halaman baru. Matahari akan terbit lagi. Dan kamu—kamu akan bangkit lagi.

Dengan cinta,
Dirimu yang lebih kuat dari kemarin`
        },
    },
};

// Analyze theme to determine the best mood
function analyzeMoodFromTheme(theme: string): string {
    const lowerTheme = theme.toLowerCase();

    // Combined indicators (check multi-word phrases first - highest priority)
    const combinedMelankolis = ['cinta hilang', 'cinta yang hilang', 'patah hati', 'hati yang luka', 'kehilangan cinta', 'ditinggal pergi', 'cinta pergi', 'hati yang sepi'];
    if (combinedMelankolis.some(k => lowerTheme.includes(k))) {
        return 'melankolis';
    }

    // Melankolis indicators (sadness, loss, longing) - high priority
    const melankolisKeywords = ['hilang', 'pergi', 'kehilangan', 'sedih', 'duka', 'patah', 'luka', 'air mata', 'tangis', 'sepi', 'sunyi', 'mati', 'kematian', 'perpisahan', 'ditinggal', 'sendiri', 'galau', 'putus', 'broken', 'lost', 'hancur', 'berakhir'];
    if (melankolisKeywords.some(k => lowerTheme.includes(k))) {
        return 'melankolis';
    }

    // Romantis indicators (love, romance)
    const romantisKeywords = ['cinta', 'kasih', 'sayang', 'rindu', 'kekasih', 'jatuh cinta', 'asmara', 'romantis', 'peluk', 'hati', 'jodoh', 'pasangan', 'bersama', 'love'];
    if (romantisKeywords.some(k => lowerTheme.includes(k))) {
        return 'romantis';
    }

    // Inspiratif indicators (motivation, success)
    const inspiratifKeywords = ['semangat', 'bangkit', 'sukses', 'impian', 'mimpi', 'harapan', 'perjuangan', 'motivasi', 'inspirasi', 'berani', 'kuat', 'pantang menyerah', 'masa depan'];
    if (inspiratifKeywords.some(k => lowerTheme.includes(k))) {
        return 'inspiratif';
    }

    // Gembira indicators (happiness, joy)
    const gembiraKeywords = ['bahagia', 'senang', 'sukacita', 'ceria', 'tawa', 'riang', 'gembira', 'perayaan', 'syukur', 'beruntung'];
    if (gembiraKeywords.some(k => lowerTheme.includes(k))) {
        return 'gembira';
    }

    // Filosofis indicators (philosophical, deep thought)
    const filosofisKeywords = ['hidup', 'kehidupan', 'waktu', 'makna', 'tujuan', 'eksistensi', 'alam', 'semesta', 'kematian', 'keabadian', 'refleksi', 'perenungan'];
    if (filosofisKeywords.some(k => lowerTheme.includes(k))) {
        return 'filosofis';
    }

    return ''; // No match, use user's selected mood
}

function generateBeautifulMockResponse(request: GenerationRequest): { title: string; content: string } {
    const typeSamples = beautifulSamples[request.literatureType];

    // First, try to detect mood from theme
    const detectedMood = analyzeMoodFromTheme(request.theme);
    const effectiveMood = detectedMood || request.mood;

    if (typeSamples) {
        const moodSample = typeSamples[effectiveMood];
        if (moodSample) {
            // Modify the title to include the user's theme for better relevance
            return {
                title: `${request.theme}`,
                content: moodSample.content
            };
        }
        // Return first available for this type
        const firstMood = Object.keys(typeSamples)[0];
        const fallbackSample = typeSamples[firstMood];
        return {
            title: `${request.theme}`,
            content: fallbackSample.content
        };
    }

    // Ultimate fallback
    return {
        title: `${request.literatureType.charAt(0).toUpperCase() + request.literatureType.slice(1)} tentang ${request.theme}`,
        content: `Sebuah karya ${request.literatureType} yang indah dengan tema "${request.theme}" dalam gaya ${request.style} dan suasana ${request.mood}.

Untuk menghasilkan karya sastra AI yang sesungguhnya, silakan tambahkan API key di file .env:
- GEMINI_API_KEY (gratis dari Google AI Studio)
- atau OPENAI_API_KEY

Karya ini akan menjadi sangat istimewa dengan sentuhan AI!`
    };
}

function generateDefaultTitle(type: string, theme: string): string {
    const typeNames: Record<string, string> = {
        puisi: "Puisi",
        pantun: "Pantun",
        cerpen: "Cerpen",
        gurindam: "Gurindam",
        syair: "Syair",
        prosa: "Prosa",
    };

    const typeName = typeNames[type] || "Karya";
    // Create a more poetic title
    const poeticPrefixes = ["Aksara", "Untaian", "Nyanyian", "Bisikan", "Jejak"];
    const randomPrefix = poeticPrefixes[Math.floor(Math.random() * poeticPrefixes.length)];
    return `${randomPrefix} ${theme}`;
}

export async function POST(request: NextRequest) {
    try {
        const body: GenerationRequest = await request.json();

        // Validate required fields
        if (!body.literatureType || !body.theme || !body.style || !body.mood) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Mohon lengkapi semua field yang diperlukan: jenis sastra, tema, gaya, dan suasana"
                },
                { status: 400 }
            );
        }

        // Build the prompt
        const prompt = buildPrompt(body);

        let generatedContent: string | null = null;
        let title: string;
        let usedModel = "sample";

        // Try Gemini first (free!)
        generatedContent = await callGeminiAPI(prompt);
        if (generatedContent) {
            usedModel = "gemini";
        }

        // Try OpenAI as fallback
        if (!generatedContent) {
            generatedContent = await callOpenAIAPI(prompt);
            if (generatedContent) {
                usedModel = "openai";
            }
        }

        // Use beautiful mock response if no API key
        if (!generatedContent) {
            const mock = generateBeautifulMockResponse(body);
            generatedContent = mock.content;
            title = mock.title;
        } else {
            // Generate title using AI
            title = await generateTitle(generatedContent, body.literatureType, body.theme);
        }

        return NextResponse.json({
            success: true,
            content: generatedContent,
            title: title,
            metadata: {
                literatureType: body.literatureType,
                theme: body.theme,
                style: body.style,
                mood: body.mood,
                length: body.length,
                model: usedModel,
                generatedAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("Generation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Terjadi kesalahan saat menghasilkan karya. Silakan coba lagi."
            },
            { status: 500 }
        );
    }
}
