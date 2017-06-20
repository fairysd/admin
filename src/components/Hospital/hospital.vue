<template>
    <div class="hostipal row">
        <div class="col-sm-12">
            <div class="col-sm-3  title">
                <h4>院方</h4>
                <input type="text" class="form-control" v-model="searchmsg">
                <button data-target="#hospitalInfo" @click="cleardata" data-toggle="modal" class="btn btn-primary" id="btnAdd">新增</button>
            </div>
            <div class="col-sm-2  col-sm-push-7 search">
                <button @click="serchHospital()" class="btn btn-primary">查询</button>
            </div>
        </div>
        <div class="col-sm-12">
            <table id="hospitalList" class="table table-striped">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>描述</th>
                        <th>缩写代码</th>
                        <th style="width:150px">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in hostipallist">
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
                                    <li>
                                        <a href="#" data-target="#edithospitalInfo" data-toggle="modal" class="edit" @click="editHospital(item.id)">编辑</a>
                                    </li>
                                    <li>
                                        <a href="#" data-target="#receipts" data-toggle="modal" class="receipts" @click="receipts(item.id)">发票信息</a>
                                    </li>
                                    <li>
                                        <a href="#" data-target="#hospitalProductsInfo" data-toggle="modal" class="products" @click="applypProduct(item.id)">申请产品</a>
                                    </li>
                                    <li>
                                        <a href="#" data-target="#auditingProductsModal" data-toggle="modal" class="auditing" @click="auditingProduct(item.id)">审核产品</a>
                                    </li>
                                    <li>
                                        <a href="#" data-target="#formApproveList" data-toggle="modal" class="approveList" @click="approveList(item.id)">审核列表</a>
                                    </li>
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
        </div>
        <!-- 增加modal start-->
        <addHospital></addHospital> 
        <!-- 增加modal end-->
         <!-- 编辑modal start-->
        <editHospital></editHospital>
        <!-- 编辑modal end-->
        <!-- 联系信息modal start-->
        <contactInfo></contactInfo>
        <!-- 联系信息modal end-->
        <!-- 开票信息modal start-->
        <receipts></receipts>
        <!-- 开票信息modal end-->
        <!-- 申请产品modal start-->
        <applyProduct></applyProduct>
        <!-- 申请产品modal end-->
        <!-- 产品审核modal start-->
        <auditingProduct></auditingProduct>
        <!-- 产品审核modal end-->
        <!-- 审核列表modal start-->
        <approveList></approveList>        
        <!-- 审核列表modal end
        <relativeHospital></relativeHospital>-->
  </div>
</template>
<script>
 import addHospital from './AddHospital'
 import editHospital from './editHospital'
 import contactInfo from './contactInfo'
 import receipts from './receipts'
 import applyProduct from './applyProduct'
 import auditingProduct from './auditingProduct'
 import approveList from './approveList'
import relativeHospital from './relative'

export default {   
  name: 'hostipal',
  components: {addHospital,editHospital,contactInfo,receipts,applyProduct,auditingProduct,approveList,relativeHospital},
  data () {
    return {
      isAdmin:"",
      current:"",
      showItem:"",
      allpage:"",
      searchmsg: '',
      hostipallist:[],     
      hospitalInfos:{
          hospitalName:{
            name:"",
            iserror:false
          },
          hospitalDesc:"",
          hospitalAbbr:"",
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
      applyProduct:[],
      auditingProducts:{
        auditingHostipals:[],
        auditingProducts:[]
      },
      systemFunctionsInfos:[],
      receiptModel:[],
      auditingProductsId:"",
      applyProductHospitalId:""
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
        this.$http.post(url+"/HospitalSetting/JsonQuery",{"condition":""},{emulateJSON: true,credentials: true}).then(response => {
          var body = response.body;
          if (body.isSuccess) {
            var data = body.data;
            _this.hostipallist = data;
          };
      }, response => {
             // var status = response.status;
             // if (status == "404") {
             //  alert("长时间未操作，请重新登陆")
             //  this.$router.push('/login')
             // };
              });
         this.$http.post(url+'/Main/JsonMenus',{},{emulateJSON: true,credentials:true}).then(response => {               
                // get body data                                  
                var _this = this;
                var body = response.body;   
                if (body.isSuccess) {  
                this.isAdmin = body.data.loginInfo.isAdmin;
                };
                
              })
    

  },
  methods:{
    //按下新增按钮。清空缓存数据
    cleardata(){
        this.hospitalInfos={
          hospitalName:{
            name:"",
            iserror:false
          },
          hospitalDesc:"",
          hospitalAbbr:"",
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
                    _this.hospitalInfos.contactName.name = data.ContactPerson;
                    _this.hospitalInfos.contactAddress= data.Address;
                    _this.hospitalInfos.contactMethod1= data.ContactWay1;
                    _this.hospitalInfos.contactMethod2= data.ContactWay1;
                    _this.hospitalInfos.contactMethod3= data.ContactWay1;
                    _this.hospitalInfos.contactMethod4= data.ContactWay1;      
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
      if (searchmsg === "") {
        alert("请输入查询关键词")
      }else{
        this.$http.post(url+"/HospitalSetting/Query",{"condition":searchmsg},{emulateJSON: true,credentials: true}).then(response => {
          var body = response.body;
          if (body.isSuccess) {
            var data = body.data;
            _this.hostipallist = data;
          };
      })
    }
    },
    //获取医院信息进行编辑
    editHospital(id){
        var _this = this;
        var url = this.GLOBAL.hostIp;
        this.$http.post(url+'/HospitalSetting/QueryHospitalById',{"id":id},{emulateJSON: true,credentials: true}).then(response => {
            var body = response.body;
               if (body.IsSuccess) {
                    _this.hospitalInfos.hospitalName.name = body.Name;
                    _this.hospitalInfos.hospitalDesc = body.Description;
                    _this.hospitalInfos.hospitalAbbr = body.ShortCode;
                    _this.hospitalInfos.contactName.name = body.ContactInfo.ContactPerson;
                    _this.hospitalInfos.contactAddress = body.ContactInfo.Address;
                    _this.hospitalInfos.contactMethod1 = body.ContactInfo.ContactWay1;
                    _this.hospitalInfos.contactMethod2 = body.ContactInfo.ContactWay2;
                    _this.hospitalInfos.contactMethod3 = body.ContactInfo.ContactWay3;
                    _this.hospitalInfos.contactMethod4 = body.ContactInfo.ContactWay4;
                    _this.hospitalInfos.hostipalId =  body.Id;
               };                
              }, response => {
                // error callback
              });
    },
    //申请产品，获取申请单位列表和产品列表 
    applypProduct(id){
      var _this = this;
      var url = this.GLOBAL.hostIp;
       this.$http.post(url+"/HospitalSetting/JsonHospitalProducts",{hospitalId:id},{emulateJSON: true,credentials: true}).then(response => {
            var body = response.body;
            if (body.isSuccess) {
              _this.applyProduct = body.data;
              _this.auditingProductsId = data.hospitalId;
            } else{};
              }, response => {
                // error callback
              });
    },
    
    //审核产品列表
    auditingProduct(id){
        this.auditingProducts = [];
        var _this = this;
        var url = this.GLOBAL.hostIp;
        this.$http.post(url+"/HospitalSetting/JsonAuditingProducts",{hospitalId:id},{emulateJSON: true,credentials: true}).then(response => {
            var body = response.body;
            if (body.isSuccess) {
              var data = body.data;
              _this.auditingProducts =[];
              _this.auditingProducts = data.vendors;
              _this.auditingProductsId = data.hospitalId;
            } else{};
              }, response => {
                // error callback
              });
    },   
    //审核产品，获取对应供应商提供的产品
    approveList(id){
        var _this = this;
        var url = this.GLOBAL.hostIp;
        this.$http.post(url+"/HospitalSetting/JsonFormApproveList",{hospitalId:id},{emulateJSON: true,credentials: true}).then(response => {            
              var body = response.body;
              
              }, response => {
                // error callback
                console.log("error")
              });
    },
    //根据医院id获取票据信息
    receipts(id){
      var url = this.GLOBAL.hostIp;
      var _this = this;
        this.$http.post(url+"/HospitalSetting/Receipts",{hospitalId:id},{emulateJSON: true,credentials: true}).then(response => {
          var body = response.body;
          if (body.isSuccess) {
            var data = body.data;
            _this.receiptModel = data.receipts;
          };
      })
    },
    relFunction(id){
        var _this = this;        
        var url = this.GLOBAL.hostIp; 
              this.$http.post(url+"/SystemFunction/GetPrivilegesAdmin",{unitId:id},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data   
                var body = response.body;
                if (body.isSuccess) {
                var   data = body.data.functions;                  
                _this.systemFunctionsInfos = data; 
                } else{};
                console.log(data)   
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
#hospitalList {
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
 #hospitalInfo, #contactInfo, #hospitalProductsInfo, #auditingProductsModal, #formApproveList, #edithospitalInfo, #receipts, #systemFunctionsInfo{
  text-align: left;
 }
 #contactInfo .form-inline>.row, #hospitalInfo .form-inline>.row, #hospitalProductsInfo .form-inline>.row, #formApproveList .form-inline>.row, #edithospitalInfo .form-inline>.row #systemFunctionsInfo .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 }
 .require-label{
  color: red;
 }
 #hospitalInfo .form-control,#hospitalProductsInfo .form-control, #formApproveList .form-control, #edithospitalInfo .form-control, #systemFunctionsInfo .form-control{
  width: 100%;
 }
 #contactInfo .form-control-static{
  padding-top: 0;
 }
 input.form-control.haserror{
    border: 1px solid #DC143C;
 }
  #systemFunctionsInfo span{
  color: #000;
 }
 #systemFunctionsInfo .name{
    width: 30%;
    display: inline-block;
 }
 #systemFunctionsInfo .operation{
  display:inline-block;
 }
 #systemFunctionsInfo #systemFunctions .item{
  border-bottom: 1px solid #eeeeee;
 }
 #systemFunctions .titles span{
  display: inline-block;
 }
 #systemFunctions .titles span.fun-name{
  width: 31%;
 }
</style>