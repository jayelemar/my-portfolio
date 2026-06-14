import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/common/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Jay Elemar Termulo | Full Stack Developer",
    template: "%s | Jay Elemar Termulo",
  },

  description:
    "Full Stack Developer specializing in frontend development with React, Next.js, TypeScript, and modern web technologies. Experienced in building scalable web applications, APIs, and intuitive user experiences.",

  keywords: [
    "Jay Elemar Termulo",
    "Full Stack Developer",
    "Frontend Specialist",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "Web Developer",
    "Portfolio",
    "Tailwind CSS",
    "UI Developer",
    "API Development",
    "Software Engineer",
  ],

  authors: [{ name: "Jay Elemar Termulo" }],
  creator: "Jay Elemar Termulo",

  openGraph: {
    title:
      "Jay Elemar Termulo | Full Stack Developer specializing in Frontend Development",
    description:
      "Full Stack Developer focused on crafting exceptional frontend experiences with React, Next.js, and TypeScript while building scalable backend systems and APIs.",
    url: "https://www.elemar.site",
    siteName: "Jay Elemar Termulo Portfolio",
    images: [
      {
        url: "/about/developer.png",
        width: 1200,
        height: 630,
        alt: "Jay Elemar Termulo - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Jay Elemar Termulo | Full Stack Developer specializing in Frontend Development",
    description:
      "Building modern web applications with React, Next.js, TypeScript, Node.js, and scalable backend solutions.",
    images: ["/about/developer.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <ScrollToTop />
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { marginTop: "70px" },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
