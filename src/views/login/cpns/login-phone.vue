<template>
  <div class="login-phone">
    <el-form label-width="80px">
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="telephone.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码：" prop="code">
        <div class="get-code">
          <el-input v-model="telephone.code"></el-input>
          <el-button type="primary" class="code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const telephone = reactive({
      phone: "",
      code: "",
    });

    return {
      telephone,
    };
  },
});
</script>

<style scoped>
.get-code {
  display: flex;
}
.code {
  margin-left: 8px;
}
</style>
