import { type App } from 'vue'
import type { IMaterialSchema } from '../type';

const materials: IMaterialSchema[] = [];

/**
 * 根据组件类型获取组件名称
 * @param type 组件类型
 * @returns 
 */
export function getComponentName(type: string) {
  return `M${type}`
}

/**
 * 获取物料列表
 */
export function getMaterials() {
  return materials;
}

/**
 * 初始化物料列表
 */
function initMaterials() {
  const files = import.meta.glob('./**/*.json', { eager: true});
  Object.keys(files).forEach(key => {
    const data = (files[key] as any).default;
    materials.push(data)
  });
}

/**
 * 注册物料组件为全局组件
 */
export const registerMaterials = {
  install(app: App) {
    initMaterials();

    const files = import.meta.glob('./**/*.vue', { eager: true })
    Object.keys(files).forEach(key => {
      const name = key.split('/')[1]
      app.component(`${getComponentName(name)}`, files[key] as any)
    })
  }
}
