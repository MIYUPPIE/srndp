import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
	title: 'Revival Fire Conference',
	description: 'Rivers of Living Water is a three-day revival gathering designed to awaken a fresh hunger for God, stir the fire of the Spirit, and release prophetic impartation for a new season. This conference brings together anointed ministers, seasoned teachers, prophetic voices, and worship leaders with one assignment: to raise men and women overflowing with the life of God.',
	metadataBase: new URL('https://getdp.vercel.app'),
	openGraph: {
		title: 'Revival Fire Conference',
		description: 'Rivers of Living Water is a three-day revival gathering designed to awaken a fresh hunger for God, stir the fire of the Spirit, and release prophetic impartation for a new season. This conference brings together anointed ministers, seasoned teachers, prophetic voices, and worship leaders with one assignment: to raise men and women overflowing with the life of God.'
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-background text-white">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
