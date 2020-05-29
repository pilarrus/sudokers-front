<template>
    <form id="register" class="form" @submit="actions" action="#" method="post">
        <div class="form-header">
            <router-link to="/login">Login</router-link>
            <span class="separator">|</span>
            <p>Register</p>
        </div>

        <label for="username" class="error" v-if="errorUsername">{{ errorUsername }}</label>
        <input id="username" class="form-input" v-model="username" type="text" name="username" placeholder="Username">

        <label for="email" class="error" v-if="errorEmail">{{ errorEmail }}</label>
        <input id="email" class="form-input" v-model="email" type="email" name="email" placeholder="Email">

        <label for="password" class="error" v-if="errorPassword">{{ errorPassword }}</label>
        <input id="password" class="form-input" v-model="password" type="password" name="password" placeholder="Contraseña">

        <input class="button button-submit" type="submit" value="Enviar" v-if="!isLoading">
        <Loading v-else />
    </form>
</template>

<script>
  import Loading from "../components/Loading";
  import mockFetch from "../utils/mockFetch";
  import {redirect} from "../utils/helpers";

  export default {
    name: "Register",
    components: {
      Loading
    },
    data() {
      return {
        isLoading: false,
        errorUsername: null,
        errorEmail: null,
        errorPassword: null,
        username: null,
        email: null,
        password: null
      }
    },
    methods: {
      setLoading: function (isLoading) {
        this.isLoading = isLoading;
      },
      setUser: function (user) {
        this.$store.commit('setUser', user);
      },
      cancelEvent: function(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      checkForm: async function () {
        this.errorUsername = null;
        this.errorEmail = null;
        this.errorPassword = null;

        if (!this.username) {
          this.errorUsername = 'El username es obligatorio';
        }
        if (!this.email) {
          this.errorEmail = 'El email es obligatorio';
        }
        if (!this.password) {
          this.errorPassword = 'La contraseña es obligatoria';
        }

        if (this.username && this.email && this.password) {
          const users = await mockFetch("/users");
          let user = users.find(user => user.username === this.username);

          if (user) {
            this.errorUsername = 'Introduce otro username';
            this.setLoading(false);
            return false;
          }

          user = users.find(user => user.email === this.email);

          if (user) {
            this.errorEmail = 'Introduce otro email';
            this.setLoading(false);
            return false;
          }

          // Aqui guardar el usuario en la base de datos
          // La base de datos devuelve el usuario que se le pasa a this.setUser
          this.setUser(user);
          redirect("/levels");
        }

        this.setLoading(false);
      },
      actions: function (e) {
        this.cancelEvent(e);
        this.setLoading(true);
        this.checkForm();
      }
    }
  }
</script>

<style scoped>

</style>