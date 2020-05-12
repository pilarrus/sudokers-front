<template>
    <button v-on:click="generateSudoku" class="pointer">{{msg}}</button>
</template>

<script>
  import { redirect } from "../utils/helpers";

  export default {
    name: "ChooseNew",
    props: {
      msg: String
    },
    methods: {
      setAction: function (action) {
        this.$store.commit('setAction', action);
      },
      generateSudoku: function () {
        const action = { key: "new", sudokuId: null };
        this.setAction(action);
        redirect("/sudoku");
      }
    }
  }
</script>

<style scoped>

</style>