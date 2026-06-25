import type { Metadata } from "next";
import "./globals.css";
import { Geist, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ractysh.com"),
  title: "Ractysh Infra Pvt Ltd | Construction & Infrastructure Solutions",
  description:
    "Ractysh Infra Pvt Ltd provides infrastructure development, commercial construction, government tender execution, labour contracting, and engineering services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, inter.variable)} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
