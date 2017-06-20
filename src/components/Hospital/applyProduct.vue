<template>
     <div class="modal fade in" id="hospitalProductsInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">申请产品</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">申请单位</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <select class="form-control" required="" id="units" v-model="applyModel.partment.value" v-bind:class="{haserror:(applyModel.partment.iserror)}">
                                        <option value="">请选择申请单位</option>
                                        <option v-for="item in $parent.$data.applyProduct.units" v-bind:value="item.id" v-text="item.name"></option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">产品</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <select class="form-control" required="" id="products" v-on:change="applyProductBind" v-model="applyModel.product.value" v-bind:class="{haserror:(applyModel.product.iserror)}">
                                        <option value="">请选择产品</option>
                                        <option v-for="product in $parent.$data.applyProduct.products" v-bind:value="product.id" v-text="product.name"></option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">使用中</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="checkbox" id="isActive" checked="" v-model="applyModel.use"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">别名</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="alias" class="form-control" placeholder="别名" maxlength="50" v-model="applyModel.otherName"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分类</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="category" class="form-control" placeholder="分类" maxlength="30" required="" v-model="applyModel.className"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">检验入库</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="checkbox" id="needCheck" v-model="applyModel.needCheck"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分装</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="checkbox" id="needSplit" v-model="applyModel.needSplit"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">分装份数</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="splitCopies" class="form-control" placeholder="分装份数" maxlength="10" v-model="applyModel.splitCopies"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分装单位</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="splitUnit" class="form-control" placeholder="分装单位" maxlength="10" v-model="applyModel.splitUnit"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">分装包装容量</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="splitCapacity" class="form-control" placeholder="分装包装容量" maxlength="10" v-model="applyModel.splitCapacity"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分装包装数量</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="miniSplitNumber" class="form-control" placeholder="分装包装数量" maxlength="10" v-model="applyModel.miniSplitNumber"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">赠送数量</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="donateCount" class="form-control" placeholder="赠送数量" maxlength="10" v-model="applyModel.donateCount"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">赠送基数</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="donateBase" class="form-control" placeholder="赠送基数" maxlength="10" v-model="applyModel.donateBase"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">有效天数</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="validDays" class="form-control" placeholder="有效天数" maxlength="5" v-model="applyModel.validDays"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">到货天数</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="arrivalDays" class="form-control" placeholder="到货天数" maxlength="5" v-model="applyModel.arrivalDays"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">定价</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="price" class="form-control" placeholder="定价" maxlength="15" required="" v-model="applyModel.price.value" v-bind:class="{haserror:(applyModel.price.iserror)}"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">大包装定价</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="packagePrice" class="form-control-static"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label id="error" class="label-danger" v-bind:class="{hidden:!(this.applyModel.partment.iserror||this.applyModel.price.iserror||this.applyModel.product.iserror)}">请填写完整的信息，再确认！</label>
                        <button type="button" class="btn btn-primary" id="btnConfirm" @click="submitApply">确认</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose">关闭</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  name: 'applyProduct',
  data () {
    return {     
        applyModel:{
            partment:{
                value:"",
                iserror:false
            },
            product:{
                value:"",
                iserror:false
            },
            use:true,
            otherName:"",
            className:"",
            needCheck:false,
            needSplit:false,
            splitCopies:"",
            splitUnit:"",
            splitCapacity:"",
            miniSplitNumber:"",
            donateCount:"",
            donateBase:"",
            validDays:"",
            arrivalDays:"",
            price:{
                value:"",
                iserror:false
            }
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
    applyProductBind(){
        var _this = this;
        var url = this.GLOBAL.hostIp;
        var val = $(event.currentTarget).val();     
        var UnitId =  _this.applyModel.partment.value
        this.$http.post(url+"/HospitalSetting/JsonGetHospitalProduct",{"unitId":UnitId,"productId":val},{emulateJSON: true,credentials: true}).then(response => {
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
       if (this.applyModel.partment.value =="") {
                this.applyModel.partment.iserror = true;
        }else{
            this.applyModel.partment.iserror = false;
        };
        if (this.applyModel.product.value =="") {
                this.applyModel.product.iserror = true;
        }else{
            this.applyModel.product.iserror = false;
        };
        if (this.applyModel.price.name =="") {
                this.applyModel.price.iserror = true;
        }else{
            this.applyModel.price.iserror = false;   
        };
    var isclick = this.applyModel.partment.iserror||this.applyModel.price.iserror||this.applyModel.product.iserror;
      if(!isclick){
         //
         var data = {
            HospitalId:_this.$parent.$data.applyProductHospitalId,
            UnitId: _this.applyModel.partment.value,
            ProductId:_this.applyModel.product.value,
            Category:_this.applyModel.className,
            Alias:_this.applyModel.otherName,
            NeedCheck:_this.applyModel.needCheck,
            NeedSplit:_this.applyModel.needSplit,
            SplitCopies:_this.applyModel.splitCopies,
            SplitUnit:_this.applyModel.splitUnit,
            SplitCapacity:_this.applyModel.splitCapacity,
            MiniSplitNumber:_this.applyModel.miniSplitNumber,
        //    GrantUnitCount:_this.applyModel.,
         //   OrderUnitCount:_this.applyModel.,
            DonateCount:_this.applyModel.donateCount,
            DonateBase:_this.applyModel.donateBase,
            ValidDays:_this.applyModel.validDays,
            ArrivalDays:_this.applyModel.arrivalDays,
            Price:_this.applyModel.price.value,
            PackagePrice:"",
            IsActive:true
         }         
         // 发送http请求
         this.$http.post(url+"/HospitalSetting/SaveHospitalProduct",data,{emulateJSON: true,credentials: true}).then(response => {
                
              }, response => {
                // error callback
              });
      $("#hospitalProductsInfo").modal("toggle")
      }; 
    },
  }
}
</script>
<style>  
</style>