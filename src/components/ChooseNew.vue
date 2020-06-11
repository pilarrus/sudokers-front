<template>
    <button v-if="!isLoading" v-on:click="actions" class="button button-generate pointer">{{msg}}</button>
    <Loading v-else />
</template>

<script>
  import { redirect } from "../utils/helpers";
  import Sudoku, { generateSudoku } from "../lib/Sudoku/Sudoku";
  import Loading from "./Loading";

  const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

  export default {
    name: "ChooseNew",
    components: { Loading },
    props: {
      msg: String
    },
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      setLoading: function (isLoading) {
        this.isLoading = isLoading;
      },
      setAction: function (action) {
        this.$store.commit('setAction', action);
      },
      setSudoku: function (sudoku) {
        this.$store.commit('setSudoku', sudoku);
      },
      saveSudoku: async function (sudoku) {
        try {
          const response = await this.axios({
            method: 'post',
            url: SERVER_ROUTE + '/sudokus',
            data: sudoku,
            headers: {'Content-Type': 'application/json', 'token': this.$store.state.user.token}
          });

          if (response.status !== 201) {
            return undefined;
          }
          return response.data.data;

        } catch (e) {
          return undefined;
        }
      },
      actions: async function () {
        this.setLoading(true);
        const generatedSudoku = generateSudoku(this.$store.state.level.name);
        const savedSudoku = await this.saveSudoku(generatedSudoku);
        const sudoku = new Sudoku(savedSudoku.difficulty, savedSudoku.cells, savedSudoku.seconds_accumulated, savedSudoku.user, savedSudoku.updatedAt, savedSudoku._id);

        if (typeof sudoku === 'undefined') {
          this.setLoading(false);
          return;
        }
        this.setSudoku(sudoku);
        const action = { key: "generate", sudokuId: sudoku.id };
        this.setAction(action);
        this.setLoading(false);
        await redirect("/sudoku");
      }
    }
  }
</script>

<style scoped>

</style>