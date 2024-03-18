<template>
    <ul v-if="data">
        <EventCard
            v-for="event in data.events"
            :key="event.title"
            v-bind="event"
        />
    </ul>
</template>

<script lang="ts" setup>
import EventCard from "~/components/event/EventCard.vue";
import type IEvent from "../interfaces/Event";

const query = gql`
    query EventsQuery {
        events {
            imageUrl
            slug
            title
        }
    }
`;
const variables = { limit: 5 };
const { data } = await useAsyncQuery<{ events: IEvent[] }>(query, variables);
</script>
