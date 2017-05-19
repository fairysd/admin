<template>
<div id="adbody" class="container-fluid content">
<div class="row">  
  <div id="bodyleft" class="col-sm-2">   
      <bodyleft></bodyleft>        
  </div>
  <div id="bodycontainer" class="col-sm-10">    
    <router-view></router-view>
  </div>
</div>
   <div class="modal fade in" id="userInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">个人信息维护</h4>
            </div>
            <div class="modal-body forms">
                <div class="form-inline">
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">单位</label>
                        </div>
                        <div class="col-sm-10">
                            <select id="units" required="" class="form-control"></select>
                        </div>
                    </div>
                    <div class="form-inline">
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label" for="formNo">姓名</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" readonly="" id="name" class="form-control" required="" placeholder="姓名" maxlength="50">
                            </div>
                            <div class="col-sm-2">
                                <label class="control-label" for="formNo">账号</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" readonly="" id="account" class="form-control" required="" placeholder="账号" maxlength="50">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label">密码</label>
                                
                            </div>
                            <div class="col-sm-4">
                                <input type="password" id="password" class="form-control" placeholder="密码" maxlength="50">
                            </div>
                            <div class="col-sm-2">
                                <label class="control-label">重复密码</label>
                                
                            </div>
                            <div class="col-sm-4">
                                <input type="password" id="validPassword" class="form-control" placeholder="重复密码" maxlength="50">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label">职位</label>
                            </div>
                            <div class="col-sm-4">
                                <select id="title" class="form-control"><option value="1">主管</option></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <label id="error" class="label-danger hidden">请输入红框标出的是必填项！</label>
                    <button type="button" id="btnConfirm" class="btn btn-primary" @click="editUser">确认</button>
                    <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
        </div>
    </div>
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
  },
  methods:{
    editUser(){
        $("#userInfo").modal("toggle")
    }
  }
}
</script>
<style>
#app{
  margin-top: 50px;
  position: absolute;
  width: 100%;
}
#adfooter{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;   
    z-index: 1000; 
  }
  #bodyleft{
    position: fixed;
    top: 50px;
    left: 0;
  }
#bodycontainer{
  margin-left: 16.6666667%;
}
#userInfo {
    text-align:left;
}
 #userInfo .form-control{
  width: 100%;
 }
 #userInfo .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 }
</style>