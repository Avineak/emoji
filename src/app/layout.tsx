import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";

import "./globals.css";
import Logo from "../assets/images/logo-white.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emojijoy — simply copy and paste Emoji 😎🤠😂🤷‍♀️🤷‍♂️",
  description: "Find the emoji you are looking for...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/png"
        sizes="32x32"
      />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-CTD77ZRZWJ"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CTD77ZRZWJ');`}
      </Script>
      <body className={inter.className}>
        <header
          className="flex flex-row h-[60px] w-full sticky top-0 bg-indigo-800 items-center px-[48px] font-karla justify-between mb-[26px] text-20 text-white"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <Link href="/" className="font-extrabold w-[64px]">
            <Image src={Logo} alt="Logo" className="w-[100%]" />
          </Link>
          <div className="font-extrabold">Click the emoji to copy!</div>
          <ol className="flex flex-row gap-[34px]">
            <li>{/* <Link href="/blogs">Blog</Link> */}</li>
            <li>{/* <Link href="/about">About Us</Link> */}</li>
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
