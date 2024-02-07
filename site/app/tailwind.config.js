/** @type {import('tailwindcss').Config} */

const defaultTheme = require(`tailwindcss/defaultTheme`);

module.exports = {
  presets: [require(`@shared/tailwind`)],
  plugins: [require(`@tailwindcss/typography`)],
  darkMode: `class`,
  content: [
    `./docs/**/*.tsx`,
    `./pages/**/*.tsx`,
    `./pages/**/*.md`,
    `./app/**/*.tsx`,
    `./app/**/*.md`,
    `../components/**/*.tsx`,
    `../../shared/components/**/*.tsx`,
  ],
  theme: {
    extend: {
      fontFamily: {
        'docs-inter': [`Inter-Docs`, ...defaultTheme.fontFamily.sans],
        lexend: [`Lexend`, ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': `88rem`,
      },
      keyframes: {
        hover: {
          '0%, 100%': { transform: `translateY(-6px)` },
          '50%': { transform: `translateY(6px)` },
        },
      },
    },
  },
};
