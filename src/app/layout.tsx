import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { SupabaseProvider } from "@/contexts/supabase-context";
import { MoodProvider } from "@/contexts/mood-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KYM - Know Your Mind",
  description: "A mindful journey of wisdom, connection, and self-discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ebGaramond.variable} antialiased`}>
        <SupabaseProvider>
          <AuthProvider>
            <MoodProvider>{children}</MoodProvider>
          </AuthProvider>
        </SupabaseProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
