import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PERANANDHA K L | Portfolio",
  description:
    "Portfolio of PERANANDHA K L — Computer Science Engineer, UI/UX Designer, Prompt Engineer, and AI enthusiast based in Salem, Tamil Nadu, India.",
  keywords: [
    "PERANANDHA",
    "Portfolio",
    "Computer Science",
    "AI",
    "Prompt Engineering",
    "Web Development",
  ],
  authors: [{ name: "PERANANDHA K L" }],
  openGraph: {
    title: "PERANANDHA K L | Portfolio",
    description: "Computer Science Engineer & AI Enthusiast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="icon" href="/profile.jpeg" type="image/jpeg" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
