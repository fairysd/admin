<template>
     <div class="modal fade" id="edithospitalInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">编辑院方</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label" for="formNo">名称</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-10">
                                    <input v-model="$parent.$data.hospitalInfos.hospitalName.name" type="text" id="name" class="form-control" v-bind:class="{haserror:($parent.$data.hospitalInfos.hospitalName.iserror)}" placeholder="名称" maxlength="50"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label" for="formNo">描述</label>
                                </div>
                                <div class="col-sm-10">
                                    <input v-model="$parent.$data.hospitalInfos.hospitalDesc" type="text" id="description" class="form-control" placeholder="描述" maxlength="200"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">缩写代码</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="$parent.$data.hospitalInfos.hospitalAbbr" type="text" id="shortCode" class="form-control" placeholder="缩写代码" maxlength="50"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系人</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="$parent.$data.hospitalInfos.contactName.name" type="text" id="contactPerson" class="form-control" placeholder="联系人" maxlength="50" v-bind:class="{haserror:($parent.$data.hospitalInfos.contactName.iserror)}"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">地址</label>
                                </div>
                                <div class="col-sm-10">
                                    <input v-model="$parent.$data.hospitalInfos.contactAddress" type="text" id="address" class="form-control" placeholder="地址" maxlength="50"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式1</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="$parent.$data.hospitalInfos.contactMethod1" type="text" id="contactWay1" class="form-control" placeholder="联系方式1" maxlength="50"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式2</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="$parent.$data.hospitalInfos.contactMethod2" type="text" id="contactWay2" class="form-control" placeholder="联系方式2" maxlength="50"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式3</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="$parent.$data.hospitalInfos.contactMethod3" type="text" id="contactWay3" class="form-control" placeholder="联系方式3" maxlength="50"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式4</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="$parent.$data.hospitalInfos.contactMethod4" type="text" id="contactWay4" class="form-control" placeholder="联系方式4" maxlength="50"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label id="error" class="label-danger" v-bind:class="{hidden:!($parent.$data.hospitalInfos.hospitalName.iserror||$parent.$data.hospitalInfos.contactName.iserror)}">请输入红框标出的是必填项！</label>
                        <button @click="applyEdithospital()" type="button" id="btnConfirm" class="btn btn-primary" v-bind:class="{disabled:($parent.$data.hospitalInfos.hospitalName.iserror&&$parent.$data.hospitalInfos.contactName.iserror)}">确认</button>
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
export default {
  name: 'editHospital',
  data () {
    return {            
    }
  },
  methods:{
    //添加医院
     applyEdithospital(){        
        //验证必填框是否填写      
        if (this.$parent.$data.hospitalInfos.hospitalName.name =="") {
                this.$parent.$data.hospitalInfos.hospitalName.iserror = true;
        }else{
            this.$parent.$data.hospitalInfos.hospitalName.iserror = false;
        };
        if (this.$parent.$data.hospitalInfos.contactName.name =="") {
                this.$parent.$data.hospitalInfos.contactName.iserror = true;
        }else{
            this.$parent.$data.hospitalInfos.contactName.iserror = false;
        };
    var isclick = this.$parent.$data.hospitalInfos.hospitalName.iserror||this.$parent.$data.hospitalInfos.contactName.iserror;
      if(!isclick){
        var data = {
          name:this.$parent.$data.hospitalInfos.hospitalName.name,
          description:this.$parent.$data.hospitalInfos.hospitalDesc,
          abbr:this.$parent.$data.hospitalInfos.hospitalAbbr,
          contactName:this.$parent.$data.hospitalInfos.contactName.name,
          contactAddress:this.$parent.$data.hospitalInfos.contactAddress,
          contactMethod1:this.$parent.$data.hospitalInfos.contactMethod1,
          contactMethod2:this.$parent.$data.hospitalInfos.contactMethod2,
          contactMethod3:this.$parent.$data.hospitalInfos.contactMethod3,
          contactMethod4:this.$parent.$data.hospitalInfos.contactMethod4,
          hostipalId:this.$parent.$data.hospitalInfos.hostipalId       
      };
        this.$http.post("url",data).then(response => {
            alert("修改成功")
        },response => {
                // error callback
                console.log("请求已经发送")
              });
      $("#edithospitalInfo").modal("toggle")
      };        
    },
  }
}
</script>
<style>  
</style>