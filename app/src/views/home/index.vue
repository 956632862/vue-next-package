<template>
  <div class="home">
    <router-link class="item" to="/util">工具库</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>
<style lang="scss" scoped>
.home{
  display:flex;
  padding-top: 100px;
  justify-content: center;
}
.item{
  position: relative;
  border: 1px solid #03A9F3;
  width:150px;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-weight:bold;

  &::before,
  &::after {
    content: " ";
    position: absolute;
    width: 20px;
    height: 20px;
  }

  &::before {
    top: -5px;
    left: -5px;
    border-top: 1px solid #03A9F3;
    border-left: 1px solid #03A9F3;
    transition:all .4s;
  }

  &::after {
    right: -5px;
    bottom: -5px;
    border-bottom: 1px solid #03A9F3;
    border-right: 1px solid #03A9F3;
    transition:all .4s;

  }

  &:hover::before,
  &:hover::after {
    width: calc(100% + 9px);
    height: calc(100% + 9px);
  }
}
</style>
