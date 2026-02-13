import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { About } from "@/components/home/about"
import { Respaldo } from "@/components/home/respaldo"
import { NexusHighlight } from "@/components/home/nexus-highlight"
import { Testimonials } from "@/components/home/testimonials"
import { Solutions } from "@/components/home/solutions"
import { Audience } from "@/components/home/audience"
import { CTA } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Respaldo />
        <NexusHighlight />
        <Testimonials />
        <Solutions />
        <Audience />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
