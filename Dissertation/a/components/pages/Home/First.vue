<template>
	<div class="first">
		<div>
			<div class="div1">
				<span class="span-a"></span>
				<span>{{title}}</span>
			</div>

			<div class="div3">
				<ul>
					<li v-for="(item,index) in datas" :key="index" :class="index%2==0?'twin':''">
						<img :src="item.pic_url" @click='setid(item)' />
						<p class="pt">{{item.title}}</p>
						<p class="pb">{{item.subtitle}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div>
			<div class="div1">
				<span class="span-a"></span>
				<span>{{title1}}</span>
			</div>
			<div class="div3">
				<ul>
					<li v-for="(item,index) in datas1" :key="index" :class="index%2==0?'twin':''">
						<img :src="item.pic_url" @click='setid(item)' />
						<p class="pt">{{item.title}}</p>
						<p class="pb">{{item.subtitle}}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="end">
			<div class="div1">
				<span class="span-a"></span>
				<span>{{title2}}</span>
			</div>
			<ul>
				<li v-for="(item,index) in datas2" :key="index" @click='setid(item)'>
					<img :src="item.pic_url" />
					<p>{{item.title}}</p>
				</li>
			</ul>
		</div>
		<div class="end">
			<div class="div1">
				<span class="span-a"></span>
				<span>{{title3}}</span>
			</div>
			<ul>
				<li v-for="(item,index) in datas3" :key="index" @click='setid(item)'>
					<img :src="item.pic_url" />
					<p>{{item.title}}</p>
				</li>
			</ul>
		</div>
		<div>
			<div class="div3">
				<ul>
					<li v-for="(item,index) in datas4" :key="index" :class="index%2==0?'twin':''">
						<img :src="item.pic_url" @click='setid(item)' />
						<p class="pt">{{item.title}}</p>
						<p class="pb">{{item.subtitle}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: 'Boil',
		data() {
			return {
				datas: [],
				title: '',
				datas1: [],
				title1: '',
				datas2: [],
				title2: '',
				datas3: [],
				title3: '',
				datas4: []
			}
		},
		methods: {
			getlist() {
				this.$axios.get('/api/api/v3/home?', {
						params: {
							page: 2
						}
					})
					.then((res) => {
						this.datas = this.datas.concat(res.data.datas.items[2].items,
							res.data.datas.items[3].items)
						this.title = res.data.datas.items[2].title;
						this.datas1 = this.datas1.concat(res.data.datas.items[4].items)
						this.title1 = res.data.datas.items[4].title;
						this.datas2 = this.datas2.concat(res.data.datas.items[5].items)
						this.title2 = res.data.datas.items[5].title;
						this.datas3 = this.datas3.concat(res.data.datas.items[6].items)
						this.title3 = res.data.datas.items[6].title;
						this.datas4 = this.datas4.concat(res.data.datas.items[7].items)
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

<style lang="less" scoped>
	@import '../../../styles/main.less';
	.first {
		.pd(0, 7.5, 0, 7.5);
		.mg(10, 0, 0, 0);
		p {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		div {
			.div1 {
				.mg(10, 0, 0, 0);
				.w(360);
				.h(17);
				.pd(1, 0, 0, 0);
				box-sizing: border-box;
				display: block;
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
			.div3 {
				.mg(15, 0, 0, 0);
				ul {
					overflow: hidden;
					li {
						position: relative;
						.w(176);
						.h(155);
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
		}
		.end {
			/*.pd(0, 0, 0, 5);*/
			.mg(10, 0, 0, 0);
			ul {
				.mg(10, 0, 0, 0);
				/*.w(360);
			.h(192);*/
				overflow: hidden;
				li {
					float: left;
					position: relative;
					.h(192);
					.w(115);
					.mg(0, 5, 0, 0);
					img {
						.w(115);
						.h(172);
					}
					p {
						position: absolute;
						.position-right(0);
						.position-bottom(0);
						.w(115);
						.h(19);
						.fs(14);
						color: @font;
						.lh(19);
					}
				}
			}
		}
	}
</style>