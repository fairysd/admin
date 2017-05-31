<template>
  <div class="mainmenu row">
    <h4>设置</h4>
    <ul>
      <li v-for="item in items">
        <router-link v-bind:to="item.path" v-text="item.item"></router-link>
      </li>
    </ul>    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'bodyleft',
  data () {
    return {
      items:[],
    }
  },
   mounted:function(){
    //根据登陆角色，获取该角色操作权限

    //获取session中的用户信息
    var id = "userid";
      this.$http.get('./static/roleAuthority.json',{params:{id:id}}).then(response => {               
                // get body data                                  
                var _this = this;
                var data = response.body;   
                _this.items = data;
                
              }, response => {
                // error callback
              });
  },
}
</script>
<style>
  .mainmenu{
    border-right: 1px solid #bbb;
    height: 85vh;
  }
  .mainmenu h4{
    color: #fff;
    background-color: #000;
    font-family: "微软雅黑";
    text-align:left;
    padding-left: 10px;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    margin: 0;
  }
   .mainmenu ul{
    padding: 0;
   }
  
   .mainmenu ul li{
    list-style: none;
   }
  .mainmenu ul li a{
    display: block;
    color: #222;
    background-color: #fff;
    border-bottom: 1px solid #bbb;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: left;
    padding-left: 25px;
    font-family: "微软雅黑";
    letter-spacing: 0.5px;
  } 
  .mainmenu ul li a.router-link-active{
    background-color: #286090;
    color:#fff;
    text-decoration: none;
  }
</style>