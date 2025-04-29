'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { logout } from '@/lib/actions/auth';

export function VisitorApprovalMessage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <div className="absolute -top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 -z-10 h-[31.25rem] w-[31.25rem] animate-pulse-fast rounded-full bg-[#8e9bc4] blur-[10rem] dark:animate-pulse-slow dark:bg-[#5464a4] sm:w-[68.75rem]"></div>
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 -z-10 h-[31.25rem] w-[50rem] animate-pulse-faster rounded-full bg-[#515d8a] blur-[10rem] dark:animate-pulse-slower dark:bg-[#2d365a] sm:w-[68.75rem] "></div>
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle>Compte en attente d&apos;approbation</CardTitle>
          <CardDescription>
            Votre compte est actuellement en attente d&apos;approbation par un
            administrateur. Vous aurez accès une fois que votre compte sera
            approuvé.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-subMain rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 text-primary hover:bg-subMain"
            variant="outline"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
