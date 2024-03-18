<template>
    <div v-if="data">
        <p>{{ data.eventBySlug?.title }}</p>
        <img :src="data.eventBySlug?.imageUrl" />
    </div>
</template>

<script lang="ts" setup>
import type IEvent from "../../../interfaces/Event";

const route = useRoute();

const { slug } = route.params;

const query = gql`
    query EventBySlugQuery($slug: String!) {
        eventBySlug(slug: $slug) {
            imageUrl
            slug
            title
        }
    }
`;
const variables = { slug };
const { data } = await useAsyncQuery<{ eventBySlug: IEvent | null }>(
    query,
    variables,
);
</script>
