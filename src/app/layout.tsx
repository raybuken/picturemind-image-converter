import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Image Converter",
  description: "Friendly tool to convert and optimize images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[80rem] mx-auto">
        <Header/>
          <main>
            {children}
          </main>
      </body>
    </html>
  );
}
