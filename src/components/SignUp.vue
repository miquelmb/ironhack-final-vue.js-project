<template>
  <div>
    <!-- error handling -->
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- registration -->
    <form>
      <h1>Sign Up</h1>

      <div>
        <label for="email"></label>
        <input
          v-model="email"
          id="email"
          placeholder="Enter your e-mail"
          type="text"
          required
        />
      </div>

      <div>
        <label for="password"></label>
        <input
          v-model="password"
          id="password"
          placeholder="Type your password"
          type="password"
          required
        />
      </div>

      <div>
        <label for="confirmPassword"></label>
        <input
          v-model="confirmPassword"
          id="confirmPasword"
          placeholder="Type your password again"
          type="password"
          required
        />
      </div>

    </form>

  </div>
  
  <br>
  <PersonalRouter :route="route" :buttonText="buttonText" />
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { ref } from "vue";

// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";

// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

// Error Message
const errorMsg = ref(null);

// Show hide password variable

// Show hide confrimPassword variable

// Router to push user once SignedUp to Log In

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
</script>

<style></style>
