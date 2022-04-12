import { reactive } from "./reactive"
import { track, trigger } from "./effect"
import { isObject } from "../utils"

export function ref(val: any): RefImpl {
    if (isRef(val)) {
        return val
    }
    return new RefImpl(val)
}

export function isRef(val: any) {
    return !!(val && val._isRef)
}

class RefImpl {
    _isRef: boolean
    _val: any
    constructor(val: any) {
        this._isRef = true
        this._val = convert(val)
    }
    get value() {
        track(this, 'get', 'value')
        return this._val
    }
    set value(val) {
        if (val !== this._val) {
            this._val = convert(val)
            trigger(this, 'set', 'value')
        }
    }
}

function convert(val: any) {
    return isObject(val) ? reactive(val) : val
}