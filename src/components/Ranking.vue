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
            <div v-if="Object.keys(currentResult).length !== 0" class="horizontalSeparator"/>
            <div v-if="Object.keys(currentResult).length !== 0" class="ranking-container-result">
                <span>{{currentResult.level}}</span>
                <span>{{currentResult.date}}</span>
                <span>{{currentResult.timer}}</span>
            </div>
        </div>
        <button class="modal-button button" @click="takeActions">OK</button>
    </div>
</template>

<script>
  import mockFetch from "../utils/mockFetch";
  import Loading from "./Loading";

  export default {
    name: "Ranking",
    components: {
      Loading
    },
    data() {
      return {
        bestResults: [],
        currentResult: this.$store.state.result
      }
    },
    async created() {
      // Llamar a la api y que nos devuelva los mejores resultados
      const bestResults = await mockFetch('/ranking');
      this.setBestResults(bestResults);
    },
    methods: {
      setBestResults: function (bestResults) {
        this.bestResults = bestResults;
      },
      resetState: function () {
        this.$store.commit('setLevel', {});
        this.$store.commit('setAction', {});
        this.$store.commit('setSudoku', {});
        this.$store.commit('setIsOver', false);
        this.$store.commit('setResult', {});
      },
      takeActions: function () {
        this.$emit('close');
        this.resetState();
      }
    }
  }
</script>

<style scoped>

</style>