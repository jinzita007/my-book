<template>
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

</template>

<script>

export default {
  data () {
    return {
            username: '',
            usernameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            activeTab: 'tab1'
    }
  },
   methods: {
    handleTabChange(val) {
      this.activeTab = val
    },
    handleActive() {
      window.alert('tab active')
    },
    checkLogin() {
         //var username = this.username
         //console.log(username)
         this.$http.post('/api/login',{username:this.username,password:this.password},{
             headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
         })
         .then(res => {
             //登录成功 跳转至首页
             if (res.data.status === 1) {
                 this.toastr.success(res.data.message)
                 this.$router.push(`/`)
                 //console.log('成功登录！');
             } else if (res.data.status === 2) {
                 this.toastr.warning(res.data.message)
             } else if (res.data.status === 3){
                 this.toastr.warning(res.data.message)
             } else if (res.data.status === 0) {
                 this.toastr.error(res.data.message)
             }      
         })
         .catch(err => {
             this.toastr.error('登录失败！')
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

