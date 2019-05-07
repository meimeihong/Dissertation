<template>
	<div id="cart">
		<div class="buy" v-show="showcart">
       <input class="check" type="checkbox" name="" id="" v-model="checkall" @click="allcheck()">
			 <span>全选</span>
			 <span>合计(不含运费)：</span>
			 <span style="color:red;">￥</span>
			 <span style="color:red;">{{this.price.toFixed(2)}}</span>
			 <span class="jiesuan" @click="tobuy">去结算</span>
		</div>
		<p class="head">购物车</p>
		<div class="nocart" v-show="nocart">
			<p><span><i class="fa fa-shopping-cart" aria-hidden="true"></i></span></p>
			<p><span>{{tishi}}</span></p>
			<p><span class="guang" @click="tohome">去逛逛</span></p>
		</div>
		<div class="showcart" v-show="showcart">
			<ul>
				<li v-for="(item,index) in cartdata" :key="index" >
		       <p class="cartzhe" 
					 v-show="JSON.parse(item.data).shuliang<1?true:false||JSON.parse(item.data).zhuangt==0?true:false">
               商品已失效
					 </p>
						<span class="dele" @click="deletecartdata(JSON.parse(item.data).bianhao)">x</span>
						<input class="check" type="checkbox" name="" id="" v-model="checknum[index]" @click.stop="onecheck(index)">
						<img :src="JSON.parse(item.data).img.split(',')[0]" alt="" @click="toxiangqing(item.data)">
						<div class="good">
							<p>{{JSON.parse(item.data).name}}</p>
							<p style="color:gray;">{{JSON.parse(item.data).miaoshu}}</p>
							<p>
								<span style="color:red;">￥</span>
								<span style="color:red;">{{JSON.parse(item.data).danjia.toFixed(2)}}</span>
								<span  style="color:#ccc;">/{{JSON.parse(item.data).guige}}</span>
								<span class="numb">
									 <span class="jian" @click.stop="reduce(index,JSON.parse(item.data).bianhao,item.data)" >-</span>
								   <input type="number" :value="item.addnumber>JSON.parse(item.data).shuliang?JSON.parse(item.data).shuliang:item.addnumber" >
								   <span class="jia" @click.stop="add(index,JSON.parse(item.data).bianhao,item.data,JSON.parse(item.data).shuliang)">+</span>
								</span>							
							</p>
						
					  </div>
				</li>
			</ul>
		</div>
		<div class="like">
				<p class="ltop">~~您可能会喜欢~~</p>
			 <ul>
				 
				<li v-for="(item, index) in like" :key="index">
					<p class="likezhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
					 商品已失效
				 </p>
					 <img :src="item.img.split(',')[0]" alt="" @click="toxiangqing(JSON.stringify(item))">
					 <p>{{item.name}}</p>
					 <p style="color:gray;">{{item.miaoshu}}</p>
					 <p style="color:red;">
							<span>￥</span><span>{{item.danjia}}</span>
							<span class="guige" style="color:#ccc;">/{{item.guige}}</span> 
							<span class="carts" @click="addtocart(item.bianhao,JSON.stringify(item),-1)">
								<i class="fa fa-shopping-cart" aria-hidden="true"></i>
							</span>
					 </p>
				</li>
			 </ul>
		</div>
		<div class="dibu">
         已经到底啦~~~
		</div>
		<tab :listname="listname"></tab>
	</div>
</template>
<script>
    import Vue from 'vue';
    import Swiper from 'swiper';
    import { Toast } from 'mint-ui';
		import tab from './tab.vue';
	export default {
		name: 'cart',
		data() {
			return {
				name:"购物车",
				listname:'cart',
				tishi:'请您先登陆个人帐号再查看个人购物车',
				cartdata:[],
				nocart:false,
				showcart:true,
				like:[],
				checkall:false,
				checknum:[],
				price:0
			}
		},
		components: {
			tab
		},
		computed:{

		},
		methods: {
			tohome(){
				this.$router.push({name:'home'});
			},
			deletecartdata(bianhao){
					var username = localStorage.getItem("loginuser");
					this.$axios.post('http://127.0.0.1:3009/api/cart/deletecartdata',
					{'UserName':username,'bianhao':bianhao})
							.then((res)=>{
								console.log(res)
										Toast({
										message: res.data.msg,
										position: 'center',
										duration: 2000,
										className:'tankuang',
										});
										this.cartlist();
							})
							.catch((err)=>{
								  console.log(err);
							})
				},
			likedata(){
            this.$axios.post('http://127.0.0.1:3009/api/goods/tuijian',{})
					.then((res) => {					
            console.log(res);
						this.like=res.data.data;                     
					})
					.catch((err) => {
						console.log(err);
					})
					},
			cartlist(){
				var loginuser = localStorage.getItem("loginuser");
				if(loginuser===undefined || loginuser==='' || loginuser===null){
					this.tishi='请您先登陆个人帐号再查看个人购物车';
					this.nocart=true;
					this.showcart=false;
				}else{
					this.$axios.post('http://127.0.0.1:3009/api/cart/cartlist',{'UserName':loginuser})
					.then((res)=>{
								console.log(res);
								if(res.data.data.length==0){
										this.nocart=true;
										this.showcart=false;
										this.tishi='您的购物车空空如也';
								}else{
							this.nocart=false;
							this.showcart=true;
								this.cartdata=res.data.data;
								this.checknum=new Array(res.data.data.length)
								}
								console.log(this.checknum)				 
					})
					.catch((err)=>{
							console.log(err);
					})
				}
			},
			add(index,bianhao,data,shuliang){
				if(this.cartdata[index].addnumber<shuliang){
					this.cartdata[index].addnumber+=1;
				}else{
					this.cartdata[index].addnumber=shuliang;
				}						
						var addnum=this.cartdata[index].addnumber
						this.addtocart(bianhao,data,addnum);
			},
			reduce(index,bianhao,data){
				if(this.cartdata[index].addnumber<=1){
					this.cartdata[index].addnumber=1;
				}else{
					this.cartdata[index].addnumber-=1;
				}
				var addnum=this.cartdata[index].addnumber
				this.addtocart(bianhao,data,addnum);  
			},
			onecheck(index){
				this.price=0
				this.checknum[index]=!this.checknum[index]
				console.log(this.checknum)
				var allchecknum=[]
				for(var i=0;i<=this.checknum.length;i++){
					if(this.checknum[i]){
						allchecknum.push(i)
						var onedanjia=JSON.parse(this.cartdata[i].data).danjia;
						this.price+=Number(this.cartdata[i].addnumber)*1*onedanjia;
					}
				}
				console.log(allchecknum.length,this.checknum.length)
				if(allchecknum.length==this.checknum.length){
					this.checkall=true;
				}else{
					this.checkall=false;
				}
			},
			allcheck(){
				this.checkall=!this.checkall;
				this.price=0;
        if(this.checkall){
					for(var i=0;i<this.cartdata.length;i++){
						this.checknum[i]=true
					}
				}else{
					for(var i=0;i<this.cartdata.length;i++){
						this.checknum[i]=false
					}
				}
				for(var i=0;i<=this.checknum.length;i++){
					if(this.checknum[i]){
						var onedanjia=JSON.parse(this.cartdata[i].data).danjia;
						this.price+=Number(this.cartdata[i].addnumber)*1*onedanjia;
					}
				}
				console.log(this.checknum)
			},
			addtocart(bianhao,data,addnum){
							var loginuser = localStorage.getItem("loginuser");
							if(loginuser===undefined || loginuser==='' || loginuser===null){
						 Toast({
											message: '请先登陆',
											position: 'middle',
											duration: 2000
											});
					 }else{
						this.$axios.post('http://127.0.0.1:3009/api/cart/addtocart',
						{'bianhao':bianhao,'data':data,'UserName':loginuser,'jiajian':addnum})
						.then((res)=>{
								console.log(res);	
								if(res.data.err==0){
										if(addnum===-1){
										this.cartlist();
										Toast({
												message: "购物车商品添加成功",
												position: 'bottom',
												duration: 2000,
												className:'tankuang',
												});
										} else{
											Toast({
												message: "商品数量修改成功",
												position: 'bottom',
												duration: 2000,
												className:'tankuang',
												});
										}		
								}
						
						})
						.catch((err) => {
								console.log(err);
						})
					 }
                   
				},
			toxiangqing(data){
				localStorage.setItem('xiangqing',data );
				this.$router.push({name:'xiangqing'});
			},
			tobuy(){
				var buydatas=JSON.stringify(this.cartdata);
				localStorage.setItem('buydata', buydatas);
				localStorage.setItem('buyreturn', 'cart');  
				var shouhuodizhi = localStorage.getItem("shouhuodizhi");
				if(shouhuodizhi===undefined || shouhuodizhi==='' || shouhuodizhi===null){
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
			this.likedata();
			this.cartlist();
		}
	}
</script>

<style lang="less" scoped>
	@import '../styles/main.less';
	@import url('../styles/animate.css');
	#cart {
		.w(375);
		background: rgb(240, 237, 237);
		.head{
			 .w(375);
				.h(35);
				.lh(35);
				z-index: 100;
				position: fixed;
				top:0px;
				left:0px;
				z-index: 100;
				background: white;
				text-align: center;
				.fs(16);
				color:gray;
				.mg(0,0,10,0);
			}
		.nocart{
			.mg(35,0,0,0);
			background: white;	
			p{  
				text-align: center;
				.h(55);
				.lh(55);
				.fs(14);
				color:@font2;
				.guang{				
				   display: inline-block;
				   .w(100);
				   .h(28);
				   .lh(28);
				   text-align: center;
				   color:white;
				   background: @green;
				   .br(30);											
			    }
			    .fa{
            .fs(45);
			    }
			}			
		}
		.like{
			.mg(15,0,0,0);
			background: white;
        .ltop{
			   .h(30);
			   .lh(30);
			   text-align: center;
			   .fs(12);
			   color:red;
		   }
		   ul{ 
				 .w(375);
			   	display: -webkit-flex; /* Safari */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content:space-around;
					align-items:center;
					
			   li{ position: relative;
					 background: white;
			      .mg(10,0,0,0);
				   .w(150);
					 .fs(12);
					 .likezhe{
						 position: absolute;
						 top:0px;
						 left:0px;
						 z-index: 60;
							.fs(16);
							.w(150);
							.h(225);
							.lh(225);
							text-align: center;
							color: white;
							background: black;
							opacity: 0.5;
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
					 }
			   }
		   }
		}
		.showcart{	
			.mg(35,0,0,0);				
			ul{
				li{
					position: relative;
					background: white;
					.w(375);
					.h(100);
					.mg(5,0,0,0);
				  	display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:flex-start;
						align-items:center;
						.cartzhe{
							.fs(16);
							text-align: center;
							position: absolute;
							top:0px;
							left:0px;
							.w(375);
							.h(100);
							.lh(100);
							z-index: 120;
							background: black;
							color:white;
							opacity: 0.5;
						}
						.dele{
								display:inline-block;
								z-index: 80;
								position: absolute;
								.position-right(5);
								.position-top(3);
								.w(18);
								.h(18);
								text-align: center;
								.lh(18);
								color:red;
								border:1px solid red;
								.br(10);
								.fs(14);
						}
					.check{
						.w(16);
						.h(16);
						.mg(0,5,0,5);
						border:none;
						
					}
					img{
						.w(90);
						.h(95);					
					}
					.good{
						display: inline-block;
						.w(250);
						box-sizing: border-box;
						.pd(0,0,0,20);
						.fs(14);
						p{							
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
							position: relative;
							.fs(12);
							.h(33);
							.lh(33);
							input{
								.w(30);
								text-align: center;
								border:red 1px solid;
							}
							.numb{
								position: absolute;
								.position-right(10);
								.position-bottom(0);
								display: inline-block;
								span{
								display:inline-block;
								// .w(45);
								text-align: center;
								}
								.jian{
								// .mg(0,0,0,40);
								.fs(18);
								.w(25);
							}
							.jia{
								.w(25);
								.fs(18);
							}
							}
							
							
						}
					}
				}
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
		.buy{
			.w(375);
			.pd(0,0,0,10);
			box-sizing: border-box;
			z-index: 100;
			position: fixed;
			.position-bottom(49);
			.position-right(0);
			.fs(12);
			.h(35);
			.lh(35);
			border-top:1px solid #ccc;
			background:white;
			.jiesuan{
				position: absolute;
				.position-bottom(0);
			.position-right(0);
				display:inline-block;
				.w(60);
				.h(35);
				.lh(35);
				text-align: center;
				background:red;
				.mg(0,0,0,30);
				color:white;
			}
		}
    }
</style>