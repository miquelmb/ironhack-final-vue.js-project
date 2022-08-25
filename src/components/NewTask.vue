<template>

  <div>

    <h2 class="font-dosis text-3xl m-auto my-9 text-center text-slate-700 my-4 w-4/5">Add a new task</h2>
    <p class="font-dosis text-xl m-auto my-9 text-center text-slate-700 my-4 w-4/5">Get focused! You're at {{ month }} {{ dd }}, {{ yyyy }}!</p>
    <!-- form -->
    <form class="w-2/3 text-center p-8 m-auto mb-20 flex flex-col rounded-md shadow-lg bg-zinc-100 bg-opacity-70 justify-center" @submit.prevent="addTask">
      <input class="font-dosis p-2 m-3 text-gray-500 focus:outline-slate-200 focus:outline-none" v-model="taskTitle" type="text" placeholder="Task Title" />
      <input class="font-dosis p-2 m-3 text-gray-500 focus:outline-slate-200 focus:outline-none" v-model="taskDescription" type="text" placeholder="Description" />
      <button class="font-dosis mt-6 py-2 px-6 rounded-sm self-center text-center text-slate-200 text-lg text-slate-100 bg-gray-700
      duration-200 border-solid border-lg border-transparent hover:border-white hover:bg-gray-300 hover:text-gray-700" type="submit">Add Task</button>
    </form>

    <div v-if="errorMsg">
        <p>{{ errorMsg }}</p>
    </div>

  </div>

</template>

<script setup>
import { ref} from "vue";
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

// pruebas
// const userID = useUserStore().user.email
// get today's date
let today = new Date();
console.log(today)
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

let month = "";
if (mm === "01") {
  month = 'January'
} else if (mm === "02") {
  month = 'February'
} else if (mm === "03") {
  month = 'March'
} else if (mm === "04") {
  month = 'April'
} else if (mm === "05") {
  month = 'May'
} else if (mm === "06") {
  month = 'June'
} else if (mm === "07") {
  month = 'July'
} else if (mm === "08") {
  month = 'August'
} else if (mm === "09") {
  month = 'September'
} else if (mm === "10") {
  month = 'October'
} else if (mm === "11") {
  month = 'November'
} else if (mm === "12") {
  month = 'December'
} else {
  month = 'Wrong month!'
};

// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(['addTask'])

// constant to save a variable that holds the value of the title input field of the new task
const taskTitle = ref("");

// constant to save a variable that holds the value of the description input field of the new task
const taskDescription = ref("");

// const constant to save a variable that holds the value of the error message
const errorMsg = ref(null);

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
// ERROR HANDLING DEJA LOS "" un rato.. DEBERÍA SER ASYNC?
const addTask = async () => {
  if (!taskTitle.value && !taskDescription.value) {
    errorMsg.value = "Please insert a title and a description";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000); 
  } else if (!taskDescription.value) {
    errorMsg.value = "You must insert a description";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
  } else if (!taskTitle.value) {
    errorMsg.value = "You must insert a title";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
  } else {
    emit("addTask", taskTitle.value, taskDescription.value);
    taskTitle.value = "";
    taskDescription.value = "";
  }
};

</script>