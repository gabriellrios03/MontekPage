import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NexusQuote } from "@/components/nexus/nexus-quote"

export const metadata: Metadata = {
  title: "Cotizar Nexus | Montek",
  description:
    "Cotiza Nexus por plan, tipo de operacion y usuarios adicionales con prorrateo anual.",
}

export default function NexusQuotePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 print:pt-0">
        <section className="relative px-6 py-24 print:px-0 print:py-0">
          <div className="mx-auto max-w-5xl print:max-w-full">
            <div className="text-center print:hidden">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Cotizar
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Cotizador de{" "}
                <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                  Nexus
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Calcula nuevas altas o incrementos de usuarios en minutos.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                Estos precios son publicos y deben ser respetados por cualquier
                distribuidor.
              </p>
            </div>

            <NexusQuote />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
