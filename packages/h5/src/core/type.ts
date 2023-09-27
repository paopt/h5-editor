export interface IMaterialSchema {
  name: string; // 名称
  type: string; // 类型
  icon: string; // 图标
  children: IMaterialSchema[]; // 子物料
  data: any; // 绑定数据
  styles: IProperty; // 组件属性(样式)
  attrs: IProperty; // 组件属性(功能)
  events: IEvent; // 绑定事件
  animates: IAnimate; // 动画
  [propName: string]: any;
}

export interface IMaterialInstance {
  id: string;
  name: string; // 名称
  type: string; // 类型
  icon: string; // 图标
  children: IMaterialInstance[]; // 子物料
  data: any; // 绑定数据
  styles: {
    [propName: string]: any;
  }; // 组件属性(样式)
  attrs: {
    [propName: string]: any;
  }; // 组件属性(功能)
  events: IEvent; // 绑定事件
  animates: IAnimate; // 动画
  [propName: string]: any;
}

export interface IProperty {
  [propName: string]: {
    label: string;
    type: string;
    value?: any;
    children: IProperty
  };
}

export interface IEvent {
}

export interface IAnimate {
}

export interface IStyle {
  [propName: string]: any;
}

export interface IAttr {
  [propName: string]: any;
}

export interface IPage {
  id: string;
  name: string;
  materials: IMaterialInstance[];
  // 页面样式
  styles: {
    [propName: string]: any
  };
}

