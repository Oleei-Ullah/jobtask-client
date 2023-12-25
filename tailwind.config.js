/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif']
      },
      colors: {
        background: "var(--background-body)",
        "text-primary": "var(--text-main)",
        "text-secondary": "var(--text-secondary)",
        "d-background": "var(--dark-background-body)",
        "d-text-primary": "var(--dark-text-main)",
        "d-text-secondary": "var(--dark-text-secondary)",
        primary: "var(--primary-color)",
      },
      screens: {
        "max-w-2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        "max-w-xl": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "max-w-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        "max-w-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }

        "max-w-sm": { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin'), require("daisyui")],
}