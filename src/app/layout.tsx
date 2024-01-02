import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Logo from "../assets/images/logo-white.png";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emoji Joy",
  description: "Find the emoji you are looking for...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header
          className="flex flex-row h-[60px] w-full sticky top-0 bg-indigo-800 items-center px-[48px] font-karla justify-between mb-[26px] text-20 text-white"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <Link href="/" className="font-extrabold w-[64px]">
            <Image src={Logo} alt="Logo" className="w-[100%]"/>
          </Link>
          <div className="font-extrabold">Click the emoji to copy!</div>
          <ol className="flex flex-row gap-[34px]">
            <li>
              {/* <Link href="/blogs">Blog</Link> */}
            </li>
            <li>
              {/* <Link href="/about">About Us</Link> */}
            </li>
          </ol>
        </header>
        {children}
        <Toaster
          position="top-center"
          containerStyle={{ position: "fixed", top: "48px" }}
        />
      </body>
    </html>
  );
}
