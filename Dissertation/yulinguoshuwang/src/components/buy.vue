<template>
  <div id="buy">
    <div class="head">
      <span @click="returnto">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </span>
      <span>确认订单</span>
    </div>
    <div class="message">
        <p>
          <span class="msg">用户名:</span>
          <span>{{onemsg.UserName}}</span>
          <span class="msg">联系电话:</span>
          <span>{{onemsg.TelephoneNumber}}</span>
        </p>
        <p>
          <span class="msg">收货地址:</span>
          <span>{{onemsg.dizhi}}</span>         
          </p>
    </div>
    <ul class="buymsg">
      <li  v-for="(item,index) in data" :key="index">
			<img :src="JSON.parse(item.data).img.split(',')[0]" alt="">
			<div class="good">
				<p>{{JSON.parse(item.data).name}}</p>
				<p style="color:gray;">{{JSON.parse(item.data).miaoshu}}</p>
				<p  v-show="JSON.parse(item.data).jiangjia>0?true:false">
					<span style="color:red;">￥{{(JSON.parse(item.data).danjia*JSON.parse(item.data).jiangjia).toFixed(2)}}</span>
          <s  style="color:gray;">{{JSON.parse(item.data).danjia.toFixed(2)}}</s>
					<span  style="color:#ccc;">/{{JSON.parse(item.data).guige}}</span>
				</p>
        <p  v-show="JSON.parse(item.data).jiangjia==0?true:false">
					<span style="color:red;">￥{{JSON.parse(item.data).danjia.toFixed(2)}}</span>
					<span  style="color:#ccc;">/{{JSON.parse(item.data).guige}}</span>
				</p>	
        <p class="jia" v-show="JSON.parse(item.data).jiangjia>0?true:false">
          <span>
            {{(JSON.parse(item.data).danjia*JSON.parse(item.data).jiangjia).toFixed(2)}}
          </span>
          <span>x</span>
          <span>
            {{item.addnumber}}
          </span>

          <span class="xiaojia">
            金额小计：￥{{(JSON.parse(item.data).danjia*JSON.parse(item.data).jiangjia*item.addnumber).toFixed(2)}}
          </span>
        </p>	
         <p class="jia"  v-show="JSON.parse(item.data).jiangjia==0?true:false">
          <span>
            {{JSON.parse(item.data).danjia.toFixed(2)}}
          </span>
          <span>x</span>
          <span>
            {{item.addnumber}}
          </span>

          <span class="xiaojia">
            金额小计：￥{{(JSON.parse(item.data).danjia*item.addnumber).toFixed(2)}}
          </span>
        </p>				
			</div>
		</li>
    </ul>
    <div class="dibu" v-show="dibushow">
         已经到底啦~~~
	</div>
    <div class="queren">
      <ul>
          <li>
              <span>商品共计</span>
              <span style="color:red;">{{jianshu}}</span>
              <span>件</span>
              <span class="jiner">金额总计:</span>
              <span  style="color:red;">￥{{zongjiner.toFixed(2)}}</span>
          </li>
          <li @click="addtogoodslist()">
              确认购买
          </li>
      </ul>
    </div>
  </div>
</template>
<script> 
  import Vue from 'vue';
  import Swiper from 'swiper';
  import { Toast } from 'mint-ui';
export default {
  name: 'buy',
  data() {
		return {
        data:[],
        onemsg:[],
        jianshu:0,
        zongjiner:0,
        dibushow:false
		}
    },
    methods:{
       getdata(){
         var buydata= localStorage.getItem("buydata");
         this.data=JSON.parse(buydata);
         if(this.data.length>=3){
           this.dibushow=true;
         }else{
           this.dibushow=false;
         }
         console.log(this.data)
         for(var i=0;i<this.data.length;i++){
           var addn=this.data[i].addnumber;
            this.jianshu+=addn
            var onedata=JSON.parse(this.data[i].data);
            if(onedata.jiangjia>0){
               this.zongjiner+= onedata.danjia*onedata.jiangjia*addn;
            }else{
              this.zongjiner+= onedata.danjia*addn;
            }
            
         }
       },
       getmsg(){
         var loginuser = localStorage.getItem("loginuser");
         this.$axios.post('http://127.0.0.1:3000/api/user/usermsg',
          {'UserName':loginuser})
          .then((res)=>{
              console.log(res);
              if(res.data.err==0){
                this.onemsg=res.data.data;
              }
              
          })
          .catch((err) => {
                  console.log(err);
          })
       },
       addtogoodslist(){
         var time=new Date().getTime();        
         console.log(time,this.data);
         for(var i=0;i<this.data.length;i++){
           this.data[i].fahuo=2;
           this.data[i].BuyingTime=time;
           this.data[i].deletes=1;
         }
         var goods=JSON.stringify(this.data);
          this.$axios.post('http://127.0.0.1:3000/api/addtogoodslist',
          {'goodslist':goods})
          .then((res)=>{
            Toast({
                    message: res.data.msg,
                    position: 'middle',
                    duration: 2000,
                    className:'tankuang',
                }); 
              return res.data.err
          })
          .then((res)=>{
            var that=this;
            setTimeout(function(){
              if(res==0){
              that.$router.push({name:'home'});
            }
            },4000)           
          })
          .catch((err) => {
                  console.log(err);
          })
       },
       returnto(){
         var buyreturn=localStorage.getItem("buyreturn");
          this.$router.push({name:buyreturn});
       }
    },
    created(){
      this.getdata();
      this.getmsg();
    }
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#buy{
  .head{
    .w(375);
    position: fixed;
    top:0px;
    left:0px;
    background: white;
    z-index: 80;
    .fs(16);
    border-bottom: 1px #ccc solid;
    span{
      display:inline-block;
      .pd(8,8,8,8);
    }
    span:first-child{
      color:@green;
    }
  }
  .message{
    .w(335);
    .mg(60,0,0,20);
    .pd(5,5,5,5);
    box-sizing: border-box;    
    border:1px solid #ccc;
    .br(10);
    .fs(14);
    p{
      .pd(5,0,5,0);
      box-sizing: border-box;
      color:gray;
      .msg{
        display:inline-block;
        color:black;
        .mg(0,5,0,15);
      }
    }
  }
  .buymsg{
     .mg(45,0,0,0);
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content:flex-start;
      align-items:center;   
      li{border-bottom: 1px solid #ccc; 
          .w(375);
          .h(115);
          .mg(10,0,0,0);
            display: -webkit-flex; /* Safari */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content:left;
          align-items:center;
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
                  .w(230);
                  display: inline-block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  text-align: left;
                  position: relative;
                }
                .jia{
                  color:gray;
                  .xiaojia{
                    color:red;
                    position: absolute;
                    .position-right(5);
                    .position-bottom(0);
                  }
                }
            }
        }
  
  
  
      li:first-child{
       border-top: #ccc 1px solid;
      }
  }
  .queren{
    .w(375);
    .h(35);
    .fs(20);
    .lh(35);
    border-top: #ccc 1px solid;
    text-align: center;
    position:fixed;
    left:0px;
    bottom:0px;
    background: white;
    z-index: 80;
    ul{.w(375);
    z-index: 100;
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content:center;
      align-items:center;
      li{
          .fs(14);
          .w(100);
          font-weight: 500;
          background:red;
          color:white;
          span{
            .fs(12);
          }
          .jiner{
            .mg(0,0,0,15);
          }
      }
      li:first-child{
        color:black;
        background: white;
          .w(272);
      }
    }}
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
