import { NextRequest, NextResponse } from "next/server";

interface AnalysisRequest {
    content: string;
    literatureType?: string;
}

interface AnalysisResult {
    success: boolean;
    analysis?: {
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
    };
    error?: string;
}

interface FigurativeLanguage {
    type: string;
    example: string;
    explanation: string;
}

const analysisPrompt = (content: string, literatureType?: string) => `
Anda adalah seorang kritikus sastra Indonesia yang berpengalaman dan ahli dalam menganalisis berbagai bentuk karya sastra.

Analisis karya sastra berikut secara mendalam dan komprehensif:

===== KARYA YANG AKAN DIANALISIS =====
${content}
=====================================

${literatureType ? `Jenis sastra: ${literatureType}` : "Identifikasi jenis sastranya terlebih dahulu."}

Berikan analisis dalam format JSON yang VALID dengan struktur berikut (HANYA JSON, tanpa penjelasan tambahan):

{
    "summary": "Ringkasan singkat tentang karya ini dalam 2-3 kalimat",
    "literatureType": "Jenis sastra (puisi/pantun/cerpen/gurindam/syair/prosa)",
    "theme": "Tema utama karya",
    "mood": "Suasana/mood karya (romantis/melankolis/gembira/inspiratif/filosofis)",
    "strengths": ["Kekuatan 1", "Kekuatan 2", "Kekuatan 3"],
    "improvements": ["Saran perbaikan 1", "Saran perbaikan 2"],
    "styleAnalysis": "Analisis gaya penulisan dalam 2-3 kalimat",
    "figurativeLanguage": [
        {
            "type": "Jenis majas/gaya bahasa",
            "example": "Contoh dari karya",
            "explanation": "Penjelasan singkat"
        }
    ],
    "rhymePattern": "Pola rima jika ada (contoh: a-b-a-b)",
    "overallScore": 85,
    "detailedFeedback": "Umpan balik mendetail untuk penulis dalam 3-4 kalimat yang membangun dan positif"
}

PENTING:
- Berikan skor 1-100 berdasarkan kualitas keseluruhan
- Bersikaplah konstruktif dan positif dalam memberikan feedback
- Identifikasi minimal 2 majas/gaya bahasa jika ada
- Pastikan output adalah JSON yang valid
`;

async function callGeminiAPI(prompt: string): Promise<string | null> {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) return null;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048,
                    },
                }),
            }
        );

        if (!response.ok) return null;

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error("Gemini API error:", error);
        return null;
    }
}

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
                        content: "Anda adalah kritikus sastra Indonesia yang ahli. Berikan analisis dalam format JSON yang valid.",
                    },
                    { role: "user", content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 2000,
            }),
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data.choices[0]?.message?.content || null;
    } catch (error) {
        console.error("OpenAI API error:", error);
        return null;
    }
}

function parseAnalysisResponse(response: string): AnalysisResult["analysis"] | null {
    try {
        // Try to extract JSON from the response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return null;

        const parsed = JSON.parse(jsonMatch[0]);

        // Validate required fields
        if (!parsed.summary || !parsed.literatureType || !parsed.theme) {
            return null;
        }

        return {
            summary: parsed.summary || "",
            literatureType: parsed.literatureType || "puisi",
            theme: parsed.theme || "",
            mood: parsed.mood || "inspiratif",
            strengths: parsed.strengths || [],
            improvements: parsed.improvements || [],
            styleAnalysis: parsed.styleAnalysis || "",
            figurativeLanguage: parsed.figurativeLanguage || [],
            rhymePattern: parsed.rhymePattern,
            overallScore: Math.min(100, Math.max(0, parsed.overallScore || 70)),
            detailedFeedback: parsed.detailedFeedback || "",
        };
    } catch (error) {
        console.error("Parse error:", error);
        return null;
    }
}

function generateMockAnalysis(content: string): AnalysisResult["analysis"] {
    const lines = content.split("\n").filter(l => l.trim());
    const wordCount = content.split(/\s+/).length;

    // Simple heuristics for literature type detection
    let literatureType = "puisi";
    if (lines.length === 4 && content.includes(" ")) literatureType = "pantun";
    if (lines.length === 2) literatureType = "gurindam";
    if (wordCount > 200) literatureType = "cerpen";

    return {
        summary: `Karya ${literatureType} yang menarik dengan ${lines.length} baris dan ${wordCount} kata. Karya ini menampilkan gaya penulisan yang khas.`,
        literatureType,
        theme: "Kehidupan dan refleksi",
        mood: "inspiratif",
        strengths: [
            "Pemilihan kata yang cermat",
            "Alur yang mengalir natural",
            "Pesan yang jelas tersampaikan"
        ],
        improvements: [
            "Dapat ditambahkan lebih banyak imaji/citraan",
            "Eksplorasi majas untuk memperkaya makna"
        ],
        styleAnalysis: "Gaya penulisan yang sederhana namun bermakna. Penulis menunjukkan pemahaman dasar tentang struktur karya sastra.",
        figurativeLanguage: [
            {
                type: "Personifikasi",
                example: "Contoh personifikasi jika ada",
                explanation: "Memberikan sifat manusia pada benda/alam"
            }
        ],
        rhymePattern: literatureType === "pantun" ? "a-b-a-b" : undefined,
        overallScore: 75,
        detailedFeedback: "Karya yang baik sebagai permulaan. Terus berlatih dan eksplorasi berbagai gaya penulisan untuk mengembangkan suara unik Anda sebagai penulis. Untuk API key untuk analisis AI yang lebih mendalam, silakan tambahkan GEMINI_API_KEY di file .env"
    };
}

export async function POST(request: NextRequest) {
    try {
        const body: AnalysisRequest = await request.json();

        if (!body.content || body.content.trim().length < 10) {
            return NextResponse.json({
                success: false,
                error: "Karya terlalu pendek untuk dianalisis. Minimal 10 karakter."
            }, { status: 400 });
        }

        const prompt = analysisPrompt(body.content, body.literatureType);

        // Try Gemini first
        let response = await callGeminiAPI(prompt);

        // Try OpenAI as fallback
        if (!response) {
            response = await callOpenAIAPI(prompt);
        }

        // Parse the response
        let analysis: AnalysisResult["analysis"] | null = null;
        if (response) {
            analysis = parseAnalysisResponse(response);
        }

        // Use mock if no API key or parsing failed
        if (!analysis) {
            analysis = generateMockAnalysis(body.content);
        }

        return NextResponse.json({
            success: true,
            analysis
        });

    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json({
            success: false,
            error: "Terjadi kesalahan saat menganalisis karya"
        }, { status: 500 });
    }
}
