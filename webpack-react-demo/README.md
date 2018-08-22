# React配置

> webpack4 + Scss

> 配置文件在`config`目录下

坑:
1. 必须使用`html-webpack-plugin`才能正确导出html,使得CSS生效
2. 安装url-loader仅对base64转码, 若超过最大limit会自动尝试file-loader,所以必须同步安装
3. 在`jsx`文件中引入必须使用相对路径, 加上`./`,否则识别为模块
4. `extract-text-webpack-plugin`在webpack4中已不再可以抽离css, 需要更加繁琐的配置(`MiniCssExtractPlugin`,`OptimizeCssAssetsPlugin`,`cssnano`)
5. 所有文件都需要`import`导入, 请勿在jsx中直接使用src路径