<template>
  <div id="shoucang">
     <div class="top">
        <span @click="returnto()"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
        <span class="xlb">我的收藏</span>
     </div>
     <div class="content">
         <ul class="two">
            <li v-for="(item, index) in shoucangdata" :key="index">
                <p class="rlzhe" v-show="JSON.parse(item.data).shuliang<1?true:false||item.zhuangt==0?true:false">
                    商品已失效
                </p>
                <img :src="JSON.parse(item.data).img.split(',')[0]" alt="" @click="toxiangqing(item.data)">
                <p>{{JSON.parse(item.data).name}}</p>
                <p style="color:gray;">{{JSON.parse(item.data).miaoshu}}</p>
                <p style="color:red;">
                    <span>￥</span><span>{{JSON.parse(item.data).danjia}}</span>
                    <span class="guige" style="color:#ccc;">/{{JSON.parse(item.data).guige}}</span> 
               </p>
               <p class="cang">
                   <span @click="dele(item.bianhao)"><i class="fa fa-heart" aria-hidden="true"></i></span>
               </p>
            </li>
        </ul>
        <div v-show="shoucangdata.length<1?true:false">
            您目前还没有收藏的商品哦
        </div>
     </div>
  </div>
</template>
<script> 
export default {
  name: 'shoucang',
  data() {
    return {
       shoucangdata:[]
    }
    },
    methods:{
       getdata(){
           var loginuser = localStorage.getItem("loginuser");
            this.$axios.post('http://127.0.0.1:3000/api/shoucang',{ 'UserName':loginuser })
            .then((res) => {
                console.log(res)
                if(res.data.err==0){
                    this.shoucangdata=res.data.data; 
                }
            })
            .catch((err) => {
                console.log(err);
            })
       },
       dele(bianhao){
            var loginuser = localStorage.getItem("loginuser");
           this.$axios.post('http://127.0.0.1:3000/api/delecollection',
            {'bianhao':bianhao,'UserName':loginuser})
            .then((res)=>{
                console.log(res)
                if(res.data.err==0){
                    this.getdata();
                }
            })
            .catch((err) => {
                    console.log(err);
            }) 
       },
       returnto(){
           this.$router.push({name:'my'});
       },
       toxiangqing(data){
            localStorage.setItem('xiangqing', data);
            localStorage.setItem('xiangqingreturn', 'shoucang');
            this.$router.push({name:'xiangqing'});
        }
    },
    created() {
        this.getdata();
    }
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#shoucang{
    .top{
        position: fixed;
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
    .content{
        .mg(45,0,0,0);
        div{
            .fs(20);
            color:gray;
            .w(375);
            .h(200);
            .lh(200);
            text-align: center;
          }
        .two{  .w(375);
		 display: -webkit-flex; /* Safari */
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content:space-around;
          align-items:center;
         li{ background: white;
            position: relative;
            .mg(10,0,0,0);
            .w(150);
            .fs(12);
           .rlzhe{
                .fs(16);
                .w(150);
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
                .w(150);
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
            .cang{
                color:red;
                text-align: right;
                .pd(0,10,0,0);
                box-sizing: border-box;
                .fs(20);
            }
         }
		}
    }
}
</style>
