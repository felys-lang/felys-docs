import { defineConfig } from "vitepress";

export default defineConfig({
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
      title: "Felys",
      label: "English",
      lang: "en",
      description: "Language for Elysia",
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
              items: [{ text: "快速入门", link: "/zh/syntax/beginer" }],
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
      },
    },
  },
});
