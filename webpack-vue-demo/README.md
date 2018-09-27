# Vue 配置
> webpack4 + Scss
> 使用Babel7而不是babel6

坑：

1. 目前`babel-loader` 默认安装对应的是`babel7`, 所需包名请阅读官网
2. `vue-loader`必须配合`vue-template-compiler`及修改`webpack`中的`resolve: { alias: vue: 'vue/dist/vue.js'}`项才能正常生效
    
    相应地：生产环境时使用`vue.min.js`