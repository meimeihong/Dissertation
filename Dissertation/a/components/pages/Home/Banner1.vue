<template>
<div class="banners" >
	<div @click="detail" class="ban" v-for="(item,index) in imgs" :key='index'>
		<img :src="item"/>
	</div>
	
</div>
</template>

<script>
	export default{
		name:'Banners',
		data(){
			return{
				imgs:[],
			}	
		},
		methods:{
			getimg(){
				var id=sessionStorage.getItem('id');
				if(id==2635){
				this.imgs=['http://i-r7.ibuka.cn/event/20181026/01.jpg',
				'http://i-r7.ibuka.cn/event/20181026/02.jpg',
				'http://i-r7.ibuka.cn/event/20181026/03.jpg',
				'http://i-r7.ibuka.cn/event/20181026/04.jpg',
				'http://i-r7.ibuka.cn/event/20181026/05.jpg',
				'http://i-r7.ibuka.cn/event/20181026/06.jpg'
				]
				}else if(id==2614){
					this.imgs=['http://i-r7.ibuka.cn/event/20180504/1.jpg',
					'http://i-r7.ibuka.cn/event/20180504/2.jpg',
					'http://i-r7.ibuka.cn/event/20180504/3.jpg',
					'http://i-r7.ibuka.cn/event/20180504/4.jpg',
					'http://i-r7.ibuka.cn/event/20180504/5.jpg',
					'http://i-r7.ibuka.cn/event/20180504/6.jpg',
					'http://i-r7.ibuka.cn/event/20180504/7.jpg']
				}else{
					this.imgs=['http://i-r7.ibuka.cn/event/20180720/1.jpg',
					'http://i-r7.ibuka.cn/event/20180720/2.jpg',
					'http://i-r7.ibuka.cn/event/20180720/3.jpg',
					'http://i-r7.ibuka.cn/event/20180720/4.jpg',
					'http://i-r7.ibuka.cn/event/20180720/5.jpg',
					'http://i-r7.ibuka.cn/event/20180720/6.jpg',
					'http://i-r7.ibuka.cn/event/20180720/7.jpg']
				}				
			},
			detail(){
				var data=sessionStorage.getItem("data");
				var datas=JSON.parse(data);
				this.$router.push({
					path: `/m/${datas.id}`,
					params: {
						userId: datas.id
					}
				})
			}
		},
		created() {
			this.getimg();
		}
	}
</script>

<style lang="less" scoped>
@import '../../../styles/main.less';
.ban{
	.w(375);
	.h(300);
	img{
		.w(375);
	.h(300);
	}
}
</style>