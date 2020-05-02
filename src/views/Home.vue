<template>
    <div class="home">
        <img src="../assets/logo.png" alt="Vue logo">
        <Welcome msg="Bienvenid@ a Sudokers App"/>
    </div>
</template>

<script>
  import Welcome from "../components/Welcome.vue";
  import router from "../router";

  export default {
    name: "Home",
    components: {
      Welcome
    },
    created() {
      setTimeout(function () {
        console.log('router: ', router);
        router.push({ path: "/login" });
      }, 3000);
    }
  }
</script>

<style scoped>

</style>