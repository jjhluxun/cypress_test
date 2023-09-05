import addContext from 'mochawesome/addContext'
import './login'

Cypress.on("test:after:run", (test, runnable) => {

    if (test.state === "failed") {
        // let item = runnable
        // const nameParts = [runnable.title]
        //
        // while (item.parent) {
        //     nameParts.unshift(item.parent.title)
        //     item = item.parent
        // }
        // const MAX_SPEC_NAME_LENGTH = 220
        // const fullTestName = nameParts.filter(Boolean).join(' -- ').slice(0, MAX_SPEC_NAME_LENGTH)
        // const imageUrl = `../screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`
        // addContext({test}, imageUrl)
        addContext({test}, {
            title: "Screenshot",
            value: `../screenshots/${Cypress.spec.name}/${runnable.parent.title}` + ' -- ' + `${test.title} (failed).png`
        })
    }
})

Cypress.Cookies.defaults({
    preserve: 'token'
})


