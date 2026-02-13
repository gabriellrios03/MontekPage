import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function NexusPricing() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Precios
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Simple y transparente
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Un solo plan con todo incluido. Sin sorpresas.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background shadow-lg">
            <div className="bg-muted/40 px-8 py-6 text-center border-b border-border/60">
              <h3 className="font-display text-2xl font-bold text-foreground">Plan mensual</h3>
              <p className="mt-1 text-sm text-muted-foreground">Pago mes a mes</p>
            </div>

            <div className="px-8 py-10">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl font-bold text-foreground">$1,200</span>
                  <span className="text-lg text-muted-foreground">MXN/mes</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {[
                  "Incluye 1 usuario",
                  "Acceso a todos los modulos",
                  "Actualizaciones continuas",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-muted-foreground/40 text-muted-foreground/70">
                    <span className="text-[10px]">✕</span>
                  </div>
                  <span className="text-sm line-through">Sin creditos en la plataforma</span>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                No incluye impuestos. Aplican terminos y condiciones.
              </p>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  asChild
                >
                  <a
                    href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Solicitar demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border-2 border-accent/30 bg-background shadow-xl shadow-accent/5">
            <div className="bg-accent/5 px-8 py-6 text-center border-b border-accent/20">
              <h3 className="font-display text-2xl font-bold text-foreground">Plan anual</h3>
              <p className="mt-1 text-sm text-muted-foreground">12 meses por adelantado</p>
            </div>

            <div className="px-8 py-10">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl font-bold text-foreground">$1,000</span>
                  <span className="text-lg text-muted-foreground">MXN/mes</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Total anual: $12,000 MXN</p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {[
                  "Incluye 1 usuario",
                  "Acceso a todos los modulos",
                  "Actualizaciones continuas",
                  "Incluye creditos de $5,000.00 MXN",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                No incluye impuestos. Aplican terminos y condiciones.
              </p>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                  asChild
                >
                  <a
                    href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Solicitar demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
