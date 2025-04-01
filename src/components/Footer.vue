<template>
  <footer class="glass w-100 text-light text-center py-2">
    <BDropdown
      size="lg"
      variant="link"
      toggle-class="text-decoration-none"
      no-caret
      class="mb-2"
    >
      <template #button-content>
        <img src="/de.svg" alt="German flag" width="20" height="20" />
        <span class="ms-2 text-light">Deutsch</span>
      </template>
      <BDropdownItem disabled>Deutsch</BDropdownItem>
      <BDropdownItem>English</BDropdownItem>
    </BDropdown>
    <p>
      &copy; {{ new Date().getFullYear() }}
      <a class="link-light" href="https://fabian-kleine.dev" target="_blank"
        >Fabian Kleine</a
      >
      &
      <a class="link-light" href="https://gian-lucca.de" target="_blank"
        >Gian-Lucca</a
      >
    </p>
  </footer>
</template>

<style scoped>
footer {
  border-radius: 0;
  font-weight: bold;
}
</style>