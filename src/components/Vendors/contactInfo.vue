<template>
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
                                    <p class="form-control-static" v-text="$parent.$data.vendorInfos.contactName.name"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">地址</label>
                                </div>
                                <div class="col-sm-10">
                                    <p class="form-control-static" v-text="$parent.$data.vendorInfos.contactAddress"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式1</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="$parent.$data.vendorInfos.contactMethod1"></p>
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式2</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="$parent.$data.vendorInfos.contactMethod2"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式3</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="$parent.$data.vendorInfos.contactMethod3"></p>
                                </div>
                                <div class="col-sm-2">
                                    <label class="control-label">联系方式4</label>
                                </div>
                                <div class="col-sm-4">
                                    <p class="form-control-static" v-text="$parent.$data.vendorInfos.contactMethod4"></p>
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
</template>

<script>
export default {
  name: 'contactInfo',
  data () {
    return {            
       
    }
  },
  methods:{

  }
}
</script>
<style>  
</style>