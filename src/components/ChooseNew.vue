<template>
    <button v-on:click="generateSudoku" class="pointer">{{msg}}</button>
</template>

<script>
  import router from "../router";

  export default {
    name: "ChooseNew",
    props: {
      msg: String
    },
    methods: {
      setAction: function (action) {
        this.$store.commit('setAction', action);
      },
      redirect: function () {
        router.push({ path: "/sudoku" });
      },
      generateSudoku: function () {
        const action = { key: "new", sudokuId: null };
        this.setAction(action);
        console.log("Generar sudoku de nivel: ", this.$store.state.level.text);
        console.log("store.state.action: ", this.$store.state.action);
        this.redirect();
      }
    }
  }
</script>

<style scoped>

</style>