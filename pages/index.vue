<template>
    <div>
        <div
            class="h-[560px] overflow-hidden relative flex items-start justify-start"
        >
            <img
                class="h-full object-cover w-full absolute"
                src="https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div class="gap-8 flex flex-col relative px-12 py-24">
                <p class="text-white text-6xl font-bold">
                    Find Events You Will Love
                </p>
                <p class="text-lg pr-16 text-white">
                    Eventee is an online events management platform allowing
                    users to find and host amazing events and experiences.
                </p>
                <div class="flex items-center gap-6">
                    <button class="bg-green-300 mt-12 px-6 py-3 rounded-md">
                        Find Events
                    </button>
                    <button class="bg-green-300 mt-12 px-6 py-3 rounded-md">
                        Create An Event
                    </button>
                </div>
            </div>
        </div>
        <div>
            <ul
                v-if="data"
                class="gap-12 grid grid-cols-4 items-center min-w-full px-12 py-12"
            >
                <EventCard
                    v-for="event in data.events"
                    :key="event.title"
                    v-bind="event"
                />
            </ul>
        </div>
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
