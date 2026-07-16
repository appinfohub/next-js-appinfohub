import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";

const siteUrl = "https://appinfohub.com";

export const metadata = {
  metadataBase: new URL(siteUrl),

  
  title: {
    default: "AppInfoHub - Safe APK Downloads & App Reviews",
    template: "%s | AppInfoHub",
  },
  description:
    "Find and download 100% safe APKs, apps, and games. Read reviews, topics, blogs, and discover top trending apps.",
  keywords: [
    "safe apk downloads",
    "app reviews",
    "top apps",
    "Android APK",
    "mobile apps",
    "app discovery",
  ],
  openGraph: {
    title: "AppInfoHub",
    description:
      "Find and download 100% safe APKs, apps, and games. Read reviews, topics, blogs, and discover top trending apps.",
    url: siteUrl,
    siteName: "AppInfoHub",
    type: "website",
    images: [
      {
        url: `${siteUrl}/appinfohublogo2.png`,
        width: 1200,
        height: 630,
        alt: "AppInfoHub - Safe APK Downloads & App Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AppInfoHub",
    description:
      "Find and download 100% safe APKs, apps, and games. Read reviews, topics, blogs, and discover top trending apps.",
    images: [`${siteUrl}/appinfohublogo2.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/appinfofav.png" />
        <link rel="shortcut icon" href="/appinfofav.png" />
        <link rel="apple-touch-icon" href="/appinfofav.png" />
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

