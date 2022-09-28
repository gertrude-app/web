module.exports = {
  presets: [require(`../components/src/tailwind-preset`)],
  plugins: [require(`@tailwindcss/typography`)],
  content: [`./pages/**/*.{ts,tsx,mdx}`, `./components/**/*.{ts,tsx}`],
};
