<template>
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
                                <input v-validate="'required'" v-model="hospitalInfos.hospitalName.name" name="username" type="text" id="name" class="form-control"  placeholder="名称" :class="{'input': true, 'haserror': errors.has('username') }">   </div>                                 
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
                                    <input v-validate="'required'" v-model="hospitalInfos.contactName.name" name="contactPerson" type="text" id="contactPerson" class="form-control" placeholder="联系人" maxlength="50" :class="{'input': true, 'haserror': errors.has('contactPerson') }"></div>
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
                        <label id="error" class="label-danger"><span v-show="errors.has('username')||errors.has('contactPerson')" class="help is-danger">请输入红框中的必填项</span></label>
                         <!-- <label id="error" class="label-danger" v-bind:class="{hidden:!(this.hospitalInfos.hospitalName.iserror||this.hospitalInfos.contactName.iserror)}">请输入红框标出的是必填项！</label> -->
                        <button @click="addhospital()" type="button" id="btnConfirm" class="btn btn-primary" v-bind:class="{disabled:errors.has('username')||errors.has('contactPerson')}">确认</button>
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>                    
                </div>
            </div>
        </div>

</template>

<script>
export default {
  name: 'addHospital',
  data () {
    return {     
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
      validation1:{
        result:{}
      }
    }
  },
  methods:{
    //添加医院
    addhospital(){      
    var url = this.GLOBAL.hostIp;  
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
        var addHospitalInfo = {
          name:this.hospitalInfos.hospitalName.name,
          description:this.hospitalInfos.hospitalDesc,
          ShortCode:this.hospitalInfos.hospitalAbbr,
          Type:10,
          ContactInfo:{
            ContactPerson:this.hospitalInfos.contactName.name,
            Address:this.hospitalInfos.contactAddress,
            ContactWay1:this.hospitalInfos.contactMethod1,
            ContactWay2:this.hospitalInfos.contactMethod2,
            ContactWay3:this.hospitalInfos.contactMethod3,
            ContactWay4:this.hospitalInfos.contactMethod4
          }
          
      };
       this.$http.post(url+"/HospitalSetting/Hospitalsave",addHospitalInfo,{emulateJSON: true}).then(response => {               
                // get body data                    
              var body = response.body;
              if (body.isSuccess) {
                alert("添加成功")
              };
                              
              }, response => {
                // error callback
              });
      $("#hospitalInfo").modal("toggle")
      };        
    },
  }
}
</script>
<style>  
</style>