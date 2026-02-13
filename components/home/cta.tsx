import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-12 md:p-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />

          <div className="relative z-10 text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Conecta tu operacion con Montek
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Agenda una llamada con nuestro equipo y descubre como podemos potenciar tus sistemas.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8" asChild>
                <a
                  href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-border/80 text-foreground hover:bg-secondary bg-transparent" asChild>
                <Link href="/nexus">
                  Conocer Nexus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
