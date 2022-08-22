<template>
  <nav class="navbar">

    <p>Hello user!</p>
    <button @click="signOut">Log out</button>
    
  </nav>

  

</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from "vue-router";

//constant to save a variable that will hold the use router method
const redirect = useRouter();

// constant to save a variable that will get the user from store with a computed function imported from vue
const userStore = useUserStore();

// constant that calls user email from the useUserStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const signOut = (() => {
  userStore.logOut();
  redirect.push({ path: "/auth/login" });
});

</script>

<style>

.navbar {
  display: flex;
  justify-content: space-around;
}

</style>