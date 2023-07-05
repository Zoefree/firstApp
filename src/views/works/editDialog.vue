<script>
import { onMounted, ref, defineExpose, defineEmits } from "vue";
export default {
  name: "editDialog",
};
</script>
<script setup>
import { addUserInfo, editUserInfo } from "@/service/apis/overtime.js";
const emits = defineEmits(["refresh"]);
let indexIs = ref(null);
const dateIs = ref("");
const endTime = ref("");
let timeLong = ref(null);
const dialogVisible = ref(false);
const dialogTitle = ref("");
const descrip = ref("");
const showDialog = () => {
  dialogVisible.value = true;
};
const clearDatas = () => {
  // dateIs.value = "";
  endTime.value = null;
  timeLong.value = null;
};

//提交数据
const confirm = async () => {
  dialogVisible.value = false;
  const hours = endTime.value ? endTime.value.split(":") : false;
  const h = hours ? Number(hours[0]) - 19 : false;
  const m = hours ? Number(hours[1]) : false;
  const totalMins = hours ? 90 + h * 60 + m : false;
  const params = {
    time: dateIs.value,
    howlong1: endTime.value,
    howlong2: totalMins ? totalMins : -timeLong.value,
    descrip: descrip.value,
  };
  if (dialogTitle.value === "新增") {
    alert("新增");
    const res1 = await addUserInfo(params);
  } else {
    alert("编辑");
    params.indexx = Number(indexIs.value);
    const res2 = await editUserInfo(params);
  }
  emits("refresh");
};
const cancel = () => {
  dialogVisible.value = false;
};
//回显数据
const showDitail = (data) => {
  console.log(data, -Number(data.value[0].howlong2), "回显数据");
  dateIs.value = data.value[0].time;
  endTime.value = data.value[0].howlong1;
  timeLong.value =
    Number(data.value[0].howlong2) > 0
      ? Number(data.value[0].howlong2)
      : -Number(data.value[0].howlong2);
  indexIs.value = data.value[0].indexx;
  descrip.value = data.value[0].descrip;
};
defineExpose({
  showDialog,
  clearDatas,
  dialogTitle,
  showDitail,
});

onMounted(() => {});
</script>
<template>
  <!-- 编辑 -->
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
    <el-date-picker
      v-model="dateIs"
      type="date"
      placeholder="Pick a day"
      :size="size"
      @change="iptValue"
      format="YYYY/MM/DD"
      value-format="YYYY-MM-DD"
    />
    <div class="editTimes">
      <div class="overTime">
        <p>加班</p>
        <el-time-select
          v-model="endTime"
          start="19:00"
          step="00:10"
          end="23:00"
          placeholder="Select time"
          @change="iptValue"
        />
      </div>
      <div class="leave">
        <p>请假时长<span style="color: red">(!非请假不要填写)</span></p>
        <el-input
          v-model="timeLong"
          @change="iptValue"
          type="number"
          min="30"
        ></el-input>
        <p style="color: green">备注</p>
        <el-input v-model="descrip"></el-input>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="confirm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
