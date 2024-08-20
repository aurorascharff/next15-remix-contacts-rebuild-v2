import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/container-queries')],
  theme: {
    extend: {
      boxShadow: {
        md: '0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2)',
        sm: '0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)',
        xs: '0 0px 1px hsla(0, 0%, 0%, 0.4)',
      },
      colors: {
        destroy: {
          DEFAULT: '#d11433',
          dark: '#b62f37',
          light: '#ff6d79',
        },
        gray: {
          DEFAULT: '#e3e3e3',
          dark: '#818181',
          light: '#f7f7f7',
        },
        primary: {
          DEFAULT: '#2b63fd',
          dark: '#1a3dbf',
          light: '#7297ff',
        },
      },
    },
  },
};
export default config;
