<template>
    <div class="d-flex w-100 justify-content-center" v-if="errorText">
      <div class="red-glass error-container mx-4">
        {{ errorText }}
      </div>
    </div>
</template>

<script setup>
const props = defineProps(['errorText']);
</script>

<style scoped>
.error-container {
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  font-size: 1.5rem;
  color: #dc143c;
}
</style>