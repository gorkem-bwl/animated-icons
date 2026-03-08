import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";

export const metadata: Metadata = {
  title: "Animated Lucide Icons",
  description:
    "Beautiful, semantically animated Lucide icons with two-tone color support. Drop-in replacement for lucide-react.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-white dark:bg-[#0a0a0b] text-neutral-900 dark:text-white antialiased transition-colors">
        {children}
      </body>
    </html>
  );
}
