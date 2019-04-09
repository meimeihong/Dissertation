<template>

<div id="Ranking">
   <Header></Header>
   <Homehead :listname="listname"></Homehead>
    <div class="container">
    	 <!--v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"-->
        <div class="manga-item"
            v-for='(items,index) in Rankinglist'
            :key='index'
            @click="setid(items)"
        >
        	<a href="javascript:0">
            	<span class="img_wraper">
                    <img class="lazy" :src="items.logo" alt="">   
                </span>
            	<p>
                	<span class="item-name">{{items.name}}</span>
                    <span calss="item-author">{{items.author}}</span>
            	</p>
        	</a>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue';
import Header from '../../commons/Header.vue';
import Homehead from "../../commons/Homehead.vue";
import {InfiniteScroll  } from 'mint-ui';
Vue.use(InfiniteScroll);
	
    export default{
        name:'Ranking',
        data(){
            return{
                Rankinglist:[],
                listname:'排行',
            }
        },
        components:{
            Header,
            Homehead,
        },
        methods:{
            GetRankingListData(){
            var hash=window.location.href;
			sessionStorage.setItem("skip", hash);	
            this.$axios.post('/api/ranking/get_data')
             .then((res)=>{
                 this.Rankinglist=res.data.datas.items;
             })
             .catch((err)=>{
                 console.log(err);
             })
            },
            setid(data) {
                var dt = JSON.stringify(data);
                sessionStorage.setItem("data", dt);
                this.$router.push({
                    path: `/m/${data.mid}`,
                    params: {
                        mid: data.mid
                    }
                })
            }
        },
        created() {
            this.GetRankingListData();
        }
    }
</script>
<style lang="less" scoped>
@import '../../../styles/main.less';
.container{
    position:absolute;
    .position(79px,0px);
    .pd(0,0,50px,0);
    z-index: -1000;
    display:flex;
    justify-content:flex-start;
    flex-flow:row wrap;
    align-content:flex-start;
    .manga-item{
        float:left;
        .w(110px);
        .h(235px);
        .mg(10px,7px,0,7px );
        .fs(14px);
        a{
            span{
                img{
                    .w(108px);
                    .h(163px);
                }
            }
            p{
                span{
                    color:#999;
                    display:block;
                    .mg(0px,0,4px,0);
                }
                .item-name{
                    color:#333 !important ;
                   .fs(12px);
                }
                .item-author{
                    .fs(12px);
                     overflow: hidden;
                }
            }
        }
    }

}

</style>