 # 摘要

 这个project既有E2E又有API自动化，从运行到报告


 ## E2E功能

 该demo的用例包括登录，页面部分操作，有利用pageObject和不利用的样例case

 ### 复用登录态

 demo包含了在多个tests间登录步骤复用，该实现在 ###/support/login.js### 下，在支持文件下放了全局可用的登录功能，在该commands下实现登录后，其他spec文件下不用再实现登录了，只需要在
hook的before里引入该方法，
 a. 且beforeEach里再固化登录后的cookie，该demo下固化的是token权限；
 b. 也可以不在beforeEach里用，在support/index.js（默认的支持文件）里加入
`Cypress.Cookies.defaults({
    preserve: 'token'
})`来固化cookie

 ### 关于pageObject

 cypress也是可以用pageObject模式写的，虽然cypress本身不建议用这个模式写
 1. 典型的利用pageObject模式写的spec为spacePage.spec.js用例，在该用例下就用了element——operation——test模式，其他相关文件在page/下，不然该文件夹可以不用
 2. 利用了pageObject模式，同时又利用cypress的fixture特性的为companyPage.spec.js用例，该用例也采用了element——operation——test模式，但是element在fixtures下的一个json文件，
所以相对应的operation也有些略微区别。
 3. 不利用pageObject模式的用例就是apartmentPage.spec.js用例，这个用例只是把element分离出去了，它就是按照cypress特性写的。


 ## API功能

 该demo的用例包括登录，get\post请求，判断response的状态、字段、获取数据值

 ### 复用登录态

 demo包含了在多个tests间共用登录后的token，该实现在 ###/support/apiLogin.js### 下，在支持文件下放了全局可用的登录功能，在该commands下实现登录后，保存了token，其他spec文件下不用再实现登录了，

 1. apiLogin.js中方法一保存方式，只需要在hook的before里引入该方法，同时在beforeEach里获取token就行；比如在companyAPI.spec.js用例里的引用，在其他用例里都可以这样引用
 `
before(() => {
        cy.loginToken()
         cy.saveLocalStorage()
    })
    beforeEach(() => {
         cy.restoreLocalStorage()
        cy.getLocalStorage('accessToken').then(token => {
           //这里accessToken是同前面apiLogin.js里定义的key
            TOKEN = token
        })
 `
 2. 方法二保存文件方式，只需要在hook的before里引入该方法读取token就行；比如在residentAPI.spec.js用例的用法，在其他用例里可以这样写
`
before(() => {
        cy.loginToken()
        cy.readFile('cypress/cypress_files/token.txt').then(token=>{
            TOKEN =token
        })
    })
`


 ### 很明显的缺点

 不能很方便的判断response的字段结构，只能一层一层的分开判断，比如
 `Cypress._.each(response.body.content, (Content) => {
 expect(Content).include.keys('id', 'companyName', 'authorizers', 'positions')}`
 只是判断content层有哪些字段，不能判断更深一层的


 ## 关于读取静态数据文件

 自动化测试涉及到的静态数据，比如用户输入数据、或者页面元素、或者json请求或返回值，都可以放在fixtrues/下；
 利用cy.fixture读取文件时，该文件必须放置在fixtures/下

 ### 完全静态固化数据

 文件可以是一个单纯的json文件，比如crmUser.json,loginPage.json;当然纯json结构体也可以是.js文件形式

 ### 部分动态数据

 如果数据里有部分须动态生成的，那文件最好就是.js文件，这个可以用函数，比如officeData.js文件

 ## 多环境配置

 cypress也是支持多环境运行的，默认配置文件就是在config/下的文件，我们把不同环境的配置可以写在不同配置文件里，比如demo里的cypress.*.json文件，在文件里可以配置运行的URL或者账号都行，
 然后在plugins/index.js下去具体实现取哪个环境的配置，最后在运行用例脚本时传递某个环境
 比如在package.json的script里的脚本为
 `cypress run --env configFile=prod --browser edge`表示传给plugins/index.js文件里prod环境，然后该文件就会去读取cypress.prod.json下的相关配置，最后所有用例都在这个环境配置或者账号下运行


 ## 报告

 cypress框架可以引用mocha下的报告mochawesome，只是如果有多个spec文件用例时，运行完后会生成多个json或者html（一个spec对应一个），所以在用例运行完后需要合并json，再转换为HTML的


 ## 运行脚本

 在package.json的script里配置运行脚本
