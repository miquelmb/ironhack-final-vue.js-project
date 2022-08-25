<template>

<header class="bg-gradient-to-r from-white via-zinc-100 to-blue-500 w-screen">
  
  <nav class="w-screen border-none py-5 px-4 flex m-0 gap-2 justify-between">

    <i>
      <img class="w-28" src="https://res.cloudinary.com/mmabof89/image/upload/v1661428924/Ironhack%20Final%20Project/TaskApp_azo7ck.png" alt="Task App Logo">
    </i>

    <div class="flex gap-12 items-center" >
      <p class="hidden md:block font-dosis text-lg text-grey">Hello, {{mailWithoutClient[0]}}!</p>
      <button class="font-dosis text-lg py-3 px-8 rounded-lg self-center 
      text-center text-slate-200 bg-gray-800 duration-200 border-lg
      border-transparent hover:border-white hover:bg-gray-200 hover:text-gray-700" @click="signOut">Log out</button>
    </div>
  
  </nav>

</header>

</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router";

//constant to save a variable that will hold the use router method
const redirect = useRouter();

// constant to save a variable that will get the user from store with a computed function imported from vue
const userStore = useUserStore();

// constant that calls user email from the useUserStore
const userFullEmail = useUserStore().user.email

// constant that saves the user email and cleans out the @client from the user
const mailWithoutClient = userFullEmail.split("@")

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const signOut = (() => {
  userStore.logOut();
  redirect.push({ path: "/auth/login" });
});
// hace falta catch error y emitirlo?

</script>