<template>
  <div id="classifycontent">
    <div class="header" @click="datas">
             <span @click="classify"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
             <span class="xlb">{{xiaoleibie}}</span>
    </div>
    <ul class="list">
        <li v-for="(item,index) in data" :key="index">
            <p class="zhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
                商品已无效
            </p>
            <img :src="item.img.split(',')[0]" alt="" @click="toxiangqing(item)">
            <p>{{item.name}}</p>
            <p style="color:gray;">{{item.miaoshu}}</p>
            <p style="color:red;">
                <span>￥</span><span>{{item.danjia}}</span>
                <span class="guige">/{{item.guige}}</span> 
            <span class="carts" @click="addtocart(item.bianhao,item)"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
        </p>
		</li>
    </ul>
  </div>
</template>
<script> 
    import Vue from 'vue';
    import Swiper from 'swiper';
    import { Toast } from 'mint-ui';
export default {
  name: 'classifycontent',
  data() {
		return {
               xiaoleibie:"",
               data:[]
			}
    },
    methods:{
        datas(){
            var dleibie= localStorage.getItem("dleibie");
            var xleibie= localStorage.getItem("xleibie");
            this.xiaoleibie=xleibie;
            console.log(dleibie,xleibie);
            this.$axios.post('http://127.0.0.1:3000/api/goods/classifycontent',
						 {
                             'xiaoleibie':xleibie
						 }
					)
					.then((res) => {
                        this.data=res.data.data;
						console.log(res);
					})
					.catch((err) => {
						console.log(err);
					})
        },
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
                        this.$axios.post('http://127.0.0.1:3000/api/cart/addtocart',
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
        classify(){
            this.$router.push({name:'classify'});
        },
        toxiangqing(data){
            var xiangqingdata=JSON.stringify(data);
            localStorage.setItem('xiangqing', xiangqingdata);
            localStorage.setItem('xiangqingreturn', 'classifycontent');
            this.$router.push({name:'xiangqing'});
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
    .header{  position: fixed;
            .position(0,0);
            z-index:100;
            background: white;
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
        .mg(42,0,20,0);
        .w(375);
        .pd(0,8,0,8);
        box-sizing: border-box;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:space-between;
        align-items:center;
        li{ background: white;
            .mg(10,0,0,0);
            .w(160);
            .fs(12);
            position: relative;
            .zhe{
                .fs(16);
                .w(160);
                .h(220);
                .lh(220);
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
                .w(160);
                .h(150);
                }
            p{text-align: left;
            position: relative;
            .h(22);
            .lh(22);
            .fs(14);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-align: left;
            }
            .guige{
                display: inline-block;
                .h(22);
                .lh(28);
                .fs(12);
                .w(34);
                color:#ccc;
                overflow: hidden;
            }
            .carts{
                position: absolute;
                .position(0,130);
                display: inline-block;
                text-align: right;
                color:orange;
                .fs(18);
            //  .mg(0,0,0,60);
            }
		}
        }	
}
</style>
