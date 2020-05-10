<template>
    <div class="home">
        <img id="logo" src="../assets/logo.png" alt="Vue logo">
        <Welcome msg="Bienvenid@ a Sudokers App"/>
        <Loading />
    </div>
</template>

<script>
  import Welcome from "../components/Welcome.vue";
  import router from "../router";
  import Loading from "../components/Loading";

  export default {
    name: "Home",
    components: {
      Welcome,
      Loading
    },
    created() {
      setTimeout(function () {
        router.push({ path: "/login" });
      }, 3000);
    }
  }
</script>

<style scoped>

</style>