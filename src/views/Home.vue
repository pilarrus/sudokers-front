<template>
    <div class="home">
        <img id="logo" src="../assets/logo.png" alt="Vue logo">
        <Welcome msg="Bienvenid@ a Sudokers App"/>
        <Loading />
    </div>
</template>

<script>
  import Welcome from "../components/Welcome.vue";
  import Loading from "../components/Loading";
  import { redirect } from "../utils/helpers";

  export default {
    name: "Home",
    components: {
      Welcome,
      Loading
    },
    created() {
      setTimeout(function () {
        redirect("/login");
      }, 3000);
    }
  }
</script>

<style scoped>

</style>