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
                        <td v-text="item.abbr"></td>
                        <td>
                            <div class="btn-group">
                                <a href="#" class="btn btn-primary contactInfo" data-toggle="modal" data-target="#contactInfo" v-bind:hostipalId="item.hostipalId" v-on:click="displayContactInfo(item.hostipalId)">联系信息</a>
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="caret"></span>
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" data-target="#hospitalInfo" data-toggle="modal" class="edit" @click="editHospital(item.hostipalId)">编辑</a>
                                    </li>
                                    <li>
                                        <a href="#" data-target="#receipts" data-toggle="modal" class="receipts">发票信息</a>
                                    </li>
                                    <li>
                                        <a href="#" data-target="#hospitalProductsInfo" data-toggle="modal" class="products" @click="applypProduct(item.hostipalId)">申请产品</a>
                                    </li>
                                    <li>
                                        <a href="#" data-target="#auditingProductsModal" data-toggle="modal" class="auditing" @click="auditingProduct(item.hostipalId)">审核产品</a>
                                    </li>
                                    <li>
                                        <a href="#" data-target="#formApproveList" data-toggle="modal" class="approveList">审核列表</a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="pageList" class="text-right">
                <nav>
                    <ul class="pagination">
                        <li class="disabled">
                            <a href="#" aria-label="Previous">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        <li class="active">
                            <a href="#" page="1">1</a>
                        </li>
                        <li class="disabled">
                            <a href="#" aria-label="Next">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <!-- 增加modal start-->
        <div class="modal fade" id="hospitalInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">院方</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label" for="formNo">名称</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-10">
                                    <input v-model="hospitalInfos.hospitalName.name" type="text" id="name" class="form-control" v-bind:class="{haserror:(hospitalInfos.hospitalName.iserror)}" placeholder="名称" maxlength="50"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label" for="formNo">描述</label>
                                </div>
                                <div class="col-sm-10">
                                    <input v-model="hospitalInfos.hospitalDesc" type="text" id="description" class="form-control" placeholder="描述" maxlength="200"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">缩写代码</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="hospitalInfos.hospitalAbbr" type="text" id="shortCode" class="form-control" placeholder="缩写代码" maxlength="50"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系人</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="hospitalInfos.contactName.name" type="text" id="contactPerson" class="form-control" placeholder="联系人" maxlength="50" v-bind:class="{haserror:(hospitalInfos.contactName.iserror)}"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">地址</label>
                                </div>
                                <div class="col-sm-10">
                                    <input v-model="hospitalInfos.contactAddress" type="text" id="address" class="form-control" placeholder="地址" maxlength="50"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式1</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="hospitalInfos.contactMethod1" type="text" id="contactWay1" class="form-control" placeholder="联系方式1" maxlength="50"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式2</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="hospitalInfos.contactMethod2" type="text" id="contactWay2" class="form-control" placeholder="联系方式2" maxlength="50"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式3</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="hospitalInfos.contactMethod3" type="text" id="contactWay3" class="form-control" placeholder="联系方式3" maxlength="50"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式4</label>
                                </div>
                                <div class="col-sm-4">
                                    <input v-model="hospitalInfos.contactMethod4" type="text" id="contactWay4" class="form-control" placeholder="联系方式4" maxlength="50"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label id="error" class="label-danger" v-bind:class="{hidden:!(this.hospitalInfos.hospitalName.iserror||this.hospitalInfos.contactName.iserror)}">请输入红框标出的是必填项！</label>
                        <button @click="addhospital()" type="button" id="btnConfirm" class="btn btn-primary" v-bind:class="{disabled:(this.hospitalInfos.hospitalName.iserror&&this.hospitalInfos.contactName.iserror)}">确认</button>
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 增加modal end-->
        <!-- 联系信息modal start-->
        <div class="modal fade in" id="contactInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">联系人信息</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系人</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="hospitalInfos.contactName"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">地址</label>
                                </div>
                                <div class="col-sm-10">
                                    <p class="form-control-static" v-text="hospitalInfos.contactAddress"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式1</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="hospitalInfos.contactMethod1"></p>
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式2</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="hospitalInfos.contactMethod2"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式3</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="hospitalInfos.contactMethod3"></p>
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式4</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="hospitalInfos.contactMethod4"></p>
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
        <!-- 联系信息modal end-->
        <!-- 开票信息modal start-->
        <div class="modal fade in" id="receipts" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">开票信息</h4>
                    </div>
                    <div class="modal-body forms">
                        <table id="receiptList" class="table table-striped">
                            <thead>
                                <tr>
                                    <th>抬头</th>
                                    <th style="width:80px;">税点</th>
                                    <th style="width:50px;">操作</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <input type="text" class="form-control" receipt-title="" placeholder="抬头"></td>
                                    <td>
                                        <input type="text" class="form-control" receipt-tax="" placeholder="数字"></td>
                                    <td>
                                        <a href="#" id="btnAdd" class="btn btn-primary add">新增</a>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 开票信息modal end-->
        <!-- 申请产品modal start-->
        <div class="modal fade in" id="hospitalProductsInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">申请产品</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">申请单位</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <select class="form-control" required="" id="units">
                                        <option value="">请选择申请单位</option>
                                        <option v-for="item in applyProduct.applyHospitals" v-bind:value="item.hostipalValue" v-text="item.hostipalName"></option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">产品</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <select class="form-control" required="" id="products" v-on:change="applyProductBind">
                                        <option value="">请选择产品</option>
                                        <option v-for="product in applyProduct.applyProducts" v-bind:value="product.productValue" v-text="product.productName"></option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">使用中</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="checkbox" id="isActive" checked=""></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">别名</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="alias" class="form-control" placeholder="别名" maxlength="50" v-model="applyProductInfo.otherName"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分类</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="category" class="form-control" placeholder="分类" maxlength="30" required="" v-model="applyProductInfo.className"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">检验入库</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="checkbox" id="needCheck"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分装</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="checkbox" id="needSplit"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">分装份数</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="splitCopies" class="form-control" placeholder="分装份数" maxlength="10"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分装单位</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="splitUnit" class="form-control" placeholder="分装单位" maxlength="10"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">分装包装容量</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="splitCapacity" class="form-control" placeholder="分装包装容量" maxlength="10"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分装包装数量</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="miniSplitNumber" class="form-control" placeholder="分装包装数量" maxlength="10"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">赠送数量</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="donateCount" class="form-control" placeholder="赠送数量" maxlength="10"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">赠送基数</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="donateBase" class="form-control" placeholder="赠送基数" maxlength="10"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">有效天数</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="validDays" class="form-control" placeholder="有效天数" maxlength="5"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">到货天数</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="arrivalDays" class="form-control" placeholder="到货天数" maxlength="5"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">定价</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="price" class="form-control" placeholder="定价" maxlength="15" required=""></div>
                                <div class="col-sm-2">
                                    <label class="control-label">大包装定价</label>
                                </div>
                                <div class="col-sm-4">
                                    <p id="packagePrice" class="form-control-static"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <label id="error" class="label-danger hidden">请填写完整的信息，再确认！</label>
                        <button type="button" class="btn btn-primary" id="btnConfirm">确认</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnClose">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 申请产品modal end-->
        <!-- 产品审核modal start-->
        <div class="modal fade in" id="auditingProductsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">产品审核</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="formNo">供应商</label>
                            </div>
                            <div class="col-sm-10">
                                <select class="form-control" id="vendors" v-on:change="applyList">
                                    <option value="">请选择...</option>
                                    <option v-for="item in auditingProducts.auditingHostipals" v-bind:value="item.hostipalValue" v-text="item.hostipalName" ></option>
                                </select>
                            </div>
                        </div>
                        <table id="auditingProductList" class="table table-striped">
                            <thead>
                                <tr>
                                    <th>产品</th>
                                    <th style="width:80px;">审核</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in auditingProducts.auditingProducts">
                                    <td v-text="item.productName"></td>
                                    <td>
                                        <input type="checkbox"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 产品审核modal end-->
        <!-- 审核列表modal start-->
        <div class="modal fade in" id="formApproveList" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel">签核列表</h4>
                    </div>
                    <div class="modal-body forms">
                        <div class="form-inline">
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label" for="formNo">表单</label>
                                </div>
                                <div class="col-sm-10">
                                    <select id="auditForms" class="form-control">
                                        <option value=""></option>
                                        <option value="orderAudit">订货审核</option>
                                        <option value="inspectionAudit">验货审核</option>
                                        <option value="moveAudit">移库审核</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <table id="approveList" class="table table-striped">
                            <thead>
                                <tr>
                                    <th class="col-sm-2">序号</th>
                                    <th class="col-lg-2">审核人类型</th>
                                    <th>审核人</th>
                                    <th class="col-sm-2">操作</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>
                                        <select id="selectAuditForms" class="form-control">
                                            <option value="1">申请人</option>
                                            <option value="2">申请部门主管</option>
                                            <option value="3">指定人员</option>
                                            <option value="4">部门主管</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div class="ui-widget">
                                            <input id="selectUnit" class="form-control hidden" autocomplete="off">
                                            <input id="selectManager" class="form-control hidden" autocomplete="off"></div>
                                    </td>
                                    <td>
                                        <a href="#" id="selectSave" class="btn btn-primary">保存</a>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 审核列表modal end--> </div>
</template>
<script>
export default {
  name: 'hostipal',
  
  data () {
    return {
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
      applyProduct:{},
      auditingProducts:{
        auditingHostipals:[],
        auditingProducts:[]
      },
      applyProductInfo:{
        inUse:true,
        otherName:"",
        className:""
      },
    }
  },
  mounted:function(){
    //获取医院数据
      this.$http.get('./static/hospitalInfo.json').then(response => {               
                // get body data                                  
                var _this = this;               
                var data = response.body;
                var hospital = data.infobody;
                for (var i = 0; i < hospital.length; i++) {
                    _this.hostipallist.push(hospital[i])
                };
              }, response => {
                // error callback
              });      

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
        
              this.$http.get('./static/contactInfo.json',{params:{id:id}}).then(response => {               
                // get body data
                console.log(response)      
                var data = response.body;
                if (data.infostatus) {
                    console.log(id)
                   var  infobody = data.infobody;
                    _this.hospitalInfos.contactName = infobody.name;
                    _this.hospitalInfos.contactAddress= infobody.address;
                    _this.hospitalInfos.contactMethod1= infobody.type1;
                    _this.hospitalInfos.contactMethod2= infobody.type2;
                    _this.hospitalInfos.contactMethod3= infobody.type3;
                    _this.hospitalInfos.contactMethod4= infobody.type4;
                };
                

              }, response => {
                // error callback
              });
            
    },
    //添加医院
    addhospital(){        
        //验证必填框是否填写      
        if (this.hospitalInfos.hospitalName.name =="") {
                this.hospitalInfos.hospitalName.iserror = true;
        }else{
            this.hospitalInfos.hospitalName.iserror = false;
        };
        if (this.hospitalInfos.contactName.name =="") {
                this.hospitalInfos.contactName.iserror = true;
        }else{
            this.hospitalInfos.contactName.iserror = false;
        };
    var isclick = this.hospitalInfos.hospitalName.iserror||this.hospitalInfos.contactName.iserror;
      if(!isclick){
        this.hostipallist.push({
          name:this.hospitalInfos.hospitalName.name,
          description:this.hospitalInfos.hospitalDesc,
          abbr:this.hospitalInfos.hospitalAbbr,
          contactName:this.hospitalInfos.contactName.name,
          contactAddress:this.hospitalInfos.contactAddress,
          contactMethod1:this.hospitalInfos.contactMethod1,
          contactMethod2:this.hospitalInfos.contactMethod2,
          contactMethod3:this.hospitalInfos.contactMethod3,
          contactMethod4:this.hospitalInfos.contactMethod4,
          hostipalId:this.hospitalInfos.hostipalId       
      });
      $("#hospitalInfo").modal("toggle")
      };        
    },
    //医院查询
    serchHospital(){      
      var searchmsg = this.searchmsg;
      var hospitallist = this.hostipallist;
      for (var i = 0; i <= hospitallist.length+1; i++) {
        hospitallist.forEach(function(item,index,array){        
        if (searchmsg !== "") {
          if(!(hospitallist[index].name.indexOf(searchmsg) >= 0)){
            array.splice(index, 1);
            }
          };      
        })     
      };      
    },
    //获取医院信息进行编辑
    editHospital(id){
        var _this = this;
        this.$http.get('./static/editHospitalInfo.json',{params:{id:id}}).then(response => {
            var data = response.body;
               if (data.editinfostatus) {
                    var editinfo = data.editinfobody;
                    _this.hospitalInfos.hospitalName.name = editinfo.name;
                    _this.hospitalInfos.hospitalDesc = editinfo.description;
                    _this.hospitalInfos.hospitalAbbr = editinfo.abbr;
                    _this.hospitalInfos.contactName.name = editinfo.contactName;
                    _this.hospitalInfos.contactAddress = editinfo.contactAddress;
                    _this.hospitalInfos.contactMethod1 = editinfo.contactMethod1;
                    _this.hospitalInfos.contactMethod2 = editinfo.contactMethod2;
                    _this.hospitalInfos.contactMethod3 = editinfo.contactMethod3;
                    _this.hospitalInfos.contactMethod4 = editinfo.contactMethod4;
                    _this.hospitalInfos.hostipalId =  editinfo.hostipalId;
               };                
              }, response => {
                // error callback
              });
    },
    //申请产品，获取申请单位列表和产品列表
    applypProduct(id){
        var _this = this;

        this.$http.get('./static/applyProduct.json',{params:{id:id}}).then(response => {
            var data = response.body;
              if (data.applystatus) {
                _this.applyProduct = data.applyProduct;
              };
              }, response => {
                // error callback
              });
    },
    //根据产品选择获取产品绑定信息
    applyProductBind(){
        var _this = this;
        var val = $(event.currentTarget).val();
        this.$http.get('./static/applyProductInfo.json',{params:{val:val}}).then(response => {

            var data = response.body;
            if (data.applystatus) {
                _this.applyProductInfo.otherName = data.otherName;
                _this.applyProductInfo.className = data.class
            };
              
              }, response => {
                // error callback
              });
    },
    //审核产品列表
    auditingProduct(id){
        var _this = this;
        this.$http.get('./static/auditingProduct.json',{params:{id:id}}).then(response => {            
              var data = response.body;
              if (data.auditingStasus) {
                _this.auditingProducts.auditingHostipals = data.auditingHostipals;
              };
              }, response => {
                // error callback
                console.log("error")
              });
    },
    //审核产品，获取对应供应商提供的产品
    applyList(){
        var val = $(event.currentTarget).val();
        var _this = this;
        this.$http.get('./static/auditingProduct.json',{params:{val:val}}).then(response => {            
              var data = response.body;
              if (data.auditingStasus) {
                _this.auditingProducts.auditingProducts = data.auditingProducts;
              };
              }, response => {
                // error callback
                console.log("error")
              });
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
 #hospitalInfo, #contactInfo, #hospitalProductsInfo, #auditingProductsModal, #formApproveList{
  text-align: left;
 }
 #contactInfo .form-inline>.row, #hospitalInfo .form-inline>.row, #hospitalProductsInfo .form-inline>.row, #formApproveList .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 }
 .require-label{
  color: red;
 }
 #hospitalInfo .form-control,#hospitalProductsInfo .form-control, #formApproveList .form-control{
  width: 100%;
 }
 #contactInfo .form-control-static{
  padding-top: 0;
 }
 input.form-control.haserror{
    border: 1px solid #DC143C;
 }
</style>