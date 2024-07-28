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
      title: "Felys",
      label: "English",
      lang: "en",
      description: "Language for Elysia",
      themeConfig: {
        nav: [
          {
            text: "Syntax",
            link: "/syntax/beginer",
            activeMatch: "/syntax/",
          },
          {
            text: "API",
            link: "/api/overview",
            activeMatch: "/api/",
          },
        ],
        sidebar: {
          "/syntax": [
            {
              text: "Syntax",
              items: [
                { text: "Quickstart", link: "/syntax/beginer" },
                { text: "Bilingual", link: "/syntax/bilingual" },
                { text: "Function", link: "/syntax/function" },
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
      title: "FELYS",
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
            text: "语法",
            link: "/zh/syntax/beginer",
            activeMatch: "/zh/syntax/",
          },
          {
            text: "接口",
            link: "/zh/api/overview",
            activeMatch: "/zh/api/",
          },
        ],
        sidebar: {
          "/zh/syntax": [
            {
              text: "语法",
              items: [
                { text: "快速入门", link: "/zh/syntax/beginer" },
                { text: "双语", link: "/zh/syntax/bilingual" },
                { text: "函数", link: "/zh/syntax/function" },
              ],
            },
          ],
          "/zh/api/": [
            {
              text: "接口",
              items: [
                { text: "概览", link: "/zh/api/overview" },
                { text: "变量函数", link: "/zh/api/object" },
                { text: "常量注入", link: "/zh/api/injection" },
                { text: "构建运行", link: "/zh/api/worker" },
                { text: "完整示例", link: "/zh/api/example" },
              ],
            },
          ],
        },
        footer: {
          copyright:
            "《崩坏3》素材的权利归米哈游所有，其他内容的相关权利、利益均归各自所有者享有",
        },
      },
    },
  },
});
