import Image from "next/image"
import { Check } from "lucide-react"

const benefits = [
  "Implementacion guiada por expertos",
  "Capacitacion completa para tu equipo",
  "Soporte tecnico especializado",
  "Actualizaciones automaticas",
  "Respaldo de distribuidor Diamante",
  "Integracion con otros sistemas",
]

export function ContpaqiBenefits() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative grid items-center gap-12 p-10 md:p-16 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Respaldo y confianza
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Mas que software, un socio para tu crecimiento
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                MTY Consultores te acompaña en cada paso. Desde la selección del producto correcto hasta la optimización continua de tus procesos.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-border/50 bg-background p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/contpaqi-sello-master.png"
                    alt="Sello CONTPAQi® Socios de Negocios Master"
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      Certificacion Master
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      El mayor nivel de expertis y compromiso con nuestros clientes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-background p-6">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/MTY.png"
                    alt="MTY Consultores"
                    width={140}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">
                      Distribuidor Diamante
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      La maxima distincion de CONTPAQi® para distribuidores de excelencia.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <h3 className="font-display text-base font-semibold text-foreground">
                  +30 años de experiencia
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Mas de tres decadas ayudando a empresas a optimizar sus procesos administrativos y contables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
