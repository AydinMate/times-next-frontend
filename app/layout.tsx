import type { Metadata } from 'next';
import { GeistSans } from 'geist/font';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Times tables quiz',
  description: 'Made to love maths',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistSans.className}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
