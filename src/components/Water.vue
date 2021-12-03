<template>

	<div style="height: 100%">
		<a-layout>
			<!--侧边导航栏-->
			<a-layout-sider collapsible="true" defaultCollapsed="true">
				<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
					<a-menu-item key="11" @click="handleClick">
						<EyeOutlined />
						<span>要素展示</span>
					</a-menu-item>

					<a-menu-item key="22" @click="changeSetting">
						<SettingOutlined />
						<span>参数调整</span>
					</a-menu-item>

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
			<a-layout class="things">
					<div style="height:100%">

				<!-- 路由占位符 -->
				<router-view v-slot="{ Component }">
<!--					<router-view>-->
					<transition>
						<keep-alive :exclude="['three']">
							<component :is="Component" />
						</keep-alive>
					</transition>
				</router-view>

<!--						<embed src="src/assets/2020-2021年度技术报告 - 赣南山区找水技术成果报告.pdf" width="100%" height="100%"/>-->
					</div>



			</a-layout>


		</a-layout>
	</div>

</template>

<script>
import { EyeOutlined , SettingOutlined, EnvironmentOutlined } from '@ant-design/icons-vue';
import {defineComponent} from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	setup(){
		const routers = useRouter();
		const handleClick = () => {
			routers.push("/water/ganNan");
		};
		return {
			// mainKeys,
			// username,
			// avatarUrl,
			// subKeys,
			handleClick,
			// goToUser,
			// exit,
		};
	},
	components: {
		EyeOutlined,
		SettingOutlined,
		EnvironmentOutlined
	},
	data() {
		return {
		};
	},

});
</script>

<style>
.ant-layout.ant-layout-has-sider {
	height: 100%;
}
</style>
