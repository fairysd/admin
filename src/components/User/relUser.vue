<template>
<div class="modal fade in" id="userPrivilegesInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">权限维护</h4>
            </div>
            <div class="modal-body forms">
                <div class="form-inline">
                    <div class="form-group">
                        <label for="formNo">院方</label>
                        <select id="privilegeRoots" class="form-control" v-on:change="getUnit"><option v-for="item in $parent.$data.hospital" v-bind:value="item.id" v-text="item.name"></option></select>
                    </div>
                </div>
                <div class="vertical-margin-1em">
                    <table id="settingList" class="table table-striped">
                        <thead>
                            <tr>
                                <th>单位</th>
                                <th style="width:50px;display:none;">查看</th>
                                <th style="width:50px">操作</th>
                            </tr>
                        </thead>
                        <tbody><tr v-for="item in unitModel">
                                <td v-text="item.name"></td>
                                <td style="display:none"><input type="checkbox" value="query"></td>
                                <td><input class="checkedOperation" type="checkbox" value="operate" ></td>
                            </tr></tbody>
                    </table>
                    <div id="pageList"></div>
                </div>
            </div>
            <div class="modal-footer">
                <label id="error" class="label-danger hidden">请输入红框标出的是必填项！</label>
                <button type="button" id="btnConfirm" class="btn btn-primary" >确认</button>
                <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'relUser',
  data () {
    return {             
        unitModel:[]
    }
  },
  methods:{
   getUnit(){
        var url = this.GLOBAL.hostIp; 
        var val = $(event.currentTarget).val();
        var userId = this.$parent.$data.currentUserId;
        var _this = this;
        var data = {
            "userId":userId,
            "parentId":val
        }
        this.$http.post(url+"/SystemFunction/GetUserPrivileges",data,{emulateJSON: true,credentials: true}).then(response => {               
                // get body data                    
              var body = response.body;
              if (body.isSuccess) {
                var data = body.data;
                _this.unitModel = data.units;
              };
                              
              }, response => {
                // error callback
              });
    },
  
   }  
}
</script>
<style>  
</style>