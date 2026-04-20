/**
 * Imagens da landing — troque aqui quando tiver prints dedicados do dashboard.
 *
 * **Hero** — já usa os mesmos arquivos da raiz de `public/`.
 *
 * **Bento (card “Visão do gestor”)** — para um recorte que mostre só a tela relevante:
 * 1. Exporte PNG (ex.: 1600×1000 ou proporção 16:10), modo claro e escuro.
 * 2. Salve como `public/landing/bento-gestor-light.png` e `...-dark.png`.
 * 3. Altere `bentoGestorLight` / `bentoGestorDark` abaixo para esses caminhos.
 */
export const landingMedia = {
  heroLight: "/dashboard-light.png",
  heroDark: "/dashboard-dark.png",
  bentoGestorLight: "/dashboard-light.png",
  bentoGestorDark: "/dashboard-dark.png",
} as const
