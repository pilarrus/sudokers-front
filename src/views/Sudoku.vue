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

        <div class="sudoku-actions">
            <div class="sudoku-actions-container" v-for="action in actions" :key="action" v-on:click="setSelectedAction(action)">
                <ButtonAction v-bind:action="action"/>
            </div>
        </div>
    </div>
</template>

<script>
  import ButtonNumber from "../components/buttons/ButtonNumber";
  import ButtonAction from "../components/buttons/ButtonAction";

  export default {
    name: "Sudoku",
    components: {
      ButtonNumber,
      ButtonAction
    },
    data() {
      return {
        selectedNumber: 0,
        actions: ["A","B","C","D","E","F","G","H"],
        selectedAction: ""
      }
    },
    methods: {
      setSelectedNumber: function (number) {
        this.selectedNumber = number;
        console.log("selectedNumber: ", this.selectedNumber);
      },
      setSelectedAction: function (action) {
        this.selectedAction = action;
        console.log("selectedAction: ", this.selectedAction);
      }
    }
  }
</script>

<style scoped>

</style>