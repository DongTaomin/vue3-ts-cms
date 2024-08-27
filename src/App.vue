<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// import "element-plus/dist/index.css";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    return {
      zhCn,
    };
  },
});
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>
