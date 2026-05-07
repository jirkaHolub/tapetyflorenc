import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.tapetymetroflorenc.cz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vizualizace tapety zdarma do 24 hodin – Tapety Metro Florenc",
    template: "%s – Tapety Metro Florenc",
  },
  description:
    "Pošlete odkaz na tapetu a fotku stěny. Do 24 hodin vám zdarma připravíme realistickou vizualizaci, ať máte jistotu, že do vašeho pokoje sedne. Bez závazku.",
  keywords: [
    "tapety",
    "vizualizace tapety",
    "vizualizace tapety zdarma",
    "tapety na zeď",
    "tapety Praha",
    "Tapety Metro Florenc",
    "fototapety",
    "vzorky tapet",
    "návrh interiéru",
  ],
  applicationName: "Tapety Metro Florenc",
  authors: [{ name: "Tapety Metro Florenc" }],
  creator: "Tapety Metro Florenc",
  publisher: "Tapety Metro Florenc",
  category: "shopping",
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: SITE_URL,
    siteName: "Tapety Metro Florenc",
    title: "Vizualizace tapety zdarma do 24 hodin – Tapety Metro Florenc",
    description:
      "Pošlete odkaz na tapetu a fotku stěny. Do 24 hodin vám zdarma připravíme realistickou vizualizaci, ať máte jistotu, že do vašeho pokoje sedne.",
    images: [
      {
        url: "/tym.jpg",
        width: 1200,
        height: 630,
        alt: "Tým Tapety Metro Florenc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizualizace tapety zdarma do 24 hodin – Tapety Metro Florenc",
    description:
      "Pošlete odkaz a fotku stěny – do 24 hodin vám zdarma připravíme realistickou vizualizaci.",
    images: ["/tym.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1929",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tapety Metro Florenc",
  url: SITE_URL,
  image: `${SITE_URL}/tym.jpg`,
  logo: `${SITE_URL}/logo.svg`,
  telephone: "+420 775 579 979",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Křižíkova 22",
    addressLocality: "Praha 8 – Florenc",
    postalCode: "186 00",
    addressCountry: "CZ",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="cs">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {pixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
