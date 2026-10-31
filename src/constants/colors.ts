/**
 * Paleta de cores do Fin2Gether (assets/fin2gether-identidade-visual.md).
 * Mesmos valores definidos em src/global.css como variáveis CSS (uso web),
 * espelhados aqui como constantes para uso em StyleSheet (web + nativo).
 */
export const Colors = {
  // Base
  bg: "#F3F6F1",
  surface: "#FFFFFF",
  surfaceAlt: "#F9FBF8",
  text: "#13261C",
  textMuted: "#5B6B61",
  textControl: "#3F4F45",

  // Marca
  primary: "#1E6B47",
  primaryDark: "#0F3B28",
  accent: "#B9E07A",
  primarySoft: "#D7EEDD",
  primarySofter: "#EEF7F0",
  accentSoft: "#E9F5CF",

  // Linhas e controles
  border: "#E2E8E1",
  borderInput: "#D5DED3",
  track: "#EAF0E8",
  segmentedBg: "#E4EBE2",
  radioOff: "#B8C4B9",
  borderDashed: "#9FB3A3",

  // Status e alertas
  warning: "#C2410C",
  warningBg: "#FDECD8",
  warningText: "#9A3412",
  warningStrong: "#7C2D12",
  dangerBg: "#FBD5D0",
  dangerText: "#991B1B",

  // Transparências (sobre primaryDark)
  onPrimaryDarkSecondaryText: "rgba(255, 255, 255, 0.8)",
  onPrimaryDarkCard: "rgba(255, 255, 255, 0.08)",
  onPrimaryDarkTrack: "rgba(255, 255, 255, 0.14)",
  onPrimaryDarkBorder: "rgba(255, 255, 255, 0.3)",
  accentBadgeBg: "rgba(185, 224, 122, 0.16)",
} as const;

export type ColorToken = keyof typeof Colors;
