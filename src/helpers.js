export const isFunction = val => typeof val === 'function';

export const isUndefined = val => val === undefined;

export const last = (arr = []) => arr.length ? arr[arr.length - 1] : undefined;
