<script setup lang="ts">
import { onMounted, defineProps } from 'vue';

const props = defineProps<{
  direction: 'horizontal' | 'vertical',
  width: number,
  height: number,
  ratio: number,
}>();

const options = {
  color: 'red', // 刻度颜色
  longMark: 20, // 长刻度
  shortMark: 6, // 短刻度
  padding: 50, // 开始间距
  backgroundColor: '#eee', // 背景色
}

onMounted(() => {
  draw();
});

/**
 * 绘制标尺
 */
function draw() {
  if (props.direction === 'horizontal') {
    drawHorizontal();
  } else {
    drawVertical();
  }
}

/**
 * 水平方向
 */
function drawHorizontal() {
  const canvas = document.getElementById(props.direction) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  // 设置宽高，高清屏处理
  const width = props.width + options.padding;
  const height = props.height;
  const ratio = window.devicePixelRatio;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(ratio, ratio);

  // 绘制样式
  ctx.fillStyle = options.backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = options.color;
  ctx.lineWidth = 1;
  ctx.translate(options.padding, 0);
  ctx.fillStyle = options.color;

  // 绘制x轴线
  ctx.moveTo(0, height-2);
  ctx.lineTo(props.width, height-2);
  ctx.stroke();

  // 绘制刻度
  for (let i = 0; i < props.width; i = i + 10) {
    const x = i;
    const y = height - 2;
    const h = i % 100 ? options.shortMark : options.longMark;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y-h);
    ctx.stroke();
    if (i % 100 === 0) {
      ctx.fillText(i + '', x + 3, y - h / 2);
    }
  }
}

/**
 * 垂直方向
 */
function drawVertical() {
  const canvas = document.getElementById(props.direction) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  // 设置宽高，高清屏处理
  const width = props.width;
  const height = props.height + options.padding;
  const ratio = window.devicePixelRatio;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(ratio, ratio);
  // 绘制样式
  ctx.fillStyle = options.backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = options.color;
  ctx.lineWidth = 1;
  ctx.translate(0, options.padding);
  ctx.fillStyle = options.color;

  // 绘制x轴线
  ctx.moveTo(width - 2, 0);
  ctx.lineTo(width - 2, props.height);
  ctx.stroke();

  // 绘制刻度
  for (let i = 0; i < props.height; i = i + 10) {
    const x = width - 2;
    const y = i;
    const h = i % 100 ? options.shortMark : options.longMark;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - h, y);
    ctx.stroke();
    if (i % 100 === 0) {
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText(i + '', x - h / 3, y + 3);
    }
  }
}
</script>

<template>
  <canvas :id="direction"></canvas>
</template>

<style scoped lang="scss">
</style>