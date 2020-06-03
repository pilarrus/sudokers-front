<template>
    <div class="menu">
        <ul>
            <li>
                <button @click="setShowModal">
                    <span>Info</span>
                    <FontAwesomeIcon icon="info-circle"/>
                </button>
            </li>
            <li v-if="Object.keys($store.state.user).length !== 0">
                <button @click="logout">
                    <span>Cerrar sesión</span>
                    <FontAwesomeIcon icon="user-times"/>
                </button>
            </li>
        </ul>
        <Modal v-if="showModal" @close="showModal = false">
            <Info/>
        </Modal>
    </div>
</template>

<script>
  import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
  import {redirect} from "../utils/helpers";
  import Modal from "./Modal";
  import Info from "./Info";

  export default {
    name: "Menu",
    components: {
      Info,
      Modal,
      FontAwesomeIcon
    },
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      setShowModal: function () {
        this.showModal = true;
        console.log("this.showModal: ", this.showModal);
      },
      logout: function () {
        this.$store.commit('setUser', {});
        this.$emit('send-is-open', false);
        redirect('/');
      }
    }
  }
</script>

<style scoped>

</style>