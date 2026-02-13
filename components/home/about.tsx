import { Link2, Cpu, Code2, Layers } from "lucide-react"

const features = [
  {
    icon: Link2,
    title: "Integraciones nativas",
    description: "Conectamos tus sistemas de forma nativa y estructurada, mediante servicios cloud-native totalmente integrados, sin parches ni soluciones improvisadas.",
  },
  {
    icon: Cpu,
    title: "Automatizacion operativa",
    description: "Eliminamos tareas repetitivas para que tu equipo se enfoque en lo que importa.",
  },
  {
    icon: Code2,
    title: "Desarrollo a la medida",
    description: "Construimos soluciones que se adaptan a tu operacion, no al reves.",
  },
  {
    icon: Layers,
    title: "Arquitectura para crecer",
    description: "Plataformas disenadas para escalar con tu negocio.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Quienes somos
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Tecnologia empresarial con proposito
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Montek es una empresa de tecnologia especializada en integraciones empresariales, automatizacion de procesos y desarrollo de plataformas que extienden el alcance de tus sistemas de gestion.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:bg-card/80"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
