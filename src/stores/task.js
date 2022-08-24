import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {

  state: () => ({
    tasks: null,
  }),

  actions: {
    // gets tasks from supabase and fills the tasks variable with them
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    
    // sends a task to the backend. Updates de tasks data from supabase.
    async addTask(title, description) {
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    // deletes a task from supabase. 
    async deleteTask(taskId) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
    },

    
    async toggleReminder(taskId, toggleValue) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase
        .from('tasks')
        .update({ 'is_complete': toggleValue })
        .eq('id', taskId);
    },
  },

});
