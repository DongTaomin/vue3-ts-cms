<template>
  <div class="login">
    <loginpanel></loginpanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import loginpanel from "./cpns/login-panel.vue";

export default defineComponent({
  components: {
    loginpanel,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/img/login-bg.jpg) no-repeat;
  // background-size: 100% 100%;
  background-size: 100% 100%;
  background-position: center;
  // background-color: rgba(255, 255, 255, 0.5);
  // background-blend-mode: multiply;
}
</style>
