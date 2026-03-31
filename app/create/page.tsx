"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LiteratureType, WritingStyle, Mood } from "@/types";
import { literatureTypeNames, styleNames, moodNames } from "@/lib/utils";
import {
    Copy,
    Download,
    RefreshCw,
    ChevronDown,
    Check,
    Lightbulb,
    Activity,
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
                            Studio <span className="text-batik-600">Kreatif</span>
                        </h1>
                        <p className="text-lg text-batik-700 max-w-2xl mx-auto font-light">
                            Ruang imajinasi untuk menyusun untaian kata yang bermakna.
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
                            <div className="flex items-center gap-4 mb-8">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${activeStep >= step
                                            ? "bg-batik-900 text-batik-50"
                                            : "bg-batik-100 text-batik-400"
                                            }`}>
                                            {step}
                                        </div>
                                        {step < 3 && (
                                            <div className={`w-12 h-px transition-all ${activeStep > step ? "bg-batik-900" : "bg-batik-200"
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                {/* Step 1: Literature Type */}
                                <div className="p-8 border-b border-batik-50">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-1.5 h-1.5 bg-batik-600" />
                                        <h2 className="text-[10px] uppercase tracking-widest font-bold text-batik-900">01. Pilih Jenis Karya</h2>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {(Object.keys(literatureTypeNames) as LiteratureType[]).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => {
                                                    setSelectedType(type);
                                                    setActiveStep(Math.max(activeStep, 2));
                                                }}
                                                className={`group relative p-6 border transition-all text-left ${selectedType === type
                                                    ? "bg-batik-900 border-batik-900 shadow-xl shadow-batik-900/10"
                                                    : "bg-white border-batik-100 hover:border-batik-300"
                                                    }`}
                                            >
                                                <div className={`mb-4 transition-colors ${selectedType === type ? "text-batik-400" : "text-batik-300 group-hover:text-batik-600"}`}>
                                                    {literatureIcons[type]}
                                                </div>
                                                <div className={`font-bold transition-colors ${selectedType === type ? "text-batik-50" : "text-batik-900"}`}>{literatureTypeNames[type]}</div>
                                                {/* Selected Indicator */}
                                                {selectedType === type && (
                                                    <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-batik-400 rounded-full" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-xs text-batik-500 font-light leading-relaxed">
                                        {literatureTypeDescriptions[selectedType]}
                                    </p>
                                </div>

                                {/* Step 2: Theme & Description */}
                                <div className="p-8 border-b border-batik-50">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-1.5 h-1.5 bg-batik-600" />
                                        <h2 className="text-[10px] uppercase tracking-widest font-bold text-batik-900">02. Tentukan Tema</h2>
                                    </div>

                                    {/* Theme Input */}
                                    <div className="mb-8">
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-batik-400 mb-3">
                                            Tema atau Topik <span className="text-batik-900">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={theme}
                                            onChange={(e) => {
                                                setTheme(e.target.value);
                                                setError("");
                                                if (e.target.value) setActiveStep(Math.max(activeStep, 3));
                                            }}
                                            placeholder="Contoh: Senja di Pelabuhan kecil..."
                                            className="w-full px-0 py-3 bg-transparent border-b-2 border-batik-100 focus:border-batik-900 focus:ring-0 transition-all placeholder:text-batik-200 text-batik-900 font-medium text-lg"
                                        />

                                        {/* Suggestions */}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {themeSuggestions[selectedType].map((suggestion, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setTheme(suggestion)}
                                                    className="text-[10px] uppercase tracking-widest font-bold text-batik-400 hover:text-batik-900 transition-colors"
                                                >
                                                    # {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest font-bold text-batik-400 mb-3">
                                            Instruksi Khusus
                                        </label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Jelaskan detail nuansa atau emosi yang ingin disampaikan..."
                                            rows={2}
                                            className="w-full px-4 py-4 bg-batik-50/50 border border-batik-100 focus:border-batik-900 focus:ring-0 transition-all text-batik-900 font-light text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Step 3: Options */}
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-1.5 h-1.5 bg-batik-600" />
                                        <h2 className="text-[10px] uppercase tracking-widest font-bold text-batik-900">03. Detail Tambahan</h2>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-batik-400 mb-2">Gaya</label>
                                            <select
                                                value={style}
                                                onChange={(e) => setStyle(e.target.value as WritingStyle)}
                                                className="w-full px-0 py-2 bg-transparent border-b border-batik-100 focus:border-batik-900 focus:ring-0 transition-all text-sm text-batik-900 font-bold"
                                            >
                                                {(Object.keys(styleNames) as WritingStyle[]).map((s) => (
                                                    <option key={s} value={s}>{styleNames[s]}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-batik-400 mb-2">Suasana</label>
                                            <select
                                                value={mood}
                                                onChange={(e) => setMood(e.target.value as Mood)}
                                                className="w-full px-0 py-2 bg-transparent border-b border-batik-100 focus:border-batik-900 focus:ring-0 transition-all text-sm text-batik-900 font-bold"
                                            >
                                                {(Object.keys(moodNames) as Mood[]).map((m) => (
                                                    <option key={m} value={m}>{moodNames[m]}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-batik-400 mb-2">Panjang</label>
                                            <select
                                                value={length}
                                                onChange={(e) => setLength(e.target.value as "short" | "medium" | "long")}
                                                className="w-full px-0 py-2 bg-transparent border-b border-batik-100 focus:border-batik-900 focus:ring-0 transition-all text-sm text-batik-900 font-bold"
                                            >
                                                <option value="short">Pendek</option>
                                                <option value="medium">Sedang</option>
                                                <option value="long">Panjang</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        className="w-full py-5 bg-batik-900 text-batik-50 font-bold uppercase tracking-widest text-xs hover:bg-batik-800 transition-all shadow-xl shadow-batik-900/10 disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {isGenerating ? "Menyusun Kata..." : "Mulai Berkarya"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Result Panel */}
                        <motion.div
                            ref={resultRef}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white border border-batik-100 sticky top-24 overflow-hidden min-h-[600px] flex flex-col">
                                {/* Header */}
                                <div className="p-8 border-b border-batik-50 flex items-center justify-between">
                                    <h2 className="text-[10px] uppercase tracking-widest font-bold text-batik-900">Hasil Karya</h2>
                                    {generatedContent && (
                                        <div className="flex gap-4">
                                            <button onClick={copyToClipboard} className="text-batik-400 hover:text-batik-900 transition-colors">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button onClick={downloadText} className="text-batik-400 hover:text-batik-900 transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-10 flex-1">
                                    {generatedContent ? (
                                        <div className="space-y-8">
                                            <h3 className="text-2xl font-serif font-bold text-batik-950 text-center leading-relaxed">
                                                {generatedTitle}
                                            </h3>

                                            <div className="font-serif text-batik-900 leading-loose whitespace-pre-wrap text-center text-lg italic">
                                                {generatedContent}
                                            </div>

                                            <div className="pt-12 border-t border-batik-50 flex flex-wrap gap-2 justify-center">
                                                <span className="px-3 py-1 bg-batik-50 text-batik-700 text-[10px] uppercase tracking-widest font-bold border border-batik-100">
                                                    {literatureTypeNames[selectedType]}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                                            <Feather className="w-16 h-16 text-batik-900 mb-6" />
                                            <p className="text-sm font-serif italic text-batik-900">Karya Anda akan segera tercipta...</p>
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
