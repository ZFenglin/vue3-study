import { effect, track, trigger } from "./effect"

export function computed(getterOrOptions: { get: any; set: any }) {
    let getter, setter
    if (typeof getterOrOptions === 'function') {
        getter = getterOrOptions
        setter = () => {
            console.warn('计算属性不能修改')
        }
    } else {
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }
    return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl {
    _setter: Function
    effect: Function
    _val: any
    _dirty: boolean
    constructor(getter: () => any, setter: Function) {
        this._setter = setter
        this._dirty = true
        // computed就是一个特殊的effect，会设置执行时机和lazy
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {
                if (!this._dirty) {
                    this._dirty = true
                    trigger(this, 'set', 'value')
                }
            },
        })
    }
    get value() {
        track(this, 'get', 'value')
        if (this._dirty) {
            this._dirty = false
            this._val = this.effect()
        }
        return this._val
    }
    set value(val) {
        console.log('set' + val)
        this._setter(val)
    }
}