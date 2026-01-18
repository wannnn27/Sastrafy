"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { literatureInfoData, learningModulesData } from "@/lib/data";
import { literatureTypeNames, difficultyNames, difficultyColors } from "@/lib/utils";

export default function LiteratureTypePage() {
    const params = useParams();
    const typeParam = params.type as string;

    const literatureInfo = literatureInfoData.find((lit) => lit.type === typeParam);
    const relatedModules = learningModulesData.filter((m) => m.literatureType === typeParam);

    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    if (!literatureInfo) {
        notFound();
    }

    const copyExample = async (content: string, index: number) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <Navbar />

            <div className="pt-20 pb-16">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Back Link */}
                    <Link
                        href="/learn"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                        ← Kembali
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <h1 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                            {literatureInfo.name}
                        </h1>
                        <p className="text-gray-600">{literatureInfo.description}</p>
                    </motion.div>

                    {/* Content Cards */}
                    <div className="space-y-4">
                        {/* Characteristics */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl border border-gray-100 p-4 md:p-6"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Karakteristik</h2>
                            <div className="space-y-2">
                                {literatureInfo.characteristics.map((char, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm text-gray-700">{char}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Structure */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-white rounded-xl border border-gray-100 p-4 md:p-6"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Struktur</h2>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {literatureInfo.structure}
                            </p>
                        </motion.div>

                        {/* Examples */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl border border-gray-100 p-4 md:p-6"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contoh Karya</h2>
                            <div className="space-y-4">
                                {literatureInfo.examples.map((example, index) => (
                                    <div key={index} className="border border-amber-200 rounded-lg overflow-hidden">
                                        <div className="bg-amber-50 p-3 flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{example.title}</h3>
                                                <p className="text-xs text-gray-600">{example.author}</p>
                                            </div>
                                            <button
                                                onClick={() => copyExample(example.content, index)}
                                                className="px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50"
                                            >
                                                {copiedIndex === index ? "Tersalin" : "Salin"}
                                            </button>
                                        </div>
                                        <div className="p-3 bg-white">
                                            <p className="text-sm text-gray-800 font-serif whitespace-pre-line leading-relaxed">
                                                {example.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Related Modules */}
                        {relatedModules.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="bg-white rounded-xl border border-gray-100 p-4 md:p-6"
                            >
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Modul Pembelajaran</h2>
                                <div className="space-y-3">
                                    {relatedModules.map((module) => (
                                        <Link
                                            key={module.id}
                                            href={`/learn/module/${module.id}`}
                                            className="block p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-medium text-gray-900">{module.title}</h3>
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[module.difficulty]}`}>
                                                            {difficultyNames[module.difficulty]}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{module.description}</p>
                                                </div>
                                                <span className="text-gray-400">→</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gray-900 rounded-xl p-6 text-center"
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">
                                Buat {literatureInfo.name} dengan AI
                            </h2>
                            <p className="text-gray-400 text-sm mb-4">
                                Gunakan AI untuk menghasilkan karya {literatureInfo.name.toLowerCase()} yang indah
                            </p>
                            <Link
                                href={`/create?type=${literatureInfo.type}`}
                                className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                            >
                                Mulai Berkarya
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
