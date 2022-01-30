<template>
  <page-container :pageHeaderRender="()=>{}">
    <div class="filter">
      <a-button type="primary" @click="editGroup()">新增角色</a-button>
    </div>

    <div style="margin-top: 8px">
      <a-table bordered :data-source="dataSource" :pagination="false" :columns="columns" size="small" rowKey="id">
        <template #switch="{ record }">
          <a-switch :checked="record.status === 1" @change="changStatus(record)" />
        </template>
        <template #operation="{ record }">
          <a-button type="primary" size="small" @click="editGroup(record)">编辑</a-button>
        </template>
      </a-table>
    </div>

    <a-modal
      :title="formState.title"
      v-model:visible="formState.visible"
      :confirm-loading="formState.confirmLoading"
      :maskClosable="false"
      cancelText="取消"
      okText="确定"
      @ok="submit"
    >
      <a-form ref="formRef" :rules="rules" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="账号" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </page-container>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '角色名',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '状态',
    slots: {
      customRender: 'switch',
    }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: {
      customRender: 'operation',
    },
    width: '200px'
  },
];
const rules = {
  name: [
    {required: true, message: '请输入角色名称', trigger: 'blur'},
  ],
}
import { message } from "ant-design-vue";
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { getGroupList, addGroup, groupEdit, groupSetStatus } from '@/api/system.js'
export default defineComponent({
  setup(props) {
    const dataSource = ref([])

    const getlist = async () => {
      const res = await getGroupList()
      if (res.code === 0) {
        dataSource.value = res.data.list
      }
    }

    const formState = reactive({
      title: '新增角色',
      visible: false,
      confirmLoading: false,
      name: '',
      id: ''
    })
    const editGroup = (info = '') => {
      formState.confirmLoading = false
      if (info.id) {
        formState.id = info.id
        formState.name = info.name
      } else {
        formState.id = ''
        formState.name = ''
      }
      formState.visible = true
    }
    const formRef = ref();
    const submit = () => {
      formRef.value
        .validate()
        .then(async () => {
          formState.confirmLoading = true
          let res = {}
          if (formState.id) {
            res = await groupEdit({ name: formState.name, id: formState.id })
          } else {
            res = await addGroup({ name: formState.name })
          }
          if (res.code === 0) {
            message.success(res.message)
            formState.visible = false
          } else {
            formState.confirmLoading = false
          }
        })
    }

    // 状态更改
    const changStatus = async (record) => {
      let status =  record.status === 1 ? 0 : 1
      const res = await groupSetStatus({ id: record.id, status: status })
      if (res.code === 0) {
        record.status = status
        message.success(res.message)
      }
    }

    onMounted(() => {
      getlist()
    })
    
    return {
      columns,
      rules,
      dataSource,
      editGroup,
      formState,
      submit,
      formRef,
      getlist,
      changStatus
    }
  }
})
</script>
