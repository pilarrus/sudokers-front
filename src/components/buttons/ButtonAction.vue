<template>
    <button class="button button-action pointer" :class="{active: isActive}">
        <font-awesome-icon :icon="action.icon" class="icon" />
    </button>
</template>

<script>
  export default {
    name: "ButtonAction",
    props: {
      action: Object,
      isActive: Boolean
    }
  }
</script>

<style scoped>
path {
    fill: #35495E;
}
</style>