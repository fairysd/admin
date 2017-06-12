<template>
  <div id="content">
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
import adheader from './header'
import adfooter from './footer'
import adbody from './body'

export default {
  name: 'container',
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
