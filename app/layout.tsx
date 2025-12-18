import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roberto Solutions | Programador de Sistemas y Webs en Perú",
  description: "Especialista en desarrollo de software a medida, sistemas de gestión e inventarios y páginas web de alta conversión en Lima, Perú.",
  keywords: [
    "Programador en Perú", 
    "Desarrollo de sistemas Lima", 
    "Creación de software administrativo", 
    "Desarrollador Next.js Perú", 
    "Sistemas de inventarios a medida",
    "Roberto Solutions"
  ],
  authors: [{ name: "Roberto" }],
  creator: "Roberto Solutions",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://tu-proyecto.vercel.app/", // Reemplaza con tu link real
    title: "Roberto Solutions | Software e Impacto Digital",
    description: "Digitaliza tu empresa con sistemas personalizados. Expertos en optimización de procesos en Perú.",
    siteName: "Roberto Solutions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
