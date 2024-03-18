<template>
    <div>
        <p>{{ route.params.slug }}</p>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
