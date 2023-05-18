<template>
  <ScaleBox>
    <div id="app">
      <router-view/>
    </div>
  </ScaleBox>
</template>

<script>
import ScaleBox from './components/SacleBox/index.vue'
export default {
  components: {
    ScaleBox
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
  width: 100%;
}
</style>
