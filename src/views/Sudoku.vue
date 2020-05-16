<template>
    <div class="sudoku">
        <div class="sudoku-top">
            <span class="sudoku-top-level">Nivel</span>
            <span class="sudoku-top-time">Time</span>
        </div>

        <div class="sudoku-puzzle">
            Sudoku
        </div>

        <div class="sudoku-numbers">
            <div class="sudoku-numbers-container" v-for="n in 9" :key="n" v-on:click="setSelectedNumber(n)">
                <ButtonNumber v-bind:number="n"/>
            </div>
        </div>

        <div class="sudoku-bar-actions">Actions</div>
    </div>
</template>

<script>
  import ButtonNumber from "../components/buttons/ButtonNumber"

  export default {
    name: "Sudoku",
    components: {
      ButtonNumber
    },
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