<template>
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
                                    <option v-for="item in this.$parent.$data.auditingProducts" v-bind:value="item.id" v-text="item.name" ></option>
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
                                <tr v-for="item in productList">
                                    <td v-text="item.name"></td>
                                    <td>
                                        <input v-if="item.isAudit"  type="checkbox" checked @click="clickSubmit(item.productId,item.vendorId,item.isAudit,item.version)" >
                                        <input v-else  type="checkbox"  @click="clickSubmit(item.productId,item.vendorId,item.isAudit,item.version)" >
                                    </td>
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
</template>

<script>
export default {
  name: 'auditingProduct',
  
  data () {
    return {     
        auditingModel:{
            hospitalId:"",
            vendorId:""
        },
        productList:[],
        auditingProductModel:{
            HospitalId:"",
            productId:"",
            vendorId:"",
            isAudit:""
        }
    }
  },
  methods:{
    applyList(){
        this.productList=[];
        var val = $(event.currentTarget).val();
        var _this = this;
        var url = this.GLOBAL.hostIp;
        this.auditingModel.hospitalId = this.$parent.$data.auditingProductsId;
        this.auditingModel.vendorId = val;
        var data = this.auditingModel;
        this.$http.post(url+"/HospitalSetting/GetAuditingProducts",data,{emulateJSON: true,credentials: true}).then(response => {            
              var body = response.body;
                if (body.isSuccess) {
                    data = body.data;
                    _this.productList =  data;
                } else{};
              }, response => {
                // error callback
                console.log("error")
              });
    },
    clickSubmit(productId,vendorId,isAudit,version){
        var _this = this;
        var url = this.GLOBAL.hostIp;
        var data = {
            HospitalId:_this.auditingModel.hospitalId,
            productId:productId,
            vendorId:vendorId,
            isAudit:!isAudit,
            version:version+1
        }
         this.$http.post(url+"/HospitalSetting/SaveAuditingProduct",data,{emulateJSON: true,credentials: true}).then(response => {          
                var data = this.auditingModel;
                this.$http.post(url+"/HospitalSetting/GetAuditingProducts",data,{emulateJSON: true,credentials: true}).then(response => {            
                      var body = response.body;
                        if (body.isSuccess) {
                            data = body.data;
                            _this.productList =  data;
                        } else{};
                      })
             }, response => {
               // error callback
               console.log("error")
             });
    }
  }
}
</script>
<style>  
</style>