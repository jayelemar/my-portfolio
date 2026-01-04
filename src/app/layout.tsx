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
    default: "Jay Elemar Termulo | Frontend Developer",
    template: "%s | Jay Elemar Termulo",
  },
  description:
    "Frontend Developer specializing in React, Next.js, Tailwind CSS, and modern web technologies. View projects, experience, and open-source work by Jay Elemar Termulo.",
  keywords: [
    "Jay Elemar Termulo",
    "Frontend Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript Developer",
    "Portfolio",
    "Tailwind CSS",
    "UI Developer",
  ],
  authors: [{ name: "Jay Elemar Termulo" }],
  creator: "Jay Elemar Termulo",

  openGraph: {
    title: "Jay Elemar Termulo | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js, and modern UI development. Explore projects, skills, and open-source contributions.",
    url: "https://www.elemar.site",
    siteName: "Jay Elemar Termulo Portfolio",
    images: [
      {
        url: "/about/developer.png", // recommended 1200x630
        width: 1200,
        height: 630,
        alt: "Jay Elemar Termulo - Frontend Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jay Elemar Termulo | Frontend Developer",
    description:
      "Frontend Developer focused on React, Next.js, and clean UI/UX. Check out my portfolio and projects.",
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
