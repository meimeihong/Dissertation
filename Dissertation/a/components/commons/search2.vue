<template>
	<div class="search">
		<div class="top">
			<ul>	
				<li class="ii i2"><i class="fa fa-search"></i></li>
				<li class="li1">
					<input type="text" name="" id="" value="" 
					:placeholder="place" v-model="val" 
					 v-on:keyup.enter="sousuo"/>
				</li>
				<li class="se" @click="returns">取消</li>
			</ul>
		</div>
		<div class="find" v-show="show1">
			<ul>
				<li v-for="(item,index) in data" :key="index">
					<img :src="item.logo" />
					<p>{{item.name}}</p>
				</li>
			</ul>
		</div>
		<div class="nofound" v-show="show2">
			<img src="http://m.buka.cn/static/img/nodata.png"/>
			<p>这真是个悲伤的故事</p>
			<p>该内容暂未收录哦</p>
		</div>
	</div>
</template>

<script>
	var his=[];
	import qs from 'qs';
	export default {
		name: 'Search2',
		data() {
			return {
				place: '漫画 | 作者 | 资讯 | 漫展',
				show1: false,
				show2: false,
				val: '',
				data: []
			}
		},
		methods: {
			sousuo() {
				if( this.val!== '') {
						this.$axios.post('/api/search/ajax_search', qs.stringify({
								key: this.val
							}))
							.then((res) => {
								console.log(res.data.msg);
								if(res.data.msg=='没有数据'){
									this.show1=false;
									this.show2=true;
								}else{
								this.data = res.data.datas.items;
								console.log(this.data);
								this.show2=false;
								this.show1=true;
								}
								
							})
							.catch((err) => {
								console.log(err);
							})
					}

				},
				returns(){
					var skip=sessionStorage.getItem("skip");
					if(skip=='http://localhost:8080/#/Ranking'){
					this.$router.push({
					path: '/Ranking'})
				}else{
					this.$router.push({
					path: '/Category'})
				}
				}
			}
		
	}
</script>

<style lang="less" scoped>
	@import '../../styles/main.less';
	.search {
		.top {
			border-bottom: 1px solid @c;
			position: relative;
			.w(375);
			.h(56);
			.pd(5, 5, 5, 5);
			box-sizing: border-box;
			ul {
				overflow: hidden;
				li {
					float: left;
					color: @font;
					.w(33);
					.h(40);
					.lh(40);
				}
				.li1 {
					position: relative;
					.w(250);
					.h(40);
					input {
						outline: none;
						position: absolute;
						.position(0, 0);
						.w(250);
						.h(40);
						.fs(15);
						border: none;
						border-radius: 2px;
						background: #e4e5e7;
						color: @font;
					}
				}
				.se {
					.fs(15);
					.mg(0, 0, 0, 5);
					.w(65);
					.h(40);
					
					text-align: center;
					border-radius: 5px;
					color: @font;
				}
				.ii {
					text-align: center;
					.fs(18);
					color: @font2;
				}
				.i2 {
					background: #e4e5e7;
				}
			}
			span {
				display: inline-block;
				.w(33);
				.h(40);
				.lh(40);
				.fs(18);
				position: absolute;
				.position(5, 250);
				text-align: center;
				color: #fe960e;
			}
		}
		.find {
			.pd(8, 0, 8, 0);
			ul {
				overflow: hidden;
				li {
					.mg(0, 0, 5, 5);
					.w(115);
					.h(202);
					float: left;
					img {
						.w(114);
						.h(165);
					}
					p {
						.w(114);
						.h(32);
						.fs(14);
					}
				}
			}
		}
		.nofound{
			.mg(200,0,0,115);
			.w(140);
			.h(190);
			p{
				.fs(14);
				color:#d8d8d8;
			}
		}
	}
</style>