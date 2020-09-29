export default {
  target: "static",
  head: {
    title: "NoOutlet.net",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "NoOutlet.net is the personal website of Squiggs Anderson. He's just a regular ol' so-and-so, so's you know. Bye. Thanks for stopping by.",
      },
    ],
  },
  css: [{ src: "~/assets/styles/main.scss", lang: "scss" }],
  modules: ["@nuxt/content"],
  buildModules: [["@nuxtjs/date-fns", { methods: ["formatDistance"] }]],
};
