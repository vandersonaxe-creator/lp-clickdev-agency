import { cn } from "@/lib/utils"
import { marketingEyebrow } from "@/lib/marketing-typography"

type EyebrowProps = {
  children: React.ReactNode
  className?: string
  /**
   * Posição do separador. `left` é o default (eyebrow alinhada ao início).
   * `center` centraliza e usa dois traços laterais.
   */
  align?: "left" | "center"
}

/**
 * Eyebrow editorial — rótulo curto em caps, tracking largo e um traço fino
 * antes/ depois. Usa o token `marketingEyebrow` como base.
 */
export function Eyebrow({ children, className, align = "left" }: EyebrowProps) {
  if (align === "center") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3 text-muted-foreground",
          className
        )}
      >
        <span className="h-px w-8 bg-border" aria-hidden />
        <span className={marketingEyebrow}>{children}</span>
        <span className="h-px w-8 bg-border" aria-hidden />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-muted-foreground",
        className
      )}
    >
      <span className="h-px w-6 bg-border" aria-hidden />
      <span className={marketingEyebrow}>{children}</span>
    </div>
  )
}
