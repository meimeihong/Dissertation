<template>
	<div id="cart">
		<p class="head">购物车</p>
		<div class="nocart" v-show="nocart">
			<p><span><i class="fa fa-shopping-cart" aria-hidden="true"></i></span></p>
			<p><span>您的购物车空空如也</span></p>
			<p><span class="guang">去逛逛</span></p>
		</div>
		<div class="showcart" v-show="showcart">
			<ul>
				<li>
					<span class="dele" @click="open">x</span>
					<input class="check" type="checkbox" name="" id="">
					<img src="../img/my.jpg" alt="">
					<div class="good">
						<p>1大幅大水法三分大师赛顺风顺水事实上撒士大夫打算发生</p>
						<p style="color:gray;">2</p>
						<p>
							<span style="color:red;">￥17831</span>
							<span  style="color:#ccc;">sadsa</span>
							<span class="jian" >-</span>
							<input type="text" value="1">
							<span class="jia">+</span>
							</p>
						
					</div>
				</li>
				<li>
					<input class="check" type="checkbox" name="" id="">
					<img src="../img/my.jpg" alt="">
					<div class="good">
						<p>1大幅大水法三分大师赛顺风顺水事实上撒士大夫打算发生</p>
						<p style="color:#ccc;">2</p>
						<p>
							<span style="color:red;">￥17831</span>
							<span class="jian" >-</span>
							<input type="text" value="1">
							<span class="jia">+</span>
						</p>
						
					</div>
				</li>
			</ul>
		</div>
		<div class="like">
				<p class="ltop">~~您可能会喜欢~~</p>
			 <ul>
				<li v-for="(item, index) in like" :key="index">
					 <img :src="item.img.split(',')[0]" alt="">
					 <p>{{item.name}}</p>
					 <p style="color:gray;">{{item.miaoshu}}</p>
					 <p style="color:red;">
							<span>￥</span><span>{{item.danjia}}</span>
							<span class="guige" style="color:#ccc;">/{{item.guige}}</span> 
							<span class="carts"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
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
import tab from './tab.vue';

	export default {
		name: 'cart',
		data() {
			return {
				name:"购物车",
				listname:'cart',
				nocart:false,
				showcart:true,
				like:[]
			}
		},
		components: {
			tab
		},
		methods: {
			likedata(){
            this.$axios.post('http://127.0.0.1:3000/api/goods/tuijian',{})
					.then((res) => {					
            console.log(res);
            this.like=res.data.data;                       
					})
					.catch((err) => {
						console.log(err);
					})
                },
			open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            })
          }
        })},
			onecheck(){
           
			},
			allcheck(){

			}
		},
		created() {
			this.likedata();
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
				.h(35);
				.lh(35);
				background: white;
				text-align: center;
				.fs(16);
				color:gray;
				.mg(0,0,10,0);
			}
		.nocart{
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
		   ul{ .w(375);
			   	display: -webkit-flex; /* Safari */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content:space-around;
					align-items:center;
					
			   li{ background: white;
			      .mg(10,0,0,0);
				   .w(150);
				   .fs(12);
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
			position: relative;			
			ul{
				li{background: white;
					.w(375);
					.h(100);
					.mg(5,0,0,0);
				  	display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:flex-start;
						align-items:center;
						.dele{
								display:inline-block;
								position: absolute;
								.position-right(3);
								.position-top(3);
								.w(15);
								.h(15);
								text-align: center;
								.lh(15);
								color:red;
								border:1px solid red;
								.br(10);
                .fs(12);
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
							.fs(12);
							.h(33);
							.lh(33);
							input{
								.w(30);
								text-align: center;
								border:red 1px solid;
							}
							span{
								display:inline-block;
								.w(45);
								text-align: center;
							}
							.jian{
								.mg(0,0,0,40);
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