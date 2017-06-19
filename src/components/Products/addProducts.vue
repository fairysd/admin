<template>
     <div class="modal fade" id="productInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
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
                            <input type="text" id="name" class="form-control" required="" placeholder="名称" maxlength="50" v-model="$parent.$data.productModel.name.value" v-bind:class="{haserror:($parent.$data.productModel.name.iserror)}">
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
                            <input type="text" id="miniPackageSpec" class="form-control" placeholder="最小包装规格" maxlength="50" v-model="$parent.$data.productModel.miniPackageSpec">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">最小包装单位</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniPackageUnit" class="form-control" required="" placeholder="最小包装单位" maxlength="10" v-model="$parent.$data.productModel.miniPackageUnit.value" v-bind:class="{haserror:($parent.$data.productModel.miniPackageUnit.iserror)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">含最小包装数</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniPackageCount" class="form-control" required="" placeholder="含最小包装数" maxlength="10" v-model="$parent.$data.productModel.miniPackageCount.value" v-bind:class="{haserror:($parent.$data.productModel.miniPackageCount.iserror)}">
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
                            <label class="control-label">注册证号</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="registerNumber" class="form-control" required="" placeholder="注册证号" maxlength="10" v-model="$parent.$data.productModel.registerNumber" >
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">有效日期</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="validDate" class="form-control" placeholder="有效日期" maxlength="10" v-model="$parent.$data.productModel.validDate">
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
                <label id="error" class="label-danger" v-bind:class="{hidden:!($parent.$data.productModel.name.iserror||$parent.$data.productModel.miniPackageUnit.iserror||$parent.$data.productModel.miniPackageCount.iserror)}">请输入红框标出的是必填项！</label>
                <button type="button" id="btnConfirm" class="btn btn-primary" @click="applyAddProduct">确认</button>
                <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'addProducts',
  data () {
    return {             
    }
  },
  methods:{
     applyAddProduct(){     
        var url = this.GLOBAL.hostIp;         
              //验证必填框是否填写      
        if (this.$parent.$data.productModel.name.value =="") {
                this.$parent.$data.productModel.name.iserror = true;
        }else{
            this.$parent.$data.productModel.name.iserror = false;
        };
        if (this.$parent.$data.productModel.miniPackageUnit.value =="") {
                this.$parent.$data.productModel.miniPackageUnit.iserror = true;
        }else{
            this.$parent.$data.productModel.miniPackageUnit.iserror = false;
        };
        if (this.$parent.$data.productModel.miniPackageCount.value =="") {
                this.$parent.$data.productModel.miniPackageCount.iserror = true;
        }else{
            this.$parent.$data.productModel.miniPackageCount.iserror = false;
        };
    var isclick = this.$parent.$data.productModel.name.iserror||this.$parent.$data.productModel.miniPackageUnit.iserror||this.$parent.$data.productModel.miniPackageCount.iserror;
      if(!isclick){
         var data = {
            id:0,
            Name:this.$parent.$data.productModel.name.value,
            FullName:this.$parent.$data.productModel.wholeName,
            ShortCode:this.$parent.$data.productModel.abbr,
            Brand:this.$parent.$data.productModel.brand,
            MiniPackageSpec:this.$parent.$data.productModel.miniPackageSpec,
            MiniPackageUnit:this.$parent.$data.productModel.miniPackageUnit.value,
            MiniPackageCount:this.$parent.$data.productModel.miniPackageCount.value,
            PackageUnit:this.$parent.$data.productModel.standardUnit,
            Category:this.$parent.$data.productModel.class,
            IsLocal:this.$parent.$data.productModel.domestic
      };
       this.$http.post(url+"/Product/Save",data,{emulateJSON: true}).then(response => {               
                // get body data                    
              alert("添加成功")
                              
              }, response => {
                // error callback
              });
      $("#productInfo").modal("toggle")
      }; 
    },
    }
}
</script>
<style>  
</style>