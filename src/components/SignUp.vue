<template>
  <div>
    <!-- error handling -->
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- registration -->
    <form  @submit.prevent="signUp">
      <h1>Sign Up</h1>

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

      <div>
        <label for="confirmPassword">Confirm Pasword</label>
        <input
          v-model="confirmPassword"
          id="confirmPasword"
          placeholder="Type your password again"
          type="password"
          required
        />
      </div>

      <button type="submit">Sign Up</button>

    </form>

  </div>
  
  <br>
  <PersonalRouter :route="route" :buttonText="buttonText" />
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { ref } from "vue";

// Route Variables
const route = "/auth/login";
const buttonText = "Already have an account?";
const redirect = useRouter();

// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

// Error Message
const errorMsg = ref(null);

// Show hide password variable

// Show hide confrimPassword variable

// Sign up function

const signUp = async () => {
  //check is two passwords are the same
  if (password.value === confirmPassword.value) {
    try {
      // deconstruct the response and only grab the error
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      // detect errors that supabase can throw
      if (error) throw error;
      // if no errors, send them to the login webpage
      // route.push({name: "Login"})
      redirect.push({ path: "/auth/login" });
    } catch(error) {
      errorMsg.value = error.message;
      // remove the error after 5 seconds
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000)
    }
    return;
  }
  errorMsg.value = "Error: both passwords don't match"
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000)
};

// Router to push user once SignedUp to Log In

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
</script>

<style></style>
