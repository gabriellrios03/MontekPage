import type { Metadata } from "next"
import { Mail, MessageCircle } from "lucide-react"
import { TicketConsultation } from "@/components/support/ticket-consultation"

export const metadata: Metadata = {
  title: "Soporte | Montek",
  description:
    "Centro de soporte para reportar problemas y solicitar cambios en Nexus.",
}

const ticketScenarios = [
  {
    title: "Desarrollo a Medida en Nexus",
    description:
      "Cuando necesitas una nueva funcionalidad, flujo o integracion que hoy no existe en Nexus.",
  },
  {
    title: "Modificacion de Funcionalidad Existente",
    description:
      "Cuando quieres ajustar pantallas, reglas o procesos que ya funcionan dentro de Nexus.",
  },
  {
    title: "Reporte de Bug o Mal Funcionamiento",
    description:
      "Cuando detectas errores, datos incorrectos o comportamientos inesperados en la plataforma.",
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
          Para abrir un ticket, contactanos primero por WhatsApp o correo. Nuestro
          equipo registra tu caso y te comparte un ID con formato MTK-#### para
          darle seguimiento aqui.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="https://wa.me/528110089607"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp: +52 81 1008 9607
          </a>
          <a
            href="mailto:nexus@montek.com.mx"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <Mail className="h-4 w-4" />
            nexus@montek.com.mx
          </a>
        </div>
      </section>

      <section className="relative grid w-full gap-6 px-6 pb-20 sm:grid-cols-2 sm:px-10 xl:grid-cols-3">
        {ticketScenarios.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-border bg-card/90 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-card-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <TicketConsultation />
    </main>
  )
}
