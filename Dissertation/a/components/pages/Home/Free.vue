<template>
	<div id="free">
		<div class="div1">
			<span class="span-a"></span>
			<span>{{title}}</span>
		</div>
		<ul>
			<li v-for="(item,index) in datas" :key="index" @click='setid(item)'>
				<img :src="item.pic_url" />
				<p>{{item.title}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		name: 'Free',
		data() {
			return {
				datas: [],
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
						this.datas = res.data.datas.items[6].items;
						var dat = res.data.datas.items[6].items;
						this.title = res.data.datas.items[6].title;
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
	#free {
		.pd(0, 0, 0, 5);
		.mg(10, 0, 0, 0);
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
</style>