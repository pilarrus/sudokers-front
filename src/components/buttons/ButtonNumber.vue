<template>
    <button class="button button-number pointer" :class="{active: isActive}" :disabled="counter >= 9">
        <span class="button-number-box">{{number}}</span>
        <span class="button-number-count">{{counter}}</span>
    </button>
</template>

<script>

  export default {
    name: "Number",
    props: {
      number: Number,
      isActive: Boolean,
      counter: Number
    }
  }
</script>

<style scoped>

</style>