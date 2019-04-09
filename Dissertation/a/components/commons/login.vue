<template>
<div class="login">
	<ul>
		<li>邮箱：&nbsp;&nbsp;&nbsp;<input @keyup="yx" type="text" name="" id="" value="" v-model="user"/>
		<span>{{usern}}</span></li>
		<li>密码：&nbsp;&nbsp;&nbsp;<input  @keyup="mm" type="text" name="" id="" value="" v-model="pass"/>
		<span>{{passn}}</span></li>
		<li ><input @click="login" class="btn" type="button" name="" id="" value="登陆" /></li>
		<li>{{success}}</li>
	</ul>
</div>
</template>

<script>
	export default{
		name:'Login',
		data(){
			return{
				user:'',
				usern:'',
				pass:'',
				passn:'',
				success:''
			}
			
		},
		methods:{
			yx(){
				this.usern=/^\d{6,13}@qq\.com$/.test(this.user) ? '' : '请输入邮箱';
				
			},
			mm(){
				this.passn=/(\d[A-z]|[A-z]\d)/.test(this.pass) ? '' : '密码必须含数字和英文';
			},
			login(){
				if(this.usern=='' && this.passn==''){
					this.$axios.post('http://127.0.0.1:3000/api/user/login',
						 {
							'email':this.user,
							'pass':this.pass,
						}
					)
					.then((res) => {
						console.log(res)
						if(res.data.err==0){
							this.$router.push({name:'Home'})
						}else{
							this.success=res.data.msg;
						this.user='';
						this.pass='';
						}
						
						
					})
					.catch((err) => {
						console.log(err);
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../styles/main.less';
	.login{
		.w(375);
		.h(667);
		.pd(200,0,0,0);
		box-sizing:border-box;
		ul{
		
			li{
				.fs(16);
				.w(375);
				.h(50);
				.mg(0,0,0,5);
				.lh(50);
				input{
					.w(180);
					.h(30);
				}
				
				span{
					.fs(12);
					.mg(0,0,0,5);
				}
				.hq{display:inline-block;
					.w(100);
					.h(20);
					background:@head;
					.lh(20);
				}
			}
			.btn{
				.mg(0,0,0,70);
				background:@head;
			}
		}
	}
</style>