<template>
    <span class="sudoku-top-time">{{timer}}</span>
</template>

<script>
  import {getSecondsAccumulated, getMinutesAccumulated} from "../utils/helpers";

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
      startTimer: function () {
        this.intervalId = setInterval(() => {
          let currentTimestamp = Date.now();
          let secondDifference = parseInt((currentTimestamp - this.initialTimestamp) / 1000);
          this.secondsAccumulated = secondDifference + this.initialSecondsAccumulated;
          this.$store.state.sudoku.seconds_accumulated = this.secondsAccumulated;
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