<template>

  <footer class="w-screen flex gap-4 justify-center">
      <img class="w-20 self-center" src="https://res.cloudinary.com/mmabof89/image/upload/v1661428924/Ironhack%20Final%20Project/TaskApp_azo7ck.png" alt="Task App Logo">
      <p>© {{ yyyy }} Task App. All rights reserved. Built with ❤️ by Miquel M.</p>
  </footer>

</template>

<script setup>
import { useTaskStore } from '../stores/task';

let today = new Date();
let yyyy = today.getFullYear();

</script>

