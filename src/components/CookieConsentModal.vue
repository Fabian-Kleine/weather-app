<template>
    <BModal
    :title="languageSet.cookieConsent.title" 
    class="cookie-modal"
    header-class="justify-content-center"
    header-border-variant="transparent"
    content-class="text-center"
    footer-class="justify-content-center"
    :ok-title="languageSet.cookieConsent.accept" 
    ok-variant="primary" 
    :cancel-title="languageSet.cookieConsent.decline"
    cancel-variant="outline-primary" 
    v-model="modalShow"
    :no-header-close="true"
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
    @ok="handleOk"
    @cancel="handleCancel"
    centered>
        <p>{{ languageSet.cookieConsent.description }}</p>
        <BFormSelect class="mx-auto mb-2" v-model="lang" :options="langOptions" />
    </BModal>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['showModal', 'languageSet']);
const emit = defineEmits(['initialLoad', 'change-language']);
watch(() => props.showModal, () => {
    modalShow.value = props.showModal
})
const modalShow = ref(props.showModal);
const lang = ref('de');

// Funktion, um die Entscheidung zu speichern und fortzufahren
const handleOk = () => {
  setCookieConsent(true);
  proceedWithLogic();
};

const handleCancel = () => {
  setCookieConsent(false);
  proceedWithLogic();
};

// Funktion, um den Cookie-Zustimmungsstatus zu speichern
const setCookieConsent = async (status) => {
  return new Promise((resolve) => {
    localStorage.setItem('cookieConsent', status);
    resolve(status);
  });
};

// Funktion, die nach der Entscheidung des Benutzers ausgeführt wird
const proceedWithLogic = async () => {
  const presentDate = new Date(Date.now());
  emit('initialLoad', presentDate);
  // Hier kannst du die Logik ausführen, die nach der Entscheidung erforderlich ist
};

watch(() => lang.value, () => {
  emit('change-language', lang.value);
}, { immediate: true });

const langOptions = [
  { value: 'de', text: 'Deutsch' },
  { value: 'en', text: 'English' },
];
</script>
<style>
    
</style>