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
                            <select id="units" required="" class="form-control" v-model="$parent.$data.editUserModel.unit"><option value="">请选择...</option><option v-for="item in $parent.$data.editUserUnit" v-bind:value="item.value" v-text="item.name"></option></select>
                        </div>
                    </div>
                    <div class="form-inline">
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label" for="formNo">姓名</label>
                                <span class="require-label">*</span>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" id="name" class="form-control" required="" placeholder="姓名" maxlength="50" v-model="$parent.$data.editUserModel.name">
                            </div>
                            <div class="col-sm-2">
                                <label class="control-label" for="formNo">账号</label>
                                <span class="require-label">*</span>
                            </div>
                            <div class="col-sm-4">
                                <input type="text" id="account" class="form-control" required="" placeholder="账号" maxlength="50" v-model="$parent.$data.editUserModel.account">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label">密码</label>
                                <span class="require-label password">*</span>
                            </div>
                            <div class="col-sm-4">
                                <input type="password" id="password" class="form-control" required="" placeholder="密码" maxlength="50" v-model="$parent.$data.editUserModel.password">
                            </div>
                            <div class="col-sm-2">
                                <label class="control-label">重复密码</label>
                                <span class="require-label password">*</span>
                            </div>
                            <div class="col-sm-4">
                                <input type="password" id="validPassword" class="form-control" required="" placeholder="重复密码" maxlength="50" v-model="$parent.$data.editUserModel.repeatPassword">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-2">
                                <label class="control-label">职位</label>
                                <span class="require-label">*</span>
                            </div>
                            <div class="col-sm-4">
                                <select id="title" class="form-control" v-model="$parent.$data.editUserModel.place">
                                    <option value="0">员工</option>
                                    <option value="1">主管</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="modal-footer">
                <label id="error" class="label-danger hidden">请输入红框标出的是必填项！</label>
                <button type="button" id="btnConfirm" class="btn btn-primary" @click="applyAddUser">确认</button>
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
    var _this = this.$parent.$data;
    var val = $(event.currentTarget).val();
    this.$http.get('./static/addUser.json',{params:{val:val}}).then(response => {
            var data = response.body;
            _this.addUserUnit = data.unit;
              
              }, response => {
                // error callback
              });
    },
    applyAddUser(){
        
    }
   }  
}
</script>
<style>  
</style>