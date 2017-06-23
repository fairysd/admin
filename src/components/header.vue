<template>
  <div class="container-fluid system-header navbar-fixed-top">    
    <div class="col-sm-4">
      <div class="">
        <span v-text='title' class="page-brand"></span>
      </div>
    </div>
      <div class="col-sm-4 col-sm-push-4 logstatus">
        <form>        
          <span v-text='username' data-toggle="modal" data-target="#userInfo" class="current-user-edit" id="globalUserInfo"></span>
          <span>
            &nbsp;&nbsp;
    &nbsp;&nbsp;
          </span>
          <button v-text='loginstatus' class="logout" @click="logout"></button>        
      </form>  
      </div> 
  </div>
</template>

<script>
export default {
  name: 'adheader',
  data () {
    return {
      title: '（测试）试剂管理系统',
      username:'',
      loginstatus:'注销'
    }
  },       
  mounted:function(){
  //  根据登陆角色，获取该角色操作权限
    var _this = this;
    var url = this.GLOBAL.hostIp;
      this.$http.post(url+'/Main/JsonMenus',{},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data                                  
                var _this = this;
                var body = response.body;   
                if (body.isSuccess) {  
                  var name = body.data.loginInfo.userName;
                 _this.username = name;
                }
              }, response => {
                // error callback
              });
  },
  methods:{
    logout(){
      var url = this.GLOBAL.hostIp;
      this.$http.post(url+"/Main/Logout",{},{emulateJSON: true,credentials: true}).then(response => {
          var body = response.body;
          if (body.IsSuccess) {
            this.$router.push('/login')
          };      
      })
    }
  }
}
</script>
<style>
  .system-header {
    background-color: rgb(60,96,144);
    margin: 0;
    height: 50px;
    line-height: 50px;
    text-align: left;
  }
  .system-header span, a.logout{
    color: #fff;
    font-family: "宋体";
  }
  .system-header .logstatus{
    text-align: right;
  }
  .current-user-edit{
    cursor: pointer;
  }
  .system-header .logout{
    background: transparent;
    border:none;
    color: #fff;
  }
</style>