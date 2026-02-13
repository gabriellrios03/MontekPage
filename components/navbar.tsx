"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo-montek.png" alt="Montek" width={140} height={40} className="h-8 w-auto" priority />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#nosotros" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Nosotros
          </Link>
          <Link href="/#soluciones" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Soluciones
          </Link>
          <Link href="/nexus" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Nexus
          </Link>
          <Link href="/contpaqi" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            CONTPAQi®
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://appmontek.com" target="_blank" rel="noopener noreferrer">
              Iniciar sesion
            </a>
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a
              href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar demo
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link
              href="/#nosotros"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="/#soluciones"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Soluciones
            </Link>
            <Link
              href="/nexus"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Nexus
            </Link>
            <Link
              href="/contpaqi"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              CONTPAQi®
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://appmontek.com" target="_blank" rel="noopener noreferrer">
                  Iniciar sesion
                </a>
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a
                  href="https://calendar.notion.so/meet/gabriel-0be361p9j/ucflv4odk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
