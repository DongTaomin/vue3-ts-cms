<template>
  <div class="user-info">
    <el-dropdown tabindex="0">
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="25" :src="squareUrl" />
        <span class="name">{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CircleCloseFilled" @click="logout"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item icon="UserFilled">用户信息</el-dropdown-item>
          <el-dropdown-item icon="Tools">系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import localCache from "@/utils/cache";

import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const squareUrl =
      "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";

    const name = computed(() => localCache.getCache("name") ?? "未登录");

    const router = useRouter();
    const logout = () => {
      localCache.clearCache();
      router.push("/login");
    };

    // const backClick = () => {
    //   // 跳转到登录页面
    //   const router = useRouter();
    //   router.push("/login"); //

    //   // 清空本地存储
    //   localCache.clearCache();

    //   // 重新渲染页面
    //   window.location.reload();
    // };

    return {
      squareUrl,
      name,
      // backClick,
      logout,
    };
  },
});
</script>

<style scoped lang="less">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-icon--right {
  margin-left: 8px;
}

.user-info {
  display: flex;
  align-items: center;
}

.name {
  margin-left: 10px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

/* .el-avatar {
  margin-right: 10px;
} */

el-dropdown-link:focus {
  outline: none;
  // border: none;
}
</style>
