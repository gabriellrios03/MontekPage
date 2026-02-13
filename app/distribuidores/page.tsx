import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DistribuidoresHero } from "@/components/distribuidores/distribuidores-hero"
import { DistribuidoresBenefits } from "@/components/distribuidores/distribuidores-benefits"
import { DistribuidoresOffer } from "@/components/distribuidores/distribuidores-offer"
import { DistribuidoresProcess } from "@/components/distribuidores/distribuidores-process"
import { DistribuidoresCTA } from "@/components/distribuidores/distribuidores-cta"

export const metadata: Metadata = {
  title: "Se Distribuidor | Montek - Oportunidad de negocio",
  description:
    "Conviertete en distribuidor de Nexus y las soluciones de Montek. Ofrecemos capacitacion, soporte y un modelo de negocio rentable.",
}

export default function DistribuidoresPage() {
  return (
    <>
      <Navbar />
      <main>
        <DistribuidoresHero />
        <DistribuidoresBenefits />
        <DistribuidoresOffer />
        <DistribuidoresProcess />
        <DistribuidoresCTA />
      </main>
      <Footer />
    </>
  )
}
