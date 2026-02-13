import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

export function NexusHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background glow - accent colored */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[140px]" />
        <div className="absolute right-1/3 bottom-1/3 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="animate-fade-in-up flex items-center justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm text-accent">
            by
            <Image src="/images/logo-montek.png" alt="Montek" width={100} height={28} className="h-5 w-auto" />
          </span>
        </div>

        <h1 className="animate-fade-in-up animation-delay-200 font-display text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl">
          <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
            Nexus
          </span>
        </h1>

        <p className="animate-fade-in-up animation-delay-400 mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
          La plataforma que potencia CONTPAQi®.
        </p>

        <div className="animate-fade-in-up animation-delay-600 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          <Button size="lg" variant="outline" className="gap-2 border-border/80 text-foreground hover:bg-secondary bg-transparent" asChild>
            <a href="https://appmontek.com" target="_blank" rel="noopener noreferrer">
              Iniciar sesion
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
