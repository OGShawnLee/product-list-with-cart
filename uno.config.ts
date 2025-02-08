import { defineConfig, presetUno, presetWebFonts, transformerVariantGroup } from "unocss";

export default defineConfig({
  shortcuts: {
    "button-red": "w-full h-12 bg-red rounded-full font-bold text-white",
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        "satoshi": ["Satoshi", "Satoshi:400,500"],
      }
    })
  ],
  theme: {
    colors: {
      red: "hsl(14, 86%, 42%)",
      green: "hsl(159, 69%, 38%)",
      rose: {
        50: "hsl(20, 50%, 98%)",
        100: "hsl(13, 31%, 94%)",
        300: "hsl(14, 25%, 72%)",
        400: "hsl(7, 20%, 60%)",
        500: "hsl(12, 20%, 44%)",
        900: "hsl(14, 65%, 9%)",
      }
    }
  },
  transformers: [transformerVariantGroup()],
});