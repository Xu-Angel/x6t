<template>
  <div id="app">
    <!-- <Tree></Tree> -->
    <Th></Th>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Tree from './components/Tree.vue'
import Th from './components/Th.vue'

export default {
  name: 'App',
  components: {
    Tree,
    Th,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
