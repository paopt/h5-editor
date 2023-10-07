<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Ruler from './common/Ruler.vue';
import DragBox from './common/DragBox.vue';
import { addMaterial, getDragData, currentMaterial, page } from '@/services/material';

const options = {
  width: 750,
  height: 1200
};

const ratio = ref(1);
// 标尺水平滚动距离
const ruleLeft = ref(0);
// 标尺垂直滚动距离
const ruleTop = ref(0);

const container = ref<HTMLElement>(null);

init();

onMounted(() => {
  const ele = container.value;
  if (ele) {
    const rect = ele.getBoundingClientRect();
    const val = Math.floor((rect.width / options.width) * 100);
    ratio.value = val >= 100 ? 100 : val;
  }
});

/**
 * 页面初始化
 */
function init() {
}

/**
 * 画布容器滚动事件处理
 */
function handleScroll() {
  ruleLeft.value = container.value.scrollLeft
  ruleTop.value = container.value.scrollTop
}

function handleDragover(e: MouseEvent) {
  e.preventDefault();
}

/**
 * 拖拽结束，添加物料
 * @param e 
 */
function handleDrop(e: MouseEvent) {
  e.preventDefault();
  addMaterial(getDragData());
  // TODO: 处理位置
}
</script>

<template>
  <div class="panel">
    <div class="panel__header">
      <div class="panel__slider">
        <el-slider v-model="ratio" show-input size="small" :max="100"/>
      </div>
    </div>
    <div class="panel__main">
      <Ruler class="ruler__x" ref="rulerXRef" :style="{left: `${-ruleLeft || 0}px`}"
        :direction="'horizontal'"
        :width="options.width"
        :height="30"
        :ratio="ratio">
      </Ruler>
      <Ruler class="ruler__y" ref="rulerYRef" :style="{top: `${-ruleTop || 0}px`}"
        :direction="'vertical'"
        :width="30"
        :height="options.height"
        :ratio="ratio">
      </Ruler>
      <div class="markline__enable"></div>
      <div class="layer-container" ref="container"
        @dragover="handleDragover"
        @drop="handleDrop"
        @scroll="handleScroll">
        <div class="layer-list" :style="{width: options.width + 'px', height: options.height + 'px', transform: `scale(${ratio / 100})`}">
          <DragBox v-for="item in page.materials" :key="item.id" :material="item"></DragBox>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .panel {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;

    &__header {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 20px;
      font-size: 14px;
    }

    &__slider {
      width: 200px;
    }
    &__main {
      flex: 1;
      position: relative;
      overflow: hidden;

      .ruler__x {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 30px;
        // background-color: #eee;
      }

      .ruler__y {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 100%;
        // background-color: #eee;
      }

      .markline__enable {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        // border: 1px solid #fff;
      }

      .layer-container {
        position: absolute;
        top: 50px;
        left: 50px;
        width: calc(100% - 50px);
        height: calc((100% - 50px));
        overflow: auto;
      }

      .layer-list {
        position: absolute;
        top: 0;
        left: 0;
        transform-origin: left top;
        background-color: #eee;
      }
      .layer-box {
        width: 300px;
        height: 150px;
        border: 1px solid red;
      }
    }
  }
</style>