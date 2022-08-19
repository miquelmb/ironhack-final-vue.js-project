<template>
  <router-link :to="route">{{ buttonText }}</router-link>
</template>

<script setup>
defineProps({
  route: String,
  buttonText: String,
});
</script>

<style></style>

<!-- para routear mediante props y utilizar un componente -->