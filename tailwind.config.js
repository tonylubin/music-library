/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
        inputBg: "#1b2335",
        blackShade: "#181818",
        primaryBgAlt: "#1e1d1d",
        hoverShade: "#2c2c2c",
        brownShade: "#404040",
        brownShadeAlt: "#1f1f1f",
        brownHover: "#8c8787",
        brownText: "#5e5e61",
        brownCard: "#232323",
        brownCardShade: "#2e2e2e",
        primaryRed: "#fa586a",
        redHover: "#d6374a",
        inputBgAlt: "#222222",
        primaryGreen: "#1ed760",
        secondaryBlack: "#141010",
      },
      fontFamily: {
        bioRhyme: "var(--font-bioRhyme)",
        kanit: "var(--font-kanit)",
        vt323: "var(--font-vt323)",
      },
      gridTemplateColumns: {
        playlistHeader: "0.5fr 3fr 3fr 1fr 1fr",
        homepage: "repeat(3,325px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
