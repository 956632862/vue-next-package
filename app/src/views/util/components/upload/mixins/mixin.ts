const upload = {
  props: {
    // 限制文件类型
    type: {
      type: String,
      default: null,
    },
    // 大小单位mb
    size: {
      type: Number,
      default: null,
    },
    // 默认1，多选文件个数
    multiple: {
      type: Number,
      default: 1,
    },
    // 切片大小 单位mb
    chunkSize: {
      type: Number,
      default: 1,
    },
    // 是否切片上传
    zone: {
      type: Boolean,
      default: false,
    },
    // 额外的参数
    data: {
      type: Object,
      default: () => Object(),
    },
    // 上传文件的字段名称
    upKey: {
      type: String,
      default: 'file',
    },
  },
};

export default upload;
