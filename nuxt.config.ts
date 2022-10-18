// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: [
    "@nuxt/content",
    ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
  ],
  imports: {
    dirs: ["stores"],
  },
  ssr: false,
  css: ["bulma"],
});
