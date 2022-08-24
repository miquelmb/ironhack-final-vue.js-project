<template>

  <div>

    <h2>Add a new task</h2>
    <!-- form -->
    <form @submit.prevent="addTask">

      <!-- <h3>Your turn to add a task, {{ userID }}</h3> -->
      
      <input v-model="taskTitle" type="text" placeholder="Task Title" />
      <input v-model="taskDescription" type="text" placeholder="Description" />
      <button type="submit">Add Task</button>

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