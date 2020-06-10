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
        <input id="password" class="form-input" v-model="password" type="password" name="password"
               placeholder="Contraseña">

        <input class="button button-submit" type="submit" value="Enviar" v-if="!isLoading">
        <Loading v-else/>

        <p v-if="notification">{{notification}}</p>
    </form>
</template>

<script>
  import Loading from "../components/Loading";
  import {redirect, checkPassword} from "../utils/helpers";

  const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

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
        notification: null,
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
      cancelEvent: function (e) {
        e.preventDefault();
        e.stopPropagation();
      },
      checkUsernameIsValid: async function () {
        if (!this.username || !this.username.trim()) {
          this.errorUsername = 'El username es obligatorio';
          return false;
        }
        const isUsernameAvailable = await this.checkUsernameAvailability();
        if (!isUsernameAvailable) {
          this.errorUsername = 'Introduce otro username';
          return false;
        }
        return true;
      },
      checkEmailIsValid: async function () {
        if (!this.email) {
          this.errorEmail = 'El email es obligatorio';
          return false;
        }
        const isEmailAvailable = await this.checkEmailAvailability();
        if (!isEmailAvailable) {
          this.errorEmail = 'Introduce otro email';
          return false;
        }
        return true;
      },
      checkPasswordIsValid: function () {
        if (!checkPassword(this.password)) {
          this.errorPassword = 'La contraseña es obligatoria y debe tener al menos 4 numeros';
          return false;
        }
        return true;
      },
      checkUsernameAvailability: async function () {
        try {
          const response = await this.axios.get(SERVER_ROUTE + '/users/isAvailable?username=' + this.username);
          return response.data.message;
        } catch (e) {
          this.notification = 'Ha habido un error, vuelva a intentarlo en unos minutos';
          return false;
        }
      },
      checkEmailAvailability: async function () {
        try {
          const response = await this.axios.get(SERVER_ROUTE + '/users/isAvailable?email=' + this.email);
          return response.data.message;
        } catch (e) {
          this.notification = 'Ha habido un error, vuelva a intentarlo en unos minutos';
          return false;
        }
      },
      saveUser: async function () {
        try {
          const response = await this.axios({
            method: 'post',
            url: SERVER_ROUTE + '/users',
            data: {
              "username": this.username,
              "password": this.password,
              "email": this.email
            },
            headers: {'Content-Type': 'application/json'}
          });

          if (!response.data.message) {
            this.notification = 'No se ha podido crear el usuario, vuelva a intentarlo en unos minutos';
            return undefined;
          }

          this.notification = 'Se ha creado el usuario';
          return response.data.message;

        } catch (e) {
          this.notification = 'No se ha podido crear el usuario, vuelva a intentarlo en unos minutos';
          return undefined;
        }
      },
      checkForm: async function () {
        this.errorUsername = null;
        this.errorEmail = null;
        this.errorPassword = null;
        this.notification= null;

        const isUsernameValid = await this.checkUsernameIsValid(), isEmailValid = await this.checkEmailIsValid(),
          isPasswordValid = this.checkPasswordIsValid();

        if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
          this.setLoading(false);
          return;
        }

        const user = await this.saveUser();

        if (typeof user === 'undefined') {
          this.setLoading(false);
          return;
        }

        this.setUser(user);
        this.setLoading(false);

        setTimeout(function () {
          redirect('/levels');
        }, 2000);
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