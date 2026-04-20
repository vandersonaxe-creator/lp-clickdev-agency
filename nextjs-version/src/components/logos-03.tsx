"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

type Logos03Props = {
  /** Título acima da faixa de logos */
  title?: string
  className?: string
}

const STACK = [
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "react", label: "React" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "tailwindcss", label: "Tailwind CSS" },
  { slug: "supabase", label: "Supabase" },
  { slug: "vercel", label: "Vercel" },
  { slug: "n8n", label: "n8n" },
] as const

function TechStackItem({ slug, label }: { slug: string; label: string }) {
  const src = `https://cdn.simpleicons.org/${slug}/64748b`
  return (
    <div className="flex items-center gap-3 px-2">
      <Image
        src={src}
        alt=""
        width={28}
        height={28}
        className="opacity-90 [filter:brightness(0)_saturate(100%)] dark:[filter:brightness(0)_saturate(100%)_invert(1)]"
      />
      <span className="text-sm font-semibold tracking-tight text-foreground/90">{label}</span>
    </div>
  )
}

export function Logos03({
  title = "Stack moderna — o mesmo conjunto usado em produtos digitais de alto desempenho",
  className,
}: Logos03Props) {
  return (
    <div className={cn("w-full", className)}>
      <p className="text-muted-foreground mb-8 px-4 text-center text-sm font-medium sm:mb-10">{title}</p>
      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%] px-4 sm:px-6">
        <Marquee pauseOnHover className="w-full [--duration:45s] [--gap:56px] py-2">
          {STACK.map((item) => (
            <TechStackItem key={item.slug} slug={item.slug} label={item.label} />
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default Logos03
