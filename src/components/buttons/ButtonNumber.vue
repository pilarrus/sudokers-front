<template>
    <button class="button button-number pointer" v-on:click="counter += 1" :disabled="counter >= 9">
        <span class="button-number-box">{{number}}</span>
        <span class="button-number-count">{{counter}}</span>
    </button>
</template>

<script>
  export default {
    name: "Number",
    props: {
      number: Number
    },
    data() {
      return {
        counter: 0
      }
    }
  }
</script>

<style scoped>

</style>