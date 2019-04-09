<template>
	<div id="home">
        <div id="header">
             <span>{{name}}</span>
             <input type="text" placeholder="搜索">
             <span><i class="fa fa-search"></i></span>
        </div>
		<banner></banner>
		<homeclass></homeclass>
		<homecontent></homecontent>
		<tab :listname="listname"></tab>
		{{listname}}
		
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
				sel:false,
				listname:'home'
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
	@import '../styles/main.less';
	@import url('../styles/animate.css');
	#home {
        #header{
            .w(375);
            .h(40);
            .lh(40);
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
		
	}
</style>