<script setup lang="ts">
  import { getMaterials, type IMaterial } from '@/core/materials';

  let materials: IMaterial[];

  init();

  /**
   * 初始化
   */
  function init() {
    materials = getMaterials()
    console.log(materials)
  }

  /**
   * 添加组件
   */
  function addComponent(material: IMaterial) {
    console.log(material)
  }

  function onDragstart(event: IMaterial) {
    console.log(event)
  }
</script>

<template>
  <div class="panel">
    <div class="panel__header">物料</div>
    <div class="panel__main">
      <div class="material" v-for="item in materials" :key="item.type" 
      @click="addComponent(item)"
      @dragstart="onDragstart(item)"
      draggable="true">
        <span :class="['material__icon iconfont', item.icon]"></span>
        <span class="material__label">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.panel {
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 20px;
    background-color: #eee;
    font-size: 14px;
  }
  &__main {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding: 0 10px;
    overflow-y: auto;
  }

  .material {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    color: #666;
    cursor: pointer;
    &:hover {
      background-color: #155bd4;
      color: #fff;
    }
    &__icon {
      font-size: 36px;
    }
    &__label {
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>