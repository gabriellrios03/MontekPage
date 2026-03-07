"use client"

import { FormEvent, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import { AlertCircle, Loader2, Paperclip, Search } from "lucide-react"

type TicketResponse = {
  key: string
  summary: string
  status: string
  statusCategory: string
  issueType: string
  priority: string
  projectKey: string
  projectName: string
  reporter: string
  assignee: string
  labels: string[]
  descriptionMarkdown: string
  attachments: Array<{
    id: string
    filename: string
    mimeType: string
    size: number | null
    contentUrl: string | null
  }>
  comments: Array<{
    id: string
    author: string
    createdAt: string
    bodyMarkdown: string
  }>
  createdAt: string
  updatedAt: string
  browseUrl: string
}

function normalizeTicketResponse(payload: any): TicketResponse {
  return {
    key: payload?.key ?? "Sin clave",
    summary: payload?.summary ?? "Sin resumen",
    status: payload?.status ?? "Sin estatus",
    statusCategory: payload?.statusCategory ?? "Sin categoria",
    issueType: payload?.issueType ?? "Sin tipo",
    priority: payload?.priority ?? "Sin prioridad",
    projectKey: payload?.projectKey ?? "",
    projectName: payload?.projectName ?? "Sin proyecto",
    reporter: payload?.reporter ?? "No disponible",
    assignee: payload?.assignee ?? "Sin asignar",
    labels: Array.isArray(payload?.labels) ? payload.labels : [],
    descriptionMarkdown: payload?.descriptionMarkdown ?? "Sin descripcion",
    attachments: Array.isArray(payload?.attachments) ? payload.attachments : [],
    comments: Array.isArray(payload?.comments) ? payload.comments : [],
    createdAt: payload?.createdAt ?? "No disponible",
    updatedAt: payload?.updatedAt ?? "No disponible",
    browseUrl: payload?.browseUrl ?? "#",
  }
}

export function TicketConsultation() {
  const [ticketKey, setTicketKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ticket, setTicket] = useState<TicketResponse | null>(null)
  const [authorName, setAuthorName] = useState("")
  const [commentText, setCommentText] = useState("")
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentFeedback, setCommentFeedback] = useState<string | null>(null)

  async function fetchTicket(key: string) {
    const response = await fetch(`/api/jira/ticket?key=${encodeURIComponent(key)}`)
    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload?.error ?? "No se pudo consultar el ticket.")
    }

    return normalizeTicketResponse(payload)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedKey = ticketKey.trim().toUpperCase()
    if (!normalizedKey) {
      setError("Escribe una clave de ticket.")
      setTicket(null)
      return
    }

    setLoading(true)
    setError(null)
    setCommentFeedback(null)

    try {
      const normalizedTicket = await fetchTicket(normalizedKey)
      setTicket(normalizedTicket)
    } catch (requestError) {
      setTicket(null)
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo conectar con el servicio de Jira.",
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!ticket) {
      return
    }

    const normalizedName = authorName.trim()
    const normalizedComment = commentText.trim()

    if (!normalizedName) {
      setCommentFeedback("Escribe tu nombre.")
      return
    }

    if (!normalizedComment) {
      setCommentFeedback("Escribe tu comentario.")
      return
    }

    setCommentLoading(true)
    setCommentFeedback(null)

    try {
      const response = await fetch("/api/jira/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: ticket.key,
          name: normalizedName,
          comment: normalizedComment,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        setCommentFeedback(payload?.error ?? "No se pudo enviar el comentario.")
        return
      }

      setCommentText("")
      setCommentFeedback("Comentario enviado correctamente.")
      const refreshedTicket = await fetchTicket(ticket.key)
      setTicket(refreshedTicket)
    } catch {
      setCommentFeedback("No se pudo enviar el comentario en este momento.")
    } finally {
      setCommentLoading(false)
    }
  }

  return (
    <section className="relative w-full px-6 pb-24 sm:px-10">
      <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-sm sm:p-8">
        <p className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Consultar Ticket
        </p>

        <h2 className="mt-4 text-2xl font-bold text-card-foreground sm:text-3xl">
          Revisa el estado de tu solicitud
        </h2>

        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Ingresa la clave de tu ticket (por ejemplo: MTK-123) para consultar su
          informacion en Jira.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="ticket-key">
            Clave del ticket
          </label>
          <input
            id="ticket-key"
            name="ticket-key"
            value={ticketKey}
            onChange={(event) => setTicketKey(event.target.value)}
            placeholder="Ejemplo: MTK-123"
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Consultando
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Consultar
              </>
            )}
          </button>
        </form>

        {error ? (
          <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {ticket ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background/80">
            <div className="border-b border-border bg-gradient-to-r from-primary/10 via-accent/10 to-transparent px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Ticket
                  </p>
                  <p className="mt-1 text-2xl font-black text-foreground">{ticket.key}</p>
                  <p className="mt-2 max-w-3xl text-sm font-medium text-foreground sm:text-base">
                    {ticket.summary}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge value={ticket.issueType} variant="blue" />
                <Badge value={ticket.status} variant="green" />
                <Badge value={ticket.priority} variant="amber" />
                <Badge
                  value={ticket.projectKey ? `${ticket.projectKey} - ${ticket.projectName}` : ticket.projectName}
                  variant="slate"
                />
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Descripcion
              </h3>
              <div className="mt-3 max-h-[340px] overflow-y-auto rounded-xl border border-border bg-card/60 p-4">
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground sm:text-[15px]">
                  {ticket.descriptionMarkdown}
                </p>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
                <div>
                  {ticket.attachments?.length > 0 ? (
                    <>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Adjuntos
                      </h4>
                      <div className="mt-3 grid gap-2">
                        {ticket.attachments.map((file) => (
                          <a
                            key={file.id || file.filename}
                            href={file.contentUrl ?? undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2 text-sm text-card-foreground transition hover:border-primary/40"
                          >
                            <span className="inline-flex min-w-0 items-center gap-2">
                              <Paperclip className="h-4 w-4 shrink-0 text-primary" />
                              <span className="truncate">{file.filename}</span>
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </span>
                          </a>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>

                <div className="grid content-start gap-3">
                  <Info label="Estatus" value={ticket.status} />
                  <Info label="Categoria" value={ticket.statusCategory} />
                  <Info label="Tipo" value={ticket.issueType} />
                  <Info label="Prioridad" value={ticket.priority} />
                  <Info label="Reportado por" value={ticket.reporter} />
                  <Info label="Asignado a" value={ticket.assignee} />
                  <Info label="Creado" value={ticket.createdAt} />
                  <Info label="Ultima actualizacion" value={ticket.updatedAt} />

                  {ticket.labels?.length > 0 ? (
                    <div className="rounded-xl border border-border bg-card px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Etiquetas
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {ticket.labels.map((label) => (
                          <span
                            key={label}
                            className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="border-t border-border px-5 py-5 sm:px-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Agregar comentario
              </h3>

              <form onSubmit={handleCommentSubmit} className="mt-3 grid gap-3">
                <div className="grid gap-2 sm:max-w-md">
                  <label htmlFor="comment-name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Nombre
                  </label>
                  <input
                    id="comment-name"
                    value={authorName}
                    onChange={(event) => setAuthorName(event.target.value)}
                    placeholder="Tu nombre"
                    className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="comment-text" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Comentario
                  </label>
                  <textarea
                    id="comment-text"
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Escribe tu comentario"
                    rows={4}
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={commentLoading}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {commentLoading ? "Enviando..." : "Enviar comentario"}
                  </button>
                  {commentFeedback ? (
                    <p className="text-sm text-muted-foreground">{commentFeedback}</p>
                  ) : null}
                </div>
              </form>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Comentarios ({ticket.comments.length})
              </h3>

              {ticket.comments.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {ticket.comments.map((comment) => (
                    <article
                      key={comment.id || `${comment.author}-${comment.createdAt}`}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-card-foreground">
                          {comment.author}
                        </p>
                        <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
                      </div>
                      <MarkdownContent content={comment.bodyMarkdown} compact />
                    </article>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Este ticket no tiene comentarios todavia.
                </p>
              )}
            </div>
          </div>
        ) : null}

        <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="h-3.5 w-3.5" />
          Consulta en tiempo real usando tu cuenta de Jira.
        </p>
      </div>
    </section>
  )
}

type InfoProps = {
  label: string
  value: string
}

function Info({ label, value }: InfoProps) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-card-foreground">{value}</p>
    </div>
  )
}

function formatFileSize(value: number | null): string {
  if (!value || value <= 0) {
    return "N/A"
  }

  const mb = value / (1024 * 1024)
  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`
  }

  const kb = value / 1024
  return `${kb.toFixed(0)} KB`
}

type BadgeProps = {
  value: string
  variant: "blue" | "green" | "amber" | "slate"
}

function Badge({ value, variant }: BadgeProps) {
  const variants: Record<BadgeProps["variant"], string> = {
    blue: "border-sky-300/50 bg-sky-100 text-sky-900",
    green: "border-emerald-300/50 bg-emerald-100 text-emerald-900",
    amber: "border-amber-300/50 bg-amber-100 text-amber-900",
    slate: "border-slate-300/60 bg-slate-100 text-slate-900",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {value}
    </span>
  )
}

type MarkdownContentProps = {
  content: string
  compact?: boolean
}

function MarkdownContent({ content, compact = false }: MarkdownContentProps) {
  return (
    <div
      className={`markdown-body mt-3 text-sm leading-relaxed text-foreground sm:text-[15px] [&_h1]:mt-5 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_hr]:my-4 [&_hr]:border-border ${compact ? "mt-2" : ""}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline decoration-primary/50 underline-offset-2"
            />
          ),
          pre: (props) => (
            <pre
              {...props}
              className="my-3 overflow-x-auto rounded-lg border border-slate-300 bg-slate-100 p-3 font-mono text-[13px] leading-6 text-slate-800"
            />
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className)
            if (isBlock) {
              return (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            }

            return (
              <code
                {...props}
                className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-700"
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
