import type { Metadata, Viewport } from "next";
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
  return (
    <html lang="cs">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
