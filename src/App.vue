<template>
    <router-view />
</template>

<style lang="less">
    #app {
        height: 100%;
    }
    /**
      全局字体
     */
    .ant-menu,.ant-table, .ant-breadcrumb, .ant-input,.ant-btn, .ant-radio-group,.ant-tabs-tab{
      font-size: 13px;
    }
    /**过滤动画 **/
    .fade-right-enter-active {
      transition: all .90s;
    }
    .fade-right-leave-active{
      transition: all .90s;
    }
    .fade-right-enter-from {
      opacity: 0;
      transform: translateX(-35px);
    }
    .fade-right-leave-to {
      opacity: 0;
      transform: translateX(35px);
      display: none;
    }

    .fade-top-enter-active {
      transition: all .90s;
    }
    .fade-top-leave-active{
      transition: all .90s;
    }
    .fade-top-enter-from {
      opacity: 0;
      transform: translateY(35px);
    }
    .fade-top-leave-to {
      opacity: 0;
      transform: translateY(-35px);
      display: none;
    }

    /**兼容移动端**/
    @media (max-width:480px) {
      .ant-table {
        width: 100%;
        overflow-x: auto
      }
      .ant-table-thead > tr > td,
      .ant-table-thead > tr > th {
        font-weight: 700;
      }
      .ant-table-tbody > tr > td,
      .ant-table-tbody > tr > th,
      .ant-table-thead > tr > td,
      .ant-table-thead > tr > th {
        white-space: pre
      }
      .ant-table-tbody > tr > td > span,
      .ant-table-tbody > tr > th > span,
      .ant-table-thead > tr > td > span,
      .ant-table-thead > tr > th > span {
        display: block
      }
      .ant-col{
        width: 100%;
      }
    }
</style>
