<template>
  <div class>Sign Up</div>

  <div v-if="errorMsg">
    <p>{{ errorMsg}}</p>
  </div>

  <form @submit.prevent="signUp">
  
    <div>
      <label for="email">Email</label>
      <input type="email" required id="email" v-model="email" placeholder="Enter your email">
    </div>

    <div>
      <label for="password">Password</label>
      <input type="password" required id="password" v-model="password" placeholder="Enter your password">
    </div>

    <div>
      <label for="confirmPassword">Confirm your password</label>
      <input type="password" required id="confirmPassword" v-model="confirmPassword" placeholder="Repeat your password">
    </div>

    <button type="submit">Register</button>

  </form>

  <PersonalRouter :route="route" :buttonText="buttonText" />
  
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from '../supabase'

// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";

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