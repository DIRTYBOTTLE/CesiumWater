<template>
<div></div>
<!--	<div id="container">-->
<!--		<transition :appear="true">-->
<!--		<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">-->
<!--			<el-sub-menu index="1">-->
<!--				<template #title>-->
<!--					<i class="el-icon-location"></i>-->
<!--					<span>基础信息子系统</span>-->
<!--				</template>-->
<!--				<el-menu-item-group title="Group One">-->
<!--					<el-menu-item index="1-1">item one</el-menu-item>-->
<!--					<el-menu-item index="1-2">item one</el-menu-item>-->
<!--				</el-menu-item-group>-->
<!--				<el-menu-item-group title="Group Two">-->
<!--					<el-menu-item index="1-3">item three</el-menu-item>-->
<!--				</el-menu-item-group>-->
<!--				<el-sub-menu index="1-4">-->
<!--					<template #title>item four</template>-->
<!--					<el-menu-item index="1-4-1">item one</el-menu-item>-->
<!--				</el-sub-menu>-->
<!--			</el-sub-menu>-->

<!--			<el-menu-item index="2">-->
<!--				<i class="el-icon-menu"></i>-->
<!--				<span>水源信息子系统</span>-->
<!--			</el-menu-item>-->

<!--			<el-menu-item index="3" disabled>-->
<!--				<i class="el-icon-document"></i>-->
<!--				<span>灾害信息子系统</span>-->
<!--			</el-menu-item>-->

<!--			<el-menu-item index="4">-->
<!--				<i class="el-icon-setting"></i>-->
<!--				<span>应急决策子系统</span>-->
<!--			</el-menu-item>-->

<!--		</el-menu>-->
<!--		</transition>-->

<!--	</div>-->





<!--	<div style="position: relative;height: 100%">-->
<!--		<div class="cesium-container" ref="mapRef" style="height: 100%"/>-->
<!--		<LayerList :layerInfos="layerInfos" @layerShow="layerShow" @flyToArea="flyToArea"></LayerList>-->
<!--		<LayerSetting ref="layerSetting"></LayerSetting>-->
<!--	</div>-->


</template>

<script setup>
import * as Cesium from 'cesium';
import * as Vue from 'vue';
import {getWFS} from '../js/CeisiumFuns'
import LayerList from "./LayerList.vue";
import LayerSetting from "./LayerSetting.vue";

const layerInfos = [
  {workSpace:'water',layerName:'WaterSurface',reference:true,checkName:'地表水源',icon:"地表水源",loaded:false},
  {workSpace:'water',layerName:'WaterUnder',reference:true,checkName:'地下水源',icon:"地下水源",loaded: false},
  {workSpace:'water',layerName:'Spring',reference:true,checkName:'泉',icon:"泉",loaded: false},
  {workSpace:'water',layerName:'Well',reference:true,checkName:'井',icon:"井",loaded: false},
  {workSpace:'water',layerName:'Drill',reference:true,checkName:'钻井',icon:"钻井",loaded: false},
  {workSpace:'water',layerName:'WaterLine',reference:false,checkName:'水系',icon:"",loaded: false},
  {workSpace:'map',layerName:'hjb',reference:true,checkName:'黄家坝',icon:"黄家坝",loaded: false},
];

let viewer;

const layerShow = (id)=>{
  if(!layerInfos[id].loaded){
    getWFS(viewer,layerInfos[id]);
    layerInfos[id].loaded = true;
    return
  }
  if(layerInfos[id].loaded){
    viewer.dataSources.getByName(layerInfos[id].checkName)[0].show = !viewer.dataSources.getByName(layerInfos[id].checkName)[0].show;
  }
}

const flyToArea = () =>{
  viewer.camera.flyTo({
    destination : new Cesium.Cartesian3(-1359527.881887964, 5251080.84182769, 3347486.3154035173),
    orientation: {
      heading : 0.6321958327174828,
      pitch : -0.29359391259896683,
      //   roll : 0.0                             // default value
    }
  });
}

const mapRef = Vue.ref(null);
const layerSetting = Vue.ref(null);

// Vue.onMounted(() => {
//
//   viewer = new Cesium.Viewer(mapRef.value,{
//     //baseLayerPicker:true,//右上角图层选择器,默认true
//     //imageryProvider:,//底图设置，仅当baseLayerPicker为false时生效，默认为createWorldImagery()
//     terrainProvider: Cesium.createWorldTerrain({
//       requestWaterMask: true,
//       requestVertexNormals: true,
//     }),//地形设置，默认为new EllipsoidTerrainProvider()
//     animation:false,//左下角控制动画
//     // fullscreenButton:false,
//     // geocoder:false,//右上角搜索
//     // homeButton:false,
//     // infoBox:false,
//     // scene3DOnly:false,//仅仅显示3d,可隐藏右上角2d和3d按钮
//     // selectionIndicator:false,
//     timeline:false,//最下面时间轴
//     // navigationHelpButton:false,//右上角帮助按钮
//     // navigationInstructionsInitiallyVisible:false,
//     // //useDefaultRenderLoop:false,
//     // showRenderLoopErrors:false,
//     // projectionPicker:false,//投影选择器
//   });
// 	viewer.baseLayerPicker.viewModel.selectedImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[3];
//   //viewer.scene.globe.depthTestAgainstTerrain = true;
//   // viewer.camera.setView({
//   //   destination : Cesium.Cartesian3.fromDegrees(104.54, 31.87, 1000.0),
//   //   orientation: {
//   //   //   heading : Cesium.Math.toRadians(90.0), // default 0.0 (北)
//   //   itch : Cesium.Math.toRadians(-90),    // default 0 (俯视)
//   //   //   roll : 0.0                             // default value
//   //   }
//   // });
//
// 	const imageLayers =  viewer.imageryLayers;
// 	const viewModel ={
// 		brightness: 0,
// 		contrast: 0,
// 		hue: 0,
// 		saturation: 0,
// 		gamma: 0,
// 		alpha:1
// 	}
// 	Cesium.knockout.track(viewModel);
// 	const toolbar = layerSetting.value.toolbar;
// 	Cesium.knockout.applyBindings(viewModel,toolbar);
//
// 	function subscribeLayerParameter(name){
// 		Cesium.knockout.getObservable(viewModel,name).subscribe(
// 				function (newValue){
// 					if (imageLayers.length>0){
// 						const layer = imageLayers.get(0);
// 						layer[name] = newValue;
// 					}
// 				}
// 		);
// 	}
// 	subscribeLayerParameter('brightness');
// 	subscribeLayerParameter('contrast');
// 	subscribeLayerParameter('hue');
// 	subscribeLayerParameter('saturation');
// 	subscribeLayerParameter('gamma');
// 	subscribeLayerParameter('alpha');
//
// 	function updateViewModel() {
// 		if (imageLayers.length > 0) {
// 			const layer = imageLayers.get(0);
// 			viewModel.brightness = layer.brightness;
// 			viewModel.contrast = layer.contrast;
// 			viewModel.hue = layer.hue;
// 			viewModel.saturation = layer.saturation;
// 			viewModel.gamma = layer.gamma;
// 		}
// 	}
// 	imageLayers.layerAdded.addEventListener(updateViewModel);
// 	imageLayers.layerRemoved.addEventListener(updateViewModel);
// 	imageLayers.layerMoved.addEventListener(updateViewModel);
// 	updateViewModel();
//
//
//
//
//   const city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({url:Cesium.IonResource.fromAssetId(3839)}));
//   // const transparentStyle = new Cesium.Cesium3DTileStyle({
//   //   color:"color('white',0.3)",
//   //   show:true
//   // });
//   // city.style = transparentStyle;
//
//
//   //getWFS(viewer,layerInfos[0]);
//
//
//   const heightStyle = new Cesium.Cesium3DTileStyle({
//     color:{
//       conditions:[
//         ["${height} >= 300","rgba(45,0,75,0.5)"],
//         ["${height} >= 200","rgb(102,71,151)"],
//         ["${height} >= 100","rgb(170,162,204)"],
//         ["${height} >= 50","rgb(224,226,238)"],
//         ["${height} >= 25","rgb(252,230,200)"],
//         ["${height} >= 10","rgb(248,176,87)"],
//         ["${height} >= 5","rgb(198,106,11)"],
//         ["true","rgb(127,59,8)"],
//       ]
//     }
//   });
//
//
// 	window.viewer = viewer;
//   city.style=heightStyle;
//
//   // console.log(viewer.baseLayerPicker.viewModel);
//
//   viewer.cesiumWidget.creditContainer.style.display = "none";
//   // viewer.camera.setView({
//   //   destination : new Cesium.Cartesian3(-1359527.881887964, 5251080.84182769, 3347486.3154035173),
//   //   orientation: {
//   //     heading : 0.6321958327174828,
//   //     pitch : -0.29359391259896683,
//   //     //   roll : 0.0                             // default value
//   //   }
//   // });
//   // viewer.camera.heading
//   // 0.6321958327174828
//   // viewer.camera.pitch
//   // -0.29359391259896683
//   // viewer.camera.position
//   // Cartesian3 {x: -1359527.881887964, y: 5251080.84182769, z: 3347486.3154035173}
// });
</script>

<style scoped>
/*#container{*/
/*	display: grid;*/
/*	grid-template-columns: 200px auto;*/
/*	height: 100%;*/
/*	width: 100%;*/
/*}*/

/*.cesium-container {*/
/*	!*height: calc(100 * 1px);*!*/
/*	!*height: 100vh;*!*/
/*	!*height: 100%;*!*/
/*}*/


/*.el-menu-vertical-demo:not(.el-menu--collapse) {*/
/*	width: 200px;*/
/*	!*min-height: 400px;*!*/
/*	position: relative;*/
/*	top: 0px;*/
/*	height: 100%;*/
/*	!*z-index: 1;*!*/
/*}*/
</style>
