<template>
	<div>
		<uas-side-bar></uas-side-bar>
		<uas-map></uas-map>
		<sen-data></sen-data>
	</div>
</template>

<script>
import uasSideBar from "./childComponents/sideBar.vue";
import uasMap from "./childComponents/uasMap.vue";
import senData from "./childComponents/senData.vue";
export default {
	name: "uasHome",
	components: { uasSideBar, uasMap, senData },

	data() {
		return {};
	},
};
</script>

<style scoped>
</style>
