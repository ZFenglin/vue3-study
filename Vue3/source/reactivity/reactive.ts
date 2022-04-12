import { mutableHandles } from './baseHandles'

// reactive
// 只处理object，利用Proxy
export function reactive(target: any) {
    if (typeof target !== 'object') {
        console.warn(`reactive  ${target} 必须是一个对象`);
        return target
    }
    return new Proxy(target, mutableHandles);
}