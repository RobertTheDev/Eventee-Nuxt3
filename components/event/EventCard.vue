<template>
    <div>
        <p>{{ event.title }}</p>
        <img :src="event.imageUrl" />
        <NuxtLink :to="`/events/${event.slug}`">Event</NuxtLink>
        <NuxtLink :to="`/events/${event.slug}/update`">Update Event</NuxtLink>
        <NuxtLink :to="`/events/${event.slug}/delete`">Delete Event</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type IEvent from "~/interfaces/Event";

const event = defineProps<IEvent>();
</script>
