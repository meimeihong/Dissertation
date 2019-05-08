<template>
  <div id="homeclass">
     <ul>
          <li v-for="(item, index) in lists" :key="index" @click="classifym(item.name)">
              <img :src="item.img" alt="" style="background:item.img">
              <p>{{item.name}}</p>
          </li>
     </ul>
  </div>
</template>
<script> 
export default {
  name: 'homeclass',
  data() {
			return {
              lists:[{name:'新鲜水果',img:require('../img/shuiguo.jpg')},
              {name:'新鲜蔬菜',img:require('../img/cai.jpg')},
              {name:'精选肉类',img:require('../img/rou.jpg')},
              {name:'海鲜水产',img:require('../img/haixian.jpg')},
              {name:'酒水饮料',img:require('../img/yinliao.jpg')},
              {name:'休闲零食',img:require('../img/sushi.jpg')},
              {name:'禽类蛋品',img:require('../img/dan.jpg')},
              {name:'折扣专区',img:require('../img/zhekou.jpg')}]
			}
    },
    methods:{
      classifym(name){
        if(name=='折扣专区'){
          this.$router.push({name:'zhekou'});
        }else{
          localStorage.setItem('classifym', name);
          this.$router.push({name:'classifym'});
        }       
      }
    }
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';
#homeclass {
  ul{ .mg(10,0,0,0);
      .w(375);
      display: -webkit-flex; /* Safari */
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content:space-around;
      align-items:center;
      li{ 
          .w(80);
          color:gray;
          img{
              .w(80);
              .h(60);
              .br(40);
          }
          p{
            .fs(14);
            text-align: center;
          }
      }
  }
}
</style>
