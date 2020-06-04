<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <slot></slot>

                    <button class="modal-button button" @click="$emit('close')">OK</button>

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