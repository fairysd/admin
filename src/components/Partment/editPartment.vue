<template>
     <div class="modal fade in" id="edithospitalUnitInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">院方单位</h4>
            </div>
            <div class="modal-body forms">
                <div class="form-inline">
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">名称</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-10">
                            <input type="text" id="name" class="form-control" placeholder="名称" v-model="$parent.$data.partmentModel.name.name" v-bind:class="{haserror:($parent.$data.partmentModel.name.iserror)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">描述</label>
                        </div>
                        <div class="col-sm-10">
                            <input type="text" id="description" class="form-control" placeholder="描述" v-model="$parent.$data.partmentModel.desc">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">开票信息</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <select id="receipt" class="form-control" v-model="$parent.$data.partmentModel.tickets.name" v-bind:class="{haserror:($parent.$data.partmentModel.tickets.iserror)}">
                                <option value="">请选择发票抬头</option>
                            <option value="7d463995-5007-4922-9adc-0dafc9a45ed9">普通发票</option></select>
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">业务类型</label>
                        </div>
                        <div class="col-sm-4">
                            <select id="businessType" class="form-control" v-model="$parent.$data.partmentModel.type">
                                <option value="1">使用单位</option>
                                <option value="2">库房</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">缩写代码</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="shortCode" class="form-control" placeholder="缩写代码" maxlength="50" v-model="$parent.$data.partmentModel.abbr">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系人</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactPerson" class="form-control" placeholder="联系人" maxlength="50" v-model="$parent.$data.partmentModel.contactName.name" v-bind:class="{haserror:($parent.$data.partmentModel.contactName.iserror)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">地址</label>
                        </div>
                        <div class="col-sm-10">
                            <input type="text" id="address" class="form-control" placeholder="地址" maxlength="50" v-model="$parent.$data.partmentModel.contactAddress">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系方式1</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactWay1" class="form-control" placeholder="联系方式1" maxlength="50" v-model="$parent.$data.partmentModel.contactMethod1">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系方式2</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactWay2" class="form-control" placeholder="联系方式2" maxlength="50" v-model="$parent.$data.partmentModel.contactMethod2">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系方式3</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactWay3" class="form-control" placeholder="联系方式3" maxlength="50" v-model="$parent.$data.partmentModel.contactMethod3">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系方式4</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactWay4" class="form-control" placeholder="联系方式4" maxlength="50" v-model="$parent.$data.partmentModel.contactMethod4">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnConfirm" @click="applyEditPartment">确认</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose">关闭</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'addPartment',
  data () {
    return {    
         }
  },
  methods:{   
       //请求编辑部门信息
      applyEditPartment(){
        var url = this.GLOBAL.hostIp;
        var _this = this.$parent.$data;
              //验证必填框是否填写      
        if (_this.partmentModel.name.name =="") {
                _this.partmentModel.name.iserror = true;
        }else{
            _this.partmentModel.name.iserror = false;
        };
        if (_this.partmentModel.tickets.name =="") {
                _this.partmentModel.tickets.iserror = true;
        }else{
            _this.partmentModel.tickets.iserror = false;
        };
        if (_this.partmentModel.contactName.name =="") {
                _this.partmentModel.contactName.iserror = true;
        }else{
            _this.partmentModel.contactName.iserror = false;
        };
    var isclick = _this.partmentModel.name.iserror||_this.partmentModel.contactName.iserror||_this.partmentModel.tickets.iserror;
      if(!isclick){
        var data = {
          Name:_this.partmentModel.name.name,
          Description:_this.partmentModel.hospitalDesc,
          ShortCode:_this.partmentModel.hospitalAbbr,
          ReceiptId:_this.partmentModel.tickets.name,
          Type:_this.partmentModel.type,
          ContactInfo:{
              ContactPerson:_this.partmentModel.contactName.name,
              Address:_this.partmentModel.contactAddress,
              ContactWay1:_this.partmentModel.contactMethod1,
              ContactWay2:_this.partmentModel.contactMethod2,
              ContactWay3:_this.partmentModel.contactMethod3,
              ContactWay4:_this.partmentModel.contactMethod4,
          },          
          RootId:_this.partmentModel.hostipalId       
      };
         this.$http.post(url+'/HospitalSetting/SaveHospitalUnit',data,{emulateJSON: true,credentials: true}).then(response => {
            alert("修改成功")
        },response => {
                // error callback
                console.log("请求已经发送")
              });
      $("#edithospitalUnitInfo").modal("toggle")
      }; 
      },
  }
}
</script>
<style>  
</style>