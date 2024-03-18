<template>
    <button @click="goToEvent(event.slug)">
        <p>{{ event.title }}</p>
        <img :src="event.imageUrl" />
    </button>
</template>

<script setup lang="ts">
import type IEvent from "~/interfaces/Event";

const event = defineProps<IEvent>();

const router = useRouter();

function goToEvent(slug: string) {
    router.push(`/events/${slug}`);
}
</script>
