<template>
	<div style="height: 100%">
		<a-layout>
			<!--侧边导航栏-->
			<a-layout-sider collapsible="true" defaultCollapsed="true">
				<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
					<a-menu-item key="11" @click="changeLayerCheck">
						<EyeOutlined />
						<span>要素展示</span>
					</a-menu-item>

					<a-menu-item key="22" @click="changeSetting">
						<SettingOutlined />
						<span>参数调整</span>
					</a-menu-item>

					<a-sub-menu key="sub1">
						<template #title>
							<span>
              	<EnvironmentOutlined />
              	<span>示范区</span>
            	</span>
						</template>
						<a-menu-item key="33" @click="flyToArea">绵阳示范区</a-menu-item>
						<a-menu-item key="44">于都示范区</a-menu-item>
					</a-sub-menu>
				</a-menu>
			</a-layout-sider>

      <!--内容展示区-->
			<a-layout>
				<div style="position:relative;height:100%">
					<div class="cesium-container" ref="mapRef" style="height: 100%"/>
					<LayerSetting ref="layerSetting"></LayerSetting>

					<a-tree
							v-model:selectedKeys="selectedKeys"
							checkable
							:tree-data="treeData"
							style="position: absolute;top: 0px;color: white"
							@check="layerShow"
							v-show="layerCheck"
					>
						<template #title="{ title, key } ">
							{{ title }}
						</template>
					</a-tree>

				</div>
			</a-layout>

		</a-layout>
	</div>
</template>

<script setup>
import * as Cesium from 'cesium';
import * as Vue from 'vue';
import {getWFS,flyToArea,layerShow1} from '../js/CeisiumFuns'
import LayerSetting from "./LayerSetting.vue";

/**********图层信息**********/
const layerInfos = [
	{workSpace:'water',layerName:'WaterSurface',reference:true,checkName:'地表水源',icon:"地表水源",loaded:false},
	{workSpace:'water',layerName:'WaterUnder',reference:true,checkName:'地下水源',icon:"地下水源",loaded: false},
	{workSpace:'geology',layerName:'GeologyYuDu',reference:false,checkName:'于都地质',icon:"",loaded: false},
	{workSpace:'water',layerName:'Spring',reference:true,checkName:'泉',icon:"泉",loaded: false},
	{workSpace:'water',layerName:'Well',reference:true,checkName:'井',icon:"井",loaded: false},
	{workSpace:'water',layerName:'Drill',reference:true,checkName:'钻井',icon:"钻井",loaded: false},
	{workSpace:'water',layerName:'WaterLine',reference:false,checkName:'水系',icon:"",loaded: false},
	{workSpace:'map',layerName:'hjb',reference:true,checkName:'黄家坝',icon:"黄家坝",loaded: false},
];
/**********图层选择器信息**********/
const treeData = [
	{
		title: '地表水源',
		key: '-1',
		children: [{title: 'I 级水源', key: '0'},
			{title: 'II 级水源', key: '1'},
			{title: 'III 级水源', key: '2'}],
	},
	{
		title: '地下水源',
		key: '-2',
		children: [{title: 'I 级水源', key: '3'},
			{title: 'II 级水源', key: '4'},
			{title: 'III 级水源', key: '5'}],
	},
];
/**********图层显示**********/
const layerShow = (checkedKeys,e)=>{
	if(e.node.eventKey=="-1"){
		for (let i = 0; i < 3; i++){
			layerShow1(layerInfos,i);
		}
		return;
	}
	if(e.node.eventKey=="-2"){
		for (let i = 3; i < 6; i++){
			layerShow1(layerInfos,i);
		}
		return;
	}
	layerShow1(layerInfos,e.node.eventKey);
}
/**********图层框显示**********/
let layerCheck = new Vue.ref(false);
const changeLayerCheck= ()=>{
	layerCheck.value=!layerCheck.value;
};
/**********设置框显示**********/
const layerSetting = Vue.ref(null);
const changeSetting = ()=>{
	layerSetting.value.isShow=!layerSetting.value.isShow
}


let viewer;
const mapRef = Vue.ref(null);
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

<script>
import { EyeOutlined , SettingOutlined, EnvironmentOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, watch } from 'vue';

// const treeData = [
// 		{
// 			title: '地表水源',
// 			key: '0-0',
// 			children: [{title: 'I 级水源', key: '0-0-0'},
// 				{title: 'II 级水源', key: '0-0-1'},
// 				{title: 'III 级水源', key: '0-0-2'}],
// 		},
// 		{
// 			title: '地下水源',
// 			key: '0-1',
// 			children: [{title: 'I 级水源', key: '0-1-0'},
// 				{title: 'II 级水源', key: '0-1-1'},
// 				{title: 'III 级水源', key: '0-1-2'}],
// 		},
// ];



// export default defineComponent({
// 	setup() {
//
// 		watch(expandedKeys, () => {
// 			console.log('expandedKeys', expandedKeys);
// 		});
// 		watch(selectedKeys, () => {
// 			console.log('selectedKeys', selectedKeys);
// 		});
// 		watch(checkedKeys, () => {
// 			console.log('checkedKeys', checkedKeys);
// 		});
// 		return {
// 			treeData,
// 			expandedKeys,
// 			selectedKeys,
// 			checkedKeys,
// 		};
// 	},
//
// });

export default defineComponent({
	components: {
		EyeOutlined,
		SettingOutlined,
		EnvironmentOutlined
	},

	// setup() {
	// 	const expandedKeys = ref(['0-0-0', '0-0-1']);
	// 	const selectedKeys = ref(['0-0-0', '0-0-1']);
	// 	const checkedKeys = ref(['0-0-0', '0-0-1']);
	// 	watch(expandedKeys, () => {
	// 		console.log('expandedKeys', expandedKeys);
	// 	});
	// 	watch(selectedKeys, () => {
	// 		console.log('selectedKeys', selectedKeys);
	// 	});
	// 	watch(checkedKeys, () => {
	// 		console.log('checkedKeys', checkedKeys);
	// 	});
	// 	return {
	// 		treeData,
	// 		expandedKeys,
	// 		selectedKeys,
	// 		checkedKeys,
	// 	};
	// },
//
	data() {
		return {
			collapsed: ref(false),
			selectedKeys: ref(['1']),
		};
	},

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
