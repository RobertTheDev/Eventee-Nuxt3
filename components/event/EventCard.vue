<template>
    <div>
        <p>{{ event.title }}</p>
        <img :src="event.imageUrl" />
    </div>
</template>

<script setup lang="ts">
import type IEvent from "~/interfaces/Event";

const event = defineProps<IEvent>();
</script>
