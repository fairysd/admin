<template>
  <div class="hostipal row">
    <div class="col-sm-12">
      <div class="col-sm-3  title">
        <h4>院方</h4>
        <input type="text" class="form-control">
        <button data-target="#hospitalInfo" data-toggle="modal" class="btn btn-primary" id="btnAdd">新增</button>
      </div>
      <div class="col-sm-2  col-sm-push-7 search">
        <button class="btn btn-primary">查询</button>
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
                      <li v-for="operation in item.operations">
                          <a href="#" :class='operation.typeclass' v-text="operation.type" v-bind:data-target="operation.modalId" data-toggle="modal" ></a>
                      </li>      
                    </ul>
                  </div>
              </td>
          </tr>
        </tbody>
    </table>
    <div id="pageList" class="text-right"><nav><ul class="pagination"><li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li><li class="active"><a href="#" page="1">1</a></li><li class="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li></ul></nav></div>
    </div>
    <!-- 增加modal start-->
    <div class="modal fade" id="hospitalInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
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
                            <input v-model="hospitalInfos.hospitalName" type="text" id="name" class="form-control" placeholder="名称" maxlength="50">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label" for="formNo">描述</label>
                        </div>
                        <div class="col-sm-10">
                            <input v-model="hospitalInfos.hospitalDesc" type="text" id="description" class="form-control" placeholder="描述" maxlength="200">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">缩写代码</label>
                        </div>
                        <div class="col-sm-4">
                            <input v-model="hospitalInfos.hospitalAbbr" type="text" id="shortCode" class="form-control" placeholder="缩写代码" maxlength="50">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系人</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input v-model="hospitalInfos.contactName" type="text" id="contactPerson" class="form-control" placeholder="联系人" maxlength="50">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">地址</label>
                        </div>
                        <div class="col-sm-10">
                            <input v-model="hospitalInfos.contactAddress" type="text" id="address" class="form-control" placeholder="地址" maxlength="50">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系方式1</label>
                        </div>
                        <div class="col-sm-4">
                            <input v-model="hospitalInfos.contactMethod1" type="text" id="contactWay1" class="form-control" placeholder="联系方式1" maxlength="50">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系方式2</label>
                        </div>
                        <div class="col-sm-4">
                            <input v-model="hospitalInfos.contactMethod2" type="text" id="contactWay2" class="form-control" placeholder="联系方式2" maxlength="50">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">联系方式3</label>
                        </div>
                        <div class="col-sm-4">
                            <input v-model="hospitalInfos.contactMethod3" type="text" id="contactWay3" class="form-control" placeholder="联系方式3" maxlength="50">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">联系方式4</label>
                        </div>
                        <div class="col-sm-4">
                            <input v-model="hospitalInfos.contactMethod4" type="text" id="contactWay4" class="form-control" placeholder="联系方式4" maxlength="50">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <label id="error" class="label-danger " v-bind:class="{hidden:hospitalInfos.hospitalName&&hospitalInfos.contactName }">请输入红框标出的是必填项！</label>
                <button @click="addhospital()" type="button" id="btnConfirm" class="btn btn-primary">确认</button>
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
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
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
                                <input type="text" class="form-control" receipt-title="" placeholder="抬头">
                            </td>
                            <td>
                                <input type="text" class="form-control" receipt-tax="" placeholder="数字">
                            </td>
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
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
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
                            <select class="form-control" required="" id="products">
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
                            <input type="checkbox" id="isActive" checked="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">别名</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="alias" class="form-control" placeholder="别名" maxlength="50">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">分类</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="category" class="form-control" placeholder="分类" maxlength="30" required="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">检验入库</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="checkbox" id="needCheck">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">分装</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="checkbox" id="needSplit">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">分装份数</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="splitCopies" class="form-control" placeholder="分装份数" maxlength="10">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">分装单位</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="splitUnit" class="form-control" placeholder="分装单位" maxlength="10">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">分装包装容量</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="splitCapacity" class="form-control" placeholder="分装包装容量" maxlength="10">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">分装包装数量</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="miniSplitNumber" class="form-control" placeholder="分装包装数量" maxlength="10">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">赠送数量</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="donateCount" class="form-control" placeholder="赠送数量" maxlength="10">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">赠送基数</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="donateBase" class="form-control" placeholder="赠送基数" maxlength="10">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">有效天数</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="validDays" class="form-control" placeholder="有效天数" maxlength="5">
                        </div>
                        <div class="col-sm-2">
                            <label class="control-label">到货天数</label>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="arrivalDays" class="form-control" placeholder="到货天数" maxlength="5">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2">
                            <label class="control-label">定价</label>
                            <span class="require-label">*</span>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" id="price" class="form-control" placeholder="定价" maxlength="15" required="">
                        </div>
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
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="exampleModalLabel">产品审核</h4>
            </div>
            <div class="modal-body forms">
                <div class="row">
                    <div class="col-sm-2">
                        <label for="formNo">供应商</label>
                    </div>
                    <div class="col-sm-10">
                        <select class="form-control" id="vendors">
                            <option value="">请选择...</option>
                        <option v-for="item in auditingProducts.auditingHostipals" v-bind:value="item.hostipalValue" v-text="item.hostipalName"></option>
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
                            <td><input type="checkbox"></td>
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
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
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
                            <option value="orderAudit">订货审核</option><option value="inspectionAudit">验货审核</option><option value="moveAudit">移库审核</option></select>
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
                                <option value="1">申请人</option><option value="2">申请部门主管</option><option value="3">指定人员</option><option value="4">部门主管</option></select>
                            </td>
                            <td>
                                <div class="ui-widget">
                                    <input id="selectUnit" class="form-control hidden" autocomplete="off">
                                    <input id="selectManager" class="form-control hidden" autocomplete="off">
                                </div>
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
<!-- 审核列表modal end-->
  </div>
</template>
<script>
export default {
  name: 'hostipal',
  
  data () {
    return {
      msg: '这里是院方',
      hostipallist:[
        {
          name:'上海医院',
          description:'上海医院',
          abbr:'rjyy',
          contactName:'联系人',
          contactAddress:'联系地址',
          contactMethod1:'联系方式1',
          contactMethod2:'联系方式2',
          contactMethod3:'联系方式3',
          contactMethod4:'联系方式4',
          hostipalId:"hostipalone",
          operations:[
            {
              type:'编辑',
              typeclass:'edit',
              modalId:'#hospitalInfo'
            },
            {
              type:'发票信息',
              typeclass:'receipts',
              modalId:'#receipts'
            },
            {
              type:'申请产品',
              typeclass:'products',
              modalId:'#hospitalProductsInfo'
            },
            {
              type:'审核产品',
              typeclass:'auditing',
              modalId:'#auditingProductsModal'
            },
            {
              type:'审核列表',
              typeclass:'approveList',
              modalId:'#formApproveList'
            }
          ]         
        },
        {
          name:'上海医院',
          description:'上海医院',
          abbr:'rjyy',
          contactName:'联系人',
          contactAddress:'联系地址',
          contactMethod1:'联系方式1',
          contactMethod2:'联系方式2',
          contactMethod3:'联系方式3',
          contactMethod4:'联系方式4',
          hostipalId:"hostipaltwo",
          operations:[
            {
              type:'编辑',
              typeclass:'edit',
              modalId:'#hospitalInfo'
            },
            {
              type:'发票信息',
              typeclass:'receipts',
              modalId:'#receipts'
            },
            {
              type:'申请产品',
              typeclass:'products',
              modalId:'#hospitalProductsInfo'
            },
            {
              type:'审核产品',
              typeclass:'auditing',
              modalId:'#auditingProductsModal'
            },
            {
              type:'审核列表',
              typeclass:'approveList',
              modalId:'#formApproveList'
            }
          ]
        }
      ],     
      hospitalInfos:{
          hospitalName:"",
          hospitalDesc:"",
          hospitalAbbr:"",
          contactName:'',
          contactAddress:'',
          contactMethod1:'',
          contactMethod2:'',
          contactMethod3:'',
          contactMethod4:''
      },
      applyProduct:{
        applyHospitals:[
          {
            hostipalName:"上海医院",
            hostipalValue:"hospitalvalue"
          },
          {
            hostipalName:"苏州医院",
            hostipalValue:"hospitalvalue"
          },
          {
            hostipalName:"上海医院",
            hostipalValue:"hospitalvalue"
          }
        ],
        applyProducts:[
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'0.1ml八连排管125排平盖'
          },
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'0.1ml八连排管125排平盖'
          },
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'0.1ml八连排管125排平盖'
          },
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'0.1ml八连排管125排平盖'
          },
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'0.1ml八连排管125排平盖'
          }
        ]
      },
      auditingProducts:{
        auditingHostipals:[
          {
            hostipalName:"福建新大陆",
            hostipalValue:"208f0fd8-11ce-4bf1-9737-fa503c1e9d2a"
          },
          {
            hostipalName:"北京北方所",
            hostipalValue:"208f0fd8-11ce-4bf1-9737-fa503c1e9d2a"
          },
          {
            hostipalName:"苏州科晴生物",
            hostipalValue:"208f0fd8-11ce-4bf1-9737-fa503c1e9d2a"
          },{
            hostipalName:"上海誉莱医疗",
            hostipalValue:"208f0fd8-11ce-4bf1-9737-fa503c1e9d2a"
          },
          {
            hostipalName:"苏州明德生物科技有限公司",
            hostipalValue:"208f0fd8-11ce-4bf1-9737-fa503c1e9d2a"
          }
        ],
        auditingProducts:[
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'e601系统清洗液'          
          },
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'二次分杯管'          
          },
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'PCT（罗氏）'          
          },
          {
            productValue:'1E34625C-1EF9-4122-98EE-87B12F4DE6A1',
            productName:'PINP'          
          }
        ]
      }
    }
  },
  methods:{
    displayContactInfo(id){
      console.log(id)
    },
    addhospital(){
      this.hostipallist.push({
          name:this.hospitalInfos.hospitalName,
          description:this.hospitalInfos.hospitalDesc,
          abbr:this.hospitalInfos.hospitalAbbr,
          contactName:this.hospitalInfos.contactName,
          contactAddress:this.hospitalInfos.contactAddress,
          contactMethod1:this.hospitalInfos.contactMethod1,
          contactMethod2:this.hospitalInfos.contactMethod2,
          contactMethod3:this.hospitalInfos.contactMethod3,
          contactMethod4:this.hospitalInfos.contactMethod4,
          hostipalId:this.hospitalInfos.hospitalAbbr,
          operations:[
            {
              type:'编辑',
              typeclass:'edit',
              modalId:'#hospitalInfo'
            },
            {
              type:'发票信息',
              typeclass:'receipts',
              modalId:'#receipts'
            },
            {
              type:'申请产品',
              typeclass:'products',
              modalId:'#hospitalProductsInfo'
            },
            {
              type:'审核产品',
              typeclass:'auditing',
              modalId:'#auditingProductsModal'
            },
            {
              type:'审核列表',
              typeclass:'approveList',
              modalId:'#formApproveList'
            }
          ]    
      });
      $("#hospitalInfo").modal("toggle")
    }
  },
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
  margin-top: 20px;
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
</style>
