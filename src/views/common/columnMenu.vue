<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "ColumnMenu",
});
</script>

<script setup>
const router = useRouter();
// 暂时不会用ts
const handleOpen = () => {};
const handleClose = () => {};
const overTimeFun = () => {
  router.push({
    path: "/home/overtimes",
  });
};
</script>
<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>工作</span>
          </template>
          <!-- <el-menu-item-group title=""> -->
          <el-menu-item index="1-1" @click="overTimeFun">加班</el-menu-item>
          <el-menu-item index="1-2">数据分析</el-menu-item>
          <!-- </el-menu-item-group> -->
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
:deep(.el-sub-menu__title),
:deep(.el-sub-menu) {
  width: 13rem;
}
</style>
