<template>
    <span class="sudoku-top-time">{{timer}}</span>
</template>

<script>
  import {getSecondsAccumulated, getMinutesAccumulated} from "../utils/helpers";
  import {refreshToken} from '../utils/networkHelpers';

  const SERVER_ROUTE = process.env.VUE_APP_API_ROUTE;

  export default {
    name: "Timer",
    props: {
      stop: Boolean
    },
    data() {
      return {
        initialSecondsAccumulated: this.$store.state.sudoku.seconds_accumulated,
        secondsAccumulated: 0,
        initialTimestamp: Date.now(),
        timer: this.setInitialTimer(this.$store.state.sudoku.seconds_accumulated),
        intervalId: "",
      }
    },
    methods: {
      setInitialTimer: function (secondsAccumulated) {
        return getMinutesAccumulated(secondsAccumulated) + ':' + getSecondsAccumulated(secondsAccumulated);
      },
      setTimer: function (minutes, seconds) {
        this.timer = minutes + ':' + seconds;
      },
      formatTimer: function () {
        let seconds = getSecondsAccumulated(this.secondsAccumulated);
        let minutes = getMinutesAccumulated(this.secondsAccumulated);
        this.setTimer(minutes, seconds);
      },
      saveSecondsAccumulated: async function () {
        try {
          await this.axios({
            method: 'patch',
            url: SERVER_ROUTE + '/sudokus/seconds/' + this.$store.state.sudoku.id,
            data: {
              "seconds_accumulated": this.secondsAccumulated
            },
            headers: {'Content-Type': 'application/json', 'token': this.$store.state.user.token}
          });

        } catch (e) {
          if (e.response.data.message === 'jwt expired') {
            await refreshToken();
          }
        }
      },
      startTimer: function () {
        this.intervalId = setInterval(() => {
          let currentTimestamp = Date.now();
          let secondDifference = parseInt((currentTimestamp - this.initialTimestamp) / 1000);
          this.secondsAccumulated = secondDifference + this.initialSecondsAccumulated;
          this.$store.state.sudoku.seconds_accumulated = this.secondsAccumulated;
          this.saveSecondsAccumulated();
          this.formatTimer();
        }, 1000);
      },
      stopTimer: function () {
        clearInterval(this.intervalId);
      }
    },
    created() {
      this.startTimer();
    },
    updated() {
      if (this.stop) {
        this.stopTimer();
      }
    },
    destroyed() {
      this.stopTimer();
    }
  }
</script>

<style scoped>

</style>