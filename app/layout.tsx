import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROBERTO.SOLUTIONS | Software a Medida",
  description: "Especialista en digitalizar empresas con sistemas a medida y dashboards de gestión en Lima, Perú.",
  // Esto refuerza la previsualización
  openGraph: {
    title: 'ROBERTO.SOLUTIONS',
    description: 'Transforma tu negocio con software de alto impacto.',
    url: 'https://tu-dominio.vercel.app', // Luego la cambiaremos por tu link real
    siteName: 'Roberto Solutions',
    images: [
      {
        url: '/opengraph-image.png', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_PE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
