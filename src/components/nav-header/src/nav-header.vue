<template>
  <div class="nav-header">
    <!-- <el-icon @click="foldClick"><ArrowRightBold /></el-icon> -->
    <el-icon @click="foldClick">
      <component :is="isFold ? 'ArrowLeftBold' : 'ArrowRightBold'" />
    </el-icon>
    <div class="content">
      <dtm-bread :bread="bread"></dtm-bread>
      <div class="right">
        <div class="icon">
          <a href="#"
            ><el-icon><Message /></el-icon
          ></a>
          <a href=""
            ><el-icon><Link /></el-icon
          ></a>
          <a href=""
            ><el-icon><Bell /></el-icon
          ></a>

          <a href="https://www.bing.com" target="_blank"
            ><el-icon><Search /></el-icon
          ></a>
        </div>
        <user-info class="user-info"></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import UserInfo from "./user-info.vue";
import DtmBread from "@/base-ui/bread";
// import { IBread } from "@/base-ui/bread/types";
import { mapPathToBread } from "@/utils/map-menus";
import LocalCache from "@/utils/cache";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    UserInfo,
    DtmBread,
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const foldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    // 面包屑数据
    const userMenus = LocalCache.getCache("userMenus");
    const route = useRoute();
    const bread = computed(() => {
      return mapPathToBread(userMenus, route.path);
    });

    return {
      isFold,
      bread,
      foldClick,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .el-icon {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}

.right {
  display: flex;
  align-items: center;
}

.icon {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-top: 5px;
}
.icon .el-icon {
  margin-right: 20px;
  margin-left: 10px;
  font-size: 18px;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>

function foldClick() { throw new Error("Function not implemented."); }
