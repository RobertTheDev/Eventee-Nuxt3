<template>
    <div class="flex flex-col items-center min-h-screen min-w-full">
        <NuxtLoadingIndicator />
        <LayoutHeader />
        <main class="flex flex-1">
            <slot />
        </main>
        <LayoutFooter />
    </div>
</template>
