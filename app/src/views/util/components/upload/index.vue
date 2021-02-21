<template>
  <div>
    <slot name="upload_button">
      <div class="button-container">
        <button class="button" @click="onClick">上传文件</button>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Base64 } from 'js-base64';
// import request from '@/utils/request';
import mixin from './mixins/mixin';

export default defineComponent({
  name: 'upload',
  mixins: [mixin],
  methods: {
    // 上传文件
    onClick() {
      const input = document.createElement('input');
      input.type = 'file';
      if (this.multiple > 1) input.multiple = true; // 大于1的时候再开启，主要是用户体验的问题
      if (this.type) input.accept = this.type; // 需要限制类型的时候添加限制类型
      input.onchange = this.onChange;
      input.click();
    },

    onChange(event: any) {
      const e = event.target;
      const { files } = e; // 拿到所有的文件

      // 校验文件是否符合规格
      const validate = this.validate(files);
      if (validate) return alert(validate);

      // 需要切片的时候
      if (this.zone) {
        this.zoneUpload(files);
        return false;
      }

      // 普通文件上传
      files.forEach((item) => {
        const data = { [this.upKey]: item };
        this.upload(data);
      });

      return true;
    },

    /**
     * @description 上传文件
     * @param {object} file
     */
    async upload(file: any) {
      // 合并额外参数跟数据
      file = Object.assign(file, this.data);
      const formData: any = new FormData();
      // 将数据添加到表单当中
      for (const fileKey in file) {
        if (file?.hasOwnProperty(fileKey)) {
          formData.append(fileKey, file[fileKey]);
        }
      }

      // 发送到后端
      // request.post('/api').then((result) => {
      //   console.log(result);
      // });
    },

    // 不符合就返回直接返回错误新消息，不然就是false
    validate(files: any) {
      let result: any = false;
      const size = this.size * 1024;

      // 多选时判断文件是否超出
      if (files.length > this.multiple) {
        result = `只能选择${this.multiple}个文件`;
        return result;
      }

      // 校验文件
      for (let i = 0; i < files.length; i++) {
        if (this.size && size <= files[i].size) {
          result = `文件大小不能超过${this.size}MB！`;
          break;
        }
      }

      return result;
    },

    // 分片上传
    zoneUpload(files) {
      const chunks: any = [];
      // 多个文件上传需要 {file,filename,chunkKey}
      files.forEach((item) => {
        // 将文件切片
        const chunk = this.zoneFile(item);
        chunks.push(chunk);
      });

      // 开始上传
      chunks.forEach((chunk) => {
        chunk.forEach(async (item, index) => {
          item.chunkKey = index;// 添加文件下标
          item.endKey = item.length - 1;// 添加结束下标
          await this.upload(item);
        });
      });
      // 完成
    },

    // 将文件转换为blob，并且切开
    zoneFile(file: any) {
      const files: any = [];
      const filename = Base64.encode(file.name);
      const zoneSize: number = this.chunkSize * 1024 * 1024; // 每个切片大小
      const { size } = file;
      let totalPieces: number = Math.ceil(size / zoneSize); // 根据文件大小切片总数
      let index = 0; // 开始下标
      const chunk: any = { filename };
      while (totalPieces) {
        chunk[this.upKey] = file.slice(index, index + zoneSize);
        files.push(chunk);
        totalPieces -= 1;
        index += zoneSize;
      }
      return files;
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
