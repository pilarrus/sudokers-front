<template>
    <div class="sudoku">
        <div class="sudoku-top">
            <span class="sudoku-top-level">Nivel</span>
            <span class="sudoku-top-time">Time</span>
        </div>

        <div class="sudoku-puzzle">
            Sudoku
        </div>
        <div class="sudoku-bar-numbers">
            <button v-for="n in 9" :key="n" v-on:click="setSelectedNumber(n)">{{n}}</button>
        </div>
        <div class="sudoku-bar-actions">Actions</div>
    </div>
</template>

<script>
  export default {
    name: "Sudoku",
    data() {
      return {
        selectedNumber: 0
      }
    },
    methods: {
      setSelectedNumber: function (number) {
        this.selectedNumber = number;
        console.log("selectedNumber: ", this.selectedNumber);
      }
    }
  }
</script>

<style scoped>

</style>