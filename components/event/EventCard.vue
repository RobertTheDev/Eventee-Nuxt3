<template>
    <div class="min-w-full">
        <div class="aspect-video min-w-full overflow-hidden">
            <img :src="event.imageUrl" class="min-w-full object-cover" />
        </div>
        <p>{{ event.title }}</p>
        <NuxtLink :to="`/events/${event.slug}`">Event</NuxtLink>
        <NuxtLink :to="`/events/${event.slug}/update`">Update Event</NuxtLink>
        <NuxtLink :to="`/events/${event.slug}/delete`">Delete Event</NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type IEvent from "~/interfaces/Event";

const event = defineProps<IEvent>();
</script>
