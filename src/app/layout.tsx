import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Lora } from "next/font/google";

import { Toaster } from "react-hot-toast";

import "./globals.css";
import Logo from "../assets/images/logo.svg";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emoji Joy – Easy copy and paste emoji in your content 🔍😝🙌👌",
  description:
    "Discover a variety of easy-to-copy emojis on our website, covering startups, people, love, and more. 🌟✨😊🚀❤️",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png" />
      <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
      <link
        rel="icon"
        href="/favicon-192.png"
        sizes="192x192"
        type="image/png"
      />
      <link
        rel="icon"
        href="favicon-128.png"
        sizes="128x128"
        type="image/png"
      />
      <meta name="google-site-verification" content="ha35z7Ui7aGHZgMuvhd3hyqWoCoajTLQGd7Yf9Idu4A" />

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-CTD77ZRZWJ"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-CTD77ZRZWJ');`}
      </Script>
      <body className={lora.className}>
        <header
          className="flex flex-row h-[60px] w-full sticky top-0 bg-indigo-800 items-center px-[48px] font-karla justify-between mb-[16px] text-20 text-white"
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <Link href="/" className="font-extrabold w-[100px]">
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
