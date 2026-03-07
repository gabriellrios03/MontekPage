import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { TicketConsultation } from "@/components/support/ticket-consultation"

export const metadata: Metadata = {
  title: "Soporte | Montek",
  description:
    "Centro de soporte para reportar problemas y solicitar cambios en Nexus.",
}

const supportLinks = [
  {
    title: "Desarrollo a Medida en Nexus",
    description:
      "Solicitud para desarrollo a medida dentro de Nexus.",
    href: "https://montek.atlassian.net/jira/software/form/f7f6b099-71a2-4604-a500-88b7f22e642e?atlOrigin=eyJpIjoiOGNhZGI3ZjQ4ZGM0NGJjNGJkM2QyNTMwNjA1YTU2ZTIiLCJwIjoiaiJ9",
  },
  {
    title: "Personalizacion de Funcionalidad Existente",
    description:
      "Requerimiento para personalizar algo que ya existe en Nexus.",
    href: "https://montek.atlassian.net/jira/software/form/ae3bd005-a25f-4bb9-ae4c-f4e402f0a2ba?atlOrigin=eyJpIjoiYzM0Y2QxOTllNzdhNDNmMzg3MTAyYzljNGU0ZjliZGUiLCJwIjoiaiJ9",
  },
  {
    title: "Reporte de Bug o Mal Funcionamiento",
    description:
      "Formulario para reportar errores o fallas de funcionamiento.",
    href: "https://montek.atlassian.net/jira/software/form/09500329-130a-4bf4-9dfa-0c3d3ab59d65?atlOrigin=eyJpIjoiNTFjMGMyZjVjYzRjNGRiNWE2NzUyYjQ0MGZhMjU5ZTYiLCJwIjoiaiJ9",
  },
]

export default function SoportePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 top-28 h-[280px] w-[280px] rounded-full bg-accent/15 blur-3xl" />
      </div>

      <section className="relative w-full px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-14">
        <p className="inline-block rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Support Center
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-foreground sm:text-5xl">
          Portal de Soporte Nexus
        </h1>

        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Selecciona el tipo de solicitud. Todos los formularios se abren en una
          pagina aparte.
        </p>
      </section>

      <section className="relative grid w-full gap-6 px-6 pb-20 sm:grid-cols-2 sm:px-10 xl:grid-cols-3">
        {supportLinks.map((item) => (
          <article
            key={item.href}
            className="group rounded-2xl border border-border bg-card/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-card-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/15"
            >
              Abrir formulario
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </section>

      <TicketConsultation />
    </main>
  )
}
