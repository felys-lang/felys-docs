import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Felys",
  rewrites: {
    "en/:rest*": ":rest*",
  },

  themeConfig: {
    socialLinks: [
      { icon: "github", link: "https://github.com/felys-lang/felys" },
    ],
  },

  locales: {
    root: {
      label: "English",
      lang: "en",
      description: "Language for Elysia",
    },

    zh: {
      label: "中文",
      lang: "zh",
      description: "至爱莉希雅的语言",
    },
  },
});
