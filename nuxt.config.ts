import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/eslint-module", "@nuxtjs/apollo", "nuxt-graphql-server"],
    graphqlServer: {
        schema: "./server/**/*.graphql",
        url: "/api/graphql",
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: "http://localhost:3001/api/graphql",
            },
        },
    },
});
