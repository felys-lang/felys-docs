import { defineConfig } from "vitepress";

export default defineConfig({
  rewrites: {
    "en/:rest*": ":rest*",
  },

  head: [
    ["link", { rel: "icon", type: "image/icon", href: "/elysia.ico" }],
    ["link", { rel: "apple-touch-icon", href: "/elysia.png" }],
  ],

  themeConfig: {
    logo: { src: "/elysia.ico", width: 24, height: 24 },
    socialLinks: [
      { icon: "github", link: "https://github.com/felys-lang/felys" },
    ],
  },
  appearance: "force-dark",

  locales: {
    root: {
      title: "Felys Docs",
      label: "English",
      lang: "en",
      description: "Language for Elysia",
      themeConfig: {
        nav: [
          {
            text: "Guide",
            link: "/guide/quickstart",
            activeMatch: "/guide/",
          },
        ],
        sidebar: {
          "/guide": [
            {
              text: "Guide",
              items: [{ text: "Quickstart", link: "/guide/quickstart" }],
            },
          ],
        },
        footer: {
          copyright: "© All rights reserved by FelysNeko",
        },
      },
    },

    zh: {
      title: "FELYS文档",
      label: "中文",
      lang: "zh",
      description: "至爱莉希雅的语言",
      themeConfig: {
        outline: {
          label: "页面导航",
        },
        docFooter: {
          prev: "上一页",
          next: "下一页",
        },
        nav: [
          {
            text: "指南",
            link: "/zh/guide/quickstart",
            activeMatch: "/zh/guide/",
          },
        ],
        sidebar: {
          "/zh/guide": [
            {
              text: "语法",
              items: [{ text: "快速入门", link: "/zh/guide/quickstart" }],
            },
          ],
        },
        footer: {
          copyright: "© 银河猫猫侠版权所有",
        },
      },
    },
  },
});
