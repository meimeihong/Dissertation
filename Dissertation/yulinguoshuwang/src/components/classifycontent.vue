<template>
  <div id="classifycontent">
    <div class="header" @click="datas">
             <span><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
             <span class="xlb">{{xiaoleibie}}</span>
             <span><i class="fa fa-search"></i></span>
    </div>
    <ul class="list">
        <li>
			<img src="../img/my.jpg" alt="">
			<div class="good">
				<p>1大幅大水法三分大师赛顺风顺水事实上撒士大夫打算发生</p>
				<p style="color:gray;">2</p>
				<p>
					<span style="color:red;">￥17831</span>
					<span  style="color:#ccc;">sadsa</span>
                    <span class="cart3"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
				</p>					
			</div>
			</li>
    </ul>
  </div>
</template>
<script> 
export default {
  name: 'classifycontent',
  data() {
		return {
               xiaoleibie:""
			}
    },
    methods:{
        datas(){
            var dleibie= localStorage.getItem("dleibie");
            var xleibie= localStorage.getItem("xleibie");
            this.xiaoleibie=xleibie;
            console.log(dleibie,xleibie);
            console.log('q');
        }
    },
    created(){
        this.datas();
    }
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#classifycontent {
  .w(375);
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
            .xlb{
                display:inline-block;
                .w(280);
                .h(40);
                .lh(40);
                color:gray;
                text-align: center;
            }
        }
        .list{
           display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:flex-start;
            align-items:center;
            border-bottom: 2px solid rgb(66, 216, 103); 
            li{
                .w(375);
               .h(90);
               .mg(10,0,0,0);
                 display: -webkit-flex; /* Safari */
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content:left;
                align-items:center;
                img{
                    .w(110);
                    .h(80);
                    .mg(0,0,0,15);
                }
                .good{
                    .fs(14);
                    display: inline-block;
                    .w(230);
                    .mg(0,0,0,10);
                    p{  .h(25);
                        .lh(25);
                        display: inline-block;
                        overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        text-align: left;
                        .cart3{
                            color:orange;
                            .fs(18);
                            .mg(0,0,0,90);
                        }
                    }
                }
            }
        }	
}
</style>
