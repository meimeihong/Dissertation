<template>
	<div id="groom">
		<div class="div1">
			<span class="span-a"></span>
			<span>{{title}}</span>
		</div>
		<div class="div2" v-for="(item,index) in datas" @click='setid(item)'>
			<img :src='item.pic_url' />
			<p class="div2p1">{{item.title}}</p>
			<p class="div2p2">{{item.subtitle}}</p>
		</div>
		<div class="div3">
			<ul>
				<li v-for="(item,index) in datas1" @click='setid(item)' :class="index%2==0?'twin':''">
					<img :src='item.pic_url' />
					<p class="pt">{{item.title}}</p>
					<p class="pb">{{item.subtitle}}</p>
				</li>
			</ul>
		</div>
		<div class="div2" v-for="(item,index) in datas2" @click='setid(item)'>
			<img :src='item.pic_url' />
			<p class="div2p1">{{item.title}}</p>
			<p class="div2p2">{{item.subtitle}}</p>
		</div>
		<div class="div4">
			<div>
				<img :src="img.a" />
			</div>
			<div class="div41">
				<img :src="img.b" style="margin-right:8px;" />
				<img :src="img.c" />
			</div>

		</div>
		<div class="new">

			<div class="div1">
				<span class="span-a"></span>
				<span>{{newtitle}}</span>
			</div>
			<div class="div2" v-for="(item,index) in new1" @click='setid(item)'>
				<img :src="item.pic_url" />
				<p class="div2p1">{{item.title}}</p>
				<p class="div2p2">{{item.subtitle}}</p>
			</div>
			<div class="div3">
				<ul>
					<li v-for="(item,index) in new2" @click='setid(item)' :class="index%2==0?'twin':''">
						<img :src='item.pic_url' />
						<p class="pt">{{item.title}}</p>
						<p class="pb">{{item.subtitle}}</p>
					</li>
				</ul>
			</div>
			<div class="div2" v-for="(item,index) in new3" @click='setid(item)'>
				<img :src="item.pic_url" />
				<p class="div2p1">{{item.title}}</p>
				<p class="div2p2">{{item.subtitle}}</p>
			</div>
		</div>
		<div id="vip">
			<div class="div1">
				<span class="span-a"></span>
				<span>{{viptitle}}</span>
			</div>
			<div class="div2" v-for="(item,index) in vip1" @click='setid(item)'>
				<img :src="item.pic_url" />
				<p class="div2p1">{{item.title}}</p>
				<p class="div2p2">{{item.subtitle}}</p>
			</div>
			<div class="div3">
				<ul>
					<li v-for="(item,index) in vip2" @click='setid(item)' :class="index%2==0?'twin':''">
						<img :src='item.pic_url' />
						<p class="pt">{{item.title}}</p>
						<p class="pb">{{item.subtitle}}</p>
					</li>
				</ul>
			</div>
			<div class="div2" v-for="(item,index) in vip3" @click='setid(item)'>
				<img :src="item.pic_url" />
				<p class="div2p1">{{item.title}}</p>
				<p class="div2p2">{{item.subtitle}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		name: 'Groom',
		data() {
			return {
				datas: [],
				datas1: [],
				datas2: [],
				new1: [],
				new2: [],
				new3: [],
				newtitle: '',
				vip1: [],
				vip2: [],
				vip3: [],
				viptitle: '',
				img: {
					a: 'http://c-r7.ibuka.cn/auto/appRecom/20181019175230_5bc9a95e364f7.jpg',
					b: 'http://c-r7.ibuka.cn/auto/appRecom/20181019175330_5bc9a99ac6390.jpg',
					c: 'http://c-r7.ibuka.cn/auto/appRecom/20181019175358_5bc9a9b60b1a6.jpg'
				},
				title: ''
			}
		},
		methods: {
			getlist() {
				this.$axios.get('/api/api/v3/home?', {
						params: {
							page: 1
						}
					})
					.then((res) => {
						var data = res.data.datas.items
						this.title = data[1].title;
						this.datas.push(data[1].items[0])
						for(var i = 1; i < data[1].items.length - 1; i++) {
							this.datas1.push(data[1].items[i])
						}
						this.datas2.push(data[1].items[data[1].items.length - 1])

						this.newtitle = data[3].title;
						this.new1.push(data[3].items[0])
						for(var i = 1; i < data[3].items.length - 2; i++) {
							this.new2.push(data[3].items[i])
						}
						this.new3.push(data[3].items[data[3].items.length - 1],
							data[3].items[data[3].items.length - 2])
						this.viptitle = data[4].title;
						this.vip1.push(data[4].items[0])
						for(var i = 1; i < data[4].items.length - 1; i++) {
							this.vip2.push(data[4].items[i])
						}
						this.vip3.push(data[4].items[data[4].items.length - 1])
//						console.log(res);
					})
					.catch((err) => {
						console.log(err);
					})
			},
			setid(data) {
				var dt = JSON.stringify(data);
				sessionStorage.setItem("data", dt);
				this.$router.push({
					path: `/m/${data.ctrlparam}`,
					params: {
						userId: data.ctrlparam
					}
				})
			}
		},
		created() {
			this.getlist();
		}
	}
</script>
<style lang='less' scoped>
	@import '../../../styles/main.less';
	#groom {
		.mg(15, 0, 0, 0);
		.pd(0, 7.5, 0, 7.5);
		p {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		.div1 {
			.w(360);
			.h(17);
			.pd(1, 0, 0, 0);
			box-sizing: border-box;
			.fs(15);
			.lh(17);
			span {
				display: inline-block;
				.h(15);
				color: @font;
			}
			.span-a {
				.w(3);
				background: @head;
				.mg(0, 10, 0, 0);
			}
		}
		.div2 {
			position: relative;
			.mg(12, 0, 0, 0);
			box-sizing: border-box;
			.w(360);
			.h(228);
			img {
				.w(360);
				.h(180);
			}
			.div2p1 {
				/*position: absolute;
				.position-right(0);
				.position-bottom(24);*/
				.w(360);
				.h(19);
				.fs(14);
				.lh(19);
				color: @font;
			}
			.div2p2 {
				/*position: absolute;
				.position-right(0);
				.position-bottom(5);*/
				.w(360);
				.h(19);
				.fs(12);
				.lh(19);
				color: @font2;
			}
		}
		.div3 {
			/*.w(360);
			
			.h(310);*/
			ul {
				overflow: hidden;
				/*.w(360);
				.h(310);*/
				li {
					overflow: hidden;
					position: relative;
					.w(176);
					.h(158);
					float: left;
					.mg(0, 0, 10, 0);
					img {
						.w(176);
						.h(117);
					}
					.pt {
						position: absolute;
						.position-right(0);
						.position-bottom(14);
						.w(176);
						.h(19);
						.fs(14);
						.lh(19);
						color: @font;
					}
					.pb {
						position: absolute;
						.position-right(0);
						.position-bottom(2);
						.w(176);
						.h(16);
						.fs(12);
						color: @font2;
					}
				}
				.twin {
					.mg(0, 8, 0, 0);
				}
			}
		}
		.div4 {
			overflow: hidden;
			.mg(20, 0, 15, 0);
			.w(360);
			.h(317);
			div {
				.mg(0, 0, 10, 0);
				img {
					.w(360);
					.h(180);
				}
			}
			.div41 {
				img {
					float: left;
					.w(173);
					.h(117);
				}
			}
		}
		#vip {
			.mg(15, 0, 0, 0);
		}
	}
</style>