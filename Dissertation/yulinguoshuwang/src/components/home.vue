<template>
	<div id="home">
        <div id="header">
             <span>{{name}}</span>
             <input type="text" placeholder="搜索" v-model="searchname">
             <span @click="tosearch()"><i class="fa fa-search"></i></span>
        </div>
		<banner></banner>
		<homeclass></homeclass>
		<homecontent></homecontent>
		<tab :listname="listname"></tab>
		<div class="backtop" v-show='topshow' @click="topback">
			<transition enter-active-class='fadeIn animated' leave-active-class='fadeOut animated'>
				<div class='contain-box'>
					<i class="fa fa-arrow-up"></i>
				</div>
			</transition>
		</div>
		<div class="dibu">
         已经到底啦~~~
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Toast } from 'mint-ui'
	import banner from './banner.vue';
	import tab from './tab.vue';
	import homeclass from './homeclass.vue';
	import homecontent from './homecontent.vue';
	export default {
		name: 'home',
		data() {
			return {
                name:"玉林果蔬网",
				topshow: false,
				listname:'home',
				searchname:''
			}
		},
		components: {
			banner,
			homeclass,
			homecontent,
			tab
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
			tosearch(){
				this.searchname=this.searchname.trim();
				if(this.searchname!==''){
				localStorage.setItem('searchname', this.searchname);
				localStorage.setItem('searchreturn', 'home');
				this.$router.push({name:'search'})
				}
				
			}
		},
		created() {
			this.top();
		}
	}
</script>

<style lang="less" scoped>
	@import '../styles/main.less';
	@import url('../styles/animate.css');
	#home {
        #header{
            .w(375);
            .h(40);
			.lh(40);
			position:fixed;
			.position(0,0);
			z-index: 100;
			background: white;
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:flex-start;
            align-items:center;
            border-bottom: 2px solid rgb(66, 216, 103);
            span{
                display:inline-block;
                .mg(0,0,0,15);
                .fs(16);
                font-weight: 800;
                color:rgb(66, 216, 103);
            }
            input{
                .w(220);
                .h(25);
                .fs(16);
                color:gray;
                border:none;
                border-radius: 15px;
                .mg(0,0,0,15);
                .pd(0,0,0,10);
                outline: none;
                background: rgb(218, 218, 218);
                box-sizing: border-box;
            }
        }
			.w(375);
			overflow: auto;
			box-sizing: border-box;
		.backtop {
			position: fixed;
			.position-bottom(60);
			.position-right(15);
			z-index: 100;
			.contain-box {
			.w(30);
			.h(30);
			.fs(20);
			border-radius: 50%;
			background: #fe960e;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		}
		.dibu{
			.w(375);
			.h(100);
			.fs(14);
			.pd(20,0,0,0);
			// border-top: 1px solid #ccc;
			text-align: center;
			color:#ccc;
			background: white;
		}
	}
</style>