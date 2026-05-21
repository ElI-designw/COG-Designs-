/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#060B18',
          secondary: '#0D1829',
          light: '#EFF6FF',
          card: '#111E35',
          border: '#1E3A5F',
        },
        accent: {
          purple: '#3B82F6',
          pink: '#22D3EE',
          orange: '#818CF8',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8',
          dark: '#060B18',
        },
      },
      fontFamily: {
        bebas: ['"Space Grotesk"', 'sans-serif'],
        montserrat: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #3B82F6, #22D3EE, #818CF8)',
        'gradient-brand-r': 'linear-gradient(135deg, #818CF8, #22D3EE, #3B82F6)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(59, 130, 246, 0.3)',
        'glow-pink': '0 0 30px rgba(34, 211, 238, 0.3)',
        'glow-brand': '0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(34, 211, 238, 0.1)',
      },
    },
  },
  plugins: [],
}
