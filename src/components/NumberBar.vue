<template>
    <div class="sudoku-numbers">
        <div class="sudoku-numbers-container" v-for="n in 9" :key="'number' + n" v-on:click="takeActions(n)">
            <ButtonNumber v-if="buttonActive === n" :number="n" :isActive="true" />
            <ButtonNumber v-else :number="n" :isActive="false" />
        </div>
    </div>
</template>

<script>
  import ButtonNumber from "./buttons/ButtonNumber";

  export default {
    name: "ButtonBar",
    components: {
      ButtonNumber
    },
    data() {
      return {
        buttonActive: 0
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