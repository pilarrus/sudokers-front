<template>
    <form id="register" @submit="checkForm" action="#" method="post">
        <div class="register-header">
            <router-link to="/login">Login</router-link>
            <span class="separator">|</span>
            <p>Register</p>
        </div>

        <label for="username" class="error" v-if="errors.username">{{ errors.username }}</label>
        <input id="username" v-model="text" type="text" name="username" placeholder="Username">

        <label for="email" class="error" v-if="errors.email">{{ errors.email }}</label>
        <input id="email" v-model="email" type="email" name="email" placeholder="Email">

        <label for="password" class="error" v-if="errors.password">{{ errors.password }}</label>
        <input id="password" v-model="password" type="password" name="password" placeholder="Contraseña">
        <input type="submit" value="Enviar">
    </form>
</template>

<script>
  export default {
    name: "Register",
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

        if (!this.username) {
          this.errors['username'] = 'El username es obligatorio';
        }
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

</style>