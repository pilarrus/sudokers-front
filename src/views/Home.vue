<template>
    <div class="home">
        <img src="../assets/logo.png" alt="Vue logo">
        <Welcome msg="Bienvenid@ a Sudokers App"/>
    </div>
</template>

<script>
  import Welcome from "../components/Welcome.vue";

  export default {
    name: "Home",
    components: {
      Welcome
    }
  }
</script>

<style scoped>

</style>