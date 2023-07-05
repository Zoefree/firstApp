<script>
export default {
  name: "homeInfo",
};
</script>
<script setup>
import ColumnMenu from "./common/columnMenu.vue";
// import MainContent from "./common/MainContent.vue";
</script>
<template>
  <div class="homeBox">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <ColumnMenu></ColumnMenu>
        </el-aside>
        <el-main>
          <!-- <MainContent></MainContent> -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.homeBox {
  width: 100%;
  height: 98%;
}
:deep(.el-header) {
  background-color: rgba(0, 0, 0, 0.6);
}
:deep(.el-aside) {
  height: 55rem;
  background-color: rgba(176, 120, 245, 0.6);
}
:deep(.el-main) {
  background-color: rgba(208, 186, 235, 0.6);
}
</style>
