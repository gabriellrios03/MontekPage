import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Webinars | Montek",
  description: "Accede a webinars gratuitos sobre Nexus BI, Portal de Proveedores, Requisiciones y más.",
}

interface Webinar {
  day: string
  time: string
  title: string
  description: string
  link: string
}

const webinars: Webinar[] = [
  {
    day: "Lunes 27 de abril",
    time: "10:00 AM",
    title: "Nexus BI (Reportes)",
    description: "Conoce cómo visualizar la información de tu empresa en tiempo real, generar KPI's estratégicos y crear reportes personalizados. Además, podrás exportar a Excel cuando lo necesites y consultar datos desde App Mobile.",
    link: "https://events.teams.microsoft.com/event/3502ece0-5411-4b04-bea0-32e764de0752@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Lunes 27 de abril",
    time: "3:00 PM",
    title: "Nexus Requisiciones",
    description: "Aprende a estructurar y controlar tu proceso de compras con roles por usuario, seguimiento en tiempo real y control total desde la solicitud hasta la orden de compra.",
    link: "https://events.teams.microsoft.com/event/0a228dcd-e198-420f-b94f-cabc19af212c@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Martes 28 de abril",
    time: "10:00 AM",
    title: "Portal de Proveedores",
    description: "Digitaliza la recepción de documentos, gestiona XML y PDF, crea expedientes digitales y fortalece tu cumplimiento ante el SAT.",
    link: "https://events.teams.microsoft.com/event/14ca9959-b129-4fc6-b18b-eaec4910558a@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Martes 28 de abril",
    time: "3:00 PM",
    title: "Nexus BI (Reportes)",
    description: "Una nueva sesión para conocer cómo transformar la información de CONTPAQi® en indicadores claros, reportes dinámicos y análisis en tiempo real.",
    link: "https://events.teams.microsoft.com/event/6538f4f0-4560-44ce-9140-843478ae0018@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Miércoles 29 de abril",
    time: "10:00 AM",
    title: "Nexus Requisiciones",
    description: "Descubre cómo mejorar la gestión de compras mediante procesos estructurados, visibilidad completa y control por roles.",
    link: "https://events.teams.microsoft.com/event/c038d58f-10b6-47ce-b33a-94bc0586cc0b@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Miércoles 29 de abril",
    time: "3:00 PM",
    title: "Nexus Cobranza",
    description: "Optimiza tu flujo de efectivo con herramientas de seguimiento, alertas automáticas y control total de cuentas por cobrar.",
    link: "https://events.teams.microsoft.com/event/28703d45-7f6e-46ff-8a9a-ccdb4c137f07@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Jueves 30 de abril",
    time: "10:00 AM",
    title: "Portal de Proveedores",
    description: "Conoce cómo fortalecer el control documental, mejorar la validación de facturas y mantener un expediente digital completo de proveedores.",
    link: "https://events.teams.microsoft.com/event/e5716faa-a88f-401f-a1a7-9535c9c6f33e@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Jueves 30 de abril",
    time: "3:00 PM",
    title: "Nexus Cobranza",
    description: "Aprende a automatizar procesos de cobranza, dar seguimiento a clientes y mejorar la visibilidad de tus ingresos.",
    link: "https://events.teams.microsoft.com/event/15cfdf59-3dc6-4975-a2f1-6a2ce1f29029@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
]

export default function WebinarsPage() {
  const groupedWebinars = webinars.reduce(
    (acc, webinar) => {
      const existingDay = acc.find((group) => group.day === webinar.day)
      if (existingDay) {
        existingDay.webinars.push(webinar)
      } else {
        acc.push({ day: webinar.day, webinars: [webinar] })
      }
      return acc
    },
    [] as { day: string; webinars: Webinar[] }[]
  )

  return (
    <>
      <Navbar />
      <main className="px-4 py-12 sm:px-6 lg:py-24">
        <section className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
              Sesiones en Vivo Nexus
            </h1>
            <p className="text-lg font-semibold text-primary mt-2">Potenciando CONTPAQi®</p>
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted-foreground sm:text-base">
              Durante esta semana, conoce cómo llevar tu operación al siguiente nivel con Nexus, una plataforma diseñada para potenciar CONTPAQi® a través de herramientas modernas, accesibles y enfocadas en resultados.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-muted-foreground">
              Todas las sesiones son <span className="font-semibold text-foreground">100% en vivo</span>, virtuales y con duración aproximada de <span className="font-semibold text-foreground">45 minutos</span>.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {groupedWebinars.map((group) => (
              <div key={group.day}>
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">{group.day}</h2>
                </div>
                <div className="space-y-3">
                  {group.webinars.map((webinar, idx) => (
                    <Card
                      key={idx}
                      className="border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/50 sm:p-5"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-foreground">{webinar.title}</h3>
                          <Badge
                            variant="secondary"
                            className="bg-green-500/15 text-green-500 hover:bg-green-500/15 ring-1 ring-green-500/30"
                          >
                            Gratis
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{webinar.description}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{webinar.time}</span>
                        </div>
                        <Button
                          asChild
                          className="mt-2 w-full sm:w-auto"
                          variant="default"
                        >
                          <a href={webinar.link} target="_blank" rel="noopener noreferrer">
                            Unirse
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-border bg-card/50 p-6 sm:p-8">
            <h3 className="font-semibold text-foreground mb-2">¿Necesitas más información?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Si tienes preguntas sobre algún webinar o necesitas capacitación personalizada, no dudes en contactarnos.
            </p>
            <Button asChild>
              <a href="/Soporte">Contactar Soporte</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
