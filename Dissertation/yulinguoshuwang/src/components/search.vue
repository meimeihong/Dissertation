<template>
  <div id="search">
        <div class="header">
            <span @click="returnto()"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
             <input type="text" :placeholder="search" v-model="searchcontent">
             <span @click="searchsecond()"><i class="fa fa-search"></i></span>
        </div>
    <ul class="list">
       <li  v-for="(item, index) in searchlist" :key="index">
           <p class="zhe" v-show="item.shuliang<1?true:false||item.zhuangt==0?true:false">
                商品已无效
            </p>
			<img :src="item.img.split(',')[0]" alt="" @click="toxiangqing(item)">
			<div class="good">
				<p>{{item.name}}</p>
				<p style="color:gray;">{{item.miaoshu}}</p>
				<p>
					<span style="color:red;">￥{{item.danjia.toFixed(2)}}</span>
					<span  style="color:#ccc;">/{{item.guige}}</span>
                    <span class="cart3"  @click="addtocart(item.bianhao,item)"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
				</p>						
			</div>
		</li>
    </ul>
  </div>
</template>
<script> 
export default {
  name: 'tab',
  props:['listname'],
  data() {
		return {
          searchlist:[],
          search:'',
          searchcontent:''
		}
    },
    methods:{
        searchdata(){
            var searchname= localStorage.getItem("searchname");
            this.search=searchname;
            this.$axios.post('http://127.0.0.1:3000/api/goods/searchgoods',
                {'searchname':searchname})
                .then((res)=>{
                    console.log(res);
                    if(res.data.err==0){
                        this.searchlist=res.data.data;
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        returnto(){
            var searchreturn= localStorage.getItem("searchreturn");
            this.$router.push({name:searchreturn})
        },
        searchsecond(){
            this.searchcontent=this.searchcontent.trim();
            if(this.searchcontent!==''){             
                localStorage.setItem('searchname', this.searchcontent);
                this.searchdata();
			}
        },
        toxiangqing(data){
            var xiangqingdata=JSON.stringify(data);
            localStorage.setItem('xiangqing', xiangqingdata);
            localStorage.setItem('xiangqingreturn', 'search');
            this.$router.push({name:'xiangqing'});
        }
    },
    created() {
		this.searchdata();
	}
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#search{
    .header{
        .w(375);
        .h(40);
        .lh(40);
        position: fixed;
        .position(0,0);
        background: white;
        z-index: 100;
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
        input{
            .w(280);
            .h(25);
            .fs(16);
            color:gray;
            border:none;
            border-radius: 15px;
            .mg(0,0,0,15);
            .pd(0,0,0,10);
            outline: none;
            background: rgb(218, 218, 218);
            box-sizing: border-box;
        }
    }
    .list{
        .w(375);
        .mg(42,0,0,0);
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:space-around;
        align-items:center;
        li{.w(375);
            .h(90);
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
                .h(95);
                .lh(95);
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
                .h(80);
                .mg(0,0,0,15);
            }
            .good{
                .fs(14);
                display: inline-block;
                .w(230);
                .mg(0,0,0,10);
            p{  .h(25);
                .lh(25);
                position: relative;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                text-align: left;
                .cart3{
                    position: absolute;
                    .position(1,110);
                    color:orange;
                    .fs(18);
                    .mg(0,0,0,90);
                }
            }
       }
            }
        }
}
</style>
