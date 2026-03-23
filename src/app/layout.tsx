import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaibhav-Ghoshi | Full Stack Developer Portfolio",
  description:
    "Official portfolio of Vaibhav Ghoshi. Explore my projects, skills in React and Node.js, and professional experience.",
  verification: {
    google: "TYVhBQ0XpERsNFx0VXqEToKEyfBWdrVRxGXWqqRNg3A",
  },
  openGraph: {
    title: "Vaibhav-Ghoshi | Full Stack Developer Portfolio",
    description: "Official portfolio of Vaibhav Ghoshi. Explore my projects, skills in React and Node.js, and professional experience.",
    url: "https://vaibhav-ghoshi.in",
    siteName: "Vaibhav-Ghoshi Portfolio",
    images: [
      {
        url: "/ezgif.com-gif-maker.gif",
        width: 1200,
        height: 630,
        alt: "Vaibhav-Ghoshi Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav-Ghoshi | Full Stack Developer Portfolio",
    description: "Official portfolio of Vaibhav Ghoshi. Explore my projects, skills in React and Node.js, and professional experience.",
    images: ["/ezgif.com-gif-maker.gif"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Eater&family=Monoton&family=Pixelify+Sans:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </head>
      <body className="grid-bg scanline">{children}</body>
    </html>
  );
}
