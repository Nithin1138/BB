import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "BBPulse — Fan Intelligence & Community for Bigg Boss Telugu",
  description: "The fan intelligence & community platform for Bigg Boss Telugu audiences. Vote in verified community polls, join structured debates, track real-time contestant Pulse, and forecast weekly outcomes.",
  applicationName: "BBPulse",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BBPulse",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "BBPulse — Bigg Boss Telugu Fan Platform",
    description: "Vote, discuss, track the community pulse, and predict what happens next in Bigg Boss Telugu.",
    url: "https://bbpulse.app",
    siteName: "BBPulse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BBPulse — Bigg Boss Telugu Fan Platform",
    description: "Daily fan intelligence, live community polls, and transparent Pulse signals for Bigg Boss Telugu.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('bbpulse_theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && systemDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-[#FFFFFF] dark:bg-[#0C0C0D] text-[#09090B] dark:text-[#F4F4F5] transition-colors duration-200 selection:bg-[#FF4500]/20 selection:text-[#FF4500]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

