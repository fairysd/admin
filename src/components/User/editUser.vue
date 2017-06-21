<template>
     
<div class="modal fade in" id="editUserInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">用户</h4>
            </div>
            <div class="modal-body forms">
                <div class="form-inline">                    
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">单位</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-10">
                            <select v-validate="'required'" name="units" :class="{'haserror': errors.has('units') }" id="units" required="" class="form-control" v-model="$parent.$data.editUserModel.unitId"><option value="">请选择...</option><option v-for="item in $parent.$data.units" v-bind:value="item.id" v-text="item.name"></option></select>
                        </div>
                    </div>
                    <div class="form-inline">
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label" for="formNo">姓名</label>
                                <span class="require-label">*</span>
                            </div>
                            <div class="col-sm-4">
                                <input v-validate="'required'" name="name" :class="{'haserror': errors.has('name') }" type="text" id="name" class="form-control" required="" placeholder="姓名" maxlength="50" v-model="$parent.$data.editUserModel.name">
                            </div>
                            <div class="col-sm-2">
                                <label class="control-label" for="formNo">账号</label>
                                <span class="require-label">*</span>
                            </div>
                            <div class="col-sm-4">
                                <input v-validate="'required'" name="account" :class="{'haserror': errors.has('account') }" type="text" id="account" class="form-control" required="" placeholder="账号" maxlength="50" v-model="$parent.$data.editUserModel.account">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label">密码</label>
                                <span class="require-label password">*</span>
                            </div>
                            <div class="col-sm-4">
                                <input v-validate="'required'" name="password" :class="{'haserror': errors.has('password') }" type="password" id="password" class="form-control" required="" placeholder="密码" maxlength="50" v-model="$parent.$data.editUserModel.password">
                            </div>
                            <div class="col-sm-2">
                                <label class="control-label">重复密码</label>
                                <span class="require-label password">*</span>
                            </div>
                            <div class="col-sm-4">
                                <input v-validate="'required'" name="validPassword" :class="{'haserror': errors.has('validPassword') }" type="password" id="validPassword" class="form-control" required="" placeholder="重复密码" maxlength="50" v-model="$parent.$data.editUserModel.validPassword">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label">职位</label>
                                <span class="require-label">*</span>
                            </div>
                            <div class="col-sm-4">
                                <select v-validate="'required'" name="title" :class="{'haserror': errors.has('title') }" id="title" class="form-control" v-model="$parent.$data.editUserModel.title">
                                    <option value="0">员工</option>
                                    <option value="1">主管</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="modal-footer">
                <label id="error" class="label-danger"><span v-show="errors.has('units')||errors.has('account')||errors.has('name')||errors.has('password')||errors.has('validPassword')||errors.has('title')" class="help is-danger">请输入红框中的必填项</span></label>
                <button type="button" id="btnConfirm" class="btn btn-primary" @click="applyEditUser">确认</button>
                <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: 'editUser',
  data () {
    return {             
    }
  },
  methods:{
   applyunit(){

    },
    applyEditUser(){
        var _this = this.$parent.$data;
        var url = this.GLOBAL.hostIp;
        var data = _this.editUserModel;
        this.$http.post(url+"/User/Save",data,{emulateJSON: true,credentials: true}).then(response => {               
                // get body data    
                var body = response.body;                              
                if (body.isSuccess) {
                  console.log(1)
                   $("#editUserInfo").modal("toggle")
                    //_this.hospital = data.hospital;
                    //_this.vendor = data.vendor;
                } else{};                
              }, response => {
                // error callback
              });
    }
   }  
}
</script>
<style>  
</style>