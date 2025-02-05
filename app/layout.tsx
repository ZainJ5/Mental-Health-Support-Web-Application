'use client';

import React, { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation'; 
import 'tailwindcss/tailwind.css';
import SideBar from '@/components/shared/SideBar';

const RootLayout = ({ children }: PropsWithChildren<{}>) => {
  const pathname = usePathname(); 

  const authRoutes = ['/SignInPage', '/SignUpPage'];

  return (
    <html lang="en" className="h-full">
      <body className="loading bg-white h-full overflow-hidden">
        <main id="skip" className="w-full flex h-full">
          {!authRoutes.includes(pathname) && (
            <div className="h-full flex-shrink-0 hidden sm:block">
              <SideBar />
            </div>
          )}
          <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
