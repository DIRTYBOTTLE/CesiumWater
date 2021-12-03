<template>
	<el-row class="tac">
		<el-col :span="12">
			<el-menu
					default-active="2"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
			>
				<el-sub-menu index="1">
					<template #title>
						<el-icon><icon-menu /></el-icon>

						<span> 影像数据 </span>
					</template>
					<el-menu-item-group title="影像组1">
						<el-menu-item index="1-1">影像数据1</el-menu-item>
						<el-menu-item index="1-2">影像数据2</el-menu-item>
					</el-menu-item-group>
					<el-menu-item-group title="影像组2">
						<el-menu-item index="1-3">影像数据3</el-menu-item>
					</el-menu-item-group>
					<el-sub-menu index="1-4">
						<template #title>影像数据4</template>
						<el-menu-item index="1-4-1">拼接影像</el-menu-item>
					</el-sub-menu>
				</el-sub-menu>
				<el-menu-item index="2">
					<el-icon><location /></el-icon>
					<span> 无人机定位 </span>
				</el-menu-item>
				<el-menu-item index="3" disabled>
					<el-icon><document /></el-icon>
					<span> 传感器数据 </span>
				</el-menu-item>
				<el-menu-item index="4">
					<el-icon><setting /></el-icon>
					<span> 设置 </span>
				</el-menu-item>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
	Location,
	Document,
	Menu as IconMenu,
	Setting,
} from "@element-plus/icons";

export default defineComponent({
	components: {
		Location,
		Document,
		Setting,
		IconMenu,
	},
	setup() {
		const handleOpen = (key, keyPath) => {
			console.log(key, keyPath);
		};
		const handleClose = (key, keyPath) => {
			console.log(key, keyPath);
		};
		return {
			handleOpen,
			handleClose,
		};
	},
});
</script>

<style scoped>
.tac {
	position: absolute;
	height: 100%;
	width: 400px;
}
.el-menu-vertical-demo {
	height: 100%;
}
</style>
