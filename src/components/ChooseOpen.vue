<template>
    <div class="chooseOpen">
        <span>{{msg}}</span>
        <ul v-if="sudokus.length > 0">
            <li v-for="sudoku in sudokus" :key="sudoku._id">
                <button v-on:click="actions(sudoku._id)" class="button button-open pointer">
                    <DateTimeFormat :date-time="new Date(sudoku.updatedAt)" />
                </button>
            </li>
        </ul>
        <Loading v-else-if="sudokus.length === 0 && isLoading"/>
        <span v-else>No tienes ningún sudoku empezado del nivel {{$store.state.level.text.toLowerCase()}}</span>
    </div>
</template>

<script>
  import Loading from "./Loading";
  import DateTimeFormat from "./DateTimeFormat";
  import {redirect} from "../utils/helpers";
  import Sudoku from "../lib/Sudoku/Sudoku.js"

  export default {
    name: "ChooseOpen",
    props: {
      msg: String,
      sudokus: Array,
      isLoading: Boolean
    },
    components: {
      Loading,
      DateTimeFormat
    },
    methods: {
      setAction: function (action) {
        this.$store.commit('setAction', action);
      },
      setSudoku: function (sudokuId) {
        const recoveredSudoku = this.sudokus.find(sudoku => sudoku._id === sudokuId);
        const sudoku = new Sudoku(recoveredSudoku.difficulty, recoveredSudoku.cells, recoveredSudoku.seconds_accumulated);
        // Borrar estas 4 líneas de abajo al obtener el sudoku de la api
        sudoku._id = "5e9c3a6f50d80701823e56fd";
        sudoku.user = "5e9b2d18b656c00044b00bda";
        sudoku.createdAt = "2020-04-19T11:47:59.099+00:00";
        sudoku.updatedAt = "2020-04-19T11:47:59.099+00:00";
        this.$store.commit('setSudoku', sudoku);
      },
      actions: function (sudokuId) {
        const action = {key: "open", sudokuId: sudokuId};
        this.setAction(action);
        this.setSudoku(sudokuId);
        redirect("/sudoku");
      }
    }
  }
</script>

<style scoped>

</style>