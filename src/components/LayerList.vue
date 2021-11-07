<template>
<!--			<a-button type="primary" @click="changeShow" style="position: absolute;top: 0px;" ref="toolbar">要素展示</a-button>-->
<!--			<a-button @click="flyToArea" style="position: absolute;top: 0px;left: 250px">实验区</a-button>-->

		<transition :appear="true">
			<div v-show="isShow" class="layer-list">
				<LayerItem v-for="(layerInfo,index) in layerInfos" :layerInfo="layerInfo" @layerShow="layerShow" :id="index"></LayerItem>
			</div>
		</transition>
<!--  </div>-->
</template>

<script setup>
  import { defineProps,defineEmits } from "vue";
  import LayerItem from "./LayerItem.vue";
	import * as Vue from 'vue';

  let isShow = new Vue.ref(false);
  const changeShow = ()=>{
  	isShow.value = !isShow.value;
	}


  const props = defineProps(['layerInfos']);

  const emit = defineEmits();
  const layerShow = (id)=>{
    emit("layerShow",id);
  };

  const flyToArea = (id)=>{
    emit("flyToArea",id);
  };


	const toolbar = Vue.ref(null);
	defineExpose({
		isShow
	})

</script>

<style scoped>
  .layer-list{
		color: #eee;
		background: rgba(42, 42, 42, 0.8);
		padding: 4px;
		border-radius: 4px;
		margin: 5px;
		position: absolute;
		top: 40px;
		right: 0px;
  }

	/*进入的起点*/
	.v-enter{

	}
	/*进入的终点*/
	.v-enter-to{

	}

	/*进入的起点*/
	.v-leave{

	}
	/*进入的终点*/
	.v-leave-to{

	}



</style>