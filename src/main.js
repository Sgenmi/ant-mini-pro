import "ant-design-vue/dist/antd.less";
import '@ant-design-vue/pro-layout/dist/style.less';

import { createApp } from 'vue'
import App from './App.vue';
import Router from './router';
import Store from "./store";
import Antd from 'ant-design-vue';
import * as antIcons from '@ant-design/icons-vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';

const app = createApp(App);
app.use(Router);
app.use(Antd);
app.use(Store);
app.use(ProLayout);
app.use(PageContainer);
app.mount('#app');

Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
});
app.config.globalProperties.$antIcons = antIcons;

export default app
