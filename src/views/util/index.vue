<template>
<div class="handel">
  <div class="button-container">
    <button class="button">
      上传文件
    </button>
  </div>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Util',
});
</script>

<style lang="scss" scoped>
.handel{
  padding:110px;
}
.button-container{
  width:120px;
  height:40px;
  border-radius:12px;
  //border: 1px solid #00ccff;
  .button{
    width:120px;
    height:40px;
    background-color: #00ccff;
    border-radius:12px;
    border: 0;
    color: #ffffff;
    font-weight: bold;
    font-size:15px;
    outline: none;
  }

  &:hover{
    border: 1px solid #00ccff;
  }
}

</style>
