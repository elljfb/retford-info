import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Retford in Nottinghamshire - Information for Residents and Visitors",
  description: "A local community information website for Retford, Nottinghamshire",
  openGraph: {
    title: "Retford in Nottinghamshire - Information for Residents and Visitors",
    description: "A local community information website for Retford, Nottinghamshire",
    images: ['/api/og?title=Retford.info&subtitle=Your%20Local%20Community%20Guide'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Retford in Nottinghamshire - Information for Residents and Visitors",
    description: "A local community information website for Retford, Nottinghamshire",
    images: ['/api/og?title=Retford.info&subtitle=Your%20Local%20Community%20Guide'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6766680365418435"
          crossOrigin="anonymous"></script>
          <script src="https://analytics.ahrefs.com/analytics.js" data-key="2SixlHm47EpoLQhXu//XrA" async></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
