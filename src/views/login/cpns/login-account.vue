<template>
  <div class="login-account">
    <el-form
      label-width="80px"
      :rules="rules"
      :model="account"
      ref="accountRef"
    >
      <el-form-item label="账号：" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus";
import localCache from "@/utils/cache";

import { rules } from "../config/account-config";

export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: localCache.getCache("name") || "",
      password: localCache.getCache("password") || "",
    });

    const accountRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = (isKeepPassword: boolean) => {
      accountRef.value?.validate((valid) => {
        if (valid) {
          console.log("success");
          // 判断是否记住密码
          localCache.setCache("name", account.name);

          if (isKeepPassword) {
            // 本地存储
            // localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            // localCache.deleteCache("name");
            localCache.deleteCache("password");
          }
          // 开始登陆验证
          store.dispatch("login/accountLoginAction", { ...account });
        } else {
          console.log("error");
        }
      });
    };

    return {
      account,
      rules,
      loginAction,
      accountRef,
    };
  },
});
</script>

<style scoped></style>
