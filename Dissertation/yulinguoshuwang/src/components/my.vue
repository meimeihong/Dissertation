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
				username:''
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
    }
</style>