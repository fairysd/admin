<template>
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
                <div v-for='item in $parent.$data.systemFunctionsInfos' style="padding-left: 0px;">
                  <span class="name" v-bind:id="item.parent.id" v-text="item.parent.title"></span>                
                <div class="item" style="padding-left: 30px;" v-for="operation in item.childNode">
                  <span class="name" v-bind:id="operation.id" v-text="operation.title">库房盘查</span>
                  <div class="operation">
                    <input type="checkbox" class="query" value="query" style="display:none">            
                    <input type="checkbox" value="operate" @click="clickSubmit(operation.operationId)"></div>
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
</template>

<script>
export default {
  name: 'relativeHospital',
  data () {
    return {    
         }
  },
  methods:{  
    clickSubmit(id){
      // 发送http请求
    }
  }
}
</script>
<style>  
</style>