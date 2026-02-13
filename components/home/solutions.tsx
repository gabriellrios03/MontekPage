import Link from "next/link"
import { Layers, Link2, Code2, BarChart3, ArrowUpRight } from "lucide-react"

const solutions = [
  {
    icon: Layers,
    title: "Nexus",
    subtitle: "Plataforma",
    description: "Extiende CONTPAQi® con web, automatizacion, BI y APIs en una sola plataforma.",
    href: "/nexus",
    accent: true,
  },
  {
    icon: Link2,
    title: "Integraciones empresariales",
    subtitle: "Conectividad",
    description: "Conexion real entre tus sistemas, sin importar la complejidad.",
    href: "/#soluciones",
    accent: false,
  },
  {
    icon: Code2,
    title: "Desarrollo a la medida",
    subtitle: "Custom",
    description: "Soluciones disenadas especificamente para las necesidades de tu empresa.",
    href: "/#soluciones",
    accent: false,
  },
  {
    icon: BarChart3,
    title: "BI & Reportes",
    subtitle: "Inteligencia",
    description: "Dashboards, KPIs y reportes para tomar decisiones basadas en datos.",
    href: "/#soluciones",
    accent: false,
  },
]

export function Solutions() {
  return (
    <section id="soluciones" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Soluciones
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Todo lo que tu operacion necesita
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Desde integraciones hasta inteligencia de negocio, Montek tiene las herramientas para tu empresa.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((sol) => (
            <Link
              key={sol.title}
              href={sol.href}
              className={`group relative flex flex-col rounded-2xl border p-6 transition-all hover:shadow-lg ${
                sol.accent
                  ? "border-accent/30 bg-accent/5 hover:border-accent/50"
                  : "border-border/50 bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    sol.accent
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <sol.icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <span className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {sol.subtitle}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                {sol.title === "Nexus" ? (
                  <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                    Nexus
                  </span>
                ) : (
                  sol.title
                )}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{sol.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
