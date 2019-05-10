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
				<li @click="todingdan('已收货')">
					<span span class="tu"><i class="fa fa-hand-rock-o" aria-hidden="true"></i></span>
					<span>已收货</span>						
				</li>
			<!-- <i class="fa fa-commenting-o" aria-hidden="true"></i> -->
				<li @click="todingdan('退换货')">
					<span span class="tu"><i class="fa fa-window-close" aria-hidden="true"></i></span>
					<span>退换货</span>						
				</li>
			</ul>
		</div>
		<div class="msg">
           <ul>
			   <li  @click="tomsg('个人信息')">
				   <span class="tub"><i class="fa fa-comments" aria-hidden="true"></i></span>
				   <span>个人信息</span>
			   </li>
			   <li @click="tomsg('密码修改')">
				   <span  class="tub"><i class="fa fa-unlock-alt" aria-hidden="true"></i></span>
				   <span>密码修改</span>
			   </li>
			   <li  @click="tomsg('商品评论')">
				   <span  class="tub"><i class="fa fa-commenting-o" aria-hidden="true"></i> </span>
				   <span>商品评论</span>
			   </li>
			   <li  @click="tomsg('个人信息')">
				   <span class="tub"><i class="fa fa-map-marker" aria-hidden="true"></i> </span>
				   <span>收货地址</span>
			   </li>
			   <li  @click="tomsg('我的收藏')">
				   <span class="tub" style="color:red;"><i class="fa fa-heart" aria-hidden="true"></i></span>
				   <span>我的收藏</span>
			   </li>
		   </ul>
		</div>
		<div class="gerenmsg" v-show="togerenmsg">
            <p class="top">
				<span @click="togerenmsgfalse()"><i class="fa fa-chevron-left"></i></span>
				<span>个人信息</span>
			</p>
			<ul>
				<li>
					<span class="tubiao">
						<i  class="fa fa-user-circle-o" aria-hidden="true"></i>
					</span>
					<span>用户名：</span>
					<input type="text" v-model="usermsg.UserName">
					<span class="xiugai" @click="xiugai('用户名',usermsg.UserName)">修改</span>
				</li>
				<li>
					<span  class="tubiao">
						<i class="fa fa-envelope" aria-hidden="true"></i>
					</span>
					<span>邮箱：</span>
					<input type="text" v-model="usermsg.Email">
					<span class="xiugai" @click="xiugai('邮箱',usermsg.Email)">修改</span>
				</li>
				<li>
					<span class="tubiao">
						<i class="fa fa-phone-square" aria-hidden="true"></i>
					</span>
					<span>电话号码：</span>
					<input type="text" v-model="usermsg.TelephoneNumber">
					<span class="xiugai" @click="xiugai('电话',usermsg.TelephoneNumber)">修改</span>
				</li>
				<li>
					<span class="tubiao">
						<i class="fa fa-map-marker" aria-hidden="true"></i> 
					</span>
					<span>收货地址：</span>
					<input type="text" v-model="usermsg.dizhi">
					<span class="xiugai" @click="xiugai('地址',usermsg.dizhi)">修改</span>
				</li>
				<p class="tshi">{{tishi}}</p>
				<p class="tui" @click="tuichu()">退出账号</p>
			</ul>
			<div class="nomsg" @click="togerenmsgfalse()">
             没有其他信息了哦~~~
			 点我返回
		    </div>
		</div>
		
		<tab :listname="listname"></tab>
	</div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'mint-ui';
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
				togerenmsg:false,
				usermsg:[],
				tishi:''
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
				var loginuser = localStorage.getItem("loginuser");
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
				var loginuser = localStorage.getItem("loginuser");
				if(loginuser===undefined || loginuser==='' || loginuser===null){
					Toast({
						message: '请您先登陆再访问',
						position: 'middle',
						duration: 2000,
						className:'tankuang',
                   });
				}else{
					localStorage.setItem('dingdan', name);
				this.$router.push({name:'dingdan'});
				}    
			},
			tomsg(msg){
				var loginuser = localStorage.getItem("loginuser");
				if(loginuser===undefined || loginuser==='' || loginuser===null){
					Toast({
						message: '请您先登陆再访问',
						position: 'middle',
						duration: 2000,
						className:'tankuang',
                   });
				}else if(msg=='密码修改'){
					this.$router.push({name:'password'});
				}else if(msg=='个人信息'){
					localStorage.setItem('togerenmsg', 'msg');
					this.msgcreated();
				}else if(msg=='商品评论'){
					this.$router.push({name:'pinglun'});
				}else if(msg=='我的收藏'){
					this.$router.push({name:'shoucang'});
				}
			},
			togerenmsgfalse(){  
				localStorage.setItem('togerenmsg', '');
				this.togerenmsg=false;
			},
			msgcreated(){
				var message= localStorage.getItem("togerenmsg");
				var loginuser = localStorage.getItem("loginuser");
				if(message=='msg'){
					this.togerenmsg=true;
					this.$axios.post('http://127.0.0.1:3000/api/user/usermsg', {'UserName':loginuser})
					.then((res) => {
					console.log(res)
					if(res.data.err==0){
						this.usermsg=res.data.data;
					}						
					})
					.catch((err) => {
						console.log(err);
					})
				}
			},
			xiugai(name,content){
				   var no=content.trim();
				   this.tishi='';
				   var loginuser = localStorage.getItem("loginuser");
				   if(no==''){
                      this.tishi='请填写相应的修改信息';
				   }else if(name=='邮箱'){
                       this.tishi=/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/.test(this.usermsg.Email) ? '' : '请输入正确邮箱格式';
				   }else if(name=='电话'){
					   this.tishi=/^[1][3,4,5,7,8][0-9]{9}$/.test(this.usermsg.TelephoneNumber)?'':'请输入正确手机号码';
				   }else if(content==loginuser){
					   this.tishi='您的用户名与上一个用户名相同，请重新设置'
				   }
					if(this.tishi=='') {
						this.$axios.post('http://127.0.0.1:3000/api/user/xiugai', {'UserName':loginuser,'xiugai':name,'content':content})
							.then((res) => {
							console.log(res)
							if(res.data.msg=='用户名修改成功'){
								localStorage.setItem('loginuser', content);
								this.msgcreated();
							}
							if(res.data.msg=='地址修改成功'){
								localStorage.setItem("shouhuodizhi",content);
								this.msgcreated();
							}
							if(res.data.err==-1){
								this.tishi=res.data.msg;
							}else{
								Toast({
								message: res.data.msg,
								position: 'middle',
								duration: 2000,
								className:'tankuang',
						});
							}					
						})
						.catch((err) => {
							console.log(err);
						})
					}
				   			
			},
			tuichu(){
			  localStorage.setItem('loginuser', '');
			  this.togerenmsgfalse()
			  this.getusername();
			}
		},
		created() {
			   this.getusername();
			   this.msgcreated();
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
	.msg{
		.w(375);
		.mg(10,0,0,0);
		background: white;
		ul{
			display: -webkit-flex; /* Safari */
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content:left;
			align-items:center;	
			li{ .fs(16);
				.w(375);
				.pd(0,15,0,15);
				box-sizing: border-box;
				.h(40);
				.lh(40);
				border-bottom: #ccc solid 1px;
				color:gray;
				.tub{
					display:inline-block;
					.w(50);
					.mg(0,8,0,0);
					text-align: center;
					box-sizing: border-box;
					.fs(22);
					color:@green;
				}
			}
		}
	}
	.gerenmsg{
		.w(375);
		.h(667);
		background: white;
		z-index: 150;
		position: fixed;
		top:0px;
		left:0px;
		.fs(16);
		.top{
		   color:@green;
		   .h(40);
		   .lh(40);
		   border-bottom: #ccc 1px solid;
		   span{
			   display: inline-block;
			   .w(50);
			   text-align: center;
		   }
		   span:last-child{
			 .w(300);			 
		   }
		}
		ul{
			display: -webkit-flex; /* Safari */
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content:left;
			align-items:center;	
			.mg(25,0,0,0);
			li{ display: -webkit-flex; /* Safari */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content:left;
				align-items:center;	
				.h(50);
				.lh(50);
				.fs(16);
				.w(375);
				span{
					color:@green;
					display:inline-block;
					.w(80);
					.h(50);
					.lh(50);
					text-align: center;
				}
				.tubiao{
					.w(40);
					.fs(22);
				}
				.xiugai{
					.w(50);
					z-index: 100;
				}
				input{
					.w(180);
					.h(50);
					.lh(50);
					border:none;
					outline:none;
					color:gray;
				}
			}
		.tshi{
			.w(375);
			.fs(12);
			text-align: center;
			color:red;
		}
		.tui{   .w(375);
				color:red;
				text-align: center;
			}
		}
	}
	.nomsg{
		.w(375);
		.h(300);
		background: rgb(241, 241, 241);
		.lh(300);
		.fs(16);
		text-align: center;
		.mg(100,0,0,0);	
		color:@green;
	}
}
</style>