<template>
    <div class="ranking">
        <h3 class="ranking-title">Mejores resultados</h3>
        <Loading v-if="bestResults.length === 0 && Object.keys(currentResult).length === 0" />
        <div class="ranking-container">
            <ul class="ranking-container-results">
                <li v-for="result in bestResults" :key="result.level" class="ranking-container-results-result">
                    <span>{{result.level}}</span>
                    <span>{{result.date}}</span>
                    <span>{{result.timer}}</span>
                </li>
            </ul>
            <div class="horizontalSeparator"/>
            <div class="ranking-container-result">
                <span>{{currentResult.level}}</span>
                <span>{{currentResult.date}}</span>
                <span>{{currentResult.timer}}</span>
            </div>
        </div>
        <button class="modal-button button" @click="$emit('close')">OK</button>
    </div>
</template>

<script>
  import mockFetch from "../utils/mockFetch";
  import {getSecondsAccumulated, getMinutesAccumulated, getDay, getMonth, getYear} from "../utils/helpers";
  import Loading from "./Loading";

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
      // Llamar a la api y que nos devuelva los mejores resultados
      const bestResults = await mockFetch('/ranking');
      this.setBestResults(bestResults);
      this.setCurrentResult();
    },
    methods: {
      setBestResults: function (bestResults) {
        this.bestResults = bestResults;
      },
      setCurrentResult: function () {
        const level = this.$store.state.level.text;
        const date = this.setDate();
        const timer = this.setTimer();
        this.currentResult = {level: level, date: date, timer: timer};
      },
      setDate: function () {
        const date = new Date(this.$store.state.sudoku.updatedAt);
        const day = getDay(date);
        const month = getMonth(date);
        const year = getYear(date);
        return day + "/" + month + "/" + year;
      },
      setTimer: function () {
        const seconds = getSecondsAccumulated(this.$store.state.sudoku.seconds_accumulated);
        const minutes = getMinutesAccumulated(this.$store.state.sudoku.seconds_accumulated);
        return minutes + ':' + seconds;
      }
    }
  }
</script>

<style scoped>

</style>