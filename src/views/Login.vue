<template>
    <form id="login" @submit="actions" action="#" method="post">
        <div class="login-header">
            <p>Login</p>
            <span class="separator">|</span>
            <router-link to="/register" class="pointer">Register</router-link>
        </div>

        <label for="email" class="error" v-if="errorEmail">{{ errorEmail }}</label>
        <input id="email" v-model="email" type="email" name="email" placeholder="Email">

        <label for="password" class="error" v-if="errorPassword">{{ errorPassword }}</label>
        <input id="password" v-model="password" type="password" name="password" placeholder="Contraseña">

        <input type="submit" value="Enviar" v-if="!isLoading">
        <Loading v-else />
    </form>
</template>

<script>
  import mockFetch from "../utils/mockFetch";
  import Loading from "../components/Loading";
  import { redirect } from "../utils/helpers";

  export default {
    name: "Login",
    components: {
      Loading
    },
    data() {
      return {
        isLoading: false,
        errorEmail: null,
        errorPassword: null,
        email: null,
        password: null
      }
    },
    methods: {
      loading: function (isLoading) {
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
        this.errorEmail = null;
        this.errorPassword = null;

        if (!this.email) {
          this.errorEmail = 'El email es obligatorio';
        }
        if (!this.password) {
          this.errorPassword = 'La contraseña es obligatoria';
        }

        if (this.email && this.password) {
          const users = await mockFetch("/users");
          const user = users.find(user => user.email === this.email);

          if (!user) {
            this.errorEmail = 'Usuario no registrado';
            this.loading(false);
            return false;
          }

          if (user.password !== this.password) {
            this.errorPassword = 'Contraseña incorrecta';
            this.loading(false);
            return false;
          }

          this.setUser(user);
          redirect("/levels");
        }

        this.loading(false);
      },
      actions: function (e) {
        this.cancelEvent(e);
        this.loading(true);
        this.checkForm();
      }
    }
  }
</script>

<style lang="scss">

</style>