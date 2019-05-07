<template>
	<div id="homecontent">
        <!-- Swiper -->
        <p class="title">日常推荐</p>
    <div class="tj">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"  v-for="(item, index) in tuijian" :key="index" >
                    <p class="tjzhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
                        商品已失效
                    </p>
                    <img :src="item.img.split(',')[0]" alt="" @click="toxiangqing(item)">
					 <p>{{item.name}}</p>
                     <p style="color:gray;">{{item.miaoshu}}</p>
					 <p>
                        <span>￥</span><span>{{item.danjia}}</span><span>/{{item.guige}}</span> 
                        <span class="carts"  @click="addtocart(item.bianhao,item)"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>

                    </p>
                </div>
                    
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
    </div>
        <p class="title">安心蔬菜</p>
        <ul class="first">           
            <li v-for="(item, index) in shucai" :key="index" >
                <p class="firstzhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
                    商品已失效
                </p>
                <img :src="item.img.split(',')[0]" alt=""  @click="toxiangqing(item)">
                <div>
                    <p>{{item.name}}</p>
                    <p style="color:gray;">{{item.miaoshu}}</p>
                    <p style="color:red;"><span>￥</span><span>{{item.danjia}}</span><span style="color:#ccc;">/{{item.guige}}</span>                  
                    </p>
                    <p class="cart"><span class="fa fa-shopping-cart" aria-hidden="true"  @click="addtocart(item.bianhao,item)"></span></p>
                </div>               
            </li>
        </ul>
        <p  class="title">精选肉类</p>
        <ul class="two">
                 <li v-for="(item, index) in roulei" :key="index">
                     <p class="rlzhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
                         商品已失效
                     </p>
					 <img :src="item.img.split(',')[0]" alt="" @click="toxiangqing(item)">
					 <p>{{item.name}}</p>
                     <p style="color:gray;">{{item.miaoshu}}</p>
					 <p style="color:red;">
                         <span>￥</span><span>{{item.danjia}}</span>
                         <span class="guige" style="color:#ccc;">/{{item.guige}}</span> 
                        <span class="carts"  @click="addtocart(item.bianhao,item)"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                    </p>
				 </li>
        </ul>
       <p  class="title">精选水果</p>
       <ul class="three">
            <li  v-for="(item, index) in shuiguo" :key="index">
            <p class="sgzhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
                         商品已失效
            </p>
			<img :src="item.img.split(',')[0]" alt=""  @click="toxiangqing(item)">
			<div class="good">
				<p>{{item.name}}</p>
				<p style="color:gray;">{{item.miaoshu}}</p>
				<p>
					<span style="color:red;">￥{{item.danjia}}</span>
					<span  style="color:#ccc;">/{{item.guige}}</span>
                    <span class="cart3"  @click="addtocart(item.bianhao,item)"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
				</p>
						
			</div>
			</li>
       </ul>
	</div>
</template>
<script src="../../node_modules/swiper/dist/js/swiper.min.js"></script>

<script>
    import Vue from 'vue';
    import Swiper from 'swiper';
    import { Toast } from 'mint-ui';
	export default {
		name: 'homecontent',
		data() {
			return {
                tuijian:[],
                shucai:[],
                roulei:[],
                lingshi:[],
                shuiguo:[],
                jian:0
			}
		},
		components: {
			
		},
		methods: {
			    tuijiandata(){
                    this.$axios.post('http://127.0.0.1:3000/api/goods/tuijian',{})
					.then((res) => {					
                        console.log(res);
                        this.tuijian=res.data.data;
                        Vue.nextTick(() => {
                            var swiper = new Swiper('.swiper-container', {
                                        slidesPerView: 3,
                                        spaceBetween: 10,
                                        autoplay:true,
                                        loop: true,
                                        pagination: {
                                            el: '.swiper-pagination',
                                            clickable: true,
                                        },
                                });
				     });
                        
					})
					.catch((err) => {
						console.log(err);
					})
                },
                all(){
                    this.$axios.post('http://127.0.0.1:3000/api/goods/all',{})
					.then((res) => {					
                        // console.log(res);
                        var total=res.data.data;
                         if(total.shucai.length<=8){
                             this.shucai=total.shucai;
                         }else{
                             this.shucai=total.shucai.splice(0,8);
                         }
                         if(total.roulei.length<=8){
                             this.roulei=total.roulei;
                         }else{
                             this.roulei=total.roulei.splice(0,8);
                         }
                         if(total.lingshi.length<=8){
                             this.lingshi=total.lingshi;
                         }else{
                             this.lingshi=total.lingshi.splice(0,8);
                         }
                         if(total.shuiguo.length<=8){
                             this.shuiguo=total.shuiguo;
                         }else{
                             this.shuiguo=total.shuiguo.splice(0,8);
                         }
                        //  console.log(this.roulei,this.shuiguo,this.lingshi);

					})
					.catch((err) => {
						console.log(err);
					})
                },
                addtocart(bianhao,data){
                    var loginuser = localStorage.getItem("loginuser");
                    if(loginuser===undefined || loginuser==='' || loginuser===null){
						 Toast({
                                message: '请先登陆',
                                position: 'middle',
                                duration: 2000
                                });
					 }else{
						 var addtocartdata=JSON.stringify(data);
                        this.$axios.post('http://127.0.0.1:3000/api/cart/addtocart',
                        {'bianhao':bianhao,'data':addtocartdata,'UserName':loginuser,'jiajian':-1})
                        .then((res)=>{
                            console.log(res);
                            Toast({
                                message: res.data.msg,
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
                toxiangqing(data){
                    var xiangqingdata=JSON.stringify(data);
                     localStorage.setItem('xiangqing', xiangqingdata);
                     this.$router.push({name:'xiangqing'});
                }

		},
		created() {
            this.tuijiandata();
            this.all();
        },
        destroyed(){
            delete this.swiper;
		}
	}
</script>

<style lang="less" scoped>
	@import '../styles/main.less';
	@import '../../node_modules/swiper/dist/css/swiper.css';
	@import url('../styles/animate.css');
	#homecontent{
        .title{  text-align: center;
            .fs(16);
            .h(25);
            .lh(25);
            .mg(20,0,5,0);
            border-bottom: 1px solid #ccc;
            }
        .first{
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:left;
            align-items:center;           
            li{ 
            .w(180);
            .h(80);
            .mg(8,0,0,6);
            position: relative;
            .firstzhe{
                .fs(16);
                .w(180);
                .h(80);
                .lh(80);
                z-index: 60;
                text-align: center;
                color:white;
                background: black;
                opacity: 0.5;
                position: absolute;
                top:0px;
                left:0px;
            }
                img{
                    .w(70);
                    .h(70);
                }
                div{display:inline-block;
                    p{  .w(90);
                        .fs(10);
                        .h(16);
                        .lh(16);                     
                        overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        text-align: left;
                    }
                    .cart{
                            .fs(16);
                            color:orange;
                            text-align: right;
                    }
                }
            }
        }
        
        .two{  .w(375);
		 display: -webkit-flex; /* Safari */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content:space-around;
          align-items:center;
         li{ background: white;
            position: relative;
            .mg(10,0,0,0);
            .w(150);
            .fs(12);
           .rlzhe{
                .fs(16);
                .w(150);
                .h(220);
                .lh(220);
                z-index: 60;
                text-align: center;
                color:white;
                background: black;
                opacity: 0.5;
                position: absolute;
                top:0px;
                left:0px;
            }
            img{
                .w(150);
                .h(150);
                }
            p{text-align: left;
            position: relative;
            .h(22);
            .lh(22);
            .fs(14);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-align: left;
            }            
            .guige{
                display: inline-block;
            //  position: absolute;
            //  .position(0,50);
                .h(22);
                .lh(28);
                .fs(12);
                .w(34);
                color:#ccc;
                overflow: hidden;
            }
            .carts{
                position: absolute;
                .position(0,130);
                display: inline-block;
                text-align: right;
                color:orange;
                .fs(18);
            //  .mg(0,0,0,60);
            }
        }
		   }
        
    }
        .three{
            .w(375);
          display: -webkit-flex; /* Safari */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content:space-around;
          align-items:center;
            li{.w(375);
               .h(90);
               .mg(10,0,0,0);
                 display: -webkit-flex; /* Safari */
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content:left;
                align-items:center;
                position: relative;
                .sgzhe{
                    .fs(16);
                    .w(375);
                    .h(95);
                    .lh(95);
                    z-index: 60;
                    text-align: center;
                    color:white;
                    background: black;
                    opacity: 0.5;
                    position: absolute;
                    top:0px;
                    left:0px;
                }
                img{
                    .w(110);
                    .h(80);
                    .mg(0,0,0,15);
                }
                .good{
                    .fs(14);
                    display: inline-block;
                    .w(230);
                    .mg(0,0,0,10);
                    p{  .h(25);
                        .lh(25);
                        position: relative;
                        display: inline-block;
                        overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        text-align: left;
                        .cart3{
                            position: absolute;
                            .position(1,110);
                            color:orange;
                            .fs(18);
                            .mg(0,0,0,90);
                        }
                    }
                }
            }
        }
        .tj{
        .swiper-slide{
            position:relative;
            .tjzhe{
             .w(120);
             .h(165);
             .lh(165);
             .fs(16);
             text-align: center;
            position:absolute;
            top:0px;
            left:0px;
            color:white;
            background: black;
            opacity: 0.5;
            }
            .w(120);
            img{
                .w(120);
                .h(100);              
            }
            p{text-align: left;
            .w(120);
                       .h(18);
                       .lh(18);
                       .fs(14);
                       overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        text-align: left;
                     }
					 .carts{
                         display: inline-block;
						 text-align: right;
						 color:orange;
                         .fs(18);
                         .mg(0,0,0,20);
                     }
        }
        .tankuang{
            background: orange;
        }
        }
</style>