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
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
    },

    async updateTask(id, title, description) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ 
          title: title, 
          description: description })
        .match({ id: id });
    },
    
    async toggleReminder(task) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ 'is_complete': !task.is_complete })
        .eq('id', task.id);
    },
  },

});
