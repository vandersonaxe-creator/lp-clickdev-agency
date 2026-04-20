import type { Variants } from "motion/react"

/**
 * Single motion language for the landing page.
 *
 * - `EASE`:       curva premium padrão (easeOutExpo-like).
 * - `fadeUp`:     bloco sobe 20px com fade. Uso em section headers.
 * - `fadeUpSoft`: variação mais discreta (y=14) para itens de lista.
 * - `stagger`:    container com staggerChildren curto.
 *
 * Consuma sempre estes presets para manter consistência.
 */
export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

/** Para seções que entram na viewport. */
export const inViewDefault = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.15 },
} as const
