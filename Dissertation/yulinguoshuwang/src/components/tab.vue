<template>
  <div id="taber">
    <ul class="tab">
      <li v-bind:class="listname===home?'active':''" @click="first">
        <span class="fa fa-home" aria-hidden="true"></span>
        <span>主页</span>
      </li>
      <li v-bind:class="listname===classify?'active':''" @click="second">
        <span class="fa fa-th-large" aria-hidden="true"></span>
        <span>分类</span>
      </li>
      <li v-bind:class="listname===cart?'active':''" @click="three">
        <span class="fa fa-shopping-cart" aria-hidden="true"></span>
        <span>购物车</span>
      </li>
      <li v-bind:class="listname===my?'active':''" @click="four">
        <span class="fa fa-user" aria-hidden="true"></span>
        <span>我的</span>
      </li>
    </ul>
  </div>
</template>
<script> 
export default {
  name: 'tab',
  props:['listname'],
  data() {
			return {
        classify:'classify',
        home:'home',
        cart:'cart',
        my:'my',
			}
    },
    methods:{
      first(){
        localStorage.setItem('dleibie', '');
        this.$router.push({name:'home'})   
      },
      second(){
        localStorage.setItem('dleibie', '');
        this.$router.push({name:'classify'})
      },
      three(){
        localStorage.setItem('dleibie', '');
        this.$router.push({name:'cart'})
      },
      four(){
        localStorage.setItem('dleibie', '');
        this.$router.push({name:'my'})
      }
    }
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#taber {
  .tab{ 
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:flex-start;
            align-items:center;
            position:fixed;
            left:0px;
            bottom:0px;
            border-top:1px solid rgb(197, 193, 193);
            border-bottom: 1px solid rgb(197, 193, 193);
            z-index: 80;
            background: white;
            .w(375);
            .pd(5,0,5,0);
    li{
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:center;
            align-items:center;
            .w(93);
            .fs(16);
            span{
              .w(92);
              text-align: center;
            }
    }
    .active{
      color:rgb(66, 216, 103);
    }

  }
}
</style>
