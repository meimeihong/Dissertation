<template>
<div id="login">
    <div class="head" @click="returnmy">
        <span><i class="fa fa-chevron-left"></i></span>
        <span>会员登陆</span>
    </div>
	<ul>
		<li>
            <span><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
           <input type="text" placeholder="用户名" v-model="user" >
        </li>
        <li>
            <span><i class="fa fa-unlock" aria-hidden="true"></i></span>
            <input type="password" placeholder="密码" v-model="pass">
        </li>
	</ul>
    <span class="tishi">{{tishi}}</span>
    <span class="wangj" @click="topassword">忘记密码？</span>
    <div class="denglu">
        <input type="button" value="登陆"  @click="login">
        <input type="button" value="立即注册"  @click="toreg">
    </div>
</div>
</template>

<script>
	export default{
		name:'login',
		data(){
			return{
                tishi:'',
                user:'',
                pass:''
			}			
		},
		methods:{
			login(){
				if(this.user!=='' && this.pass!==''){
					this.$axios.post('http://127.0.0.1:3000/api/user/login',
						 {
                             'UserName':this.user,
                             'Password':this.pass
						}
					)
					.then((res) => {
                        console.log(res.data.data)
						if(res.data.err==0){
                            localStorage.setItem('loginuser', this.user);
                            localStorage.setItem("shouhuodizhi",res.data.data);
							this.$router.push({name:'home'})
						}else{
							this.tishi=res.data.msg;
						}	
					})
					.catch((err) => {
						console.log(err);
					})
				}
			},
            toreg(){
                this.$router.push({name:'reg'})
            },
            topassword(){
                this.$router.push({name:'password'})
            },
            returnmy(){
                this.$router.push({name:'my'})
            }
		}
	}
</script>

<style lang="less" scoped>
	@import '../styles/main.less';
	#login{
        .fs(16);
       .head{         
          .w(375);
          .h(35);
          border-bottom: 1px solid rgb(218, 218, 218);
           span{
             display:inline-block; 
             text-align: center; 
             .h(35);
             .lh(35);
             color:gray;
           }
           span:first-child{
               .w(40);              
           }
           span:last-child{
               .w(320);
               font-weight: 700;
           }
       }
       
       ul{
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:flex-start;
            align-items:center;
            .mg(50,0,0,0);
            li{ 
                position: relative;
                .w(375);
                .h(40);
                .lh(40);
                border-bottom: 1px solid rgb(197, 193, 193);
                span{
                    display:inline-block;
                    .w(35);
                    .h(40);
                    text-align: center;
                    .lh(40);
                    color:gray;
                }
                input{
                    .w(300);
                    .h(38);
                    position:absolute;
                    .position(0,38);
                    border:none;
                    outline: none;
                    color:gray;
                }
            }
            li:first-child{
                border-top:1px solid rgb(197, 193, 193);
            }
       }
       .tishi{
           display: inline-block;
           color:red;
           .w(375);
           .h(30);
           .lh(30);
           .fs(12);
           text-align: center;
       }
       .wangj{
           color:rgb(66, 216, 103);
           font-size: 14px;
           display:inline-block;
           .mg(0,0,0,15);
       }
       .denglu{
           .w(375);
           .mg(35,0,0,0);
           display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content:center;
            align-items:center;
           input{
               .w(100);
               .h(30);
               color:white;
               background:rgb(66, 216, 103);
               border:none;
            //    .mg(0,0,0,80);
           }
           input:last-child{
               border:1px solid rgb(66, 216, 103);
               background:white;
               color:rgb(66, 216, 103);
               .mg(0,0,0,60);
               outline: none;
           }
       }
	}
</style>