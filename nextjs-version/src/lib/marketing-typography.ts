/**
 * Marketing / landing type scale — single source of truth.
 *
 * | Example    | Classes |
 * |------------|---------|
 * | Heading 72 | text-[72px] leading-[1.1] tracking-[-0.03em] font-bold |
 * | Heading 64 | text-[64px] leading-[1.1] tracking-[-0.03em] font-bold |
 * | Heading 56 | text-[56px] leading-[1.1] tracking-[-0.03em] font-bold |
 * | Heading 48 | text-[48px] leading-[1.1] tracking-[-0.03em] font-bold |
 * | Heading 40 | text-[40px] leading-[1.1] tracking-[-0.03em] font-bold |
 * | Heading 32 | text-[32px] leading-[1.2] tracking-[-0.02em] font-bold |
 * | Heading 24 | text-[24px] leading-[1.2] tracking-[-0.02em] font-bold |
 * | Heading 20 | text-[20px] leading-[1.3] tracking-[-0.01em] font-bold |
 * | Heading 16 | text-[16px] leading-[1.3] tracking-[-0.01em] font-bold |
 * | Heading 14 | text-[14px] leading-[1.4] tracking-[-0.01em] font-bold |
 *
 * “With Muted” = same metrics + `text-muted-foreground`.
 */
export const marketingHeading = {
  h72: "text-[72px] leading-[1.1] tracking-[-0.03em] font-bold",
  h64: "text-[64px] leading-[1.1] tracking-[-0.03em] font-bold",
  h56: "text-[56px] leading-[1.1] tracking-[-0.03em] font-bold",
  h48: "text-[48px] leading-[1.1] tracking-[-0.03em] font-bold",
  h40: "text-[40px] leading-[1.1] tracking-[-0.03em] font-bold",
  h32: "text-[32px] leading-[1.2] tracking-[-0.02em] font-bold",
  h32Muted: "text-[32px] leading-[1.2] tracking-[-0.02em] font-bold text-muted-foreground",
  h24: "text-[24px] leading-[1.2] tracking-[-0.02em] font-bold",
  h24Muted: "text-[24px] leading-[1.2] tracking-[-0.02em] font-bold text-muted-foreground",
  h20: "text-[20px] leading-[1.3] tracking-[-0.01em] font-bold",
  h20Muted: "text-[20px] leading-[1.3] tracking-[-0.01em] font-bold text-muted-foreground",
  h16: "text-[16px] leading-[1.3] tracking-[-0.01em] font-bold",
  h16Muted: "text-[16px] leading-[1.3] tracking-[-0.01em] font-bold text-muted-foreground",
  h14: "text-[14px] leading-[1.4] tracking-[-0.01em] font-bold",
  h14Muted: "text-[14px] leading-[1.4] tracking-[-0.01em] font-bold text-muted-foreground",
} as const

/** Hero (marketing): 40 → 56 → 72. */
export const marketingHeroTitle =
  "text-[40px] leading-[1.1] tracking-[-0.03em] font-bold sm:text-[56px] lg:text-[72px]"

/** CTA band / secondary hero: 48 → 56 → 64. */
export const marketingCtaTitle =
  "text-[48px] leading-[1.1] tracking-[-0.03em] font-bold sm:text-[56px] lg:text-[64px]"

/** Section titles: 24 → 32 (Heading 32 scale). */
export const marketingSectionTitle =
  "text-[24px] leading-[1.2] tracking-[-0.02em] font-bold sm:text-[32px]"

/** Intro paragraph under section titles (not bold; matches Heading 20 rhythm). */
export const marketingSectionLead =
  "text-[20px] leading-[1.3] tracking-[-0.01em] text-muted-foreground font-normal"

/** Hero / large intro body (muted). */
export const marketingHeroLead =
  "text-[20px] leading-[1.3] tracking-[-0.01em] text-muted-foreground font-normal sm:text-[24px] sm:leading-[1.2] sm:tracking-[-0.02em]"

/** Card / list titles (Heading 20). */
export const marketingCardTitle = marketingHeading.h20

/** Stat emphasis (between 24–32). */
export const marketingStatValue =
  "text-[24px] leading-[1.2] tracking-[-0.02em] font-bold sm:text-[32px] sm:leading-[1.2] sm:tracking-[-0.02em]"

/** Brand wordmark in nav / footer (Heading 20). */
export const marketingWordmark = marketingHeading.h20
