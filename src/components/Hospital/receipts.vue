<template>
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
                            <tbody><tr class="receipt-item edit" v-for="item in this.$parent.$data.receiptModel">
        <td><span v-text="item.title" @click="editInfo" v-show="display"></span><input type="text" class="form-control" v-model="item.title" v-show="edit"></td>
        <td><span v-text="item.interest" @click="editInfo" v-show="display"></span><input type="text" class="form-control" v-model="item.interest" v-show="edit"></td>
        <td><button href="#" id="btnUpdate" class="btn btn-primary save" v-show="save" @click="saveInfo">保存</button></td> 
    </tr></tbody>
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
</template>

<script>
export default {
  name: 'receipts',
  data () {
    return {     
        edit:false,
        display:true,
        save:false
    }
  },
  methods:{
    editInfo(){
        this.edit=true;
        this.display=false;
        this.save=true;
    },
    saveInfo(){
        this.edit=false;
        this.display=true;
        this.save=false;
        return false;
    }
  }
}
</script>
<style>  
</style>