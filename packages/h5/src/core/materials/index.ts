import { type App } from 'vue'

export interface IMaterial {
  name: string;
  type: string;
  component: string;
  icon: string;
  children: IMaterial[];
  data: any;
  styles: any;
  events: any;
  animates: any;
  [propName: string]: any;
}

const materials: IMaterial[] = []

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
    materials.push({...files[key] as any} as IMaterial)
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
      app.component(`M${name}`, files[key] as any)
    })
  }
}
