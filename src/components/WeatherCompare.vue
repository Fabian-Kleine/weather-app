<template>
    <section class="mx-4 mt-2 glass d-flex flex-wrap flex-lg-nowrap" v-if="showSearchResults">
        <div class="flex-1 w-100 w-lg-50">
            <h5>
                <i class="bi bi-geo-alt-fill"></i>
                {{ weatherData[0].location }}
            </h5>
            <div class="d-flex align-items-center gap-5 mt-4">
                <h1 class="temperature">{{ Math.round((weatherData[0].temperatureMax +
                    weatherData[0].temperatureMin) / 2)
                    }}°</h1>
                <div class="d-flex flex-column">
                    <h5 class="milky-glass pill">
                        <i class="bi bi-thermometer-high"></i>
                        <span class="text-shadow">{{ weatherData[0].temperatureMax }}°</span>
                    </h5>
                    <h5 class="milky-glass pill">
                        <i class="bi bi-thermometer-low"></i>
                        <span class="text-shadow">{{ weatherData[0].temperatureMin }}°</span>
                    </h5>
                </div>
            </div>
            <h2 class="d-flex align-items-center gap-4">
                <img :src="weatherData[0].weatherIcon.icon" class="weather-icon" alt="Stark bewölkt"
                    v-if="weatherData[0].weatherIcon.isSVGIcon" />
                <i :style="{ color: weatherData[0].weatherIcon.iconColor }"
                    :class="['bi weather-icon', weatherData[0].weatherIcon.icon]" v-else></i>
                {{ weatherData[0].weatherIcon.weatherDescription }}
            </h2>
        </div>
        <div class="flex-1 w-100 w-lg-50">
            <BForm class="search-form milky-glass" v-if="!Object.keys(comparedLocation).length || isEditingLocation"
                @submit.prevent="handleGetComparedLocation(searchValue)"  >
                <BFormInput v-model="searchValue" class="me-2 text-shadow"
                    placeholder="Postleitzahl oder Ort eingeben" />
                <BButton type="submit" variant="ghost" aria-label="Search">
                    <i class="bi bi-search"></i>
                </BButton>
            </BForm>
            <h5 v-if="Object.keys(comparedLocation).length && !isLoading && !isEditingLocation">
                <i class="bi bi-geo-alt-fill"></i>
                {{ comparedLocation.location }}
                <i class="bi bi-pencil-fill cursor-pointer ms-1" @click="isEditingLocation = true; searchValue = comparedLocation.location"></i>    
            </h5>
            <LoadingBlock :is-loading="isLoading" />
            <template v-if="Object.keys(comparedLocation).length && !isLoading">
                <div class="d-flex align-items-center gap-5 mt-4">
                    <h1 class="temperature">{{ Math.round((comparedLocation.temperatureMax +
                        comparedLocation.temperatureMin) / 2)
                        }}°</h1>
                    <div class="d-flex flex-column">
                        <h5 class="milky-glass pill">
                            <i class="bi bi-thermometer-high"></i>
                            <span class="text-shadow">{{ comparedLocation.temperatureMax }}°</span>
                        </h5>
                        <h5 class="milky-glass pill">
                            <i class="bi bi-thermometer-low"></i>
                            <span class="text-shadow">{{ comparedLocation.temperatureMin }}°</span>
                        </h5>
                    </div>
                </div>
                <h2 class="d-flex align-items-center gap-4">
                    <img :src="comparedLocation.weatherIcon.icon" class="weather-icon" alt="Stark bewölkt"
                        v-if="comparedLocation.weatherIcon.isSVGIcon" />
                    <i :style="{ color: comparedLocation.weatherIcon.iconColor }"
                        :class="['bi weather-icon', comparedLocation.weatherIcon.icon]" v-else></i>
                    {{ comparedLocation.weatherIcon.weatherDescription }}
                </h2>
            </template>
        </div>
    </section>
</template>

<script setup>
import LoadingBlock from './LoadingBlock.vue';
import getWeatherData from '../composables/getWeatherData';
import { ref } from 'vue';

const props = defineProps(['weatherData', 'showSearchResults']);
const comparedLocation = ref({});
const searchValue = ref('');
const isLoading = ref(false);
const isEditingLocation = ref(false);

const handleGetComparedLocation = async () => {
    isLoading.value = true;
    const { formattedWeatherData, error, load } = getWeatherData(searchValue.value);
    await load(props.weatherData[0].date, false);
    if (error.value) {
        console.error(error.value);
        isLoading.value = false;
        return;
    }
    comparedLocation.value = formattedWeatherData.value[0];
    isLoading.value = false;
    isEditingLocation.value = false;
}
</script>

<style>
section {
    color: #fff;
    padding: 20px;
    gap: 20px;
}

section>div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.search-form {
    border: 1px solid #fff;
    border-radius: 25px;
    width: 100%;
    justify-content: center;
    display: flex;
}

.search-form input {
    background-color: transparent !important;
    color: #fff !important;
    border: none;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    font-size: 1.3rem;
}

.search-form input::placeholder {
    color: #fff;
}

.search-form button {
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 1.3rem;
}

.temperature {
    font-size: 6rem;
    font-weight: 700;
}

.pill {
    border-radius: 25px;
    padding: 0.25rem 0.5rem;
}

img.weather-icon {
    width: 50px;
    height: 50px;
}

i.weather-icon {
    font-size: 4rem;
}

.cursor-pointer {
    cursor: pointer;
}
</style>