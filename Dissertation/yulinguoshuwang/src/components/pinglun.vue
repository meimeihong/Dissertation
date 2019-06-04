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
			<img :src="JSON.parse(item.data).img.split(',')[0]" alt="" @click="toxiangqing(JSON.parse(item.data).bianhao)">
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
                <span class="buytime">{{item.BuyingTime}}</span>
                <span v-show="item.fahuo==4?true:false" @click="topingjia(JSON.parse(item.data).bianhao,item.BuyingTime)">评价</span>
                <span v-show="item.fahuo==7?true:false" @click="readpingjia(item.bianhao,item.BuyingTime,JSON.parse(item.data))">查看评价</span>
            </p>
		</li>
    </ul>
    <div class="pingjiashow" v-show="pingjiashow" @click.self=" clodepingjia()">
        <div>
          <p>
              <span>商品名称：</span>
              <span>{{goodsdata.name}}</span>             
          </p>
          <p>
              <span>商品类别：</span>
              <span>{{goodsdata.leibie}}</span>
          </p>
          <p><span>评价内容：</span></p>
           <p class="cont">             
              <textarea name="" id="" cols="40" rows="6" v-model="content"></textarea>
          </p>
          <p>评价分数:</p>
          <p class="fen">
              <span>物流服务</span>
              <span v-for="(item,index) in wuliu" :key="index" 
              v-bind:class="item?'active':''" @click="pingjia('wuliu',index)">
                  <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span>{{wuliuf}}分</span>
          </p>
          <p  class="fen">
              <span>服务态度</span>
              <span v-for="(item,index) in fuwu" :key="index" 
              v-bind:class="item?'active':''" @click="pingjia('fuwu',index)">
                  <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span>{{fuwuf}}分</span>
          </p>
          <p  class="fen">
              <span>商品质量</span>
              <span v-for="(item,index) in zhiliang" :key="index" 
              v-bind:class="item?'active':''" @click="pingjia('zhiliang',index)">
                  <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span>{{zhiliangf}}分</span>
          </p>
          <p class="xiugai" @click="fabu()">修改评价</p>
          <p class="ti">{{ti}}</p>
        </div>
    </div>
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
        dibushow:false,
        pingjiashow:false,
        readpingjiadata:[],
        goodsdata:[],
        content:'',
         wuliu:[false,false,false,false,false],
         wuliuf:null,
         fuwu:[false,false,false,false,false],
         fuwuf:null,
         zhiliang:[false,false,false,false,false],
         zhiliangf:null,
         ti:''
    }
    },
    methods:{
    returnmy(){
          this.$router.push({name:'my'});
      },
    data(select){
        this.onecheck=select;
        var loginuser = localStorage.getItem("loginuser");
        this.$axios.post('http://127.0.0.1:3000/api/dingdan',{ 'dingdan':select,'UserName':loginuser})
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
        localStorage.setItem('buytime', time);
        localStorage.setItem('pingjiareturn', 'pinglun');
        this.$router.push({name:'pingjia'});
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
    readpingjia(bianhao,buytime,data){
        // this.pingjiashow=true;
        console.log('a')
        var loginuser = localStorage.getItem("loginuser");
        localStorage.setItem('pingjiabianhao', bianhao);
        localStorage.setItem('buytime', buytime);
       this.$axios.post('http://127.0.0.1:3000/api/readpingjia',
       { 'UserName':loginuser,'bianhao':bianhao,'buytime':buytime})
        .then((res) => {
            console.log(res)
            if(res.data.err==0){
                this.goodsdata=data;
                this.readpingjiadata=res.data.data;
                this.content=this.readpingjiadata[0].content;
                this.wuliuf=this.readpingjiadata[0].wuliu;
                this.fuwuf=this.readpingjiadata[0].fuwu;
                this.zhiliangf=this.readpingjiadata[0].zhiliang;
                for(var i=0;i<this.readpingjiadata[0].wuliu;i++){
                    this.wuliu[i]=true;
                }
                for(var i=0;i<this.readpingjiadata[0].fuwu;i++){
                    this.fuwu[i]=true;
                }
                for(var i=0;i<this.readpingjiadata[0].zhiliang;i++){
                    this.zhiliang[i]=true;
                }
                 this.pingjiashow=true;
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },
    clodepingjia(){
        this.pingjiashow=false;
        this.ti='';
    },
    pingjia(name,index){
        if(name=='wuliu'){
            this.wuliu=[false,false,false,false,false]
            for(var i=0;i<=index;i++){
                this.wuliu[i]=true;
                this.wuliuf=Number(index)+1;
            }
        }
        if(name=='fuwu'){
                this.fuwu=[false,false,false,false,false]
            for(var i=0;i<=index;i++){
                this.fuwu[i]=true;
                this.fuwuf=Number(index)+1;
            }
        }
        if(name=='zhiliang'){
                this.zhiliang=[false,false,false,false,false]
            for(var i=0;i<=index;i++){
                this.zhiliang[i]=true;
                this.zhiliangf=Number(index)+1;
            }
        }
    },
    fabu(){
        var content=this.content.trim();
        var loginuser = localStorage.getItem("loginuser");
        var bianhao = localStorage.getItem("pingjiabianhao");
        var buytime = localStorage.getItem("buytime");
        var time=new Date().getTime();
        var haoping=Number(this.wuliuf)+Number(this.fuwuf)+Number(this.zhiliangf);
        if(haoping<=3){
            haoping=1
        }else if(haoping>3&&haoping<=6){
                haoping=2
        }else if(haoping>6&&haoping<=9){
                haoping=3
        }else if(haoping>9&&haoping<=12){
                haoping=4
        }else if(haoping>12&&haoping<=15){
                haoping=5
        }
        this.$axios.post('http://127.0.0.1:3000/api/xiugaipingjia',
            {'UserName':loginuser,'bianhao':bianhao,'content':content,'wuliu':this.wuliuf,
            'fuwu':this.fuwuf,'zhiliang':this.zhiliangf,'haoping':haoping,
            'time':time,'buytime':buytime}
        )
        .then((res) => {
            console.log(res);
            if(res.data.err==0){
                this.ti=res.data.msg;
            }                  								
        })
        .catch((err) => {
            console.log(err);
        })
                    
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
            position: relative;
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
            .buytime{
                position: absolute;
                .position(0,25);
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
.pingjiashow{
    .w(375);
    .h(667);
    position:fixed;
    top:0px;
    left:0px;
    background: black;
    opacity: 0.8;
    z-index: 120;
    div{
        .w(355);
        .h(407);
        .mg(130,0,0,10);
        background: white;
        // opacity: 1;
        z-index: 130;
        p{   .w(375);
            .fs(16);
            .h(25);
            .lh(25);
            .pd(0,0,0,28);
            box-sizing: border-box;
            .active{
                color:red;
            }           
        }
        .cont{
            .h(100);
        }
        .fen{
            span{
                display: inline-block;
                .pd(0,18,0,0);
            }
        }
        .xiugai{
            text-align: center;
            color:@green;
            .mg(15,0,0,0);
        }
        .ti{
            color:red;
            text-align: center;
        }
    }
}
}
</style>
