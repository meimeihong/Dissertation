<template>
	<div id="classify">
		<div class="header">
             <input type="text" placeholder="请输入商品名称">
             <span><i class="fa fa-search"></i></span>
        </div>
		<tab :listname="listname"></tab>
		<ul class="left">
			<li v-for="(item,index) in daleibie" :key="index" v-bind:class="checkdaleibie===item?'active':''" @click="checkda(item)">
                 {{item}}
			</li>
		</ul>
		<ul class="right">
			<li  v-for="(item,index) in xiaoleibie" :key="index" @click="classifycont(item.leibie)">
                <img :src="item.img" alt="">
				<p>{{item.leibie}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
import tab from './tab.vue';
	export default {
		name: 'classify',		
		data() {
			return {
				name:"分类",
				listname:'classify',
				daleibie:[],
				checkdaleibie:'',
				xiaoleibie:[]
			}
		},
		components: {
			tab
		},
		methods: {
			daleibies(){
				this.$axios.post('http://127.0.0.1:3000/api/goods/daleibie',
						 {}
					)
					.then((res) => {					
						this.daleibie=res.data.data;
						this.checkdaleibie=res.data.data[0];
					})
					.then((res) => {					
						this.checkda(this.checkdaleibie)
					})
					.catch((err) => {
						console.log(err);
					})
			},
			checkda(name){
				this.checkdaleibie=name;
				console.log(name)
				this.$axios.post('http://127.0.0.1:3000/api/goods/xiaoleibie',
						 {
							 'leibie':name
						 }
					)
					.then((res) => {
                       this.xiaoleibie=res.data.data;
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
					})
					
			},
			classifycont(xiaol){
				localStorage.setItem('dleibie', this.checkdaleibie);
				localStorage.setItem('xleibie', xiaol);
				this.$router.push({name:'classifycontent'});
			}
					
		},
		created() {
			this.daleibies();
		}
	}
</script>

<style lang="less" scoped>
	@import '../styles/main.less';
	@import url('../styles/animate.css');
	#classify {
		.w(375);
		position:relative;
		.header{
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
                .w(300);
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
		.left{
			.fs(14);
			.w(80);
			position: absolute;
			.position(45,0);			
			border-bottom: 1px solid #ccc;
			border-right: 1px solid #ccc;
			color:gray;
			display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:flex-start;
            align-items:center;
			li{
				.w(80);
				.h(45);
				.lh(45);
				text-align: center;
				border-top:1px solid #ccc;
				
			}
			.active{
					color:green;
					font-weight: 700;
				}
		}
		.right{
			position: absolute;
			.position(50,85);
			.fs(16);
			.w(280);
			display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:left;
			align-items:center;
			li{ .w(80);
			.mg(0,0,0,10);
			text-align: center;
				img{
					.w(60);
					.h(60);
				}
			}
		}
    }
</style>