import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://retford.info'),
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
      <body className="flex flex-col min-h-screen">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D4E6DQ36M4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D4E6DQ36M4');
          `}
        </Script>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="2SixlHm47EpoLQhXu//XrA"
          strategy="afterInteractive"
        />
        <Script
          src="https://scripts.scriptwrapper.com/tags/e52c9d4f-adf6-4926-b450-7f5809249b41.js"
          type="text/javascript"
          data-noptimize="1"
          data-cfasync="false"
          strategy="afterInteractive"
        />
        <Navbar />
        <main className="flex-grow single-post">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
