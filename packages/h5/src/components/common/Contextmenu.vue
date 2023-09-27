<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps<{
  show: boolean,
  left: number,
  top: number,
  items: {
    id: string,
    label: string
  }[],
}>();

// 显示右键菜单
const showContextmenu = ref(props.show);

</script>

<template>
  <div class="contextmenu" v-if="showContextmenu" :style="{left: left + 'px', top: top + 'px'}">
    <div class="contextmenu__item" v-for="item in items" :key="item.id">
      {{ item.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.contextmenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  background-color: #ddd;

  &__item {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
}
</style>