/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to avoid conflicts with vapor-reset
  },
  important: false, // Don't override vapor styles
  theme: {
    extend: {
      colors: {
        'vapor-color-foreground-normal': 'var(--vapor-color-foreground-normal)',
        'vapor-color-foreground-secondary': 'var(--vapor-color-foreground-secondary)',
        'vapor-color-foreground-hint': 'var(--vapor-color-foreground-hint)',
        'vapor-color-foreground-contrast': 'var(--vapor-color-foreground-contrast)',
        'vapor-color-background-normal': 'var(--vapor-color-background-normal)',
        'vapor-color-background-secondary': 'var(--vapor-color-background-secondary)',
        'vapor-color-border-normal': 'var(--vapor-color-border-normal)',
        'vapor-color-white': '#ffffff',
      },
      spacing: {
        'vapor-size-space-500': 'var(--vapor-size-space-500)',
        'vapor-size-space-700': 'var(--vapor-size-space-700)',
        'vapor-size-space-800': 'var(--vapor-size-space-800)',
      }
    },
  },
  plugins: [require("@tailwindcss/typography")]
};
