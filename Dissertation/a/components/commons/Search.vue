<template>
	<div id="search">
		<div class="top">
			<ul>
				<li class="ii" @click="returns"><i class="fa fa-chevron-left"></i></li>
				<li class="ii i2"><i class="fa fa-search"></i></li>
				<li class="inp">
					<input type="text" name="" id="" value="" :placeholder="place" 
						@keyup="inp" v-model="val" v-on:keyup.enter="sousuo"/>
				</li>
				<li class="se" @click="sousuo">搜索</li>
			</ul>
			<span v-show='show3' @click='three'><i class="fa fa-times" aria-hidden="true"></i></span>
		</div>
		<div class="btm" v-show="show1">
			<p>热门搜索</p>
			<div class="re">
				<span @click="find(item)" v-for="(item,index) in search" :key="index">{{item}}</span>
			</div>
			<p class='his'>搜索历史</p>
			<p @click='find(item)' v-for="(item,index) in hiss" :key="index">
				<i class="fa fa-clock-o" aria-hidden="true"></i>{{item}}</p>
			<!--<p><i class="fa fa-clock-o" aria-hidden="true"></i>啊啊啊</p>-->
		</div>
		<div class="find" v-show="show2">
			<ul>
				<li v-for="(item,index) in data" :key="index">
					<img :src="item.logo" />
					<p>{{item.name}}</p>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	var his=[];
	import qs from 'qs';
	export default {
		name: 'Search',
		data() {
			return {
				search: ['我家大师兄脑子有坑', '英雄？我早就不当了',
					'绝世武神', '当神不让', '非人哉', '长歌行',
					'百合', '纯情丫头火辣辣', '伊藤润二', '日常幻想指南', '微微一笑很倾城',
					'妖神记', '凤求凰'
				],
				place: '漫画 | 作者 | 资讯 | 漫展',
				show1: true,
				show2: false,
				show3: false,
				val: '',
				data: [],
				hiss:his
			}
		},
		methods: {
			find(item) {
				this.show1 = false;
				this.show2 = true;
				this.show3 = true;
				this.val = item;
				this.$axios.post('/api/search/ajax_search', qs.stringify({
						key: item
					}))
					.then((res) => {
						console.log(res);

						this.data = res.data.datas.items;
						console.log(this.data);
					})
					.catch((err) => {
						console.log(err);
					})
			},
			inp() {
				this.show3 = true
			},
			three() {
				this.show3 = false;
				this.show1 = true;
				this.show2 = false;
				this.val = '';
			},
			sousuo() {
				if( this.val!== '') {
					if(this.show2== false) {
						
						
						if(localStorage.getItem('search')==null){
							
							his.unshift(this.val);
							localStorage.setItem('search',his);
							
						}
						else{
							if(his.length>=6){
								his[0]=this.val
							}else{
								his.unshift(this.val);
							}
							localStorage.setItem('search',his);
						}
						this.$axios.post('/api/search/ajax_search', qs.stringify({
								key: this.val
							}))
							.then((res) => {
								console.log(res.data.msg);
								if(res.data.msg=='没有数据'){
									this.show1=true;
									this.show2=false;
									Toast('没有找到相关内容~！');
								}else{
								this.data = res.data.datas.items;
								console.log(this.data);
								this.show2=true;
								this.show1=false;
								}
								
							})
							.catch((err) => {
								console.log(err);
							})
					}

				}
			},
			returns(){
				this.$router.push({
					path: '/home'})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../styles/main.less';
	#search {
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
				.inp {
					position: relative;
					.w(219);
					.h(40);
					input {
						outline: none;
						position: absolute;
						.position(0, 0);
						.w(219);
						.h(40);
						.fs(15);
						border: none;
						background: #e4e5e7;
						color: @font;
					}
				}
				.se {
					.fs(15);
					.mg(0, 0, 0, 5);
					.w(65);
					.h(40);
					background: @head;
					text-align: center;
					border-radius: 5px;
					color: white;
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
		.btm {
			p {
				.fs(15);
				color: @font2;
				.w(360);
				.h(39);
				.lh(39);
				.pd(0, 7.5, 0, 7.5);
				.mg(0, 7.5, 0, 7.5);
				box-sizing: border-box;
			}
			.his {
				.h(19);
				.lh(19);
				.mg(30, 0, 0, 0);
			}
			.re {
				span {
					display: inline-block;
					.pd(5, 12, 5, 12);
					border: 1px solid @c;
					border-radius: 30px;
					.fs(14);
					.mg(0, 5, 0, 5);
					color: #666;
				}
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
	}
</style>