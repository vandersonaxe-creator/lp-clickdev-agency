"use client"

import * as React from "react"
import { Quote, Star } from "lucide-react"

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { marketingSectionLead, marketingSectionTitle } from "@/lib/marketing-typography"

export type TestimonialVideoItem = {
  id: string
  quote: string
  name: string
  role: string
  company?: string
  /** Vídeo 1:1 (ex.: MP4 em `public/landing/...`) */
  videoSrc: string
  videoType?: string
  /** Poster opcional enquanto o vídeo carrega */
  posterSrc?: string
  avatarSrc?: string
  initials?: string
  /** Inicia sozinho ao carregar. Com som, o navegador pode exigir interação antes de tocar. Default: false. */
  autoPlay?: boolean
  /** Sem som. Default: true (use `false` para depoimentos com áudio). */
  muted?: boolean
  /** Repetir ao terminar. Default: false */
  loop?: boolean
}

const defaultItems: TestimonialVideoItem[] = [
  {
    id: "1",
    name: "Wilton Cardoso",
    role: "Cliente industrial",
    quote:
      "A digitalização precisa falar a língua de quem está na operação. Com a Click Dev, conseguimos organizar informações, " +
      "reduzir retrabalho e ganhar clareza para decidir com dados — sem perder o ritmo do chão de fábrica.",
    videoSrc: "/landing/depoimento1.mp4",
    videoType: "video/mp4",
    posterSrc: "/landing/wiltontestemunha.svg",
    avatarSrc: "https://ia24x7.com/wp-content/uploads/2026/04/Wilton.webp",
    initials: "WC",
    muted: false,
  },
]

export type TestimonialsVideoProps = {
  id?: string
  title?: string
  subtitle?: string
  items?: TestimonialVideoItem[]
  className?: string
}

function TestimonialSlide({ item }: { item: TestimonialVideoItem }) {
  const forceMuted = item.muted !== false

  const fromName = item.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
  const fallback = item.initials ?? (fromName || "?")

  return (
    <article
      className={cn(
        "rounded-2xl border border-border/60 bg-muted/40 p-6 shadow-sm sm:p-8 lg:p-10",
        "text-foreground"
      )}
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black">
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={item.posterSrc}
            muted={forceMuted}
            autoPlay={item.autoPlay === true}
            loop={item.loop === true}
            aria-label={`Vídeo em depoimento de ${item.name} — ${forceMuted ? "sem áudio" : "com áudio"}`}
            onLoadedMetadata={(e) => {
              if (forceMuted) e.currentTarget.muted = true
            }}
            onVolumeChange={(e) => {
              if (forceMuted && !e.currentTarget.muted) {
                e.currentTarget.muted = true
              }
            }}
          >
            <source src={item.videoSrc} type={item.videoType ?? "video/mp4"} />
          </video>
          {forceMuted ? (
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/55 px-2 py-1 text-xs font-medium text-white/95 backdrop-blur-sm">
              Sem áudio
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <Quote className="h-10 w-10 shrink-0 text-muted-foreground/35" aria-hidden />
          <div className="flex gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-pretty text-base leading-relaxed sm:text-lg">{item.quote}</p>
          <div className="flex items-center gap-4 pt-1">
            <Avatar className="size-12 border border-border/60">
              {item.avatarSrc ? <AvatarImage src={item.avatarSrc} alt="" /> : null}
              <AvatarFallback className="text-sm font-semibold">{fallback}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-semibold leading-tight">{item.name}</p>
              <p className="text-muted-foreground text-sm leading-snug">
                {item.role}
                {item.company ? <span className="text-muted-foreground/90"> · {item.company}</span> : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsVideoSection({
  id = "depoimentos",
  title = "Depoimentos",
  subtitle = "Resultados reais de quem precisava de menos improviso e mais controle na operação.",
  items = defaultItems,
  className,
}: TestimonialsVideoProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selected, setSelected] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const sync = () => setSelected(api.selectedScrollSnap())
    sync()
    api.on("reInit", sync)
    api.on("select", sync)
    return () => {
      api.off("reInit", sync)
      api.off("select", sync)
    }
  }, [api])

  const count = items.length

  return (
    <section
      id={id}
      className={cn(
        "bg-white py-16 sm:py-24 lg:py-32",
        "dark:bg-background",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2 className={cn(marketingSectionTitle, "text-balance")}>{title}</h2>
          <p className={cn(marketingSectionLead, "mt-3 text-balance")}>{subtitle}</p>
        </div>

        <div className="relative mx-auto max-w-5xl px-10 sm:px-14">
          <Carousel
            className="w-full"
            setApi={setApi}
            opts={{ loop: count > 1, align: "start" }}
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {items.map((item) => (
                <CarouselItem key={item.id} className="pl-2 sm:basis-full sm:pl-4">
                  <TestimonialSlide item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              variant="outline"
              className="left-0 top-1/2 z-10 -translate-y-1/2 border-border/70 bg-background/90 shadow-sm sm:left-0"
            />
            <CarouselNext
              variant="outline"
              className="right-0 top-1/2 z-10 -translate-y-1/2 border-border/70 bg-background/90 shadow-sm sm:right-0"
            />
          </Carousel>

          {count > 1 ? (
            <div className="mt-8 flex justify-center gap-2">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Ir para o depoimento ${index + 1}`}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    selected === index
                      ? "bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsVideoSection
