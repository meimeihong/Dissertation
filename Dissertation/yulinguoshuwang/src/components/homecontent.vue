<template>
	<div id="homecontent">
        <p class="title">推荐</p>
        <ul class="first">           
            <li>
                <img src="../img/cai.jpg" alt="">
                <div>
                    <p>1嘉华大厦大家伙福建省党风建设打家劫舍党风建设大军发货大航海家赛季</p>
                    <p style="color:gray;">2</p>
                    <p style="color:red;"><span>￥</span><span>1256</span><span style="color:#ccc;">/200kg</span>                  
                    </p>
                    <p class="cart"><span class="fa fa-shopping-cart" aria-hidden="true"></span></p>
                </div>               
            </li>
            <li>
                <img src="../img/cai.jpg" alt="">
                <div>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                </div>               
            </li>
            <li>
                <img src="../img/cai.jpg" alt="">
                <div>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                </div>               
            </li>
            <li>
                <img src="../img/cai.jpg" alt="">
                <div>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                </div>               
            </li>
        </ul>
        <p  class="title">新鲜水果</p>
        <ul class="two">
            <li>
					 <img src="../img/my.jpg" alt="">
					 <p>name</p>
					 <p>
                         <span>￥</span><span>255</span><span>规格</span> 
                        <span class="carts"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                    </p>
					 
				 </li>
                 <li>
					 <img src="../img/my.jpg" alt="">
					 <p>name经济活动获奖撒谎江苏电大回到家时急啊很多撒娇撒</p>
                     <p style="color:gray;">fdssssssssssssssssss</p>
					 <p style="color:red;">
                         <span>￥</span><span>255</span><span style="color:#ccc;">规格</span> 
                        <span class="carts"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                    </p>
				 </li>
				 <li>
					 <img src="../img/my.jpg" alt="">
					 <p>name经济活动获奖撒谎江苏电大回到家时急啊很多撒娇撒</p>
                     <p style="color:gray;">fdssssssssssssssssss</p>
					 <p style="color:red;">
                         <span>￥</span><span>255</span><span style="color:#ccc;">规格</span> 
                        <span class="carts"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                    </p>
				 </li>
				 <li>
					 <img src="../img/my.jpg" alt="">
					 <p>name经济活动获奖撒谎江苏电大回到家时急啊很多撒娇撒</p>
                     <p style="color:gray;">fdssssssssssssssssss</p>
					 <p style="color:red;">
                         <span>￥</span><span>255</span><span style="color:#ccc;">规格</span> 
                        <span class="carts"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                    </p>
				 </li>
        </ul>
       <p  class="title">强烈推荐</p>
       <ul class="three">
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
		name: 'homecontent',
		data() {
			return {
                tuijian:[1,2,3,6,3]
			}
		},
		components: {
			
		},
		methods: {
			    tuijiandata(){
                    this.$axios.post('http://127.0.0.1:3000/api/goods/tuijian',
						 {}
					)
					.then((res) => {					
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
					})
                }
		},
		created() {
			this.tuijiandata();
		}
	}
</script>

<style lang="less" scoped>
	@import '../styles/main.less';
	@import url('../styles/animate.css');
	#homecontent{
        .title{  text-align: center;
            .fs(16);
            
            .pd(30,0,0,0);
            }
        .first{
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:left;
            align-items:center;           
            li{ .w(180);
            .h(80);
            .mg(8,0,0,6);
                img{
                    .w(70);
                    .h(70);
                }
                div{display:inline-block;
                    p{  .w(90);
                        .fs(10);
                        .h(16);
                        .lh(16);                     
                        overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        text-align: left;
                    }
                    .cart{
                            .fs(16);
                            color:orange;
                            text-align: right;
                    }
                }
            }
        }
        
        .two{  .w(375);
		 display: -webkit-flex; /* Safari */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content:space-around;
          align-items:center;
			   li{ background: white;
			      .mg(10,0,0,0);
				   .w(160);
				   .fs(12);
				   img{
					   .w(160);
					   .h(150);
                     }
                     p{text-align: left;
                       .h(18);
                       .lh(18);
                       .fs(14);
                       overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        text-align: left;
                     }
					 .carts{
                         display: inline-block;
						 text-align: right;
						 color:orange;
                         .fs(18);
                         .mg(0,0,0,60);
					 }
			   }
		   }
        
    }
        .three{
         display: -webkit-flex; /* Safari */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content:space-around;
          align-items:center;
            li{.w(375);
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
</style>