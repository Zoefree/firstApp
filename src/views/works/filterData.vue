<script>
import { ref, defineEmits } from "vue";
export default {
  name: "filterData",
};
</script>
<script setup>
const emits = defineEmits(["filterData"]);
const beginTime = ref("");
const finalTime = ref("");
const filterData = () => {
  emits("filterData", [beginTime, finalTime]);
};
</script>
<template>
  <div>
    <el-date-picker
      v-model="beginTime"
      type="date"
      placeholder="Pick a day"
      :size="size"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    />
    <el-date-picker
      v-model="finalTime"
      type="date"
      placeholder="Pick a day"
      :size="size"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    />
    <el-button @click="filterData">筛选</el-button>
  </div>
</template>
<style scoped lang="scss">
:deep(.el-table) {
  margin-top: 2rem;
}
:deep(.el-button) {
  position: relative;
  // left: 96%;
}
.editTimes {
  display: flex;
  .overTime {
    flex: 2;
  }
  .leave {
    flex: 1;
  }
  .total {
    margin-left: 3rem;
    flex: 3;
  }
}
</style>
