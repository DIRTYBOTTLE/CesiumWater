import { createApp } from "vue";
import App from "./App.vue";
import route from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//import ElementUI from "element-ui";
//import "element-ui/lib/theme-chalk/index.css";
//Vue.use(ElementUI);
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

const app = createApp(App);
app.use(ElementPlus);
app.use(route);
app.mount("#app");
