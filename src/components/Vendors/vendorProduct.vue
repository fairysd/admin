<template>
     <div class="modal fade in" id="vendorProductInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">供应商单位产品</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">发货单位</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <select v-validate="'required'" name="units" class="form-control" required="" id="units" v-model="applyModel.unit" v-bind:class="{'haserror': errors.has('units') }">
                                        <option value="">请选择发货单位</option>
                                        <option v-for="item in $parent.$data.vendorProducts.units" v-bind:value="item.id" v-text="item.name"></option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">产品</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <select v-validate="'required'" name="product" class="form-control" required="" id="products" v-on:change="getVendorProduct" v-model="applyModel.product" v-bind:class="{'haserror': errors.has('product') }">
                                        <option value="">请选择产品</option>
                                        <option v-for="product in $parent.$data.vendorProducts.products" v-bind:value="product.id" v-text="product.name"></option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">别名</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="alias" class="form-control" placeholder="别名" maxlength="50" v-model="applyModel.otherName"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">使用中</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="checkbox" id="isActive" checked="" v-model="applyModel.use"></div>
                            </div>                            
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">注册证号</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="registrationId" class="form-control" placeholder="注册证号" maxlength="100" v-model="applyModel.registrationId">
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">注册有效期</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="expirationDate" class="form-control hasDatepicker" placeholder="注册有效期" v-model="applyModel.expirationDate">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label id="error" class="label-danger"><span v-show="errors.has('units')||errors.has('product')" class="help is-danger">请选择红框中的必填项</span></label>
                        <button type="button" class="btn btn-primary" id="btnConfirm" @click="submitApply">确认</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose">关闭</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  name: 'vendorProduct',
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
    getVendorProduct(){
        var _this = this;
        var url = this.GLOBAL.hostIp;
        var val = $(event.currentTarget).val();     
        var UnitId =  _this.applyModel.unit;
        this.$http.post(url+"/VendorSetting/JsonGetVendorProduct",{"unitId":UnitId,"productId":val},{emulateJSON: true,credentials: true}).then(response => {
            var body = response.body;
               if (body.isSuccess) {
                var data = body.data;
                   _this.applyModel.otherName = data.fullName;
                   _this.applyModel.className = data.category;
                   _this.applyModel.use = data.isUsing;
               };                
              }, response => {
                // error callback
              });
    },
    submitApply(){        
        //验证必填框是否填写      
        var _this = this;
        var url = this.GLOBAL.hostIp;
       
         this.$validator.validateAll().then(() => {
        // eslint-disable-next-line
      var data = {
            VendorId:_this.$parent.$data.currentVendorId,
            UnitId: _this.applyModel.unit,
            ProductId:_this.applyModel.product,
            RegistrationId:_this.applyModel.registrationId,
            ExpirationDate:_this.applyModel.expirationDate,
            IsActive:true
         }         
         // 发送http请求
         this.$http.post(url+"/VendorSetting/SaveVendorProduct",data,{emulateJSON: true,credentials: true}).then(response => {
                
              }, response => {
                // error callback
              });
      $("#hospitalProductsInfo").modal("toggle")
      }).catch(() => {
        // eslint-disable-next-line
       
      });
         //
         
      
    },
  }
}
</script>
<style>  
</style>