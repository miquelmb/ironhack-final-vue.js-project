<template>
    <div>
    <!-- error handling -->
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- registration -->
    <form @submit.prevent="signIn">
      <h1>Sign In</h1>

      <div>
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email"
          placeholder="Enter your e-mail"
          type="email"
          required
        />
      </div>

      <div>
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          placeholder="Type your password"
          type="password"
          required
        />
      </div>

      <button type="submit">Sign In</button>

    </form>

  </div>
  
  <br>
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
const buttonText = "Not registered? Sign up here";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables. Hacer que se vea apretando la opción. 
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase

const signIn = async () => {
  try {
    const {error} = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    redirect.push({ path: "/" });
  } catch(error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};



// const signIn = async () => {
//   try {
//     // calls the user store and send the users info to backend to logIn
//     await useUserStore().signIn(email.value, password.value);
//     // redirects user to the homeView
//     redirect.push({ path: "/" });
//   } catch (error) {
//     // displays error message
//     errorMsg.value = `Error: ${error.message}`;
//     // hides error message
//     setTimeout(() => {
//       errorMsg.value = null;
//     }, 5000);
//   }
// };
</script>

<style>

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
