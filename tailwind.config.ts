import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        md: '0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2)',
        sm: '0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)',
        xs: '0 0px 1px hsla(0, 0%, 0%, 0.4)',
      },
      colors: {
        destroy: '#f44250',
        gray: {
          DEFAULT: '#e3e3e3',
          background: '#f7f7f7',
          text: '#818181',
        },
        primary: '#3992ff',
        secondary: '#eeb004',
      },
    },
  },
};
export default config;
