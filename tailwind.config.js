/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {
			colors: {
					background: '#0a1430',
					secondary: '#0f1f3f',
					primary: '#1f3f70',
					accent: '#f5c242', // gold for speaker panels
					accentAlt: '#ff643d', // orange-red for flame/cta hover
					highlight: '#e9f2ff' // soft white/sky for text
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif']
			},
			boxShadow: {
					glow: '0 0 35px rgba(92, 212, 255, 0.25)'
			}
		}
	},
	plugins: []
};
