import { Phone, FileCheck, GraduationCap, Rocket } from "lucide-react"

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Llamada comercial",
    description: "Agendamos una sesion para conocer tu perfil y explicarte el modelo de negocio.",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Evaluacion y acuerdo",
    description: "Revisamos tu zona, mercado objetivo y firmamos el acuerdo de distribucion.",
  },
  {
    icon: GraduationCap,
    number: "03",
    title: "Capacitacion y onboarding",
    description: "Te entrenamos en Nexus, las mejores practicas de venta y te damos acceso a demos.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Lanzamiento",
    description: "Comienzas a comercializar con todo el respaldo de Montek. Arrancas a vender.",
  },
]

export function DistribuidoresProcess() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Como empezar
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            4 pasos para convertirte en distribuidor
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Proceso sencillo y rapido para que puedas comenzar a generar ingresos lo antes posible.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-px w-full bg-gradient-to-r from-accent/40 to-transparent lg:block" />
              )}
              <div className="relative rounded-2xl border border-border/50 bg-card p-8 text-center transition-all hover:border-accent/30 hover:shadow-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="mt-4 text-sm font-bold text-accent">{step.number}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
