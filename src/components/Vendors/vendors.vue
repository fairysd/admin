<template>
    <div class="hostipal row">
        <div class="col-sm-12">
            <div class="col-sm-3  title">
                <h4>供应商</h4>
                <input type="text" class="form-control" v-model="searchmsg">
                <button data-target="#vendorInfo" @click="addVendor" data-toggle="modal" class="btn btn-primary" id="btnAdd">新增</button>
            </div>
            <div class="col-sm-2  col-sm-push-7 search">
                <button @click="serchHospital()" class="btn btn-primary">查询</button>
            </div>
        </div>
        <div class="col-sm-12">
            <table id="vendorList" class="table table-striped">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>描述</th>
                        <th>缩写代码</th>
                        <th style="width:150px">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in vendorList">
                        <td v-text="item.name"></td>
                        <td v-text="item.description"></td>
                        <td v-text="item.shortCode"></td>
                        <td>
                            <div class="btn-group">
                                <a href="#" class="btn btn-primary contactInfo" data-toggle="modal" data-target="#contactInfo" v-bind:hostipalId="item.id" v-on:click="displayContactInfo(item.contactId)">联系信息</a>
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="caret"></span>
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a href="#" class="edit" data-target="#editVendorInfo" data-toggle="modal" @click="editVendor(item.id)">编辑</a></li>
                                    <li><a href="#" class="products" data-target="#vendorProductInfo" data-toggle="modal" @click="vendorProduct(item.id)">关联产品</a></li>
                                    <li><a href="#" class="hospitals" data-target="#vendorHospitalsInfo" data-toggle="modal" @click="vendorHospital(item.id)">关联院方</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
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
        <!-- 新增供应商 -->
        <addVendor></addVendor>
        <!-- 联系信息 -->
        <contactInfo></contactInfo>
        <!-- 编辑 -->
        <editVendor></editVendor>
        <!-- 关联产品 -->
        <vendorProduct></vendorProduct>
        <!-- 关联院方 -->
        <vendorHospital></vendorHospital>
        </div>

  </div>
</template>
<script>
import addVendor from './addVendor'
import contactInfo from './contactInfo'
import editVendor from './editVendor'
import vendorProduct from './vendorProduct'
import vendorHospital from './vendorHospital'
export default {   
  name: 'vendors',
  components: {addVendor,contactInfo,editVendor,vendorProduct,vendorHospital},
  data () {
    return {

      current:"",
      showItem:"",
      allpage:"",
      searchmsg: '',
      vendorList:[],     
      vendorInfos:{
          vendorName:{
            name:"",
            iserror:false
          },
          vendorDesc:"",
          vendorAbbr:"",
          contactName:
          {
            name:"",
            iserror:false
          },
          contactAddress:'',
          contactMethod1:'',
          contactMethod2:'',
          contactMethod3:'',
          contactMethod4:''
      },
      vendorProducts:{},
      vendorHospitalInfo:{},
      applyProductInfo:{
        inUse:true,
        otherName:"",
        className:""
      },
     currentVendorId:""
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
  //  获取医院数据
     var url = this.GLOBAL.hostIp;
      var _this = this;
      // var hospitallist = this.hostipallist;
      
        this.$http.post(url+"/VendorSetting/QueryVendors",{"condition":""},{emulateJSON: true,credentials: true}).then(response => {
          var body = response.body;
          if (body.isSuccess) {
            var data = body.data;
            _this.vendorList = data;
          };
      }, response => {
             // var status = response.status;
             // if (status == "404") {
             //  alert("长时间未操作，请重新登陆")
             //  this.$router.push('/login')
             // };
              });
    

  },
  methods:{
    //按下新增按钮。清空缓存数据
    addVendor(){
        this.vendorInfos={
          vendorName:{
            name:"",
            iserror:false
          },
          vendorDesc:"",
          vendorAbbr:"",
          contactName:
          {
            name:"",
            iserror:false
          },
          contactAddress:'',
          contactMethod1:'',
          contactMethod2:'',
          contactMethod3:'',
          contactMethod4:''
      }
    },
    //联系信息，发送医院id获取该医院联系信息并展现
    displayContactInfo(id){
        var _this = this; 
        var url = this.GLOBAL.hostIp;
              this.$http.post(url+"/HospitalSetting/GetContactInfo",{"id":id},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data                    
                var data = response.body;        
                    _this.vendorInfos.contactName.name = data.ContactPerson;
                    _this.vendorInfos.contactAddress= data.Address;
                    _this.vendorInfos.contactMethod1= data.ContactWay1;
                    _this.vendorInfos.contactMethod2= data.ContactWay1;
                    _this.vendorInfos.contactMethod3= data.ContactWay1;
                    _this.vendorInfos.contactMethod4= data.ContactWay1;      
              }, response => {
                // error callback
              });
            
    },   
    //医院查询
    //发送关键词  返回结果
    serchHospital(){      
      var searchmsg = this.searchmsg;
      var url = this.GLOBAL.hostIp;
      var _this = this;
      // var hospitallist = this.hostipallist;
      
        this.$http.post(url+"/VendorSetting/QueryVendors",{"condition":searchmsg},{emulateJSON: true,credentials: true}).then(response => {
          var body = response.body;
          if (body.isSuccess) {
            var data = body.data;
            _this.vendorList = data;
          };
      })
    
    },
    //获取医院信息进行编辑
    editVendor(id){
        var _this = this;
        var url = this.GLOBAL.hostIp;
        this.$http.post(url+'/HospitalSetting/QueryHospitalById',{"id":id},{emulateJSON: true,credentials: true}).then(response => {
            var body = response.body;
               if (body.IsSuccess) {
                    _this.vendorInfos.vendorName.name = body.Name;
                    _this.vendorInfos.vendorDesc = body.Description;
                    _this.vendorInfos.vendorAbbr = body.ShortCode;
                    _this.vendorInfos.contactName.name = body.ContactInfo.ContactPerson;
                    _this.vendorInfos.contactAddress = body.ContactInfo.Address;
                    _this.vendorInfos.contactMethod1 = body.ContactInfo.ContactWay1;
                    _this.vendorInfos.contactMethod2 = body.ContactInfo.ContactWay2;
                    _this.vendorInfos.contactMethod3 = body.ContactInfo.ContactWay3;
                    _this.vendorInfos.contactMethod4 = body.ContactInfo.ContactWay4;
                    _this.vendorInfos.hostipalId =  body.Id;
               };                
              }, response => {
                // error callback
              });
    },
    //申请产品，获取申请单位列表和产品列表 
    vendorProduct(id){
        var _this = this;
        var url = this.GLOBAL.hostIp;
        this.$http.post(url+'/VendorSetting/JsonVendorProducts',{"id":id},{emulateJSON: true,credentials: true}).then(response => {
            var body = response.body;
              if (body.isSuccess) {
                _this.vendorProducts = body.data;
                _this.currentVendorId = id;
              }}, response => {
                // error callback
              });
    },  
    vendorHospital(id){
         var _this = this; 
        var url = this.GLOBAL.hostIp;
              this.$http.post(url+"/VendorSetting/JsonVendorHospitals",{"id":id},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data                    
                var body = response.body;
                if (body.isSuccess) {
                    _this.vendorHospitalInfo = body.data;
                } else{};        
                       
              }, response => {
                // error callback
              });
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
#vendorList {
  text-align: left;
}
.hostipal .dropdown-menu{
  min-width: 120px;
}
.hostipal .title{
  text-align: left;
  padding-left: 0;  
}
 .hostipal .title h4{
  font-family: '宋体'; 
  font-size: 18px;  
  font-weight: bold;
 }
 .hostipal .title button{
  margin-top: 10px;
 }
 .hostipal .search{
  margin-top: 35px;
  text-align: right;
  padding-right: 0;
 }
 #vendorInfo, #contactInfo, #vendorProductInfo, #auditingProductsModal, #vendorHospitalsInfo, #editVendorInfo, #receipts{
  text-align: left;
 }
 #contactInfo .form-inline>.row, #vendorInfo .form-inline>.row, #vendorProductInfo .form-inline>.row, #vendorHospitalsInfo .form-inline>.row, #editVendorInfo .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 }
 .require-label{
  color: red;
 }
 #vendorInfo .form-control,#vendorProductInfo .form-control, #vendorHospitalsInfo .form-control, #editVendorInfo .form-control{
  width: 100%;
 }
 #contactInfo .form-control-static{
  padding-top: 0;
 }
 input.form-control.haserror{
    border: 1px solid #DC143C;
 }
</style>