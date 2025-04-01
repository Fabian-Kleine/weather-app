<template>
    <main>
        <div class="mx-4 d-flex justify-content-center justify-content-xl-between flex-wrap flex-xl-nowrap"
            v-if="showSearchResults">
            <div>
                <h5>
                    <i class="bi bi-geo-alt-fill"></i>
                    {{ weatherData[dayIndex].location }}
                </h5>
                <h5 class="ms-1">
                    {{ dateString }}
                </h5>
                <div class="d-flex align-items-center gap-5">
                    <h1 class="temperature">{{ Math.round((weatherData[dayIndex].temperatureMax +
                        weatherData[dayIndex].temperatureMin) / 2)
                        }}°</h1>
                    <div class="d-flex flex-column">
                        <h5 class="milky-glass pill">
                            <i class="bi bi-thermometer-high"></i>
                            <span class="text-shadow">{{ weatherData[dayIndex].temperatureMax }}°</span>
                        </h5>
                        <h5 class="milky-glass pill">
                            <i class="bi bi-thermometer-low"></i>
                            <span class="text-shadow">{{ weatherData[dayIndex].temperatureMin }}°</span>
                        </h5>
                    </div>
                </div>
                <h2 class="d-flex align-items-center gap-4">
                    <img :src="weatherData[dayIndex].weatherIcon.icon" class="weather-icon" alt="Stark bewölkt"
                        v-if="weatherData[dayIndex].weatherIcon.isSVGIcon" />
                    <i :style="{ color: weatherData[dayIndex].weatherIcon.iconColor }"
                        :class="['bi weather-icon', weatherData[dayIndex].weatherIcon.icon]" v-else></i>
                    {{ weatherData[dayIndex].weatherIcon.weatherDescription }}
                </h2>
                <div class="d-flex justif-content-center gap-3 flex-wrap mt-4">
                    <div class="data-block milky-glass">
                        <h5>
                            <i class="bi bi-sunrise-fill"></i>
                            {{ languageSet.weatherData.sunrise }}
                        </h5>
                        <span class="text-shadow">{{ weatherData[dayIndex].sunrise }}</span>
                    </div>
                    <div class="data-block milky-glass">
                        <h5>
                            <i class="bi bi-sunset-fill"></i>
                            {{ languageSet.weatherData.sunset }}
                        </h5>
                        <span class="text-shadow">{{ weatherData[dayIndex].sunset }}</span>
                    </div>
                    <div class="data-block milky-glass">
                        <h5>
                            <i class="bi bi-sun-fill"></i>
                            {{ languageSet.weatherData.uvIndex }}
                        </h5>
                        <span class="text-shadow">{{ uvIndexString(weatherData[dayIndex].uvIndex) }}</span>
                    </div>
                    <div class="data-block milky-glass">
                        <h5>
                            <i class="bi bi-wind"></i>
                            {{ languageSet.weatherData.wind }}
                        </h5>
                        <div class="position-relative d-flex align-items-center text-shadow">
                            <i :style="{ transform: `rotate(${weatherData[dayIndex].windDirection}deg)` }"
                                class="bi bi-arrow-up-short position-absolute left-0 fs-1"></i>
                            <div style="width: 45px; height: 1px;"></div>
                            <span>{{ weatherData[dayIndex].windSpeed }} m/s</span>
                        </div>
                    </div>
                    <div class="data-block milky-glass">
                        <h5>
                            <i class="bi bi-wind"></i>
                            {{ languageSet.weatherData.windgusts }}
                        </h5>
                        <span class="text-shadow">{{ weatherData[dayIndex].windGusts }} m/s</span>
                    </div>
                    <div class="data-block milky-glass">
                        <h5>
                            <i class="bi bi-cloud-rain-fill"></i>
                            {{ languageSet.weatherData.precipitation }}
                        </h5>
                        <span class="text-shadow">{{ weatherData[dayIndex].precipitation }} mm</span>
                    </div>
                </div>
            </div>
            <aside class="weather-aside glass">
                <div v-for="(day, index) in weatherData" :key="day.day"
                    :class="['d-flex justify-content-start align-items-center gap-3', dayIndex == index ? 'active' : '']"
                    @click="handleDayChange(index)">
                    <img :src="day.weatherIcon.icon" class="weather-icon" :alt="day.weatherIcon.weatherDescription"
                        v-if="day.weatherIcon.isSVGIcon" />
                    <i :style="{ color: day.weatherIcon.iconColor }" :class="['bi weather-icon', day.weatherIcon.icon]"
                        v-else></i>
                    <h3>{{ index == 0 ? languageSet.today : day.day }}</h3>
                    <h1 class="ms-auto">{{ Math.round((day.temperatureMax + day.temperatureMin) / 2) }}°</h1>
                </div>
            </aside>
        </div>
        <div class="search-container glass d-none d-lg-flex" v-if="!showSearchResults">
            <div class="d-flex justify-content-center align-items-center gap-2 text-shadow">
                <img src="/icons/cloud-sun-fill.svg" alt="Logo" width="50" height="50" />
                <h1>Weather</h1>
            </div>
            <BForm class="search-form milky-glass"
                @submit.prevent="() => emit('search', searchValue, new Date(Date.now()))">
                <BFormInput v-model="searchValue" class="me-2 text-shadow"
                    :placeholder="languageSet.Navbar.search" />
                <BButton type="submit" variant="ghost" aria-label="Search">
                    <i class="bi bi-search"></i>
                </BButton>
            </BForm>
        </div>
    </main>
</template>
<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps(['showSearchResults', 'weatherData', 'languageSet']);
const emit = defineEmits(['search', 'dayChange']);
const searchValue = ref('');
const dayIndex = ref(0);

// Watch for changes in weatherData and reset dayIndex
watch(() => props.weatherData, () => {
    dayIndex.value = 0;
    emit('dayChange', 0);
}, { deep: true });

const dateString = computed(() => {
    const date = new Date(props.weatherData[dayIndex.value].date);
    return date.toLocaleDateString(props.languageSet.locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

const handleDayChange = (index) => {
    dayIndex.value = index;
    emit('dayChange', index);
}

const uvIndexString = (uvIndex) => {
    if (uvIndex < 3) return props.languageSet.weatherData.uvIndexDescriptions.low;
    if (uvIndex < 6) return props.languageSet.weatherData.uvIndexDescriptions.moderate;
    if (uvIndex < 8) return props.languageSet.weatherData.uvIndexDescriptions.high;
    if (uvIndex < 11) return props.languageSet.weatherData.uvIndexDescriptions.veryHigh;
    return props.languageSet.weatherData.uvIndexDescriptions.extreme;
}
</script>

<style scoped>
main {
    margin-top: 100px;
    color: #fff;
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
    font-size: 3rem;
}

.search-container {
    padding: 70px 20px;
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.search-form {
    border: 1px solid #fff;
    border-radius: 25px;
    width: 450px;
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

.weather-aside {
    min-width: 400px;
    border-radius: 15px;
    padding: 5px 10px;
    overflow-x: hidden;
}

.weather-aside h1,
.weather-aside h2,
.weather-aside h3,
.weather-aside h4 {
    margin-bottom: 0 !important;
}

.weather-aside>div {
    padding: 5px 20px;
    margin: 10px 0;
    border-radius: 15px;
    height: 80px;
}

.weather-aside>div:hover,
.weather-aside>div.active:not(:first-child) {
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
}

.weather-aside .weather-icon {
    font-size: 3rem;
}

@media (max-width: 1200px) {
    .weather-aside {
        width: 100%;
        min-width: 0;
        margin-top: 20px;
    }
}

@media (max-width: 992px) {
    .data-block {
        width: 100% !important;
    }
}


.data-block {
    padding: 10px;
    width: 250px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    font-size: 1.75rem;
    font-weight: 600;
    gap: 5px;
}

.data-block h5 {
    margin-bottom: 0;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 5px;
    width: 100%;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
}

.data-block h5 i {
    font-size: 1.2rem;
}
</style>