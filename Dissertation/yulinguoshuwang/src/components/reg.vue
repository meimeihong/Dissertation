<template>
<div id="reg">
    <div class="head">
        <span @click="returnmy()"><i class="fa fa-chevron-left"></i></span>
        <span>会员注册</span>
    </div>
	<ul>
		<li><span>*</span><input type="text" placeholder="用户名" v-model="user" @keyup="usertext"></li>
        <i  :class="usert!==''?'tshow':''">{{usert}}</i>
        <li><span>*</span><input type="password" placeholder="密码" v-model="pass" @keyup="fpass"></li>
        <i :class="passtext!==''?'tshow':''">{{passtext}}</i>
        <li><span>*</span><input type="text" placeholder="邮箱" v-model="email" @keyup="femail"></li>
        <i :class="emailtext!==''?'tshow':''">{{emailtext}}</i>
        <li><span>*</span><input type="text" placeholder="电话号码" v-model="phone" @keyup="fphone"></li>
	</ul>
    <span class="tishi">{{success}}</span>
    <div class="zhuce">
        <input type="button" value="注册"  @click="reg">
    </div>
</div>
</template>

<script>
	export default{
		name:'Reg',
		data(){
			return{
                user:'',
				email:'',
				pass:'',
				passtext:'',
				emailtext:'',
				usert:'',
                phone:'',
                success:''
			}
			
		},
		methods:{
			femail(){
				this.emailtext=/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/.test(this.email) || /^$/.test(this.email)? '' : '请输入正确邮箱格式';
				
			},
			fpass(){
				this.passtext= /^.{6,}$/.test(this.pass) || /^$/.test(this.pass) ? '' : '密码必须六位以上';
            },
            fphone(){
                 this.success=/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone) || /^$/.test(this.phone)?'':'请输入手机号码';
            },
			usertext(){
					this.$axios.post('http://127.0.0.1:3000/api/user/usertext',
						 {
							'UserName':this.user
						}
					)
					.then((res) => {
                        var err=res.data.err;
                        if(err==-1){
                            this.usert=res.data.msg;
                        }else{
                            this.usert='';
                        }												
					})
					.catch((err) => {
						console.log(err);
					})
				
			},
			reg(){
				if(this.usert=='' && this.passtext=='' && this.emailtext==''&&this.success==''){
					this.$axios.post('http://127.0.0.1:3000/api/user/reg',
						 {
                             'UserName':this.user,
                             'Password':this.pass,
                             'Email':this.email,
                             'TelephoneNumber':this.phone,
                             'dizhi':''
						}
					)
					.then((res) => {
						if(res.data.err==0){
							this.$router.push({name:'login'})
						}else{
							this.success=res.data.msg;
						}	
					})
					.catch((err) => {
						console.log(err);
					})
				}
            },
            returnmy(){
                this.$router.push({name:'my'})
            }
		}
	}
</script>

<style lang="less" scoped>
	@import '../styles/main.less';
	#reg{
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
            .tshow{
                .w(375);
                .h(25);
                .lh(25);
                border-bottom: 1px solid rgb(197, 193, 193);
                text-align: center;
                color:red;
            }
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
                    color:red;
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
       .zhuce{
           .w(375);
           .mg(35,0,0,0);
           input{
               .w(200);
               .h(30);
               color:white;
               background:rgb(66, 216, 103);
               border:none;
               .mg(0,0,0,80);
           }
       }
	}
</style>