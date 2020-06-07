<template>
    <span>{{dateTimeFormat}}</span>
</template>

<script>
    import {getDay, getMonth, getYear, getHour, getMinutes, getSeconds} from "../utils/helpers";

    export default {
    name: "DateTimeFormat",
    props: {
      dateTime: Date
    },
    data() {
      return {
        dateTimeFormat: ""
      }
    },
    created() {
      const day = getDay(this.dateTime);
      const month = getMonth(this.dateTime);
      const year = getYear(this.dateTime);
      const hour = getHour(this.dateTime);
      const minutes = getMinutes(this.dateTime);
      const seconds = getSeconds(this.dateTime);
      this.dateTimeFormat = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
    }
  }
</script>

<style scoped>

</style>