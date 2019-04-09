<template>

<div id="CategoryList">
    <Header></Header>
     <div class="head-detail-nav">
        <a href="javascript:0" class="head-detail-return">
				<span @click="returns" class="return-icon fa fa-arrow-left"></span>
			</a>
        <span class="head-detail-center">{{fonts.font}}</span> 
        <span class="none"></span>
    </div>
    <div class="container" v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="200">
        <div class="manga-item"
            v-for='(items,index) in CategoryList'
            :key='index'  @click="setid(items)"
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
import qs from 'qs';
import Vue from 'vue';
import Header from '../../commons/Header.vue';
import DetailNav from "../../commons/DetailNav.vue";
import {InfiniteScroll  } from 'mint-ui';
Vue.use(InfiniteScroll);
    export default{
        name:'CategoryList',
        data(){
            return{
               CategoryList:[],
               fonts:{}
            }
        },
        components:{
            Header,
            DetailNav
        },
        methods:{
            GetCategoryListData(){
            	var datas=JSON.parse(sessionStorage.getItem("font"));
              this.fonts=datas;
              if(this.fonts.start<96){
              this.$axios.post('/api/category/ajax_group', qs.stringify({
						param:this.fonts.param,
						gname:this.fonts.font,
						start: this.fonts.start,
						fun: this.fonts.fun,
					}))
					.then((res) => {
						var ress=res.data.datas.items
						this.CategoryList=this.CategoryList.concat(ress)
						this.fonts.start+=16
					})
					.catch((err) => {
						console.log(err);
					})
					}
            },
            setid(datas) {
                var Datas = JSON.stringify(datas);
                sessionStorage.setItem("data", Datas);
                this.$router.push({
                    path: `/m/${datas.mid}`,
                    params: {
                        mid: datas.mid
                    }
                })
            },
             loadMore() {
                this.GetCategoryListData();
            },
            returns() {
				this.$router.push({
					path: '/Category'
				})
			}
      }
    }
</script>

<style lang="less" scoped>
    @import '../../../styles/main.less';
.head-detail-nav{
    position:fixed;
    .position(40px,0px);
    .w(375px);
    .h(38px);
    .lh(38px);
    .fs(15px);
    color:#666;
    background:#fff;
    border-bottom:1px solid #ccc;
    display:flex;
    flex-flow: row nowrap;
    justify-content:space-around;
     .fs(16px);
    .head-detail-return{
        flex:1;
        span{
            text-align: left;
            color:#666;
            .fs(18px);
            .mg(0,0px,0,20px);
        }
    }
    .head-detail-center{
        flex:1;
        text-align: center;
    }
    .none{
    	flex:1;
    }
}
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