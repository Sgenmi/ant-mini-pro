<template>
  <page-container :pageHeaderRender="()=>{}">
   <div>
     <a-form layout="inline">
       <a-row :gutter="0">
         <a-col :md="8" :sm="24">
           <a-form-item>
             <a-input  placeholder="姓名"/>
           </a-form-item>
         </a-col>
         <a-col :md="8" :sm="24">
           <a-form-item>
             <a-input  placeholder="姓名"/>
           </a-form-item>
         </a-col>
         <a-col :md="8" :sm="24">
           <a-form-item>
             <a-input  placeholder="姓名"/>
           </a-form-item>
         </a-col>
       </a-row>

       <a-button type="primary" @click="editUser">新增用户</a-button>
       <a-button type="primary" @click="()=>{params.page=1;getlist()}">搜索</a-button>
     </a-form>
    </div>

		<div style="margin-top: 8px">
      <a-table bordered :data-source="dataSource" :pagination="pagination" :columns="columns" size="small" rowKey="id" @change="tableChange">
        <template #id="{ record }">
          {{ record.id }}<br>
          <!-- <a v-myper="10214" href="javascript:;" @click="loginUser(record)">进入后台</a> -->
        </template>
        <template #switch="{ record }">
          <a-switch :checked="record.status === 1" @change="changStatus(record)" />
        </template>
        <template #operation="{ record }">
          <a-button type="primary" @click="editUser(record)" size="small">编辑</a-button>
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
        <a-form-item has-feedback label="用户名" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item has-feedback label="手机号码" name="mobile">
          <a-input v-model:value="formState.mobile" />
        </a-form-item>

        <a-form-item label="用户密码" name="password">
          <a-input v-model:value="formState.password" />
        </a-form-item>

        <a-form-item label="真实姓名">
          <a-input v-model:value="formState.real_name" />
        </a-form-item>

        <a-form-item label="角色组">
          <a-select v-model:value="formState.group_id" @change="getParent(formState.group_id)">
            <a-select-option v-for="item in grouOption" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item v-show="parentOpt.length > 0" label="所属上级">
          <a-select v-model:value="formState.parent_id">
            <a-select-option v-for="item in parentOpt" :key="item.id" :value="item.id">{{ item.real_name }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="权限组">
          <a-select v-model:value="formState.auth_group" mode="multiple" :filterOption="$filterOption">
            <a-select-option v-for="item in grouOption" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getAdminList, userSetStatus, getAuthCode, getParentSelected, getSelected, addAdmin } from '@/api/system.js'
const params = reactive({
	page: 1,
	size: 10
})
let dataSource = ref([]);
const getlist = async () => {
	const res = await getAdminList(params)
	if (res.code === 0) {
		pagination.total = res.data.count
		dataSource.value = res.data.list
	}
}

// 新增 编辑操作
const formRef = ref();
const formState = reactive({
	title: '新增用户',
	visible: false,
	confirmLoading: false,
	username: '',
	mobile: '',
	password: '',
	real_name: '',
	group_id: '',
	auth_group: [],
	id: '',
	parent_id: ''
})
const editUser = (info = {}) => {
	if (formRef.value) {
		formRef.value.resetFields();
	}
	if (!info.id) {
		Object.keys(formState).forEach(key => {
			formState[key] = ''
		})
		formState.auth_group = []
		formState.title = '新增用户'
	} else {
		Object.keys(formState).forEach(key => {
			formState[key] = info[key]
		})
		if (info.parent_id) {
			getParent(info.id)
		}
		formState.title = '编辑用户'
	}
	formState.confirmLoading = false
	formState.visible = true
}

// 状态更改
const changStatus = async (record) => {
	let status =  record.status === 1 ? 0 : 1
	const res = await userSetStatus({ id: record.id, status: status })
	if (res.code === 0) {
		record.status = status
		message.success(res.msg)
	}
}

let parentOpt = ref([])
const getParent = async (id) => {
	formState.parent_id = ''
	const res = await getParentSelected({ group_id: id })
	if (res.code === 0 && res.data.count > 0) {
		parentOpt.value = res.data.list
	} else {
		parentOpt.value = []
	}
}

// 获取权限组
const grouOption = ref([])
const getSelectedFn = async () => {
	const res = await getSelected({ is_local: 1 })
	if (res.code === 0) {
		grouOption.value = res.data
	}
}

const loginUser = async (info) => {
	const res = await getAuthCode({
		id: info.id,
		mobile: info.mobile
	})
	if (res.code === 0) {
		window.open(res.data.url)
	}
}

// 表单提交
const submit = () => {
	formState.confirmLoading = true
	formRef.value
		.validate()
		.then(async () => {
			let params = {
				username: formState.username,
				mobile: formState.mobile,
				password: formState.password,
				real_name: formState.real_name,
				group_id: formState.group_id,
				auth_group: formState.auth_group,
				parent_id: formState.parent_id
			}
			let res = {}
			if (formState.id) {
				params.id = formState.id
				res = await editAdmin(params)
			} else {
				res = await addAdmin(params)
			}
			if (res.code === 0) {
				formState.visible = false
				message.success(res.message)
				getlist()
			} else {
				formState.confirmLoading = false
			}
		})
}

onMounted(async () => {
	getlist()
	getSelectedFn()
})

// 分页
const pagination = reactive({
	total: 0
})
const tableChange = (pagination) => {
	params.page=pagination.current;
	getlist()
}


const columns = [
  {
    title: 'ID',
    slots: {
      customRender: 'id',
    },
  },
  {
    title: '姓名',
    dataIndex: 'real_name',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
  },
  {
    title: '角色',
    dataIndex: 'group_txt',
  },
  {
    title: '权限',
    dataIndex: 'auth_group_txt',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '操作',
    slots: {
      customRender: 'switch',
    },
    width: '200px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: {
      customRender: 'operation',
    },
    width: '200px',
  },
];

const rules = {
  mobile: [
    {required: true, message: '请输入手机号', trigger: 'blur'}
  ],
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
}
</script>
