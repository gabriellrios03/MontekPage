"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

const screens = [
  {
    src: "/images/1.png",
    alt: "Pantalla Nexus 1",
  },
  {
    src: "/images/2.png",
    alt: "Pantalla Nexus 2",
  },
  {
    src: "/images/3.png",
    alt: "Pantalla Nexus 3",
  },
  {
    src: "/images/4.png",
    alt: "Pantalla Nexus 4",
  },
]

export function NexusScreens() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Screens
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Echa un vistazo a la app.
            </p>
          </div>

          <div className="mt-12">
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
              {screens.map((screen) => (
                <button
                  key={screen.src}
                  onClick={() => setSelectedImage(screen.src)}
                  className="group relative min-w-[260px] flex-1 snap-center overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-lg shadow-accent/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/20 md:min-w-[420px] cursor-pointer"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={1400}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 bg-black/95 border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          {selectedImage && (
            <div className="relative h-full w-full flex items-center justify-center p-4">
              <Image
                src={selectedImage}
                alt="Screenshot ampliado"
                width={2800}
                height={1800}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
