import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContpaqiHero } from "@/components/contpaqi/contpaqi-hero"
import { ContpaqiWhy } from "@/components/contpaqi/contpaqi-why"
import { ContpaqiProducts } from "@/components/contpaqi/contpaqi-products"
import { ContpaqiBenefits } from "@/components/contpaqi/contpaqi-benefits"
import { ContpaqiCTA } from "@/components/contpaqi/contpaqi-cta"

export const metadata: Metadata = {
  title: "CONTPAQi® | Soluciones empresariales de la mano de expertos",
  description:
    "Adquiere CONTPAQi® con MTY Consultores, distribuidor Diamante con más de 30 años de experiencia. Asesoría especializada y soporte de clase mundial.",
}

export default function ContpaqiPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContpaqiHero />
        <ContpaqiWhy />
        <ContpaqiProducts />
        <ContpaqiBenefits />
        <ContpaqiCTA />
      </main>
      <Footer />
    </>
  )
}
