import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-batik-950 text-batik-100 border-t border-batik-900">
            <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Brand */}
                    <div className="md:col-span-6 space-y-8">
                        <span className="text-3xl font-serif font-bold text-batik-50 tracking-tight">Sastrafy</span>
                        <p className="text-batik-400 text-sm leading-loose max-w-sm font-light italic">
                            Platform pembelajaran dan kreasi sastra Indonesia dengan teknologi
                            kecerdasan buatan. Menghubungkan tradisi luhur dengan masa depan digital.
                        </p>
                    </div>

                    {/* Platform */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-batik-600 mb-8">Eksplorasi</h4>
                        <ul className="space-y-4">
                            {["Beranda", "Pembelajaran", "Buat Karya", "Galeri"].map((item) => (
                                <li key={item}>
                                    <Link href="/" className="text-xs uppercase tracking-widest font-bold text-batik-400 hover:text-batik-50 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-batik-600 mb-8">Informasi</h4>
                        <ul className="space-y-4">
                            {["Privasi", "Ketentuan", "Kontak"].map((item) => (
                                <li key={item}>
                                    <Link href="/" className="text-xs uppercase tracking-widest font-bold text-batik-400 hover:text-batik-50 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-batik-900 mt-24 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-batik-600">
                        © 2026 Sastrafy. All rights reserved.
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-batik-600 italic">
                        Harmoni Antara Tradisi Dan Teknologi
                    </p>
                </div>
            </div>
        </footer>
    );
}
