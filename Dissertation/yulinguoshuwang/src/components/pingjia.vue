<template>
  <div id="pingjia">
    <p class="top">
        <span @click="pingjiareturn()"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
        <span>发表评价</span>
        <span class="fabu" @click="fabu">发布</span>
    </p>
    <div class="content">
        <p>在这里，您可以发表评论哦~~</p>
         <textarea name="" id="" cols="45" rows="10" v-model="cont"></textarea>
    </div>
    <div class="fen">
       <p class="fentop">商品评分</p>
       <p>
           <span>物流服务</span>
           <span  v-for="(item,index) in wuliu" :key="index" v-bind:class="wuliu[index]?'active':''" @click="pingjia('wuliu',index)">
               <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span class="f" v-show="wuliuf>0?true:false">{{wuliuf}}分</span>
       </p>
       <p>
           <span>服务态度</span>
           <span  v-for="(item,index) in fuwu" :key="index" v-bind:class="fuwu[index]?'active':''" @click="pingjia('fuwu',index)">
               <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span class="f" v-show="fuwuf>0?true:false">{{fuwuf}}分</span>
       </p>
       <p>
           <span>商品质量</span>
           <span v-for="(item,index) in zhiliang" :key="index" v-bind:class="zhiliang[index]?'active':''" @click="pingjia('zhiliang',index)">
               <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
            <span class="f" v-show="zhiliangf>0?true:false">{{zhiliangf}}分</span>
       </p>
    </div>
  </div>
</template>
<script> 
    import Vue from 'vue';
    import { Toast } from 'mint-ui';
export default {
  name: 'pingjia',
  data() {
		return {
         wuliu:[false,false,false,false,false],
         wuliuf:null,
         fuwu:[false,false,false,false,false],
         fuwuf:null,
         zhiliang:[false,false,false,false,false],
         zhiliangf:null,
         cont:''
		}
    },
    methods:{
        pingjia(name,index){
            console.log('a')
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
            if(this.wuliuf==null||this.fuwuf==null||this.zhiliangf==null){
                Toast({
                    message: '请您完成商品的评分',
                    position: 'center',
                    duration: 2000,
                    className:'tankuang',
                });
            }else{
                var content=this.cont.trim();
                var loginuser = localStorage.getItem("loginuser");
                var bianhao = localStorage.getItem("pingjiabianhao");
                var goodslisttime = localStorage.getItem("pingjiatime");
                var pingjiareturn=localStorage.getItem("pingjiareturn");
                console.log(goodslisttime)
                var time=new Date().getTime();
                var haoping=Number(this.wuliuf)+Number(this.fuwuf)+Number(this.zhiliangf);
                this.$axios.post('http://127.0.0.1:3000/api/addpingjia',
                    {'UserName':loginuser,'bianhao':bianhao,'content':content,'wuliu':this.wuliuf,
                    'fuwu':this.fuwuf,'zhiliang':this.zhiliangf,'haoping':haoping,'time':time,'goodslisttime':goodslisttime}
                )
                .then((res) => {
                   console.log(res);
                   if(res.data.err==0){
                       Toast({
                            message: res.data.msg,
                            position: 'center',
                            duration: 2000,
                            className:'tankuang',
                        });	
                   }                  								
                })
                .then((res)=>{
                    var that=this;
                    setTimeout(function(){
                    that.$router.push({name:pingjiareturn});
                    },4000)           
                })
                .catch((err) => {
                    console.log(err);
                })
            }          
        },
        pingjiareturn(){
            var pingjiareturn=localStorage.getItem("pingjiareturn");
            this.$router.push({name:pingjiareturn});
        }
    }
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#pingjia{
    .w(375);
    .top{
        .fs(16);
        .h(40);
        .lh(40);
        border-bottom: 1px solid #ccc;
        position: relative;
        span{
            display:inline-block;
            .pd(5,8,5,8);
        }
        .fabu{
            color:@green;
            position:absolute;
            top:0px;
            right:20px;
        }
    }
    .content{
        .w(375);
        .fs(16);
        p{  .h(25);
            .lh(25);
            text-align: center;
            color:gray;
        }
        .w(375);
        text-align: center;
        .pd(25,0,10,0);
        textarea{
            outline: none;
            .fs(16);
        }
    }
    .fen{        
        .mg(25,0,0,0);
        p{  .h(25);
            .lh(25);
            .fs(16);
            color:gray;
            .pd(0,0,0,15);
            box-sizing: border-box;
            span{
                .mg(0,15,0,5);
            }
            .active{
                color:red;
            }
            .f{
                color:red;
                .mg(0,0,0,15);
            }
        }
        .fentop{.fs(16);
            text-align: center;
            .mg(0,0,10,0);
        }
    }
}
</style>
