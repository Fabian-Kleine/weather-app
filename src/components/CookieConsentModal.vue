<template>
    <BModal
    title="Diese Webseite nutzt Cookies" 
    class="cookie-modal"
    header-class="justify-content-center"
    header-border-variant="transparent"
    content-class="text-center"
    footer-class="justify-content-center"
    ok-title="Akzeptieren" 
    ok-variant="primary" 
    cancel-title="Ablehnen" 
    cancel-variant="outline-primary" 
    v-model="modalShow"
    :no-header-close="true"
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
    @ok="handleOk"
    @cancel="handleCancel"
    centered>
        <p>Wir verwenden Cookies und geben Standortdaten an Nominatim und Meteomatics weiter, 
            um dir präzise Wetterinformationen bereitzustellen. Durch Klicken auf 'Akzeptieren' 
            stimmen sie der Nutzung und Weitergabe dieser Daten zu</p>
    </BModal>
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['showModal']);
const emit = defineEmits(['initialLoad']);
watch(() => props.showModal, () => {
    modalShow.value = props.showModal
})
const modalShow = ref(props.showModal);
let cookieConsent = ref(null);

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

</script>
<style>
    
</style>