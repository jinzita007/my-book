<template>
<div class="login_main">
<div class="table">
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="登录"/>
    <mu-tab value="tab2" title="注册"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
    <div class="login">
        <mu-text-field v-model="username" errorText="" icon="account_box" label="请输入用户名" labelFloat/>
        <br/> 
        <mu-text-field v-model="password" icon="lock" label="请输入密码" labelFloat/>
        <br/>   
         <mu-raised-button @click="checkLogin" label="登录" primary/>
        <br/>
    </div>
  </div>
  <div v-if="activeTab === 'tab2'">
    <div class="register">
        <mu-text-field v-model="username" icon="account_box" label="请输入用户名" labelFloat/>
        <br/>   
        <mu-text-field v-model="email" icon="email" label="请输入电子邮箱" labelFloat/>
        <br/> 
        <mu-text-field v-model="password" icon="lock" label="请输入密码" labelFloat/>
        <br/>   
         <mu-raised-button @click="registerClick" label="注册" primary/>
        <br/>
    </div>
  </div>
  
</div>
</div>

</template>

<script>
import {mapActions} from 'vuex'
export default {

  data () {
    return {
            username: '',
            usernameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            activeTab: 'tab1',
    }
  },
beforeCreate: function () {
       
        this.$http.get('/api/session').then(res => {
            if (res.data.session === true) {
                this.$router.push('/bookList')
            }
  }).
  catch(err => {
      console.log(err);     
  })
},

   methods: {
    ...mapActions(["userLogin"]),

    handleTabChange(val) {
      this.activeTab = val
    },
    //通过登录接口发起请求
    checkLogin() {

         this.$http.post('/api/login',{username:this.username,password:this.password})
        .then(res => {
            if (res.data.success === true) {
                 console.dir(res.data)
                 this.userLogin(res.data)
                 this.toastr.success(res.data.message)
                 this.$router.push({ path: 'bookList' }) 
            }
            else{
                     this.toastr.error(res.data.error)
                      //this.$message.error(`${res.data.message}`);
                      return false;
                    }
            
         })
         .catch(err => {
             console.log(err); 
         })
    },
    registerClick() {
        this.$http.post('/api/user',{
            username: this.username,
            email: this.email,
            password: this.password
        })
        .then(res => {
            if (res.data.status === 1) {
                this.toastr.success(res.data.message)
                this.activeTab = 'tab1'
                this.username = '',
                this.email = '',
                this.password = ''
            } else if (res.data.status === 2) {
                this.toastr.warning(res.data.message)
            } else if (res.data.status === 0) {
                this.toastr.error(res.data.message)
            } 
        })
        .catch(err => {
            console.log(err);   
        })
    }

  }
}
</script>
<style>

.table {
   position: absolute;
   width: 400px;
   height: 380px;
   left: 50%;
   top: 25%;
   margin-left: -200px;
   margin-top: -100px;
   border: 1px solid #e40e32
}

.login {
    padding: 40px;
}
.register {
    padding: 20px;

}
</style>

