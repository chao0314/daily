1、 借助 lerna 初始化 monorepo 多仓库管理代码

$ npm install -g lerna

或者

$ npx lerna init

或者

$ yarn global add lerna

$ lerna init

``` javascript
lerna.json:

{
    "packages": [
        "packages/*"
     ],
    "version": "0.0.0",
    "npmClient": "yarn", // 使用yarn管理
    "useWorkspaces": true // 使用workspace,需要配置package.json
    
    }
    
    
package.json:

{
    "name": "root",
    "private": true,
    "workspaces": [
        "packages/*"
    ],
    "devDependencies": {
        "lerna": "^3.22.1"
    }
}    
```

2、 lerna 创建组件独立仓库

$ lerna create xxx

3 、安装ts

yarn add typescript

npx tsc --init

 ``` javascript
 tsconfig.json:
{
"compilerOptions": {
    "target": "ESNext", // 打包的目标语法
    "module": "ESNext", // 模块转化后的格式
    "esModuleInterop": true, // 支持模块转化
    "skipLibCheck": true, // 跳过类库检测
    "forceConsistentCasingInFileNames": true, // 强制区分大小写
    "moduleResolution": "node", // 模块解析方式 先到 node_modules 查找
    "jsx": "preserve", // 不转化jsx
    "declaration": true, // 生成声明文件
    "sourceMap": true // 生成映射文件
    }
}
```

4、安装 vue3

$ yarn add vue@next [--ignore-workspace-root-check/-W]

> 注意安装时的 cli 参数 ，忽略各个仓库，直接装在 root

5、创建 vue declare文件

``` javascript
vue-shim.d.ts:

declare module '*.vue' {
    import {App,defineComponent} from 'vue';
    const component: ReturnType<typeof defineComponent> & {
        install(app:App):void
    };;
    export default component
}
```

6、 文档项目依赖，文档相当于一个vue web 项目

> yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -D

> yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript  @babel/plugin-transform-typescript babel-plugin-module-resolver url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -D


7、 组件库打包

(1) 用 webpack 打包 umd

(2)rollup 打包 es

> yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-vue -D

rollup打包分为 完整打包 和 各组件单独打包，便于按需引用

8 、 样式用 gulp 打包
> yarn add gulp gulp-autoprefixer gulp-cssmin gulp-dart-sass gulp-rename -D








