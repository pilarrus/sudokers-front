<template>
    <form id="login" class="form" @submit="actions" action="#" method="post">
        <div class="form-header">
            <p>Login</p>
            <span class="separator">|</span>
            <router-link to="/register" class="pointer">Register</router-link>
        </div>

        <label for="email" class="error" v-if="errorEmail">{{ errorEmail }}</label>
        <input id="email" class="form-input" v-model="email" type="email" name="email" placeholder="Email">

        <label for="password" class="error" v-if="errorPassword">{{ errorPassword }}</label>
        <input id="password" class="form-input" v-model="password" type="password" name="password" placeholder="Contraseña">

        <input class="button button-submit" type="submit" value="Enviar" v-if="!isLoading">
        <Loading v-else />

        <p v-if="notification">{{notification}}</p>
    </form>
</template>

<script>
  import Loading from '../components/Loading';
  import { checkPassword, redirect } from '../utils/helpers';

  const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

  export default {
    name: 'Login',
    components: {
      Loading
    },
    data() {
      return {
        isLoading: false,
        errorEmail: null,
        errorPassword: null,
        notification: null,
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
      checkEmailIsValid: async function () {
        if (!this.email) {
          this.errorEmail = 'El email es obligatorio';
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
      login: async function () {
        try {
          const response = await this.axios({
            method: 'post',
            url: SERVER_ROUTE + '/login',
            data: {
              "email": this.email,
              "password": this.password
            },
            headers: {'Content-Type': 'application/json'}
          });

          if (response.status !== 200) {
            this.notification = 'El usuario no existe o la contraseña no es correcta';
            return undefined;
          }
          return response.data.message;

        } catch (e) {
          this.notification = 'El usuario no existe o la contraseña no es correcta';
          return undefined;
        }
      },
      checkForm: async function () {
        this.errorEmail = null;
        this.errorPassword = null;
        this.notification = null;

        const isEmailValid = await this.checkEmailIsValid(), isPasswordValid = this.checkPasswordIsValid();
        if (!isEmailValid || !isPasswordValid) {
          this.setLoading(false);
          return;
        }

        const user = await this.login();
        if (typeof user === 'undefined') {
          this.setLoading(false);
          return;
        }

        this.setUser(user);
        this.setLoading(false);
        await redirect('/levels');
      },
      actions: function (e) {
        this.cancelEvent(e);
        this.setLoading(true);
        this.checkForm();
      }
    }
  }
</script>

<style lang="scss">

</style>