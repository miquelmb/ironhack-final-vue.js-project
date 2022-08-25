<template>

  <div>

    <h1 class="font-dosis text-8xl text-center my-8 font-medium text-slate-800">TaskApp</h1>
    <p v-if="!errorMsg" class="font-dosis m-auto mb-7 text-2xl text-center text-slate-700 my-4 w-4/5">The place where your procrastinating ends..</p>
  
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey text-center shadow-lg text-red-800 bg-zinc-300 bg-opacity-70">
      <p>{{ errorMsg}}</p>
    </div>

    <form @submit.prevent="signIn" class="p-8 flex flex-col rounded-md shadow-lg bg-zinc-300 bg-opacity-70">

      <div class="flex flex-col mb-2">
        <label for="email" class="font-dosis font-medium mb-1 text-sm text-slate-800">Email</label>
        <input type="email" class="font-dosis p-2 text-gray-500 focus:outline-slate-200 focus:outline-none" required id="email" v-model="email" placeholder="Enter your user email">
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="font-dosis font-medium mb-1 text-sm text-slate-800">Password</label>
        <input type="password" class="font-dosis p-2 text-gray-500 focus:outline-slate-200 focus:outline-none" required id="password" v-model="password" placeholder="Enter your password">
      </div>

      <button type="submit" class="font-dosis mt-6 py-2 px-6 rounded-sm self-center text-center text-slate-200 text-sm text-slate-100 bg-gray-700
      duration-200 border-solid border-lg border-transparent hover:border-white hover:bg-gray-200 hover:text-gray-700">SIGN IN</button>

    </form>

  </div>

  <PersonalRouter class="font-dosis text-lg my-8 py-3 px-6 rounded-full self-center 
  text-center text-slate-200 bg-gray-800 duration-200 border-solid border-lg
  border-transparent hover:border-white hover:bg-gray-200 hover:text-gray-700" :route="route" :buttonText="buttonText" />

</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Create an account";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//FALTA IMPLEMENTAR Show hide password variables
// const passwordFieldType = computed(() =>
//   hidePassword.value ? "password" : "text"
// );
// const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 4000);
  }
};

</script>