<template>
    <div class="sudoku-numbers">
        <div class="sudoku-numbers-container" v-for="n in 9" :key="'number' + n" v-on:click="takeActions(n)">
            <ButtonNumber v-if="buttonActive === n" :number="n" :isActive="true" :counter="$store.state.sudoku.countNumber(n)"/>
            <ButtonNumber v-else :number="n" :isActive="false" :counter="$store.state.sudoku.countNumber(n)"/>
        </div>
    </div>
</template>

<script>
  import ButtonNumber from "./buttons/ButtonNumber";

  export default {
    name: "NumberBar",
    components: {
      ButtonNumber
    },
    data() {
      return {
        buttonActive: 1
      }
    },
    methods: {
      setButtonActive: function (number) {
        this.buttonActive = number;
      },
      takeActions: function (n) {
        this.setButtonActive(n)
        this.$emit('send-selected-number', n);
      }
    }
  }
</script>

<style scoped>

</style>