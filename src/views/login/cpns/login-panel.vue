<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs v-model="currentTab" type="border-card" class="demo-tabs" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <loginaccount ref="accountRef"></loginaccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <loginphone></loginphone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { User, Iphone } from "@element-plus/icons-vue";
import loginaccount from "./login-account.vue";
import loginphone from "./login-phone.vue";

export default defineComponent({
  components: {
    Iphone,
    User,
    loginaccount,
    loginphone,
  },
  setup() {
    // 定义属性
    const isKeepPassword = ref(false);
    const accountRef = ref<InstanceType<typeof loginaccount>>();
    const currentTab = ref("account");
    // 定义方法
    const loginClick = () => {
      if (currentTab.value === "account") {
        console.log("account");
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        console.log("phone");
      }
    };

    // 返回
    return {
      isKeepPassword,
      loginClick,
      currentTab,
      accountRef,
    };
  },
});
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.login-panel {
  margin-bottom: 120px;
  width: 320px;
  background-color: aliceblue;
  padding: 5px;
}
.title {
  /* color: rgb(243, 243, 244); */
  text-align: center;
}
.account-control {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  margin-top: 5px;
}
</style>
