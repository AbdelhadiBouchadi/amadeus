import type { Metadata } from 'next';
import { Encode_Sans } from 'next/font/google';
import '../globals.css';
import 'swiper/css';
import 'aos';
import 'aos/dist/aos.css';

const encode = Encode_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'AMADEUS | Connectez-vous',
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
  applicationName: 'Système de Gestion Des Amadeus',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${encode.className} w-full h-screen flex flex-col items-center justify-center px-4 relative`}
    >
      <div className="absolute -top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 -z-10 h-[31.25rem] w-[31.25rem] animate-pulse-fast rounded-full bg-[#8e9bc4] blur-[10rem] dark:animate-pulse-slow dark:bg-[#5464a4] sm:w-[68.75rem]"></div>
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 -z-10 h-[31.25rem] w-[50rem] animate-pulse-faster rounded-full bg-[#515d8a] blur-[10rem] dark:animate-pulse-slower dark:bg-[#2d365a] sm:w-[68.75rem] "></div>
      {children}
    </div>
  );
}
