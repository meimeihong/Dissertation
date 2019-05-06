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
      <p class="buydata">
          <span>数量</span>
          <span class="jian" @click="reduce">-</span>
          <input type="text" v-model="buynum">
          <span class="jia" @click="add">+</span>
      </p>
      <p class="tui"><span></span>因商品的特殊性，请在收货时确认商品质量，一旦收货，概不退换</p>
      <div class="pingjia">
          <p>
              <span>商品评价</span>
              <span>(</span>
              <span>456565</span>
              <span>)</span>
              <span class=hao>好评</span>
              <span style="color:red;">5%</span>
          </p>
          <div>
            <p>名称 </p>
            <p>
            <span  v-for="(item, index) in pingfen" :key="index" v-bind:class="item?'yanse':'y'">
               <i class="fa fa-heart" aria-hidden="true"></i>
            </span>
            <span>2分</span>
            </p>
          
          </div>
      </div>
      <div class="zhanshi">
          <img  v-for="(item, index) in img" :key="index" :src="item" alt="">
      </div>
    <div  v-show="zheshow" class="zhe" @click="zheclick()">
       <img :src="zhezhaoimg" alt="">
    </div>
    <div class="dibu">
         已经到底啦~~~
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
              zheshow:false,
              pingfen:[true,true,false,false,false],
              buynum:1
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
       },
       add(){
            this.buynum+=1;
		},
        reduce(){
            if(this.buynum<=1){
                this.buynum=1;
            }else{
                this.buynum-=1;
            }
		},
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
         .pd(5,0,5,10);
     }
     .miaoshu{
         .w(375);
         .fs(12);
         color:rgb(54, 49, 49);
         .pd(5,0,5,10);
     }
     .price{
        .pd(5,0,5,10);
        .fs(18);
         color:red;
         border-bottom: 1px solid #ccc;
     }
     .buydata{
         .fs(16);
         .pd(5,0,5,10);
        
         border-bottom:#ccc 1px solid;
         span{
             display:inline-block;
             .h(20);
             .lh(20);
             text-align: center;
             
         }
         .jian{
             .w(20);
             border:#ccc 1px solid;
         }
         .jia{
             .w(20);
             border:#ccc 1px solid;
         }
         input{
             .w(30);
             .h(18);
             .lh(18);
             text-align: center;
             border:none;
         }
     }
     .tui{
         .fs(10);
          .pd(5,0,5,10);
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
     .pingjia{
         .fs(16);
         border-bottom: #ccc 1px solid;
         border-top: #ccc 1px solid;
         .pd(5,0,5,0);
         p{
            span{
            font-weight: 700;  
            }
            .hao{
                .mg(0,0,0,100);
                color:red;
            }
         }
         div{
             p{
                 .fs(14);
                 .pd(0,0,0,12);
                 span{
                     .mg(0,0,0,5);
                 }
                 .yanse{
                     i{
                        color: red; 
                     }
                     
                 }
                 .y{
                     i{
                         color:#ccc;
                     }
                 }
             }
         }
         
     }
     .zhanshi{       
         img{
            .w(345);
            .h(260);
            .mg(0,0,0,15);
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
     .dibu{
			.w(375);
			.h(100);
			.fs(14);
			.pd(20,0,0,0);
			// border-top: 1px solid #ccc;
			text-align: center;
			color:#ccc;
			background: white;
	}
 }
</style>
