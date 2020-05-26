<template>
    <div class="sudoku-actions">
        <div class="sudoku-actions-container" v-for="action in actions" :key="action.name"
             v-on:click="setActions(action.name)">
            <ButtonAction v-if="buttonActive === action.name" :action="action" :is-active="true"/>
            <ButtonAction v-else :action="action" :is-active="false"/>
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
        actions: [
          {name: "delete", icon: "eraser"},
          {name: "mark", icon: "thumbtack"},
          {name: "paint", icon: "pencil-alt"}
        ],
        buttonActive: ""
      }
    },
    methods: {
      setActive: function (actionName) {
        this.buttonActive = actionName;
        console.log("buttonActive: ", this.buttonActive);
      },
      setActions: function (actionName) {
        this.setActive(actionName)
        this.$emit('send-selected-action', actionName)
      }
    }
  }
</script>

<style scoped>

</style>