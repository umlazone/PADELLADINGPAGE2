import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { Allerta_Stencil } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600"],
})

const allertaStencil = Allerta_Stencil({
  subsets: ["latin"],
  variable: "--font-allerta-stencil",
  weight: ["400"],
})
export const metadata: Metadata = {
  title: "Solvers AI - Automatización Inteligente para Clubes de Pádel",
  description:
    "Revoluciona la gestión de tu club de pádel con IA. Automatiza reservas, torneos, CRM y más. Prueba gratuita sin tarjeta de crédito.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${montserrat.variable} ${openSans.variable} ${allertaStencil.variable} antialiased`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
