import Image from "next/image"

type LogoProps = {
  size?: number
  className?: string
  alt?: string
  priority?: boolean
}

export function Logo({ size = 28, className, alt = "Click Dev", priority }: LogoProps) {
  return (
    <Image
      src="/clickdev-logo.svg"
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      className={className}
    />
  )
}
