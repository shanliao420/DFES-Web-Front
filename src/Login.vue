<template>

    <a-menu mode="horizontal" theme="dark" :default-selected-keys="['1']">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div
          :style="{
            width: '80px',
            height: '30px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
          }"
        />
      </a-menu-item>
      <a-menu-item key="1">Home</a-menu-item>
      <a-menu-item key="2">Solution</a-menu-item>
      <a-menu-item key="3">Cloud Service</a-menu-item>
      <a-menu-item key="4">Cooperation</a-menu-item>
    </a-menu>

    <div id="inputFragment">
    <a-input style="position: relative; top: 20px;" :style="{width:'320px'}" default-value="" placeholder="Username" allow-clear />
    <br/>
    <a-input style="position: relative; top: 50px;"  :style="{width:'320px'}" default-value="" placeholder="Password" allow-clear />
    <br/>
    <a-button style="position: relative; top: 80px; left: -0px;" :style="{width: '320px'}"  type="primary">登陆</a-button>
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


</style>

