<template>
    {{ time }}
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";


const time = ref(getCurrentTime());

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", { hour12: false });
}

function updateTime() {
    time.value = getCurrentTime();
}

let timer;
onMounted(() => {
    timer = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
    clearInterval(timer);
});
</script>
