<template>
  <div id="productMain">
    <div class="module-title-bar">
        <label class="title">产品</label>
    </div>
    <div class="form-inline searchbox">
        <div class="form-group">
            <label for="formNo" class="sr-only">产品</label>
            <input type="text" id="condition" class="form-control" placeholder="产品">
        </div>
        <button class="btn btn-primary pull-right" id="btnQuery">查询</button>
        <br style="clear:both;">
    </div>
    <div class="vertical-margin-1em">
        <button class="btn btn-primary" id="btnAdd" data-target="#productInfo" data-toggle="modal" @click="clearData">新增</button>
        <table id="productList" class="table table-striped">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>全称</th>
                    <th class="col-80">缩写代码</th>
                    <th>品牌</th>
                    <th class="col-80">最小包装规格</th>
                    <th class="col-80">最小包装单位</th>
                    <th class="col-100">含最小包装数</th>
                    <th class="col-100">标准包装单位</th>
                    <th class="col-100">分类</th>
                    <th class="col-60">国产</th>
                    <th class="col-two-operation">操作</th>
                </tr>
            </thead>
            <tbody><tr v-for="item in productList">
        <td v-text="item.name"></td>
        <td v-text="item.wholeName"></td>
        <td v-text="item.abbr"></td>
        <td v-text="item.brand"></td>
        <td v-text="item.miniPackageSpec"></td>
        <td v-text="item.miniPackageUnit"></td>
        <td v-text="item.miniPackageCount"></td>
        <td v-text="item.standardUnit"></td>
        <td v-text="item.class"></td>
        <td v-text="item.domestic"></td>
        <td>
            <a href="#" class="btn btn-primary edit" data-target="#productInfo" data-toggle="modal" @click="editProduct(item.productId)">编辑</a>
        </td>
    </tr></tbody>
        </table>
        <div id="pageList" class="text-right"><nav><ul class="pagination"><li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li><li class="active"><a href="#" page="1">1</a></li><li><a href="#" page="2">2</a></li><li><a href="#" page="3">3</a></li><li><a href="#" page="4">4</a></li><li><a href="#" page="5">5</a></li><li><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li></ul></nav></div>
    </div>
<!--     //新增modal -->
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
                            <input type="text" id="name" class="form-control" required="" placeholder="名称" maxlength="50" v-model="productModel.name.value" v-bind:class="{haserror:(productModel.name.iserror)}">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">全称</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="fullName" class="form-control" placeholder="全称" maxlength="100" v-model="productModel.wholeName">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">缩写代码</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="shortCode" class="form-control" placeholder="缩写代码" maxlength="50" v-model="productModel.abbr">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">品牌</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="brand" class="form-control" placeholder="品牌" maxlength="50" v-model="productModel.brand">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">最小包装规格</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniPackageSpec" class="form-control" placeholder="最小包装规格" maxlength="50" v-model="productModel.miniPackageSpec">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">最小包装单位</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniPackageUnit" class="form-control" required="" placeholder="最小包装单位" maxlength="10" v-model="productModel.miniPackageUnit.value" v-bind:class="{haserror:(productModel.miniPackageUnit.iserror)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">含最小包装数</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniPackageCount" class="form-control" required="" placeholder="含最小包装数" maxlength="10" v-model="productModel.miniPackageCount.value" v-bind:class="{haserror:(productModel.miniPackageCount.iserror)}">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">标准包装单位</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="packageUnit" class="form-control" placeholder="标准包装单位" maxlength="10" v-model="productModel.standardUnit">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">分类</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="category" class="form-control" placeholder="分类" maxlength="30" v-model="productModel.class">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">国产</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="checkbox" id="isLocal" checked="checked" v-model="productModel.domestic">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <label id="error" class="label-danger" v-bind:class="{hidden:!(this.productModel.name.iserror||this.productModel.miniPackageUnit.iserror||this.productModel.miniPackageCount.iserror)}">请输入红框标出的是必填项！</label>
                <button type="button" id="btnConfirm" class="btn btn-primary" @click="applyAddProduct">确认</button>
                <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<!--  新增modal end -->
<!--   编辑modal -->
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
                            <input type="text" id="name" class="form-control" required="" placeholder="名称" maxlength="50" v-model="productModel.name.value" v-bind:class="{haserror:(productModel.name.iserror)}">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">全称</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="fullName" class="form-control" placeholder="全称" maxlength="100" v-model="productModel.wholeName">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">缩写代码</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="shortCode" class="form-control" placeholder="缩写代码" maxlength="50" v-model="productModel.abbr">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">品牌</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="brand" class="form-control" placeholder="品牌" maxlength="50" v-model="productModel.brand">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">最小包装规格</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniPackageSpec" class="form-control" placeholder="最小包装规格" maxlength="50" v-model="productModel.miniPackageSpec">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">最小包装单位</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniPackageUnit" class="form-control" required="" placeholder="最小包装单位" maxlength="10" v-model="productModel.miniPackageUnit.value" v-bind:class="{haserror:(productModel.miniPackageUnit.iserror)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">含最小包装数</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniPackageCount" class="form-control" required="" placeholder="含最小包装数" maxlength="10" v-model="productModel.miniPackageCount.value" v-bind:class="{haserror:(productModel.miniPackageCount.iserror)}">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">标准包装单位</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="packageUnit" class="form-control" placeholder="标准包装单位" maxlength="10" v-model="productModel.standardUnit">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">分类</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="category" class="form-control" placeholder="分类" maxlength="30" v-model="productModel.class">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">国产</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="checkbox" id="isLocal" checked="checked" v-model="productModel.domestic">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <label id="error" class="label-danger" v-bind:class="{hidden:!(this.productModel.name.iserror||this.productModel.miniPackageUnit.iserror||this.productModel.miniPackageCount.iserror)}">请输入红框标出的是必填项！</label>
                <button type="button" id="btnConfirm" class="btn btn-primary" @click="applyEditProduct">确认</button>
                <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<!--  编辑modal end -->
    </div>

</template>

<script>
export default {
  name: 'products',
  data () {
    return {
        searchmsg:"",
      productList:[],
      productModel:{
        name:{
          value:"",
          iserror:false
        },
        wholeName:"",
        abbr:"",
        brand:"",
        miniPackageSpec:"",
        miniPackageUnit:{
          value:"",
          iserror:false
        },
        miniPackageCount:{
          value:"",
          iserror:false
        },
        standardUnit:"",
        class:"",
        domestic:true
      }      
    }
  },
  mounted:function(){
    //获取医院数据
      this.$http.get('./static/productList.json').then(response => {               
                // get body data                                  
                var _this = this;               
                var data = response.body;
                _this.productList = data;
                
              }, response => {
                // error callback
              });      

  },
  methods:{
    //添加产品
    //清楚缓存
    clearData(){
      var _this = this;
      _this.productModel={
        name:{
          value:"",
          iserror:false
        },
        wholeName:"",
        abbr:"",
        brand:"",
        miniPackageSpec:"",
        miniPackageUnit:{
          value:"",
          iserror:false
        },
        miniPackageCount:{
          value:"",
          iserror:false
        },
        standardUnit:"",
        class:"",
        domestic:true
      } 
    },
    applyAddProduct(){              
              //验证必填框是否填写      
        if (this.productModel.name.value =="") {
                this.productModel.name.iserror = true;
        }else{
            this.productModel.name.iserror = false;
        };
        if (this.productModel.miniPackageUnit.value =="") {
                this.productModel.miniPackageUnit.iserror = true;
        }else{
            this.productModel.miniPackageUnit.iserror = false;
        };
        if (this.productModel.miniPackageCount.value =="") {
                this.productModel.miniPackageCount.iserror = true;
        }else{
            this.productModel.miniPackageCount.iserror = false;
        };
    var isclick = this.productModel.name.iserror||this.productModel.miniPackageUnit.iserror||this.productModel.miniPackageCount.iserror;
      if(!isclick){
        this.productList.push({
        name:this.productModel.name.value,
        wholeName:this.productModel.wholeName,
        abbr:this.productModel.abbr,
        brand:this.productModel.brand,
        miniPackageSpec:this.productModel.miniPackageSpec,
        miniPackageUnit:this.productModel.miniPackageUnit.value,
        miniPackageCount:this.productModel.miniPackageCount.value,
        standardUnit:this.productModel.standardUnit,
        class:this.productModel.class,
        domestic:this.productModel.domestic
      });
      $("#productInfo").modal("toggle")
      }; 
    },
    //编辑产品信息
    //传入产品id获取该产品信息
     editProduct(id){
        var _this = this;
        var id = id;
        this.$http.get('./static/editProductInfo.json',{params:{id:id}}).then(response => {
            var data = response.body;
               if (data.editinfostatus) {
                    var editinfo = data.editinfobody; 
                    _this.productModel.name.value = editinfo.name;
                    _this.productModel.wholeName = editinfo.wholeName;
                    _this.productModel.abbr = editinfo.abbr;
                    _this.productModel.brand = editinfo.brand;
                    _this.productModel.miniPackageSpec = editinfo.miniPackageSpec;
                    _this.productModel.miniPackageUnit.value = editinfo.miniPackageUnit;
                    _this.productModel.miniPackageCount.value = editinfo.miniPackageCount;
                    _this.productModel.standardUnit = editinfo.standardUnit;
                    _this.productModel.class = editinfo.class;
                    _this.productModel.domestic =  editinfo.domestic;
               };                
              }, response => {
                // error callback
              });
    },
    applyEditProduct(){              
              //验证必填框是否填写      
        if (this.productModel.name.value =="") {
                this.productModel.name.iserror = true;
        }else{
            this.productModel.name.iserror = false;
        };
        if (this.productModel.miniPackageUnit.value =="") {
                this.productModel.miniPackageUnit.iserror = true;
        }else{
            this.productModel.miniPackageUnit.iserror = false;
        };
        if (this.productModel.miniPackageCount.value =="") {
                this.productModel.miniPackageCount.iserror = true;
        }else{
            this.productModel.miniPackageCount.iserror = false;
        };
    var isclick = this.productModel.name.iserror||this.productModel.miniPackageUnit.iserror||this.productModel.miniPackageCount.iserror;
      if(!isclick){
        this.$http.get('url').then(response => {
            console.log("请求发送");
                        
              }, response => {
                // error callback
              });
      
      $("#editProductInfo").modal("toggle")
      }; 
    },
    serchPartment(){      
      var searchmsg = this.searchmsg;
      var productList = this.productList;
      for (var i = 0; i <= productList.length+1; i++) {
        productList.forEach(function(item,index,array){        
        if (searchmsg !== "") {
          if(!(productList[index].name.indexOf(searchmsg) >= 0)){
            array.splice(index, 1);
            }
          };      
        })     
      };      
    },
  }
}
</script>
<style>
#productMain{
  text-align: left;
  font-family: '宋体';
  line-height: 30px;
}
#productMain .searchbox{
  margin-bottom: 10px;
}
 #productMain .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 } 
 #productMain .form-control{
  width: 100%;
 }
 #productMain .form-control-static{
  padding-top: 0;
 }
 input.form-control.haserror{
    border: 1px solid #DC143C;
 }
</style>