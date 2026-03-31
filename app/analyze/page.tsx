"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    FileText,
    TrendingUp,
    Award,
    AlertCircle,
    CheckCircle,
    BookOpen,
    PenTool,
    Loader2,
    Copy,
    Check,
    RotateCcw,
    Search,
} from "lucide-react";

interface FigurativeLanguage {
    type: string;
    example: string;
    explanation: string;
}

interface AnalysisResult {
    summary: string;
    literatureType: string;
    theme: string;
    mood: string;
    strengths: string[];
    improvements: string[];
    styleAnalysis: string;
    figurativeLanguage: FigurativeLanguage[];
    rhymePattern?: string;
    overallScore: number;
    detailedFeedback: string;
}

const sampleTexts = [
    {
        label: "Puisi Modern",
        content: `Di tepi sungai waktu aku berdiri
Menyaksikan arus yang tak pernah kembali
Setiap tetes adalah kenangan yang berlari
Menuju lautan masa lalu yang sunyi

Aku menggenggam batu-batu kali
Berharap mereka menyimpan cerita
Tentang hujan yang pernah membasahi
Dan mentari yang menerangi jiwa`
    },
    {
        label: "Pantun Nasihat",
        content: `Pergi ke sawah melihat padi
Padi menguning siap dituai
Ilmu itu pelita hati
Siapa berilmu pasti sampai`
    },
    {
        label: "Gurindam",
        content: `Barang siapa tiada memegang agama
Sekali-kali tiada boleh dibilangkan nama

Barang siapa mengenal yang empat
Maka ia itulah orang yang makrifat`
    }
];

const getScoreColor = (score: number) => {
    if (score >= 85) return "from-green-500 to-emerald-500";
    if (score >= 70) return "from-amber-500 to-orange-500";
    if (score >= 50) return "from-yellow-500 to-amber-500";
    return "from-red-500 to-orange-500";
};

const getScoreLabel = (score: number) => {
    if (score >= 85) return "Luar Biasa";
    if (score >= 70) return "Sangat Baik";
    if (score >= 50) return "Baik";
    return "Perlu Perbaikan";
};

export default function AnalyzePage() {
    const [content, setContent] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleAnalyze = async () => {
        if (!content.trim()) {
            setError("Masukkan karya sastra yang ingin dianalisis");
            return;
        }

        if (content.trim().length < 20) {
            setError("Karya terlalu pendek. Minimal 20 karakter untuk analisis.");
            return;
        }

        setIsAnalyzing(true);
        setError("");
        setResult(null);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.analysis);
            } else {
                setError(data.error || "Terjadi kesalahan saat menganalisis karya");
            }
        } catch (err) {
            console.error("Analysis error:", err);
            setError("Gagal terhubung ke server. Silakan coba lagi.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setContent("");
        setResult(null);
        setError("");
    };

    const copyAnalysis = async () => {
        if (!result) return;

        const analysisText = `
Analisis Karya Sastra - Sastrafy

Ringkasan: ${result.summary}
Jenis: ${result.literatureType}
Tema: ${result.theme}
Suasana: ${result.mood}
Skor: ${result.overallScore}/100

Kekuatan:
${result.strengths.map(s => `- ${s}`).join('\n')}

Saran Perbaikan:
${result.improvements.map(i => `- ${i}`).join('\n')}

Analisis Gaya: ${result.styleAnalysis}

Feedback: ${result.detailedFeedback}
        `.trim();

        try {
            await navigator.clipboard.writeText(analysisText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <main className="min-h-screen bg-batik-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-batik-950 mb-6">
                            Layar <span className="text-batik-600">Bedah</span>
                        </h1>
                        <p className="text-lg text-batik-700 max-w-2xl mx-auto font-light">
                            Bedah setiap baris dan bait untuk menemukan keindahan yang tersembunyi.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="bg-white border border-batik-100 overflow-hidden flex flex-col h-full min-h-[600px]">
                                <div className="p-8 border-b border-batik-50 flex items-center justify-between">
                                    <h2 className="text-[10px] uppercase tracking-widest font-bold text-batik-900">Karya Anda</h2>
                                    {content && (
                                        <button onClick={handleReset} className="text-batik-400 hover:text-batik-900 transition-colors">
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    {/* Samples */}
                                    <div className="mb-6 flex flex-wrap gap-4">
                                        {sampleTexts.map((sample, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setContent(sample.content)}
                                                className="text-[10px] uppercase tracking-widest font-bold text-batik-400 hover:text-batik-900 transition-colors"
                                            >
                                                # {sample.label}
                                            </button>
                                        ))}
                                    </div>

                                    <textarea
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                            setError("");
                                        }}
                                        placeholder="Tuliskan karya sastra di sini..."
                                        className="w-full flex-1 p-0 bg-transparent border-none focus:ring-0 resize-none font-serif text-batik-900 leading-loose text-lg italic placeholder:text-batik-100"
                                    />

                                    <div className="flex items-center justify-between mt-6 text-[10px] uppercase tracking-widest font-bold text-batik-300">
                                        <span>{content.length} Karakter</span>
                                        <span>{content.split(/\s+/).filter(w => w).length} Kata</span>
                                    </div>

                                    <button
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing || !content.trim()}
                                        className="w-full mt-8 py-5 bg-batik-900 text-batik-50 font-bold uppercase tracking-widest text-xs hover:bg-batik-800 transition-all shadow-xl shadow-batik-900/10 disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {isAnalyzing ? "Membedah Karya..." : "Mulai Analisis"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-white border border-batik-100 overflow-hidden flex flex-col h-full min-h-[600px]">
                                <div className="p-8 border-b border-batik-50 flex items-center justify-between">
                                    <h2 className="text-[10px] uppercase tracking-widest font-bold text-batik-900">Hasil Bedah</h2>
                                    {result && (
                                        <button onClick={copyAnalysis} className="text-batik-400 hover:text-batik-900 transition-colors">
                                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    )}
                                </div>

                                <div className="p-10 flex-1">
                                    {result ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-12"
                                        >
                                            {/* Score */}
                                            <div className="flex items-center gap-8 p-8 bg-batik-50 border border-batik-100">
                                                <div className="w-24 h-24 border-2 border-batik-900 rounded-full flex items-center justify-center">
                                                    <span className="text-3xl font-serif font-bold text-batik-900">{result.overallScore}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-serif font-bold text-batik-950 mb-1">{getScoreLabel(result.overallScore)}</h3>
                                                    <p className="text-xs uppercase tracking-widest font-bold text-batik-400">Skor Kualitas Estetika</p>
                                                </div>
                                            </div>

                                            {/* Summary */}
                                            <div className="font-serif italic text-batik-900 leading-relaxed text-sm">
                                                "{result.summary}"
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-batik-50">
                                                <div>
                                                    <span className="block text-[10px] uppercase tracking-widest font-bold text-batik-300 mb-2">Jenis</span>
                                                    <span className="font-bold text-batik-900 text-xs">{result.literatureType}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-[10px] uppercase tracking-widest font-bold text-batik-300 mb-2">Tema</span>
                                                    <span className="font-bold text-batik-900 text-xs">{result.theme}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-[10px] uppercase tracking-widest font-bold text-batik-300 mb-2">Mood</span>
                                                    <span className="font-bold text-batik-900 text-xs">{result.mood}</span>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-8">
                                                <div>
                                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-batik-900 mb-4">Unsur Kekuatan</h4>
                                                    <ul className="space-y-3">
                                                        {result.strengths.map((s, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-batik-700 font-light">
                                                                <span className="w-1.5 h-1.5 bg-batik-900 mt-1.5 flex-shrink-0" />
                                                                {s}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-batik-900 mb-4">Saran Estetika</h4>
                                                    <ul className="space-y-3">
                                                        {result.improvements.map((s, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm text-batik-700 font-light">
                                                                <span className="w-1.5 h-1.5 bg-batik-300 mt-1.5 flex-shrink-0" />
                                                                {s}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Feedback */}
                                            <div className="p-8 border border-batik-900 bg-batik-950 text-batik-50">
                                                <h4 className="text-[10px] uppercase tracking-widest font-bold text-batik-400 mb-4">Catatan Kurator</h4>
                                                <p className="font-serif italic text-sm leading-relaxed">{result.detailedFeedback}</p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                                            <Search className="w-16 h-16 text-batik-900 mb-6" />
                                            <p className="text-sm font-serif italic text-batik-900">Bedahan karya akan muncul di sini...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
