<template>
  <div class="vendorUnit row">
    <div class="module-title-bar">
      <label class="title">供应商单位</label>
    </div>
    <div class="form-inline">
        <div class="form-group">
            <label for="formNo">供应商</label>
            <select class="form-control" id="hospitals" v-model="searchInfo.parentId" v-on:change="getParentId()">
            <option v-for="item in vendorUnits" v-bind:value="item.id" v-text="item.name"></option></select>
        </div>
        <div class="form-group">
            <label for="formNo" class="sr-only">单位信息</label>
            <input type="text" class="form-control" placeholder="单位信息" v-model="searchInfo.condition">
        </div>
        <button class="btn btn-primary pull-right" id="btnQuery" @click="serchVendorUnit">查询</button>
        <br style="clear:both;">
    </div>
    <div style="margin:1em 0;">
    <button class="btn btn-primary" id="btnAdd" @click="clearData">新增</button>
    <table id="hospitalUnitList" class="table table-striped">
        <thead>
            <tr>
                <th>名称</th>
                <th>描述</th>
                <th>缩写代码</th>
                <th style="width:50px;">税率</th>
                <th class="col-80">业务类型</th>
                <th style="width:100px;">操作</th>
            </tr>
        </thead>
        <tbody><tr v-for='item in vendorUnitList'>
        <td v-text='item.name'></td>
        <td v-text='item.description'></td>
        <td v-text='item.shortCode'></td>
        <td v-text='item.tax'></td>
        <td v-text='item.vendorName'></td>        
        <td>
            <div class="btn-group">
                <a href="#" class="btn btn-primary edit" data-target="#editVendorUnitInfo" data-toggle="modal" @click="editPartment(item.id)">编辑</a>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu"><li><a href="#" data-target="#contactInfo" data-toggle="modal" class="contactInfo" @click="displayContactInfo(item.id)">联系信息</a></li><li><a href="#" data-target="#systemFunctionsInfo" data-toggle="modal" class="systemFunctions" @click="relFunction(item.id)">关联功能</a></li></ul>
            </div>
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
    <!-- 新增 -->
    <addVendorUnit></addVendorUnit>
    <!-- 编辑 -->
    <editVendorUnit></editVendorUnit>
    <!-- 联系信息 -->
    <contactInfo></contactInfo>
    <!-- 关联功能 -->
    <vendorUnitRelative></vendorUnitRelative>
  </div>
</template>

<script>
 import addVendorUnit from './addVendorUnit'
 import editVendorUnit from './editVendorUnit'
  import contactInfo from './contactInfo'
    import vendorUnitRelative from './vendorUnitRelative'
export default {
  name: 'partment',
  components: {addVendorUnit,editVendorUnit,contactInfo,vendorUnitRelative},
  data () {
    return {
      current:1,
    showItem:5,
    allpage:1,
    parentId:"",
      searchInfo:{
        parentId:"",
        condition:""
      },
      //院方单位数据模型
      vendorUnitModel:{
        name:{
            name:"",
            iserror:false
          },
        desc:"",
        abbr:"",
        contactName:{
            name:"",
            iserror:false
          },
        contactAddress:"",
        contactMethod1:"",
        contactMethod2:"",
        contactMethod3:"",
        contactMethod4:"",
        id:""
      },
      vendorUnits:[],
      vendorUnitList:[],
      systemFunctionsInfos:[],
      contactInfo:{},
      relUnitId:"",
      receiptInfo:{}
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
    //获取可选医院列表
      var url = this.GLOBAL.hostIp;
      var _this = this; 
      this.$http.post(url+'/VendorSetting/JsonVendorUnits',{},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data                
                var body = response.body;
                if (body.isSuccess) {                  
                var data = body.data;
                _this.vendorUnits = data;
                };
                            
              }, response => {
                // error callback
              });  
  },
  methods:{
      //添加院方单位之前，清空缓存
      clearData(){
        if (this.parentId == "") {
          alert("请选择要添加单位的医院");
          return false;
        }else{
        this.vendorUnitModel = {
        name:{
            name:"",
            iserror:false
          },
        desc:"",
        tickets:{
            name:"",
            iserror:false
          },
        type:"",
        abbr:"",
        contactName:{
            name:"",
            iserror:false
          },
        contactAddress:"",
        contactMethod1:"",
        contactMethod2:"",
        contactMethod3:"",
        contactMethod4:""
      };
$("#vendorUnitInfo").modal("toggle")
    };
        
      },
      
    getParentId(){
        var val = $(event.currentTarget).val();
        this.parentId = val;
    },
       //部门查询
       //发送查询关键字，返回查询结果
    serchVendorUnit(){      
       var searchmsg = this.searchInfo;
      var _this = this;
      var url = this.GLOBAL.hostIp;
      var hospitalId = this.parentId;
        this.$http.post(url+'/HospitalSetting/QueryUnits',searchmsg,{emulateJSON: true,credentials: true}).then(response => {
        var body = response.body;
        if (body.isSuccess) {
           _this.vendorUnitList = body.data;           
        };
      },response => {
                // error callback
              }); 
    },
    //获取部门息进行编辑
    editPartment(id){
        var _this = this;
        var url = this.GLOBAL.hostIp;
        this.$http.post(url+'/VendorSetting/UnitQueryById',{id:id},{emulateJSON: true,credentials: true}).then(response => {
            var body = response.body;            
               if (body.isSuccess) {
                    var editinfo = body.data;
                    _this.vendorUnitModel.name.name = editinfo.name;
                    _this.vendorUnitModel.desc = editinfo.description;
                    _this.vendorUnitModel.abbr = editinfo.shortCode;
                    _this.vendorUnitModel.contactName.name = editinfo.contactInfo.contactPerson;
                    _this.vendorUnitModel.contactAddress = editinfo.contactInfo.address;
                    _this.vendorUnitModel.contactMethod1 = editinfo.contactInfo.contactWay1;
                    _this.vendorUnitModel.contactMethod2 = editinfo.contactInfo.contactWay2;
                    _this.vendorUnitModel.contactMethod3 = editinfo.contactInfo.contactWay3;
                    _this.vendorUnitModel.contactMethod4 = editinfo.contactInfo.contactWay4;
                    _this.vendorUnitModel.id =  editinfo.id;

               };                
              }, response => {
                // error callback
              });
    },
    //查看部门联系信息
     displayContactInfo(id){
        var _this = this;
        var url = this.GLOBAL.hostIp;      
              this.$http.post(url+'/VendorSetting/UnitQueryById',{id:id},{emulateJSON: true,credentials: true}).then(response => {
            var body = response.body;
               if (body.isSuccess) {
                    var data = body.data;
                    _this.contactInfo = data.contactInfo;
               };                
              }, response => {
                // error callback
              });
            
    },
    //关联功能
    relFunction(id){
        var _this = this;        
        var url = this.GLOBAL.hostIp; 
              this.$http.post(url+"/SystemFunction/GetPrivilegesAdmin",{unitId:id},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data   
                var body = response.body;
                if (body.isSuccess) {
                var   data = body.data.functions;
                _this.relUnitId = body.data.unitId;                  
                _this.systemFunctionsInfos = data; 
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .vendorUnit{
      text-align: left;
      font-family: '宋体';
      line-height: 30px;
      padding-left: 15px;
      padding-right: 15px;
    }
    .vendorUnit .form-control.haserror{
      border: 1px solid #DC143C;
    }
    .vendorUnit .dropdown-menu{
    min-width: 100px;
  }
    .vendorUnit .module-title-bar{
      font-size: 18px;
      font-family: '宋体';
    }
     #vendorUnitInfo .form-inline>.row, #editVendorUnitInfo .form-inline>.row, #systemFunctionsInfo .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 }
 .require-label{
  color: red;
 }
 #vendorUnitInfo .form-control, #editVendorUnitInfo .form-control, #systemFunctionsInfo .form-control{
  width: 100%;
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
