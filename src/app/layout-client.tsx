"use client";
import { ThemeProvider } from "@/components/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="relative flex min-h-screen flex-col">
        {/* Header */}
        <Header />
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
} 