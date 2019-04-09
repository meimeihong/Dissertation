<template>
	<div class="category">
		<Header></Header>
		<Homehead :listname="listname"></Homehead>
		<div class="container">
			<div class="category-item" 
				v-for='item in Categorylist' 
				@click="setid(item)">
				<div class="class-item-img">
					<img :src="item.img" alt="" />
				</div>
				<div class="class-item-font">{{item.font}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from 'qs';
	import Vue from 'vue';
	import Header from '../../commons/Header.vue';
	import Homehead from "../../commons/Homehead.vue"
	import { InfiniteScroll } from 'mint-ui';
	Vue.use(InfiniteScroll);
	export default {
		name: 'category',
		props: ['category'],
		data() {
			
			return {
				listname:'分类',
				Categorylist: [
					{
						fun: 14,
						param: ' ',
						count: 16,
						start: 0,
						font: "最近更新",
						counts:140,
						img: "http://i-r6.sosobook.cn/logo/group/20160825145944_57be976063e36.png"
					},
					{
						fun: 1,
						param: 10018,
						count: 16,
						start: 0,
						font: "今日热榜",
						counts:140,
						img: "http://i-r6.sosobook.cn/logo/group/20160825145948_57be9764d0c6e.png"
					},
					{
						fun: 1,
						param: 12022,
						count: 16,
						start: 0,
						counts:140,
						font: "已完结",
						img: "http://i-r6.sosobook.cn/logo/group/20170103144735_586b49070de22.png"
					},
					{
						fun: 1,
						param: 12064,
						count: 16,
						start: 0,
						counts:140,
						font: "高分精选",
						img: "http://i-r6.sosobook.cn/logo/group/20161013164354_57ff494a432b3.png"
					},
					{
						fun: 1,
						param: 12084,
						count: 16,
						start: 0,
						counts:140,
						font: "最近上新",
						img: "http://i-r7.ibuka.cn/logo/group/20170424145626_58fda19accdd9.jpg"
					},
					{
						fun: 1,
						param: 12114,
						count: 16,
						start: 0,
						counts:137,

						font: "等待免费",
						img: "http://c-r7.ibuka.cn/logo/group/20180404181853_5ac4a68d11f90.jpg"
					},
					{
						fun: 1,
						param: 12053,
						count: 16,
						start: 0,
						counts:140,
						font: "日韩",
						img: "http://i-r7.ibuka.cn/logo/group/26-2.jpg"
					},
					{
						fun: 1,
						param: 303,
						count: 16,
						start: 0,
						counts:140,
						font: "经典",
						img: "http://i-r7.ibuka.cn/logo/group/20151120172131_564ee61b425c6.jpg"
					},
					{
						fun: 1,
						param: 12033,
						count: 16,
						counts:140,
						start: 0,
						font: "联合出品",
						img: "http://i-r7.ibuka.cn/logo/group/20151013151320_561caf1078614.jpg"
					}, 
					{
						fun: 1,
						param: 12036,
						count: 16,
						start: 0,
						counts:140,
						font: "条漫",
						img: "http://i-r7.ibuka.cn/logo/group/20160314180433_56e68cb162845.jpg"
					},
					{
						fun: 1,
						param: 206,
						count: 16,
						start: 0,
						counts:140,
						font: "百合",
						img: "http://i-r7.ibuka.cn/logo/group/20150925183549_56052385c6f39.jpg"
					},
					{
						fun: 1,
						param: 12009,
						count: 16,
						start: 0,
						counts:140,
						font: "肥皂",
						img: "http://i-r7.ibuka.cn/logo/group/20150909165607_55eff4276f9a7.jpg"
					},
					{
						fun: 1,
						param: 12041,
						count: 16,
						start: 0,
						counts:140,
						font: "玄幻",
						img: "http://i-r7.ibuka.cn/logo/group/20151109155620_564051a421997.jpg"
					},
					{
						fun: 1,
						param: 10008,
						count: 16,
						start: 0,
						counts:140,
						font: "霸道总裁",
						img: "http://c-r7.ibuka.cn/logo/group/20180503111547_5aea7ee2f167c.jpg"
					},
					{
						fun: 1,
						param: 404,
						count: 16,
						start: 0,
						counts:140,
						font: "恋爱",
						img: "http://i-r7.ibuka.cn/logo/group/20150925183521_56052368e6ef1.jpg"
					},
					{
						fun: 1,
						param: 12091,
						count: 16,
						start: 0,
						counts:140,
						font: "用户原创",
						img: "http://c-r7.ibuka.cn/logo/group/20171205113806_5a26149e71529.jpg"
					},
					{
						fun: 1,
						param: 12018,
						count: 16,
						start: 0,
						counts:140,
						font: "游戏",
						img: "http://i-r7.ibuka.cn/logo/group/20150925183527_5605236f5c819.jpg"
					},
					{
						fun: 1,
						param: 202,
						count: 16,
						start: 0,
						counts:140,
						font: "治愈",
						img: "http://i-r7.ibuka.cn/logo/group/20150925183530_56052372a8309.jpg"
					},
					{
						fun: 1,
						param: 403,
						count: 16,
						start: 0,
						counts:140,
						font: "科幻",
						img: "http://i-r7.ibuka.cn/logo/group/20150925183535_56052376e7e91.jpg"
					}, 
					{
						fun: 1,
						param: 10008,
						count: 16,
						start: 0,
						counts:140,
						font: "搞笑",
						img: "http://i-r7.ibuka.cn/logo/group/20150925183542_5605237e62da9.jpg"
					},
					{
						fun: 1,
						param: 211,
						count: 16,
						start: 0,
						counts:140,
						font: "鬼怪",
						img: "http://i-r7.ibuka.cn/logo/group/20150925183546_5605238298cf1.jpg"
					},
					{
						fun: 1,
						param: 12023,
						count: 16,
						start: 0,
						counts:140,
						font: "励志",
						img:"http://i-r7.ibuka.cn/logo/group/20150925183549_56052385c6f39.jpg"
						
					},
					{
						fun: 1,
						param: 410,
						count: 16,
						start: 0,
						counts:140,
						font: "格斗",
						img: "http://i-r7.ibuka.cn/logo/group/20150925183557_5605238dab5d1.jpg"
					},
					{
						fun: 1,
						param: 12103,
						count: 16,
						start: 0,
						counts:140,
						font: "少女漫",
						img: "http://c-r7.ibuka.cn/logo/group/20171201122512_5a20d9a7df135.jpg"
					},
					{
						fun: 1,
						param: 12104,
						count: 16,
						start: 0,
						counts:140,
						font: "少年漫",
						img: "http://c-r7.ibuka.cn/logo/group/20171201122517_5a20d9ad8522f.jpg"
					},
					{
						fun: 1,
						param: 12117,
						count: 16,
						start: 0,
						counts:140,
						font: "真人漫",
						img: "http://c-r7.ibuka.cn/logo/group/20180508131103_5af1316758c39.jpg"
					}
				]
			}
		},
		components: {
			Header,
			Homehead
		},
		methods: {
			setid(datas) {
				var dt = JSON.stringify(datas);
				console.log(dt);
				sessionStorage.setItem("font", dt);
				this.$router.push({
					path: '/CategoryList'
				})
				//http://m.buka.cn/category/ajax_group
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../styles/main.less';
	.container {
		.pd(18px, 0, 0, 0);
		position: absolute;
		.position(79, 0);
		z-index: -1000;
		display: flex;
		justify-content: flex-start;
		flex-flow: row wrap;
		align-content: flex-start;
		.category-item {
			.w(103px);
			.h(126px);
			.mg(0, 10px, 18px, 10px);
			.class-item-img {
				.w(77px);
				.h(77px);
				.mg(13px, 13px, 0, 13px);
				text-align: center;
				img {
					border-radius: 50%;
					width: 100%;
					height: 100%;
					text-align: center;
				}
			}
			.class-item-font {
				.fs(12px);
				color: #333;
				text-align: center;
				.mg(13px, 0, 0, 0);
			}
		}
	}
</style>