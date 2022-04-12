export function isObject(target: any): boolean {
    if (!target) return false
    return typeof target == 'object'
}