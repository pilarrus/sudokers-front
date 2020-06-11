<template>
    <div class="newOrResume">
        <h2>Elige qué quieres hacer</h2>
        <ChooseNew msg="Empezar nuevo sudoku"/>
        <div class="horizontalSeparator"/>
        <ChooseOpen msg="Continuar sudoku guardado:" :sudokus="sudokus" :isLoading="isLoading"/>
    </div>
</template>

<script>
  import ChooseNew from "../components/ChooseNew";
  import ChooseOpen from "../components/ChooseOpen";

  const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

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
      setLoading: function (isLoading) {
        this.isLoading = isLoading;
      },
      getSudokus: async function (userId, level) {
        try {
          const response = await this.axios({
            method: 'get',
            url: SERVER_ROUTE + '/sudokus/user/' + userId,
            headers: {'Content-Type': 'application/json', 'token': this.$store.state.user.token}
          });

          if (response.status !== 200) {
            return [];
          }
          const sudokus = response.data.data;
          const sudokusByLevel = sudokus.filter(sudoku => sudoku.difficulty === level);
          return sudokusByLevel;

        } catch (e) {
          return [];
        }
      },
      setSudokus: async function () {
        const userId = this.$store.state.user.userId;
        const level = this.$store.state.level.name;
        const sudokus = await this.getSudokus(userId, level);
        this.setLoading(false);
        return sudokus;
      }
    }
  }
</script>

<style scoped>

</style>