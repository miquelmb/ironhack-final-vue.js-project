<template>

  <div>

    <h1 class="font-dosis text-7xl text-center my-8 font-medium text-slate-800">TaskApp</h1>
    <p v-if="!errorMsg" class="font-dosis m-auto mb-7 text-xl text-center text-slate-700 my-4 w-4/5">The place where your procrastinating ends...</p>
  
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey text-center shadow-lg text-red-800 bg-zinc-300 bg-opacity-70">
      <p>{{ errorMsg}}</p>
    </div>
    
    <form class="p-8 flex flex-col rounded-md shadow-lg bg-zinc-300 bg-opacity-70" @submit.prevent="signUp">
    
      <div class="flex flex-col mb-2">
        <label for="email" class="font-dosis font-medium mb-1 text-sm text-slate-800">Email</label>
        <input type="email" class="font-dosis p-2 text-gray-500 focus:outline-slate-200 focus:outline-none" required id="email" v-model="email" placeholder="Enter your email">
      </div>
  
      <div class="flex flex-col mb-2">
        <label for="password" class="font-dosis font-medium mb-1 text-sm text-slate-800">Password</label>
        <input type="password" class="font-dosis p-2 text-gray-500 focus:outline-slate-200 focus:outline-none" required id="password" v-model="password" placeholder="Enter your password">
      </div>
  
      <div class="flex flex-col mb-2">
        <label for="confirmPassword" class="font-dosis font-medium mb-1 text-sm text-slate-800">Confirm your password</label>
        <input type="password" class="font-dosis p-2 text-gray-500 focus:outline-slate-200 focus:outline-none" required id="confirmPassword" v-model="confirmPassword" placeholder="Repeat your password">
      </div>
  
      <button type="submit" class="font-dosis mt-6 py-2 px-6 rounded-sm self-center text-center text-slate-200 text-sm text-slate-100 bg-gray-700
      duration-200 border-solid border-lg border-transparent hover:border-white hover:bg-gray-200 hover:text-gray-700">REGISTER</button>
  
    </form>


  </div>


  <PersonalRouter class="font-dosis text-lg my-8 py-3 px-6 rounded-lg self-center 
  text-center text-slate-200 bg-gray-800 duration-200 border-solid border-lg
  border-transparent hover:border-white hover:bg-gray-200 hover:text-gray-700" :route="route" :buttonText="buttonText" />

  
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from '../supabase'

// Route Variables
const route = "/auth/login";
const buttonText = "Already registered?";

// Input Fields
const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// FALTA IMPLEMENTAR Show hide password variable

// Show hide confrimPassword variable

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error. Función de Traversy Media sin usar Store
// const signUp = async () => {
//   if (password.value === confirmPassword.value) {
//     try {
//       const { error } = await supabase.auth.signUp({
//         email: email.value,
//         password: password.value,
//       });
//       if (error) throw error;
//       redirect.push({ path: "login" });
//     }
//     catch(error) {
//       errorMsg.value = error.message;
//       setTimeout(() => {
//         errorMsg.value = null;
//       }, 5000)
//     }
//     return;
//   }
//   errorMsg.value = "Error: Passwords do not match"
//   setTimeout(() => {
//     errorMsg.value = null;
//   }, 5000)
// };

const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value,password.value);
      redirect.push({ path: "login" });
    } catch(error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
    }
    return;
  }
  errorMsg.value = "Error: Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000)
};

</script>