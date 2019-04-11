<template>
	<div id="my">
		<div class="myhead">
			<img src="../img/my.jpg" alt="">
			<span class="user" @click="login"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
			<div class="regl">
				<span @click="login">{{login}}</span>
				<span>/</span>
				<span @click="reg">{{reg}}</span>
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
				reg:'注册'
			}
		},
		components: {
			tab
		},
		methods: {
			login(){
				this.$router.push({name:'login'})
			},
			reg(){
				this.$router.push({name:'reg'})
			}
		},
		created() {
			
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