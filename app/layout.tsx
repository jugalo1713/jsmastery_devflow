import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import Theme from "@/context/Theme";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = localFont({
  src: "./fonts/interVF.ttf",
  weight: "100 200 300 400 500 600 700 800 900",
  variable: "--font-inter",
});

const spaceGroitesk = localFont({
  src: "./fonts/SpaceGroteskVF.ttf",
  weight: "100 200 300 400 500 600 700",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description: "A community-driven platform",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={`${inter.className} ${spaceGroitesk.variable}`}>
          <Theme
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </Theme>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
