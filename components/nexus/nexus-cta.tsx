import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

export function NexusCTA() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 via-secondary to-primary/5 p-12 md:p-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px]" />

          <div className="relative z-10 text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Lleva CONTPAQi® al siguiente nivel con{" "}
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                Nexus
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Agenda una llamada y descubre como{" "}
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                Nexus
              </span>{" "}
              puede transformar tu operacion.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 px-8" asChild>
                <a
                  href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-border text-foreground hover:bg-secondary bg-transparent" asChild>
                <a href="https://appmontek.com" target="_blank" rel="noopener noreferrer">
                  Iniciar sesion
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
