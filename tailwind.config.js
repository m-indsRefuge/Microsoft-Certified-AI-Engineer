/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.{html,js}',
    './_layouts/**/*.{html,js}',
    './_posts/**/*.{html,js}',
    './*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#D6003B',
        'secondary-cyan': '#0099dd',
        'deep-black': '#0a0a0a',
        'text-light': '#fff0f6',
        'muted-gray': '#888888',
        'card-bg': 'rgba(15, 15, 20, 0.70)',
        'border-dark': 'rgba(60, 31, 46, 0.7)',
        'neon-pink': '#FF1ACC',
        'neon-green': '#39ff14', // Existing neon green
        'neon-red': '#FF073A',   // NEW - Intense neon red for glitch
        'acid-yellow': '#eaff00',
        'ultraviolet': '#8f00ff',
        'glitch-orange': '#ff6600',
        'neon-blue': '#00aaff',
        'holo-silver': '#cccccc',
        'neon-purple': '#c300ff',
        'infrared': '#ff003c',
        'retina-teal': '#00ffc3',
        'drone-gray': '#555555',
        'console-green': '#00ff00',
        'scanner-orange': '#ff3300',
        'biohazard-yellow': '#ffff33',
      },
      fontFamily: {
        'sans': ['Quantico', 'monospace'],
        'mono': ['Jetbrains Mono', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 3px var(--tw-shadow-color)',
      },
      transitionDuration: {
        600: '600ms',
      },
      keyframes: {
        neonPulse: {
          '0%, 100%': {
            'text-shadow': '0 0 15px #ff2c2c, 0 0 25px rgba(255, 44, 44, 0.4)',
          },
          '50%': {
            'text-shadow': '0 0 25px #ff2c2c, 0 0 45px rgba(255, 44, 44, 0.7)',
          },
        },
        rippleGlow: {
          '0%': { 'box-shadow': '0 0 5px #00ffff' },
          '50%': { 'box-shadow': '0 0 20px #00ffff' },
          '80%': { 'box-shadow': '0 0 5px #00ffff' },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '50%': { 'border-color': 'transparent' },
        },
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
            'text-shadow': '0 0 5px #00ffff, 0 0 10px #00ffff',
          },
          '20%, 22%, 24%, 55%': {
            opacity: '0.8',
            'text-shadow': 'none',
          },
        },
        gradientMove: {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        neonPulse: 'neonPulse 15s infinite ease-in-out',
        rippleGlow: 'rippleGlow 0.8s infinite',
        shimmer: 'shimmer 2s linear infinite',
        typing: 'typing var(--type-duration) steps(var(--type-steps), end), blink 0.75s step-end infinite',
        neonFlicker: 'neonFlicker 10s',
        gradientMove: 'gradientMove 2s linear infinite',
      },
    },
  },
  plugins: [],
}
