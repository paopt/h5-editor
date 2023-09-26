<script setup lang="ts">
</script>

<template>
  <div class="panel">
    <div class="panel__header">图层</div>
    <div class="panel__main">
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
}
</style>