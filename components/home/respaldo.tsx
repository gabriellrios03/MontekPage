import { Clock, Building2 } from "lucide-react"
import Image from "next/image"

export function Respaldo() {
  return (
    <section id="respaldo" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative grid items-center gap-12 p-10 md:p-16 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Respaldo y experiencia
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Tecnologia moderna respaldada por experiencia real
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Montek cuenta con el respaldo de MTY Consultores, una firma con mas de 30 años de experiencia brindando servicios contables y administrativos, con profundo conocimiento del ecosistema CONTPAQi®.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                {
                  key: "experiencia",
                  icon: Clock,
                  title: "+30 años",
                  desc: "De experiencia en el ecosistema contable y administrativo.",
                },
                {
                  key: "mty-consultores",
                  icon: Building2,
                  title: "MTY Consultores",
                  desc: "MTY Consultores como socio estrategico.",
                },
              ].map((item) => (
                <div key={item.key} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="mt-2 flex items-center gap-4 rounded-xl border border-border/50 bg-background p-4">
                <Image
                  src="/images/contpaqi-sello-master.png"
                  alt="Sello CONTPAQi® Socios de Negocios Master"
                  width={160}
                  height={80}
                  className="object-contain"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/MTY.png"
                      alt="MTY Consultores"
                      width={220}
                      height={64}
                      className="h-12 w-auto"
                    />
                    <span className="font-display text-base font-semibold text-foreground">Distribuidor Diamante CONTPAQi®</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Respaldados por MTY Consultores, distribuidor Diamante CONTPAQi®, garantizando el mas alto nivel de certificacion y soporte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
