import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Zen_Kurenaido } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/portfolio/navbar";
import { MacDock } from "@/components/portfolio/mac-dock";
import { Footer } from "@/components/portfolio/footer";
import { SmoothScroll } from "@/components/portfolio/smooth-scroll";
import { TerminalMode } from "@/components/portfolio/terminal-mode";
import { SoundToggle } from "@/components/portfolio/sound-toggle";
import { ScrollProgressIndicator } from "@/components/portfolio/scroll-progress-indicator";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const zenKurenaido = Zen_Kurenaido({
  weight: "400",
  variable: "--font-story",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jibrilnuredin.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Jibril Nuredin — Building Technology, Communities & Digital Experiences",
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
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title:
      "Jibril Nuredin — Building Technology, Communities & Digital Experiences",
    description:
      "Information Systems student, web developer, designer, and PR leader transforming ideas into impactful digital products and communities.",
    url: siteUrl,
    siteName: "Jibril Nuredin",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/preview.png", // Path to the image in your public folder
        width: 1200,
        height: 630,
        alt: "Jibril Nuredin Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jibril Nuredin — Builder of Technology & Communities",
    description:
      "Information Systems student, web developer, designer, and PR leader transforming ideas into impactful digital products and communities.",
    images: ["preview.png"],
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
  themeColor: "#fafaf8",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${zenKurenaido.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <SoundToggle />
        <SmoothScroll>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <ScrollProgressIndicator />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
        <MacDock />
        <TerminalMode />
        <Toaster />
        <SonnerToaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  );
}
