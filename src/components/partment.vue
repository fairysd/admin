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
                <a href="#" class="btn btn-primary edit" data-target="#hospitalUnitInfo" data-toggle="modal">编辑</a>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu"><li><a href="#" data-target="#contactInfo" data-toggle="modal" class="contactInfo">联系信息</a></li><li><a href="#" data-target="#systemFunctionsInfo" data-toggle="modal" class="systemFunctions">关联功能</a></li></ul>
            </div>
        </td>
    </tr></tbody>
    </table>
    <div id="pageList" class="text-right"><nav><ul class="pagination"><li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li><li class="active"><a href="#" page="1">1</a></li><li class="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li></ul></nav></div>
</div>
<!-- 新增modal start -->
<div class="modal fade in" id="hospitalUnitInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">院方单位</h4>
            </div>
            <div class="modal-body forms">
                <div class="form-inline">
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">名称</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-10">
                            <input type="text" id="name" class="form-control" placeholder="名称" v-model="partmentModel.name.name" v-bind:class="{haserror:(partmentModel.name.iserror)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">描述</label>
                        </div>
                        <div class="col-sm-10">
                            <input type="text" id="description" class="form-control" placeholder="描述" v-model="partmentModel.desc">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">开票信息</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <select id="receipt" class="form-control" v-model="partmentModel.tickets.name" v-bind:class="{haserror:(partmentModel.tickets.iserror)}">
                                <option value="">请选择发票抬头</option>
                            <option value="7d463995-5007-4922-9adc-0dafc9a45ed9">普通发票</option></select>
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">业务类型</label>
                        </div>
                        <div class="col-sm-4">
                            <select id="businessType" class="form-control" v-model="partmentModel.type">
                                <option value="1">使用单位</option>
                                <option value="2">库房</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">缩写代码</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="shortCode" class="form-control" placeholder="缩写代码" maxlength="50" v-model="partmentModel.abbr">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系人</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactPerson" class="form-control" placeholder="联系人" maxlength="50" v-model="partmentModel.contactName.name" v-bind:class="{haserror:(partmentModel.contactName.iserror)}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">地址</label>
                        </div>
                        <div class="col-sm-10">
                            <input type="text" id="address" class="form-control" placeholder="地址" maxlength="50" v-model="partmentModel.contactAddress">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系方式1</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactWay1" class="form-control" placeholder="联系方式1" maxlength="50" v-model="partmentModel.contactMethod1">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系方式2</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactWay2" class="form-control" placeholder="联系方式2" maxlength="50" v-model="partmentModel.contactMethod2">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系方式3</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactWay3" class="form-control" placeholder="联系方式3" maxlength="50" v-model="partmentModel.contactMethod3">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系方式4</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="contactWay4" class="form-control" placeholder="联系方式4" maxlength="50" v-model="partmentModel.contactMethod4">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnConfirm" @click="addPartment">确认</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose">关闭</button>
            </div>
        </div>
    </div>
</div>
<!-- 新增modal end -->
<!-- 联系信息modal start -->
<div class="modal fade in" id="contactInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">联系人信息</h4>
            </div>
            <div class="modal-body forms">
                 <div class="form-inline">
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系人</label>
                        </div>
                        <div class="col-sm-4">
                            <p class="form-control-static" v-text="contactInfo.contactName"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">地址</label>
                        </div>
                        <div class="col-sm-10">
                            <p class="form-control-static" v-text="contactInfo.contactAddress"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系方式1</label>
                        </div>
                        <div class="col-sm-4">
                            <p class="form-control-static" v-text="contactInfo.contactMethod1"></p>
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系方式2</label>
                        </div>
                        <div class="col-sm-4">
                            <p class="form-control-static" v-text="contactInfo.contactMethod2"></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系方式3</label>
                        </div>
                        <div class="col-sm-4">
                            <p class="form-control-static" v-text="contactInfo.contactMethod3"></p>
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系方式4</label>
                        </div>
                        <div class="col-sm-4">
                            <p class="form-control-static" v-text="contactInfo.contactMethod4"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<!-- 联系信息modal end -->
<!-- 关联功能modal start -->
<div class="modal fade in" id="systemFunctionsInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none; padding-left: 17px;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">权限维护</h4>
            </div>
            <div class="modal-body forms">
              <div id="systemFunctions" class="system-function">
                <div class="titles">
                  <span class="fun-name">功能名</span>
                  <span class="fun-query" style="display:none;">查看</span>
                  <span class="fun-query">操作</span>
                </div>
                <div v-for='item in systemFunctionsInfos' style="padding-left: 0px;">
                  <span class="name" v-bind:id="item.functionId" v-text="item.functionname"></span>                
                <div class="item" style="padding-left: 30px;" v-for="operation in item.operations">
                  <span class="name" v-bind:id="operation.operationId" v-text="operation.operationname">库房盘查</span>
                  <div class="operation">
                    <input type="checkbox" class="query" value="query" style="display:none">            
                    <input type="checkbox" value="operate"></div>
                </div>                
              </div>              
            </div>
            </div>
            <div class="modal-footer">
                <label id="error" class="label-danger hidden">请输入红框标出的是必填项！</label>
                <button type="button" id="btnConfirm" class="btn btn-primary">确认</button>
                <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<!-- 关联功能modal end -->
  </div>
</template>

<script>
export default {
  name: 'partment',
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
      systemFunctionsInfos:[
        {
          functionname:'院方',
          functionId:'Hospital',
          operations:[
            {
              operationname:'库房盘查',
              operationId:'CheckingScan'
            },
            {
              operationname:'库存',
              operationId:'CheckingScan'
            },
          ]
        },
        {
          functionname:'院方',
          functionId:'Hospital',
          operations:[
            {
              operationname:'库房盘查',
              operationId:'CheckingScan'
            },
            {
              operationname:'库存',
              operationId:'CheckingScan'
            },
          ]
        },
        {
          functionname:'院方',
          functionId:'Hospital',
          operations:[
            {
              operationname:'库房盘查',
              operationId:'CheckingScan'
            },
            {
              operationname:'库存',
              operationId:'CheckingScan'
            },
          ]
        }
      ],
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
      //添加医院部门
      addPartment(){
              //验证必填框是否填写      
        if (this.partmentModel.name.name =="") {
                this.partmentModel.name.iserror = true;
        }else{
            this.partmentModel.name.iserror = false;
        };
        if (this.partmentModel.tickets.name =="") {
                this.partmentModel.tickets.iserror = true;
        }else{
            this.partmentModel.tickets.iserror = false;
        };
        if (this.partmentModel.contactName.name =="") {
                this.partmentModel.contactName.iserror = true;
        }else{
            this.partmentModel.contactName.iserror = false;
        };
    var isclick = this.partmentModel.name.iserror||this.partmentModel.contactName.iserror||this.partmentModel.tickets.iserror;
      if(!isclick){
        this.partmentlist.push({
          name:this.partmentModel.name.name,
          description:this.partmentModel.hospitalDesc,
          abbr:this.partmentModel.hospitalAbbr,
          tickets:this.partmentModel.tickets.name,
          type:this.partmentModel.type,
          contactName:this.partmentModel.contactName.name,
          contactAddress:this.partmentModel.contactAddress,
          contactMethod1:this.partmentModel.contactMethod1,
          contactMethod2:this.partmentModel.contactMethod2,
          contactMethod3:this.partmentModel.contactMethod3,
          contactMethod4:this.partmentModel.contactMethod4,
          hostipalId:this.partmentModel.hostipalId       
      });
      $("#hospitalUnitInfo").modal("toggle")
      }; 
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
     #hospitalUnitInfo .form-inline>.row, #contactInfo .form-inline>.row, #systemFunctionsInfo .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 }
 .require-label{
  color: red;
 }
 #hospitalUnitInfo .form-control,#contactInfo .form-control, #systemFunctionsInfo .form-control{
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
