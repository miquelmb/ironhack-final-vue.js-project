import { defineStore } from "pinia";
import { supabase } from "../supabase";

// esta tienda apunta a user dentro de supabase, por eso el primer parametro en lo que se declara ahora. 
export const useUserStore = defineStore("user", {
  // state is where we store data properties. Is just for store reactive data properties. En el video les llama también state
  // properties
  state: () => ({
    user: null,
  }),

  // actions are methods which allows to access the data on the state and modify it 
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      // tenemos que parametrizar nosotros esto.
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
  },
  // getters allows to grab something from the state, grab a data property from the state and modify it in some way, or
  // generate something based on that data property and then return something. Thing of getters as the state management
  // equivalent of computed properties in that the result of a getter is cached and only updated when its dependencies
  // change, in other words, when the state properties which are being used by that getter are changed. We are going to
  // move our odd or even property to this getter.
  // They are the state management equivalent to computed properties. They allow us to get a data property from our state 
  // and do things with it, generate something, etc. And return a value to be used by any of our components.
  // getters: {}


  // método persist nos habilita que el usuario mantenga su sesión visible dentro de su local storage 
  persist : {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  },
});
