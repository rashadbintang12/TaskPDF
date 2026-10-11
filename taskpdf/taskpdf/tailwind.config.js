/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#16A34A',
          dark: '#166534',
          light: '#DCFCE7',
        },
        page: '#F7FCF8',
        ink: '#17251B',
        muted: '#647067',
        line: '#E1EAE3',
      },
      boxShadow: {
        card: '0 1px 2px rgba(23, 37, 27, 0.04), 0 4px 16px rgba(23, 37, 27, 0.05)',
      },
    },
  },
  plugins: [],
}
