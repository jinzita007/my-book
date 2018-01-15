<template>
  <div id="app">
<mu-appbar :title="title">
    <mu-icon-menu icon="more_vert" slot="right">
      <mu-menu-item @click="homeClick" title="首页"/>
      <mu-menu-item @click="backClcik" title="后台"/>

    </mu-icon-menu>
</mu-appbar>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  /*created(){
    
  },*/
  data(){
    return {
      title: '羽翼图书',
    }
  }, 

  methods: {
    homeClick() {
      this.$router.push('/')
      //alert('首页')
    },
    backClcik() {
      this.$router.push('/bookList')
       //alert('后台')
    },

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
/*#app {
  text-align: center;
}*/

</style>



