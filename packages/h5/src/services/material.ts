import { ref, type Ref } from 'vue';
import type { IMaterialInstance, IMaterialSchema, IPage, IProperty } from "@/core/type";
import { v4 as uuidv4 } from 'uuid';

export const page: Ref<IPage> = ref(null);

// 拖拽物料
let dragMaterial: IMaterialSchema;

/**
 * 保存页面数据
 * @param data 
 */
export function setPage(data: IPage) {
  page.value = data;
}

/**
 * 添加物料
 */
export function addMaterial(data: IMaterialSchema) {
  const instance = getMaterialInstance(data);
  page.value.materials.push(instance);

  console.log(page.value)
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