<template>
  <input type="checkbox" @change="layerShow">{{layerInfo.checkName}}<br>
</template>

<script setup>
import {defineEmits, defineProps} from "vue";
  const props = defineProps(['layerInfo','id']);

  const emit = defineEmits();
  const layerShow = ()=>{
    emit("layerShow",props.id);
  }

</script>

<style scoped>

</style>