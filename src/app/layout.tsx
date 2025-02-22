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
  title: "Elemar",
  description: "Jay Elemar Termulo's Portfolio",
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
