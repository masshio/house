const path = require('path');//引入path模块
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
    },
    css: {
        loaderOptions: {
            sass: {
                implementation: require('sass')
            }
        }
    }
}