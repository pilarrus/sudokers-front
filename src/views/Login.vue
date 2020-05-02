<template>
    <form id="login" @submit="checkForm" action="#" method="post">
        <div class="login-header">
            <p>Login</p>
            <span class="separator">|</span>
            <router-link to="/register">Register</router-link>
        </div>

        <label for="email" class="login-error" v-if="errors.email">{{ errors.email }}</label>
        <input id="email" v-model="email" type="email" name="email" placeholder="Email">

        <label for="password" class="login-error" v-if="errors.password">{{ errors.password }}</label>
        <input id="password" v-model="password" type="password" name="password" placeholder="Contraseña">
        <input type="submit" value="Enviar">
    </form>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        errors: {},
        email: null,
        password: null
      }
    },
    methods: {
      checkForm: function (e) {
        if (this.email && this.password) {
          return true;
        }
        this.errors = {};

        if (!this.email) {
          this.errors['email'] = 'El email es obligatorio';
        }
        if (!this.password) {
          this.errors['password'] = 'La contraseña es obligatoria';
        }
        e.preventDefault();
      }
    }
  }
</script>

<style scoped>
    #login {
        background: #42b983;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }

    #email {
        width: 50%;
        max-width: 250px;
    }

    #password {
        width: 50%;
        max-width: 250px
    }

    .login-header {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        width: 50%;
        max-width: 250px;
    }

    .login-error {
        color: red;
    }

    .separator {
        margin: 5px;
    }
</style>