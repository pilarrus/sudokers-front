<template>
    <div id="app">
        <Nav />
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
  import Nav from "./components/Nav";
  export default {
    name: 'App',
    components: {Nav}
  }
</script>

<style lang="scss">
    @import "sass/main";
</style>
