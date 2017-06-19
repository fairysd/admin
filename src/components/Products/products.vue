<template>
  <div id="productMain">
    <div class="module-title-bar">
        <label class="title">产品</label>
    </div>
    <div class="form-inline searchbox">
        <div class="form-group">
            <label for="formNo" class="sr-only">产品</label>
            <input type="text" id="condition" class="form-control" placeholder="产品" v-model="searchmsg">
        </div>
        <button class="btn btn-primary pull-right" id="btnQuery" @click="serchProduct">查询</button>
        <br style="clear:both;">
    </div>
    <div class="vertical-margin-1em">
        <button class="btn btn-primary" id="btnAdd" data-target="#productInfo" data-toggle="modal" @click="clearData">新增</button>
        <table id="productList" class="table table-striped">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>全称</th>
                    <th>注册证号</th>
                    <th>有效日期</th>
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
        <td v-text="item.fullName"></td>
        <td v-text="item.registerNumber"></td>
        <td v-text="item.validDate"></td>
        <td v-text="item.shortCode"></td>
        <td v-text="item.brand"></td>
        <td v-text="item.miniPackageSpec"></td>
        <td v-text="item.miniPackageUnit"></td>
        <td v-text="item.miniPackageCount"></td>
        <td v-text="item.packageUnit"></td>
        <td v-text="item.category"></td>
        <td v-if="item.isLocal">是</td>
        <td v-else="item.isLocal">否</td>
        <td>
            <a href="#" class="btn btn-primary edit" data-target="#editProductInfo" data-toggle="modal" @click="editProduct(item.id)">编辑</a>
        </td>
    </tr></tbody>
        </table>
        <!-- 分页 -->
        <div id="pageList" class="text-right"><nav><ul class="pagination" >
            <li v-show="current != 1" @click="current-- && goto(current)" ><a href="#">上一页</a></li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <a href="#" >{{index}}</a>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="#" >下一页</a></li>
        </ul></nav>
        </div>
    </div>
<!--     //新增modal -->
    <addProducts></addProducts>
<!--  新增modal end -->
<!--   编辑modal -->
     <editProducts></editProducts>
<!--  编辑modal end -->
    </div>

</template>

<script>
 import addProducts from './addProducts'
 import editProducts from './editProducts'
export default {
    name: 'products',
    components: {addProducts,editProducts},
  data () {
    return {
    current:1,
    showItem:5,
    allpage:"",
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
        registerNumber:"",
        validDate:"",
        class:"",
        domestic:true
      }      
    }
  },
  computed:{
          pages:function(){
                var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
      },
  mounted:function(){
    //获取产品数据
    var _this = this;
    var url = this.GLOBAL.hostIp;
      this.$http.post(url+"/Product/Query",{},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data                                  
                var body = response.body;
                var page = body.pageInfo;
                var data = body.data;
                _this.allpage = page.pageCount;
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
   
    //编辑产品信息
    //传入产品id获取该产品信息
     editProduct(id){
        var _this = this;
        var id = id;
        var url = this.GLOBAL.hostIp;
        this.$http.post(url+"/Product/Edit",{"id":id},{emulateJSON: true}).then(response => {
            var body = response.body;
               if (body.isSuccess) {
                var data = body.data;
                    _this.productModel.name.value = data.name;
                    _this.productModel.wholeName = data.fullName;
                    _this.productModel.abbr = data.shortCode;
                    _this.productModel.brand = data.brand;
                    _this.productModel.miniPackageSpec = data.miniPackageSpec;
                    _this.productModel.miniPackageUnit.value = data.miniPackageUnit;
                    _this.productModel.miniPackageCount.value = data.miniPackageCount;
                    _this.productModel.standardUnit = data.packageUnit;
                    _this.productModel.class = data.category;
                    _this.productModel.domestic =  data.isLocal;
               };                
              }, response => {
                // error callback
              });
    },
       serchProduct(){      
      var searchmsg = this.searchmsg;
      var url = this.GLOBAL.hostIp;
      var _this = this;
      if (searchmsg === "") {
        alert("请输入查询关键词")
      }else{
        this.$http.post(url+"/Product/Query",{"condition":searchmsg},{emulateJSON: true}).then(response => {        
          var body = response.body;
          if (body.isSuccess) {
            var data = body.data;
            _this.productList = data;
          };
      });      
      }
    },
    goto:function(index){
          if(index == this.current) return;
            this.current = index;
           // 发送页面请求
        }
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