module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F2F1E8',
        surface: '#F6F5EE',
        ink: '#0D0D0F',
        cream: '#F4F3EF',
        blue: '#2563EB',
        'blue-lt': '#60A5FA',
        violet: '#6B5BFF',
        sky: '#00A8E8',
        amber: '#FFB020',
        coral: '#FF5C38',
        muted: 'rgba(13,13,15,0.8)',
        label: 'rgba(13,13,15,0.66)',
        'muted-inv': 'rgba(244,243,239,0.78)',
      },
      fontFamily: {
        sans: ['"General Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
