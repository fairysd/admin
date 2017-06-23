<template>
        <div class="modal fade in" id="formApproveList" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel"><span v-text="$parent.$data.currentHospital"></span>-签核列表</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label" for="formNo">表单</label>
                                </div>
                                <div class="col-sm-10">
                                    <select id="auditForms" class="form-control" v-on:change="GetFormApproveList">
                                        <option value=""></option>
                                        <option v-for="(key,value) in $parent.$data.approveList" v-bind:value="value" v-text="key">订货审核</option>                                       
                                    </select>
                                </div>
                            </div>
                        </div>
                        <table id="approveList" class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="col-sm-2">序号</th>
                                    <th class="col-lg-2">审核人类型</th>
                                    <th>审核人</th>
                                    <th class="col-sm-2">操作</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>
                                        <select id="selectAuditForms" class="form-control">
                                            <option value="1">申请人</option>
                                            <option value="2">申请部门主管</option>
                                            <option value="3">指定人员</option>
                                            <option value="4">部门主管</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div class="ui-widget">
                                            <input id="selectUnit" class="form-control hidden" autocomplete="off">
                                            <input id="selectManager" class="form-control hidden" autocomplete="off"></div>
                                    </td>
                                    <td>
                                        <button href="#" id="selectSave" class="btn btn-primary" >保存</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
            </div>
</template>

<script>
export default {
  name: 'approveList',
  data () {
    return {     
}
  },
  methods:{
        GetFormApproveList(){
            var _this = this;
            var url = this.GLOBAL.hostIp;
            var val = $(event.currentTarget).val();
        this.$http.post(url+"/HospitalSetting/GetFormApproveList",{formType:val},{emulateJSON: true,credentials: true}).then(response => {            
              var body = response.body;
              if (body.isSuccess) {
                  
              } else{};
              }, response => {
                // error callback
                console.log("error")
              });
        }
  }
}
</script>
<style>  
</style>