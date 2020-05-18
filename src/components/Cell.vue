<template>
    <div v-if="action === 'paint'" class="cell cell-number">{{number}}</div>

    <div v-else-if="action === 'mark'" class="cell cell-grid">
        <span v-for="n in numbers" :key="n" class="cell-grid-item" :class="['cell-grid-item-' + n]">{{n}}</span>
    </div>

    <div v-else-if="action === '' || action === 'delete'" class="cell"></div>
</template>

<script>
  export default {
    name: "Cell",
    props: {
      action: String,
      number: Number,
      numbers: Array
    }
  }
</script>

<style scoped>

</style>