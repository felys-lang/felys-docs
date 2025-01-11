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
          {
            text: "Development",
            link: "/dev/prelude",
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
          "/dev": [
            {
              text: "Development",
              items: [{ text: "Prelude", link: "/dev/prelude" }],
            },
          ],
        },
        footer: {
          copyright: "© All rights reserved by FelysNeko",
        },
      },
    },

    zh: {
      title: "Felys文档",
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
            text: "教学",
            link: "/zh/guide/quickstart",
            activeMatch: "/zh/guide/",
          },
          {
            text: "开发",
            link: "/zh/dev/prelude",
            activeMatch: "/zh/dev/",
          },
        ],
        sidebar: {
          "/zh/guide": [
            {
              text: "教学",
              items: [{ text: "快速入门", link: "/zh/guide/quickstart" }],
            },
          ],
          "/zh/dev": [
            {
              text: "开发",
              items: [
                { text: "前言", link: "/zh/dev/prelude" },
                { text: "基础知识", link: "/zh/dev/basis" },
                { text: "语法解析", link: "/zh/dev/parser" },
                { text: "运行时", link: "/zh/dev/runtime" },
              ],
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
