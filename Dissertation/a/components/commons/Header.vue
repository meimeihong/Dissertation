<template>
<div id="header">
	<div class="head">
		<a class="im"><img :src="img"/></a>
	<a class="load" @click='show'>安装APP</a>
	<a class="find" @click="finds"><i class="fa fa-search"></i></a>
	</div>
	<Shade v-show="sel" :show='show'></Shade>
</div>
</template>

<script>
	import Shade from './shade';
	export default{
		name:'Header',
		data(){
			return{
				img:'http://m.buka.cn/static/img/logo_2x.png',
				sel:false,
				logo:''
			}
		},
		methods:{
			show:function(){
				this.sel=!this.sel;
			},
			finds(){
				var skip=sessionStorage.getItem("skip");
				console.log(skip);
				if(skip=='http://localhost:8080/#/home'){
					this.$router.push({
					path: '/search'})
				}else if(skip=='http://localhost:8080/#/Ranking'){
					this.$router.push({
					path: '/search2'})
				}else if(skip=='http://localhost:8080/#/Category'){
					this.$router.push({
					path: '/search2'})
				}
				
			}
		},
		components:{
			Shade
		}
	}
</script>

<style lang="less" scoped>
	@import '../../styles/main.less';
	#header{
		position:fixed;
		.position(0,0);
		z-index:80;
	.head{
		position:relative;
		.lh(44);
		.w(375);
		.h(40);
		background:@bg-color;
		.im{.mg(15,0,0,0);
			.w(120);
			.h(35);
			.mg(0,0,0,10);
			display: inline-block;
			img{
				.w(60);
				.h(29);
			}
		}
		.load{
			position:absolute;
			display: block;
			.w(75);
			.h(28);
			.fs(12);
			.pd(0,7,0,7);
			.position(7,80);
			box-sizing: border-box;
			.lh(28);
			background:@head;
			color:white;
			text-align:center;
			border-radius: 5px;
		}
		.find{
			position:absolute;
			.position-top(0);
			.position-right(0);
			.w(120);
			.h(44);
			text-align: right;
			
			i{	position:absolute;
				.position-top(7);
				.position-right(10);
				.w(26);
				.h(26);
				.fs(26);
				color:@head;
				
			}
		}
		
	}
	}
</style>