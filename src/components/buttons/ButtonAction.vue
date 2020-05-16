<template>
    <button class="button button-action pointer" v-on:click="setActive">{{action}}</button>
</template>

<script>
  export default {
    name: "ButtonAction",
    props: {
      action: String
    },
    data() {
      return {
        active: false
      }
    },
    methods: {
      setActive: function () {
        this.active = !this.active;
        console.log("active", this.active);
      }
    }
  }
</script>

<style scoped>

</style>