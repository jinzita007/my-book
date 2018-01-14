<template>
  <div id="app">
    <!--<mu-appbar :title="title" class="title" :zDepth="zDepth"/>-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data(){
    return {
    }
  }
}
</script>
<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content:center;
  align-items:flex-start;
}*/
#app {
  text-align: center;
}
</style>



