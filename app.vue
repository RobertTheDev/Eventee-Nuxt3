<template>
    <ul v-if="data">
        <li v-for="event in data.events" :key="event.title">
            <img :src="event.imageUrl" />
            {{ event.title }}
        </li>
    </ul>
</template>
<script lang="ts" setup>
import type IEvent from "./interfaces/Event";

const query = gql`
    query EventsQuery {
        events {
            imageUrl
            title
        }
    }
`;
const variables = { limit: 5 };
const { data } = await useAsyncQuery<{ events: IEvent[] }>(query, variables);
</script>
