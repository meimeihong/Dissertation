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
          <span class="jia" @click="add(data.shuliang)">+</span>
          
      </p>
      <p class="shuliang">
          <span>商品总量:</span>
          <span>{{data.shuliang}}</span>
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
    <div class="buyorcart">
      <ul>
          <li  v-bind:class="collectioncolor?'color':'nocolor'" @click="collection(data.bianhao,data)">
              <span><i class="fa fa-heart" aria-hidden="true"></i></span>
              <span>收藏</span>
          </li>
          <li @click="addtocart(data.bianhao,data,buynum)">
              加入购物车
          </li>
          <li @click="tobuy()">
              购买
          </li>
      </ul>
    </div>
  </div>
</template>
<script> 
    import Vue from 'vue';
    import Swiper from 'swiper';
    import { Toast } from 'mint-ui';
    import { Swipe, SwipeItem } from 'mint-ui';
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
              buynum:1,
              collectioncolor:false,
              loginuser:''
			}
    },
    methods:{
       xiangqingdata(){
           this.loginuser = localStorage.getItem("loginuser");
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
       add(shuliang){
           if(this.buynum<shuliang){
               this.buynum+=1;
           }else{
               this.buynum=shuliang;
           }
            
		},
        reduce(){
            if(this.buynum<=1){
                this.buynum=1;
            }else{
                this.buynum-=1;
            }
        },
        addtocart(bianhao,data,addnum){           
            if(this.loginuser===undefined || this.loginuser==='' || this.loginuser===null){
                Toast({
                message: '请先登陆',
                position: 'middle',
                duration: 2000
                });
            }else{
             var addtocartdata=JSON.stringify(data);
            this.$axios.post('http://127.0.0.1:3009/api/cart/addtocart',
            {'bianhao':bianhao,'data':addtocartdata,'UserName':this.loginuser,'jiajian':addnum})
            .then((res)=>{
                console.log(res);	
                Toast({
                    message: "购物车商品添加成功",
                    position: 'bottom',
                    duration: 2000,
                    className:'tankuang',
                    });
            })
            .catch((err) => {
                    console.log(err);
            })
            }
        
        },
        getcollection(){
            var bianhao=this.data.bianhao;          
             if(this.loginuser===undefined || this.loginuser==='' || this.loginuser===null){
                this.collectioncolor=false;
             }else{
                 this.$axios.post('http://127.0.0.1:3009/api/onecollection',
                    {'bianhao':bianhao,'UserName':this.loginuser})
                    .then((res)=>{
                        console.log(res);	
                       if(res.data.err===-1){
                           this.collectioncolor=false;
                       }else{
                           this.collectioncolor=true;
                       }
                    })
                    .catch((err) => {
                            console.log(err);
                    })
             }
        },
        collection(bianhao,data){           
            if(this.loginuser===undefined || this.loginuser==='' || this.loginuser===null){
                Toast({
                message: '请先登陆',
                position: 'middle',
                duration: 1000
                });
            }else{
                var collectiondata=JSON.stringify(data);
                if(this.collectioncolor){ 
                     this.$axios.post('http://127.0.0.1:3009/api/delecollection',
                    {'bianhao':bianhao,'UserName':this.loginuser})
                    .then((res)=>{
                        console.log(res);	
                        Toast({
                            message: res.data.msg,
                            position: 'bottom',
                            duration: 2000,
                            className:'tankuang',
                            });
                        this.collectioncolor=false;
                    })
                    .catch((err) => {
                            console.log(err);
                    })                  
                    
                }else{
                    this.$axios.post('http://127.0.0.1:3009/api/collection',
                    {'bianhao':bianhao,'data':collectiondata,'UserName':this.loginuser})
                    .then((res)=>{
                        console.log(res);
                        Toast({
                            message: res.data.msg,
                            position: 'bottom',
                            duration: 2000,
                            className:'tankuang',
                            });
                        if(res.data.err==0){       
                        this.collectioncolor=true;
                        }	
                        
                    })
                    .catch((err) => {
                            console.log(err);
                    })
                }
            }
            
        },
        tobuy(){
            var buydata=JSON.stringify(this.data);
            var buydatas=[{"UserName":this.loginuser,"bianhao":this.data.bianhao,"addnumber":this.buynum,"data":buydata}]
                buydatas=JSON.stringify(buydatas);
            localStorage.setItem('buydata', buydatas);
            localStorage.setItem('buyreturn', 'xiangqing');     
            var shouhuodizhi = localStorage.getItem("shouhuodizhi");
            console.log(this.loginuser,shouhuodizhi)
            if(this.loginuser===undefined || this.loginuser==='' || this.loginuser===null){
                Toast({
                    message: '请您先登陆个人帐号',
                    position: 'middle',
                    duration: 2000,
                    className:'tankuang',
                });
            }else if(shouhuodizhi===undefined || shouhuodizhi==='' || shouhuodizhi===null){
                Toast({
                    message: '请您先填写收货地址',
                    position: 'middle',
                    duration: 2000,
                    className:'tankuang',
                });
            }else{
                this.$router.push({name:'buy'});
            }
            
        }
    },
    created() {
            this.xiangqingdata();
            this.getcollection();
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
         box-sizing: border-box;
     }
     .miaoshu{
         .w(375);
         .fs(12);
         color:rgb(54, 49, 49);
         .pd(5,0,5,10);
         box-sizing: border-box;
     }
     .price{
        .pd(5,0,5,10);
        box-sizing: border-box;
        .fs(18);
         color:red;
         border-bottom: 1px solid #ccc;
     }
     .buydata{
         .fs(14);
         .pd(5,0,5,10);
        box-sizing: border-box;
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
     .shuliang{
         .fs(14);
         .pd(5,0,5,10);
         box-sizing: border-box;
         border-bottom: #ccc solid 1px;
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
         box-sizing: border-box;
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
                 box-sizing: border-box;
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
         .pd(10,0,0,0);      
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
			text-align: center;
			color:#ccc;
			background: white;
    }
    .buyorcart{
        .w(375);
        .h(35);
        .fs(20);
        .lh(35);
        border-top: #ccc 1px solid;
        text-align: center;
        position:fixed;
        left:0px;
        bottom:0px;
        background: white;
        z-index: 80;
        ul{.w(375);
        z-index: 100;
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:center;
            align-items:center;
            li{
                .fs(14);
                .w(124);
                border-left: #ccc 1px solid;
                font-weight: 600;
                color:red;
            }
            li:first-child{
                border:none;
            }
            .color{
                color:red;
            }
            .nocolor{
                color:black;
            }
        }
    }
 }
</style>
