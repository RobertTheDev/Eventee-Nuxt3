<template>
    <div class="bg-slate-50 py-16 min-w-full flex flex-col items-center">
        <form
            class="bg-white flex flex-col items-center overflow-hidden rounded-xl px-10 py-10 shadow-lg w-2/6"
        >
            <p class="text-2xl font-bold mb-8">Sign Up with Eventee</p>
            <div class="flex flex-col w-full">
                <label class="font-medium mb-2 text-sm">Email</label>
                <input
                    class="border-2 border-lightgray h-12 mb-6 px-2 rounded-md w-full"
                />
            </div>
            <div class="flex flex-col w-full">
                <label class="font-medium mb-2 text-sm">Password</label>
                <input
                    class="border-2 border-lightgray h-12 mb-8 px-2 rounded-md w-full"
                />
            </div>
            <button
                class="bg-blue-400 font-medium h-12 px-2 rounded-md text-sm w-full"
            >
                Sign Up
            </button>
        </form>
    </div>
</template>
