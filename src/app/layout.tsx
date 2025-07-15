import { ReactNode } from 'react';
import './globals.css';
import { MobileMenu, Navbar, Sidebar } from '@/shared';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0C0C1C] text-white h-screen w-screen">
        <MobileMenu />
        <div className="flex h-full overflow-hidden">
          {/* Sidebar: Prevent internal scroll */}
          <div className="h-full overflow-hidden">
            <Sidebar />
          </div>

          {/* Main content: Allow scrolling */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
