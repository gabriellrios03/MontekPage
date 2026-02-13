import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function DistribuidoresCTA() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/10 via-card to-primary/5">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
          </div>
          
          <div className="relative p-12 text-center md:p-16">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              ¿Listo para emprender con{" "}
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                Montek
              </span>
              ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Agenda tu llamada comercial hoy mismo. Nuestro equipo te explicara todo el modelo de negocio, comisiones y beneficios.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8" asChild>
                <a
                  href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-5 w-5" />
                  Agendar llamada comercial
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Sin compromiso. Te asesoramos para que tomes la mejor decision.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
