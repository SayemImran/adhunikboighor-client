import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/home/Footer";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import Chatwidget from "./../components/chat/Chatwidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdhunikBoighor",
  description: "A digital book platform with AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Chatwidget/>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-color)",
                fontFamily: "Georgia, serif",
              },
            }}
          />
          
        </QueryProvider>
      </body>
    </html>
  );
}
