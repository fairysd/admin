<template>
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
                                        <option v-for="item in this.$parent.$data.applyProduct.applyHospitals" v-bind:value="item.hostipalValue" v-text="item.hostipalName"></option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">产品</label>
                                    <span class="require-label">*</span>
                                </div>
                                <div class="col-sm-4">
                                    <select class="form-control" required="" id="products" v-on:change="applyProductBind">
                                        <option value="">请选择产品</option>
                                        <option v-for="product in this.$parent.$data.applyProduct.applyProducts" v-bind:value="product.productValue" v-text="product.productName"></option>
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
                                    <input type="text" id="alias" class="form-control" placeholder="别名" maxlength="50" v-model="this.$parent.$data.applyProductInfo.otherName"></div>
                                <div class="col-sm-2">
                                    <label class="control-label">分类</label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" id="category" class="form-control" placeholder="分类" maxlength="30" required="" v-model="this.$parent.$data.applyProductInfo.className"></div>
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
</template>

<script>
export default {
  name: 'applyProduct',
  data () {
    return {     
        
    }
  },
  methods:{
        //根据产品选择获取产品绑定信息
    applyProductBind(){
        var _this = this.$parent.$data;
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
  }
}
</script>
<style>  
</style>