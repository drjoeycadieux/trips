import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Navigation from "@/components/Navigation";
import AlertBanner from "@/components/AlertBanner";
import LiveChat from "@/components/LiveChat";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Plan and organize your trips",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthProvider>
          <AlertBanner />
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>
          <LiveChat />
        </AuthProvider>
      </body>
    </html>
  );
}
