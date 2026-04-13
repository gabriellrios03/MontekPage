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
  link: string
  isLive?: boolean
}

const webinars: Webinar[] = [
  {
    day: "Lunes 27 de abril",
    time: "10:00 AM",
    title: "Nexus BI (Reportes)",
    link: "https://events.teams.microsoft.com/event/3502ece0-5411-4b04-bea0-32e764de0752@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
    isLive: true,
  },
  {
    day: "Lunes 27 de abril",
    time: "3:00 PM",
    title: "Nexus Requisiciones",
    link: "https://events.teams.microsoft.com/event/0a228dcd-e198-420f-b94f-cabc19af212c@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
    isLive: true,
  },
  {
    day: "Martes 28 de abril",
    time: "10:00 AM",
    title: "Portal de Proveedores",
    link: "https://events.teams.microsoft.com/event/14ca9959-b129-4fc6-b18b-eaec4910558a@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Martes 28 de abril",
    time: "3:00 PM",
    title: "Nexus BI (Repetición)",
    link: "https://events.teams.microsoft.com/event/6538f4f0-4560-44ce-9140-843478ae0018@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Miércoles 29 de abril",
    time: "10:00 AM",
    title: "Nexus Requisiciones (Repetición)",
    link: "https://events.teams.microsoft.com/event/c038d58f-10b6-47ce-b33a-94bc0586cc0b@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Miércoles 29 de abril",
    time: "3:00 PM",
    title: "Nexus Cobranza",
    link: "https://events.teams.microsoft.com/event/28703d45-7f6e-46ff-8a9a-ccdb4c137f07@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Jueves 30 de abril",
    time: "10:00 AM",
    title: "Portal de Proveedores (Repetición)",
    link: "https://events.teams.microsoft.com/event/e5716faa-a88f-401f-a1a7-9535c9c6f33e@a56b05f7-95a4-4fc0-8caf-f498b087c01f",
  },
  {
    day: "Jueves 30 de abril",
    time: "3:00 PM",
    title: "Nexus Cobranza (Repetición)",
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
              Webinars Gratuitos
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
              Aprende sobre Nexus BI, Portal de Proveedores, Requisiciones, Cobranza y más. Todos nuestros webinars son completamente gratis.
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
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{webinar.title}</h3>
                            <Badge
                              variant="secondary"
                              className="bg-green-500/15 text-green-500 hover:bg-green-500/15 ring-1 ring-green-500/30"
                            >
                              Gratis
                            </Badge>
                            {webinar.isLive && (
                              <Badge
                                variant="default"
                                className="bg-red-500 text-white hover:bg-red-600 animate-pulse"
                              >
                                En vivo
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{webinar.time}</span>
                          </div>
                        </div>
                        <Button
                          asChild
                          className="mt-3 w-full sm:mt-0 sm:w-auto"
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
