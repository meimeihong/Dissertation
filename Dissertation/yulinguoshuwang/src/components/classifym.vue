<template>
  <div id="classifym">
      <div class="header">
          <span @click="returnhome"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
             <input type="text" placeholder="搜索">
             <span><i class="fa fa-search"></i></span>
        </div>
    <ul class="select">
        <li v-for="(item, index) in select" :key="index"  v-bind:class="onecheck===item?'active':''" @click="data(item)">
             {{item}}
        </li>
        <li class="price"  v-for="(item) in prices" :key="item"  v-bind:class="onecheck===item?'active':''" @click="data(item)">
             {{item}}
             <span v-bind:class="sort?'':'jiage'"><i class="fa fa-step-backward" aria-hidden="true" @click.stop="downl(item)"></i></span>
             <span v-bind:class="sort?'jiage':''"><i class="fa fa-step-forward" aria-hidden="true" @click.stop="up(item)"></i></span>
        </li>
    </ul>
    <ul class="list">
        <li  v-for="(item,index) in datas" :key="index">
            <p class="zhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
                商品已无效
            </p>
			<img :src="item.img.split(',')[0]" alt="" @click="toxiangqing(item)">
			<div class="good">
				<p>{{item.name}}</p>
				<p style="color:gray;">{{item.miaoshu}}</p>
				<p>
					<span style="color:red;">￥{{item.danjia}}</span>
					<span  style="color:#ccc;">/{{item.guige}}</span>
                    <span class="cart3" @click="addtocart(item.bianhao,item)"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
				</p>					
			</div>
		</li>
    </ul>
  </div>
</template>
<script> 
    import Vue from 'vue';
    import Swiper from 'swiper';
    import { Toast } from 'mint-ui';
export default {
  name: 'classifym',
  data() {
		return {
            select:['所有','销量','新品'],
            prices:['价格'],
            onecheck:'所有',
            sort:false,
            datas:[]          
		}
    },
    methods:{
    addtocart(bianhao,data){
                    var loginuser = localStorage.getItem("loginuser");
                    if(loginuser===undefined || loginuser==='' || loginuser===null){
                        Toast({
                            message: '请先登陆',
                            position: 'middle',
                            duration: 2000
                        });
					 }else{
						var addtocartdata=JSON.stringify(data);
                        this.$axios.post('http://127.0.0.1:3009/api/cart/addtocart',
                        {'bianhao':bianhao,'data':addtocartdata,'UserName':loginuser,'jiajian':-1})
                        .then((res)=>{
                            console.log(res);
                            Toast({
                                message: res.data.msg,
                                position: 'bottom',
                                duration: 2000,
                                className:'tankuang',
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
					 }
                    
                },
    returnhome(){
          this.$router.push({name:'home'});
      },
    data(select){
          this.onecheck=select;
          var dleibie= localStorage.getItem("classifym");
          this.$axios.post('http://127.0.0.1:3009/api/goods/classifym',
						 {
                             'select':select,
                             'paixu':this.sort,
                             'leibie':dleibie
						 }
					)
					.then((res) => {
                        this.datas=res.data.data;
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
					})
      },
    up(name){
          this.sort=true;
          this.data(name);
      },
    downl(name){
          this.sort=false;
          this.data(name);
      },
    toxiangqing(data){
            var xiangqingdata=JSON.stringify(data);
            localStorage.setItem('xiangqing', xiangqingdata);
            this.$router.push({name:'xiangqing'});
        }
    },
    created() {
			this.data(this.onecheck);
		}
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#classifym {
    .header{
            .w(375);
            .h(40);
            .lh(40);
            position: fixed;
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
                .w(280);
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
  .select{
      position: fixed;
     .position(42,0);
     z-index: 100;
     background: white;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content:space-around;
      align-items:center;
      li{
          .w(90);
          .h(40);
          .lh(40);
          text-align: center;
          .fs(16);         
      }
      .price{
          border-right: none;
          span{
              .fs(12);
              color:gray;
              .mg(0,0,0,2);
          }
          .jiage{
              color:green;
          }
      }
      .active{
          color:green;
          border-bottom: 2px solid green;
          font-weight: 700;
      }
  }
  .list{
    .mg(84,0,0,0);
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content:flex-start;
    align-items:center;
    
    li{border-bottom: 1px solid #ccc; 
        .w(375);
        .h(90);
        .mg(10,0,0,0);
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:left;
        align-items:center;
        position: relative;
        .zhe{
            .fs(16);
            .w(375);
            .h(91);
            .lh(91);
            z-index: 60;
            text-align: center;
            color:white;
            background: black;
            opacity: 0.5;
            position: absolute;
            top:0px;
            left:0px;
        }
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
                position: relative;
                .cart3{
                    display: inline-block;
                    color:orange;
                    .fs(18);
                    position: absolute;
                    .position(0,190);
                    // .mg(0,5,0,0);
                }
            }
        }
    }
        }
}
</style>
