/* Creates type from values of enum object */
export type EnumKeyValues<T extends Record<string, unknown>> = T[keyof T];
