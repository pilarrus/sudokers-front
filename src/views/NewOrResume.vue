<template>
    <div class="newOrResume">
        <h2>Elige qué quieres hacer</h2>
        <ChooseNew msg="Empezar nuevo sudoku"/>
        <div class="horizontalSeparator"/>
        <ChooseOpen msg="Continuar sudoku guardado:" v-bind:sudokus="sudokus" v-bind:isLoading="isLoading"/>
    </div>
</template>

<script>
  import mockFetch from "../utils/mockFetch";
  import ChooseNew from "../components/ChooseNew";
  import ChooseOpen from "../components/ChooseOpen";

  export default {
    name: "NewOrResume",
    components: {
      ChooseOpen,
      ChooseNew,
    },
    data() {
      return {
        sudokus: [],
        isLoading: true
      }
    },
    async created() {
      this.sudokus = await this.setSudokus();
    },
    methods: {
      loading: function (isLoading) {
        this.isLoading = isLoading;
      },
      setSudokus: async function () {
        const userId = this.$store.state.user._id;
        const level = this.$store.state.level.name;
        const sudokus = await mockFetch("/sudokus");
        const sudokusByUser = sudokus.filter(sudoku => sudoku.user === userId && sudoku.difficulty === level);
        this.loading(false);
        return sudokusByUser;
      }
    }
  }
</script>

<style scoped>

</style>