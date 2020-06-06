<template>
    <div class="sudoku-puzzle">
        <div class="sudoku-puzzle-container">
            <div class="sudoku-puzzle-container-cell pointer"
                 v-for="cell in cells"
                 :class="[!cell.writable ? 'sudoku-puzzle-container-cell-unwritable' : ''] + ' ' +'sudoku-puzzle-container-cell-row' + cell.position.row + ' ' + 'sudoku-puzzle-container-cell-col' + cell.position.column"
                 :key="'divCell' + cell.position.row + cell.position.column"
                 v-on:click="actionsCell(cell)">

                <Cell v-if="cell.number > 0"
                      action="paint"
                      :number="cell.number"
                      :key="'cell' + cell.position.row + cell.position.column"
                />

                <Cell v-else-if="cell.grid.length > 0 && cell.number === 0"
                      action="mark"
                      :numbers="cell.grid"
                      :key="'cell' + cell.position.row + cell.position.column"
                />

                <Cell v-else
                      action=""
                      :key="'cell' + cell.position.row + cell.position.column"
                />

            </div>
        </div>
    </div>
</template>

<script>
  import Cell from "./Cell";

  export default {
    name: "SudokuPuzzle",
    components: {
      Cell
    },
    props: {
      cells: Array,
      selectedAction: String,
      selectedNumber: Number
    },
    data() {
      return {
        activeCell: {}
      }
    },
    methods: {
      setActiveCell: function (activeCell) {
        this.activeCell = activeCell;
      },
      paintAction: function (activeCell) {
        if (this.selectedNumber === 0) return;

        this.cells.forEach(cell => {
          if (cell.position.row !== activeCell.position.row || cell.position.column !== activeCell.position.column) return;
          console.log('isValidNumber: ', this.$store.state.sudoku.isValidNumber(this.selectedNumber, cell.position.row, cell.position.column));
          if (this.$store.state.sudoku.isValidNumber(this.selectedNumber, cell.position.row, cell.position.column)) {
            cell.number = this.selectedNumber;
          }
        });
      },
      deleteAction: function (activeCell) {
        this.cells.forEach(cell => {
          if (cell.position.row !== activeCell.position.row || cell.position.column !== activeCell.position.column) return;
          cell.number = 0;
          cell.grid = [];
        });
      },
      markAction: function (activeCell) {
        if (this.selectedNumber === 0) return;

        this.cells.forEach(cell => {
          if (cell.position.row !== activeCell.position.row || cell.position.column !== activeCell.position.column) return;

          const index = cell.grid.findIndex(element => element === this.selectedNumber);
          if (index < 0) {
            cell.grid.push(this.selectedNumber);
          } else {
            cell.grid.splice(index, 1);
          }
        });
      },
      actionsCell: function (activeCell) {
        this.setActiveCell(activeCell);

        if (!activeCell.writable) return;

        if (this.selectedAction === 'paint') {
          this.paintAction(activeCell);
        } else if (this.selectedAction === 'delete') {
          this.deleteAction(activeCell);
        } else if (this.selectedAction === 'mark') {
          this.markAction(activeCell);
        }
        console.log('cells: ', this.cells);
        console.log('cells State: ', this.$store.state.sudoku.cells);
      }
    }
  }
</script>

<style scoped>

</style>