"use client";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
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