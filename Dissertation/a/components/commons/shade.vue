<template>
	<div class="shade">
		<div class="buk">
			<span class="buks">
				<i class="fa fa-times" aria-hidden="true" @click.stop='show'></i>
				<img src="../../img/logo.png"/>	
			</span>
			<p>请选择需要下载的客户端类型</p>
			<ul>
				<li class="li1"><i class="fa fa-apple" aria-hidden="true"></i><span>iPhone</span></li>
				<li class="li1"><i class="fa fa-tablet" aria-hidden="true"></i><span>iPad</span></li>
				<li class="li2"><i class="fa fa-android" aria-hidden="true"></i><span>Android</span></li>
				<li class="li2"><i class="fa fa-tablet" aria-hidden="true"></i><span>AndroidHD</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Shade',
		data(){
			return{
				img:'http://m.buka.cn/static/img/logo_2x.png',
				logo:''
			}
		},
		props:['show']
	}
</script>

<style lang="less" scoped>
	@import '../../styles/main.less';
	.shade{
		position:fixed;
		.position(0,0);
		z-index:200;
		.w(375);
		.h(667);
		background:rgba(0,0,0,.6);
		.buk{text-align: center;
			.pd(5,5,5,5);
			.w(280);
			.h(220);
			z-index:220;
			position:fixed;
		.position(223.5,47.5);
			background: white;
			.buks{
				.w(375);
				.h(75);
				display: block;
				position: relative;
			.mg(0,0,0,0);
				.w(20);
				.h(20);
				color:#fe960e;
				.fs(20);
				img{position: absolute;
				.position(10,60);
				.w(150);
				.h(50);
			}
			}
			p{	.mg(50,0,10,0);
				.fs(14);
				color:@font2;
				
			}
			ul{overflow: hidden;
			.pd(0,0,0,5);
				li{border-radius: 5px;
					float:left;
					text-align: left;
					.pd(0,5,0,10);
					/*box-sizing: border-box;*/
					position: relative;
				.mg(0,4,0,4);
					.w(112.5);
					.h(55);
					.lh(55);
					i{
						.w(23);
						.h(30);
						.mg(0,10,0,0);
						color:white;
					}
					span{
						position: absolute;
						.position(2.5,50);
						display: inline-block;
						color: #fff;
						.fs(13);
						.w(43);
						.h(50);
						.lh(50);
					}
				}
				.li1{
					background: @head;
					.mg(0,4,5,4);
				}
				.li2{
					background: #a4c639;
				}
			}
		}
	}
</style>