<template>
    <div class="chooseOpen">
        <span>{{msg}}</span>
        <ul v-if="sudokus.length > 0">
            <li v-for="sudoku in sudokus" :key="sudoku._id">
                <button v-on:click="openSudoku(sudoku._id)" class="pointer">{{sudoku.updatedAt}}</button>
            </li>
        </ul>
        <Loading v-else-if="sudokus.length === 0 && isLoading"/>
        <span v-else>No tienes ningún sudoku empezado del nivel {{$store.state.level.text.toLowerCase()}}</span>
    </div>
</template>

<script>
  import Loading from "./Loading";
  import router from "../router";

  export default {
    name: "ChooseOpen",
    props: {
      msg: String,
      sudokus: Array,
      isLoading: Boolean
    },
    components: {
      Loading
    },
    methods: {
      setAction: function (action) {
        this.$store.commit('setAction', action);
      },
      redirect: function () {
        router.push({ path: "/sudoku" });
      },
      openSudoku: function (sudokuId) {
        const action = { key: "generate", sudokuId: sudokuId };
        this.setAction(action);
        this.redirect();
      }
    }
  }
</script>

<style scoped>

</style>