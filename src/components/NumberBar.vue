<template>
    <div class="sudoku-numbers">
        <div class="sudoku-numbers-container" v-for="n in 9" :key="'number' + n" v-on:click="$emit('send-selected-number', n)">
            <ButtonNumber :number="n"/>
        </div>
    </div>
</template>

<script>
  import ButtonNumber from "./buttons/ButtonNumber";

  export default {
    name: "ButtonBar",
    components: {
      ButtonNumber
    }
  }
</script>

<style scoped>

</style>