import Cell from "./Cell.js";

export default class Sudoku {
  constructor(difficulty, cells = [], seconds_accumulated = 0) {
    this.cells = cells;
    this.difficulty = difficulty;
    this.seconds_accumulated = seconds_accumulated;
  }

  initializeCells() {
    let number = 0,
      row = 0,
      column = 0;

    for (let i = 0; i < 81; i++) {
      row = column === 9 ? row + 1 : row;
      column = column % 9;
      let cell = new Cell(row, column, number);
      this.cells[i] = cell;
      column++;
    }
  }

  resolve(row = 0, column = 0) {
    if (row > 8) return 1;

    let nextRow = column + 1 === 9 ? row + 1 : row;
    let nextColumn = (column + 1) % 9;

    let cell = this.getCell(row, column);

    if (cell.number !== 0) {
      return this.resolve(nextRow, nextColumn);
    } else {
      let possibleNumbers = this.generatePosibleNumbers();
      for (let possibleNumber of possibleNumbers) {
        if (this.isValidNumber(possibleNumber, row, column)) {
          cell.setNumber(possibleNumber);
          if (this.resolve(nextRow, nextColumn)) {
            return 1;
          }
        }
      }
      cell.setNumber(0);
      return 0;
    }
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

  generatePosibleNumbers() {
    let possibleNumbers = [];
    for (let posibleNumber = 1; posibleNumber <= 9; posibleNumber++) {
      possibleNumbers.push(posibleNumber);
    }
    possibleNumbers = this.shuffle(possibleNumbers);
    return possibleNumbers;
  }

  getCell(row, column) {
    let indexCell = row * 9 + column;
    let cell = this.cells[indexCell];
    return cell;
  }

  isValidNumberInRow(number, row) {
    for (let columnn = 0; columnn < 9; columnn++) {
      let cell = this.getCell(row, columnn);
      if (cell.number === number) {
        return false;
      }
    }
    return true;
  }

  isValidNumberInColumn(number, column) {
    for (let row = 0; row < 9; row++) {
      let cell = this.getCell(row, column);
      if (cell.number === number) {
        return false;
      }
    }
    return true;
  }

  isValidNumberInSection(number, row, column) {
    let firstRow = row - (row % 3);
    let firstColumn = column - (column % 3);
    let lastRow = firstRow + 2;
    let lastColumn = firstColumn + 2;

    for (let verifyRow = firstRow; verifyRow <= lastRow; verifyRow++) {
      for (
        let verifyColumn = firstColumn;
        verifyColumn <= lastColumn;
        verifyColumn++
      ) {
        let cell = this.getCell(verifyRow, verifyColumn);
        if (cell.number === number) {
          return false;
        }
      }
    }
    return true;
  }

  isValidNumber(number, row, column) {
    if (
      this.isValidNumberInRow(number, row) &&
      this.isValidNumberInColumn(number, column) &&
      this.isValidNumberInSection(number, row, column)
    ) {
      return true;
    }
    return false;
  }

  paintInConsole() {
    let numbers = "";
    this.cells.forEach(cell => {
      numbers = numbers + cell.number + " ";
      if (cell.position.column === 8) {
        numbers = numbers + "\n";
      }
    });
    console.log(numbers);
  }

  numberCellsDisplayed(difficulty) {
    switch (difficulty) {
      case "easy":
        return 42;
      case "medium":
        return 31;
      case "difficult":
        return 26;
      case "extreme":
        return 20;
    }
  }

  generatePositions() {
    let positions = [];
    for (let i = 0; i < 81; i++) {
      positions.push(i);
    }
    this.shuffle(positions);

    let numberCellsDisplayed = this.numberCellsDisplayed(this.difficulty);
    positions.splice(0, numberCellsDisplayed);
    return positions;
  }

  hideCells() {
    let positions = this.generatePositions();

    positions.forEach(position => {
      this.cells[position].setNumber(0);
      this.cells[position].setWritable(true);
    });
  }

  reset() {
    this.cells.forEach(cell => {
      if (cell.writable) {
        cell.number = 0;
        cell.grid = [];
      }
    });
  }
}

const generateSudoku = difficulty => {
  let sudoku = new Sudoku(difficulty);
  sudoku.initializeCells();
  sudoku.resolve();
  sudoku.paintInConsole();
  sudoku.hideCells();
  sudoku.paintInConsole();
  return sudoku;
};

export { generateSudoku };
