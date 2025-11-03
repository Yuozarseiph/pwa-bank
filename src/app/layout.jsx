import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingSupport from "@/components/FloatingSupport";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "اپلیکیشن من - سامانه خدمات بانکی",
  description: "وب اپلیکیشن خدمات بانکی و مالی",
  manifest: "/manifest.json",
  themeColor: "#0094da",
  viewport: "width=device-width, initial-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "اپلیکیشن من"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="اپلیکیشن من" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="اپلیکیشن من" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0094da" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" href="/icons/icon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-samim`}
      >
        {children}
        <FloatingSupport/>
      </body>
    </html>
  );
}