<template>
	<div class="head-detail-nav">
		<a href="javascript:0" class="head-detail-return" >
			<span @click="returns" class="return-icon fa fa-arrow-left"></span>
		</a>
		<span class="head-detail-center">{{mid}}</span>
		<a href="" class="head-detail-download fa fa-arrow-down"></a>
	</div>
</template>
<script>
	export default {
		name: "DetailNav",
		props: ["mid"],
		data() {
			return {
			}
		},
		methods: {
			returns() {
				var skip = sessionStorage.getItem("skip");
				if(skip == 'http://localhost:8080/#/home') {
					this.$router.push({
						path: '/home'
					})
				}else if(skip == 'http://localhost:8080/#/Ranking'){
					this.$router.push({
						path: '/Ranking'
					})
				}else{
					this.$router.push({
						path: '/CategoryList'
					})			
				}
			}

		}
	}
</script>

<style lang="less" scoped>
	@import '../../styles/main.less';
	.head-detail-nav {
		position: fixed;
		.position(40px, 0px);
		.w(375px);
		.h(38px);
		.lh(38px);
		.fs(15px);
		color: #666;
		background: #fff;
		z-index: 9999;
		border-bottom: 1px solid #ccc;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		.fs(16px);
		.head-detail-return {
			width: 30%;
			span {
				text-align: left;
				color: #666;
				.fs(18px);
				.mg(0, 0px, 0, 20px);
			}
		}
		.head-detail-center {
			width: 40%;
			text-align: center;
		}
		.head-detail-download {
			width: 30%;
			color: #666;
			.fs(18px);
			.h(38px);
			.lh(38px);
			text-align: right;
			.mg(0px, 20px, 0, 0);
		}
	}
</style>