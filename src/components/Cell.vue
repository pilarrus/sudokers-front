<template>
    <div v-if="action === 'paint'" class="cell cell-number">{{number}}</div>

    <div v-else-if="action === 'mark'" class="cell cell-grid">
        <span v-for="n in numbers" :key="n" class="cell-grid-item" :class="['cell-grid-item-' + number]">{{number}}</span>
    </div>

    <div v-else-if="action === '' || action === 'delete'" class="cell"></div>
</template>

<script>
  export default {
    name: "Cell",
    props: {
      action: String,
      number: Number,
      position: Object,
      writable: Boolean
    },
    data() {
      return {
        numbers: []
      }
    },
    methods: {
      addNumberToNumbers: function () {
        this.numbers.push(this.number);
      },
      deleteNumberToNumbers: function (index) {
        this.numbers.splice(index,1);
      },
      compare: function (x, y) {
        if (x < y) return -1;
        else if (x > y) return 1;
        return 0;
      },
      sortNumbers: function (compare) {
        this.numbers.sort(compare);
      },
      markAction: function () {
        if (this.numbers.length === 0) {
          this.addNumberToNumbers();
        } else {
          const index = this.numbers.findIndex(element => element === this.number);
          if (index < 0) {
            this.addNumberToNumbers();
          } else {
            this.deleteNumberToNumbers(index);
          }
          this.sortNumbers(this.compare);
        }
      }
    },
    created() {
      if (this.action === 'mark') {
        this.markAction();
      }
    },
    updated() {
      if (this.action === 'mark') {
        this.markAction();
      }
    }
  }
</script>

<style scoped>

</style>