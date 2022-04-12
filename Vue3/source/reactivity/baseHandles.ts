import { isObject } from "../utils"
import { track, trigger } from "./effect"
import { reactive } from "./reactive"

const get = createGetter()
const set = createSetter()

function createGetter(shallow = false) {
    return function get(target: any, key: string, receiver: any): any {
        // target[key]和Reflect.get结果一致
        const res = Reflect.get(target, key, receiver)
        // 调用track函数收集依赖
        track(target, "get", key)
        if (isObject(res)) {
            // 如果值是对象，并且不是浅层代理，则进行代理
            return shallow ? res : reactive(res)
        }
        return res
    }
}

function createSetter() {
    return function set(target: object, key: PropertyKey, value: any, receiver: any) {
        const result = Reflect.set(target, key, value, receiver)
        // 触发set的时候trigger进行触发依赖
        trigger(target, "set", key)
        return result
    }
}

export const mutableHandles = {
    get,
    set,
};