<template>
      <div class="container body-content">
        <div class="login-container"> 
            <div class="login-panel">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-sm-5 control-label">测试环境</label>
                        <div class="col-sm-7">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="account">账号</label>
                        <div class="col-sm-10">
                            <input v-model="account" type="email" class="form-control" id="account" placeholder="请输入账号">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="password">密码</label>
                        <div class="col-sm-10">
                            <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-2">
                            <button type="button" id="logon" class="btn btn-default" @click="signin">登录</button>
                        </div>
                        <label id="message" class="col-sm-8 text-warning bottom ui-hidden"></label>
                    </div>
                </form>
            </div>
            <footer>
                <p>© 2017 - 试剂管理系统</p>
            </footer>
        </div>

    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: '请登录',
      account:"",
      password:""
    }
  },
  methods:{
    signin(){
      var url = this.GLOBAL.hostIp;
      var data = {
        Account:this.account,
        Password:this.password
      }
       this.$http.post(url+"/logon/Validate",data,{emulateJSON: true}).then(response => {
          var body = response.body;
          if (body.IsSuccess) {
            this.$router.push('/container')
          };      
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container{
  width: 500px;
  margin: 0 auto;
  border:1px solid #ccc;
  padding:10px;
  border-radius: 10px;
}
</style>
