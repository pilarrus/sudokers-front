<template>
    <div class="menu">
        <ul>
            <li>
                <button class="menu-button" @click="setShowModal">
                    <span>Info</span>
                    <FontAwesomeIcon icon="info-circle"/>
                </button>
            </li>
            <li v-if="Object.keys($store.state.user).length !== 0">
                <button class="menu-button" @click="logout">
                    <span>Cerrar sesión</span>
                    <FontAwesomeIcon icon="user-times"/>
                </button>
            </li>
        </ul>
        <Modal v-if="showModal" @close="setCloseModal">
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
      sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      setCloseModal: async function () {
        this.showModal = false;
        await this.sleep(300);
        this.$emit('send-is-open', false);
      },
      setShowModal: function () {
        this.showModal = true;
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