import { Building2, Briefcase, Network, Monitor, Database } from "lucide-react"

const profiles = [
  {
    icon: Building2,
    title: "Empresas",
    description: "Que buscan automatizar y conectar sus procesos operativos.",
  },
  {
    icon: Briefcase,
    title: "Despachos contables",
    description: "Que necesitan extender CONTPAQi® con herramientas web.",
  },
  {
    icon: Network,
    title: "Corporativos",
    description: "Con operaciones complejas que requieren integraciones robustas.",
  },
  {
    icon: Monitor,
    title: "Equipos de TI",
    description: "Que necesitan APIs y plataformas para conectar sistemas internos.",
  },
  {
    icon: Database,
    title: "Empresas con sistemas heredados",
    description: "Que quieren modernizar sin reemplazar lo que ya funciona.",
  },
]

export function Audience() {
  return (
    <section className="relative px-6 py-32 bg-card/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Para quien es Montek
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Soluciones para cada perfil
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <div
              key={profile.title}
              className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <profile.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{profile.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{profile.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
