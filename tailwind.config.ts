import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Indonesian earth tones palette
                'batik': {
                    cream: '#F5E6D3',
                    terracotta: '#C15C37',
                    'deep-brown': '#4A2C2A',
                    gold: '#D4AF37',
                    'warm-beige': '#E8D5C4',
                },
                'wayang': {
                    shadow: '#2C1810',
                    leather: '#8B6F47',
                    gold: '#FFD700',
                },
                primary: {
                    50: '#FFF8F0',
                    100: '#F5E6D3',
                    200: '#E8D5C4',
                    300: '#D4AF37',
                    400: '#C15C37',
                    500: '#8B4513',
                    600: '#6B3410',
                    700: '#4A2C2A',
                    800: '#2C1810',
                    900: '#1A0F0A',
                },
            },
            fontFamily: {
                'serif': ['Playfair Display', 'serif'],
                'sans': ['Inter', 'sans-serif'],
                'elegant': ['Cormorant Garamond', 'serif'],
            },
            backgroundImage: {
                'batik-pattern': "url('/patterns/batik-subtle.svg')",
                'gradient -radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(135deg, #4A2C2A 0%, #8B4513 50%, #C15C37 100%)',
            },
            animation: {
                'wayang-float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'calligraphy': 'calligraphy 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                calligraphy: {
                    '0%, 100%': { transform: 'rotate(-2deg) scale(1)' },
                    '50%': { transform: 'rotate(2deg) scale(1.05)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
