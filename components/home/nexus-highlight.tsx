import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Zap, Link2, Code2, BarChart3 } from "lucide-react"

const capabilities = [
  { icon: Globe, label: "Web" },
  { icon: Zap, label: "Automatizacion" },
  { icon: Link2, label: "Integraciones" },
  { icon: Code2, label: "APIs" },
  { icon: BarChart3, label: "BI" },
]

export function NexusHighlight() {
  return (
    <section className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
              Producto destacado
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl flex items-center gap-3 flex-wrap">
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">Nexus</span>
              <span className="text-muted-foreground text-2xl md:text-3xl font-normal">by</span>
              <Image src="/images/logo-montek.png" alt="Montek" width={140} height={40} className="h-8 md:h-10 w-auto" />
            </h2>
            <p className="mt-4 text-xl font-medium text-muted-foreground">
              No reemplaza CONTPAQi®, lo potencia.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">Nexus</span> extiende las capacidades de CONTPAQi® mediante una plataforma web, automatizacion e integraciones avanzadas.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {capabilities.map((cap) => (
                <div
                  key={cap.label}
                  className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary px-4 py-2 text-sm text-foreground"
                >
                  <cap.icon className="h-4 w-4 text-accent" />
                  {cap.label}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button size="lg" className="border border-accent/40 bg-secondary text-foreground hover:bg-secondary/80 hover:border-accent/60 gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20" asChild>
                <Link href="/nexus">
                  Ver <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">Nexus</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-chart-4/60" />
                <div className="h-3 w-3 rounded-full bg-chart-3/60" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <div className="h-3 w-32 rounded-full bg-secondary" />
                  <div className="ml-auto h-3 w-16 rounded-full bg-accent/20" />
                </div>
                <div className="rounded-xl bg-secondary p-6">
                  <div className="flex items-end gap-3">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={`bar-${h}`}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-accent/60 to-accent"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Ventas", "Inventario", "Cobranza"].map((label) => (
                    <div key={label} className="rounded-lg bg-secondary p-3 text-center">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-foreground font-display">Activo</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
