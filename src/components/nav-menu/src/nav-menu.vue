<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/login.png" alt="logo" />
      <span class="title">后台管理</span>
    </div>

    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单 -->
        <template v-if="item.type === 1">
          <!-- 一级菜单可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon.slice(8)" />
              </el-icon>

              <span>{{ item.name }}</span>
            </template>

            <!-- 二级菜单  -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span> {{ subitem.name }} </span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item class="el-menu-item" :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";

import { useRouter } from "vue-router";
import { processingPath } from "@/utils/map-menus";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // 获取vuex中的userMenus
    const store = useStore();
    // 获取router
    const router = useRouter();
    const userMenus = computed(() => {
      return store.state.login.userMenus;
    });

    // 默认激活菜单
    const currentPath = router.currentRoute.value.path;
    const menu = processingPath(userMenus.value, currentPath);
    const defaultValue = ref(menu.id + "");

    // 事件处理函数
    const handleMenuClick = (item: any) => {
      router.push({
        path: item.url ?? "/not-found",
      });
      // console.log(item);
    };
    return {
      userMenus,
      defaultValue,
      handleMenuClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;

  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-left: 10px;
}

.img {
  height: 100%;
  margin: 0 10px;
}

// .menu {
//   margin-right: 0.8px;
// }

// 目录
.el-sub-menu {
  background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
}
// :: v-deep .el-submenu__title {
//   background-color: #001529 !important;
// }
// hover 高亮
.el-menu-item:hover {
  color: #fff !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
.el-menu-vertical {
  border-right: none;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
