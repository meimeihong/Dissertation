<template>
  <div id="xiangqing">
      <div class="imgs">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item, index) in img" :key="index">
                    <img :src="item" alt="" @click="imgsclick(item)">
            </mt-swipe-item>
            </mt-swipe>
      </div>
      <p class="name">{{data.name}}</p>
      <p class="miaoshu">{{data.miaoshu}}</p>
      <p class="price">
          <span>￥</span>
          <span>{{data.danjia.toFixed(2)}}</span>
          <span style="color:#ccc;font-size:12px;">/{{data.guige}}</span>
      </p>
      <p class="tui"><span></span>不支持七天无理由退货</p>
      <div class="zhanshi">
          <img  v-for="(item, index) in img" :key="index" :src="item" alt="">
      </div>
      
    <div  v-show="zheshow" class="zhe" @click="zheclick()">
    
    </div>
  </div>
</template>
<script> 
import { Swipe, SwipeItem } from 'mint-ui';
import Vue from 'vue';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: 'xiangqing',
  data() {
		return {
              data:[],
              img:[],
              zhezhaoimg:"",
              zheshow:false
			}
    },
    methods:{
       xiangqingdata(){
           var xiangqing= JSON.parse(localStorage.getItem("xiangqing"));
           this.img=xiangqing.img.split(",");
           this.data=xiangqing;
           console.log(xiangqing)
       },
       imgsclick(itemimg){
           this.zhezhaoimg=itemimg;
           this.zheshow=true;
       },
       zheclick(){
            this.zheshow=false;
       }
    },
    created() {
            this.xiangqingdata();
        },
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
 #xiangqing{
     .w(375);
     .imgs{
         .w(375);
         .h(280);
         img{
            .w(375);
            .h(280);
         }
     }
     .name{
         .w(375);
         .fs(16);
         font-weight: 700;
         .pd(5,0,5,0);
     }
     .miaoshu{
         .w(375);
         .fs(12);
         color:rgb(54, 49, 49);
         .pd(5,0,5,0);
     }
     .price{
        .pd(5,0,5,0);
        .fs(18);
         color:red;
         border-bottom: 1px solid #ccc;
     }
     .tui{
         .fs(10);
          .pd(5,0,5,0);
           color:#ccc;
         span{
             display:inline-block;
             .w(5);
             .h(5);
             background: @green;
             border-radius: 50%;
            
            .mg(0,5,0,0);
         }
     }
     .zhanshi{       
         img{
            .w(360);
            .h(260);
            .mg(0,0,0,7.5);
         }
     }
     .zhe{
         .w(375);
         .h(667);
         background:rgb(82, 31, 31);
         z-index: 300;
         position: fixed;
         .position(0,0);
         img{
             .w(375);
             .h(400);
             .mg(130,0,0,0);
             background: white;
             opacity: 1;
         }
     }
 }
</style>
