<template>
    <header
        class="bg-white flex items-center min-w-full px-12 py-5 shadow-md sticky top-0"
    >
        <NuxtLink class="font-bold text-xl" to="/">Eventee</NuxtLink>
        <nav>
            <NuxtLink to="/events">Find events</NuxtLink>
            <NuxtLink to="/events/create">Create event</NuxtLink>
        </nav>
        <div class="h-8 w-8 rounded-full overflow-hidden">
            <img src="/default-profile-image.jpg" />
        </div>
    </header>
</template>
