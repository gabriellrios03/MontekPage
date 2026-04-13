import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, ExternalLink, ArrowRight } from "lucide-react"

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
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                  Sesiones en Vivo
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Potencia tu operación con
                  <span className="block text-primary">Nexus</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  Aprende cómo llevar tu gestión de CONTPAQi® al siguiente nivel con herramientas modernas, accesibles y enfocadas en resultados.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">100% En vivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Completamente gratis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">45 minutos</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl" />
                <div className="relative rounded-2xl border border-primary/20 bg-card p-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">Próximas sesiones</p>
                        <p className="text-lg font-bold text-foreground">Semana del 27 de abril</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-green-500/10 p-3">
                        <Clock className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">Horarios</p>
                        <p className="text-lg font-bold text-foreground">10:00 AM y 3:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Cronograma de Sesiones</h2>
            <div className="space-y-8">
              {groupedWebinars.map((group, dayIdx) => (
                <div key={group.day} className="relative">
                  {/* Day Header */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{group.day}</h3>
                    </div>
                  </div>

                  {/* Timeline Line */}
                  <div className="ml-5 space-y-4 border-l-2 border-border pl-8">
                    {group.webinars.map((webinar, idx) => (
                      <div key={idx} className="relative">
                        {/* Timeline Dot */}
                        <div className="absolute -left-10 top-2 h-4 w-4 rounded-full border-2 border-border bg-background" />

                        {/* Card */}
                        <Card className="group border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <h4 className="text-lg font-semibold text-foreground">{webinar.title}</h4>
                                <Badge className="bg-green-500/15 text-green-500 hover:bg-green-500/15">
                                  Gratis
                                </Badge>
                              </div>
                              <p className="mb-3 text-sm text-muted-foreground">{webinar.description}</p>
                              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                <Clock className="h-4 w-4" />
                                {webinar.time}
                              </div>
                            </div>
                            <Button
                              asChild
                              size="sm"
                              className="mt-4 w-full sm:mt-0 sm:w-auto"
                            >
                              <a href={webinar.link} target="_blank" rel="noopener noreferrer">
                                Unirse
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-card/50 px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">¿Listo para transformar tu operación?</h2>
            <p className="mb-8 text-muted-foreground">
              Únete a nuestras sesiones en vivo y descubre cómo Nexus puede potenciar tu gestión con CONTPAQi®
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <a href="/Soporte">Contactar Soporte</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/">Volver al inicio</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
