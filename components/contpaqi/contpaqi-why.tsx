import { Award, Users, Clock, Headphones } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Distribuidor Diamante",
    description: "El nivel más alto de certificación CONTPAQi®. Garantía de excelencia y compromiso.",
  },
  {
    icon: Clock,
    title: "+30 años de experiencia",
    description: "Más de tres décadas brindando soluciones contables y administrativas de primer nivel.",
  },
  {
    icon: Users,
    title: "Asesoría especializada",
    description: "Equipo experto que te acompaña desde la implementación hasta el día a día.",
  },
  {
    icon: Headphones,
    title: "Soporte de clase mundial",
    description: "Atención personalizada y respuesta inmediata cuando más lo necesitas.",
  },
]

export function ContpaqiWhy() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Por que elegirnos
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            MTY Consultores: tu socio estrategico en CONTPAQi®
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            No solo vendemos software, te brindamos un ecosistema completo de soluciones y acompañamiento para que tu empresa opere al máximo nivel.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <reason.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-foreground">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
