<script setup lang="ts">
import type { IMaterialInstance } from '@/core/type';
import { page } from '@/services/material';

function handleContextmenu(item: IMaterialInstance, event: PointerEvent) {
  event.preventDefault();
  console.log(event)

  console.log('右键事件')
}
</script>

<template>
  <div class="panel">
    <div class="panel__header">图层</div>
    <div class="panel__main">
      <div class="layer" v-for="item in page.materials" :key="item.id" @contextmenu.stop="handleContextmenu(item, $event)">
        <span :class="['layer__icon iconfont', item.icon]"></span>
        <span class="layer__label">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__header {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 20px;
    background-color: #eee;
    font-size: 14px;
  }
  &__main {
    flex: 1;
    overflow: auto;
  }

  .layer {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    color: #666;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    &:hover {
      background-color: #155bd4;
      color: #fff;
    }
    &__icon {
      padding-right: 20px;
      font-size: 24px;
    }
    &__label {
      font-size: 12px;
    }
  }
}
</style>