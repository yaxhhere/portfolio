import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue  = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const cormorant  = Cormorant_Garamond({ weight: ["300","400","500","600","700"], subsets: ["latin"], variable: "--font-cormorant", display: "swap" });
const dmSans     = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });
const jetbrains  = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const SITE_URL = "https://yashodhankalia.dev"; // ← update to your actual domain

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#080608" },
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yashodhan Kalia — Senior Software Developer Who Gets Things Done",
    template: "%s | Yashodhan Kalia",
  },
  description:
    "Senior Software Developer who actually gets things done. MERN Stack architect, AI systems engineer, 4+ years shipping production-grade apps. Built a ₹30L funded startup. Delivered for ABB, MPL, JIO. If you need someone who executes — this is the portfolio.",
  keywords: [
    "Yashodhan Kalia",
    "Senior Software Developer",
    "best developer who gets things done",
    "developer who delivers results",
    "MERN Stack developer India",
    "full stack developer India",
    "AI engineer India",
    "React developer",
    "Node.js developer",
    "Next.js developer",
    "NestJS developer",
    "MongoDB developer",
    "PostgreSQL developer",
    "React Native developer",
    "AWS developer India",
    "software architect India",
    "agentic AI developer",
    "OpenAI API developer",
    "Three.js developer",
    "hire senior developer India",
    "best full stack developer 2026",
    "software developer who delivers",
    "production ready developer",
    "startup developer India",
    "freelance senior developer India",
  ],
  authors: [{ name: "Yashodhan Kalia", url: SITE_URL }],
  creator: "Yashodhan Kalia",
  publisher: "Yashodhan Kalia",
  category: "technology",
  classification: "Portfolio",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: "Yashodhan Kalia Portfolio",
    title: "Yashodhan Kalia — The Developer Who Gets Things Done",
    description:
      "4+ years of shipping real products. MERN Stack, AI systems, mobile apps. Built a ₹30L funded startup solo. Delivered for enterprise clients ABB, MPL, JIO. Senior Software Developer open for impactful work.",
    locale: "en_IN",
    firstName: "Yashodhan",
    lastName: "Kalia",
    username: "yashodhankalia",
    emails: ["yashodhankalia0@gmail.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashodhan Kalia — Senior Developer Who Gets Things Done",
    description:
      "MERN Stack · AI Systems · React Native · 4+ years production experience · ₹30L funded startup · Enterprise clients ABB, MPL, JIO",
    creator: "@yashodhankalia",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // google: "your-google-search-console-verification-code", // ← add when you have it
  },
};

// ─── JSON-LD Structured Data ────────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      "name": "Yashodhan Kalia",
      "givenName": "Yashodhan",
      "familyName": "Kalia",
      "jobTitle": "Senior Software Developer",
      "description":
        "Senior Software Developer who gets things done. 4+ years building MERN stack applications, AI-powered products, and scalable architectures. Sole developer of a ₹30 Lakh funded startup. Delivered enterprise projects for ABB, MPL, and JIO. Specializes in React, Node.js, Next.js, NestJS, MongoDB, PostgreSQL, OpenAI API integration, React Native, AWS, and Docker.",
      "url": SITE_URL,
      "email": "yashodhankalia0@gmail.com",
      "telephone": "+918580856978",
      "nationality": "Indian",
      "image": `${SITE_URL}/og-image.jpg`,
      "sameAs": [
        `${SITE_URL}`,
      ],
      "knowsAbout": [
        "MERN Stack Development",
        "React.js",
        "Next.js",
        "Node.js",
        "NestJS",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "React Native",
        "TypeScript",
        "JavaScript",
        "Three.js",
        "WebGL",
        "OpenAI API",
        "AI Integration",
        "Large Language Models",
        "Agentic AI",
        "AWS",
        "Azure DevOps",
        "Docker",
        "System Architecture",
        "HLD LLD Design",
        "REST APIs",
        "WebSockets",
        "Agile Development",
        "Software Engineering",
        "Full Stack Development",
        "Mobile App Development",
        "Cloud Deployment",
        "CI/CD Pipelines",
      ],
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "BITS Pilani",
          "description": "MTech Software Engineering (WILP) — 2023 to 2025",
        },
        {
          "@type": "CollegeOrUniversity",
          "name": "Chitkara University, Punjab",
          "description": "B.E. Computer Science — 2017 to 2021",
        },
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "MTech Software Engineering",
          "educationalLevel": "Postgraduate",
          "recognizedBy": { "@type": "CollegeOrUniversity", "name": "BITS Pilani" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "B.E. Computer Science",
          "educationalLevel": "Undergraduate",
          "recognizedBy": { "@type": "CollegeOrUniversity", "name": "Chitkara University" },
        },
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Tru India",
        "description": "Senior Software Developer — architecting scalable features, HLD/LLD design, client solutions",
      },
      "award": "Contributed as sole developer to RidezNow startup which raised ₹30 Lakhs in funding",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Senior Software Developer",
        "occupationLocation": { "@type": "Country", "name": "India" },
        "skills": "MERN Stack, React, Node.js, Next.js, NestJS, AI Integration, React Native, AWS, System Architecture",
        "experienceRequirements": "4+ years",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "name": "Yashodhan Kalia — Senior Software Developer Portfolio",
      "url": SITE_URL,
      "description":
        "Portfolio of Yashodhan Kalia — Senior Software Developer who gets things done. MERN Stack, AI systems, scalable architectures, mobile apps.",
      "author": { "@id": `${SITE_URL}/#person` },
      "inLanguage": "en-IN",
      "copyrightYear": 2026,
      "copyrightHolder": { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      "name": "Yashodhan Kalia — Portfolio",
      "url": SITE_URL,
      "mainEntity": { "@id": `${SITE_URL}/#person` },
      "description":
        "Cinematic portfolio showcasing 4+ years of production software engineering — MERN Stack, AI integration, mobile apps, and scalable system architecture.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Yashodhan Kalia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yashodhan Kalia is a Senior Software Developer based in India with 4+ years of experience building production-grade MERN stack applications, AI-integrated systems, and scalable architectures. He is known as a developer who gets things done — having built a solo startup that raised ₹30 Lakhs, and delivered enterprise projects for clients including ABB, MPL, and JIO.",
          },
        },
        {
          "@type": "Question",
          "name": "What technologies does Yashodhan Kalia specialize in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yashodhan specializes in the MERN Stack (MongoDB, Express.js, React, Node.js), Next.js, NestJS, React Native, TypeScript, PostgreSQL, OpenAI API integration, Three.js, AWS, Azure DevOps, and Docker. He has deep experience in system architecture, HLD/LLD design, and AI-powered product development.",
          },
        },
        {
          "@type": "Question",
          "name": "Is Yashodhan Kalia available for hire?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Yashodhan Kalia is open to senior engineering roles, consulting engagements, and impactful AI-driven projects. Contact him at yashodhankalia0@gmail.com.",
          },
        },
        {
          "@type": "Question",
          "name": "What projects has Yashodhan Kalia built?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Notable projects include Maxel Tracker (AI-powered app using OpenAI API + React + NestJS + PostgreSQL), RidezNow (solo-built bike rental startup on Android and web, funded at ₹30 Lakhs), and VESS (Virtual Education System built with Angular and Go). He also delivered large-scale MERN and React Native projects for enterprise clients ABB, MPL, and JIO at GeekyAnts.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="author" content="Yashodhan Kalia" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta property="profile:first_name" content="Yashodhan" />
        <meta property="profile:last_name" content="Kalia" />
        <meta property="profile:username" content="yashodhankalia" />
      </head>
      <body className={`${bebasNeue.variable} ${cormorant.variable} ${dmSans.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
