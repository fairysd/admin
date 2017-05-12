<template>
  <div class="container-fluid system-footer ">    
    <div class="col-sm-4 col-sm-push-4">
      <div class="">
        <span v-text='brand' class="footer-brand"></span>
      </div>
    </div>            
  </div>
</template>

<script>
export default {
  name: 'adfooter',
  data () {
    return {
      brand: '©2017-试剂管理系统'
    }
  }
}
</script>
<style>
  .system-footer {
    background-color: #fff;
    margin: 0;
    height: 30px;
    line-height: 30px;
    border-top:1px solid #bbb;
  }
  span.footer-brand{
    color: #222;
    font-family: "微软雅黑";
    font-size: 12px;
  }
</style>