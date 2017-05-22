const fs = require('fs');

class ConfigurationLoader{
    load(configurationFilePath){
        const fileContent = fs.readFileSync(configurationFilePath);
        return JSON.parse(fileContent);
    }
}

module.exports = ConfigurationLoader;
