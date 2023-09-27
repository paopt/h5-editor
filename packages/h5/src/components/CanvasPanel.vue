<script setup lang="ts">
import { page } from '@/services/material';

init();

/**
 * 页面初始化
 */
function init() {
}
</script>

<template>
  <div class="canvas-panel">
    <div class="grid"></div>
    <div v-for="item in page.materials" :key="item.id">
      {{ item.name }}
    </div>
  </div>
 
</template>

<style scoped lang="scss"></style>