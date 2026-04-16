"use client"

import {
  ClaudeAIWordmark,
  CursorWordmark,
  GithubWordmark,
  GoogleGeminiWordmark,
  GoogleWordmark,
  GrokWordmark,
  OpenAIWordmark,
  ReplicateWordmark,
} from "@aliimam/logos"

import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

type Logos03Props = {
  /** Título acima da faixa de logos */
  title?: string
  className?: string
}

export function Logos03({
  title = "Ecossistema e referências — tecnologia que inspira nossas entregas",
  className,
}: Logos03Props) {
  return (
    <div className={cn("w-full", className)}>
      <p className="text-muted-foreground mb-8 px-4 text-center text-sm font-medium sm:mb-10">
        {title}
      </p>
      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%] px-4 sm:px-6">
        <Marquee
          pauseOnHover
          className="w-full [--duration:50s] [--gap:70px] py-2"
        >
          <OpenAIWordmark className="text-foreground" size={100} />
          <ClaudeAIWordmark className="text-foreground" size={100} />
          <ReplicateWordmark className="text-foreground" size={100} />
          <CursorWordmark className="text-foreground" size={100} />
          <GoogleGeminiWordmark className="text-foreground" size={90} />
          <GithubWordmark className="text-foreground" size={90} />
          <GrokWordmark className="text-foreground" size={100} />
          <GoogleWordmark className="text-foreground mr-16" size={100} />
        </Marquee>
      </div>
    </div>
  )
}

export default Logos03
