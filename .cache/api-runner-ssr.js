var plugins = [{
      plugin: require('/Users/developer/report3/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/developer/report3/node_modules/gatsby-plugin-material-ui/gatsby-ssr'),
      options: {"plugins":[],"stylesProvider":{"injectFirst":true}},
    },{
      plugin: require('/Users/developer/report3/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"MyPepsiCo","short_name":"MyPepsiCo","start_url":"/","background_color":"#002c5f","theme_color":"#fa9614","display":"fullscreen","icon":"src/data/images/pepsico.png","crossOrigin":"use-credentials","legacy":false,"include_favicon":false,"cache_busting_mode":"query","theme_color_in_head":true,"cacheDigest":"2aab9859eb592fa127cbf66933d85add"},
    },{
      plugin: require('/Users/developer/report3/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[],"appendScript":"/Users/developer/report3/src/data/service-web/sw-code.js"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
