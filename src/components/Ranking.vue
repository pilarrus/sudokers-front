<template>
    <div class="ranking">
        <h3 class="ranking-title">Mejores resultados</h3>
        <Loading v-if="bestResults.length === 0" />
        <div v-else class="ranking-container">
            <ul class="ranking-container-results">
                <li v-for="result in bestResults" :key="result.level" class="ranking-container-results-result">
                    <span>{{result.level}}</span>
                    <span>{{result.date}}</span>
                    <span>{{result.timer}}</span>
                </li>
            </ul>
            <div v-if="$store.state.isOver.mode === 'manual'" class="horizontalSeparator"/>
            <div v-if="$store.state.isOver.mode === 'manual'" class="ranking-container-result">
                <span>{{currentResult.level}}</span>
                <span>{{currentResult.date}}</span>
                <span>{{currentResult.timer}}</span>
            </div>
        </div>
        <button class="modal-button button" @click="takeActions">OK</button>
    </div>
</template>

<script>
  import Loading from "./Loading";
  import {setDate, setTimer} from "../utils/helpers";

  const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

  export default {
    name: "Ranking",
    components: {
      Loading
    },
    data() {
      return {
        bestResults: [],
        currentResult: {}
      }
    },
    async created() {
      if (this.$store.state.isOver.status && this.$store.state.isOver.mode === 'manual') {
        const currentResult = await this.createCurrentResult();
        this.setCurrentResult(currentResult);
      }
      let bestResults = await this.getBestResults();
      if (bestResults.length === 0) {
        bestResults = await this.initialiseRanking();
      }
      if (!bestResults) {
        console.log('No se han podido recuperar los resultados');
        return;
      }
      this.setBestResults(bestResults);
    },
    methods: {
      setCurrentResult: function (currentResult) {
        this.currentResult = currentResult;
      },
      createCurrentResult: async function () {
        const userId = this.$store.state.user.userId;
        const level = this.$store.state.level.text;
        const date = setDate(this.$store.state.sudoku.updatedAt);
        const timer = setTimer(this.$store.state.sudoku.seconds_accumulated);
        const currentResult = {user: userId, level: level, date: date, timer: timer};
        await this.updateRanking(currentResult);
        return currentResult;
      },
      updateRanking: async function (currentResult) {
        try {
          const response = await this.axios({
            method: 'patch',
            url: SERVER_ROUTE + '/rankings/' + this.$store.state.user.userId,
            data: currentResult,
            headers: {'Content-Type': 'application/json', token: this.$store.state.user.token}
          });

          return response.data.message;

        } catch (e) {
          console.log('Error: No se han devuelto los mejores resultados', e);
          return [];
        }
      },
      setBestResults: function (bestResults) {
        this.bestResults = bestResults;
      },
      resetState: function () {
        this.$store.commit('setLevel', {});
        this.$store.commit('setAction', {});
        this.$store.commit('setSudoku', {});
        this.$store.commit('setIsOver', {status: false, mode: ''});
      },
      takeActions: function () {
        this.$emit('close');
        this.resetState();
      },
      getBestResults: async function () {
        try {
          const response = await this.axios({
            method: 'get',
            url: SERVER_ROUTE + '/rankings/' + this.$store.state.user.userId,
            headers: {'Content-Type': 'application/json', token: this.$store.state.user.token}
          });

          return response.data.message;

        } catch (e) {
          console.log('Error: No se han devuelto los mejores resultados', e);
          return [];
        }
      },
      initialiseRanking: async function () {
        try {
          const response = await this.axios({
            method: 'post',
            url: SERVER_ROUTE + '/rankings/initialise/' + this.$store.state.user.userId,
            headers: {'Content-Type': 'application/json', token: this.$store.state.user.token}
          });

          if (response.status !== 201) {
            console.log('No se ha inicializado el ranking');
            return false;
          }

          console.log('Se ha inicializado el ranking');
          return response.data.message;

        } catch (e) {
          console.log('Error: No se ha inicializado el ranking', e);
          return false;
        }
      }
    }
  }
</script>

<style scoped>

</style>