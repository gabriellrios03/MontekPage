import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[128px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="animate-fade-in-up flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-3.5 w-3.5" />
            Plataforma empresarial
          </span>
        </div>

        <h1 className="animate-fade-in-up animation-delay-200 text-balance font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          {"Tecnologia que conecta tu "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            operacion
          </span>
        </h1>

        <p className="animate-fade-in-up animation-delay-400 mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Integramos, automatizamos y potenciamos sistemas empresariales. Transformamos la forma en que tu empresa gestiona sus procesos.
        </p>

        <div className="animate-fade-in-up animation-delay-600 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8" asChild>
            <Link href="/nexus">
              Conocer Nexus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 border-border/80 text-foreground hover:bg-secondary bg-transparent" asChild>
            <a
              href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar demo
            </a>
          </Button>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in animation-delay-600 mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "+30", label: "años de respaldo" },
            { value: "100%", label: "cloud-native" },
            { value: "7+", label: "modulos" },
            { value: "24/7", label: "disponibilidad" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
