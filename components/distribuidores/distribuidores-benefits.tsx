import { TrendingUp, Users, Headphones, GraduationCap, Sparkles, Shield } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Modelo de negocio rentable",
    description: "Margenes atractivos y recurrencia mensual con cada cliente que integres.",
  },
  {
    icon: Users,
    title: "Mercado en crecimiento",
    description: "Empresas que buscan modernizar sus sistemas estan en constante demanda de soluciones como Nexus.",
  },
  {
    icon: GraduationCap,
    title: "Capacitacion completa",
    description: "Te entrenamos en todos los modulos de Nexus y las mejores practicas comerciales.",
  },
  {
    icon: Headphones,
    title: "Soporte tecnico dedicado",
    description: "Tu equipo cuenta con respaldo directo de Montek para resolver cualquier situacion.",
  },
  {
    icon: Sparkles,
    title: "Material comercial incluido",
    description: "Presentaciones, demos, casos de exito y todo lo necesario para cerrar ventas.",
  },
  {
    icon: Shield,
    title: "Proteccion de territorio",
    description: "Zonas exclusivas para que crezcas sin competencia interna.",
  },
]

export function DistribuidoresBenefits() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Ventajas
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Por que ser distribuidor Montek
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            No solo venderas tecnologia, construiras una red de ingreso recurrente con el respaldo de un equipo experimentado.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
