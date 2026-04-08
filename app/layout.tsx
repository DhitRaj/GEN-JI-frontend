import type { Metadata, Viewport } from 'next';
import './globals.css';
import ShaderBackground from '@/components/ui/shader-background';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Gen-Ji | Modern Digital Solutions',
  description: 'Build smarter with Gen-Ji - Your partner for scalable digital solutions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="antialiased relative isolate overflow-x-hidden">
        <ShaderBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
