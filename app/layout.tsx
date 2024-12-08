import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title: "Dr. Ly's AI Health Assistant",
  description: "24/7 AI-powered health consultation and assistance developed by Dr. Fernando Ly.",
  openGraph: {
    title: "Dr. Ly's AI Health Assistant",
    description: "24/7 AI-powered health consultation and assistance developed by Dr. Fernando Ly.",
    url: "https://halaway.vercel.app",
    type: "website",
    images: [
      {
        url: "blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35",
        width: 1200,
        height: 300,
        alt: "Dr. Ly's AI Health Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Ly's AI Health Assistant",
    description: "24/7 AI-powered health consultation and assistance developed by Dr. Fernando Ly.",
    images: ["blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Dr. Ly's AI Health Assistant" />
        <meta property="og:description" content="24/7 AI-powered health consultation and assistance developed by Dr. Fernando Ly." />
        <meta property="og:url" content="https://halaway.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Dr. Ly's AI Health Assistant" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. Ly's AI Health Assistant" />
        <meta name="twitter:description" content="24/7 AI-powered health consultation and assistance developed by Dr. Fernando Ly." />
        <meta name="twitter:image" content="blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35" />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen bg-white"
        )}
      >
        <Nav />
        <div className="flex flex-col items-center justify-center text-center py-8 px-6 bg-gradient-to-r from-teal-50 to-blue-50 border-b border-teal-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dr. Ly's AI Health Assistant
          </h1>
          <p className="text-sm text-gray-600">
            24/7 AI-powered health consultation and assistance
          </p>
        </div>
        <main className="flex-1 relative">
          {children}
        </main>
        <footer className="w-full bg-gradient-to-r from-teal-800 to-blue-800 text-white text-sm py-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Dr. Fernando Ly - AI Health Assistant</p>
        </footer>
      </body>
    </html>
  );
}
