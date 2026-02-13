import { Check } from "lucide-react"
import Image from "next/image"

const offerings = [
  "Portafolio completo de productos Nexus",
  "Demos funcionales y ambientes de prueba",
  "Capacitacion tecnica y comercial",
  "Soporte tecnico prioritario",
  "Material de marketing y venta",
  "Seguimiento y acompañamiento constante",
  "Comisiones competitivas",
  "Acceso a actualizaciones y nuevos modulos",
]

export function DistribuidoresOffer() {
  return (
    <section className="relative px-6 py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="relative grid items-center gap-12 p-10 md:p-16 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Que ofrecemos
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Todo lo que necesitas para tener exito
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Te proporcionamos las herramientas, conocimiento y respaldo para que puedas comercializar Nexus con confianza y profesionalismo.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {offerings.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8">
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
                  <div className="rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Nexus Dashboard
                      </span>
                      <div className="h-2 w-2 rounded-full bg-chart-3 animate-pulse" />
                    </div>
                    <div className="flex items-end gap-3">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div
                          key={`bar-${i}`}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-accent/60 to-accent"
                          style={{ height: `${h}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["Ventas", "Clientes", "Comision"].map((label) => (
                      <div key={label} className="rounded-lg bg-secondary p-3 text-center">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm font-semibold text-foreground font-display">+</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
