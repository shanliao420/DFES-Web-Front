<template>

    <div id="memu">
      <a-menu mode="horizontal"  :default-selected-keys="['2']">
        <router-link to="/"><a-menu-item key="1">登陆</a-menu-item></router-link>
        <router-link to="/register"><a-menu-item key="2">注册</a-menu-item></router-link>
      </a-menu>
    </div>

    <div id="inputFragment">
    <a-input style="position: relative; top: 20px;" :style="{width:'320px'}" default-value="" placeholder="Username" allow-clear v-model="rusername"/>

    <a-input-password v-model:visibility="visibility" :defaultVisibility="true" style="position: relative; top: 50px;"  :style="{width:'320px'}" default-value="" placeholder="Password" allow-clear v-model="rpassword" />

    <a-input style="position: relative; top: 80px;"  :style="{width:'320px'}" default-value="" placeholder="Email" allow-clear v-model="remail" />

    <a-input style="position: relative; top: 110px;"  :style="{width:'320px'}" default-value="" placeholder="Phone" allow-clear v-model="rphone" />

    <a-button style="position: relative; top: 140px;left: -0px;" :style="{width: '320px'}"  type="primary" @click="register">注册</a-button>
    </div>
    
</template>

<script>

import  router  from "../router.js";
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';
import { Message } from "@arco-design/web-vue";

export default {
  data() {
    return {
      rusername: "",
      rpassword: "",
      remail: "",
      rphone: ""
    }
  },
  methods: {
    register() {
      let v = this
      fetch("http://localhost:9080/api/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": v.rusername,
          "password": v.rpassword,
          "email": v.remail,
          "phone": v.rphone
        })
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        if (data.code === 0) {
          Message.success(data.msg)
          router.push({path: '/'})
        } else {
          Message.error(data.msg)
        }
      })
      .catch(error => {
        console.log(error)
        Message.error("注册失败")
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

