import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-merriweather)', 'serif'],
            },
            colors: {
                batik: {
                    50: '#FFFBFB',
                    100: '#F8F4F4',
                    200: '#F1EAEA',
                    300: '#D8E0D8',
                    400: '#4DAB5B',
                    500: '#40904C',
                    600: '#35783E',
                    700: '#2A6132',
                    800: '#4F4E5A',
                    900: '#3F3E47',
                    950: '#3F3E47',
                    cream: '#FFFBFB',
                    green: '#4DAB5B',
                    slate: '#3F3E47',
                }
            }
        },
    },
    plugins: [],
};

export default config;
