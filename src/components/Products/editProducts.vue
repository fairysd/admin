<template>
     <div class="modal fade" id="editProductInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">产品</h4>
            </div>
            <div class="modal-body forms">
                <div class="form-inline">
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">名称</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input v-validate="'required'" name="name" v-bind:class="{'haserror': errors.has('name')}" type="text" id="name" class="form-control" required="" placeholder="名称" maxlength="50" v-model="$parent.$data.productModel.name.value" >
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">全称</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="fullName" class="form-control" placeholder="全称" maxlength="100" v-model="$parent.$data.productModel.wholeName">
                        </div>
                    </div>
                     <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">注册证号</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input v-validate="'required'" name="registerNumber" v-bind:class="{'haserror': errors.has('registerNumber')}" type="text" id="name" class="form-control" required="" placeholder="注册证号" maxlength="50" v-model="$parent.$data.productModel.registerNumber">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">有效日期</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input v-validate="'required'" name="validDate" v-bind:class="{'haserror': errors.has('validDate')}" type="text" id="fullName" class="form-control" placeholder="有效日期" maxlength="100" v-model="$parent.$data.productModel.validDate">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">缩写代码</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="shortCode" class="form-control" placeholder="缩写代码" maxlength="50" v-model="$parent.$data.productModel.abbr">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">品牌</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="brand" class="form-control" placeholder="品牌" maxlength="50" v-model="$parent.$data.productModel.brand">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">最小包装规格</label>
                        </div>
                        <div class="col-sm-4">
                            <input  type="text" id="miniPackageSpec" class="form-control" placeholder="最小包装规格" maxlength="50" v-model="$parent.$data.productModel.miniPackageSpec">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">最小包装单位</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input v-validate="'required'" name="miniPackageUnit" v-bind:class="{'haserror': errors.has('miniPackageUnit')}" type="text" id="miniPackageUnit" class="form-control" required="" placeholder="最小包装单位" maxlength="10" v-model="$parent.$data.productModel.miniPackageUnit.value" >
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">含最小包装数</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input v-validate="'required'" name="miniPackageCount" v-bind:class="{'haserror': errors.has('miniPackageCount')}" type="text" id="miniPackageCount" class="form-control" required="" placeholder="含最小包装数" maxlength="10" v-model="$parent.$data.productModel.miniPackageCount.value" >
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">标准包装单位</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="packageUnit" class="form-control" placeholder="标准包装单位" maxlength="10" v-model="$parent.$data.productModel.standardUnit">
                        </div>
                    </div>                 
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">分类</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="category" class="form-control" placeholder="分类" maxlength="30" v-model="$parent.$data.productModel.class">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">国产</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="checkbox" id="isLocal" checked="checked" v-model="$parent.$data.productModel.domestic">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <label id="error" class="label-danger"><span v-show="errors.has('name')||errors.has('registerNumber')||errors.has('validDate')||errors.has('miniPackageUnit')||errors.has('miniPackageCount')" class="help is-danger">请输入红框中的必填项</span></label>
                <button type="button" id="btnConfirm" class="btn btn-primary" @click="applyEditProduct">确认</button>
                <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'editProducts',
  data () {
    return {             
    }
  },
  methods:{
      applyEditProduct(){          
      var url = this.GLOBAL.hostIp;    
              //验证必填框是否填写    
              this.$validator.validateAll().then(() => {
        // eslint-disable-next-line
        var data = {
        Id:$parent.$data.productModel.id,
        Name:$parent.$data.productModel.name.value,
        FullName:$parent.$data.productModel.wholeName,
        ShortCode:$parent.$data.productModel.abbr,
        Brand:$parent.$data.productModel.brand,
        MiniPackageSpec:$parent.$data.productModel.miniPackageSpec,
        MiniPackageUnit:$parent.$data.productModel.miniPackageUnit.value,
        MiniPackageCount:$parent.$data.productModel.miniPackageCount.value,
        PackageUnit:$parent.$data.productModel.standardUnit,
        Category:$parent.$data.productModel.class,
        IsLocal:$parent.$data.productModel.domestic,
        RegisterNumber:$parent.$data.productModel.registerNumber,
        ValidDate:$parent.$data.productModel.validDate
      };
       this.$http.post(url+"/Product/Save",data,{emulateJSON: true,credentials: true}).then(response => {             
                // get body data                    
              console.log("修改成功")                              
              }, response => {
                // error callback
              });
      $("#editProductInfo").modal("toggle")
      }).catch(() => {
        // eslint-disable-next-line        
      });  
        
       
      
    },

    }
}
</script>
<style>  
</style>