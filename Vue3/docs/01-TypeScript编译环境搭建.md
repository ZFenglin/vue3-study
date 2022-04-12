# TypeScript编译环境搭建

## 安装

```BASH
npm install -D typescript
```

## 设置配置文件

tsc命令会寻找最近的tsconfig.json文件进行编译

```JSON
{
    "compilerOptions": {
        "target": "ES6", // 目标语言的版本
        "module": "commonjs", // 指定生成代码的模板标准
        "noImplicitAny": true, // 不允许隐式的 any 类型
        "removeComments": true, // 删除注释 
        "preserveConstEnums": true, // 保留 const 和 enum 声明
        "sourceMap": true, // 生成目标文件的sourceMap文件
        "outDir": "./vue" // 指定输出文件夹
    },
    "files": [ // 指定待编译文件
        "./source/index.ts"
    ]
}
```

## 命令生效

由于不是全局安装，需要配置指令执行

npx会寻找当前目录最近的.bin的命令执行

```JSON
{
  "name": "vue3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "npx tsc"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^4.6.3"
  }
}

```
