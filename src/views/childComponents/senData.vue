<template>
  <div>
    <div class="senShow" @click="showSensorData">
      <el-icon class="menuStyle"><icon-menu /></el-icon>
    </div>
    <div class="senTable" v-show="showData">
      <el-descriptions class="margin-top" :column="3" :size="size" border>
        <el-descriptions-item>
          <template #label>
            <el-icon><user /></el-icon>
            Altitude
          </template>
          38.00
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <el-icon><iphone /></el-icon>
            Temperature
          </template>
          25.51
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <el-icon><office-building /></el-icon>
            Air Pressure
          </template>
          995.59
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <el-icon><tickets /></el-icon>
            Humidity
          </template>
          57.52
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <el-icon><location /></el-icon>

            Location
          </template>
          3031.6926N, 11421.3925E
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  User,
  Iphone,
  Location,
  Tickets,
  OfficeBuilding,
  Menu as IconMenu,
} from "@element-plus/icons";
// const size = "mini";
export default defineComponent({
  components: {
    IconMenu,
    User,
    Iphone,
    Location,
    Tickets,
    OfficeBuilding,
  },
  name: "senData",
  data() {
    return {
      size: "mini",
      showData: "True",
    };
  },
  methods: {
    showSensorData() {
      this.showData = !this.showData;
    },
  },
});
</script>

<style scoped>
.senShow {
  position: absolute;
  top: 75px;
  right: 100px;
  background-color: rgba(194, 204, 204, 0.5);
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: auto;
  cursor: pointer;
}
.menuStyle {
  margin-top: 10px;
  margin-left: 10px;
  text-align: center;
  font-size: 30px;
  color: white;
}
.senTable {
  position: absolute;
  top: 140px;
  right: 350px;
  width: 100px;
  height: 100px;
}
::v-deep .el-descriptions__content {
  background-color: white;
  color: steelblue;
}
</style>