<script setup lang="ts">
import { defineProps, defineEmits, onMounted, ref } from 'vue';

interface IMenuItem {
  id: string;
  label: string;
  [propName: string]: any;
}

const props = defineProps<{
  show: boolean,
  left: number,
  top: number,
  items: IMenuItem[],
}>();

const emit = defineEmits(['click'])

onMounted(() => {
});

function handleClick(item: IMenuItem) {
  emit('click', item.id);
}

</script>

<template>
  <div class="contextmenu" v-if="show" :style="{left: left + 'px', top: top + 'px'}">
    <div class="contextmenu__item" v-for="item in items" :key="item.id" @click="handleClick(item)">
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
  border-radius: 5px;

  &__item {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    &:hover {
      background-color: #ccc;
    }
  }
}
</style>