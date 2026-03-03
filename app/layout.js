import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Retford.info - Your Guide to Retford, Nottinghamshire",
    template: "%s | Retford.info"
  },
  description: "Discover Retford, Nottinghamshire. Your complete guide to local attractions, history, events, and things to do in this historic market town.",
  keywords: ["Retford", "Nottinghamshire", "UK", "tourist information", "local guide", "market town", "Bassetlaw"],
  authors: [{ name: "Retford.info" }],
  creator: "Retford.info",
  publisher: "Retford.info",
  metadataBase: new URL("https://retford.info"),
  alternates: {
    canonical: "https://retford.info",
  },
  openGraph: {
    title: "Retford.info - Your Guide to Retford, Nottinghamshire",
    description: "Discover Retford, Nottinghamshire. Your complete guide to local attractions, history, events, and things to do in this historic market town.",
    url: "https://retford.info",
    siteName: "Retford.info",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6766680365418435"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
