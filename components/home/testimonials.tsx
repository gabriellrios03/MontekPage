export function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Rivera",
      company: "LYL Autotransportes",
      quote:
        "Pasamos de manejar todo en Excel a una app hecha exactamente a nuestra forma de trabajar. Hoy generamos reportes y facturamos en CONTPAQi con un solo clic. Todo es más rápido y ordenado.",
    },
    {
      name: "Lucio Valentín",
      company: "Platinum Corporativo",
      quote: (
        <>
          Con{" "}
          <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
            Nexus
          </span>{" "}
          creamos reportes totalmente personalizados, tal como cada cliente los pide. Ahora generamos y enviamos balanzas con un solo clic, sin retrabajo.
        </>
      ),
    },
    {
      name: "René Martínez",
      company: "Informática Especializada Monterrey",
      quote:
        "Integramos CONTPAQi a nuestra plataforma sin aprender el SDK ni desarrollar soluciones complejas. Usamos el API de Montek y en semanas ya estábamos operando.",
    },
  ]

  return (
    <section id="clientes" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Casos reales
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Clientes que transformaron su operación con Montek
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Historias de empresas que automatizaron procesos, aceleraron su operación y mejoraron su control gracias a las soluciones de Montek.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={`${item.name}-${item.company}`}
              className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
            >
              <p className="text-base leading-relaxed text-muted-foreground">“{item.quote}”</p>
              <div>
                <p className="font-display text-base font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.company}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
