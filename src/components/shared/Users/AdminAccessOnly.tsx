'use client';

import { ArrowLeft, ShieldCheck, ShieldClose } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export function AdminAccessOnly() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <div className="absolute -top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 -z-10 h-[31.25rem] w-[31.25rem] animate-pulse-fast rounded-full bg-[#8e9bc4] blur-[10rem] dark:animate-pulse-slow dark:bg-[#5464a4] sm:w-[68.75rem]" />
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 -z-10 h-[31.25rem] w-[50rem] animate-pulse-faster rounded-full bg-[#515d8a] blur-[10rem] dark:animate-pulse-slower dark:bg-[#2d365a] sm:w-[68.75rem]" />

      <Card className="max-w-md w-full bg-transparent border-subMain dark:border-border shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldClose className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <CardTitle>Accès refusé</CardTitle>
          <CardDescription>
            Cette page est accessible uniquement aux administrateurs. Si vous
            pensez qu’il s’agit d’une erreur, veuillez contacter
            l’administrateur.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Link href="/" passHref className="w-full">
            <Button
              className="w-full flex items-center justify-center gap-2 text-primary"
              variant="link"
            >
              <ArrowLeft className="w-4 h-4" />
              Retourner
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
