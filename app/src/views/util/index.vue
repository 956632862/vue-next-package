<template>
<div class="handle" >
    <upload zone :multiple="3"/>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import upload from './components/upload/index.vue';

export default defineComponent({
  name: 'Util',
  components: { upload },
});
</script>

<style lang="scss" scoped>
.handle{
  padding:110px;
}

</style>
