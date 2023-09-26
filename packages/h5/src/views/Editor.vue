<script setup lang="ts">
import CanvasPanel from '@/components/CanvasPanel.vue';
import LayerPanel from '@/components/LayerPanel.vue';
import MaterialPanel from '@/components/MaterialPanel.vue';
import SettingPanel from '@/components/SettingPanel.vue';
</script>

<template>
  <header class="header">
    <div class="header__left"></div>
    <div class="header__center"></div>
    <div class="header__right">
      <el-button type="default">预览</el-button>
      <el-button type="default">发布</el-button>
    </div>
  </header>
  <main class="main">
    <!-- 组件列表 -->
    <section class="main__material">
      <material-panel></material-panel>
    </section>
    <!-- 图层列表 -->
    <section class="main__layer">
      <layer-panel></layer-panel>
    </section>
    <!-- 中间画布 -->
    <section class="main__canvas">
      <canvas-panel></canvas-panel>
    </section>
    <!-- 配置面板 -->
    <section class="main__setting">
      <setting-panel></setting-panel>
    </section>
  </main>
</template>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 40px;
    background-color: #000;
  }

  .main {
    display: flex;
    height: calc(100vh - 50px);

    &__material {
      width: 220px;
      border-right: 1px solid #ddd;
    }
    &__layer {
      width: 190px;
      border-right: 1px solid #ddd;
    }
    &__canvas {
      flex: 1;
      border-right: 1px solid #ddd;
    }
    &__setting {
      width: 300px;
      border-right: 1px solid #ddd;
    }
  }
</style>