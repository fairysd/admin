<template>
  <div id="userMain">
    <div class="module-title-bar">
    <label class="title">用户</label>
</div>
<div class="form-inline">
    <div class="form-group">
        <label for="formNo">院方/供应商</label>
        <select id="roots" class="form-control" v-on:change="applyunit" v-model="queryModel.rootId">
        <optgroup label="院方"><option v-for="item in hospital" v-text="item.name" v-bind:value="item.id"></option></optgroup><optgroup label="供应商"><option v-for="item in vendor" v-text="item.name" v-bind:value="item.id">1111</option></optgroup></select>
    </div>
    <div class="form-group">
        <label for="formNo">单位</label>
        <select id="units" class="form-control" v-model="queryModel.unitId"><option value="">请选择...</option><option v-for="item in units" v-bind:value="item.id" v-text="item.name"></option></select>
    </div>
    <div class="form-group style_user">
        <label for="formNo" class="sr-only">用户</label>
        <input type="text" id="condition" class="form-control" placeholder="用户" v-model="queryModel.condition">
    </div>
    <button class="btn btn-primary pull-right" id="btnQuery" @click="serachUser">查询</button>
    <br style="clear:both;">
</div>
<div class="vertical-margin-1em">
    <button class="btn btn-primary" id="btnAdd" @click="addUser()" data-target="#userInfo" data-toggle="modal">新增</button>
    <table id="userList" class="table table-striped">
        <thead>
            <tr>
                <th>姓名</th>
                <th>账号</th>
                <th>院方</th>
                <th>归属单位</th>
                <th>职位</th>
                <th style="width:120px">操作</th>
            </tr>
        </thead>
        <tbody><tr v-for="item in userInfo">
        <td v-text="item.name"></td>
        <td  v-text="item.account"></td>
        <td  v-text="item.hospital"></td>
        <td  v-text="item.unitName"></td>
        <td  v-if="item.title">主管</td>
        <td  v-else>员工</td>
        <td>
            <div class="btn-group">
                <a href="#" class="btn btn-primary edit" @click="editUser(item.id)" data-target="#editUserInfo" data-toggle="modal">编辑</a>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#" class="userPrivilege" data-target="#userPrivilegesInfo" data-toggle="modal" @click="relativePartment(item.id)">关联单位</a></li>
                </ul>
            </div>
        </td>
    </tr></tbody>
    </table>
</div>
        <!-- 分页 -->
        <div id="pageList" class="text-right"><nav><ul class="pagination" >
            <li v-show="current != 1" @click="current-- && goto(current)" ><a href="#">上一页</a></li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <a href="#" >{{index}}</a>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="#" >下一页</a></li>
        </ul></nav>
        </div>

    <!-- 添加用户 --> 
    <addUser></addUser>
    <!-- 添加用户 -->
    <editUser></editUser>
    <relUser></relUser>
    </div>

</template>

<script>
 import addUser from './addUser'
 import editUser from './editUser'
  import relUser from './relUser'
export default {
    name: 'user',
    components: {addUser,editUser,relUser},
  data () {
    return {
    current:"",
    showItem:"",
    allpage:"",
    searchmsg:"",

    userInfo:[],
    hospital:[],
    vendor:[],
    units:[],
    userModel:{
      root:"",
      unit:"",
      name:"",
      account:"",
      password:"",
      repeatPassword:"",
      place:""
    },
    editUserModel:{
        unitId:"",
        name:"",
        account:"",
        password:"",
        validPassword:"",
        title:"",
        id:""
    },    
    addUserHospital:[],
    addUserVender:[],
    addUserUnit:[],
    editUserUnit:[],
    queryModel:{
        rootId:"",
        unitId:"",
        condition:""
    },
    currentUserId:""
    }
  },
  computed:{
          pages:function(){
                var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
      },
  mounted:function(){
    //获取用户数据
        var _this = this;
        var url = this.GLOBAL.hostIp;
       this.$http.post(url+"/User/JsonIndex",{},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data    
                var body = response.body;                              
                if (body.isSuccess) {
                  var  data = body.data;
                    _this.hospital = data.hospital;
                    _this.vendor = data.vendor;
                } else{};
                
              }, response => {
                // error callback
              });    
  
  },
  methods:{      
    serachUser(){      
        var _this = this;
        var url = this.GLOBAL.hostIp;
        var data =  _this.queryModel
         this.$http.post(url+"/User/JsonQuery",data,{emulateJSON: true,credentials: true}).then(response => {               
                // get body data    
                var body = response.body;                              
                if (body.isSuccess) {
                  var  data = body.data;
                  
                  _this.userInfo = data;
                    //_this.hospital = data.hospital;
                    //_this.vendor = data.vendor;
                } else{};
                
              }, response => {
                // error callback
              });
        
    },
    goto:function(index){
          if(index == this.current) return;
            this.current = index;
           // 发送页面请求
        },
    addUser(){
    // clear cache
      this.userModel = {
        root:"",
        unit:"",
        name:"",
        account:"",
        password:"",
        repeatPassword:"",
        place:""
       };             
    },
    applyunit(){
    var val = $(event.currentTarget).val();
     var _this = this;
    var url = this.GLOBAL.hostIp;
       this.$http.post(url+"/Unit/GetUnits",{parentId:val},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data    
                var body = response.body;                              
                if (body.isSuccess) {
                  var  data = body.data;
                  _this.units = data;
                    //_this.hospital = data.hospital;
                    //_this.vendor = data.vendor;
                } else{};
                
              }, response => {
                // error callback
              });
    },
  //编辑
    editUser(id){
        //发送用户id获取数据
        var _this = this;
    var url = this.GLOBAL.hostIp;
          this.$http.post(url+"/User/JsonEdit",{id:id},{emulateJSON: true,credentials: true}).then(response => {               
                // get body data    
                var body = response.body;                              
                if (body.isSuccess) {
                  var data = body.data;
                  _this.editUserModel.unitId = data.unitId;
                  _this.editUserModel.name = data.name;
                  _this.editUserModel.account = data.account;
                  _this.editUserModel.password = "";
                  _this.editUserModel.validPassword = "";
                  _this.editUserModel.title = data.title;
                  _this.editUserModel.id = data.id;
                    //_this.hospital = data.hospital;
                    //_this.vendor = data.vendor;
                } else{};
                
              }, response => {
                // error callback
              });
    },
    relativePartment(id){
        this.currentUserId = id;
    }
  },
 
}
</script>
<style>
#userMain{
  text-align: left;
  font-family: '宋体';
  line-height: 30px;
}
#userMain .searchbox{
  margin-bottom: 10px;
}
 #userMain .form-inline>.row{
  margin-bottom: 5px;
  line-height: 30px;
 } 
 #userMain .form-control{
  width: 100%;
 }
 #userMain .form-control-static{
  padding-top: 0;
 }
 input.form-control.haserror{
    border: 1px solid #DC143C;
 }
 #userMain .style_user{
  margin-top: 35px;
 }
 #userMain .vertical-margin-1em{
  margin-top: 15px;
 }
</style>