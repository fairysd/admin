<template>
        <div class="modal fade in" id="receipts" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalLabel"><span v-text="$parent.$data.currentHospital"></span>-开票信息</h4>
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
                            <tbody><tr class="receipt-item edit" v-for="(item,index) in this.$parent.$data.receiptModel">
                                <td><span v-text="item.title" @click="editInfo(index)" v-show="item.display"></span><input type="text" class="form-control" v-model="item.title" v-show="item.edit"></td>
                                <td><span v-text="item.tax" @click="editInfo(index)" v-show="item.display"></span><input type="text" class="form-control" v-model="item.tax" v-show="item.edit"></td>
                                <td><button href="#" id="btnUpdate" class="btn btn-primary save" v-show="item.edit" @click="saveInfo(item.id,index)">保存</button></td> 
                            </tr></tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <input type="text" class="form-control" receipt-title="" placeholder="抬头" v-model="$parent.$data.addReceiptsModel.title"></td>
                                    <td>
                                        <input type="text" class="form-control" receipt-tax="" placeholder="数字" v-model="$parent.$data.addReceiptsModel.tax"></td>
                                    <td>
                                        <button href="#" id="btnAdd" class="btn btn-primary add" @click="addSubmit">新增</button>
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
        
    }
  },
  methods:{
    editInfo(index){
        var receipts = this.$parent.$data.receiptModel;
        receipts[index].display = false;
        receipts[index].edit = true;
        },
    saveInfo(id,index){
    var url = this.GLOBAL.hostIp;
    var receipts = this.$parent.$data.receiptModel;
      var data = {
            Id:id,
            HospitalId:this.$parent.$data.currentHospitalId,
            Title:this.$parent.$data.receiptModel[index].title,
            Tax:this.$parent.$data.receiptModel[index].tax
        }
        this.$http.post(url+"/HospitalSetting/SaveReceipt",data,{emulateJSON: true,credentials: true}).then(response => {
          var body = response.body;
          if (body.isSuccess) {
            console.log(1)
            receipts[index].display = true;
        receipts[index].edit = false;
          };
      }, response => {
             // var status = response.status;
             // if (status == "404") {
             //  alert("长时间未操作，请重新登陆")
             //  this.$router.push('/login')
             // };
              });   
    },
    addSubmit(){
        var url = this.GLOBAL.hostIp;
        var receipts = this.$parent.$data.receiptModel;
        var _this =this;
      var data = {
            HospitalId:this.$parent.$data.currentHospitalId,
            Title:this.$parent.$data.addReceiptsModel.title,
            Tax:this.$parent.$data.addReceiptsModel.tax
        }
        var addData =  {
            title:this.$parent.$data.addReceiptsModel.title,
            tax:this.$parent.$data.addReceiptsModel.tax,
            display:true,
            edit:false
        }
        this.$http.post(url+"/HospitalSetting/SaveReceipt",data,{emulateJSON: true,credentials: true}).then(response => {
          var body = response.body;
          if (body.isSuccess) {
            receipts.push(addData);
            _this.$parent.$data.addReceiptsModel ={
            title:"",
            tax:""
        }
          };
      }, response => {
         
              });   
    }
  }
}
</script>
<style>  
</style>