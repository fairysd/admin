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
                                    <option v-for="item in this.$parent.$data.auditingProducts.auditingHostipals" v-bind:value="item.hostipalValue" v-text="item.hostipalName" ></option>
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
                                <tr v-for="item in this.$parent.$data.auditingProducts.auditingProducts">
                                    <td v-text="item.productName"></td>
                                    <td>
                                        <input type="checkbox" @click="clickSubmit(item.productValue)"></td>
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
        
    }
  },
  methods:{
    applyList(){
        var val = $(event.currentTarget).val();
        var _this = this.$parent.$data;
        this.$http.get('./static/auditingProduct.json',{params:{val:val}}).then(response => {            
              var data = response.body;
              if (data.auditingStasus) {
                _this.auditingProducts.auditingProducts = data.auditingProducts;
              };
              }, response => {
                // error callback
                console.log("error")
              });
    },
    clickSubmit(val){
        // 发送http请求，发送产品的value值确认
    }
  }
}
</script>
<style>  
</style>