<template>

  <footer class="w-screen container border-none flex-col justify-centerpy-5 px-4 gap-7 m-auto">

    <img class="w-32 self-center pb-2 pt-8" src="https://res.cloudinary.com/mmabof89/image/upload/v1661428924/Ironhack%20Final%20Project/TaskApp_azo7ck.png" alt="TaskApp Logo">
    <p class="self-center text-center pb-10">© {{ yyyy }} Task App. All rights reserved. Built with ❤️ by Miquel M.</p>

  </footer>

</template>

<script setup>

// get current year to show it on display
let today = new Date();
let yyyy = today.getFullYear();

</script>

