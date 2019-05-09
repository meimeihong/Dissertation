<template>
  <div id="classifym">
    <div class="header">
        <span @click="returnmy"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
        <span>订单评价</span>
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
			<img :src="JSON.parse(item.data).img.split(',')[0]" alt="" @click="toxiangqing(item)">
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
                <span v-show="item.fahuo==4?true:false" @click="topingjia(JSON.parse(item.data).bianhao,item.BuyingTime)">评价</span>
                <span v-show="item.fahuo==7?true:false">查看评价</span>
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
  name: 'pinglun',
  data() {
    return {
        select:['未评价订单','已评价订单'],
        onecheck:'未评价订单',
        sort:false,
        datas:[],
        dibushow:false    
    }
    },
    methods:{
    returnmy(){
          this.$router.push({name:'my'});
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
    topingjia(pingjiabianhao,time){
        console.log(time)
        localStorage.setItem('pingjiabianhao', pingjiabianhao);
        var pingjiatime=JSON.stringify(time)
        localStorage.setItem('pingjiatime', pingjiatime);
        localStorage.setItem('pingjiareturn', 'pinglun');
        this.$router.push({name:'pingjia'});
    },
    toxiangqing(data){
        var xiangqingdata=JSON.stringify(data);
        localStorage.setItem('xiangqing', xiangqingdata);
        this.$router.push({name:'xiangqing'});
    },
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
          .w(187);
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
