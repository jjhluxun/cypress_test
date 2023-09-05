# 安装cypress

创建了一个node.js项目后，在package.json文件里引入cpress相关依赖npm安装后，可运行cypress open来生成目录结构


# 目录结构

运行cypress open命令后，项目下会自动生成cypress默认文件夹；

/fixtures下用来存放一些静态json数据用于test中，比如账号，也可以存放页面元素，或者请求相关的不变数据；

/plugins下的插件文件默认是index.js也可以是其他*.js（需要在cypress.json里配置路径），该文件主要是在测试文件运行之前可以动态修改或扩展cypress内部行为，
比如浏览配置或者环境变量，该文件的优先级低于cypress.json；

/support下的支持文件默认是index.js也可以是其他*.js（需要在cypress.json里配置路径），该文件主要放一些可重用配置项，如底层通用函数或全局默认配置；在spec文件之前加载

/testCase下是用例文件，这个文件夹名称自定义的（默认的为integration），需要在cypress.json里配置路径；

/results是默认生成的存放case运行后产生的一些文件；

/screenshots是默认生成的存放case失败的一些截图；

/config是自定义可以存放环境配置相关的数据，比如多环境的链接；

cypress.json配置文件；


# 用例运行

用script脚本，如`npm run cy:qa`；
也可以用 `cypress open`运行用例，这个可以可视化选择某个用例执行


# 生成报告

运行spec测试文件后，生成json文件后需要merge多个json文件，再转换成HTML

### 1.merge json文件

npx mochawesome-merge cypress/results/json/*.json > cypress/results/mochawesome.json 
`npm run combine:reports`

### 2.转换成HTML文件

npx marge cypress/results/mochawesome.json -o cypress/results  
`npm run postreport`

### 删除上一次report

每次run case后都会再生成json文件，所以需要在运行case之前把之前生成相关report都删掉
`npm run delete:reports`
