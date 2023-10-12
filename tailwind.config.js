/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffd800',
        'primary-light': '#ffea00',
        secondary: '#2a2a2a'
      }
    }
  }
}
