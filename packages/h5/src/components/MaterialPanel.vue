<script setup lang="ts">
import { getMaterials } from '@/core/materials';
import type { IMaterialSchema } from '@/core/type';
import { addMaterial } from '@/services/material'

let materials: IMaterialSchema[];

init();

/**
 * 初始化
 */
function init() {
  materials = getMaterials()
  console.log('物料： ', materials)
}

/**
 * 添加物料
 * @param material 
 */
function handleClick(material: IMaterialSchema) {
  console.log('添加物料：', material);
  addMaterial(material);
}

/**
 * 拖拽物料开始
 * @param event 
 */
function handleDragstart(data: IMaterialSchema) {
  console.log('拖拽物料开始：', data);
}

</script>

<template>
  <div class="panel">
    <div class="panel__header">物料</div>
    <div class="panel__main">
      <div class="material" v-for="item in materials" :key="item.type" @click="handleClick(item)"
        @dragstart="handleDragstart(item)" draggable="true">
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