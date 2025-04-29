import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'STELLANTIS | Système de Gestion Des Amadeus',
  description:
    'Plateforme digitale dédiée à la création, la gestion et le suivi des Amadeus au sein de Stellantis Kénitra',
  keywords: [
    'Gestion',
    'Système Amadeus',
    'Dashboard',
    'Stellantis',
    'Optimisation',
    'Plateforme de gestion',
  ],
  authors: [{ name: 'Stellantis Team' }],
  creator: 'Stellantis',
  openGraph: {
    title: 'Système de Gestion Des Amadeus',
    description:
      'Optimisez vos processus Amadeus avec notre plateforme de gestion moderne et performante.',
    url: 'https://your-dashboard-url.com', // Replace with your real dashboard URL
    siteName: 'Amadeus Management System',
    images: [
      {
        url: 'https://your-dashboard-url.com/og-image.png', // Replace with a real OpenGraph image if you have one
        width: 1200,
        height: 630,
        alt: 'Système de Gestion Des Amadeus',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${poppins.className} antialiased xl:h-screen flex-colo`}
        >
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </SessionProvider>
  );
}
