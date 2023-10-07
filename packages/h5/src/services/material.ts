import { getCurrentInstance, ref, type Ref } from 'vue';
import type { IMaterialInstance, IMaterialSchema, IPage, IProperty } from "@/core/type";
import { v4 as uuidv4 } from 'uuid';

export const page: Ref<IPage> = ref(null);

// 拖拽物料
export const dragMaterial: IMaterialSchema = ref(null);
// 当前选中物料
export const currentMaterial: IMaterialInstance = ref(null);

/**
 * 保存页面数据
 * @param data 
 */
export function setPage(data: IPage) {
  page.value = data;
}

export function getPageData() {
  return page.value;
}

/**
 * 添加物料
 */
export function addMaterial(data: IMaterialSchema) {
  const instance = getMaterialInstance(data);
  page.value.materials.push(instance);
  setCurrentMaterial(instance)
}

/**
 * 删除物料
 * @param data 
 */
export function deleteMaterial(data: IMaterialInstance) {
  const index = page.value.materials.findIndex(material => material.id === data.id);
  page.value.materials.splice(index, 1);
}

export function copyMaterial(data: IMaterialInstance) {
  const instance: IMaterialInstance = JSON.parse(JSON.stringify(data));
  instance.id = uuidv4();
  page.value.materials.push(instance);
}

/**
 * 获取物料实例，主要是把schema属性转换为值
 * @param material 
 * @returns 
 */
function getMaterialInstance(material: IMaterialSchema): IMaterialInstance {
  const styles = getValue(material.styles, {});
  const attrs = getValue(material.attrs, {});
  const instance = JSON.parse(JSON.stringify(material));
  return {
    ...instance,
    id: uuidv4(),
    styles,
    attrs
  };
}

/**
 * 获取schema对应的值
 * @param data 
 * @param result 
 * @returns 
 */
function getValue(data: IProperty, result: any) {
  Object.keys(data).forEach(key => {
    const { type, value, children } = data[key];
    if (type === 'object' || type === 'array') {
      if (children) {
        getValue(children, result);
      }
    } else {
      result[key] = value
    }
  });
  return result
}

/**
 * 拖拽物料
 * @param data 
 */
export function setDragData(data: IMaterialSchema) {
  dragMaterial.value = data
}

export function getDragData() {
  return dragMaterial.value;
}

/**
 * 设置当前选中物料
 * @param data 
 */
export function setCurrentMaterial(data: IMaterialInstance) {
  currentMaterial.value = data;
}

export function getCurrentMaterial() {
  return currentMaterial;
}