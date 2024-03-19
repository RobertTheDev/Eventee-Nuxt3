<template>
    <div>
        <ul
            v-if="data"
            class="gap-8 grid grid-cols-4 items-center min-w-full px-8 py-8"
        >
            <EventCard
                v-for="event in data.events"
                :key="event.title"
                v-bind="event"
            />
        </ul>
    </div>
</template>

<script lang="ts" setup>
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
