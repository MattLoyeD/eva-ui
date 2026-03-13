import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NERV — EvaUI Command Center",
  description: "Neon Genesis Evangelion UI Component Library — MAGI System Interface",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Fira+Code:wght@400;500;700&family=Barlow+Condensed:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;700;900&family=Playfair+Display:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-eva-black text-eva-orange antialiased">
        {children}
      </body>
    </html>
  );
}
