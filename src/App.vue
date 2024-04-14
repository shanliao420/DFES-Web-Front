<template>


    <div id="inputFragment">
    <a-input style="position: relative; top: 20px;" :style="{width:'320px'}" default-value="" placeholder="Username" allow-clear />
    <br/>
    <a-input style="position: relative; top: 50px;"  :style="{width:'320px'}" default-value="" placeholder="Password" allow-clear />
    <br/>
    <a-button style="position: relative; top: 70px; left: -80px;"  type="primary">Primary</a-button>
    <a-button style="position: relative; top: 70px; left: 80px;" type="outline">Outline</a-button>
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

