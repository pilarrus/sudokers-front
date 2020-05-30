<template>
    <div class="chooseOpen">
        <span>{{msg}}</span>
        <ul v-if="sudokus.length > 0">
            <li v-for="sudoku in sudokus" :key="sudoku._id">
                <button v-on:click="actions(sudoku._id)" class="pointer">
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
        const sudoku = this.sudokus.find(sudoku => sudoku._id === sudokuId);
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