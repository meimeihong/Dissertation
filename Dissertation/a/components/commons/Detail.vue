<template>
<div id="detail">
	qqq
	{{detail}}
</div>
</template>

<script>
	var datas=JSON.parse(sessionStorage.getItem("data"));
	console.log(datas)
	export default{
		name:'Detail',
		data(){
			return{
				detail:'detail',
				data:datas
			}
		}
	}
</script>

<style lang="less" scoped>
@import '../../styles/main.less';
</style>