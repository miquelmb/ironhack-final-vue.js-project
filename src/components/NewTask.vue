<template>

  <div class="max-w-7xl m-auto">

    <!-- section title and cathy phrase -->
    <h2 class="font-dosis text-4xl font-medium m-auto my-9 text-center text-slate-700 w-4/5">Add a new task</h2>
    <p class="font-dosis text-2xl m-auto my-9 text-center text-slate-700 w-4/5">Get focused! You're at {{ month }} {{ dd }}, {{ yyyy }}!</p>
    <!-- Form with inputs to create a new task -->
    <form class="w-2/3 text-center p-8 m-auto mb-10 flex flex-col rounded-md shadow-lg bg-zinc-100 bg-opacity-70 justify-center" @submit.prevent="addTask">
      <input class="font-dosis p-2 m-3 text-gray-500 focus:outline-slate-200 focus:outline-none" v-model="taskTitle" type="text" placeholder="Task Title" />
      <input class="font-dosis p-2 m-3 text-gray-500 focus:outline-slate-200 focus:outline-none" v-model="taskDescription" type="text" placeholder="Description" />
      <button class="font-dosis mt-6 py-2 px-6 rounded-lg self-center text-center text-lg text-slate-100 bg-gray-700
      duration-200 border-solid border-lg border-transparent hover:border-white hover:bg-gray-300 hover:text-gray-700" type="submit">Add Task</button>
    </form>

    <!-- displaying possible errors -->
    <div v-if="errorMsg" class="w-1/2 text-center p-4 m-auto mb-20 flex flex-col text-red-800 rounded-md shadow-lg bg-zinc-100 bg-opacity-70 justify-center">
        <p>{{ errorMsg }}</p>
    </div>

  </div>

</template>

<script setup>
import { ref} from "vue";

// Get today's date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

// Get the full name of the current month
let months = {1:'January', 2:'February', 3:'March', 4:'April', 5:'May', 6:'June',
7:'July', 8:'August', 9:'September', 10:'October', 11:'November', 12:'December'};

let month = months[mm]

// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(['addTask'])

// constant to save a variable that holds the value of the title input field of the new task
const taskTitle = ref("");

// constant to save a variable that holds the value of the description input field of the new task
const taskDescription = ref("");

// const constant to save a variable that holds the value of the error message
const errorMsg = ref(null);

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
const addTask = async () => {
  if (!taskTitle.value && !taskDescription.value) {
    errorMsg.value = "Please insert a title and a description";
      setTimeout(() => {
        errorMsg.value = null;
      }, 4000); 
  } else if (!taskDescription.value) {
    errorMsg.value = "A description must be inserted";
      setTimeout(() => {
        errorMsg.value = null;
      }, 4000);
  } else if (!taskTitle.value) {
    errorMsg.value = "A title must be inserted";
      setTimeout(() => {
        errorMsg.value = null;
      }, 4000);
  } else {
    emit("addTask", taskTitle.value, taskDescription.value);
    // restart values to empty
    taskTitle.value = "";
    taskDescription.value = "";
  }
};

</script>