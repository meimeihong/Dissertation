<template>
	<div id="homehead">
		<ul>
		<li v-for="(items,index) in lis" 
			:key="index" @click="select(items)" 
			:class="listname===items?'sl':''">
			<a>{{items}}</a>
		</li>
		</ul>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		name:'Homehead',
		props:['listname'],
		data(){
			return{
				lis:['推荐','排行','分类'],
			}
		},
		methods:{
			select(item){
				this.sel=item;
				if(item=='排行'){
					this.$router.push({
					path: '/Ranking'})
				}else if(item=='分类'){
					this.$router.push({
					path: '/Category'})
				}else if(item=='推荐'){
					this.$router.push({
					path: '/home'})
				}
		
		}
	}
	}
</script>

<style lang="less" scoped>
@import '../../styles/main.less';
#homehead{
		position:fixed;
		.position(39,0);
		z-index:60;
		background:@bg-color;
	ul{	border-bottom:1px solid #ccc;
	z-index:80;
		.w(375);
		.h(38);
		li{	float:left;
			.w(125);
			.h(38);
			.lh(37);
			a{	
				color:@font;
				display:block;
				.w(125);
				.h(38);
				.fs(16);
				text-align:center;
			}
		}
		.sl{
			a{
				color:@head;
			}
		}
	}
}
</style>