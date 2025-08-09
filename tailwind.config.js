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
        'primary-red': '#ff2d55',
        'secondary-cyan': '#00ffff',
        'deep-black': '#0a0a0a',
        'text-light': '#f0f0f0',
        'muted-gray': '#888888',
        'card-bg': 'rgba(17, 17, 17, 0.75)',
        'border-dark': '#222222',
        'neon-pink': '#ff00ff',
        'neon-green': '#39ff14',
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
        // For body text (applied with the 'font-sans' class)
        'sans': ['Share Tech Mono', 'monospace'],
        // For headings (applied with the 'font-mono' class)
        'mono': ['Jetbrains Mono', 'sans-serif'],
      }, // The extra brace that was here has been removed.
      boxShadow: {
        'neon-cyan': '0 0 10px var(--tw-shadow-color)',
      },
      transitionDuration: {
        600: '600ms', // Added so `duration-600` works
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
          '100%': { 'box-shadow': '0 0 5px #00ffff' },
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
        neonPulse: 'neonPulse 3s infinite ease-in-out',
        rippleGlow: 'rippleGlow 0.8s infinite',
        shimmer: 'shimmer 2s linear infinite',
        typing: 'typing var(--type-duration) steps(var(--type-steps), end), blink 0.75s step-end infinite',
        neonFlicker: 'neonFlicker 2s infinite',
        gradientMove: 'gradientMove 4s linear infinite',
      },
    },
  },
  plugins: [],
}