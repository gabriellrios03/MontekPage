import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NexusHero } from "@/components/nexus/nexus-hero"
import { NexusAbout } from "@/components/nexus/nexus-about"
import { NexusScreens } from "@/components/nexus/nexus-screens"
import { NexusModules } from "@/components/nexus/nexus-modules"
import { NexusLab } from "@/components/nexus/nexus-lab"
import { NexusPricing } from "@/components/nexus/nexus-pricing"
import { NexusCTA } from "@/components/nexus/nexus-cta"

export const metadata: Metadata = {
  title: "Nexus by Montek | Potencia CONTPAQi®",
  description:
    "Nexus extiende las capacidades de CONTPAQi® con acceso web, automatizacion, integraciones y BI. La plataforma que lleva tu operacion al siguiente nivel.",
}

export default function NexusPage() {
  return (
    <>
      <Navbar />
      <main>
        <NexusHero />
        <NexusAbout />
        <NexusModules />
        <NexusLab />
        <NexusScreens />
        <NexusPricing />
        <NexusCTA />
      </main>
      <Footer />
    </>
  )
}
