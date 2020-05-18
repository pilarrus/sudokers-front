<template>
    <div class="sudoku-puzzle">
        <div class="sudoku-puzzle-container">
            <div class="sudoku-puzzle-container-cell pointer" v-for="cell in cells"
                 :key="'divCell' + cell.position.row + cell.position.column"
                 v-on:click="actionsCell(true, cell)">

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
      compare: function (x, y) {
        if (x < y) return -1;
        else if (x > y) return 1;
        return 0;
      },
      setActiveCell: function (activeCell) {
        this.activeCell = activeCell;
      },
      paintAction: function (activeCell) {
        this.cells.map(cell => {
          if (cell.position.row === activeCell.position.row && cell.position.column === activeCell.position.column) {
            cell.number = this.selectedNumber;
          }
        });
      },
      deleteAction: function (activeCell) {
        this.cells.map(cell => {
          if (cell.position.row === activeCell.position.row && cell.position.column === activeCell.position.column) {
            cell.number = 0;
            cell.grid = []
          }
        });
      },
      markAction: function (activeCell) {
        this.cells.map(cell => {
          if (cell.position.row === activeCell.position.row && cell.position.column === activeCell.position.column) {
            if (cell.grid.length === 0) {
              cell.grid.push(this.selectedNumber);
            } else {
              const index = cell.grid.findIndex(element => element === this.selectedNumber);
              if (index < 0) {
                cell.grid.push(this.selectedNumber);
              } else {
                cell.grid.splice(index, 1);
              }
              cell.grid.sort(this.compare);
            }
          }
        });
      },
      actionsCell: function (isOnClickCell, activeCell) {
        this.setActiveCell(activeCell);

        if (this.selectedNumber === 0) return;

        if (!activeCell.writable) return;

        if (this.selectedAction === 'paint') {
          this.paintAction(activeCell);
        } else if (this.selectedAction === 'delete') {
          this.deleteAction(activeCell);
        } else if (this.selectedAction === 'mark') {
          this.markAction(activeCell);
        }
      }
    }
  }
</script>

<style scoped>

</style>