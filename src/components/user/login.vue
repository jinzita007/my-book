<template>
<div>
  <mu-tabs :value="activeTab" @change="handleTabChange">
    <mu-tab value="tab1" title="登录"/>
    <mu-tab value="tab2" title="注册"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
    <div class="login">
        <mu-text-field hintText="请输入用户名"/>
        <br/>   
        <mu-text-field hintText="请输入密码"/>
        <br/>   
         <mu-raised-button @click="editMovie" label="登录" primary/>
        <br/>
    </div>
  </div>
  <div v-if="activeTab === 'tab2'">
    <div class="register">
        <mu-text-field hintText="请输入用户名"/>
        <br/>   
        <mu-text-field hintText="请输入电子邮箱"/>
        <br/> 
        <mu-text-field hintText="请输入密码"/>
        <br/>   
         <mu-raised-button @click="editMovie" label="注册" primary/>
        <br/>
    </div>
  </div>
  
</div>

</template>

<script>
export default {
  data () {
    return {
       activeTab: 'tab1'
    }
  },
   methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    handleActive () {
      window.alert('tab active')
    }
  }
}
</script>
<style>
.login {
    margin: 0 auto;
}
</style>

