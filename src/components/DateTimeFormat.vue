<template>
    <span>{{dateTimeFormat}}</span>
</template>

<script>
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
      const day = this.dateTime.getDate() < 10 ? "0" + this.dateTime.getDate() : this.dateTime.getDate();
      const month = this.dateTime.getMonth() < 10 ? "0" + this.dateTime.getMonth() : this.dateTime.getMonth();
      const year = this.dateTime.getFullYear();
      const hour = this.dateTime.getHours() < 10 ? "0" + this.dateTime.getHours() : this.dateTime.getHours();
      const minutes = this.dateTime.getMinutes() < 10 ? "0" + this.dateTime.getMinutes() : this.dateTime.getMinutes();
      const seconds = this.dateTime.getSeconds() < 10 ? "0" + this.dateTime.getSeconds() : this.dateTime.getSeconds();
      this.dateTimeFormat = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
    }
  }
</script>

<style scoped>

</style>