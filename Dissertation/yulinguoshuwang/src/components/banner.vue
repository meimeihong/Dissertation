<template>
	<div id="banner">
		<mt-swipe :auto="2000">
			<mt-swipe-item v-for="(item,index) in datas" :key="index">
				<img :src="item.img.split(',')[1]" @click="toxiangqing(item)"/>
		</mt-swipe-item>
			
		</mt-swipe>
	</div>
</template>
<script src="../../node_modules/swiper/dist/js/swiper.min.js"></script>
<script>
	import Vue from 'vue';
	import { Swipe, SwipeItem } from 'mint-ui';
   Vue.component(Swipe.name, Swipe);
   Vue.component(SwipeItem.name, SwipeItem);
	export default {
		name: 'Banner',
		data() {
			return {
				datas:[]
			}
		},
		methods: {
			getlist() {
				this.$axios.post('http://127.0.0.1:3000/api/goods/banner',{})
				.then((res)=>{
					this.datas=res.data.data;
				})
				.catch((err)=>{
					console.log(err);
				})
				
			},
			toxiangqing(data){
                    var xiangqingdata=JSON.stringify(data);
                     localStorage.setItem('xiangqing', xiangqingdata);
                     this.$router.push({name:'xiangqing'});
                }
		},
		created() {
			this.getlist();
		},
		destroyed(){
		}
	}
</script>
<style lang='less' scoped>
	@import '../styles/main.less';
	@import '../../node_modules/swiper/dist/css/swiper.css';
	#banner {
		.mg(42,0,0,0);
		.pd(0,2,0,2);
			.w(370);
			.h(240);	
		img {
			.w(370);
			.h(240);
		}
	}
</style>