<template>

    <!-- card -->
    <div class="container border-none max-w-lg h-64 gap-8 m-auto mb-8 text-center p-8 flex flex-col rounded-md shadow-lg bg-zinc-100 bg-opacity-70 justify-center relative">

      <!-- buttons -->
      <div class="buttons absolute -top-8 md:-top-24">
        <button v-if="task.is_complete" class="font-dosis py-2 px-4 rounded-md text-md self-center text-center text-slate-50 bg-green-600 opacity-100
         duration-200 hover:border-white hover:bg-green-800 hover:text-gray-100" @click="completedTask">✔ Done</button>
        <button v-if="!task.is_complete" class="font-dosis py-2 px-6 rounded-md text-md self-center text-center text-slate-50 bg-red-600 opacity-100
         duration-200 hover:border-white hover:bg-red-800 hover:text-gray-100" @click="completedTask">Undone</button>
        <button class="font-dosis py-2 px-6 rounded-md text-md m-2 md:m-20 self-center text-center text-slate-50 bg-sky-600 opacity-100
         duration-200 hover:border-white hover:bg-sky-800 hover:text-gray-100" @click="editTask">Edit</button>
        <button class="font-dosis py-2 px-6 rounded-md text-md self-center text-center text-slate-50 bg-stone-500 opacity-100
         duration-200 hover:border-white hover:bg-stone-800 hover:text-gray-100" @click="deleteTask">Delete</button>
      </div>

      <div v-if="enableEdit">
        <form class="relative" @submit.prevent="editThisTask">
          <input class="font-dosis py-2 px-6 text-2xl self-center text-center font-medium mb-2 rounded-md text-gray-900 bg-zinc-100" v-model="taskTitle" type="text" placeholder="Task new title" />
          <input class="font-dosis py-2 px-6 text-xl self-center text-center rounded-md text-gray-900 bg-zinc-100 italic" v-model="taskDescription" type="text" placeholder="Task new description" />
          <button class="font-dosis m-6 py-2 px-6 w-1/2 sm:w-1/3 rounded-md text-lg text-center text-slate-50 bg-green-600 opacity-100
            duration-200 hover:border-white hover:bg-green-800 hover:text-gray-100 absolute left-12 -bottom-28 sm:left-32 sm:-bottom-20" type="submit">Edit Task</button>
        </form>
      </div>

      <!-- inputs -->
      <div v-if="!enableEdit">
        <h2 class="font-dosis py-2 px-6 text-3xl font-medium mb-2 rounded-md text-gray-900">{{ task.title }}</h2>
        <p class="font-dosis py-2 px-6 text-2xl rounded-md text-gray-900 italic">{{ task.description }}</p>
      </div>

    </div>


</template>

<script setup>
import { ref } from 'vue'
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";

let taskTitle = ref("");

let taskDescription = ref("");

const taskBool = ref("");

// const errorMsg = ref("");

// const showError = ref("");

const enableEdit = ref("");

const props = defineProps(['task']);

const completedTask = () => {
  emit("taskDone", props.task);
  taskBool.value = !taskBool.value;
};

const deleteTask = () => {
  emit("deleteTask", props.task.id)
};

const editTask = () => {
  enableEdit.value = !enableEdit.value
  taskTitle.value = props.task.title;
  taskDescription.value = props.task.description;
};

const editThisTask = () => {
  let editedTask = {
        id: props.task.id,
        title: taskTitle.value,
        description: taskDescription.value,
      };
  emit("editTask", editedTask);
  enableEdit.value = !enableEdit.value
};

const emit = defineEmits(["deleteTask", "editTask", "taskDone"]);

</script>

<style>

.container {
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
}

.buttons {
  margin: 5px;
}

button {
  margin: auto 8px;
}

</style>


<!--
**Hints**

1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you. DONE

2. Data properties need here are the following:
  - a boolean to store a false. DONE
  - a string to store an error. DONE
  - a string to store the value of the task that the user can edit. DONE
  - an initial false boolean to hide the inputFIeld used to edit the new task detail
    or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not
   complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save
   the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent
   component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the
   value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else,
   the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the
   same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the
   task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
   from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear
   it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the
   parent component. This function can control the removal of  the task on the homeview.
-->
