<template>
    <p>There are {{ data?.events.length || 0 }} events.</p>
</template>
<script lang="ts" setup>
import type IEvent from "./interfaces/Event";

const query = gql`
    query EventsQuery {
        events {
            title
        }
    }
`;
const variables = { limit: 5 };
const { data } = await useAsyncQuery<{ events: IEvent[] }>(query, variables);
</script>
