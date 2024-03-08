import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rails-Next.js-Tailwind Starter",
  description:
    "A starting point for your Ruby on Rails, PostgreSQL, Next.js, and Tailwind CSS project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 55 85)",
              color: "#fff",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
