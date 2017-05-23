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
            <a href="#" class="btn btn-primary edit" data-target="#editProductInfo" data-toggle="modal" @click="editProduct(item.productId)">编辑</a>
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
    allpage:13,
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