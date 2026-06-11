import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://udhayakumar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Udhaya Kumar Mallikaarjunan | Software Technologist",
    template: "%s | Udhaya Kumar Mallikaarjunan"
  },
  description:
    "Software Technologist specializing in full-stack development, cloud-native healthcare platforms, distributed systems, and AI-assisted software engineering.",
  keywords: [
    "Udhaya Kumar Mallikaarjunan",
    "Software Technologist",
    "Senior Full Stack Engineer",
    "Healthcare Technology",
    "Java",
    "Spring Boot",
    "Angular",
    "AWS",
    "Microservices",
    "AI-assisted development"
  ],
  authors: [{ name: "Udhaya Kumar Mallikaarjunan" }],
  creator: "Udhaya Kumar Mallikaarjunan",
  openGraph: {
    title: "Udhaya Kumar Mallikaarjunan | Software Technologist",
    description:
    "Interactive winter Engineering Journey portfolio for a Software Technologist specializing in healthcare platforms, distributed systems, and AI-assisted software engineering.",
    url: siteUrl,
    siteName: "Udhaya Kumar Mallikaarjunan Portfolio",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Udhaya Kumar Mallikaarjunan portfolio preview"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020711",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
