<template>
  <div id="userLayout" :class="['user-layout-wrapper']">
    <div class="container">
      <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div>
      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <a href="/">
              <img src="https://store.antdv.com/pro/preview/img/logo.0f102d1c.svg" class="logo" alt="logo">
              <span class="title">Mini-Admin pro</span>
            </a>
          </div>
          <div class="desc">
            Ant Design : Ant mini admin pro
          </div>
        </div>
        <div class="main">
          <a-form
            id="formLogin"
            class="user-layout-login"
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
          >
            <a-form-item>
              <a-input
                size="large"
                type="text"
                v-model:value="formState.username"
                v-bind="validateInfos.username"
                placeholder="Username"
              >
                <template #prefix>
                  <UserOutlined style="color: #1890ff" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input
                size="large"
                v-model:value="formState.password"
                v-bind = "validateInfos.password"
                type="password"
                placeholder="Password">
                <template #prefix>
                  <LockOutlined style="color: #1890ff" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                :loading="load"
                size="large"
                type="primary"
                html-type="submit"
                class="login-button"
              >
                确定
              </a-button>
            </a-form-item>
          </a-form>
        </div>

        <div class="footer">
          <div class="links">
            <a href="_self">帮助</a>
            <a href="_self">隐私</a>
            <a href="_self">条款</a>
          </div>
          <div class="copyright">
            Copyright &copy; 2021 vueComponent
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent, reactive ,ref} from 'vue';
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  import { message,Form } from "ant-design-vue";
  const useForm = Form.useForm;

  export default defineComponent({
    setup() {
      const router = useRouter();
      const store = useStore();

      const formState = reactive({
        username: '',
        password: '',
      });
      const { resetFields, validate, validateInfos } = useForm(
        formState,
        reactive({
          username: [{ required: true, message: "请输入账户" }],
          password: [{ required: true, message: "请输入密码" }]
        })
      );
      const load = ref(false);

      const  handleFinish = async values => {
        load.value = false;
        try {
          await store.dispatch('user/Login',formState);
          await router.push('/')
        }catch (e) {
            message.error(e)
        }
      };
      const handleFinishFailed = errors => {
        message.error(errors);
      };
      return {
        formState,
        handleFinish,
        handleFinishFailed,
        validateInfos,
        load
      };
    },
    components: {
    },
  });
</script>


<style lang="less" scoped>

  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(https://store.antdv.com/pro/preview/img/background.5825f033.svg) no-repeat 50%;
      background-size: 100%;
      //padding: 50px 0 84px;
      position: relative;

      .user-layout-lang {
        width: 100%;
        height: 40px;
        line-height: 44px;
        text-align: right;

        .select-lang-trigger {
          cursor: pointer;
          padding: 12px;
          margin-right: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          vertical-align: middle;
        }
      }

      .user-layout-content {
        padding: 32px 0 24px;

        .top {
          text-align: center;

          .header {
            height: 44px;
            line-height: 44px;

            .badge {
              position: absolute;
              display: inline-block;
              line-height: 1;
              vertical-align: middle;
              margin-left: -12px;
              margin-top: -10px;
              opacity: 0.8;
            }

            .logo {
              height: 44px;
              vertical-align: top;
              margin-right: 16px;
              border-style: none;
            }

            .title {
              font-size: 33px;
              color: rgba(0, 0, 0, .85);
              font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
              font-weight: 600;
              position: relative;
              top: 2px;
            }
          }
          .desc {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            margin-top: 12px;
            margin-bottom: 40px;
          }
        }

        .main {
          min-width: 260px;
          width: 368px;
          margin: 0 auto;
        }

        .footer {
          // position: absolute;
          width: 100%;
          bottom: 0;
          padding: 0 16px;
          margin: 48px 0 24px;
          text-align: center;

          .links {
            margin-bottom: 8px;
            font-size: 14px;
            a {
              color: rgba(0, 0, 0, 0.45);
              transition: all 0.3s;
              &:not(:last-child) {
                margin-right: 40px;
              }
            }
          }
          .copyright {
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
          }
        }
      }

      a {
        text-decoration: none;
      }

    }
  }

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
