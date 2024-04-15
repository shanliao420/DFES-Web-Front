<template>

    <div id="memu">
      <a-menu mode="horizontal"  :default-selected-keys="['1']">
        <router-link to="/"><a-menu-item key="1">登陆</a-menu-item></router-link>
        <router-link to="/register"><a-menu-item key="2">注册</a-menu-item></router-link>
      </a-menu>
    </div>

    <div id="inputFragment">
    <a-input style="position: relative; top: 20px;" :style="{width:'320px'}" default-value="" placeholder="Username" allow-clear />
    <br/>
    <a-input style="position: relative; top: 50px;"  :style="{width:'320px'}" default-value="" placeholder="Password" allow-clear />
    <br/>
    <a-button style="position: relative; top: 80px; left: -0px;" :style="{width: '320px'}"  type="primary" @click="homePage">登陆</a-button>
    </div>
    
</template>

<script>

import  router  from "../router.js";

export default {
  methods: {
    homePage() {
      router.push("/home");
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

