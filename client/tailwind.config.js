/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        base: {
          void: '#0A0B0F',
          surface: '#12141C',
          surfaceRaised: '#1B1E29',
          border: '#262A38'
        },
        accent: {
          primary: '#5B7FFF',
          primaryGlow: '#5B7FFF33'
        },
        risk: {
          low: '#22C55E',
          medium: '#F5A623',
          high: '#EF4444',
          lowGlow: '#22C55E22',
          mediumGlow: '#F5A62322',
          highGlow: '#EF444422'
        },
        text: {
          primary: '#F4F5F7',
          secondary: '#9CA3AF',
          muted: '#6B7280'
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgba(91, 127, 255, 0.3)',
        'glow-risk-high': '0 0 30px -5px rgba(239, 68, 68, 0.4)',
        'glow-risk-medium': '0 0 30px -5px rgba(245, 166, 35, 0.4)',
        'glow-risk-low': '0 0 30px -5px rgba(34, 197, 94, 0.4)'
      }
    }
  },
  plugins: []
};
