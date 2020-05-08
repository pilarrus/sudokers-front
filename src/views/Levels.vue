<template>
    <div class="levels">
        <h2>Elige un nivel de dificultad</h2>
        <ul>
            <li v-for="level in levels" :key="level.text" v-on:click="actions(level)">
                <Level v-bind:level="level.text" />
            </li>
        </ul>
    </div>
</template>

<script>
  import Level from "../components/Level.vue";
  import router from "../router";

  export default {
    name: "Levels",
    components: {
      Level
    },
    data() {
      return {
        levels: [
          { name: "easy", text: "Fácil" },
          { name: "medium", text: "Medio" },
          { name: "difficult", text: "Dificíl" },
          { name: "easy", text: "Extremo" }
        ],
        levelChoice: null
      }
    },
    methods: {
      setLevel: function (levelChoice) {
        this.levelChoice = levelChoice;
        console.log("levelChoice: ", this.levelChoice);
      },
      redirect: function () {
        router.push({ path: "/newOrResume" });
      },
      actions: function (levelChoice) {
        this.setLevel(levelChoice);
        this.redirect();
      }
    }
  }
</script>

<style scoped>

</style>