<template>

    <div id="memu">
      <a-menu mode="horizontal"  :default-selected-keys="['1']">
        <router-link to="/"><a-menu-item key="1">登陆</a-menu-item></router-link>
        <router-link to="/register"><a-menu-item key="2">注册</a-menu-item></router-link>
      </a-menu>
    </div>

    <div id="inputFragment">
    <a-input style="position: relative; top: 20px;" :style="{width:'320px'}" default-value="" placeholder="Username" allow-clear v-model="username" />
    <br/>
    <a-input style="position: relative; top: 50px;"  :style="{width:'320px'}" default-value="" placeholder="Password" allow-clear v-model="password" />
    <br/>
    <a-button style="position: relative; top: 80px; left: -0px;" :style="{width: '320px'}"  type="primary" @click="login">登陆</a-button>
    </div>
    
</template>

<script>

import { ref } from "vue";
import  router  from "../router.js";

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      let v = this
      fetch("http://localhost:8080/api/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": v.username,
          "password": v.password
        })
      })
      .then(response => {
        if (response.ok){
          console.log(response)
          
          console.log(response.headers.get('Authorization'))
          // 获取响应头部的所有键值对 
          const headers = response.headers; 
          // 遍历所有头部信息 
          headers.forEach((value, name) => { 
            console.log(`${name}: ${value}`); 
          });
        }
      })
      .then(data => {
        // console.log(data)
      })
    }
  }
}


</script>


<style>

#inputFragment {
    text-align: center;
    position: absolute;

    left: 50%;
    top: 50%;
    width: 400px;
    height: 300px;
	border-radius: 20px;
    transform: translate(-50%,-50%);
}

#memu {
  text-align: center;
  position: absolute;
  width: 250px;
  left: 49%;
  top: 23%;
  transform: translate(-50%, -50%);
}


</style>

