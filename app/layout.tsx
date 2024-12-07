import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title: "Dr. Fernando Ly - AI Medical Assistant",
  description: "24/7 AI-powered medical consultations with Dr. Fernando Ly's virtual assistant. Get reliable medical guidance and health support anytime.",
  openGraph: {
    title: "Dr. Fernando Ly - AI Medical Assistant",
    description: "24/7 AI-powered medical consultations with Dr. Fernando Ly's virtual assistant. Get reliable medical guidance and health support anytime.",
    url: "https://drfernandoly.ai",
    type: "website",
    images: [
      {
        url: "/doctor-ai-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Fernando Ly's AI Medical Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Fernando Ly - AI Medical Assistant",
    description: "24/7 AI-powered medical consultations with Dr. Fernando Ly's virtual assistant. Get reliable medical guidance and health support anytime.",
    images: ["/doctor-ai-banner.jpg"],
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
        <meta property="og:title" content="Dr. Fernando Ly - AI Medical Assistant" />
        <meta property="og:description" content="24/7 AI-powered medical consultations with Dr. Fernando Ly's virtual assistant. Get reliable medical guidance and health support anytime." />
        <meta property="og:url" content="https://drfernandoly.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/doctor-ai-banner.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dr. Fernando Ly's AI Medical Assistant" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. Fernando Ly - AI Medical Assistant" />
        <meta name="twitter:description" content="24/7 AI-powered medical consultations with Dr. Fernando Ly's virtual assistant. Get reliable medical guidance and health support anytime." />
        <meta name="twitter:image" content="/doctor-ai-banner.jpg" />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white"
        )}
      >
        <Nav />
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="/dr-ly-profile.jpg" 
                alt="Dr. Fernando Ly"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-blue-100 shadow-lg"
              />
              <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
                Dr. Fernando Ly's
                <span className="block text-2xl md:text-4xl text-blue-700 mt-2">
                  AI Medical Assistant
                </span>
              </h1>
            </div>
            
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-blue-800 font-medium">
                Welcome to Your Personal Health Consultation
              </p>
              <p className="text-lg text-blue-700">
                Get immediate medical guidance powered by advanced AI, trained with Dr. Ly's expertise
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-blue-600 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>24/7 Availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span>Personalized Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                  <span>Expert Medical Knowledge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {children}
        
        <footer className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8 px-4 mt-auto">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm md:text-base mb-4">
              &copy; {new Date().getFullYear()} Dr. Fernando Ly's AI Medical Assistant
            </p>
            <p className="text-xs md:text-sm text-blue-200 max-w-3xl mx-auto">
              This AI medical assistant is designed to provide general health information and guidance. 
              It is not a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider with any questions about your medical condition.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
