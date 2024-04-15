<template>

    <div id="memu">
      <a-menu mode="horizontal"  :default-selected-keys="['2']">
        <router-link to="/"><a-menu-item key="1">登陆</a-menu-item></router-link>
        <router-link to="/register"><a-menu-item key="2">注册</a-menu-item></router-link>
      </a-menu>
    </div>

    <div id="inputFragment">
    <a-input style="position: relative; top: 20px;" :style="{width:'320px'}" default-value="" placeholder="Username" allow-clear />

    <a-input style="position: relative; top: 50px;"  :style="{width:'320px'}" default-value="" placeholder="Password" allow-clear />

    <a-input style="position: relative; top: 80px;"  :style="{width:'320px'}" default-value="" placeholder="Email" allow-clear />

    <a-input style="position: relative; top: 110px;"  :style="{width:'320px'}" default-value="" placeholder="Phone" allow-clear />

    <a-button style="position: relative; top: 140px; left: -0px;" :style="{width: '320px'}"  type="primary">注册</a-button>
    </div>
    
</template>


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

