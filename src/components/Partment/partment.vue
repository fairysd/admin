<template>
  <div class="partment row">
    <div class="module-title-bar">
      <label class="title">院方单位</label>
    </div>
    <div class="form-inline">
        <div class="form-group">
            <label for="formNo">院方</label>
            <select class="form-control" id="hospitals">
            <option v-for="item in hospitals" v-bind:value="item.value" v-text="item.name"></option></select>
        </div>
        <div class="form-group">
            <label for="formNo" class="sr-only">单位信息</label>
            <input type="text" class="form-control" placeholder="单位信息" v-model="searchmsg">
        </div>
        <button class="btn btn-primary pull-right" id="btnQuery" @click="serchPartment">查询</button>
        <br style="clear:both;">
    </div>
    <div style="margin:1em 0;">
    <button class="btn btn-primary" id="btnAdd" data-target="#hospitalUnitInfo" data-toggle="modal" @click="clearData">新增</button>
    <table id="hospitalUnitList" class="table table-striped">
        <thead>
            <tr>
                <th>名称</th>
                <th>描述</th>
                <th>缩写代码</th>
                <th>开票信息</th>
                <th style="width:50px;">税率</th>
                <th class="col-80">业务类型</th>
                <th style="width:100px;">操作</th>
            </tr>
        </thead>
        <tbody><tr v-for='item in partmentlist'>
        <td v-text='item.name'></td>
        <td v-text='item.description'></td>
        <td v-text='item.abbr'></td>
        <td v-text='item.contact'></td>
        <td v-text='item.interest'></td>
        <td v-text='item.description'></td>        
        <td>
            <div class="btn-group">
                <a href="#" class="btn btn-primary edit" data-target="#edithospitalUnitInfo" data-toggle="modal" @click="editPartment(item.partmentId)">编辑</a>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu"><li><a href="#" data-target="#contactInfo" data-toggle="modal" class="contactInfo" @click="displayContactInfo(item.partmentId)">联系信息</a></li><li><a href="#" data-target="#systemFunctionsInfo" data-toggle="modal" class="systemFunctions" @click="relFunction(item.partmentId)">关联功能</a></li></ul>
            </div>
        </td>
    </tr></tbody>
    </table>
    <div id="pageList" class="text-right"><nav><ul class="pagination"><li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li><li class="active"><a href="#" page="1">1</a></li><li class="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li></ul></nav></div>
</div>
<!-- 新增modal start -->
<addPartment></addPartment>
<!-- 新增modal end -->
<!-- 编辑modal start -->
<editPartment></editPartment>
<!-- 编辑modal end -->
<!-- 联系信息modal start -->
<contactInfo></contactInfo>
<!-- 联系信息modal end -->
<!-- 关联功能modal start -->
<relativePartment></relativePartment>
<!-- 关联功能modal end -->
  </div>
</template>

<script>
 import addPartment from './addPartment'
 import editPartment from './editPartment'
 import contactInfo from './contactInfo'
 import relativePartment from './relativePartment'
export default {
  name: 'partment',
  components: {addPartment,editPartment,contactInfo,relativePartment},
  data () {
    return {
      searchmsg: '',
      //院方单位数据模型
      partmentModel:{
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
      },
      hospitals:[],
      partmentlist:[],
      systemFunctionsInfos:[],
      contactInfo:{
        
      }
    }
  },
   mounted:function(){
    //获取可选医院列表和默认部门列表
      this.$http.get('./static/partment.json').then(response => {               
                // get body data                                  
                var _this = this;               
                var data = response.body;
                var partmentlist = data.partmentlist;
                var hostipalList = data.hospitals;
                  _this.hospitals = hostipalList;
                  _this.partmentlist = partmentlist;               
              }, response => {
                // error callback
              });  
  },
  methods:{
      //添加院方单位之前，清空缓存
      clearData(){
        this.partmentModel = {
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
      }
      },
      
    
       //部门查询
    serchPartment(){      
      var searchmsg = this.searchmsg;
      var partmentlist = this.partmentlist;
      for (var i = 0; i <= partmentlist.length+1; i++) {
        partmentlist.forEach(function(item,index,array){        
        if (searchmsg !== "") {
          if(!(partmentlist[index].name.indexOf(searchmsg) >= 0)){
            array.splice(index, 1);
            }
          };      
        })     
      };      
    },
    //获取部门息进行编辑
    editPartment(id){
        var _this = this;
        this.$http.get('./static/editPartmentInfo.json',{params:{id:id}}).then(response => {
            var data = response.body;
               if (data.editinfostatus) {
                    var editinfo = data.editinfobody;
                    _this.partmentModel.name.name = editinfo.name;
                    _this.partmentModel.desc = editinfo.description;
                    _this.partmentModel.abbr = editinfo.abbr;
                    _this.partmentModel.contactName.name = editinfo.contactName;
                    _this.partmentModel.contactAddress = editinfo.contactAddress;
                    _this.partmentModel.contactMethod1 = editinfo.contactMethod1;
                    _this.partmentModel.contactMethod2 = editinfo.contactMethod2;
                    _this.partmentModel.contactMethod3 = editinfo.contactMethod3;
                    _this.partmentModel.contactMethod4 = editinfo.contactMethod4;
                    _this.partmentModel.hostipalId =  editinfo.hostipalId;
                    _this.partmentModel.tickets.name = editinfo.tickets;
                    _this.partmentModel.type = editinfo.type;
               };                
              }, response => {
                // error callback
              });
    },
    //查看部门联系信息
     displayContactInfo(id){
        var _this = this;         
              this.$http.get('./static/contactInfo.json',{params:{id:id}}).then(response => {               
                // get body data
                console.log(response)      
                var data = response.body;
                if (data.infostatus) {
                    console.log(id)
                   var  infobody = data.infobody;
                    _this.contactInfo = infobody;
                };
                

              }, response => {
                // error callback
              });
            
    },
    //关联功能
    relFunction(id){
        var _this = this;         
              this.$http.get('./static/partmentFunctionInfo.json',{params:{id:id}}).then(response => {               
                // get body data
                console.log(response)      
                var data = response.body;
                _this.systemFunctionsInfos = data;
                

              }, response => {
                // error callback
              });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .partment{
      text-align: left;
      font-family: '宋体';
      line-height: 30px;
      padding-left: 15px;
      padding-right: 15px;
    }
    .partment .form-control.haserror{
      border: 1px solid #DC143C;
    }
    .partment .dropdown-menu{
    min-width: 100px;
  }
    .partment .module-title-bar{
      font-size: 18px;
      font-family: '宋体';
    }
     #hospitalUnitInfo .form-inline>.row, #edithospitalUnitInfo .form-inline>.row, #systemFunctionsInfo .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 }
 .require-label{
  color: red;
 }
 #hospitalUnitInfo .form-control, #edithospitalUnitInfo .form-control, #systemFunctionsInfo .form-control{
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
