<template>
  <div id="app">
    <div id = "adheader">
      <adheader></adheader>
    </div>    
    <div id="adbody">
      <adbody></adbody>
    </div>
    <div id = "adfooter">
      <adfooter></adfooter>
    </div>
  </div>
</template>

<script>
import adheader from './components/header'
import adfooter from './components/footer'
import adbody from './components/body'



export default {
  name: 'app',
  components:{adheader,adfooter,adbody},  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
