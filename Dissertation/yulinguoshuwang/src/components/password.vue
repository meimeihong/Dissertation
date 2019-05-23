<template>
<div id="password">
    <div class="head">
        <span @click="returnmy()"><i class="fa fa-chevron-left"></i></span>
        <span>找回密码</span>
    </div>
	<ul>
		<li>
            <span class="fa fa-user-circle-o" aria-hidden="true"></span>
            <input type="text" placeholder="用户名" v-model="user">
        </li>
        <li>
            <span class="fa fa-envelope" aria-hidden="true"></span>
            <input type="text" placeholder="邮箱" v-model="email" @keyup="femail" style="width:200px;">
            <input type="button" value="获取验证码" @click="proving" >
        </li>
        <i>{{emailtext}}</i>
        <li>
            <span class="fa fa-reddit-alien" aria-hidden="true"></span>
            <input type="text" placeholder="验证码" v-model="prov" @keyup="provt">
        </li>
        <i>{{provtext}}</i>
        <li>
            <span class="fa fa-key" aria-hidden="true"> </span>
            <input type="password" placeholder="新密码" v-model="newpass" @keyup="fpass">
        </li>
        <i>{{passtext}}</i>
        <li>
            <span class="fa fa-key" aria-hidden="true"></span>
            <input type="password" placeholder="确认新密码" v-model="confirmpass" @keyup="passconfirm">
        </li>
        <i>{{passy}}</i>
	</ul>
    <span class="tishi">{{tishi}}</span>
    <div class="zhaohui">
        <input type="button" value="找回密码"  @click="findpassword">
    </div>
</div>
</template>

<script>
	export default{
		name:'password',
		data(){
			return{
                user:'',
                email:'',
                newpass:'',
                confirmpass:'',
                emailtext:'',
                passtext:'',
                passy:'',
                prov:'',
                provtext:'',
                tishi:''
			}
			
		},
		methods:{
			femail(){
				this.emailtext=/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/.test(this.email) ? '' : '请输入正确邮箱格式';
				
			},
			fpass(){
				this.passtext= /^.{6,}$/.test(this.newpass) ? '' : '密码必须六位以上';
            },
            provt(){
				this.provtext= /^.{4,}$/.test(this.prov) ? '' : '请填写正确的验证码';
            },
            passconfirm(){
                if(this.newpass!==this.confirmpass){
                      this.passy="新密码设置不一致";
                }else{
                    this.passy="";
                }
            },
            proving(){
                 if(this.emailtext==''&&this. email!==''&&this.user!==''&&this.provtext==''){
                     this.$axios.post('http://127.0.0.1:3000/api/user/proving',
						 {
                             'Email':this.email,
                             'UserName':this.user
						}
					)
					.then((res) => {
                            this.tishi=res.data.msg;	
					})
					.catch((err) => {
						console.log(err);
					})
                 }else{
                     this.tishi='请填写 用户名和邮箱';
                 }
            },
			findpassword(){
                if(this.newpass=='' || this.confirmpass=='' || this.user=='' || this.email==''){
                        this.tishi='请您填写完整修改信息'
                }else{
                    if(this.passy=='' && this.passtext=='' && this.emailtext==''&&this.provtext==''){
					this.$axios.post('http://127.0.0.1:3000/api/user/password',
						 {
                             'UserName':this.user,
                             'Password':this.newpass,
                             'Email':this.email,
                             'prov':this.prov
						}
					)
					.then((res) => {
                        console.log(res)
						if(res.data.err==0){
                            this.tishi=res.data.msg;
                            localStorage.setItem('loginuser', '');
                            localStorage.setItem("shouhuodizhi",'');
                            var that=this
                            setTimeout(function(){
                            that.$router.push({name:'my'});  },3000) 
						}else{
							this.tishi=res.data.msg;
						}	
					})
					.catch((err) => {
						console.log(err);
					})
				 }else{
                     this.tishi='请填写正确的信息格式'
                 }
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
	#password{
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
            i{
                .w(375);
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
                    color:gray; 
                    border:none;
                    
                    
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
            li:nth-child(2){
              input:last-child{
                    .w(100);
                    .h(40);
                    position:absolute;
                    .position(0,270);
                    border:none;
                    outline: none;
                    color:white;
                    background:rgb(66, 216, 103);
                }
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
       .zhaohui{
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