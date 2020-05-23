<template>
    <span class="sudoku-top-time">{{timer}}</span>
</template>

<script>
  export default {
    name: "Timer",
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
      setSeconds: function (secondsAccumulated) {
        let seconds = parseInt(secondsAccumulated % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return seconds;
      },
      setMinutes: function (secondsAccumulated) {
        let minutes = parseInt(secondsAccumulated / 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return minutes;
      },
      setInitialTimer: function (secondsAccumulated) {
        return this.setMinutes(secondsAccumulated) + ':' + this.setSeconds(secondsAccumulated);
      },
      setTimer: function (minutes, seconds) {
        this.timer = minutes + ':' + seconds;
      },
      formatTimer: function () {
        let seconds = this.setSeconds(this.secondsAccumulated);
        let minutes = this.setMinutes(this.secondsAccumulated);
        this.setTimer(minutes, seconds);
      },
      startTimer: function () {
        this.intervalId = setInterval(() => {
          let currentTimestamp = Date.now();
          let secondDifference = parseInt((currentTimestamp - this.initialTimestamp) / 1000);
          this.secondsAccumulated = secondDifference + this.initialSecondsAccumulated;
          this.formatTimer();
        }, 1000);
      },
      stopTimer: function () {
        clearInterval(this.intervalId);
      },
    },
    created() {
      this.startTimer();
    },
    destroyed() {
      this.stopTimer();
    }
  }
</script>

<style scoped>

</style>