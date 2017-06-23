<template>
     <div class="modal fade in" id="vendorHospitalsInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none; padding-left: 17px;">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="exampleModalLabel">供应商关联院方</h4>
                </div>
                <div class="modal-body forms">
                    <div class="form-inline">
                        <div class="row">
                            <div class="col-sm-6">
                                <label>未选院方</label>
                            </div>
                            <div class="col-sm-6">
                                <label>已选院方</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <select multiple="" id="unselected" class="form-control" style="height:600px"><option v-for="(item,index) in $parent.$data.vendorHospitalInfo.notSelectedHospitals" v-bind:value="item.id" v-text="item.name" v-on:dblclick="selected(index)"></option></select>
                            </div>
                            <div class="col-sm-6">
                                <select multiple="" id="selected" class="form-control" style="height:600px"><option v-for="(item,index) in $parent.$data.vendorHospitalInfo.selectedHospitals" v-bind:value="item.id" v-text="item.name" v-on:dblclick="unselected(index)"></option></select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnConfirm" class="btn btn-primary" @click="submitApply">确认</button>
                    <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
  name: 'vendorHospital',
  data () {
    return {     
        applyModel:{
            unit:"",
            product:"",
            use:true,
            otherName:"",
            className:"",
            registrationId:"",
            expirationDate:""
        },
        applyProductInfo:{
            inUse:true,
            otherName:"",
            className:""
          },
    }
  },
  methods:{
        //根据产品选择获取产品绑定信息
    selected(index){
        var selected = this.$parent.$data.vendorHospitalInfo.notSelectedHospitals.splice(index,1)[0];       
        this.$parent.$data.vendorHospitalInfo.selectedHospitals.push(selected)        
    },
    unselected(index){
        var unselected = this.$parent.$data.vendorHospitalInfo.selectedHospitals.splice(index,1)[0];
        this.$parent.$data.vendorHospitalInfo.notSelectedHospitals.push(unselected)  
    },
    submitApply(){        
        //验证必填框是否填写      
        var _this = this;
        var url = this.GLOBAL.hostIp;   
        var hospitalList =  $("#selected option");
        var hospitalListId= []
        for (var i = 0; i < hospitalList.length; i++) {
            hospitalListId.push($(hospitalList[i]).attr("value"))
        };
        // eslint-disable-next-line
      var data = {
            VendorId:_this.$parent.$data.vendorHospitalInfo.vendorId,
            hospitals:hospitalListId            
         }         
         // 发送http请求
         this.$http.post(url+"/VendorSetting/SaveVendorHospitals",data,{emulateJSON: true,credentials: true}).then(response => {
                
              }, response => {
                // error callback
              });
      $("#vendorHospitalsInfo").modal("toggle")
      
         //
         
      
    },
  }
}
</script>
<style>  
</style>