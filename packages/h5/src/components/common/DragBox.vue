<script setup lang="ts">
import type { IMaterialInstance } from '@/core/type';

defineProps<{
  material: IMaterialInstance
}>()


</script>
<template>
  <div class="drag-box">
    <div class="drag-box__mask"></div>
    <div class="drag-box__point drag-box__t"></div>
    <div class="drag-box__point drag-box__tr"></div>
    <div class="drag-box__point drag-box__r"></div>
    <div class="drag-box__point drag-box__br"></div>
    <div class="drag-box__point drag-box__b"></div>
    <div class="drag-box__point drag-box__lb"></div>
    <div class="drag-box__point drag-box__l"></div>
    <div class="drag-box__point drag-box__lt"></div>
    <div class="drag-box__content"></div>
  </div>
</template>

<style scoped lang="scss">
.drag-box {
  position: relative;
  width: 300px;
  height: 150px;
  border: 1px solid red;
  cursor: move;

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &__content {
    height: 100%;
  }

  &__point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: blue;
    z-index: 2;
    // transform: translate(-50%);
  }
  &__t {
    top: 0;
    left: 50%;
    cursor: ns-resize;
  }
  &__tr {
    top: 0;
    right: 0;
    cursor: nesw-resize;
  }
  &__r {
    right: 0;
    top: 50%;
    cursor: ew-resize;
  }
  &__br {
    right: 0;
    bottom: 0;
    cursor: nwse-resize;
  }
  &__b {
    bottom: 0;
    left: 50%;
    cursor: ns-resize;
  }
  &__lb {
    bottom: 0;
    left: 0;
    cursor: nesw-resize;
  }
  &__l {
    top: 50%;
    left: 0;
    cursor: ew-resize;
  }
  &__lt {
    top: 0;
    left: 0;
    cursor: nwse-resize;
  }
}
</style>