import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title: "AI Health Assistance - Your Personal Health Companion",
  description: "AI-powered health consultation and assistance. Get personalized health guidance with natural voice interaction.",
  openGraph: {
    title: "AI Health Assistance - Your Personal Health Companion",
    description: "AI-powered health consultation and assistance. Get personalized health guidance with natural voice interaction.",
    url: "https://halaway.vercel.app",
    type: "website",
    images: [
      {
        url: "blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35",
        width: 1200,
        height: 630,
        alt: "AI Health Assistance - Your Personal Health Companion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Health Assistance - Your Personal Health Companion",
    description: "AI-powered health consultation and assistance. Get personalized health guidance with natural voice interaction.",
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
        <meta property="og:title" content="AI Health Assistance - Your Personal Health Companion" />
        <meta property="og:description" content="AI-powered health consultation and assistance. Get personalized health guidance with natural voice interaction." />
        <meta property="og:url" content="https://halaway.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AI Health Assistance - Your Personal Health Companion" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Health Assistance - Your Personal Health Companion" />
        <meta name="twitter:description" content="AI-powered health consultation and assistance. Get personalized health guidance with natural voice interaction." />
        <meta name="twitter:image" content="blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35" />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-green-50"
        )}
      >
        <Nav />
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-teal-100 to-blue-100 shadow-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
            AI Health Assistance
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-2xl">
            Your personal AI health companion for personalized medical guidance and support.
          </p>
          <p className="text-md md:text-lg text-gray-600 max-w-xl">
            Experience natural voice interactions for comprehensive health consultations.
          </p>
        </div>
        {children}
        <footer className="w-full bg-gradient-to-r from-teal-800 to-blue-800 text-white text-sm py-6 text-center">
          <p className="text-base">&copy; {new Date().getFullYear()} AI Health Assistance. All rights reserved.</p>
          <p className="text-sm mt-2 text-blue-100">Empowering your health journey with AI</p>
        </footer>
      </body>
    </html>
  );
}
