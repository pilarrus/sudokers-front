<template>
    <button v-on:click="actions" class="pointer">{{msg}}</button>
</template>

<script>
  import { redirect } from "../utils/helpers";
  import sudokus from "../fake-data/sudokus";

  export default {
    name: "ChooseNew",
    props: {
      msg: String
    },
    methods: {
      setAction: function (action) {
        this.$store.commit('setAction', action);
      },
      setSudoku: function (sudoku) {
        this.$store.commit('setSudoku', sudoku);
      },
      actions: function () {
        const action = { key: "generate", sudokuId: null };
        this.setAction(action);
        // const sudoku = generateSudoku(this.$store.state.level.name);
        const sudoku = sudokus[0];
        this.setSudoku(sudoku);
        redirect("/sudoku");
      }
    }
  }
</script>

<style scoped>

</style>