<template>
<div class="reg">
	<ul>
		<li>邮箱：&nbsp;&nbsp;&nbsp;<input @keyup="yx" type="text" name="" id="" value="" v-model="user"/>
		<span>{{usern}}</span></li>
		<li>密码：&nbsp;&nbsp;&nbsp;<input  @keyup="mm" type="text" name="" id="" value="" v-model="pass"/>
		<span>{{passn}}</span></li>
		<li>验证码：<input type="text" name="" id="" value="" v-model="yanz"/>
		<span @click="text" class="hq">{{yzm}}</span></li>
		<li ><input @click="reg" class="btn" type="button" name="" id="" value="注册" />
		<span>{{success}}</span></li>
	</ul>
</div>
</template>

<script>
	export default{
		name:'Reg',
		data(){
			return{
				user:'',
				usern:'',
				pass:'',
				passn:'',
				yanz:'',
				yzm:'获取验证码',
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
			text(){
				if(this.usern=='' && this.passn==''){
					this.$axios.post('http://127.0.0.1:3000/api/user/proving',
						 {
							'email':this.user
						}
					)
					.then((res) => {
						
						this.yzm=res.data.msg
						
					})
					.catch((err) => {
						console.log(err);
					})
				}
				
			},
			reg(){
				if(this.usern=='' && this.passn==''&&this.yanz!=''){
					this.$axios.post('http://127.0.0.1:3000/api/user/reg',
						 {
							'email':this.user,
							'pass':this.pass,
							'prov':this.yanz
						}
					)
					.then((res) => {
						if(res.data.err==0){
							this.$router.push({name:'login'})
						}else{
							this.success=res.data.msg;
							this.success=res.data.msg;
						this.yzm="获取验证码";
						this.yanz='';
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
	.reg{
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