<template>
	<div id="banner">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" 
					v-for="(item,index) in datas" 
					:key="index" >
					<img :src="item.pic_url" @click='setid(item.id,item)'/>
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Swiper from 'swiper';
	export default {
		name: 'Banner',
		data() {
			return {
				datas:[]
			}
		},
		methods: {
			getlist() {
				this.$axios.get('/api/api/v3/home?',
				{params:{page:1}})
				.then((res)=>{
					this.datas=res.data.datas.items[0].items;
					Vue.nextTick(() => {
					this.mySwiper=new Swiper('.swiper-container', {
						loop: true, // 循环模式选项   
//						scrollbar: {
//							el: '.swiper-pagination',
//						}
					})
				});
				})
				.catch((err)=>{
					console.log(err);
				})
				
			},
			setid(id,data) {
				sessionStorage.setItem("id", id);
				var dt = JSON.stringify(data);
				sessionStorage.setItem("data", dt);
				this.$router.push({path:'/Banners'})
			}
		},
		created() {
			this.getlist();
		},
		destroyed(){
            delete this.mySwiper
		}
	}
</script>
<style lang='less' scoped>
	@import '../../../styles/main.less';
	@import '../../../../node_modules/swiper/dist/css/swiper.css';
	#banner {
		.pd(85,7.5,0,7.5);
		.swiper-slide{
			.w(360);
			.h(240);	
		}
		img {
			.w(360);
			.h(240);
		}
	}
</style>