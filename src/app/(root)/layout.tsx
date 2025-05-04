import type { Metadata } from 'next';
import '../globals.css';
import { getUserByEmail } from '@/lib/actions/auth';
import { requireUser } from '@/hooks';
import { VisitorApprovalMessage } from '@/components/shared/Users/VisitorApprovalMessage';
import { ThemeProvider } from 'next-themes';
import Sidebar from '@/components/shared/Sidebar';
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
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-main/20 via-subMain to-main/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <div className="col-span-2 xl:block hidden z-50">
          <Sidebar user={userData} />
        </div>
        <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
          <div className="fixed top-4 left-8 z-50">
            <MobileSidebar user={userData} />
          </div>
          <div className="px-8 pt-16  lg:pt-20 xl:pt-8">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
