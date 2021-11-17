<template>
  <div>
    <a-layout-header>
      <div class="header">
        <span>无人机影像智能决策支持系统</span>
      </div>
    </a-layout-header>
    <uas-side-bar></uas-side-bar>
    <uas-map></uas-map>
    <sen-data></sen-data>
    <!-- 底部信息 -->
    <a-layout-footer>
      <div class="footer">
        <p>© 武汉大学测绘学院 版权所有</p>
      </div>
    </a-layout-footer>
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
/*标题文字*/
.ant-layout-header {
  background-color: #585eaa;
  color: #fff;
  font-size: 30px;
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
</style>