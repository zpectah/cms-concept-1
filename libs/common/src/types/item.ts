export interface ItemBase {
  id: number;
  name: string;
  type?: string;
  active?: boolean;
  deleted?: boolean;
  created?: string;
  updated?: string;
}

export interface ItemLocaleBase<T> {
  locale: {
    [k: string]: T;
  };
}
