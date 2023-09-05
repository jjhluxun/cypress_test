const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
    const configPath = 'cypress/config';
    const pathToConfigFile = path.resolve(configPath, `cypress.${file}.json`);
    return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
        launchOptions.args.push('--start-fullscreen')
        return launchOptions
    })

    const file = config.env.configFile || 'qa'
    return getConfigurationByFile(file)

}
