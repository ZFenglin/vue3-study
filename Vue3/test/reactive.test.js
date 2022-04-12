
const { effect, ref, reactive, computed } = require('../vue/reactivity/index')

let dummy

// reactive 会对对象的每一key都进行监听
// const counter = reactive({ num1: 1, num2: 2 })
// effect(() => {
//     dummy = counter.num1 + counter.num2
//     console.log(dummy)// 每次counter.num1修改都会打印日志
// })


// ref只会对对象进行监听，即value
const counter = ref(1)
effect(() => {
    dummy = counter.value + 1
    console.log(dummy, test.value)// 每次counter.num1修改都会打印日志
})


const test = computed(() => counter.value)


setInterval(() => {
    counter.value++
}, 1000)