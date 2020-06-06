export default class Cell {
  constructor(row, column, number) {
    this.position = {
      row: row,
      column: column
    };
    this.writable = false;
    this.number = number;
    this.grid = [];
  }

  setWritable(writable) {
    this.writable = writable;
  }

  setNumber(number) {
    this.number = number;
  }
}
