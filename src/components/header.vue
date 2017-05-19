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
          <a v-text='loginstatus' class="logout" href="/LIMS_V1_T/Main/Logout"></a>        
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
      username:'admin',
      loginstatus:'注销'
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
</style>