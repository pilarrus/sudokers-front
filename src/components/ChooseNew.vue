<template>
    <button v-on:click="actions" class="button button-generate pointer">{{msg}}</button>
</template>

<script>
  import { redirect } from "../utils/helpers";
  import {generateSudoku} from "../lib/Sudoku/Sudoku";

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
        const sudoku = generateSudoku(this.$store.state.level.name);
        // Borrar estas 4 líneas de abajo
        sudoku._id = "5e9c3a6f50d80701823e56fd";
        sudoku.user = "5e9b2d18b656c00044b00bda";
        sudoku.createdAt = "2020-04-19T11:47:59.099+00:00";
        sudoku.updatedAt = "2020-04-19T11:47:59.099+00:00";
        this.setSudoku(sudoku);
        redirect("/sudoku");
      }
    }
  }
</script>

<style scoped>

</style>