import Image from "next/image"
import { Globe, Zap, Link2 } from "lucide-react"

export function NexusAbout() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Que es{" "}
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                Nexus
              </span>
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Tu CONTPAQi®, pero mas poderoso
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                Nexus
              </span>{" "}
              es una plataforma desarrollada por{" "}
              <span className="inline-flex items-center align-middle">
                <Image
                  src="/images/logo-montek.png"
                  alt="Montek"
                  width={100}
                  height={28}
                  className="h-5 w-auto"
                />
              </span>{" "}
              que extiende las capacidades de CONTPAQi®. No sustituye tu sistema actual, lo hace mas poderoso mediante web, automatizaciones e integraciones.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                icon: Globe,
                title: "Acceso web",
                description: "Trabaja desde cualquier lugar sin depender de una red local.",
              },
              {
                icon: Zap,
                title: "Automatizacion",
                description: "Elimina tareas manuales con flujos automatizados.",
              },
              {
                icon: Link2,
                title: "Integraciones",
                description: "Conecta CONTPAQi® con cualquier sistema externo.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-border/50 bg-card p-6 transition-colors hover:border-accent/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
