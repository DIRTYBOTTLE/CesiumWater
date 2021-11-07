<template>
	<div style="height: 100%">
		<a-layout>
<!--			<a-layout-sider v-model:collapsed="collapsed" collapsedWidth="0" collapsible="false" defaultCollapsed>-->
				<a-layout-sider collapsible="true" defaultCollapsed="true">
<!--				<div class="logo" />-->
				<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">

					<a-menu-item key="1" @click="changeShow">
						<file-outlined />
						<span>要素展示</span>
					</a-menu-item>

					<a-menu-item key="2" @click="changeSetting">
						<desktop-outlined />
						<span>参数调整</span>
					</a-menu-item>

					<a-menu-item key="3" @click="flyToArea">
						<pie-chart-outlined />
						<span>示范区</span>
					</a-menu-item>
<!--					<a-sub-menu key="sub1">-->
<!--						<template #title>-->
<!--            <span>-->
<!--              <user-outlined />-->
<!--              <span>User</span>-->
<!--            </span>-->
<!--						</template>-->
<!--						<a-menu-item key="3">Tom</a-menu-item>-->
<!--						<a-menu-item key="4">Bill</a-menu-item>-->
<!--						<a-menu-item key="5">Alex</a-menu-item>-->
<!--					</a-sub-menu>-->

<!--					<a-sub-menu key="sub2">-->
<!--						<template #title>-->
<!--            <span>-->
<!--              <team-outlined />-->
<!--              <span>Team</span>-->
<!--            </span>-->
<!--						</template>-->
<!--						<a-menu-item key="6">Team 1</a-menu-item>-->
<!--						<a-menu-item key="8">Team 2</a-menu-item>-->
<!--					</a-sub-menu>-->

<!--					<a-menu-item key="9">-->
<!--						<file-outlined />-->
<!--						<span>File</span>-->
<!--					</a-menu-item>-->

				</a-menu>
			</a-layout-sider>

			<a-layout>
				<div style="position: relative;height: 100%">
					<div class="cesium-container" ref="mapRef" style="height: 100%"/>
					<LayerList :layerInfos="layerInfos" @layerShow="layerShow" @flyToArea="flyToArea" ref="layerList"></LayerList>
					<LayerSetting ref="layerSetting"></LayerSetting>
				</div>
<!--				<a-layout-header style="background: #fff; padding: 0" />-->
<!--				<a-layout-content style="margin: 0 16px">-->
<!--					<a-breadcrumb style="margin: 16px 0">-->
<!--						<a-breadcrumb-item>User</a-breadcrumb-item>-->
<!--						<a-breadcrumb-item>Bill</a-breadcrumb-item>-->
<!--					</a-breadcrumb>-->
<!--					<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">-->
<!--						Bill is a cat.-->
<!--					</div>-->
<!--				</a-layout-content>-->
<!--				<a-layout-footer style="text-align: center">-->
<!--					Ant Design ©2018 Created by Ant UED-->
<!--				</a-layout-footer>-->
			</a-layout>
		</a-layout>
	</div>
</template>

<script>
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
	components: {
		PieChartOutlined,
		DesktopOutlined,
		UserOutlined,
		TeamOutlined,
		FileOutlined,
	},

	data() {
		return {
			collapsed: ref(false),
			selectedKeys: ref(['1']),
		};
	},

});
</script>

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
const layerList = Vue.ref(null);

const changeShow = ()=>{
	layerList.value.isShow=!layerList.value.isShow
};

const changeSetting = ()=>{
	layerSetting.value.isShow=!layerSetting.value.isShow
}

Vue.onMounted(() => {

  viewer = new Cesium.Viewer(mapRef.value,{
    //baseLayerPicker:true,//右上角图层选择器,默认true
    //imageryProvider:,//底图设置，仅当baseLayerPicker为false时生效，默认为createWorldImagery()
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true,
    }),//地形设置，默认为new EllipsoidTerrainProvider()
    animation:false,//左下角控制动画
    // fullscreenButton:false,
    // geocoder:false,//右上角搜索
    // homeButton:false,
    // infoBox:false,
    // scene3DOnly:false,//仅仅显示3d,可隐藏右上角2d和3d按钮
    // selectionIndicator:false,
    timeline:false,//最下面时间轴
    // navigationHelpButton:false,//右上角帮助按钮
    // navigationInstructionsInitiallyVisible:false,
    // //useDefaultRenderLoop:false,
    // showRenderLoopErrors:false,
    // projectionPicker:false,//投影选择器
  });
	viewer.baseLayerPicker.viewModel.selectedImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[3];
  //viewer.scene.globe.depthTestAgainstTerrain = true;
  // viewer.camera.setView({
  //   destination : Cesium.Cartesian3.fromDegrees(104.54, 31.87, 1000.0),
  //   orientation: {
  //   //   heading : Cesium.Math.toRadians(90.0), // default 0.0 (北)
  //   itch : Cesium.Math.toRadians(-90),    // default 0 (俯视)
  //   //   roll : 0.0                             // default value
  //   }
  // });

	const imageLayers =  viewer.imageryLayers;
	const viewModel ={
		brightness: 0,
		contrast: 0,
		hue: 0,
		saturation: 0,
		gamma: 0,
		alpha:1
	}
	Cesium.knockout.track(viewModel);
	const toolbar = layerSetting.value.toolbar;
	Cesium.knockout.applyBindings(viewModel,toolbar);

	function subscribeLayerParameter(name){
		Cesium.knockout.getObservable(viewModel,name).subscribe(
				function (newValue){
					if (imageLayers.length>0){
						const layer = imageLayers.get(0);
						layer[name] = newValue;
					}
				}
		);
	}
	subscribeLayerParameter('brightness');
	subscribeLayerParameter('contrast');
	subscribeLayerParameter('hue');
	subscribeLayerParameter('saturation');
	subscribeLayerParameter('gamma');
	subscribeLayerParameter('alpha');

	function updateViewModel() {
		if (imageLayers.length > 0) {
			const layer = imageLayers.get(0);
			viewModel.brightness = layer.brightness;
			viewModel.contrast = layer.contrast;
			viewModel.hue = layer.hue;
			viewModel.saturation = layer.saturation;
			viewModel.gamma = layer.gamma;
		}
	}
	imageLayers.layerAdded.addEventListener(updateViewModel);
	imageLayers.layerRemoved.addEventListener(updateViewModel);
	imageLayers.layerMoved.addEventListener(updateViewModel);
	updateViewModel();




  const city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({url:Cesium.IonResource.fromAssetId(3839)}));
  // const transparentStyle = new Cesium.Cesium3DTileStyle({
  //   color:"color('white',0.3)",
  //   show:true
  // });
  // city.style = transparentStyle;


  //getWFS(viewer,layerInfos[0]);


  const heightStyle = new Cesium.Cesium3DTileStyle({
    color:{
      conditions:[
        ["${height} >= 300","rgba(45,0,75,0.5)"],
        ["${height} >= 200","rgb(102,71,151)"],
        ["${height} >= 100","rgb(170,162,204)"],
        ["${height} >= 50","rgb(224,226,238)"],
        ["${height} >= 25","rgb(252,230,200)"],
        ["${height} >= 10","rgb(248,176,87)"],
        ["${height} >= 5","rgb(198,106,11)"],
        ["true","rgb(127,59,8)"],
      ]
    }
  });


	window.viewer = viewer;
  city.style=heightStyle;

  // console.log(viewer.baseLayerPicker.viewModel);

  viewer.cesiumWidget.creditContainer.style.display = "none";
  // viewer.camera.setView({
  //   destination : new Cesium.Cartesian3(-1359527.881887964, 5251080.84182769, 3347486.3154035173),
  //   orientation: {
  //     heading : 0.6321958327174828,
  //     pitch : -0.29359391259896683,
  //     //   roll : 0.0                             // default value
  //   }
  // });
  // viewer.camera.heading
  // 0.6321958327174828
  // viewer.camera.pitch
  // -0.29359391259896683
  // viewer.camera.position
  // Cartesian3 {x: -1359527.881887964, y: 5251080.84182769, z: 3347486.3154035173}

	// const changeShow = ()=>{
	// 	console.log(layerList.value.toolbar);
	// }

});

</script>

<style scoped>
#components-layout-demo-side .logo {
	height: 32px;
	margin: 16px;
	background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
	background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
	background: #141414;
}

.ant-layout-sider-trigger {
	background:#fff!important;
}
.ant-layout.ant-layout-has-sider {
	height: 100%;
}

</style>