<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Contextmenu from './common/Contextmenu.vue';
import type { IMaterialInstance } from '@/core/type';
import { page, deleteMaterial, setCurrentMaterial, copyMaterial, currentMaterial} from '@/services/material';

// 右键菜单配置参数
const options = ref({
  show: false,
  left: 0,
  top: 0,
  items: [],
  data: null
});


init();

onMounted(() => {
  const fn = () => {
    options.value.show = false;
  }
  document.addEventListener('mousedown', fn)
})

function init() {
  getCurrent()
}

function getCurrent() {
}

/**
 * 打开右键菜单
 * @param item 
 * @param event 
 */
function openContextmenu(item: IMaterialInstance, event: MouseEvent) {
  event.preventDefault();
  // 显示自定义右键菜单
  options.value = {
    show: true,
    left: event.clientX,
    top: event.clientY,
    items: [
      {
        id: 'copy',
        label: '复制'
      },
      {
        id: 'delete',
        label: '删除'
      }
    ],
    data: item
  };
}

/**
 * 点击右键菜单
 * @param id 
 */
function handleContextmenu(id: string) {
  options.value.show = false;

  if (id === 'delete') {
    deleteMaterial(options.value.data);
  } else if (id === 'copy') {
    copyMaterial(options.value.data)
  }
}

/**
 * 选择图层
 * @param data 
 */
function selectLayer(data: IMaterialInstance) {
  setCurrentMaterial(data);
}
</script>

<template>
  <div class="panel">
    <div class="panel__header">图层</div>
    <div class="panel__main">
      <div class="layer" :class="{selected: currentMaterial?.id === item.id}"
        v-for="item in page.materials" :key="item.id"
        @contextmenu.stop="openContextmenu(item, $event)"
        @click="selectLayer(item)">
        <span :class="['layer__icon iconfont', item.icon]"></span>
        <span class="layer__label">{{ item.name }}</span>
      </div>
    </div>
  </div>
  <Contextmenu v-bind="options" @click="handleContextmenu"></Contextmenu>
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
    &.selected {
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