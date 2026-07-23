import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ProgressBar } from "@/components/ProgressBar";
import { CustomCursor } from "@/components/CustomCursor";
import { BackToTop } from "@/components/BackToTop";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zain Uddin — Future Front-End Developer",
  description:
    "Zain Uddin — an aspiring front-end developer and copywriter from Quetta, Pakistan. I build interactive, premium web experiences.",
  keywords: [
    "Zain Uddin",
    "front-end developer",
    "portfolio",
    "Quetta",
    "Next.js",
    "React",
    "3D web",
  ],
  authors: [{ name: "Zain Uddin" }],
  openGraph: {
    title: "Zain Uddin — Future Front-End Developer",
    description:
      "Aspiring front-end developer & copywriter from Quetta, Pakistan. Building interactive web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <ProgressBar />
        <CustomCursor />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}
