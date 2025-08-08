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
        'primary-red': '#ff2c2c',
        'secondary-cyan': '#00ffff',
        'deep-black': '#0a0a0a',
        'text-light': '#f0f0f0',
        'muted-gray': '#888888',
        'card-bg': '#111111',
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
        sans: ['JetBrains Mono', 'monospace'],
        mono: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
}