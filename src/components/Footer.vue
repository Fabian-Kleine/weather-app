<template>
  <footer class="glass w-100 text-light text-center py-2">
    <BFormSelect class="mx-auto w-max" v-model="langRef" :options="langOptions" />
    <div class="d-flex justify-content-center align-items-center gap-2">
      <a href="https://fabian-kleine.dev/projects/weather-app" target="_blank" title="Project Page" variant="ghost" class="p-2 text-light my-1">
        <i class="bi bi-globe2 fs-3"></i>
      </a>
      <a href="https://github.com/Fabian-Kleine/weather-app" target="_blank" title="Github Repo" variant="ghost" class="p-2 text-light my-1">
        <i class="bi bi-github fs-3"></i>
      </a>
    </div>
    <p>
      &copy; {{ new Date().getFullYear() }}
      <a class="link-light" href="https://fabian-kleine.dev" target="_blank">Fabian Kleine</a>
      &
      <a class="link-light" href="https://gian-lucca.de" target="_blank">Gian-Lucca</a>
    </p>
  </footer>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['language']);
const emit = defineEmits(['change-language']);

const langRef = ref('de');

const changeLanguage = (lang) => {
  langRef.value = lang;
  emit('change-language', lang);
};

watch(
  () => props.language,
  (newLang) => {
    langRef.value = newLang;
  },
  { immediate: true }
);

watch(
  langRef,
  (newLang) => {
    changeLanguage(newLang);
  },
  { immediate: true }
);

const langOptions = [
  { value: 'de', text: 'Deutsch' },
  { value: 'en', text: 'English' },
];
</script>

<style scoped>
footer {
  border-radius: 0;
  font-weight: bold;
}

.w-max {
  width: max-content;
}
</style>