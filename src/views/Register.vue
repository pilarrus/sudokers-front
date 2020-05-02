<template>
    <div id="register">
        <div class="register-header">
            <router-link to="/login">Login</router-link>
            <span class="separator">|</span>
            <p>Register</p>
        </div>
        <h1>Hello from Register</h1>
    </div>
</template>

<script>
  export default {
    name: "Register"
  }
</script>

<style scoped>
    #register {
        background: #42b983;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
    .register-header {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        width: 50%;
        max-width: 250px;
    }

    .separator {
        margin: 5px;
    }
</style>