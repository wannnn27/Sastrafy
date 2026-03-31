"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { literatureInfoData, learningModulesData, timelineData } from "@/lib/data";
import { LiteratureType } from "@/types";
import { literatureTypeNames, difficultyNames, difficultyColors } from "@/lib/utils";

export default function LearnPage() {
    const [selectedType, setSelectedType] = useState<LiteratureType | "all">("all");
    const [activeTab, setActiveTab] = useState<"modules" | "types" | "timeline">("types");
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const filteredModules =
        selectedType === "all"
            ? learningModulesData
            : learningModulesData.filter((m) => m.literatureType === selectedType);

    return (
        <main className="min-h-screen bg-batik-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-batik-950 mb-6">
                            Sumur <span className="text-batik-600">Ilmu</span>
                        </h1>
                        <p className="text-lg text-batik-700 max-w-2xl mx-auto font-light">
                            Menelusuri jejak literasi Nusantara dari masa ke masa.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                        {[
                            { label: "Jenis Sastra", value: "6" },
                            { label: "Modul Belajar", value: "8" },
                            { label: "Materi Teks", value: "24" },
                            { label: "Quiz Interaktif", value: "12" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-8 bg-white border border-batik-100">
                                <div className="text-2xl font-serif font-bold text-batik-950 mb-1">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest font-bold text-batik-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="sticky top-16 z-40 bg-white border-y border-batik-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex justify-center gap-12 py-4">
                        {[
                            { id: "types", label: "Jenis Sastra" },
                            { id: "modules", label: "Modul" },
                            { id: "timeline", label: "Sejarah" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`text-[10px] uppercase tracking-widest font-bold transition-all relative ${activeTab === tab.id
                                        ? "text-batik-900"
                                        : "text-batik-300 hover:text-batik-600"
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="tab-underline"
                                        className="absolute -bottom-4 left-0 right-0 h-0.5 bg-batik-900"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-6 md:py-10">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Types Tab */}
                    {activeTab === "types" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {literatureInfoData.map((lit, index) => (
                                <motion.div
                                    key={lit.type}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div
                                        className="bg-white border border-batik-100 overflow-hidden cursor-pointer hover:border-batik-300 transition-all"
                                        onClick={() => setExpandedCard(expandedCard === lit.type ? null : lit.type)}
                                    >
                                        <div className="p-8 flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-serif font-bold text-batik-950 mb-2">
                                                    {lit.name}
                                                </h3>
                                                <p className="text-batik-600 font-light text-sm italic">
                                                    {lit.description}
                                                </p>
                                            </div>
                                            <div className={`ml-8 transition-transform duration-300 ${expandedCard === lit.type ? "rotate-180" : ""}`}>
                                                <div className="w-8 h-8 rounded-full border border-batik-100 flex items-center justify-center text-[10px]">
                                                    ↓
                                                </div>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {expandedCard === lit.type && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="border-t border-batik-50"
                                                >
                                                    <div className="p-10 space-y-12">
                                                        <div>
                                                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-batik-900 mb-6">Karakteristik Utama</h4>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                                                {lit.characteristics.map((char, i) => (
                                                                    <div key={i} className="flex items-start gap-3 text-sm text-batik-700 font-light leading-relaxed">
                                                                        <div className="w-1.5 h-1.5 bg-batik-900 mt-1.5 flex-shrink-0" />
                                                                        {char}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {lit.examples[0] && (
                                                            <div className="p-10 bg-batik-50 border border-batik-100 italic">
                                                                <h4 className="font-serif font-bold text-batik-950 text-center mb-6">
                                                                    {lit.examples[0].title}
                                                                </h4>
                                                                <p className="text-batik-900 font-serif leading-loose whitespace-pre-line text-center max-w-xl mx-auto">
                                                                    {lit.examples[0].content}
                                                                </p>
                                                                <p className="text-center text-[10px] uppercase tracking-widest font-bold text-batik-400 mt-8">
                                                                    — {lit.examples[0].author}
                                                                </p>
                                                            </div>
                                                        )}

                                                        <Link
                                                            href={`/learn/${lit.type}`}
                                                            className="block w-full py-5 bg-batik-900 text-batik-50 text-center text-xs uppercase tracking-widest font-bold hover:bg-batik-800 transition-all"
                                                        >
                                                            Dalami Materi {lit.name}
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Modules Tab */}
                    {activeTab === "modules" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-12"
                        >
                            {/* Filter */}
                            <div className="flex justify-center gap-8">
                                <button
                                    onClick={() => setSelectedType("all")}
                                    className={`text-[10px] uppercase tracking-widest font-bold transition-all ${selectedType === "all" ? "text-batik-900 underline underline-offset-8" : "text-batik-300 hover:text-batik-600"}`}
                                >
                                    Semua
                                </button>
                                {(["puisi", "pantun", "cerpen", "gurindam", "syair"] as LiteratureType[]).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`text-[10px] uppercase tracking-widest font-bold transition-all ${selectedType === type ? "text-batik-900 underline underline-offset-8" : "text-batik-300 hover:text-batik-600"}`}
                                    >
                                        {literatureTypeNames[type]}
                                    </button>
                                ))}
                            </div>

                            {/* Modules List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredModules.map((module, index) => (
                                    <motion.div
                                        key={module.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={`/learn/module/${module.id}`}
                                            className="group block bg-white border border-batik-100 p-8 hover:border-batik-300 transition-all"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                                    {literatureTypeNames[module.literatureType]}
                                                </span>
                                                <span className="text-[10px] uppercase tracking-widest font-bold text-batik-900">
                                                    {difficultyNames[module.difficulty]}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-serif font-bold text-batik-950 mb-3 group-hover:text-batik-600 transition-colors">
                                                {module.title}
                                            </h3>
                                            <p className="text-batik-600 font-light text-sm italic mb-6 line-clamp-2">
                                                {module.description}
                                            </p>
                                            <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-batik-300">
                                                <span>{module.estimatedMinutes} Menit</span>
                                                {module.quizQuestions && <span>{module.quizQuestions.length} Pertanyaan</span>}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Timeline Tab */}
                    {activeTab === "timeline" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-0"
                        >
                            {timelineData.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative pl-12 pb-12 group last:pb-0"
                                >
                                    {/* Line */}
                                    <div className="absolute left-[7px] top-2 bottom-0 w-px bg-batik-100 group-last:hidden" />
                                    
                                    {/* Dot */}
                                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-batik-900 bg-white group-hover:bg-batik-900 transition-colors" />

                                    <div className="bg-white border border-batik-100 p-8 hover:border-batik-300 transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-[10px] uppercase tracking-widest font-bold text-batik-900">
                                                {event.year}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-widest font-bold text-batik-400">
                                                {event.era}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-batik-950 mb-3">{event.title}</h3>
                                        <p className="text-batik-600 font-light text-sm italic mb-6">
                                            {event.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {event.literatureTypes.map((type) => (
                                                <span key={type} className="px-3 py-1 bg-batik-50 text-batik-700 text-[10px] uppercase tracking-widest font-bold border border-batik-100">
                                                    {literatureTypeNames[type]}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
