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
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <Navbar />

            {/* Hero Section - Mobile Optimized */}
            <section className="pt-20 pb-8 md:pt-24 md:pb-12">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3">
                            Pelajari Sastra Indonesia
                        </h1>
                        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
                            Materi lengkap tentang puisi, pantun, cerpen, dan karya sastra lainnya
                        </p>
                    </motion.div>

                    {/* Stats - Mobile Grid */}
                    <div className="grid grid-cols-4 gap-2 mt-6 md:mt-10 md:gap-4 max-w-md mx-auto">
                        {[
                            { label: "Jenis", value: "6" },
                            { label: "Modul", value: "5" },
                            { label: "Materi", value: "20+" },
                            { label: "Quiz", value: "15+" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center py-3 bg-white rounded-lg border border-gray-100">
                                <div className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Navigation - Mobile Scrollable */}
            <section className="sticky top-16 z-40 bg-white border-y border-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex overflow-x-auto scrollbar-hide py-2 gap-1 -mx-4 px-4 md:mx-0 md:px-0">
                        {[
                            { id: "types", label: "Jenis Sastra" },
                            { id: "modules", label: "Modul" },
                            { id: "timeline", label: "Sejarah" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {tab.label}
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
                            className="space-y-4"
                        >
                            {literatureInfoData.map((lit, index) => (
                                <motion.div
                                    key={lit.type}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div
                                        className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer"
                                        onClick={() => setExpandedCard(expandedCard === lit.type ? null : lit.type)}
                                    >
                                        {/* Header - Always Visible */}
                                        <div className="p-4 md:p-5 flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-serif font-bold text-gray-900">
                                                    {lit.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                    {lit.description}
                                                </p>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <span className={`inline-block w-6 h-6 text-center leading-6 transition-transform ${expandedCard === lit.type ? "rotate-180" : ""
                                                    }`}>
                                                    ▼
                                                </span>
                                            </div>
                                        </div>

                                        {/* Expanded Content */}
                                        <AnimatePresence>
                                            {expandedCard === lit.type && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="border-t border-gray-100"
                                                >
                                                    <div className="p-4 md:p-5 space-y-4">
                                                        {/* Characteristics */}
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                                                Ciri-ciri:
                                                            </h4>
                                                            <ul className="space-y-1">
                                                                {lit.characteristics.slice(0, 4).map((char, i) => (
                                                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                                        <span className="text-amber-600 mt-1">•</span>
                                                                        {char}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Example Preview */}
                                                        {lit.examples[0] && (
                                                            <div className="bg-amber-50 rounded-lg p-3">
                                                                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                                                                    Contoh: {lit.examples[0].title}
                                                                </h4>
                                                                <p className="text-xs text-gray-500 mb-2">
                                                                    {lit.examples[0].author}
                                                                </p>
                                                                <p className="text-sm text-gray-700 font-serif line-clamp-4 whitespace-pre-line">
                                                                    {lit.examples[0].content}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Action Button */}
                                                        <Link
                                                            href={`/learn/${lit.type}`}
                                                            className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                                                        >
                                                            Pelajari {lit.name} Lengkap
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
                            className="space-y-6"
                        >
                            {/* Filter - Horizontal Scroll on Mobile */}
                            <div className="flex overflow-x-auto scrollbar-hide gap-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                                <button
                                    onClick={() => setSelectedType("all")}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedType === "all"
                                            ? "bg-gray-900 text-white"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    Semua
                                </button>
                                {(["puisi", "pantun", "cerpen", "gurindam", "syair"] as LiteratureType[]).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedType === type
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {literatureTypeNames[type]}
                                    </button>
                                ))}
                            </div>

                            {/* Modules List */}
                            <div className="space-y-3">
                                {filteredModules.map((module, index) => (
                                    <motion.div
                                        key={module.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={`/learn/module/${module.id}`}
                                            className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span className="text-xs text-gray-500">
                                                            {literatureTypeNames[module.literatureType]}
                                                        </span>
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[module.difficulty]}`}>
                                                            {difficultyNames[module.difficulty]}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">
                                                        {module.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2">
                                                        {module.description}
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                                        <span>{module.estimatedMinutes} menit</span>
                                                        {module.quizQuestions && (
                                                            <span>{module.quizQuestions.length} quiz</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-gray-400 text-lg">→</span>
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
                            className="space-y-4"
                        >
                            {timelineData.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative pl-6 md:pl-8"
                                >
                                    {/* Timeline Line */}
                                    <div className="absolute left-2 md:left-3 top-2 bottom-0 w-0.5 bg-amber-200" />

                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1 top-2 w-4 h-4 md:w-5 md:h-5 bg-amber-500 rounded-full border-2 border-white shadow" />

                                    {/* Card */}
                                    <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                                                {event.year}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {event.era}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {event.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {event.literatureTypes.map((type) => (
                                                <span
                                                    key={type}
                                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                                                >
                                                    {literatureTypeNames[type]}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Key Figures */}
                                        {event.keyFigures && (
                                            <p className="text-xs text-gray-500">
                                                <span className="font-medium">Tokoh:</span> {event.keyFigures.join(", ")}
                                            </p>
                                        )}
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
