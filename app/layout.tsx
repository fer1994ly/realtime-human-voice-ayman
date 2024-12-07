import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title: "Autoclient - The Final Secretary for Automated Calls",
  description: "Automated calling to thousands of customers. 100% natural voice. Phone support without additional costs.",
  openGraph: {
    title: "Autoclient - The Final Secretary for Automated Calls",
    description: "Automated calling to thousands of customers. 100% natural voice. Phone support without additional costs.",
    url: "https://halaway.vercel.app",
    type: "website",
    images: [
      {
        url: "blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35",
        width: 1200,
        height: 630,
        alt: "Autoclient - Automated Calling with Natural Voice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autoclient - The Final Secretary for Automated Calls",
    description: "Automated calling to thousands of customers. 100% natural voice. Phone support without additional costs.",
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
        <meta property="og:title" content="Autoclient - The Final Secretary for Automated Calls" />
        <meta property="og:description" content="Automated calling to thousands of customers. 100% natural voice. Phone support without additional costs." />
        <meta property="og:url" content="https://halaway.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Autoclient - Automated Calling with Natural Voice" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Autoclient - The Final Secretary for Automated Calls" />
        <meta name="twitter:description" content="Automated calling to thousands of customers. 100% natural voice. Phone support without additional costs." />
        <meta name="twitter:image" content="blob:https://og-playground.vercel.app/9b0e9c16-fd83-4138-ae9a-a272f8198a35" />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen bg-gray-50"
        )}
      >
        <Nav />
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-purple-300 to-orange-100 shadow-md">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Autoclient AI Calls
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4">
            Automate customer acquisition with AI-driven calls.
          </p>
          <p className="text-sm md:text-md text-gray-500">
            Reach 1000+ potential customers in seconds.
          </p>
        </div>
        {children}
        <footer className="w-full bg-gray-800 text-gray-400 text-sm py-4 text-center">
          <p>&copy; {new Date().getFullYear()} Autoclient. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
