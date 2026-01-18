# Sastrafy

**Platform Edukasi dan Generasi Sastra Indonesia Berbasis AI**

Sastrafy adalah aplikasi web yang memungkinkan pengguna mempelajari, menciptakan, dan menganalisis karya sastra Indonesia dengan bantuan kecerdasan buatan. Platform ini mendukung berbagai jenis sastra tradisional maupun modern seperti puisi, pantun, cerpen, gurindam, syair, dan prosa.

---

## Latar Belakang

Sastra Indonesia memiliki kekayaan bentuk dan gaya yang unik, namun seringkali sulit dipelajari secara mandiri. Sastrafy hadir untuk menjembatani gap tersebut dengan menyediakan:

1. **Materi pembelajaran interaktif** tentang berbagai jenis sastra Indonesia
2. **Generator karya sastra AI** yang memahami karakteristik masing-masing jenis sastra
3. **Analyzer karya** yang memberikan feedback konstruktif untuk perbaikan

---

## Fitur Utama

### 1. AI Generator Studio
Hasilkan karya sastra original dengan input tema, gaya (klasik/modern/kontemporer), suasana (romantis/melankolis/inspiratif/dll), dan panjang karya.

### 2. AI Analyzer
Analisis karya sastra Anda dan dapatkan:
- Skor kualitas (1-100)
- Identifikasi kekuatan karya
- Saran perbaikan konstruktif
- Analisis gaya bahasa dan majas

### 3. Learning Hub
Materi lengkap tentang 6 jenis sastra Indonesia:
- **Puisi** - Karya sastra dengan bahasa imajinatif dan penuh makna
- **Pantun** - Puisi 4 baris dengan pola a-b-a-b
- **Cerpen** - Cerita pendek dengan konflik dan resolusi
- **Gurindam** - Puisi 2 baris berisi nasihat
- **Syair** - Puisi 4 baris bersajak a-a-a-a
- **Prosa** - Tulisan bebas dalam bentuk paragraf

### 4. Gallery
Koleksi karya sastra untuk inspirasi dan apresiasi.

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| Animasi | Framer Motion |
| Icons | Lucide React |
| AI | Gemini API |

---

## Instalasi

### Prasyarat
- Node.js 18+ 
- npm atau yarn
- API Key (Gemini atau OpenAI)

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/sastrafy.git
   cd sastrafy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` dan tambahkan API key:
   ```env
   # Pilih salah satu (Gemini GRATIS)
   GEMINI_API_KEY=your_gemini_api_key
   # atau
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**
   ```
   http://localhost:3000
   ```

---

## Mendapatkan API Key

### Gemini API (Gratis)
1. Buka [Google AI Studio](https://aistudio.google.com/apikey)
2. Login dengan akun Google
3. Klik "Create API Key"
4. Copy dan paste ke `.env.local`

### OpenAI API (Berbayar)
1. Buka [OpenAI Platform](https://platform.openai.com/api-keys)
2. Buat akun dan generate API key
3. Copy dan paste ke `.env.local`

---

## Struktur Proyek

```
sastrafy/
├── app/
│   ├── page.tsx              # Landing page
│   ├── create/page.tsx       # AI Generator Studio
│   ├── analyze/page.tsx      # AI Analyzer
│   ├── learn/page.tsx        # Learning Hub
│   ├── gallery/page.tsx      # Gallery
│   ├── dashboard/page.tsx    # User Dashboard
│   └── api/
│       ├── generate/route.ts # API untuk generasi karya
│       └── analyze/route.ts  # API untuk analisis karya
├── components/
│   ├── layout/               # Navbar, Footer
│   └── ui/                   # Komponen UI reusable
├── lib/
│   ├── data.ts               # Data statis (materi, contoh)
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts              # TypeScript type definitions
```

---


## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## Kontribusi

Kontribusi sangat diterima! Silakan buat Pull Request atau buka Issue untuk diskusi.

---

## Kontak

Untuk pertanyaan atau saran, silakan buka Issue di repository ini.

---

