"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    Sparkles,
    Search,
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
        <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
                            Analisis Karya{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500">
                                dengan AI
                            </span>
                        </h1>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Dapatkan feedback mendalam tentang karya sastra Anda dari kecerdasan buatan
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
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-indigo-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-violet-600" />
                                        <h2 className="font-semibold text-gray-900">Karya Anda</h2>
                                    </div>
                                    {content && (
                                        <button
                                            onClick={handleReset}
                                            className="p-2 text-gray-500 hover:bg-white/80 rounded-lg transition-colors"
                                            title="Reset"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="p-6">
                                    {/* Sample Texts */}
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 mb-2">Coba contoh:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {sampleTexts.map((sample, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setContent(sample.content)}
                                                    className="px-3 py-1.5 text-xs bg-violet-50 text-violet-700 rounded-full hover:bg-violet-100 transition-colors border border-violet-200"
                                                >
                                                    {sample.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Textarea */}
                                    <textarea
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                            setError("");
                                        }}
                                        placeholder="Tempelkan atau tulis karya sastra Anda di sini...

Contoh:
Di tepi pantai aku berdiri
Memandang ombak yang berlari
Rindu ini tak bisa lari
Meski kau jauh di ujung hari"
                                        className="w-full h-64 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all resize-none font-serif text-gray-800"
                                    />

                                    <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                                        <span>{content.length} karakter</span>
                                        <span>{content.split(/\s+/).filter(w => w).length} kata</span>
                                    </div>

                                    {/* Error */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2"
                                            >
                                                <AlertCircle className="w-4 h-4" />
                                                {error}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Analyze Button */}
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing || !content.trim()}
                                        className="w-full mt-6 py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Menganalisis...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                Analisis Karya
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Result Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-violet-50 to-indigo-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-violet-600" />
                                        <h2 className="font-semibold text-gray-900">Hasil Analisis</h2>
                                    </div>
                                    {result && (
                                        <button
                                            onClick={copyAnalysis}
                                            className="p-2 text-gray-500 hover:bg-white/80 rounded-lg transition-colors"
                                            title="Salin Analisis"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    )}
                                </div>

                                <div className="p-6 min-h-[500px]">
                                    {result ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-6"
                                        >
                                            {/* Score */}
                                            <div className="text-center">
                                                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${getScoreColor(result.overallScore)} shadow-lg`}>
                                                    <div className="text-center">
                                                        <div className="text-3xl font-bold text-white">{result.overallScore}</div>
                                                        <div className="text-xs text-white/80">/100</div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-lg font-semibold text-gray-900">
                                                    {getScoreLabel(result.overallScore)}
                                                </div>
                                            </div>

                                            {/* Summary */}
                                            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-4">
                                                <p className="text-gray-700 text-sm leading-relaxed">
                                                    {result.summary}
                                                </p>
                                            </div>

                                            {/* Quick Info */}
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                                    <div className="text-xs text-gray-500 mb-1">Jenis</div>
                                                    <div className="font-semibold text-gray-900 capitalize text-sm">
                                                        {result.literatureType}
                                                    </div>
                                                </div>
                                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                                    <div className="text-xs text-gray-500 mb-1">Tema</div>
                                                    <div className="font-semibold text-gray-900 text-sm truncate" title={result.theme}>
                                                        {result.theme}
                                                    </div>
                                                </div>
                                                <div className="text-center p-3 bg-gray-50 rounded-xl">
                                                    <div className="text-xs text-gray-500 mb-1">Suasana</div>
                                                    <div className="font-semibold text-gray-900 capitalize text-sm">
                                                        {result.mood}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Strengths */}
                                            <div>
                                                <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    Kekuatan
                                                </h3>
                                                <ul className="space-y-2">
                                                    {result.strengths.map((strength, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                            <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                                                ✓
                                                            </span>
                                                            {strength}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Improvements */}
                                            <div>
                                                <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                                                    <PenTool className="w-4 h-4 text-amber-500" />
                                                    Saran Perbaikan
                                                </h3>
                                                <ul className="space-y-2">
                                                    {result.improvements.map((improvement, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                            <span className="w-5 h-5 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                                                •
                                                            </span>
                                                            {improvement}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Figurative Language */}
                                            {result.figurativeLanguage.length > 0 && (
                                                <div>
                                                    <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
                                                        <BookOpen className="w-4 h-4 text-violet-500" />
                                                        Majas & Gaya Bahasa
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {result.figurativeLanguage.map((fig, i) => (
                                                            <div key={i} className="p-3 bg-violet-50 rounded-lg">
                                                                <div className="font-medium text-violet-700 text-sm">{fig.type}</div>
                                                                <div className="text-xs text-gray-600 mt-1 italic">"{fig.example}"</div>
                                                                <div className="text-xs text-gray-500 mt-1">{fig.explanation}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Rhyme Pattern */}
                                            {result.rhymePattern && (
                                                <div className="p-3 bg-indigo-50 rounded-lg">
                                                    <div className="text-xs text-indigo-600 font-medium">Pola Rima</div>
                                                    <div className="text-lg font-bold text-indigo-700">{result.rhymePattern}</div>
                                                </div>
                                            )}

                                            {/* Detailed Feedback */}
                                            <div className="p-4 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-xl">
                                                <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-2">
                                                    <Award className="w-4 h-4 text-violet-600" />
                                                    Feedback untuk Penulis
                                                </h3>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {result.detailedFeedback}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-center py-12">
                                            <div>
                                                <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-100">
                                                    <Search className="w-10 h-10 text-violet-500" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                    Analisis Karya Anda
                                                </h3>
                                                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                                    Tempelkan karya sastra di sebelah kiri, lalu klik "Analisis Karya" untuk mendapatkan feedback AI
                                                </p>

                                                {/* Features */}
                                                <div className="mt-6 space-y-2">
                                                    {[
                                                        "Skor kualitas keseluruhan",
                                                        "Identifikasi kekuatan karya",
                                                        "Saran perbaikan konstruktif",
                                                        "Analisis gaya bahasa"
                                                    ].map((feature, i) => (
                                                        <motion.p
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="text-xs text-gray-400"
                                                        >
                                                            • {feature}
                                                        </motion.p>
                                                    ))}
                                                </div>
                                            </div>
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
