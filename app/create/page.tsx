"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LiteratureType, WritingStyle, Mood } from "@/types";
import { literatureTypeNames, styleNames, moodNames } from "@/lib/utils";
import {
    Sparkles,
    Wand2,
    Copy,
    Download,
    RefreshCw,
    ChevronDown,
    Check,
    Lightbulb,
    Zap,
    PenTool,
    BookOpen,
    FileText,
    Feather,
    ScrollText,
} from "lucide-react";

const literatureTypeDescriptions: Record<LiteratureType, string> = {
    puisi: "Karya sastra yang mengungkapkan perasaan dengan bahasa indah, imajinatif, dan penuh makna",
    pantun: "Puisi lama Melayu dengan 4 baris berpola a-b-a-b, terdiri dari sampiran dan isi",
    cerpen: "Cerita pendek fiksi yang berfokus pada satu konflik utama dengan jumlah tokoh terbatas",
    gurindam: "Puisi 2 baris bersajak a-a yang berisi nasihat atau ajaran moral",
    syair: "Puisi 4 baris bersajak a-a-a-a, seluruh baris adalah isi yang membentuk narasi",
    prosa: "Tulisan bebas dalam bentuk paragraf tanpa aturan rima atau bait",
};

const literatureIcons: Record<LiteratureType, React.ReactNode> = {
    puisi: <Feather className="w-5 h-5" />,
    pantun: <ScrollText className="w-5 h-5" />,
    cerpen: <BookOpen className="w-5 h-5" />,
    gurindam: <FileText className="w-5 h-5" />,
    syair: <PenTool className="w-5 h-5" />,
    prosa: <FileText className="w-5 h-5" />,
};

const themeSuggestions: Record<LiteratureType, string[]> = {
    puisi: ["Rindu kampung halaman", "Keindahan alam Indonesia", "Cinta yang hilang", "Perjuangan hidup"],
    pantun: ["Nasihat untuk anak muda", "Cinta tanah air", "Persahabatan sejati", "Kerja keras"],
    cerpen: ["Pertemuan tak terduga", "Rahasia keluarga", "Mimpi yang terpendam", "Kegagalan yang mengajarkan"],
    gurindam: ["Kejujuran", "Menghormati orang tua", "Kesabaran", "Keberanian"],
    syair: ["Kisah pahlawan", "Perjalanan merantau", "Cinta sejati", "Nasihat kehidupan"],
    prosa: ["Refleksi perjalanan hidup", "Makna kesederhanaan", "Filosofi kehidupan", "Tradisi yang luntur"],
};

export default function CreatePage() {
    const [selectedType, setSelectedType] = useState<LiteratureType>("puisi");
    const [theme, setTheme] = useState("");
    const [style, setStyle] = useState<WritingStyle>("modern");
    const [mood, setMood] = useState<Mood>("inspiratif");
    const [length, setLength] = useState<"short" | "medium" | "long">("medium");
    const [description, setDescription] = useState("");
    const [generatedContent, setGeneratedContent] = useState("");
    const [generatedTitle, setGeneratedTitle] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeStep, setActiveStep] = useState(1);
    const resultRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async () => {
        if (!theme.trim()) {
            setError("Masukkan tema atau topik untuk karya Anda");
            return;
        }

        setIsGenerating(true);
        setError("");
        setGeneratedContent("");
        setGeneratedTitle("");

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    literatureType: selectedType,
                    theme,
                    style,
                    mood,
                    length,
                    additionalInstructions: description,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setGeneratedContent(data.content);
                setGeneratedTitle(data.title || `${literatureTypeNames[selectedType]} - ${theme}`);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);

                // Scroll to result
                setTimeout(() => {
                    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
            } else {
                setError(data.error || "Terjadi kesalahan saat menghasilkan karya");
            }
        } catch (err) {
            console.error("Generation error:", err);
            setError("Gagal terhubung ke server. Silakan coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`${generatedTitle}\n\n${generatedContent}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const downloadText = () => {
        const content = `${generatedTitle}\n\n${generatedContent}\n\n---\nDibuat dengan Sastrafy - Platform Sastra AI Indonesia`;
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedType}-${theme.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
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
                            Studio Kreatif{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-500 to-red-500">
                                AI Sastra
                            </span>
                        </h1>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Ciptakan puisi, pantun, cerpen, dan karya sastra lainnya dengan bantuan kecerdasan buatan
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Form Panel - 3 columns */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-3"
                        >
                            {/* Step Indicator */}
                            <div className="flex items-center gap-2 mb-6">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${activeStep >= step
                                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                                            : "bg-gray-100 text-gray-400"
                                            }`}>
                                            {step}
                                        </div>
                                        {step < 3 && (
                                            <div className={`w-12 h-1 mx-1 rounded transition-all ${activeStep > step ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gray-100"
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                {/* Step 1: Literature Type */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-bold text-amber-600">1</span>
                                        </div>
                                        <h2 className="font-semibold text-gray-900">Pilih Jenis Karya</h2>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {(Object.keys(literatureTypeNames) as LiteratureType[]).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => {
                                                    setSelectedType(type);
                                                    setActiveStep(Math.max(activeStep, 2));
                                                }}
                                                className={`group relative p-4 rounded-xl border-2 transition-all text-left ${selectedType === type
                                                    ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 shadow-lg shadow-amber-100"
                                                    : "bg-white border-gray-200 hover:border-amber-300 hover:shadow-md"
                                                    }`}
                                            >
                                                <div className={`mb-2 ${selectedType === type ? "text-amber-600" : "text-gray-400 group-hover:text-amber-500"}`}>
                                                    {literatureIcons[type]}
                                                </div>
                                                <div className="font-semibold text-gray-900">{literatureTypeNames[type]}</div>
                                                {selectedType === type && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute top-2 right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                                                    >
                                                        <Check className="w-3 h-3 text-white" />
                                                    </motion.div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="mt-3 text-sm text-gray-500">
                                        {literatureTypeDescriptions[selectedType]}
                                    </p>
                                </div>

                                {/* Step 2: Theme & Description */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-bold text-amber-600">2</span>
                                        </div>
                                        <h2 className="font-semibold text-gray-900">Tentukan Tema & Deskripsi</h2>
                                    </div>

                                    {/* Theme Input */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tema atau Topik <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={theme}
                                            onChange={(e) => {
                                                setTheme(e.target.value);
                                                setError("");
                                                if (e.target.value) setActiveStep(Math.max(activeStep, 3));
                                            }}
                                            placeholder="Contoh: Keindahan alam, perjuangan hidup..."
                                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:ring-2 focus:ring-amber-200 ${error && !theme
                                                ? "border-red-400"
                                                : "border-gray-200 focus:border-amber-500"
                                                }`}
                                        />

                                        {/* Quick Suggestions */}
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {themeSuggestions[selectedType].map((suggestion, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setTheme(suggestion)}
                                                    className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-amber-100 hover:text-amber-700 transition-colors"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Deskripsi Detail (Opsional)
                                        </label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Jelaskan lebih detail karya seperti apa yang Anda inginkan..."
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all resize-none"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Semakin detail deskripsi, semakin sesuai hasilnya
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3: Style Options */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs font-bold text-amber-600">3</span>
                                        </div>
                                        <h2 className="font-semibold text-gray-900">Sesuaikan Gaya</h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                        {/* Style */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Gaya</label>
                                            <select
                                                value={style}
                                                onChange={(e) => setStyle(e.target.value as WritingStyle)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-white"
                                            >
                                                {(Object.keys(styleNames) as WritingStyle[]).map((s) => (
                                                    <option key={s} value={s}>{styleNames[s]}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Mood */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Suasana</label>
                                            <select
                                                value={mood}
                                                onChange={(e) => setMood(e.target.value as Mood)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-white"
                                            >
                                                {(Object.keys(moodNames) as Mood[]).map((m) => (
                                                    <option key={m} value={m}>{moodNames[m]}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Length */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Panjang</label>
                                            <select
                                                value={length}
                                                onChange={(e) => setLength(e.target.value as "short" | "medium" | "long")}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-white"
                                            >
                                                <option value="short">Pendek</option>
                                                <option value="medium">Sedang</option>
                                                <option value="long">Panjang</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Error */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2"
                                            >
                                                <span className="text-lg">⚠️</span>
                                                {error}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Generate Button */}
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Menghasilkan Karya Ajaib...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="w-5 h-5" />
                                                Ciptakan Karya
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Result Panel - 2 columns */}
                        <motion.div
                            ref={resultRef}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-24 overflow-hidden">
                                {/* Header */}
                                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-amber-600" />
                                        <h2 className="font-semibold text-gray-900">Hasil Karya</h2>
                                    </div>
                                    {generatedContent && (
                                        <div className="flex gap-1">
                                            <button
                                                onClick={copyToClipboard}
                                                className="p-2 text-gray-600 hover:bg-white/80 rounded-lg transition-colors"
                                                title="Salin"
                                            >
                                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={downloadText}
                                                className="p-2 text-gray-600 hover:bg-white/80 rounded-lg transition-colors"
                                                title="Unduh"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 min-h-[400px]">
                                    {generatedContent ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4"
                                        >
                                            <h3 className="text-xl font-serif font-bold text-gray-900 text-center">
                                                {generatedTitle}
                                            </h3>

                                            <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-xl p-5 border border-amber-100">
                                                <div className="font-serif text-gray-800 leading-relaxed whitespace-pre-wrap text-center">
                                                    {generatedContent}
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                                    {literatureTypeNames[selectedType]}
                                                </span>
                                                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                                                    {styleNames[style]}
                                                </span>
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                    {moodNames[mood]}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2 pt-2">
                                                <button
                                                    onClick={handleGenerate}
                                                    disabled={isGenerating}
                                                    className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                                >
                                                    <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                                                    Buat Ulang
                                                </button>
                                                <Link
                                                    href="/analyze"
                                                    className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                                                >
                                                    <Zap className="w-4 h-4" />
                                                    Analisis
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-center py-12">
                                            <div>
                                                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-100">
                                                    <Wand2 className="w-10 h-10 text-amber-500" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                    Siap Berkarya?
                                                </h3>
                                                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                                    Pilih jenis karya, masukkan tema, dan klik "Ciptakan Karya" untuk melihat keajaiban AI
                                                </p>

                                                {/* Preview hints */}
                                                <div className="mt-6 space-y-2">
                                                    {[
                                                        "AI akan menghasilkan karya unik",
                                                        "Sesuaikan gaya dan suasana",
                                                        "Unduh atau salin hasilnya"
                                                    ].map((hint, i) => (
                                                        <motion.p
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="text-xs text-gray-400"
                                                        >
                                                            • {hint}
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

            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-green-500/25 flex items-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        Karya berhasil dihasilkan!
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
