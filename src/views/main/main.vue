<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isMainFold ? '60px' : '210px'">
        <nav-menu :collapse="isMainFold"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="fold"></nav-header>
        </el-header>
        <el-main class="page-content">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import NavMenu from "@/components/nav-menu/index";
import NavHeader from "@/components/nav-header/index";

export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
  },
  setup() {
    const isMainFold = ref(false);
    const fold = (isFold: boolean) => {
      isMainFold.value = isFold;
      console.log(isFold);
    };
    return {
      isMainFold,
      fold,
    };
  },
});
</script>

<style scoped lang="less">
.main {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.main-content,
.page {
  height: 100%;
}
.page-content {
  height: calc(100% - 48px);
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;

  width: 100%;
}
</style>
