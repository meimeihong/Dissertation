<template>

<div id="Ranking">
   <Header></Header>
   <DetailNav></DetailNav>
    <div class="container">
        
        <div class="manga-item"
            v-for='(items,index) in categorylist'
            :key='index'
        >
        	<div>
            	<span class="img_wraper">
                    <img class="lazy" :src="items.logo" alt="">   
                </span>
            	<p>
                	<span class="item-name">{{items.name}}</span>
                    <span calss="item-author">{{items.author}}</span>
            	</p>
        	</div>
            
        </div>
    </div>
   
</div>

</template>

<script>
import Vue from 'vue';
import Header from '../../commons/Header.vue';
import DetailNav from "../../commons/DetailNav.vue";
import {InfiniteScroll  } from 'mint-ui';
Vue.use(InfiniteScroll);
   var datas=JSON.parse(sessionStorage.getItem("data"));
   console.log(datas.mid)
   
   var mid=Number(datas.mid)
            		console.log(mid)
    var a=/d{6}/.test(mid)?'true':'false';
    export default{
        name:'CategoryDetail',
        data(){
            return{
                categorylist:[],		
                data:datas

            }
        },
        components:{
            Header,
            DetailNav
            // RankingDetail
        },
        methods:{
            GetCategoryListData(){
            		console.log(datas)
            	if(a=='true'){
            		this.categorylist=this.categorylist.push(datas)
            		console.log(datas)
            	}else{
            		console.log(datas)
            	}
            	
            	
            }

        },
        created() {
            this.GetCategoryListData();
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
        // border:1px solid #ccc;
        .fs(14px);
        div{
            
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