import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jibrilnuredin.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jibril Nuredin — Building Technology, Communities & Digital Experiences",
    template: "%s · Jibril Nuredin",
  },
  description:
    "Information Systems student at Hawassa University, web developer, designer, and Head of Public Relations at Peak Craft. Transforming ideas into impactful digital products and communities across Africa.",
  keywords: [
    "Jibril Nuredin",
    "Software Engineer",
    "Web Developer",
    "UI/UX Designer",
    "Tech Community Builder",
    "Peak Craft",
    "Hawassa University",
    "Information Systems",
    "React Developer",
    "Next.js Developer",
    "Content Creator",
    "Ethiopia Tech",
  ],
  authors: [{ name: "Jibril Nuredin" }],
  creator: "Jibril Nuredin",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Jibril Nuredin — Building Technology, Communities & Digital Experiences",
    description:
      "Information Systems student, web developer, designer, and PR leader transforming ideas into impactful digital products and communities.",
    url: siteUrl,
    siteName: "Jibril Nuredin",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jibril Nuredin — Builder of Technology & Communities",
    description:
      "Information Systems student, web developer, designer, and PR leader transforming ideas into impactful digital products and communities.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#07080d",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jibril Nuredin",
  jobTitle: "Software Engineer, Web Developer & Tech Community Leader",
  url: siteUrl,
  knowsAbout: [
    "Web Development",
    "React",
    "Next.js",
    "UI/UX Design",
    "Community Building",
    "Content Creation",
    "AI-Assisted Development",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Hawassa University",
  },
  worksFor: {
    "@type": "Organization",
    name: "Peak Craft",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}
