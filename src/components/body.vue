<template>
<div id="adbody" class="container-fluid content">
<div class="row">  
  <div id="bodyleft" class="col-sm-2">   
      <bodyleft></bodyleft>        
  </div>
  <div class="col-sm-10">    
    <router-view></router-view>
  </div>
</div>
  
</div>  
</template>

<script>
import bodyleft from './bodyleft'
export default {
  name: 'adbody',
  components:{bodyleft},
  data () {
    return {
     
    }
  }
}
</script>
<style>
  #adbody{

  }
</style>