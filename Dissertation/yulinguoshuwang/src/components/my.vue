<template>
	<div id="my">
		<div class="myhead">
			<img src="../img/my.jpg" alt="">
			<span class="user" @click="logins"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
			<div class="regl" v-show="usernamehidden">
				<span @click="logins">{{login}}</span>
				<span>/</span>
				<span @click="regs">{{reg}}</span>
			</div>
			<div class="regl" v-show="usernameshow">
				  <span>{{username}}</span>
			</div>
		</div>
		<div class="dingdan">
				<p class="pa">
					<span>我的订单</span>
					<span @click="todingdan('全部订单')">查看全部订单<i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</p>
				<ul>
					<li  @click="todingdan('全部订单')">
            <span class="tu"><i class="fa fa-list-alt" aria-hidden="true"></i></span>
						<span>全部订单</span>						
					</li>
					<li  @click="todingdan('待配送')">
            <span span class="tu"><i class="fa fa-truck" aria-hidden="true"></i></span>
						<span>待配送</span>						
					</li>
					<li @click="todingdan('待自提')">
            <span span class="tu"><i class="fa fa-get-pocket" aria-hidden="true"></i></span>
						<span>待自提</span>						
					</li>
					<li @click="todingdan('评价')">
            <span span class="tu"><i class="fa fa-commenting-o" aria-hidden="true"></i></span>
						<span>评价</span>						
					</li>
				
					<li @click="todingdan('退换货')">
            <span span class="tu"><i class="fa fa-window-close" aria-hidden="true"></i></span>
						<span>退换货</span>						
					</li>
				</ul>
		</div>
		<tab :listname="listname"></tab>
	</div>
</template>

<script>
import tab from './tab.vue';
	export default {
		name: 'my',
		data() {
			return {
				name:"我的",
				listname:'my',
				login:'登陆',
				reg:'注册',
				usernameshow:false,
				usernamehidden:true,
				username:'',
			}
		},
		components: {
			tab
		},
		methods: {
			logins(){
				this.$router.push({name:'login'})
			},
			regs(){
				this.$router.push({name:'reg'})
			},
			getusername(){
				// localStorage.setItem('loginuser', '');
				var loginuser = localStorage.getItem("loginuser");
				console.log(loginuser)
		       if(loginuser===undefined || loginuser==='' || loginuser===null){
						 this.usernameshow=false;
						 this.usernamehidden=true;
					 }else{
						 this.username=loginuser;
						 this.usernameshow=true;
						 this.usernamehidden=false;
						 
					 }
				
			},
			todingdan(name){		
				if(name!=='评价'){
					localStorage.setItem('dingdan', name);
					this.$router.push({name:'dingdan'});
				}
        
			}
		},
		created() {
			   this.getusername();
		}
	}
</script>

<style lang="less" scoped>
	@import '../styles/main.less';
	@import url('../styles/animate.css');
	#my {
		background: rgb(233, 231, 231);
		.w(375);
		.myhead{
			position: relative;
			img{
				.w(375);
				.h(200);
			}
			span{
				text-align: center;
				display:inline-block;
			}
			.user{
				.w(60);
				.h(60);
				.lh(60);
				.fs(50);
				color:rgb(240, 234, 234);
				border:0px solid @font2;
				.br(25);
				position: absolute;
				.position(10,155);
			}
			.regl{
				.w(375);
				text-align: center;
				display:inline-block;
				position: absolute;
				.position(80,0);
				.fs(16);
				color:gray;
			}
		}
		.dingdan{
			background: white;
			.fs(14);
			.pa{
				border-bottom: 1px solid #ccc;
				color:gray;
				.pd(10,0,10,0);
				span:first-child{
					.mg(0,175,0,15);
				}
			}
			ul{
				display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:left;
				align-items:center;
				border-bottom: 1px solid #ccc;
				li{
					.w(73);
					.h(60);
					.lh(60);
					text-align: center;
					border-left: 1px solid #ccc;
					display: -webkit-flex; /* Safari */
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content:left;
					align-items:center;
					// border-bottom: 1px solid #ccc;
					color:gray;
					span{
						display:inline-block;
						.w(92);
						.h(30);
						.lh(30);
					}
					.tu{
						.fs(22);
						color:@green;
					}
					} 
				li:first-child{
					border:none;
				}
			}
		}
}
</style>