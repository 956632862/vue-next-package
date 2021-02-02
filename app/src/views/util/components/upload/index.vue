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
    // 是否切片上传
    zone: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 上传文件
    onClick() {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = this.onChange;
      input.click();
    },

    // eslint-disable-next-line consistent-return
    onChange(event: any) {
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
      // 普通文件上传
      this.upload(e);
    },

    // 异步上传文件
    async upload(e: any) {
      const formData = new FormData();
      formData.append('file', e.files[0]);
    },

    // 分片上传
    async zoneUpload(e: any) {
      const file = e.files[0];
      // 将文件切片
      const files: any = await this.zoneFile(file);
      // 并发
      files.forEach((item: string) => {
        console.log(item);
      });
    },

    // 将文件转换为blob，并且切开
    async zoneFile(file: any) {
      return new Promise((resolve) => {
        const files: any = [];
        const zoneSize: number = 1024 * 1024; // 每个切片1mbs
        const { size } = file;
        let totalPieces: number = Math.ceil(size / zoneSize);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e: any) => {
          // console.log(e);
          // 获取到文件内容 这里可以获取到的大小是字节
          const content = e.target.result;
          let index = 0;
          // 进行文件切片
          while (totalPieces) {
            files.push(content.slice(index, zoneSize));
            index += zoneSize;
            totalPieces -= 1;
          }
          resolve(files);
        };
      });
    },

    // 检查类型
    checkType(filename: string) {
      const types: any = {
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
