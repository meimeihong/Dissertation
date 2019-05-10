<template>
  <div id="classifym">
    <div class="header">
        <span @click="returnmy"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
        <span>我的订单</span>
    </div>
    <ul class="select">
        <li v-for="(item, index) in select" :key="index"  v-bind:class="onecheck===item?'active':''" @click="data(item)">
             {{item}}
        </li>
    </ul>
    <ul class="list">
        <li  v-for="(item,index) in datas" :key="index">
            <!-- <p class="zhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
                商品已无效
            </p> -->
			<img :src="JSON.parse(item.data).img.split(',')[0]" alt="" @click="toxiangqing(item.bianhao)">
			<div class="good">
				<p>{{JSON.parse(item.data).name}}</p>
				<p style="color:gray;">{{JSON.parse(item.data).miaoshu}}</p>
				<p v-show="JSON.parse(item.data).jiangjia>0?true:false">
                    
					<span style="color:red;">￥{{JSON.parse(item.data).danjia*JSON.parse(item.data).jiangjia.toFixed(2)}}</span>
                    <s>{{JSON.parse(item.data).danjia.toFixed(2)}}</s>
					<span  style="color:#ccc;">/{{JSON.parse(item.data).guige}}</span>
				</p>
                <p  v-show="JSON.parse(item.data).jiangjia==0?true:false">
					<span style="color:red;">￥{{JSON.parse(item.data).danjia.toFixed(2)}}</span>
					<span  style="color:#ccc;">/{{JSON.parse(item.data).guige}}</span>
				</p>
                <p class="jia" v-show="JSON.parse(item.data).jiangjia>0?true:false">
                 <span>购买数量：</span>
                 <span>{{item.addnumber}}</span>
                 <span>金额小计：</span>
                 <span>{{(JSON.parse(item.data).danjia*JSON.parse(item.data).jiangjia)*item.addnumber.toFixed(2)}}</span>
                </p>
                <p  class="jia" v-show="JSON.parse(item.data).jiangjia==0?true:false">
                 <span>购买数量：</span>
                 <span>{{item.addnumber}}</span>
                 <span>金额小计：</span>
                 <span>￥{{(JSON.parse(item.data).danjia*item.addnumber).toFixed(2)}}</span>
                </p>			
			</div>
            <p class="wuliu">
                <span v-show="item.fahuo==2 || item.fahuo==3?true:false" 
                      @click="shouhuo(item.UserName,item.bianhao,item.BuyingTime)">
                      确认收货
                </span>
                <span v-show="item.fahuo==4?true:false" @click="topingjia(item.bianhao,item.BuyingTime)">评价</span>
                <span v-show="item.fahuo==4?true:false" class="yishou">已收货</span>
                <span v-show="item.fahuo==5?true:false" class="yishou">退货商品</span>
                <span v-show="item.fahuo==6?true:false" class="yishou">换货商品</span>
            </p>
		</li>
    </ul>
    <div class="dibu" v-show="dibushow">
         已经到底啦~~~
	</div>
  </div>
</template>
<script> 
    import Vue from 'vue';
    import { Toast } from 'mint-ui';
export default {
  name: 'dingdan',
  data() {
    return {
        select:['全部订单','待配送','待自提','已收货','退换货'],
        onecheck:'全部订单',
        sort:false,
        datas:[],
        dibushow:false    
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
    returnmy(){
          this.$router.push({name:'my'});
      },
    dingdanl(){
        this.onecheck=localStorage.getItem("dingdan");
    },
    data(select){
          this.onecheck=select;
        this.$axios.post('http://127.0.0.1:3000/api/dingdan',{ 'dingdan':select})
        .then((res) => {
            console.log(res);
            if(res.data.err==0){
                this.datas=res.data.data;
                if(res.data.data.length>3){
                  this.dibushow=true;
                }else{
                    this.dibushow=false;
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },
    toxiangqing(bianhao){
        this.$axios.post('http://127.0.0.1:3000/api/goods/onegoods',{ 'bianhao':bianhao})
        .then((res) => {
            console.log(res);
            if(res.data.err==0){
                var resdata=res.data.data
                if(resdata.length>0 &&resdata[0].zhuangt==1 &&resdata[0].shuliang>0){                  
                    var xiangqingdata=JSON.stringify(resdata[0]);
                    localStorage.setItem('xiangqing', xiangqingdata);
                    localStorage.setItem('xiangqingreturn', 'pinglun');
                    this.$router.push({name:'xiangqing'});
                    console.log(res.data.data)
                }else{
                    Toast({
                    message: '该商品已失效',
                    position: 'middle',
                    duration: 2000
                    });
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })      
    },
    shouhuo(name,bianhao,time){
      this.$axios.post('http://127.0.0.1:3000/api/shouhuo',{ 'UserName':name,'bianhao':bianhao,'BuyingTime':time})
        .then((res) => {
            console.log(res);
            if(res.data.err==0){
                Toast({
                    message: res.data.msg,
                    position: 'middle',
                    duration: 2000,
                    className:'tankuang',
                });
                this.data(this.onecheck);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },
    topingjia(pingjiabianhao,time){
        console.log(time)
        localStorage.setItem('pingjiabianhao', pingjiabianhao);
        localStorage.setItem('buytime', time);
        localStorage.setItem('pingjiareturn', 'dingdan');
        this.$router.push({name:'pingjia'});
    },
},
    
    created() {
        this.dingdanl();
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
            span:last-child{
                color:gray;
                .w(300);
                text-align: center;
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
          .w(75);
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
        // .h(145);
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
            .h(105);
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
            .jia{
                .fs(10);
                color:gray;
                span:nth-child(2){
                    display: inline-block;
                    .mg(0,40,0,0);
                }
            }
        }
        .wuliu{
            .w(375);
            .h(35);
            .lh(35);
            .fs(16);
            text-align: right;
            span{
                display: inline-block;
                .pd(0,10,0,10);
                .h(25);
                .lh(25);
                text-align: center;
                .mg(0,10,0,0);
                border: @green solid 1px;
               .br(20);
               color:@green;
            }
            .yishou{
                border:none;
                color:gray;
            }
        }
    }
   }
   .dibu{
			.w(375);
			.h(100);
			.fs(14);
            .pd(20,0,0,0);
			text-align: center;
			color:#ccc;
			background: white;
    }
}
</style>
