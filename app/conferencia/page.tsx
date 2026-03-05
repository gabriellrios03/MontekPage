import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Conferencia | Montek",
  description: "Registro a la conferencia de Montek.",
}

export default function ConferenciaPage() {
  return (
    <>
      <Navbar />
      <main className="px-4 py-24 sm:px-6">
        <section className="mx-auto max-w-4xl">
          <h1 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
            Registro a Conferencia
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
            Completa el formulario para asegurar tu lugar.
          </p>

          <div className="mx-auto mt-10 w-full max-w-[640px]">
            <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm" style={{ aspectRatio: "640 / 823" }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSd0jLfykjQ9cEX3rpCLPO_DMTYDDbGcWV5KJAiiugsV1pp0KQ/viewform?embedded=true"
                title="Formulario de conferencia"
                className="absolute inset-0 h-full w-full"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
              >
                Cargando...
              </iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
