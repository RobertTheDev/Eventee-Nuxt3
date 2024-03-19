<template>
    <div
        class="min-w-full overflow-hidden rounded-lg shadow-md hover:cursor-pointer"
        @click="() => router.push(`/events/${event.slug}`)"
    >
        <div class="aspect-video min-w-full overflow-hidden">
            <img :src="event.imageUrl" class="min-w-full object-cover" />
        </div>
        <div class="flex flex-col gap-4 p-4">
            <p class="text-xl font-medium">{{ event.title }}</p>
            <NuxtLink :to="`/events/${event.slug}`">Event</NuxtLink>
            <NuxtLink :to="`/events/${event.slug}/update`"
                >Update Event</NuxtLink
            >
            <NuxtLink :to="`/events/${event.slug}/delete`"
                >Delete Event</NuxtLink
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import type IEvent from "~/interfaces/Event";

const event = defineProps<IEvent>();

const router = useRouter();
</script>
