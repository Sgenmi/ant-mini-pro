<template>
  <page-container :pageHeaderRender="()=>{}">
    <div style="margin-bottom: 8px">
      <a-select v-model:value="group_id" @change="getGroupGetTask(group_id)" placeholder="Select a person">
        <a-select-option v-for="item in grouOption" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
      </a-select>
      <a-button type="primary" @click="setTaskFn">设置权限</a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="list"
      :row-selection="rowSelection"
      :defaultExpandAllRows="true"
      :expandRowByClick="true"
      :indentSize="35"
      size="small"
      rowKey="id"/>
  </page-container>
</template>

<script>
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '权限名称',
    dataIndex: 'name',
  },
  {
    title: '菜单url',
    dataIndex: 'path',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
];
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
import { getRoleTaskTree, getSelected, groupGetTask, setTask } from '@/api/system.js'
import { message } from "ant-design-vue";
export default defineComponent({
  setup(props) {
    const selectedRowKeys = ref([]);

    const list = ref([])
    const getlist = async () => {
      const res = await getRoleTaskTree()
      if (res.code === 0) {
        list.value = res.data
        defaultSelect(list.value)
      }
    }

    //
    const onSelectChange = changableRowKeys => {
      selectedRowKeys.value = changableRowKeys;
    };
    const rowSelection = computed(() => {
      return {
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }
    })

    // 获取角色已有权限
    const getGroupGetTask = async (id) => {
      selectedRowKeys.value = []
      const res = await groupGetTask({ group_id: id })
      if (res.code === 0) {
        const list = res.data
        defaultSelect(list)
      }
    }

    // 遍历tree 默认选中 
    const defaultSelect = (list) => {
      list.forEach(el => {
        if (el.LAY_CHECKED) {
          selectedRowKeys.value.push(el.id)
        }
        if (el.children) {
          let data = el.children
          defaultSelect(data)
        }
      });
    }

    // 获取角色组
    const group_id = ref(null)
    const grouOption = ref([])
    const getSelectedFn = async () => {
      const res = await getSelected({ is_local: -1 })
      if (res.code === 0) {
        grouOption.value = res.data
      }
    }

    // 设置权限
    const setTaskFn = async () => {
      const res = await setTask({
        group_id: group_id.value,
        operation: selectedRowKeys.value
      })
      if (res.code === 0) {
        message.success(res.message)
      }
    }

    onMounted(() => {
      getlist(),
      getSelectedFn()
    })
    return {
      list,
      columns,
      rowSelection,
      selectedRowKeys,
      defaultSelect,
      getlist,
      group_id,
      grouOption,
      getSelectedFn,
      getGroupGetTask,
      setTaskFn
    }
  }
})
</script>

<style lang="less" scoped>
.ant-select {
  width: 260px;
  margin-right: 5px;
}
</style>
