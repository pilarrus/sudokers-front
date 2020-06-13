<template>
    <div class="levels">
        <h2>Elige un nivel de dificultad</h2>
        <ul>
            <li v-for="level in levels" :key="level.text" v-on:click="actions(level)">
                <Level :level="level.text" />
            </li>
        </ul>
    </div>
</template>

<script>
  import Level from '../components/Level.vue';
  import { redirect } from '../utils/helpers';

  export default {
    name: 'Levels',
    components: {
      Level
    },
    data() {
      return {
        levels: [
          { name: 'easy', text: 'Fácil' },
          { name: 'medium', text: 'Medio' },
          { name: 'difficult', text: 'Dificíl' },
          { name: 'extreme', text: 'Extremo' }
        ]
      }
    },
    methods: {
      setLevel: function (levelChoice) {
        this.$store.commit('setLevel', levelChoice);
      },
      actions: function (levelChoice) {
        this.setLevel(levelChoice);
        redirect('/newOrResume');
      }
    }
  }
</script>

<style scoped>

</style>