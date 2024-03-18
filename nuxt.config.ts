import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/eslint-module", "@nuxtjs/apollo", "nuxt-graphql-server"],
    graphqlServer: {
        schema: "./server/**/*.graphql",
        url: "/api/graphql",
    },
});
