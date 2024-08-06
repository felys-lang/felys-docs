import { defineConfig } from "vitepress";

export default defineConfig({
  rewrites: {
    "en/:rest*": ":rest*",
  },

  head: [
    ["link", { rel: "icon", type: "image/icon", href: "/assets/elysia.ico" }],
  ],

  themeConfig: {
    logo: { src: "/assets/elysia.ico", width: 24, height: 24 },
    socialLinks: [
      { icon: "github", link: "https://github.com/felys-lang/felys" },
    ],
  },

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
            link: "/guide/install",
            activeMatch: "/guide/",
          },
          {
            text: "API",
            link: "/api/overview",
            activeMatch: "/api/",
          },
        ],
        sidebar: {
          "/guide": [
            {
              text: "Guide",
              items: [
                { text: "Quickstart", link: "/guide/install" },
                { text: "Bilingual", link: "/guide/bilingual" },
                { text: "Function", link: "/guide/function" },
              ],
            },
          ],
          "/api/": [
            {
              text: "API",
              items: [
                { text: "Overview", link: "/api/overview" },
                { text: "Object", link: "/api/object" },
                { text: "Injection", link: "/api/injection" },
                { text: "Worker", link: "/api/worker" },
                { text: "Example", link: "/api/example" },
              ],
            },
          ],
        },
        footer: {
          copyright:
            "Other properties and any right, title, and interest thereof and therein (intellectual property rights included) not derived from Honkai Impact 3rd belong to their respective owners.",
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
            link: "/zh/guide/install",
            activeMatch: "/zh/guide/",
          },
          {
            text: "接口",
            link: "/zh/api/overview",
            activeMatch: "/zh/api/",
          },
        ],
        sidebar: {
          "/zh/guide": [
            {
              text: "语法",
              items: [
                { text: "安装", link: "/zh/guide/install" },
                { text: "快速入门", link: "/zh/guide/quickstart" },
                { text: "双语对照", link: "/zh/guide/bilingual" },
                { text: "函数特性", link: "/zh/guide/function" },
              ],
            },
          ],
          "/zh/api/": [
            {
              text: "接口",
              items: [
                { text: "概览", link: "/zh/api/overview" },
                { text: "数据类型", link: "/zh/api/object" },
                { text: "常量注入", link: "/zh/api/injection" },
                { text: "构建运行", link: "/zh/api/worker" },
                { text: "完整示例", link: "/zh/api/example" },
              ],
            },
          ],
        },
        footer: {
          copyright:
            "《崩坏3》素材的权利归米哈游所有，其他内容的相关权利、利益均归各自所有者享有。",
        },
      },
    },
  },
});
