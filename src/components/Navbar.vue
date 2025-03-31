<template>
    <BNavbar :container="false" v-b-color-mode="'dark'" toggleable="lg" class="glass navbar-container">
        <BNavbarBrand href="#" class="d-flex align-items-center mx-auto me-lg-0" @click="emit('searchReset')">
            <img src="/RI-Logo.png" alt="Logo" width="35" height="35" />
            Rhiem Weather
        </BNavbarBrand>
        <div class="d-flex justify-content-center align-items-center gap-2 w-100 mx-auto mt-4 mt-lg-0">
            <BNavForm class="d-flex nav-search milky-glass" @submit.prevent="handleSearchSubmit">
                <BFormInput v-model="searchValue" class="me-2" placeholder="Postleitzahl oder Ort eingeben" />
                <BButton type="submit" variant="ghost" aria-label="Search">
                    <i class="bi bi-search"></i>
                </BButton>
            </BNavForm>
            <button class="milky-glass nav-geo-btn" title="Standort benutzen" @click="emit('searchGeo')">
                <i class="bi bi-geo-alt-fill"></i> 
            </button>
        </div>
        <BNavText class="d-none d-lg-block text-light nav-clock">
            <Clock />
        </BNavText>
    </BNavbar>
</template>

<script setup>
import { ref } from 'vue';
import Clock from './Clock.vue';

const emit = defineEmits(['search', 'searchReset', 'searchGeo']);

const searchValue = ref('');

const handleSearchSubmit = () => {
    const date = new Date(Date.now());
    emit('search', searchValue.value, date);
    searchValue.value = '';
}
</script>

<style>
.navbar-container {
    padding: 10px 20px !important;
    margin: 20px;
}

.nav-search {
    border: 1px solid #fff;
    border-radius: 25px;
    width: 350px;
}

.nav-search form {
    width: 100%;
    justify-content: space-between;
}

.nav-search input {
    background-color: transparent !important;
    color: #fff !important;
    border: none;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.nav-search input::placeholder {
    color: #fff;
}

.nav-search button {
    background-color: transparent;
    border: none;
    color: #fff;
}
.nav-clock {
    color: #fff;
    text-align: end;
    width: 170px;
    font-size: 1.5rem;
    font-weight: 500;
}
.nav-geo-btn {
    border-radius: 50%;
    height: 35px;
    width: 35px;
}
</style>