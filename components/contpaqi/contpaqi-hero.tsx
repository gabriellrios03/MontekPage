import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function ContpaqiHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute right-1/3 bottom-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="animate-fade-in-up mb-8 flex items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm text-primary">
            Distribuidor Diamante
          </span>
        </div>

        <h1 className="animate-fade-in-up animation-delay-200 font-display text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          Adquiere CONTPAQi® con los mejores
        </h1>

        <p className="animate-fade-in-up animation-delay-400 mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
          MTY Consultores, distribuidor Diamante con más de 30 años de experiencia, te ofrece las soluciones CONTPAQi® con asesoría especializada y soporte de clase mundial.
        </p>

        <div className="animate-fade-in-up animation-delay-600 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8" asChild>
            <a
              href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar cotizacion
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="animate-fade-in-up animation-delay-800 mt-16 flex items-center justify-center gap-8">
          <Image
            src="/images/MTY.png"
            alt="MTY Consultores"
            width={220}
            height={64}
            className="h-12 w-auto opacity-80"
          />
          <div className="h-12 w-px bg-border" />
          <Image
            src="/images/contpaqi-sello-master.png"
            alt="Sello CONTPAQi® Master"
            width={160}
            height={80}
            className="h-16 w-auto object-contain opacity-80"
          />
        </div>
      </div>
    </section>
  )
}
