<template>
<!--	<a-button @click="changeShow" style="position: absolute;top: 0px;left: 120px">参数调整</a-button>-->
	<transition :appear="true">
	<div class="layer-setting" ref="toolbar" v-show="isShow">
		<table>
			<SettingItem setting="亮度" max="3" dataBind="value: brightness, valueUpdate: 'input'"></SettingItem>
			<SettingItem setting="对比度" max="3" dataBind="value: contrast, valueUpdate: 'input'"></SettingItem>
			<SettingItem setting="色彩度" max="3" dataBind="value: hue, valueUpdate: 'input'"></SettingItem>
			<SettingItem setting="饱和度" max="3" dataBind="value: saturation, valueUpdate: 'input'"></SettingItem>
			<SettingItem setting="反差系数" max="3" dataBind="value: gamma, valueUpdate: 'input'"></SettingItem>
			<SettingItem setting="透明度" max="1" dataBind="value: alpha, valueUpdate: 'input'"></SettingItem>
<!--			<tr>-->
<!--				<td>Brightness</td>-->
<!--				<td>-->
<!--					<input type="range" min="0" max="3" step="0.02" data-bind="value: brightness, valueUpdate: 'input'">-->
<!--					<input type="text" size="5" data-bind="value: brightness">-->
<!--				</td>-->
<!--			</tr>-->

<!--			<tr>-->
<!--				<td>Contrast</td>-->
<!--				<td>-->
<!--					<input type="range" min="0" max="3" step="0.02" data-bind="value: contrast, valueUpdate: 'input'">-->
<!--					<input type="text" size="5" data-bind="value: contrast">-->
<!--				</td>-->
<!--			</tr>-->

<!--			<tr>-->
<!--				<td>Hue</td>-->
<!--				<td>-->
<!--					<input type="range" min="0" max="3" step="0.02" data-bind="value: hue, valueUpdate: 'input'">-->
<!--					<input type="text" size="5" data-bind="value: hue">-->
<!--				</td>-->
<!--			</tr>-->

<!--			<tr>-->
<!--				<td>Saturation</td>-->
<!--				<td>-->
<!--					<input type="range" min="0" max="3" step="0.02" data-bind="value: saturation, valueUpdate: 'input'">-->
<!--					<input type="text" size="5" data-bind="value: saturation">-->
<!--				</td>-->
<!--			</tr>-->

<!--			<tr>-->
<!--				<td>Gamma</td>-->
<!--				<td>-->
<!--					<input type="range" min="0" max="3" step="0.02" data-bind="value: gamma, valueUpdate: 'input'">-->
<!--					<input type="text" size="5" data-bind="value: gamma">-->
<!--				</td>-->
<!--			</tr>-->

<!--			<tr>-->
<!--				<td>Alpha</td>-->
<!--				<td>-->
<!--					<input type="range" min="0" max="1" step="0.02" data-bind="value: alpha, valueUpdate: 'input'">-->
<!--					<input type="text" size="1" data-bind="value: alpha">-->
<!--				</td>-->
<!--			</tr>-->

		</table>
	</div>
	</transition>
</template>

<script setup>
import SettingItem from "./SettingItem.vue";
import * as Vue from 'vue';

let isShow = new Vue.ref(false);
const changeShow = ()=>{
	isShow.value = !isShow.value;
}

const toolbar = Vue.ref(null);
defineExpose({
	toolbar,
	isShow
})

</script>

<style scoped>
.layer-setting{
	color: #eee;
	background: rgba(42, 42, 42, 0.8);
	padding: 4px;
	border-radius: 4px;
	margin: 5px;
	position: absolute;
	top: 0px;
	/*right: 0px;*/
}
</style>