const githubLink = "https://github.com/liamederzeel/nuxt-schema-form";
export default defineAppConfig({
  legacy: {
    ui: {
      primary: "green",
      neutral: "slate",
    },
  },
  default: {
    ui: {
      primary: "green",
      neutral: "zinc",
    },
  },
  theme: {
    radius: 0.25,
  },
  ui: {
    colors: {
      primary: "green",
      neutral: "zinc",
    },
  },
  uiPro: {
    footer: {
      bottom: {
        left: "text-sm text-gray-500 dark:text-gray-400",
        wrapper: "border-t border-neutral-200 dark:border-neutral-800",
      },
    },
  },
  seo: { siteName: "@ederzeel/nuxt-form" },
  header: {
    search: true,
    colorMode: true,
    links: [
      {
        icon: "i-simple-icons-github",
        to: githubLink,
        target: "_blank",
        "aria-label": "Nuxt form module",
      },
    ],
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-nuxtdotjs",
        to: "https://nuxt.com",
        target: "_blank",
        "aria-label": "Nuxt Website",
      },
      {
        icon: "i-simple-icons-github",
        to: githubLink,
        target: "_blank",
        "aria-label": "Nuxt form module",
      },
    ],
  },
  toc: {
    title: "On this page",
    bottom: {
      edit: `${githubLink}/edit/main/docs/content`,
    },
  },
});
