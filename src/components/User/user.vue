<template>
  <div id="userMain">
    <div class="module-title-bar">
    <label class="title">用户</label>
</div>
<div class="form-inline">
    <div class="form-group">
        <label for="formNo">院方/供应商</label>
        <select id="roots" class="form-control">
        <optgroup label="院方"><option v-for="item in hospital" v-text="item.name" v-bind:value="item.id"></option></optgroup><optgroup label="供应商"><option v-for="item in vendor" v-text="item.name" v-bind:value="item.id">1111</option></optgroup></select>
    </div>
    <div class="form-group">
        <label for="formNo">单位</label>
        <select id="units" class="form-control"><option value="">请选择...</option><option value="c1b445bc-ff83-460e-bf29-22c5c779032f">上海医院</option><option value="db5d1092-34fc-4dae-a16f-8ab4fa90e191">检验科</option><option value="02c0f598-2009-49ce-b09e-9ab5f60051f5">库房A</option></select>
    </div>
    <div class="form-group style_user">
        <label for="formNo" class="sr-only">用户</label>
        <input type="text" id="condition" class="form-control" placeholder="用户">
    </div>
    <button class="btn btn-primary pull-right" id="btnQuery">查询</button>
    <br style="clear:both;">
</div>
<div class="vertical-margin-1em">
    <button class="btn btn-primary" id="btnAdd">新增</button>
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
        <tbody><tr>
        <td>瑞金</td>
        <td>htest_rj</td>
        <td>上海医院</td>
        <td>检验科</td>
        <td>员工</td>
        <td>
            <div class="btn-group">
                <a href="#" class="btn btn-primary edit">编辑</a>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="caret"></span>
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#" class="userPrivilege">关联单位</a></li>
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
    </div>
<!--     //新增modal -->

    </div>

</template>

<script>
export default {
    name: 'user',
    components: {},
  data () {
    return {
    current:1,
    showItem:5,
    allpage:1,
    searchmsg:"",
     hospital:[
     {
        name:"阿斯顿",
        id:"123"
     },
     {
        name:"电风扇广泛",
        id:"234"
     }
     ],
     vendor:[
     {
        name:"下次v",
        id:"345"
     },
     {
        name:"下次v",
        id:"987"
     }
     ]          
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
      this.$http.get('./static/user.json').then(response => {               
                // get body data                                  
                var _this = this;               
                var data = response.body;
                _this.userList = data;
                
              }, response => {
                // error callback
              });      

  },
  methods:{      
       serchPartment(){      
      var searchmsg = this.searchmsg;
      var productList = this.productList;
      for (var i = 0; i <= productList.length+1; i++) {
        productList.forEach(function(item,index,array){        
        if (searchmsg !== "") {
          if(!(productList[index].name.indexOf(searchmsg) >= 0)){
            array.splice(index, 1);
            }
          };      
        })     
      };      
    },
    goto:function(index){
          if(index == this.current) return;
            this.current = index;
           // 发送页面请求
        }
  }
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
</style>