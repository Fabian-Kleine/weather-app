<template>
  <div class="app-container" :style="{ backgroundPosition: weatherData ? weatherData[dayIndex].weatherIcon.backgroundPosition : 'center' }">
    <CookieConsentModal :showModal="showModal" @initial-load="initialLoad"></CookieConsentModal>
    <div class="container-lg pb-5">
      <Navbar @search="handleSearch" @search-reset="handleSearchReset" @search-geo="handleGeoSearch" />
      <MainSection :weather-data="weatherData" :show-search-results="showSearchResults"
        @search="handleSearch" @day-change="(index) => dayIndex = index" v-show="!isLoading && !errorText" />
      <WeatherChart :weather-data="weatherData" :show-search-results="showSearchResults" v-if="!isLoading && !errorText" />
      <WeatherCompare :weather-data="weatherData" :show-search-results="showSearchResults" v-if="!isLoading && !errorText" />
      <LoadingBlock :is-loading="isLoading" />
      <ErrorBlock :error-text="errorText" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import MainSection from './components/MainSection.vue'
import ErrorBlock from './components/ErrorBlock.vue'
import LoadingBlock from './components/LoadingBlock.vue'
import WeatherChart from './components/WeatherChart.vue'
import WeatherCompare from './components/WeatherCompare.vue'
import getWeatherData from './composables/getWeatherData'
import CookieConsentModal from './components/CookieConsentModal.vue'

const showSearchResults = ref(false)
const searchValue = ref('')
const weatherData = ref(null);
const isLoading = ref(false);
const errorText = ref(null);
const dayIndex = ref(0);
let cookieConsent = ref(null);
let showModal = ref(false);

onMounted(() => {
  cookieConsent.value = localStorage.getItem('cookieConsent');
  if(cookieConsent.value !== 'true') {
    showModal.value = true
  } else {
    const presentDate = new Date(Date.now())
    initialLoad(presentDate)
  }
})

const handleSearch = async (value, date) => {
  isLoading.value = true;
  searchValue.value = value;
  errorText.value = null;
  if (!value) {
    isLoading.value = false;
    return;
  }
  const { formattedWeatherData, error, load } = getWeatherData(value);
  await load(date ? date.toISOString().split('T')[0] : undefined);
  if (error.value) {
    errorText.value = error;
    isLoading.value = false;
    return;
  }
  weatherData.value = formattedWeatherData.value;
  isLoading.value = false;
  showSearchResults.value = true;
}

const initialLoad = async (date) => {
  isLoading.value = true;
  errorText.value = null;
  const { formattedWeatherData, error, load } = getWeatherData('');
  await load(date ? date.toISOString().split('T')[0] : undefined);
  if (error.value) {
    errorText.value = error;
    isLoading.value = false;
    return;
  }
  weatherData.value = formattedWeatherData.value;
  isLoading.value = false;
  showSearchResults.value = true;
}

const handleGeoSearch = async () => {
  delete localStorage.lat;
  delete localStorage.lon;
  const presentDate = new Date(Date.now())
  initialLoad(presentDate)
}

const handleSearchReset = () => {
  showSearchResults.value = false;
  isLoading.value = false;
  errorText.value = null;
}
</script>