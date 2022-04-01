module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  transpileDependencies: ['quasar'],
  chainWebpack: (config) => {
    config.cache(true)
    config.plugin('html').tap((args) => {
      args[0].title = '现代教育技术自适应测试系统'
      return args
    })
  },
}
