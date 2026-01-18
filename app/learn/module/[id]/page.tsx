"use client";

import { useParams, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { learningModulesData } from "@/lib/data";
import { literatureTypeNames, difficultyNames, difficultyColors } from "@/lib/utils";

export default function ModulePage() {
    const params = useParams();
    const moduleId = params.id as string;
    const module = learningModulesData.find((m) => m.id === moduleId);

    const [activeSection, setActiveSection] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [readSections, setReadSections] = useState<number[]>([0]);

    if (!module) {
        notFound();
    }

    const sections = [
        { id: "intro", title: "Pendahuluan" },
        { id: "characteristics", title: "Karakteristik" },
        { id: "structure", title: "Struktur" },
        { id: "examples", title: "Contoh" },
        { id: "tips", title: "Tips" },
        ...(module.quizQuestions ? [{ id: "quiz", title: "Quiz" }] : []),
    ];

    const markAsRead = (index: number) => {
        if (!readSections.includes(index)) {
            setReadSections([...readSections, index]);
        }
    };

    const goToSection = (index: number) => {
        setActiveSection(index);
        markAsRead(index);
    };

    const progress = Math.round((readSections.length / sections.length) * 100);

    const handleQuizAnswer = (questionId: string, answerIndex: number) => {
        setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    };

    const calculateScore = () => {
        if (!module.quizQuestions) return 0;
        let correct = 0;
        module.quizQuestions.forEach((q) => {
            if (quizAnswers[q.id] === q.correctAnswer) correct++;
        });
        return Math.round((correct / module.quizQuestions.length) * 100);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Progress Bar - Fixed on Mobile */}
            <div className="fixed top-16 left-0 right-0 z-30 bg-white border-b border-gray-100">
                <div className="h-1 bg-gray-200">
                    <motion.div
                        className="h-full bg-amber-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <div className="pt-20 pb-24 md:pb-16">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Back Link */}
                    <Link
                        href="/learn"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                        ← Kembali
                    </Link>

                    {/* Header */}
                    <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 mb-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-gray-500">
                                    {literatureTypeNames[module.literatureType]}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[module.difficulty]}`}>
                                    {difficultyNames[module.difficulty]}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400">
                                {progress}% selesai
                            </span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2">
                            {module.title}
                        </h1>
                        <p className="text-sm text-gray-600">{module.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                            <span>{module.estimatedMinutes} menit</span>
                            {module.quizQuestions && <span>{module.quizQuestions.length} quiz</span>}
                        </div>
                    </div>

                    {/* Section Navigation - Horizontal Scroll on Mobile */}
                    <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-4 -mx-4 px-4 md:mx-0 md:px-0">
                        {sections.map((section, index) => (
                            <button
                                key={section.id}
                                onClick={() => goToSection(index)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${activeSection === index
                                        ? "bg-gray-900 text-white"
                                        : readSections.includes(index)
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {readSections.includes(index) && activeSection !== index && (
                                    <span className="text-xs">✓</span>
                                )}
                                {section.title}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-xl border border-gray-100"
                        >
                            {/* Introduction */}
                            {activeSection === 0 && (
                                <div className="p-4 md:p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pendahuluan</h2>
                                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                                        {module.content.introduction}
                                    </div>
                                </div>
                            )}

                            {/* Characteristics */}
                            {activeSection === 1 && (
                                <div className="p-4 md:p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Karakteristik</h2>
                                    <div className="space-y-3">
                                        {module.content.characteristics.map((char, i) => (
                                            <div
                                                key={i}
                                                className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                                            >
                                                <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                                    {i + 1}
                                                </span>
                                                <p className="text-sm text-gray-700">{char}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Structure */}
                            {activeSection === 2 && (
                                <div className="p-4 md:p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Struktur</h2>
                                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                                        {module.content.structure}
                                    </div>
                                </div>
                            )}

                            {/* Examples */}
                            {activeSection === 3 && (
                                <div className="p-4 md:p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Contoh Karya</h2>
                                    <div className="space-y-4">
                                        {module.content.examples.map((example, i) => (
                                            <div key={i} className="border border-amber-200 rounded-lg overflow-hidden">
                                                <div className="bg-amber-50 p-3 border-b border-amber-200">
                                                    <h3 className="font-semibold text-gray-900">{example.title}</h3>
                                                    <p className="text-xs text-gray-600">
                                                        {example.author} {example.year && `(${example.year})`}
                                                    </p>
                                                </div>
                                                <div className="p-3 bg-white">
                                                    <p className="text-sm text-gray-800 font-serif whitespace-pre-line leading-relaxed">
                                                        {example.content}
                                                    </p>
                                                    {example.notes && (
                                                        <p className="mt-3 text-xs text-gray-500 italic border-t border-gray-100 pt-3">
                                                            {example.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tips */}
                            {activeSection === 4 && (
                                <div className="p-4 md:p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Tips</h2>
                                    <div className="space-y-2">
                                        {module.content.tips.map((tip, i) => (
                                            <div key={i} className="flex gap-2 text-sm text-gray-700">
                                                <span className="text-amber-500 flex-shrink-0">•</span>
                                                {tip}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quiz */}
                            {activeSection === 5 && module.quizQuestions && (
                                <div className="p-4 md:p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz</h2>

                                    {!showResults ? (
                                        <div className="space-y-6">
                                            {module.quizQuestions.map((question, qIndex) => (
                                                <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
                                                    <p className="font-medium text-gray-900 mb-3">
                                                        {qIndex + 1}. {question.question}
                                                    </p>
                                                    <div className="space-y-2">
                                                        {question.options.map((option, oIndex) => (
                                                            <button
                                                                key={oIndex}
                                                                onClick={() => handleQuizAnswer(question.id, oIndex)}
                                                                className={`w-full text-left p-3 rounded-lg border-2 text-sm transition-all ${quizAnswers[question.id] === oIndex
                                                                        ? "border-amber-500 bg-amber-50"
                                                                        : "border-gray-200 hover:border-gray-300"
                                                                    }`}
                                                            >
                                                                <span className="font-medium mr-2">
                                                                    {String.fromCharCode(65 + oIndex)}.
                                                                </span>
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}

                                            <button
                                                onClick={() => setShowResults(true)}
                                                disabled={Object.keys(quizAnswers).length < module.quizQuestions.length}
                                                className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Lihat Hasil
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="text-center py-6 bg-amber-50 rounded-xl">
                                                <div className="text-4xl font-bold text-amber-600 mb-1">
                                                    {calculateScore()}%
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {calculateScore() >= 70 ? "Selamat, Anda lulus!" : "Coba lagi untuk hasil lebih baik"}
                                                </p>
                                            </div>

                                            {module.quizQuestions.map((question, qIndex) => {
                                                const userAnswer = quizAnswers[question.id];
                                                const isCorrect = userAnswer === question.correctAnswer;

                                                return (
                                                    <div
                                                        key={question.id}
                                                        className={`p-4 rounded-lg border-2 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                                                            }`}
                                                    >
                                                        <p className="font-medium text-gray-900 mb-2">
                                                            {qIndex + 1}. {question.question}
                                                        </p>
                                                        <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                                                            Jawaban Anda: {question.options[userAnswer]}
                                                        </p>
                                                        {!isCorrect && (
                                                            <p className="text-sm text-green-700 mt-1">
                                                                Jawaban benar: {question.options[question.correctAnswer]}
                                                            </p>
                                                        )}
                                                        {question.explanation && (
                                                            <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200">
                                                                {question.explanation}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => {
                                                        setQuizAnswers({});
                                                        setShowResults(false);
                                                    }}
                                                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
                                                >
                                                    Ulangi Quiz
                                                </button>
                                                <Link
                                                    href="/learn"
                                                    className="flex-1 py-3 bg-gray-900 text-white text-center rounded-lg font-medium"
                                                >
                                                    Selesai
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Navigation - Fixed on Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden">
                <div className="flex gap-3">
                    <button
                        onClick={() => goToSection(Math.max(0, activeSection - 1))}
                        disabled={activeSection === 0}
                        className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium disabled:opacity-50"
                    >
                        Sebelumnya
                    </button>
                    <button
                        onClick={() => goToSection(Math.min(sections.length - 1, activeSection + 1))}
                        disabled={activeSection === sections.length - 1}
                        className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>

            <div className="hidden md:block">
                <Footer />
            </div>
        </main>
    );
}
