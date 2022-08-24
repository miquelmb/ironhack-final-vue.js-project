<template>

  <div>

    <div>Sign In</div>
  
    <div v-if="errorMsg">
      <p>{{ errorMsg}}</p>
    </div>
  
    <form @submit.prevent="signIn">
    
      <div>
        <label for="email">Email</label>
        <input type="email" required id="email" v-model="email" placeholder="Enter your user email">
      </div>
  
      <div>
        <label for="password">Password</label>
        <input type="password" required id="password" v-model="password" placeholder="Enter your password">
      </div>
  
      <button type="submit">Sign In</button>
  
    </form>

  </div>


  <PersonalRouter :route="route" :buttonText="buttonText" />

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
const buttonText = "Test the Sign Up Route";

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
    }, 5000);
  }
};

</script>