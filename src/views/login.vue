<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "fiLogin",
});
</script>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const inputVal = ref("Dora");
const logining = () => {
  if (inputVal.value === "Dora") {
    // alert("登录成功！");
    router.push({
      path: "/home",
    });
  }
};
</script>
<template>
  <div class="loginApp">
    <div class="editPart">
      <el-input v-model="inputVal" placeholder="Please input" />
      <el-button @click="logining" :plain="true">登录</el-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.loginApp {
  width: 100%;
  height: 57rem;
  position: relative;
  background-image: url("@/assets/images/login/1.jpg");
  background-size: contain;
  .editPart {
    position: absolute;
    margin: auto;
    left: 30%;
    top: 50%;
    :deep(.el-input) {
      width: 13rem;
      height: 2rem;
      .el-input__inner {
        width: 12rem;
        height: 2rem;
        background-color: rgba(0, 0, 0, 0.3);
        color: rgb(232, 22, 22);
      }
    }
  }
}
</style>
