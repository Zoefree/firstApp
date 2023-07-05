<script>
import { onMounted, ref } from "vue";
export default {
  name: "overTime",
};
</script>
<script setup>
import EditDialog from "./editDialog.vue";
import FilterData from "./filterData.vue";
import {
  getUserInfo,
  delUserInfo,
  getSomeInfo,
} from "@/service/apis/overtime.js";
let tableData = ref([]);
const editRef = ref(null);
let leaveTimes = ref(0);
let overTimes = ref(0);
const getTabs = async () => {
  const res = await getUserInfo();
  tableData.value = res;
  leaveTimes.value = 0;
  overTimes.value = 0;
  res.forEach((el) => {
    if (Number(el.howlong2) < 0) {
      leaveTimes.value += Number(el.howlong2);
    } else {
      overTimes.value += Number(el.howlong2);
    }
  });
};
//查询指定时间内数据
const getSomeInfos = async (vals) => {
  // console.log("筛选传递的参数", vals);
  const timeRes = await getSomeInfo({
    beginTime: vals[0].value,
    endTime: vals[1].value,
  });
  tableData.value = timeRes;
  console.log(timeRes, "f", tableData);
  leaveTimes.value = 0;
  overTimes.value = 0;
  timeRes.forEach((el) => {
    if (Number(el.howlong2) < 0) {
      leaveTimes.value += Number(el.howlong2);
    } else {
      overTimes.value += Number(el.howlong2);
    }
  });
};
const selections = ref([]);

const handleSelectionChange = (val) => {
  selections.value = val;
  console.log(val[0], "选择的数据");
};
const addData = (type) => {
  if (type === "add") {
    editRef.value.dialogTitle = "新增";
    editRef.value.clearDatas();
    editRef.value.showDialog();
  } else if (type === "edit") {
    if (selections.value.length === 0) {
      return alert("请选择需要编辑的数据");
    } else if (selections.value.length > 1) {
      return alert("每次仅支持一条数据进行修改！");
    } else {
      //回显数据
      editRef.value.showDitail(selections);
      editRef.value.dialogTitle = "编辑";
      editRef.value.showDialog();
    }
  }
};
const delData = () => {
  selections.value.forEach((el) => {
    delUserInfo(el.indexx);
  });
  getTabs();
};

//页码

// const currentPage = ref(1);
// const pageSize = ref(10);
// const totalNum = ref(100);
// const small = ref(false);
// const background = ref(false);
// const disabled = ref(false);

// const handleSizeChange = (val) => {
//   console.log(`${val} items per page`);
// };
// const handleCurrentChange = (val) => {
//   console.log(`current page: ${val}`);
// };
onMounted(() => {
  getTabs();
});
</script>
<template>
  <div>
    <!-- 筛选 -->
    <FilterData @filterData="getSomeInfos"></FilterData>
    <!-- 编辑 -->
    <EditDialog ref="editRef" @refresh="getTabs"></EditDialog>
    <el-button @click="addData('add')" class="add">新增</el-button>
    <el-button @click="addData('edit')" class="add">编辑</el-button>
    <el-button @click="delData" class="add">删除</el-button>
    <el-table
      @selection-change="handleSelectionChange"
      height="600"
      :data="tableData"
      stripe
      style="width: 100%"
      ><el-table-column type="selection" width="55" />
      <el-table-column prop="indexx" label="Id" width="100" />
      <el-table-column prop="time" label="Date" width="280" />
      <el-table-column
        prop="howlong1"
        label="Time-Quntum"
        width="380"
      /><el-table-column prop="howlong2" label="Time-Quntum" width="380" />
      <el-table-column prop="descrip" label="Desc" />
    </el-table>
    <div class="totalCalc">
      <span>总计:</span>
      <p>
        <span>请假时长:</span><span>{{ leaveTimes }}（分钟）</span>
        <span class="hourclass">/{{ -leaveTimes / 60 }}（时）</span>
      </p>
      <p>
        <span>加班时长:</span><span>{{ overTimes }}（分钟）</span>
        <span class="hourclass">/{{ overTimes / 60 }}（时）</span>
      </p>
    </div>
    <!-- 页码 -->
    <!-- <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
  </div>
</template>
<style scoped lang="scss">
:deep(.el-table) {
  margin-top: 2rem;
  margin-bottom: 3rem;
}
.totalCalc {
  .hourclass {
    color: rgb(34, 123, 93);
  }
}
.add {
  position: relative;
  left: 87%;
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
