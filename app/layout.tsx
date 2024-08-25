import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "./_components";

const inter = Roboto({ subsets: ["latin"], weight: ["300", "400", "700", "900"] });

export const metadata: Metadata = {
  title: "Next Files App",
  description: "Next 14 + Tailwind CSS App",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body className={inter.className}>
      <Header />
      <main className="flex min-h-[calc(100vh-275px)] flex-col items-center justify-between p-4">{children}</main>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
