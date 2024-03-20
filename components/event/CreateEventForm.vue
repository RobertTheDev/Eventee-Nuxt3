<template>
    <form class="flex flex-col" @submit.prevent="mutate()">
        <p>Create Form</p>
        <!-- Image Input -->
        <div>
            <label>Event <img src="" alt="" sizes="" srcset="" />Image</label>
            <p>Add an image that showcases your event</p>
            <input
                v-model="event.imageUrl"
                class="border-2 border-lightgray h-10 px-2 w-96"
                required
                type="url"
            />
        </div>
        <!-- Title Input -->
        <div>
            <label>Event title</label>
            <p>
                Be clear and descriptive with a title that tells people what
                your event is about.
            </p>
            <input
                v-model="event.title"
                class="border-2 border-lightgray h-10 px-2 w-96"
                required
                type="text"
            />
        </div>
        <!-- Description Input -->
        <div>
            <label>Event summary</label>
            <p>
                Grab people's attention with a short description about your
                event. Attendees will see this at the top of your event page.
                (140 characters max)
            </p>
            <input
                v-model="event.description"
                class="border-2 border-lightgray h-10 px-2 w-96"
                required
                type="text"
            />
        </div>
        <!-- Category Input -->
        <div>
            <select v-model="event.category">
                <option value="hello">Hello</option>
                <option value="world">World</option>
            </select>
        </div>
        <!-- Date And Time Input -->
        <div>
            <div>
                <button type="button">Single</button>
                <button type="button">Recurring</button>
            </div>

            <div>
                <input
                    v-model="event.start.date"
                    class="border-2 border-lightgray h-10 px-2 w-96"
                    required
                    type="date"
                />
                <select v-model="event.start.time">
                    <option
                        v-for="generateTime in generateTimes()"
                        :key="generateTime"
                        :value="generateTime"
                    >
                        {{ generateTime }}
                    </option>
                </select>

                <input
                    v-model="event.end.date"
                    class="border-2 border-lightgray h-10 px-2 w-96"
                    required
                    type="date"
                />
                <select v-model="event.end.time">
                    <option
                        v-for="generateTime in generateTimes()"
                        :key="generateTime"
                        :value="generateTime"
                    >
                        {{ generateTime }}
                    </option>
                </select>
            </div>
        </div>
        <!-- Slug Input -->
        <div>
            <input
                v-model="event.slug"
                class="border-2 border-lightgray h-10 px-2 w-96"
                required
            />
        </div>
        <!-- Location Input -->
        <div>
            <input
                v-model="event.venue.address"
                class="border-2 border-lightgray h-10 px-2 w-96"
                required
            />
        </div>

        <p v-if="error">{{ JSON.stringify(error) }}</p>
        <p v-if="loading">{{ JSON.stringify(loading) }}</p>

        <!-- Submit Button -->
        <div>
            <button type="submit">Loading...</button>
            <button type="submit">Create Event</button>
        </div>
    </form>
</template>

<script setup lang="ts">
const event = ref({
    title: "",
    imageUrl: "",
    category: "",
    description: "",
    slug: "",
    type: "single",
    venue: {
        address: "",
    },
    end: {
        date: "",
        time: "",
    },
    start: {
        date: "",
        time: "",
    },
});

// Generate a list of times at 30-minute intervals
function generateTimes(): string[] {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            times.push(
                `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
            );
        }
    }
    return times;
}

const query = gql`
    mutation createEvent($input: EventInput!) {
        createEvent(input: $input) {
            _id
            category
            description
            end {
                date
                time
            }
            imageUrl
            slug
            start {
                date
                time
            }
            title
            type
            venue {
                address
            }
        }
    }
`;

const { mutate, error, loading } = useMutation(query, {
    variables: { input: event.value },
});
</script>
