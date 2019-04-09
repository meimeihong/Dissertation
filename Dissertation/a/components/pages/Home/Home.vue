<template>
	<div id="home">
		<Header></Header>
		<Homehead :listname="listname"></Homehead>
		<Banner></Banner>
		<Groom></Groom>
		<Free></Free>
		<Boil></Boil>
		<President></President>
		<First></First>
		<Shade v-show="sel" :show='show'></Shade>
		<div class="bottom">
			<div><img src="../../../img/logo.png" /></div>
			<div><span @click='show'>安装客户端</span></div>
			<p>Copyright@buka.cn</p>
		</div>
		<div class="backtop" v-show='topshow' @click="topback">
			<transition enter-active-class='fadeIn animated' leave-active-class='fadeOut animated'>
				<div class='contain-box'>
					<i class="fa fa-arrow-up"></i>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast } from 'mint-ui'
	import Header from '../../commons/Header.vue';
	import Homehead from '../../commons/Homehead.vue';
	import Banner from './Banner.vue';
	import Groom from './Groom.vue';
	import Free from './Free.vue';
	import Boil from './Boil.vue';
	import President from './President.vue';
	import First from './First.vue';
	import Shade from '../../commons/shade'

	export default {
		name: 'Home',
		data() {
			return {
				topshow: false,
				sel:false,
				listname:'推荐'
			}
		},
		components: {
			Header,
			Homehead,
			Banner,
			Groom,
			Free,
			Boil,
			President,
			First,
			Shade
		},
		methods: {
			top() {
					var hash=window.location.href;
					sessionStorage.setItem("skip", hash);
				window.addEventListener('scroll', ()=> {
					var  bodyDistance = document.documentElement.scrollTop
					if(bodyDistance >= 300) {
						this.topshow = true;
					} else {
						this.topshow = false;
					}
				})
			},
			topback(){
				document.documentElement.scrollTop=0	
			},
			show:function(){
				this.sel=!this.sel;
			}
		},
		created() {
			this.top();
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../styles/main.less';
	@import url('../../../styles/animate.css');
	#home {
		.w(375);
		overflow: auto;
		box-sizing: border-box;
		.bottom {
			div {
				.w(375);
				.h(40);
				text-align: center;
				.lh(40);
				img {
					.w(145);
					.h(30);
				}
				span {
					display: inline-block;
					.w(105);
					.h(40);
					.fs(15);
					background: #fe960e;
					border-radius: 5px;
					color:white;
				}
			}
			p{
				.w(375);
				.h(17);
				.fs(13);
				.lh(17);
				text-align:center;
				.mg(10,0,0,0);
				color:@font;
			}
		}
		.backtop {
			position: fixed;
			.position-bottom(20);
			.position-right(20);
			z-index: 100;
			.contain-box {
				.w(40);
				.h(40);
				.fs(20);
				border-radius: 50%;
				background: #fe960e;
				color: white;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>