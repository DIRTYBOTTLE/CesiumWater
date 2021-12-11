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

<!--					<a-sub-menu key="sub1">-->
<!--						<template #title>-->
<!--							<span>-->
<!--              	<EnvironmentOutlined />-->
<!--              	<span>示范区</span>-->
<!--            	</span>-->
<!--						</template>-->
<!--						<a-menu-item key="33" @click="flyToArea">绵阳示范区</a-menu-item>-->
<!--						<a-menu-item key="44">于都示范区</a-menu-item>-->

<!--					</a-sub-menu>-->

					<a-sub-menu key="sub2">
						<template #title>
							<span>
              	<EnvironmentOutlined />
              	<span>示范区</span>
            	</span>
						</template>
						<a-menu-item key="542" @click="flyToArea">绵阳示范区</a-menu-item>
						<a-sub-menu key="sub3" title="于都示范区">
							<a-menu-item key="754" @click="flyTo(115.539675,25.997803)">塘贯村</a-menu-item>
							<a-menu-item key="854" @click="flyTo(115.199193,25.920731)">峡山小学</a-menu-item>
							<a-menu-item key="894" @click="flyTo(115.194169,25.946653)">峡山村</a-menu-item>
							<a-menu-item key="834" @click="flyTo(115.320556,25.763056)">长源村</a-menu-item>
							<a-menu-item key="851" @click="flyTo(115.496744,25.946822)">潭头社区</a-menu-item>
						</a-sub-menu>
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
import {getWFS,flyToArea,layerShow1,flyTo} from '../js/CeisiumFuns'
import LayerSetting from "./LayerSetting.vue";
import diBiaoShuiYuanUrl from '../assets/地表水.png'
import quanUrl from '../assets/泉.png'
import jingUrl from '../assets/井.png'
import zuanJingUrl from '../assets/钻井.png'
/**********图层信息**********/
const layerInfos = [
	{workSpace:'water',layerName:'WaterSurface',reference:true,checkName:'地表水源',icon:"地表水源",loaded:false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: diBiaoShuiYuanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
	{workSpace:'water',layerName:'diXiaShuiLeiXin',reference:false,checkName:'地下水类型',icon:"地表水源",loaded:false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: diBiaoShuiYuanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
	{workSpace:'water',layerName:'kuJiCeLiuDian',reference:true,checkName:'枯季测流点',icon:"地表水源",loaded:false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: diBiaoShuiYuanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
	{workSpace:'water',layerName:'shuiXi',reference:false,checkName:'水系',icon:"地表水源",loaded:false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: diBiaoShuiYuanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},

	{workSpace:'well',layerName:'JiangXi',reference:true,checkName:'赣南示范井',icon:"地表水源",loaded: false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: quanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
		{workSpace:'well',layerName:'minJin',reference:true,checkName:'民井',icon:"地表水源",loaded: false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: jingUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
		{workSpace:'well',layerName:'tanCai',reference:true,checkName:'探采结合井',icon:"地表水源",loaded: false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: jingUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
		{workSpace:'well',layerName:'zuanKong',reference:true,checkName:'钻孔',icon:"地表水源",loaded: false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: zuanJingUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
	{workSpace:'well',layerName:'quan',reference:true,checkName:'泉',icon:"地表水源",loaded: false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: quanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},

	{workSpace:'buffer',layerName:'waterSurfaceBuffer',reference:false,checkName:'地表水源缓冲区',icon:"",loaded: false,
		options:{
			// heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			// verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			// clampToGround: false,
			// color: Cesium.Color.BLACK,
		}
	},
	{workSpace:'buffer',layerName:'JiangXiBuffer',reference:false,checkName:'赣南示范井缓冲区',icon:"",loaded: false,
		options:{
			// heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			// verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			// clampToGround: false,
			// color: Cesium.Color.BLACK,
		}
	},

	{workSpace:'shuiWen',layerName:'shuiWenDiZhiPouMianTu',reference:false,checkName:'水文地质剖面图',icon:"",loaded: false,
		options:{
		}
	},
	{workSpace:'shuiWen',layerName:'shuiWenDiZhiPouMianXian',reference:false,checkName:'水文地质剖面线',icon:"",loaded: false,
		options:{
		}
	},
	{workSpace:'shuiWen',layerName:'bengTa',reference:true,checkName:'崩塌',icon:"地表水源",loaded: false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: quanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
	{workSpace:'shuiWen',layerName:'duanLie',reference:true,checkName:'断裂',icon:"地表水源",loaded: false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: quanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
	{workSpace:'shuiWen',layerName:'diBiaoFenShuiLin',reference:false,checkName:'地表分水岭',icon:"",loaded: false,
		options:{
		}
	},
	{workSpace:'shuiWen',layerName:'qiXiangZhan',reference:true,checkName:'气象站',icon:"地表水源",loaded: false,
		options:{
			heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
			verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
			image: quanUrl,
			width: 20,
			height: 20,
			clampToGround: false}
	},
	// {workSpace:'water',layerName:'WaterUnder',reference:true,checkName:'地下水源',icon:"地下水源",loaded: false},
	// {workSpace:'geology',layerName:'GeologyYuDu',reference:false,checkName:'于都地质',icon:"",loaded: false},
	// {workSpace:'water',layerName:'Spring',reference:true,checkName:'泉',icon:"泉",loaded: false},
	// {workSpace:'water',layerName:'Well',reference:true,checkName:'井',icon:"井",loaded: false},
	// {workSpace:'water',layerName:'Drill',reference:true,checkName:'钻井',icon:"钻井",loaded: false},
	// {workSpace:'water',layerName:'WaterLine',reference:false,checkName:'水系',icon:"",loaded: false},
	// {workSpace:'map',layerName:'hjb',reference:true,checkName:'黄家坝',icon:"黄家坝",loaded: false},
];
/**********图层选择器信息**********/
const treeData = [
	{
		title: '水源',
		key: '-1',
		children: [{title: 'I 级地表水源', key: '0'},
			{title: '地下水类型', key: '1'},
			{title: '枯季测流点', key: '2'},
			{title: '水系', key: '3'}
		],
	},
	// {
	// 	title: '地下水源',
	// 	key: '-2',
	// 	children: [{title: 'I 级水源', key: '3'},
	// 		{title: 'II 级水源', key: '4'},
	// 		{title: 'III 级水源', key: '5'}],
	// },

	{
		title: '井位',
		key: '-3',
		children: [{title: '赣南示范井', key: '4'},
			{title: '民井', key: '5'},
			{title: '探采结合井', key: '6'},
			{title: '钻孔', key: '7'},
			{title: '泉', key: '8'}
		],
	},

	{
		title: '缓冲区分析',
		key: '-4',
		children: [{title: '地表水源', key: '9'},
			{title: '赣南示范井', key: '10'},
			// {title: 'III 级水源', key: '5'}
		],
	},

	{
		title: '水文地质',
		key: '-5',
		children: [{title: '水文地质剖面图', key: '11'},
			{title: '水文地质剖面线', key: '12'},
			{title: '崩塌', key: '13'},
			{title: '断裂', key: '14'},
			{title: '气象站', key: '15'},
			{title: '地表分水岭', key: '16'},
		],
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
	Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNDg2NzE0Yy1jNTQzLTQ4NWMtODI0My03OTg5NWZiYWY2YjUiLCJpZCI6NzU0MjYsImlhdCI6MTYzODU5NzkyOH0.nMc5nLbF-KZFbOCPyZeiDSHiX5tCDv8brYBZIElPfKs';
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
