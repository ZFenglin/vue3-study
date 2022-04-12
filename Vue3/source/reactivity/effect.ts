// WeackMap<Map<string,Set>>
const targetMap: WeakMap<any, Map<PropertyKey, Set<any>>> = new WeakMap()
// 全局激活的effect，类似vue2的target
let activeEffect: any = null

export function track(target: any, type: string, key: PropertyKey) {
    // 通过target获取depsMap
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    // 通过key获取set
    let deps = depsMap.get(key)
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    // 将当前的activeEffect收集
    if (activeEffect && !deps.has(activeEffect)) {
        deps.add(activeEffect)
    }
}

export function trigger(target: any, type: string, key: PropertyKey) {
    // 通过target和key获取对应的deps
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    const deps = depsMap.get(key)
    if (!deps) return
    // 遍历deps执行effectFn
    deps.forEach(effectFn => {
        if (effectFn.scheduler) {
            effectFn.scheduler()
        } else {
            effectFn()
        }
    });
}

export function effect(fn: () => any, options: any = {}) {
    const effectFn = () => {
        try {
            activeEffect = effectFn
            // 执行fn时，读取相关数据时，就会对effectFn进行收集
            return fn()
        } catch (error) {
            console.log(error)
        } finally {
            activeEffect = null
        }
    }
    if (!options.lazy) {
        // 不是懒加载，直接执行
        effectFn()
    }
    // 调度时机，watchEffect会用到
    effectFn.scheduler = options.scheduler
    return effectFn
}