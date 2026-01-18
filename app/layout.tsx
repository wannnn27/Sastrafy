import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Sastrafy - Platform Sastra Indonesia dengan AI",
    description: "Belajar dan ciptakan karya sastra Indonesia dengan bantuan kecerdasan buatan. Jelajahi puisi, pantun, cerpen, gurindam, syair, dan berbagai bentuk sastra lainnya.",
    keywords: ["sastra indonesia", "puisi", "pantun", "cerpen", "AI", "generative AI", "pembelajaran sastra", "karya sastra"],
    authors: [{ name: "Sastrafy Team" }],
    openGraph: {
        title: "Sastrafy - Platform Sastra Indonesia dengan AI",
        description: "Belajar dan ciptakan karya sastra Indonesia dengan bantuan AI",
        type: "website",
        locale: "id_ID",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
