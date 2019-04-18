<template>
  <div id="search">
      <div class="header">
            <span><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
             <input type="text" placeholder="搜索">
             <span><i class="fa fa-search"></i></span>
        </div>
  </div>
</template>
<script> 
export default {
  name: 'tab',
  props:['listname'],
  data() {
		return {
        
		}
    },
    methods:{
      
    }
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#search{
    .header{
        .w(375);
            .h(40);
            .lh(40);
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:flex-start;
            align-items:center;
            border-bottom: 2px solid rgb(66, 216, 103);
            span{
                display:inline-block;
                .mg(0,0,0,15);
                .fs(16);
                font-weight: 800;
                color:rgb(66, 216, 103);
            }
            input{
                .w(280);
                .h(25);
                .fs(16);
                color:gray;
                border:none;
                border-radius: 15px;
                .mg(0,0,0,15);
                .pd(0,0,0,10);
                outline: none;
                background: rgb(218, 218, 218);
                box-sizing: border-box;
            }
    }
}
</style>
