<template>
  <div class="box">
		<a-layout>

			<!-- 标题区域 -->
			<a-layout-header>
				<div class="header">
					<span>应急水源智能决策支持系统</span>
				</div>
			</a-layout-header>

			<!-- 横向导航区域 -->
			<a-layout-content class="topBar">
				<a-menu
						class="topNavBar"
						mode="horizontal"
						theme="light"
						v-model:selectedKeys="mainKeys"
				>
					<a-menu-item
							:index="'/' + item.path"
							v-for="(item, index) in naviList"
							:key="index"
							@click="handleClick(item)"
					>{{ item.name }}</a-menu-item>

				</a-menu>
			</a-layout-content>

			<!-- 内容区域 -->
			<a-layout-content class="things">

				<!-- 路由占位符 -->
				<router-view v-slot="{ Component }">
					<transition>
						<keep-alive :exclude="[]">
							<component :is="Component" />
						</keep-alive>
					</transition>
				</router-view>
			</a-layout-content>

			<!-- 底部信息 -->
			<a-layout-footer>
				<div class="footer">
					<p>© 武汉大学测绘学院 版权所有</p>
				</div>
			</a-layout-footer>

		</a-layout>
		</div>

</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
// import Cookies from "js-cookie";
//
export default defineComponent({
	setup() {
		const router = useRouter();
// 		const store = useStore();
// 		const mainKeys = ref(["0"]);
// 		const username = Cookies.get("username");
// 		const avatarUrl = "/src/assets/avatar.png";
//
// 		const subKeys = [];
		const naviList = [
			{ name: "三维实景", path: "cesium" },
			{ name: "水源管理", path: "water" },
			{ name: "无人机现场感知", path: "uas" },
			{ name: "地质气象", path: "geodata" },
			{ name: "灾害信息", path: "service" },
			{ name: "危险源", path: "application" },
			{ name: "安全规划", path: "cadviewer" },
			{ name: "应急决策", path: "test" },
			// { name: "个人中心", path: "user" },
		];
//
		const handleClick = (item) => {
			router.push("/" + item.path);
		};
//
// 		const goToUser = () => {
// 			router.push("/home/user");
// 			mainKeys.value = naviList.findIndex((item) => {
// 				return item.path === "user";
// 			});
// 		};
//
// 		const exit = () => {
// 			store.state.data = [];
// 			Cookies.remove("username");
// 			Cookies.remove("usertype");
// 			router.push("login");
// 		};
//
		return {
			// mainKeys,
			// username,
			// avatarUrl,
			// subKeys,
			naviList,
			handleClick,
			// goToUser,
			// exit,
		};
	},
});
</script>

<style scoped>
.box {
  height: 100%;
}

/*标题文字*/
.ant-layout-header {
	background-color: #585eaa;
	color: #fff;
	font-size: 30px;
}

/*横向菜单栏*/
.topBar {
	height: 48px
	/*width: 100%;*/
	/*line-height: 46px !important;*/
}
.things {
	/*height: 48px*/
	/*width: 100%;*/
	/*line-height: 46px !important;*/
	position: absolute;
	top: 112px;
	bottom: 24px;
	width: 100%;
}

.ant-layout-footer {
	height: 24px;
	background: #585eaa;
	color: #fff;
	bottom: 0px;
	width: 100%;
	position: absolute;
	padding: 0;
}





/*.topNavBar :deep(.ant-menu) {*/
/*  height: 100%;*/
/*  width: 100%;*/
/*	!*line-height: 46px !important;*!*/
/*}*/

/*.topNavBar :deep(.ant-menu-item) {*/
/*  width: 10%;*/
/*  text-align: center;*/
/*  font-size: 16px;*/
/*  font-weight: bold;*/
/*	line-height: 46px !important;*/
/*}*/

/* 底部信息 */
/*.footer {*/
/*  !*margin-top: 20px;*!*/
/*  height: 40px;*/
/*  background-color: #333333;*/
/*  color: #fff;*/
/*  line-height: 50px;*/
/*  padding: 0 30px;*/
/*}*/

</style>
