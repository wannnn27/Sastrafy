import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-4">
                        <span className="text-xl font-serif font-bold">Sastrafy</span>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                            Platform pembelajaran dan kreasi sastra Indonesia dengan teknologi
                            kecerdasan buatan. Lestarikan dan kembangkan warisan budaya bangsa.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="font-medium mb-4 text-white">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/learn" className="text-gray-400 hover:text-white transition-colors">
                                    Pembelajaran
                                </Link>
                            </li>
                            <li>
                                <Link href="/create" className="text-gray-400 hover:text-white transition-colors">
                                    Buat Karya
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">
                                    Galeri
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-medium mb-4 text-white">Lainnya</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                                    Syarat & Ketentuan
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-10 pt-8">
                    <p className="text-sm text-gray-500 text-center">
                        © 2026 Sastrafy. Untuk sastra Indonesia.
                    </p>
                </div>
            </div>
        </footer>
    );
}
