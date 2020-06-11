<template>
    <div class="sudoku-puzzle">
        <div class="sudoku-puzzle-container">
            <div class="sudoku-puzzle-container-cell pointer"
                 v-for="cell in cells"
                 :class="[!cell.writable ? 'sudoku-puzzle-container-cell-unwritable ' : ''] +
                 [cell.number === selectedNumber || cell.grid.includes(selectedNumber) ? 'sudoku-puzzle-container-cell-highlight ' : ''] +
                 [Object.keys(activeCell).length !== 0 && cell.position.row === activeCell.position.row && cell.position.column === activeCell.position.column && activeCell.isInvalid ? 'sudoku-puzzle-container-cell-invalid ' : ''] +
                 'sudoku-puzzle-container-cell-row' + cell.position.row + ' ' +
                 'sudoku-puzzle-container-cell-col' + cell.position.column"
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
  import {setDate, setTimer} from "../utils/helpers";

  const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

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

          if (this.$store.state.sudoku.isValidNumber(this.selectedNumber, cell.position.row, cell.position.column)) {
            cell.number = this.selectedNumber;
            cell.grid = [];
            this.$store.state.sudoku.deleteHelpNumbers(this.selectedNumber, cell.position.row, cell.position.column);
            this.updateSudoku();
            this.checkIsOver();
          } else {
            this.activeCell.isInvalid = true;
          }
        });
      },
      deleteAction: function (activeCell) {
        this.cells.forEach(cell => {
          if (cell.position.row !== activeCell.position.row || cell.position.column !== activeCell.position.column) return;
          cell.number = 0;
          cell.grid = [];
          this.updateSudoku();
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
          this.updateSudoku();
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
      },
      checkIsOver: function () {
        const isOver = this.$store.state.sudoku.isOver();
        if (isOver) {
          this.$store.commit("setIsOver", isOver);
          // Se hace una petición a la api para que borre el sudoku de la bbdd
          // Se establece el resultado del sudoku para que se muestre en ranking
          this.setCurrentResult();
        }
      },
      setCurrentResult: function () {
        const level = this.$store.state.level.text;
        const date = setDate(this.$store.state.sudoku.updatedAt);
        const timer = setTimer(this.$store.state.sudoku.seconds_accumulated);
        const currentResult = {level: level, date: date, timer: timer};
        this.$store.commit("setResult", currentResult);
        // Guardar en la bbdd el resultado
      },
      updateSudoku: async function () {
        try {
          const response = await this.axios({
            method: 'patch',
            url: SERVER_ROUTE + '/sudokus/' + this.$store.state.sudoku.id,
            data: {
              "cells": this.$store.state.sudoku.cells
            },
            headers: {'Content-Type': 'application/json', 'token': this.$store.state.user.token}
          });

          if (response.status !== 200) {
            console.log('Es posible que no se estén guardando los movimientos');
          }
          console.log('Se han guardado los cambios');

        } catch (e) {
          console.log('Error: Es posible que no se estén guardando los movimientos');
        }
      }
    },
    updated() {
      if (Object.keys(this.activeCell).length !== 0) {
        this.activeCell.isInvalid = false;
      }
    }
  }
</script>

<style scoped>

</style>