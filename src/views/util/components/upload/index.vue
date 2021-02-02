<template>
  <div class="button-container">
    <button class="button" @click="onClick">上传文件</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'upload',
  props: {
    type: {
      type: String,
      default: null,
    },
    // 大小单位mb
    size: {
      type: Number,
      default: null,
    },
    zone: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 上传文件
    onClick() {
      console.log(this.zone);

      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = this.onChange;
      input.click();
    },

    // eslint-disable-next-line consistent-return
    onChange(event) {
      const e = event.target;
      const file = e.files[0];
      const size = this.size * 1024;

      // 类型判断
      if (this.type && this.checkType(file.name)) {
        alert('文件类型错误');
        return false;
      }

      // 大小限制
      if (this.size && size <= file.size) {
        alert(`文件不能超过${size}mb`);
        return false;
      }

      // 是否是切片上传
      if (this.zone) {
        this.zoneUpload(e);
        return false;
      }
      this.upload(e);
    },

    // 异步上传文件
    async upload(e) {
      const formData = new FormData();
      formData.append('file', e.files[0]);
    },

    // 分片上传
    zoneUpload(e) {
      const file = e.files[0];
      this.zoneFile(file);
      return false;
    },

    // 将文件转换为blob，并且切开
    zoneFile(file) {
      const reader = new FileReader();
      const rs = reader.readAsArrayBuffer(file);
      let blob = null;
      rs.onload = (e) => {
        if (typeof e.target.result === 'object') {
          blob = new Blob([e.target.result]);
        } else {
          blob = e.target.result;
        }
      };
    },

    // 检查类型
    checkType(filename: string) {
      const types = {
        images: ['png', 'jpg', 'jpeg'],
        video: ['mp4', 'ogg'],
        word: ['excel', 'word', 'xls', 'xlsx'],
        excel: ['xls', 'xlsx'],
        text: ['txt'],
      };
      // 无法通过会返回true
      return !types[this.type].includes(filename.split('.')[1]);
    },

  },
});
</script>

<style scoped lang="scss">
.button-container{
  width:120px;
  height:40px;
  border-radius:12px;
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
