<template>
  <pro-layout
    v-bind="state"
    v-model:openKeys="base.openKeys"
    v-model:collapsed="base.collapsed"
    v-model:selectedKeys="base.selectedKeys"
    :menuData="state.menuData"
  >
    <template #headerContentRender>
      <a-breadcrumb class="mini-admin-pro-breadcrumb">
        <a-breadcrumb-item v-for="i in breadcrumb" :key="i.path">
          {{ i.breadcrumbName }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>

    <template #rightContentRender>
      <div style="margin-right: 12px">
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <template #icon>
                  <SettingOutlined />
                </template>
                <span>个人设置</span>
              </a-menu-item>
              <a-menu-item>
                <template #icon>
                  <LogoutOutlined />
                </template>
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
          <span>
            <a-avatar shape="square" size="small">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <span style="color: #636363"> 3122</span>
          </span>
        </a-dropdown>
      </div>
    </template>
    <!-- custom breadcrumb itemRender  -->
<!--    <template #breadcrumbRender="{ route, params, routes }">-->
<!--      <span v-if="routes.indexOf(route) === routes.length - 1">-->
<!--        {{ route.breadcrumbName }}-->
<!--      </span>-->
<!--      <span v-else>-->
<!--        {{ route.breadcrumbName }}-->
<!--      </span>-->
<!--    </template>-->

    <!-- content begin -->
    <router-view v-slot="{ Component }">
      <div
        id="mini-admin-pro-menu-tabs"
        v-if="state.multiTab"
        :style="miniAdminProTabStyle"
      >
        <a-tabs
          size="small"
          v-model:activeKey="activeKey"
          hide-add
          type="editable-card"
          @edit="onEdit"
          @tabClick="tabClick"
          class="mini-admin-pro-menu-tabs-items"
        >
          <a-tab-pane
            v-for="(pane, key) in panes"
            :key="key"
            :closable="pane.closable"
          >
            <template #tab>
               {{pane.title}}
              <ReloadOutlined
                v-if="activeKey==key && false"
                :style="{fontSize:'10px',marginLeft:'5px',marginRight:'4px',color:'rgba(0, 0, 0, 0.45)'}"
                @click="tabReload(key)"
              />
            </template>
          </a-tab-pane>
        </a-tabs>
      </div>
      <WaterMark content="">
        <component :is="Component" />
      </WaterMark>
    </router-view>
  </pro-layout>
</template>

<script>
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watchEffect,
  toRefs,
} from "vue";
import {
  getMenuData,
  clearMenuItem,
  WaterMark,
} from "@ant-design-vue/pro-layout";
import { useRoute, useRouter } from "vue-router";
import config from "@/utils/config";

const locale = "";
export default defineComponent({
  components: {
    WaterMark,
  },
  setup() {
    const router = useRouter();
    const routes = router.getRoutes();
    const { menuData } = getMenuData(clearMenuItem(routes));
    const base = reactive({
      collapsed: false, // default value
      openKeys: [],
      selectedKeys: [],
    });
    const state = reactive({
      navTheme: config.navTheme,
      layout: config.layout,
      splitMenus: false,
      menuData,
      contentWidth: config.contentWidth,
      fixedHeader: config.fixedHeader,
      fixSiderbar: config.fixSiderbar,
      title: config.title,
      primaryColor: config.primaryColor,
      logo: config.logo,
      loading: config.loading,
      headerHeight: config.headerHeight,
      multiTab: config.multiTab,
      siderWidth: config.siderWidth,
    });

    //tabs
    const panes = ref({
      "/home": {
        title: "首页",
        key: "/",
        query: {},
        closable: false,
      },
    });
    const activeKey = ref("/home");

    let routeTpl;
    watchEffect(() => {
      routeTpl= router.currentRoute
      // console.log(router.currentRoute)
      if (router.currentRoute) {
        const matched = router.currentRoute.value.matched.concat();
        base.selectedKeys = matched
          .filter((r) => r.name !== "index")
          .map((r) => r.path);
        base.openKeys = matched
          .filter((r) => r.path !== router.currentRoute.value.path)
          .map((r) => r.path);

        // 开启tab时，增加tabs
        let meta = router.currentRoute.value.meta;
        if (!meta.hideInMenu && config.multiTab) {
          let _path = router.currentRoute.value.path;
          panes.value[_path] = {
            title: router.currentRoute.value.meta.title,
            key: router.currentRoute.value.path,
            query: router.currentRoute.value.query,
            closable: _path === "/home" || _path === "/" ? false : true, //首页tab不显示x号
          };
          activeKey.value = _path;
        }
      }
    });

    const breadcrumb = computed(() =>
      router.currentRoute.value.matched.concat().map((item) => {
        return {
          path: item.path,
          breadcrumbName: item.meta.title || "",
        };
      })
    );

    // tab事件
    const panesChage = reactive({
      onEdit: (targetKey) => {
        let panesTags = panes.value;
        if (targetKey != router.currentRoute.value.path) {
          delete panesTags[targetKey];
          return;
        }
        // if (targetKey == "/home" || targetKey == "/") return;
        let preTag = "/";
        for (let item in panes.value) {
          if (item == targetKey) {
            delete panesTags[targetKey];
            break;
          }
          preTag = item;
        }
        router.push(preTag);
      },
      tabClick: (targetKey) => {
        let paneInfo = panes.value[targetKey];
        router.push({
          path: targetKey,
          query: paneInfo.query || {},
        });
      },
    });

    let miniAdminProTabStyle = {};
    if (config.fixedHeader) {
      miniAdminProTabStyle = {
        position: "fixed",
        marginBottom: "10px",
      };
    }

    const tabReload=function (key){
      // // console.log(key)
      // window.location.hash =''; //用一个空页
      // setTimeout(()=>{
      //   window.location.hash =key;
      // },2)
      // const matched =  routeTpl.value.matched.concat();
      // base.selectedKeys=[];
      // base.selectedKeys = matched
    }

    return {
      locale,
      base,
      state,
      breadcrumb,
      panes,
      activeKey,
      ...toRefs(panesChage),
      miniAdminProTabStyle,
      tabReload,
    };
  },
});
</script>

<style>
.ant-pro-basicLayout-content .ant-pro-page-container {
  margin-top: 24px;
  padding: 0 10px 0 10px;
}
#mini-admin-pro-menu-tabs
  .ant-tabs.ant-tabs-card
  .ant-tabs-card-bar
  .ant-tabs-tab {
  height: 30px;
  line-height: 30px;
}
.ant-pro-page-container-children-content {
  margin: 0px 0px 0px;
}
.mini-admin-pro-content {
  padding: 10px;
  background-color: #fff;
}

#mini-admin-pro-menu-tabs .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container {
  height: 31px;
}


</style>
<style lang="less" scoped>
#mini-admin-pro-menu-tabs {
  margin: -24px 0px -24px -24px;
  height: 40px;
  z-index: 100;
  width: 100%;
  padding-top: 9px;
  background-color: #fff;
  border-top-color: #ececec;
  border-top-style: solid;
  border-top-width: 1px;

  .mini-admin-pro-menu-tabs-items{
    margin-left: 16px;
  }

}
.mini-admin-pro-breadcrumb{
  line-height: 40px;
}
</style>
