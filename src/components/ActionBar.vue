<template>
    <div class="sudoku-actions">
        <div class="sudoku-actions-container" v-for="action in actions" :key="action"
             v-on:click="$emit('send-selected-action', action)">
            <ButtonAction :action="action"/>
        </div>
    </div>
</template>

<script>
  import ButtonAction from "./buttons/ButtonAction";

  export default {
    name: "ActionBar",
    components: {
      ButtonAction
    },
    data() {
      return {
        actions: ["delete", "mark", "paint"]
      }
    }
  }
</script>

<style scoped>

</style>