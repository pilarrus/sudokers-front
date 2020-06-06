<template>
    <div class="menu">
        <ul>
            <li>
                <button class="menu-button" @click="showModalInfo = true">
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

            <li v-if="$route.name === 'sudoku'">
                <button class="menu-button" @click="showModalReset = true">
                    <span>Resetear sudoku</span>
                    <FontAwesomeIcon icon="undo"/>
                </button>
            </li>
        </ul>

        <Modal v-if="showModalInfo">
            <Info/>
            <button class="modal-button button" @click="setCloseModalInfo">OK</button>
        </Modal>

        <Modal v-if="showModalReset">
            <p>¿Seguro que quieres dejar el sudoku en su estado inicial?</p>
            <div class="modal-buttons">
                <button class="modal-button button" @click="setCloseModalReset(true)">Si</button>
                <button class="modal-button button" @click="setCloseModalReset(false)">No</button>
            </div>
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
        showModalInfo: false,
        showModalReset: false
      }
    },
    methods: {
      sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      setCloseModalInfo: async function () {
        this.showModalInfo = false;
        await this.sleep(300);
        this.$emit('send-is-open', false);
      },
      setCloseModalReset: async function (response) {
        if (response) {
          this.resetSudoku();
        }
        this.showModalReset = false;
        await this.sleep(300);
        this.$emit('send-is-open', false);
      },
      logout: function () {
        this.$store.commit('setUser', {});
        this.$emit('send-is-open', false);
        redirect('/');
      },
      resetSudoku: function () {
        this.$store.state.sudoku.reset();
      }
    }
  }
</script>

<style scoped>

</style>