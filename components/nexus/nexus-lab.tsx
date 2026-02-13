import { Settings, Puzzle, CreditCard, TrendingDown } from "lucide-react"

const labFeatures = [
  {
    icon: Puzzle,
    title: "Desarrollo a la medida",
    description: "Modulos diseñados especificamente para tus procesos.",
  },
  {
    icon: Settings,
    title: "Modificacion de modulos",
    description: "Ajustamos los modulos existentes a tu flujo de trabajo.",
  },
  {
    icon: CreditCard,
    title: "Pago unico por desarrollo",
    description: "Cada desarrollo personalizado se paga una sola vez.",
  },
  {
    icon: TrendingDown,
    title: "La mensualidad no incrementa",
    description: "Sin importar cuantas personalizaciones agregues.",
  },
]

export function NexusLab() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-primary/5">
          <div className="p-10 md:p-16">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
                <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                  Nexus
                </span>
                <span>Lab</span>
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                  Nexus
                </span>{" "}
                se adapta a tu empresa, no al reves
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Personalizacion real para que la plataforma refleje exactamente tus procesos.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {labFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border/50 bg-card/80 p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
