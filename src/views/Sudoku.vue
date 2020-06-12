<template>
    <div class="sudoku">
        <div class="sudoku-top">
            <span class="sudoku-top-level">{{$store.state.level.text}}</span>
            <Timer v-if="$store.state.isOver.status" :stop="true"/>
            <Timer v-else :stop="false"/>
        </div>

        <SudokuPuzzle :cells="cells" :selected-action="selectedAction" :selected-number="selectedNumber"/>

        <NumberBar @send-selected-number="setSelectedNumber"/>

        <ActionBar @send-selected-action="setSelectedAction"/>

        <Modal v-if="$store.state.isOver.status">
            <Ranking @close="closeModalRanking"/>
        </Modal>
    </div>
</template>

<script>
  import Timer from "../components/Timer";
  import SudokuPuzzle from "../components/SudokuPuzzle";
  import NumberBar from "../components/NumberBar";
  import ActionBar from "../components/ActionBar";
  import Modal from "../components/Modal";
  import Ranking from "../components/Ranking";
  import {redirect} from "../utils/helpers";

  export default {
    name: "Sudoku",
    components: {
      Timer,
      SudokuPuzzle,
      NumberBar,
      ActionBar,
      Modal,
      Ranking
    },
    data() {
      return {
        selectedNumber: 1,
        selectedAction: "paint",
        cells: this.$store.state.sudoku.cells
      }
    },
    methods: {
      setSelectedNumber: function (number) {
        this.selectedNumber = number;
      },
      setSelectedAction: function (action) {
        this.selectedAction = action;
      },
      closeModalRanking: function () {
        redirect('/levels');
      }
    }
  }
</script>

<style scoped>

</style>