<template>
    <div class="sudoku">
        <div class="sudoku-top">
            <span class="sudoku-top-level">{{$store.state.level.text}}</span>
            <Timer/>
        </div>

        <SudokuPuzzle :cells="cells" :selected-action="selectedAction" :selected-number="selectedNumber"/>

        <NumberBar @send-selected-number="setSelectedNumber"/>

        <ActionBar @send-selected-action="setSelectedAction"/>
    </div>
</template>

<script>
  import Timer from "../components/Timer";
  import SudokuPuzzle from "../components/SudokuPuzzle";
  import NumberBar from "../components/NumberBar";
  import ActionBar from "../components/ActionBar";

  export default {
    name: "Sudoku",
    components: {
      Timer,
      SudokuPuzzle,
      NumberBar,
      ActionBar
    },
    data() {
      return {
        selectedNumber: 0,
        selectedAction: "",
        cells: this.$store.state.sudoku.cells
      }
    },
    methods: {
      setSelectedNumber: function (number) {
        this.selectedNumber = number;
      },
      setSelectedAction: function (action) {
        this.selectedAction = action;
      }
    }
  }
</script>

<style scoped>

</style>