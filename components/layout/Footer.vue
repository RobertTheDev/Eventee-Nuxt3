<template>
    <footer class="bg-slate-100 flex items-center min-w-full px-8 py-6">
        <nav class="flex gap-16 items-center justify-center min-w-full">
            <NuxtLink
                v-for="footerLink in footerLinks"
                :key="footerLink.path"
                class="text-sm hover:underline"
                :to="footerLink.path"
            >
                {{ footerLink.name }}
            </NuxtLink>
            <p class="text-sm">©{{ new Date().getFullYear() }} Eventee</p>
        </nav>
    </footer>
</template>

<script lang="ts" setup>
const footerLinks = [
    { name: "Accessibility Statement", path: "/info/accessibility-statement" },
    { name: "Privacy Policy", path: "/info/privacy-policy" },
    {
        name: "Terms and Conditions",
        path: "/info/terms-and-conditions",
    },
];
</script>
