<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <slot></slot>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "Modal"
  }
</script>

<style scoped>

</style>