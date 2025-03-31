<template>
    <div class="search-container" v-if="isLoading">
        <BSpinner variant="light" type="grow" label="Loading..."></BSpinner>
        <p>Lade Wetterdaten...</p>
    </div>
</template>

<script setup>
const props = defineProps(['isLoading']);
</script>

<style scoped>
.search-container {
    padding: 50px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
}

.search-container p {
    margin-top: 20px;
    font-size: 1rem;
}

.search-container .spinner-grow {
    width: 4rem;
    height: 4rem;
}
</style>