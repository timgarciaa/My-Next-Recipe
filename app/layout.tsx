import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderMain from "@/components/header/header-main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Next Recipe",
  description: "My Next Recipe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderMain />
        {children}
      </body>
    </html>
  );
}
