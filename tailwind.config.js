/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'darkGreen': '#0f2027',
        'beige': '#dfe0db',
        'navyBlue': '#284b63',
        'darkGrey': '#303643',
        'inputBg': '#1b2335',
        'formPurple': '#6366f1'
      },
      fontFamily: {
        'bioRhyme': 'var(--font-bioRhyme)',
        'kanit': 'var(--font-kanit)'
      },
      backgroundImage: {
        'moonlitAsteroid': 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
        'mainBg': 'linear-gradient(to top, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))',
        'space': 'linear-gradient(rgb(17, 24, 39), rgb(75, 85, 99))',
        'gunmetal': 'linear-gradient(to right top, rgb(229, 231, 235), rgb(156, 163, 175), rgb(75, 85, 99))',
        '': '',
      },
      gridTemplateColumns: {
        'playlistHeader': '4rem 3fr 3fr 1fr 6rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
}