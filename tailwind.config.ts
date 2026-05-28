import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ClashGrotesk', 'sans-serif'],
        clash: ['ClashGrotesk', 'sans-serif'],
        display: ['Cinzel', 'serif'],
        mercado: ['Mercado', 'sans-serif'],
        poppins: ['Poppins', 'serif'],
        gilroy: ['Gilroy-Bold', 'sans-serif'],
        title: ['Bebas Neue', 'sans-serif'],
        subtitle: ['Teko', 'sans-serif'],
        fjalla: ['Fjalla One', 'sans-serif'],
        newsport: ['Newsport', 'sans-serif'],
      },
      
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        eorange: "#FF9933",
        egreen: "#96E903",
        'evala': {
          DEFAULT: 'var(--evala-red)',
          light: 'rgba(206,17,38,0.1)',
          medium: 'rgba(206,17,38,0.5)',
          dark: 'rgba(206,17,38,0.8)',
        },
        'togo': {
          'red':    'var(--togo-red)',
          'yellow': 'var(--togo-yellow)',
          'green':  'var(--togo-green)',
        },
        'primary': '#CE1126',
        'primary-dark': '#a50e1e',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        gradient: 'gradient 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      letterSpacing: {
        'wider-plus': '0.1em',
      },
    },
  },
  plugins: [],
} satisfies Config;
