import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title: "Dr. Fernando Ly - Virtual Medical Consultation",
  description: "Professional medical consultations powered by AI. Get instant medical guidance and health support from Dr. Fernando Ly's virtual assistant, available 24/7.",
  openGraph: {
    title: "Dr. Fernando Ly - Virtual Medical Consultation",
    description: "Professional medical consultations powered by AI. Get instant medical guidance and health support from Dr. Fernando Ly's virtual assistant, available 24/7.",
    url: "https://drfernandoly.ai",
    type: "website",
    images: [
      {
        url: "/doctor-ai-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Fernando Ly's Virtual Medical Consultation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Fernando Ly - Virtual Medical Consultation",
    description: "Professional medical consultations powered by AI. Get instant medical guidance and health support from Dr. Fernando Ly's virtual assistant, available 24/7.",
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
        <meta property="og:title" content="Dr. Fernando Ly - Virtual Medical Consultation" />
        <meta property="og:description" content="Professional medical consultations powered by AI. Get instant medical guidance and health support from Dr. Fernando Ly's virtual assistant, available 24/7." />
        <meta property="og:url" content="https://drfernandoly.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/doctor-ai-banner.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dr. Fernando Ly's Virtual Medical Consultation Platform" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. Fernando Ly - Virtual Medical Consultation" />
        <meta name="twitter:description" content="Professional medical consultations powered by AI. Get instant medical guidance and health support from Dr. Fernando Ly's virtual assistant, available 24/7." />
        <meta name="twitter:image" content="/doctor-ai-banner.jpg" />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/50 dark:to-gray-950"
        )}
      >
        <Nav />
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 md:px-6 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="/dr-ly-profile.jpg" 
                alt="Dr. Fernando Ly"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-primary/20 shadow-xl"
              />
              <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
                Dr. Fernando Ly's
                <span className="block text-2xl md:text-4xl text-primary/80 mt-2">
                  Virtual Medical Consultation
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Get professional medical guidance and support through our AI-powered consultation platform.
              </p>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
