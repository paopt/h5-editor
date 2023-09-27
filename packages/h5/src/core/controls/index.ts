import type { App } from 'vue';

/**
 * 根据组件类型获取组件名称
 * @param type 组件类型
 * @returns 
 */
export function getComponentName(type: string) {
  return `C${type}`;
}

/**
 * 注册物料组件为全局组件
 */
export const registerControls = {
  install(app: App) {

    const files = import.meta.glob('./*.vue', { eager: true })
    Object.keys(files).forEach(key => {
      const name = key.split('/')[1];;
      app.component(`${getComponentName(name)}`, files[key] as any)
    })
  }
}