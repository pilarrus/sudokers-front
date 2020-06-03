<template>
    <nav class="nav">
        <div class="nav-title">
            <img src="../assets/logo.png" alt="Logo" class="nav-logo"/>
            <span>udokers</span>
        </div>
        <button v-on:click="setIsOpen">
            <FontAwesomeIcon icon="ellipsis-v"/>
        </button>
        <Menu v-if="isOpen" @send-is-open="setIsOpen" />
    </nav>
</template>

<script>
  import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
  import Menu from "./Menu";

  export default {
    name: "Nav",
    components: {
      FontAwesomeIcon,
      Menu
    },
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      setIsOpen: function () {
        this.isOpen = !this.isOpen;
        console.log("this.isOpen: ", this.isOpen);
      }
    }
  }
</script>

<style scoped>

</style>