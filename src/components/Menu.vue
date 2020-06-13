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

            <li v-if="$route.name === 'sudoku'">
                <button class="menu-button" @click="showModalResolve = true">
                    <span>Finalizar sudoku</span>
                    <FontAwesomeIcon icon="redo"/>
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

        <Modal v-if="showModalResolve">
            <p>¿Seguro que quieres finalizar el sudoku?</p>
            <div class="modal-buttons">
                <button class="modal-button button" @click="setCloseModalResolve(true)">Si</button>
                <button class="modal-button button" @click="setCloseModalResolve(false)">No</button>
            </div>
        </Modal>
    </div>
</template>

<script>
  import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
  import {redirect} from "../utils/helpers";
  import Modal from "./Modal";
  import Info from "./Info";
  import {refreshToken} from "../utils/networkHelpers";

  const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

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
        showModalReset: false,
        showModalResolve: false
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
      setCloseModalResolve: async function (response) {
        if (response) {
          this.resolveSudoku();
        }
        this.showModalResolve = false;
        await this.sleep(300);
        this.$emit('send-is-open', false);
      },
      logout: function () {
        this.resetState();
        this.$emit('send-is-open', false);
        redirect('/login');
      },
      resetSudoku: function () {
        this.$store.state.sudoku.reset();
        this.updateSudoku();
      },
      resolveSudoku: function () {
        this.$store.state.sudoku.reset();
        this.$store.state.sudoku.resolve();
        this.setIsOver();
        this.deleteSudoku();
      },
      setIsOver: function () {
        const isOver = { status: true, mode: 'automatic' };
        this.$store.commit("setIsOver", isOver);
      },
      resetState: function () {
        this.$store.commit('setUser', {});
        this.$store.commit('setLevel', {});
        this.$store.commit('setAction', {});
        this.$store.commit('setSudoku', {});
        this.$store.commit('setIsOver', {status: false, mode: ''});
      },
      updateSudoku: async function () {
        try {
          await this.axios({
            method: 'patch',
            url: SERVER_ROUTE + '/sudokus/' + this.$store.state.sudoku.id,
            data: {
              "cells": this.$store.state.sudoku.cells
            },
            headers: {'Content-Type': 'application/json', 'token': this.$store.state.user.token}
          });

        } catch (e) {
          if (e.response.data.message === 'jwt expired') {
            const isRefreshToken = await refreshToken();
            if (isRefreshToken) {
              await this.updateSudoku();
            }
          }
        }
      },
      deleteSudoku: async function () {
        try {
          await this.axios({
            method: 'delete',
            url: SERVER_ROUTE + '/sudokus/' + this.$store.state.sudoku.id,
            headers: {'Content-Type': 'application/json', 'token': this.$store.state.user.token}
          });

        } catch (e) {
          if (e.response.data.message === 'jwt expired') {
            const isRefreshToken = await refreshToken();
            if (isRefreshToken) {
              await this.deleteSudoku();
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>