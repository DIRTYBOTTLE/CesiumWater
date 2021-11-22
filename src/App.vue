<template>
<!--	<Cesium></Cesium>-->
	<a-config-provider :locale="locale">
		<router-view></router-view>
	</a-config-provider>
</template>

<script setup>
// import Cesium from "./components/Cesium.vue";
// import Home from "./components/Home";

</script>

<style>
#app {
  height: 100%;
}

/*.v-enter-active{*/
/*	animation: listChange 1s;*/
/*}*/
/*.v-leave-active{*/
/*	animation: listChange 1s reverse;*/
/*}*/

/*@keyframes listChange{*/
/*	from{*/
/*		transform: translateX(-100%);*/
/*		!*transform: translateX(100%);*!*/
/*	}*/
/*	to{*/
/*		transform: translateX(100);*/
/*	}*/
/*}*/

.ant-layout-sider-trigger {
	bottom: unset!important;
}

.ant-tree-title{
	color: white!important;
}
</style>
