import type { Metadata } from 'next';
import '../globals.css';
import 'swiper/css';
import 'aos';
import 'aos/dist/aos.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-modern-drawer/dist/index.css';
import { getUserByEmail } from '@/lib/actions/auth';
import { requireUser } from '@/hooks';
import { VisitorApprovalMessage } from '@/components/shared/Users/VisitorApprovalMessage';
import { signOut } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import Sidebar from '@/components/shared/Sidebar';
import Header from '@/components/shared/Header';
import SheetSidebar from '@/components/shared/Sidebar';
import MobileSidebar from '@/components/shared/MobileSidebar';

export const metadata: Metadata = {
  title: 'STELLANTIS | Système de Gestion Des Amadeus',
  description:
    'Plateforme digitale dédiée à la création, la gestion et le suivi des Amadeus au sein de Stellantis Kénitra',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireUser();
  const data = await getUserByEmail(session?.user?.email as string);
  const isVisitor = data?.role === 'VISITOR';

  if (isVisitor) return <VisitorApprovalMessage />;

  const userData = {
    name: data?.firstName,
    email: data?.email,
    image: data?.image,
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
    >
      <div className="grid xl:grid-cols-12 w-full bg-background dark:bg-background/20">
        <div className="col-span-2 xl:block hidden">
          <Sidebar user={userData} />
        </div>
        <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
          <div className="fixed top-4 left-4 z-50">
            <MobileSidebar user={userData} />
          </div>
          <div className="xs:px-8 px-2 pt-24">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
