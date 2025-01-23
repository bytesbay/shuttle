module.exports = {
  lintOnSave: false,
  devServer: {
    hot: false,
    liveReload: false,
  },
  chainWebpack: config => {
    config.module
      .rule('obj')
      .test(/\.obj$/)
      .use('obj-tag/loader')
        .loader('file-loader')
        .end()

    config.module
      .rule('fbx')
      .test(/\.fbx$/)
      .use('fbx-tag/loader')
        .loader('file-loader')
        .end()

    config.module
      .rule('mtl')
      .test(/\.mtl$/)
      .use('mtl-tag/loader')
        .loader('file-loader')
        .end()

    config.module
      .rule('gltf')
      .test(/(\.gltf|\.glb|\.bin")$/)
      .use('gltf-tag/loader')
        .loader('file-loader')
        .end()
  }
}
